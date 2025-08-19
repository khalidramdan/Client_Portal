import type { Metadata } from "next";
import React from "react";
import { columns, Users_Columns } from "@/components/ui/datatable/columns";
import { DataTable } from "@/components/ui/datatable/data-table";

export const metadata: Metadata = {
  title:
    "Client Portal for Chougdali Travel",
  description: "Client Portal for Chougdali Travel",
};

 
async function getData(): Promise<Users_Columns[]> {
  // Fetch data from your API here.
  return [
    {
    id: "728ed52f",
    user_login: 'string',
    user_email: 'string',
    diplay_name: 'string',
    },
    // ...
  ]
}
 
export default async  function Users() {
  const data = await getData();
  return (
    <div className="grid container mx-auto py-10">
       <DataTable columns={columns} data={data} />
    </div>
  );
}
