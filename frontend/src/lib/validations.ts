import { z } from "zod";

//1-create schema
export const schemaLogin = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});


export const schemaCard = z.object({
  name: z?.string().min(5),
  company: z?.string().min(5),
  title: z.string().min(5),
  contact: z.string().min(5),
});

export const schemaCardUpdate = z.object({

});
