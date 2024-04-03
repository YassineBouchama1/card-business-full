'use client'
import { deleteCard } from "@/actions/deleteCard";
import { FilePenLine, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { SubmitButton } from "./SubmitButton";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface TableData {
  id: number;
  name: string;
  created_at: string; 
}


// ReusableTable component
export default function ReusableTable({
  data,
  columns,
}: {
  data: TableData[];
  columns: string[];
}) {


  return (
    <div className="bg-white rounded-md">
      <div className="overflow-x-auto">

        <table className="w-full whitespace-nowrap">
          <HeaderTable columns={columns} />
          <tbody>
            <RenderTableBody data={data} columns={columns} />
          </tbody>
        </table>
      </div>
      {/* <PaginationTable data={data} /> */}
    </div>
  );
}

// HeaderTable component
function HeaderTable({ columns }: { columns: string[] }) {
  return (
    <thead className="bg-gray-50 dark:bg-gray-800">
      <tr>
        {columns.map((col) => (
          <th
            key={col}
            scope="col"
            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
          >
            {col}
          </th>
        ))}
        <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
          Actions
        </th>
      </tr>
    </thead>
  );
}

// RenderTableBody component
function RenderTableBody({
  data,
  columns,
}: {
  data: TableData[];
  columns: string[];
}) {

  
  const router = useRouter()

  //delete card usieng server action
async  function deleteAction (format:FormData){
const result = await deleteCard(format)
if(result?.error){
  toast.error(result?.error)

}else{

  toast.success('delted Successfully ')
}
}

// fill query url 
const updateIt = (item:any)=>{
  let url = `?&name=${item.name}&title=${item.title}&company=&title=${item.title}${item.company}&contact=${item.contact}&id=${item.id}`; 
  router.push(url)
}


  if (!data || data.length === 0) {
    return (
      <tr>
        <td
          colSpan={columns.length + 1}
          className="text-center py-4 text-gray-600 dark:text-gray-400"
        >
          {data ? "No data found." : "Loading data..."}
        </td>
      </tr>
    );
  }

  return (
    <>
      {data.map((item: any, index: number) => (
        <tr
          key={index}
          tabIndex={index}
          className=" focus:outline-none h-16 border border-gray-100 rounded "
        >
          {columns.map((col, colIndex) => (
            <>
            <td key={colIndex}>
              <div className="flex items-center">
                <p className="text-sm leading-none text-gray-600 ml-2">
                  {item[col]}
                </p>
              </div>
            </td>
       
            </>
          ))} 

          {/* btns actions  */}
               <td className="flex items-center cursor-pointer">
               <form action={deleteAction}  className=" text-red-500 focus:ring-2  focus:ring-offset-2  focus:ring-red-300 text-sm leading-none  px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none">
            <input  hidden type="number" name="id"  value={item.id}/>
             <SubmitButton title='delete'/>
       
              
             
                            </form>
               <div  className=" text-red-500 focus:ring-2  focus:ring-offset-2  focus:ring-red-300 text-sm leading-none  px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none">
             
             <button onClick={()=>updateIt(item)}>Update</button>
           </div>
             
           </td>
        </tr>
      ))}
    </>
  );
}

// HeaderTable component
function PaginationTable({ data }: { data: TableData[] }) {

  return (
    <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
      <a
        href="#"
        className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5 rtl:-scale-x-100"
        >
          <path
            strokeLinejoin="round"
           
            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
          />
        </svg>

        <span>previous</span>
      </a>

      <a
        href="#"
        className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
      >
        <span>Next</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5 rtl:-scale-x-100"
        >
          <path
            strokeLinejoin="round"
          
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          />
        </svg>
      </a>
    </div>
  );
}