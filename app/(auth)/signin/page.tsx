"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Loader2 } from "lucide-react";
import { signinSchema } from "@/src/schemas/signinSchema";
import { signIn } from "next-auth/react";

function page() {
  const router = useRouter();

  // zod implementation
  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signinSchema>) => {
    const result = await signIn('credentials', {
      redirect: false,
      identifier: data.identifier,
      password: data.password
    })

    if(result?.error){
      if(result.error === 'CredentialsSignin'){
        toast.error("Sign In Failed", {
          description: "Incorrect Username or Password",
        });
      } else {
        toast.error("Error", {
          description: result.error,
        });
      }
    }

    if(result?.url) {
      router.replace('/dashboard')
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold font-serif tracking-tight lg:text-5xl mb-4 text-black">
            Welcome Back to <Link href="/">Resona</Link>
          </h1>
          <p className="mb-4 text-black font-serif text-lg">
            Sign in to continue your secret conversations
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 text-black"
          >
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-sans text-md">
                    Username / Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your username or email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-sans text-md">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="text-center text-black font-sans">
              <Button type="submit">Sign in</Button>
            </div>
          </form>
        </Form>

        <div className="text-center text-black font-serif">
          <p>
            Not a member yet?{" "}
            <Link
              href="/signup"
              className="text-blue-600 hover:text-shadow-blue-800"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default page;
