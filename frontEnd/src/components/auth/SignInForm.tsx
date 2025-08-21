"use client";
import React, { useState } from "react";
import "@/app/styles/global.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useEffect } from 'react';
// Set the base URL of your Laravel API
axios.defaults.baseURL = "http://localhost:8000/";

// Enable sending cookies with every request
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken=true;
//this is the form validation schema
const formSchema = z.object({
  email: z.string().email().min(2).max(50),
  password: z.string().min(8).max(30),
})
export default function SignInForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
 const handleLogin = async (data: z.infer<typeof formSchema>) => {
   try {
    await axios.get('sanctum/csrf-cookie');
    const response = await axios.post('login', {
      email: data.email,
      password: data.password,
    });
    const { user } = response.data;
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      router.push('/dashboard');
    } else {
      console.error("ERREUR: Le token n'a pas été reçu du serveur.");
    }

  } catch (err) {
    console.error("ERREUR DANS LE BLOC CATCH: La redirection n'a pas eu lieu.", err); // Erreur
  }
  }
  
  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div>
            <div className="relative py-3 sm:py-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="p-2 text-gray-400 bg-white dark:bg-gray-900 sm:px-5 sm:py-2">
                  <div className="mb-5 sm:mb-8 text-center font-sans">
                    <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                      Sign In
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Enter your email and password to sign in!
                    </p>
                  </div>
                </span>
              </div>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email :</FormLabel>
                      <FormControl>
                        <Input placeholder="info@gmail.com" {...field} />
                      </FormControl>
                      <FormMessage className="valaidation_color"/>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password :</FormLabel>
                      <FormControl>
                        <Input placeholder="Password" {...field} type="password"/>
                      </FormControl>
                      <FormMessage className="valaidation_color"/>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="btn_login text-white w-full">Submit</Button>
              </form>
            </Form>

            {/* <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Don&apos;t have an account? {""}
                <Link
                  href="/signup"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign Up
                </Link>
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
