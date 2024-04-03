"use server";
import fetchServer from "@/lib/fetch-server";
import { schemaCard } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export const createCard = async (formData: FormData) => {
  const name = formData.get("name")
  const company = formData.get("company")
  const title = formData.get("title")
  const contact = formData.get("contact")
  // if(!id)return {error:'id required'}

  //2-validation
  const validatedFields = schemaCard.safeParse({
    name,
    company,
    title,
    contact
  });

  //check validation
  if (!validatedFields.success) {
    return {
      errorZod: validatedFields.error.flatten().fieldErrors,

    };
  }


  // sending data to api  
  try {
    const cards = await fetchServer({
      method: "POST",
      url: process.env.NEXT_PUBLIC_BACKEND_API_URL + `/cards`,
      body: JSON.stringify(validatedFields.data)
    });

    if (!cards.ok) {
      throw cards;
    }

    revalidatePath('/dashboard')
    return { success: 'Created' }

  } catch (error: any) {

    // Error caught during execution
    if (error.status) {
      const responseBody = await error.text();
      const errorObject: any = JSON.parse(responseBody);
      return {
        error: errorObject.message,
      };
    } else {
      return {
        error: 'pb in server',
      };
    }
  }



}
