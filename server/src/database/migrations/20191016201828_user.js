exports.up = function(knex) {
  return knex.schema.createTable("user", function(table) {
    table.increments("id");
    table.string("email", 64).notNullable();
    table.string("password", 40).notNullable();
    table.text("bio");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("user");
};
