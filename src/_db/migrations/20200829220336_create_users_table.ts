import * as Knex from 'knex';
import { timestamps } from '../helpers';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', function (table) {
    table.bigIncrements('id');
    table.uuid('uuid').index();
    table.string('name').nullable();
    table.string('email').index();
    table.string('contact').nullable().index();
    table.integer('type').nullable();
    table.string('password').nullable();
    table.integer('status').defaultTo(0).nullable();
    timestamps(knex, table);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('users');
}
