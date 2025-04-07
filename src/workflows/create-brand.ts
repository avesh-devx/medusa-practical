import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { BRAND_MODULE } from "../modules/brand";
import BrandModuleService from "../modules/brand/service";

export type CreateBrandStepInput = {
  name: string;
};

// name of the step, and the function that will be executed

// Step means a single step in the workflow.
export const createBrandStep = createStep(
  "create-brand-step",
  async (input: CreateBrandStepInput, { container }) => {
    // Think of Medusa container like a toolbox that Medusa gives you.
    // It holds all the services, modules, and other useful tools you've defined in your app — things like:
    // The Product service
    // The Cart service
    // Your custom Brand module service
    const brandModuleService: BrandModuleService =
      container.resolve(BRAND_MODULE); // get brand module service

    const brand = await brandModuleService.createBrands(input);

    //Send response
    return new StepResponse(brand, brand.id);
  },
  //Compensation Function : calls when the step fails
  async (id: string, { container }) => {
    // 3️⃣ Compensation function
    const brandModuleService: BrandModuleService =
      container.resolve(BRAND_MODULE);

    await brandModuleService.deleteBrands(id); // 👈 Rollback
  }
);

//------------------------------------------------ Create Workflow ------------------------------------------------
import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";

type CreateBrandWorkflowInput = {
  name: string;
};

export const createBrandWorkflow = createWorkflow(
  "create-brand",
  (input: CreateBrandWorkflowInput) => {
    const brand = createBrandStep(input); //Create brand step that we created above

    return new WorkflowResponse(brand);
  }
);

// Difference between the createStep and createWorkflow example

// Ex: You’re a chef, and you want to make a pizza. 🍕

// createStep is like doing one action:
// → e.g., "Roll the dough."

// createWorkflow is like the entire recipe to make the pizza:
// → "Roll the dough → add sauce → add toppings → bake the pizza → serve it."
