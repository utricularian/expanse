exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql('ALTER TABLE "systemObjects" RENAME to "system_objects"');
  pgm.sql('ALTER TABLE "randomSystemObjectTypes" RENAME to "system_object_types"');

  // update system cols
  pgm.sql('ALTER TABLE systems RENAME COLUMN "distanceFromGalacticCore" to distance_from_galactic_core')
  pgm.sql('ALTER TABLE systems RENAME COLUMN "radiansAroundGalacticCore" to radians_around_galactic_core')
  pgm.sql('ALTER TABLE systems RENAME COLUMN "createdAt" to created_at')

  // update system_objects cols
  pgm.sql('ALTER TABLE system_objects RENAME COLUMN "systemId" to system_id');
  pgm.sql('ALTER TABLE system_objects RENAME COLUMN "distanceFromSystemCenter" to distance_from_system_center');
  pgm.sql('ALTER TABLE system_objects RENAME COLUMN "radiansFromSystemGate" to radians_from_system_gate');
  pgm.sql('ALTER TABLE system_objects RENAME COLUMN "createdAt" to created_at');

  // update system_object_types cols
  pgm.sql('ALTER TABLE system_object_types RENAME COLUMN "createdAt" to created_at');
};

exports.down = (pgm) => {

  // revert system_object_types cols
  pgm.sql('ALTER TABLE system_object_types RENAME COLUMN created_at to "createdAt"');

  // revert system_objects cols
  pgm.sql('ALTER TABLE system_objects RENAME COLUMN system_id to "systemId"');
  pgm.sql('ALTER TABLE system_objects RENAME COLUMN distance_from_system_center to "distanceFromSystemCenter"');
  pgm.sql('ALTER TABLE system_objects RENAME COLUMN radians_from_system_gate to "radiansFromSystemGate"');
  pgm.sql('ALTER TABLE system_objects RENAME COLUMN created_at to "createdAt"');

  // revert system cols
  pgm.sql('ALTER TABLE systems RENAME COLUMN distance_from_galactic_core to "distanceFromGalacticCore"');
  pgm.sql('ALTER TABLE systems RENAME COLUMN radians_around_galactic_core to "radiansAroundGalacticCore"');
  pgm.sql('ALTER TABLE systems RENAME COLUMN created_at to "createdAt"');

  pgm.sql('ALTER TABLE "system_objects" RENAME to "systemObjects"');
  pgm.sql('ALTER TABLE "system_object_types" RENAME to "randomSystemObjectTypes"');
};
