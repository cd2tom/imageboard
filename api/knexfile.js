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
      min: 2,
      max: 10
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
      min: 2,
      max: 10
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
      min: 2,
      max: 5
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }
};
