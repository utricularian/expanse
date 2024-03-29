import csv from 'fast-csv';
import PGPromise from 'pg-promise';

const databaseUrl = process.env.DATABASE_URL;
const numberOfSystems = process.env.EXPANSE_NUM_SYSTEMS || 10;
const maxDistanceFromGalacticCore = process.env.EXPANSE_MAX_DISTANCE_FROM_CORE || 100;
const maxDistanceFromSystemStar = process.env.EXPANSE_MAX_DISTANCE_FROM_STAR || 100;
const maxObjectsInSystem = process.env.EXPANSE_MAX_OBJECTS || 10;

const AU = 1.496e+5;

function usage() {
  console.log("");
  console.log("Usage: babel-node scripts/seed_galaxy.js");
  console.log("");
  console.log("  Environment Variables:");
  console.log("  ----------------------------------------");
  console.log("  DATABASE_URL                     postgres connection string");
  console.log("  EXPANSE_NUM_SYSTEMS              number of systems to generate (default=10)");
  console.log("  EXPANSE_MAX_DISTANCE_FROM_CORE   the max radius of habitable systems (default=100)");
  console.log("  EXPANSE_MAX_DISTANCE_FROM_STAR   the max radius of objects from star (default=100)");
  console.log("  EXPANSE_MAX_OBJECTS              the max objects in a system (default=10)");
  console.log("");
  console.log("");
  console.log("");
  console.log("");

  process.exit(1);
}

function options() {
  if (databaseUrl === undefined || databaseUrl === "") {
    console.error("DATABASE_URL missing");

    usage();
  }

  if (numberOfSystems === undefined || numberOfSystems < 0) {
    console.error("EXPANSE_NUM_SYSTEMS is malformed");

    usage();
  }
}

function countSystems(db) {
  return db.one('SELECT count(id) as count from systems');
}

async function generateSystems(db) {
  const initialCount = await countSystems(db);
  if (initialCount.count > 0) {
    console.error('Preexisting systems found. Please truncate DB before seeding');
    process.exit(1);
  }

  console.log(`Generating ${numberOfSystems} systems`);

  const generateSystemsSql = `
    INSERT INTO systems (id, name, distance_from_galactic_core, radians_around_galactic_core) 
    SELECT 
      generate_series(1, $1) as id, 
      md5(random()::text) as name, 
      floor(random() * $2)::int as distance, 
      random() * pi() as radians
  `.trim();
  await db.none(generateSystemsSql, [numberOfSystems, maxDistanceFromGalacticCore]);

  const afterCount = await countSystems(db);
  console.log(`Generated ${afterCount.count} systems`);
}

async function generateStars(db) {
  const generateStarsSql = `    
    INSERT INTO system_objects (type, name, system_id, distance_from_system_center, radians_from_system_gate)
    SELECT 
      'star' as type, 
      md5(random()::text) as name, 
      id as system_id,
      0 as distance_from_system_center, 
      0.0 as radians_from_system_gate
    FROM systems
  `.trim();

  return db.none(generateStarsSql);
}

async function generateGates(db) {
  const rangeOfGateDistance = 1000000; // one billion km
  const minGateDistance = 4000000;  // four billion km

  const generateGatesSql = `
    INSERT INTO system_objects (type, name, system_id, distance_from_system_center, radians_from_system_gate)
    SELECT
      'gate' as type,
      concat(name, ' Gate') as name,
      system_id as system_id,
      floor(random() * $1 + $2)::int as distance_from_system_center,
      0.0 as radians_from_system_gate
    FROM system_objects
    WHERE type = 'star'
  `.trim();

  return db.none(generateGatesSql, [rangeOfGateDistance, minGateDistance]);
}

async function generateHabitablePlanets(db) {
  const startOfGoldilocksZone = 0.99 * AU;
  const endOfGoldilocksZone = 1.7 * AU;
  const sizeOfGoldilocksZone = endOfGoldilocksZone - startOfGoldilocksZone;

  const generateHabitablePlanetsSql = `
    INSERT INTO system_objects (type, name, system_id, distance_from_system_center, radians_from_system_gate)
    SELECT
      'habitable planet' as type,
      concat(name, ' Home') as name,
      system_id as system_id,
      floor(random() * $1 + $2)::int as distance_from_system_center,
      random() * pi() as radians_from_system_gate
    FROM system_objects
    where type = 'star'
  `.trim();

  return db.none(generateHabitablePlanetsSql, [sizeOfGoldilocksZone, startOfGoldilocksZone]);
}

async function generateRandomSystemObjectTypesTable(db) {
  const insertSql = 'INSERT INTO system_object_types (type, weight) values ($1, $2)';

  const onData = async (data) => {
    await db.none(insertSql, [data.type, data.weight]);
  };

  const fileReadingPromise = new Promise((resolve, reject) => {
    csv.fromPath('./scripts/randomSystemObjectTypes.csv', {headers: ['type', 'weight']})
      .on('data', onData)
      .on('end', () => {
        resolve();
      })
      .on('error', (error) => {
        reject(error);
      })
  });

  await fileReadingPromise;

  console.log("Done streaming CSV");

}

async function generateSystemObjects(db) {
  await generateStars(db);
  await generateGates(db);
  await generateHabitablePlanets(db);
  await generateRandomSystemObjectTypesTable(db);
}

async function main() {
  options();

  const pgp = PGPromise();
  const db = pgp(databaseUrl);

  try {
    await db.tx(async t => {
      await generateSystems(t);
      await generateSystemObjects(t);
    });
  }
  catch (e) {
    console.error("Exception caught", e);

    process.exit(1);
  }
  process.exit(0);
}

main();
