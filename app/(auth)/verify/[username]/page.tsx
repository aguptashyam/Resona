"use client"

import { useParams, useRouter } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { verifySchema } from '@/src/schemas/verifySchema';
import { ApiResponse } from '@/src/types/ApiResponse';
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

const VerifyAccount = () => {
    const router = useRouter()
    const params = useParams<{username: string}>()
    
    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema),
        },
    );

    const onSubmit = async (data: z.infer<typeof verifySchema>) => {
        try {
            const response = await axios.post(`/api/verify-code`, {
                username: params.username,
                code: data.code
            })

            toast.success("Success", {description: response.data.message})
            router.replace('/signin')

        } catch (error) {
            console.log("Verification Failed: ", error);
            const axiosError = error as AxiosError<ApiResponse>;
            toast.error("Verification Failed", { description: axiosError.response?.data.message });
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-800">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold font-serif tracking-tight lg:text-5xl mb-6 text-black">
                        Verify Your Account
                    </h1>
                    <p className="mb-4 text-black font-serif">
                        Enter the verification code sent to your email
                    </p>
                </div>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6 text-black"
                    >
                        <FormField
                        name="code"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="font-sans text-md">Verification Code</FormLabel>
                            <FormControl>
                                <Input
                                placeholder="Enter the code here"
                                className='font-sans'
                                {...field}
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />

                        <div className="text-center text-black font-sans">
                            <Button type="submit">
                                Verify
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default VerifyAccount