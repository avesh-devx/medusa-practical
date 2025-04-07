//HOlds the whole business logic for the brand and DB operations
import { MedusaService } from "@medusajs/framework/utils";
import { Brand } from "./models/brand";

// ✅ Yes — this file is your DAO (Data Access Object) for the Brand module.
// And:

// ✅ By extending MedusaService, it gives you built-in helper functions to work with your Brand model — no need to write basic CRUD manually.

// What does MedusaService({ Brand }) do?
// It auto-generates methods for your Brand model, like:

// createBrands() → insert new brand(s)
// listBrands() → get all brands (with filters)
// retrieveBrand(id) → get one brand by ID
// deleteBrands() → remove brand(s)
// updateBrands() → update brand(s)
class BrandModuleService extends MedusaService({
  Brand,
}) {
  //Here will be all the dao operations of the db that businsss logic will be use

  // OR can create our custom methods to do that db operations example :
  async findOrCreateBrand(name: string) {
    const existing = await this.listBrands({ filters: { name } });
    if (existing.length) return existing[0];
    const [created] = await this.createBrands([{ name }]);
    return created;
  }
}

export default BrandModuleService;
