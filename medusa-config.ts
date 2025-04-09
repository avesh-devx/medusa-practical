import { loadEnv, defineConfig } from "@medusajs/framework/utils";

loadEnv(process.env.NODE_ENV || "development", process.cwd());

module.exports = defineConfig({
  projectConfig: {
    databaseUrl:
      process.env.DATABASE_URL ||
      "postgresql://postgres:1234@localhost:5432/medusa-prac",

    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
  },
  modules: [
    {
      resolve: "./src/modules/brand",
    },
  ],
  plugins: [
    {
      resolve: "@medusa/store-locator-plugin",
      options: {},
    },
  ],
});
