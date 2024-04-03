"use server";

import fetchServer from "@/lib/fetch-server";
import { getSession } from "@/lib/getSessions";
import { schemaLogin } from "@/lib/validations";






export const login = async (prevState: any, formData: FormData) => {
  const session = await getSession();



  //2-validation
  const validatedFields = schemaLogin.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  //check validation
  if (!validatedFields.success) {
    return {
      message: "error in zod",
      errors: validatedFields.error.flatten().fieldErrors,
      type: "error",
    };
  }

  console.log("done zod");

  // fetch data
  try {
    const response = await fetchServer({
      method: "POST",
      url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "/auth/login",
      body: JSON.stringify(validatedFields.data),
    });
    if (!response.ok) {
      throw response;
    }
    
    const data = await response.json();
    console.log(data)

    //assign data user to session
    session.userId = data.user.id;
    session.name = data.user.name;
    session.email = data.user.email;
    session.isLoggedIn = true;

    session.token = data?.token;
    await session.save();

    //after successfully
    return {
      message: "fetching successfully",
      errors: {},
      type: "success",
    };



  } catch (error: any) {
    console.log(error)

         if (error.status === 401) {
           const responseBody = await error.text();
           const errorObject: any = JSON.parse(responseBody);
           return {
             message: errorObject.message,
             errors: {},
             type: "error",
           };
         }
         else{
          return {
            message: 'there is problem while conection to server',
            errors: {},
            type: "error",
          };
         }
  }



};
