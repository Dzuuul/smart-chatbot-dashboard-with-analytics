import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/mongo.prisma',
  datasource: {
    url: process.env['MONGODB_URL'],
  },
});
