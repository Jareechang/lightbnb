import _knex from 'knex';
import { queryBuilderLogger } from '../../../internal/knex/logging';

export const knex = _knex({
  client: 'pg'
});

if (process.env.KNEX_DEBUG) {
  console.log('Running knex querybuilder in debug mode');
}

export const createKnexQueryBuilder = () => {
  const queryBuilder = knex.queryBuilder();
  queryBuilder.toString = (queryBuilderLogger).bind(queryBuilder);
  return queryBuilder;
}
