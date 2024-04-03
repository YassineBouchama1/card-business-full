import Header from "@/compoenents/Header";
import SectionWrapper from "@/compoenents/SectionWrapper";
import { Toaster } from "react-hot-toast";


export default function DashboardLayout({
  children,
  table,
}: Readonly<{
  children: React.ReactNode;
  table: React.ReactNode;
}>) {
  return (
    <div className="flex  w-full flex-col bg-gray-200 h-screen">
   
        <Header />
        <main className="flex h-auto  gap-4  pt-4 lg:flex-row flex-col mx-4">
        <SectionWrapper styles="w-1/4 p-2">

          {children} 
          </SectionWrapper>

          <SectionWrapper styles="w-3/4 p-2 ">

          {table}
          </SectionWrapper>
       
      </main>
      <Toaster
  position="top-center"

/>
    </div>
  );
}
