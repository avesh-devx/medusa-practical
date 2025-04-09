import Medusa from "@medusajs/js-sdk";

export const sdk = new Medusa({
  baseUrl: "http://localhost:9000/", // Adjust based on your environment setup
  debug: true,
  auth: {
    type: "session", // For admin dashboard
  },
});
