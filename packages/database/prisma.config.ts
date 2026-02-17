import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  // Since we have multiple schemas, we'll use a dynamic approach or default to one.
  // Prisma 7 CLI commands like `prisma studio` or `prisma migrate` will use this config.
  // We can determine the schema path from the --schema flag if provided to the CLI,
  // but here we define how Prisma should find the URL for a given schema.

  datasource: {
    // This `url` is used by CLI tools.
    // If you run `prisma db push --schema=./prisma/postgres/schema.prisma`,
    // it will look for the URL here.
    url: (() => {
      const schemaArg = process.argv.find((arg) => arg.startsWith('--schema='));
      const schemaPath = schemaArg?.split('=')[1] ?? '';

      if (schemaPath.includes('mongo')) {
        const user = process.env.MONGO_INITDB_ROOT_USERNAME;
        const pass = process.env.MONGO_INITDB_ROOT_PASSWORD;
        const host = process.env.MONGO_HOST || 'localhost';
        const port = process.env.MONGO_PORT || '27017';
        const db = process.env.MONGO_DB || 'smart_chatbot';
        return `mongodb://${user}:${pass}@${host}:${port}/${db}?authSource=admin`;
      }

      const user = process.env.POSTGRES_USER;
      const pass = process.env.POSTGRES_PASSWORD;
      const host = process.env.POSTGRES_HOST || 'localhost';
      const port = process.env.POSTGRES_PORT || '5432';
      const db = process.env.POSTGRES_DB || 'smart_chatbot';
      return `postgresql://${user}:${pass}@${host}:${port}/${db}?schema=public`;
    })(),
  },
});
