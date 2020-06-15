import Knex from 'knex';

export async function up(knex: Knex) {
  // Cria a tabela
  return knex.schema.createTable('point_items', (table) => {
    table.increments('id').primary();

    // Cria uma chave estrangeira desse id com o id da tabela points
    table.integer('point_id').notNullable().references('id').inTable('points');

    // Cria uma chave estrangeira desse id com o id da tabela items
    table.integer('item_id').notNullable().references('id').inTable('items');
  });
}
export async function down(knex: Knex) {
  // Deleta a tabela
  return knex.schema.dropTable('point_items');
}
