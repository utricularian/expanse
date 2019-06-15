
import databaseDriver from '../server/drivers/databaseDriver';

// let connection;
//
// global.beforeEach(async () => {
//   const db = databaseDriver.db();
//   connection = await db.connect();
//   await connection.query("BEGIN");
//
//   console.log("TRUNCATING");
//   const countPre = await db.one('SELECT count(*) from "systems"');
//   console.log("System countPre", countPre);
//   await db.none(`
// DO
// $func$
// BEGIN
//    -- RAISE NOTICE '%',
//    EXECUTE
//    (SELECT 'TRUNCATE TABLE ' || string_agg(oid::regclass::text, ', ') || ' CASCADE'
//     FROM   pg_class
//     WHERE  relkind = 'r'  -- only tables
//     AND    relnamespace = 'public'::regnamespace
//     AND    relname != 'pgmigrations'
//    );
// END
// $func$;
//
//     `.trim());
//   console.log("TRUNCATED");
//   const countPost = await db.one('SELECT count(*) from "systems"');
//   console.log("System countPost", countPost);
// });
//
// global.afterEach(async () => {
//   await connection.query("ROLLBACK");
// });
