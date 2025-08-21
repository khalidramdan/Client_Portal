'use client'; // 👈 1. Make this a Client Component

import type { Metadata } from "next";
import React, { useState, useEffect } from "react"; // 👈 2. Import hooks
import { columns, Users_Columns } from "@/components/ui/datatable/columns";
import { DataTable } from "@/components/ui/datatable/data-table";
import axios from "axios";
import { useRouter } from "next/navigation";

// Note: Metadata export might not work as expected in a Client Component.
// You may need to move it to a parent Server Component or layout.
/*
export const metadata: Metadata = {
  title: "Client Portal for Chougdali Travel",
  description: "Client Portal for Chougdali Travel",
};
*/

// This is no longer an async component
export default function Users() {
  // 3. Use state to hold your data and loading status
  const [data, setData] = useState<Users_Columns[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 4. Use useEffect to fetch data when the component loads in the browser
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/users", {
          withCredentials: true,
          withXSRFToken: true,
        });
        if (response.status == 200) {
          const users = response.data.users || [];
          // 5. Correctly map the array of users to the format your datatable needs
          console.log(users);
          const formattedUsers = users.map((user: any) => ({
            ID: user.ID,
            first_name:user.first_name,
            last_name:user.last_name,
            user_login: user.user_login,
            user_email: user.user_email,
            display_name: user.display_name, // Corrected typo from 'diplay_name'
          }));
          setData(formattedUsers);
        } else if (response.status == 401 || response.status == 419) {
          router.push(`/signin`);
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
        // Optionally, you can set an error state here to show a message in the UI
      } finally {
        setLoading(false);
      }
    };
    
    getData();
  }, []); // The empty array [] ensures this runs only once

  // 6. Show a loading message while fetching
  if (loading) {
    return <div className="container mx-auto py-10">Loading data...</div>;
  }

  return (
    <div className="grid container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}