import knex from 'knex';

// padronizar o caminho para arquivos e pastas
import path from 'path';

const connection = knex({
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'database.sqlite'),
  },
  useNullAsDefault: true,
});

export default connection;
