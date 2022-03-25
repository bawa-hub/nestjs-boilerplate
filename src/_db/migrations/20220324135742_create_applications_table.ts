import * as Knex from 'knex';
import { timestamps } from '../helpers';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('applications', (table) => {
    table.bigIncrements('id');
    table.integer('user_id').unsigned().index();
    table.integer('job_id').unsigned().index();
    timestamps(knex, table);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('applications');
}
