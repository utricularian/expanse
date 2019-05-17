exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("randomSystemObjectTypes", {
    id: "id",
    type: {
      type: "varchar(100)",
      notNull: true
    },
    weight: {
      type: "int",
      notNull: true,
      check: "weight > 0"
    },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp")
    }
  });

  pgm.createIndex("randomSystemObjectTypes", "type", {unique: true});
};

exports.down = (pgm) => {
  pgm.dropTable("randomSystemObjectTypes");
};
