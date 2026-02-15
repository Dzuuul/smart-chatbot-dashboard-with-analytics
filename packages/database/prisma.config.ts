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
        return process.env.MONGO_DATABASE_URL || '';
      }
      return process.env.POSTGRES_DATABASE_URL || '';
    })(),
  },
});
