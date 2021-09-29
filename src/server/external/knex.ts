import _knex from 'knex';

export let knex = _knex({
  client: 'pg'
});
