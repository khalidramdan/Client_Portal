import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chougdali Travel- Sign In",
  description: "Chougdali Travel- Sign In page for users to access their accounts",
};

export default function SignIn() {
  return <SignInForm />;
}