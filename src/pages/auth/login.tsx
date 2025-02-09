import { z } from "zod";
import { LoginSchema } from "@/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from 'lucide-react';
import { useLoginMutation } from "@/services/auth.service";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { toast } from "sonner";
import { ROUTES } from "@/constant";

const Login = () => {

    const [login, { isLoading}] = useLoginMutation();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    // const user = useSelector((state: RootState) => state.auth);

    // console.log(user)

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const handleSubmit = async (values: z.infer<typeof LoginSchema>) => {
        try {
            const res = await login(values).unwrap();
            if(res.success){
                navigate(ROUTES.DASHBOARD);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else if (typeof error === "object" && error !== null && "data" in error) {
                const apiError = error as { data: { msg: string } };
                toast.error(apiError.data.msg);
            } else {
                toast.error("An unknown error occurred");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
                {/* Header */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Please sign in to your account
                    </p>
                </div>

                
                {/* Form */}
                <Form {...form}>
                    <form className="mt-8 space-y-6" onSubmit={form.handleSubmit(handleSubmit)} >
                        <div className="space-y-4">
                            {/* Email Input */}
                            <FormField control={form.control} name="email" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={isLoading} placeholder="john@email.com" type="email" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            {/* Password Input */}
                            <FormField control={form.control} name="password" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                {...field}
                                                disabled={isLoading}
                                                placeholder="*********"
                                                type={showPassword ? "text" : "password"}
                                                className="pr-10" // Add padding for the button
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                onClick={() => setShowPassword(!showPassword)}
                                                disabled={isLoading}
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-4 w-4 text-gray-500" />
                                                ) : (
                                                    <Eye className="h-4 w-4 text-gray-500" />
                                                )}
                                                <span className="sr-only">
                                                    {showPassword ? "Hide password" : "Show password"}
                                                </span>
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                            >
                                Sign in
                            </button>
                        </div>

                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Login;