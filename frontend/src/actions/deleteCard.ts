"use server";
import fetchServer from "@/lib/fetch-server";
import { revalidatePath } from "next/cache";

export const deleteCard = async ( formData: FormData) => {
 const id = formData.get("id")
// if(!id)return {error:'id required'}
   
 
  
    try {
  
  
        const cards = await fetchServer({
            method:"DELETE",
          url: process.env.NEXT_PUBLIC_BACKEND_API_URL + `/cards/${id}`,
        });
  
        if (!cards.ok) {
          throw cards;
        }
  
      revalidatePath('/dashboard')

         return {success:'deleted'}
     
  
    } catch (error:any) {
           // Error caught during execution
           if (error.status) {
            const responseBody = await error.text();
            const errorObject: any = JSON.parse(responseBody);
            return {
              error: errorObject.message,
            };
    
          }else{
            return {
              error: 'pb in server',
            };
          }

     
    }



  
    
      // revalidatePath('/dashboard')
}
