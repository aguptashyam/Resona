"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useDebounceCallback, useDebounceValue } from "usehooks-ts";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signupSchema } from "@/src/schemas/signupSchema";
import { ApiResponse } from "@/src/types/ApiResponse";
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

function page() {
    const [username, setUsername] = useState("");
    const [usernameMessage, setUsernameMessage] = useState("");
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const debounced = useDebounceCallback(setUsername, 300);
    const router = useRouter();

    // zod implementation
    const form = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
        username: "",
        email: "",
        password: "",
        },
    });

    useEffect(() => {
        const checkUsernameUnique = async () => {
        if (username) {
            setIsCheckingUsername(true);
            setUsernameMessage("");

            try {
            const response = await axios.get(
                `/api/check-username-unique?username=${username}`,
            );
            setUsernameMessage(response.data.message);
            } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            setUsernameMessage(
                axiosError.response?.data.message || "Error checking username",
            );
            } finally {
            setIsCheckingUsername(false);
            }
        }
        };
        checkUsernameUnique();
    }, [username]);

    const onSubmit = async (data: z.infer<typeof signupSchema>) => {
        setIsSubmitting(true);

        try {
        const response = await axios.post<ApiResponse>("/api/signup", data);
        toast.success("Success", { description: response.data.message });
        router.replace(`/verify/${username}`);
        } catch (error) {
        console.log("Error during sign up:", error);
        const axiosError = error as AxiosError<ApiResponse>;
        let errorMessage = axiosError.response?.data.message;
        toast.error("Signup Failed", { description: errorMessage });
        } finally {
        setIsSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-800">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
            <div className="text-center">
            <h1 className="text-4xl font-extrabold font-serif tracking-tight lg:text-5xl mb-4 text-black">
                Join <Link href='/'>Resona</Link>
            </h1>
            <p className="mb-4 text-black font-serif text-lg">
                Sign up to start your anonymous adventure!
            </p>
            </div>

            <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 text-black"
            >
                <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="font-sans text-md">Username</FormLabel>
                    <FormControl>
                        <Input
                        placeholder="Enter your username"
                        {...field}
                        onChange={(e) => {
                            field.onChange(e);
                            debounced(e.target.value);
                        }}
                        />
                    </FormControl>

                    {isCheckingUsername && <Loader2 className="animate-spin" />}
                    <p className={`text-sm ${usernameMessage === "Username is unique and valid" ? 'text-green-500' : 'text-red-500'}`}>{usernameMessage}</p>
                    
                    <FormMessage />
                    </FormItem>
                )}
                />

                <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="font-sans text-md">Email</FormLabel>
                    <FormControl>
                        <Input placeholder="Enter your email address" {...field} />
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
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                        Wait
                    </>
                    ) : (
                    "Sign up"
                    )}
                </Button>
                </div>
            </form>
            </Form>

            <div className="text-center text-black font-serif">
            <p>
                Already a member?{" "}
                <Link
                href="/signin"
                className="text-blue-600 hover:text-shadow-blue-800"
                >
                Sign in
                </Link>
            </p>
            </div>
        </div>
        </div>
    );
}

export default page;
