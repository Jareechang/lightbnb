const chalk = require('chalk');

const queryBuilderLogger = function() {
  const sqlString = this.toQuery();
  if (process.env.KNEX_DEBUG) {
    console.log(
      chalk`{bgYellow.white.bold DEBUG} {bold.white knex - sql generated:} ${sqlString} \n`
    );
  }
  return sqlString;
}

module.exports = {
  queryBuilderLogger,
};
