
import { cardsAction } from "@/actions/cards";
import ReusableTable from "@/compoenents/ReusableTable";
import { delay } from "@/lib/delay";
import fetchServer from "@/lib/fetch-server";
import { getSession } from "@/lib/getSessions";




export default async function Home() {
  const { success, error } = await cardsAction()


  // if(error)return Error(error)
  if (error) {
    throw new Error(error)
  }


  const columns: string[] = ["id", "name", 'contact', 'company', 'title', "created_at"];




  return <ReusableTable columns={columns} data={success?.data} />;
}
