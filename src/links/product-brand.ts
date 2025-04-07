import BrandModule from "../modules/brand";
import ProductModule from "@medusajs/medusa/product";
import { defineLink } from "@medusajs/framework/utils";

// we crate bridge between product and brand module
export default defineLink(
  {
    //One to many relationship like we tell medusa that product is linkable to brand
    linkable: ProductModule.linkable.product,
    isList: true,
  },
  BrandModule.linkable.brand
);
