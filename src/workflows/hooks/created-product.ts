import { createProductsWorkflow } from "@medusajs/medusa/core-flows";
import { StepResponse } from "@medusajs/framework/workflows-sdk";
import { Modules } from "@medusajs/framework/utils";
import { LinkDefinition } from "@medusajs/framework/types";
import { BRAND_MODULE } from "../../modules/brand";
import BrandModuleService from "../../modules/brand/service";

// kindof :POST middleware of the mongoose

// Inshort this code is like the post middleware of the mongoose like what should happeing after the product is created so this code will be execute.
createProductsWorkflow.hooks.productsCreated(
  async ({ products, additional_data }, { container }) => {
    if (!additional_data?.brand_id) {
      return new StepResponse([], []);
    }

    const brandModuleService: BrandModuleService =
      container.resolve(BRAND_MODULE);
    // if the brand doesn't exist, an error is thrown.
    await brandModuleService.retrieveBrand(additional_data.brand_id as string);

    // TODO link brand to product

    // before :

    // [
    //   { title: "iPhone 15" },
    //   { title: "iPhone 15 Pro" },
    //   { title: "iPhone 15 Pro Max" },
    // ];

    const link = container.resolve("link");
    const logger = container.resolve("logger");

    const links: LinkDefinition[] = [];

    for (const product of products) {
      links.push({
        [Modules.PRODUCT]: {
          product_id: product.id,
        },
        [BRAND_MODULE]: {
          brand_id: additional_data.brand_id,
        },
      });
    }

    // After :
    // [
    //     {
    //       product: { product_id: "p1" },
    //       brand: { brand_id: "apple123" }
    //     },
    //     {
    //       product: { product_id: "p2" },
    //       brand: { brand_id: "apple123" }
    //     },
    //     {
    //       product: { product_id: "p3" },
    //       brand: { brand_id: "apple123" }
    //     }
    //   ]

    await link.create(links);

    logger.info("Linked brand to products");

    return new StepResponse(links, links);
  },
  //Compensation Function : calls when the step fails
  async (links, { container }) => {
    if (!links?.length) {
      return;
    }

    const link = container.resolve("link");

    //Dismiss the linking of products to brand if something went wrong in workflow.
    await link.dismiss(links);
  }
);
