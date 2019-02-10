module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.IB_PGHOST,
      database: process.env.IB_PGDATABASE,
      user: process.env.IB_PGUSER,
      password: process.env.IB_PGPASSWORD
    },
    pool: {
      min: 1,
      max: 4
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  staging: {
    client: "pg",
    connection: {
      host: process.env.IB_PGHOST,
      database: process.env.IB_PGDATABASE,
      user: process.env.IB_PGUSER,
      password: process.env.IB_PGPASSWORD
    },
    pool: {
      min: 1,
      max: 4
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "pg",
    connection: {
      host: process.env.IB_PGHOST,
      database: process.env.IB_PGDATABASE,
      user: process.env.IB_PGUSER,
      password: process.env.IB_PGPASSWORD,
      ssl: true
    },
    pool: {
      min: 1,
      max: 4,
      idleTimeoutMillis: 2000,
      afterCreate: function(conn, done) {
        conn.query('SET timezone="UTC";', function(err) {
          if (err) {
            done(err, conn);
          } else {
            conn.query("SELECT set_limit(0.01);", function(err) {
              done(err, conn);
            });
          }
        });
      }
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }
};
