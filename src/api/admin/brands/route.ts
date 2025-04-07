import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { createBrandWorkflow } from "../../../workflows/create-brand";
import { z } from "zod";
import { PostAdminCreateBrand } from "./validators";

type PostAdminCreateBrandType = z.infer<typeof PostAdminCreateBrand>;

export const POST = async (
  req: MedusaRequest<PostAdminCreateBrandType>,
  res: MedusaResponse
) => {
  // This is exactly like the controller that called the service business logic here.
  const { result } = await createBrandWorkflow(req.scope).run({
    input: req.validatedBody,
  });

  res.json({ brand: result });
};

// Query allows you to retrieve data across modules with filters, pagination, and more
export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const query = req.scope.resolve("query");

  const { data: brands } = await query.graph({
    entity: "brand",
    fields: ["*", "products.*"],
  });

  res.json({ brands });
};
