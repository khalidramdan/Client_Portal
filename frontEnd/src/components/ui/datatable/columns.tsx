"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Users_Columns = {
  id: string
  user_login: string
  user_email: string
  diplay_name: string
}

export const columns: ColumnDef<Users_Columns>[] = [
  {
    accessorKey: "id",
    header: "ID",
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
    accessorKey: "diplay_name",
    header: "Display Name", 
    },
]