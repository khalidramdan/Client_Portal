"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Users_Columns = {
  ID: number
  first_name:string
  last_name:string
  user_login: string
  user_email: string
  display_name: string
}

export const columns: ColumnDef<Users_Columns>[] = [
  {
    accessorKey: "ID",
    header: "ID",
  },
   {
    accessorKey: "first_name",
    header: "First Name",
  },
   {
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    accessorKey: "user_login",
    header: "User Login",
  },
  {
    accessorKey: "user_email",
    header: "User Email",
  },
    {
    accessorKey: "display_name",
    header: "Display Name", 
    },
]