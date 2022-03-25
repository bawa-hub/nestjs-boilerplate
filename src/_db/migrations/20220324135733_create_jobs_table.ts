import * as Knex from 'knex';
import { timestamps } from '../helpers';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('jobs', (table) => {
    table.bigIncrements('id');
    table.uuid('uuid').index();
    table.string('company').nullable();
    table.string('title').nullable();
    table.string('profile').nullable();
    table.string('desc').nullable();
    table.integer('user_id').unsigned().index();
    timestamps(knex, table);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('jobs');
}
