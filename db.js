const mysql = require('mysql');

exports.READ = 'READ';
exports.WRITE = 'WRITE';

const pool = mysql.createPoolCluster();

pool.add(exports.READ, {
  host: process.env.READ_DB_HOST,
  port: process.env.READ_DB_PORT || 3306,
  user: process.env.READ_DB_USER,
  password: process.env.READ_DB_PASSWORD,
  database: process.env.READ_DB_DATABASE,
});

pool.add(exports.WRITE, {
  host: process.env.WRITE_DB_HOST,
  port: process.env.WRITE_DB_PORT || 3306,
  user: process.env.WRITE_DB_USER,
  password: process.env.WRITE_DB_PASSWORD,
  database: process.env.WRITE_DB_DATABASE,
});

exports.get = function (type, done) {
  if (!pool) return done(new Error('Missing database connection.'));

  done(null, pool.of(type));
};
