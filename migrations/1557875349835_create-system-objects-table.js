exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("systemObjects", {
    id: "id",
    type: {
      type: "varchar(100)",
      notNull: true
    },
    name: {
      type: "varchar(256)",
      notNull: true,
    },
    systemId: {
      type: "int",
      notNull: true,
      references: '"systems"',
      onDelete: "cascade"
    },
    distanceFromSystemCenter: {
      type: "int",
      notNull: true,
      check: "\"distanceFromSystemCenter\" >= 0"
    },
    radiansFromSystemGate: {
      type: "float(8)",
      notNull: true,
      check: "\"radiansFromSystemGate\" >= 0.0 and \"radiansFromSystemGate\" < pi()"
    },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp")
    }
  });

  pgm.createIndex("systemObjects", "systemId");
};

exports.down = (pgm) => {
  pgm.dropTable("systemObjects");
};
