//HOlds the whole business logic for the brand and DB operations
import { MedusaService } from "@medusajs/framework/utils";
import { Brand } from "./models/brand";

class BrandModuleService extends MedusaService({
  Brand,
}) {
  //Here will be all the business logic for the brand it's kind of service layer of the brand module API
}

export default BrandModuleService;
