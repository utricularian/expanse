exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("systems", {
    id: "id",
    name: {
      type: "varchar(1000)",
      notNull: true
    },
    distanceFromGalacticCore: {
      type: "int",
      notNull: true,
      check: "\"distanceFromGalacticCore\" >= 0"
    },
    radiansAroundGalacticCore: {
      type: "float(8)",
      notNull: true,
      check: "\"radiansAroundGalacticCore\" >= 0.0 and \"radiansAroundGalacticCore\" < pi()"
    },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp")
    }
  });
};

exports.down = (pgm) => {
  pgm.dropTable("systems");
};
