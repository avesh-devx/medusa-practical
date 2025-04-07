import { model } from "@medusajs/framework/utils";

//created the model for brand like we used to do with mongoose in monogo.
export const Brand = model.define("brand", {
  id: model.id().primaryKey(),
  name: model.text(),
});
