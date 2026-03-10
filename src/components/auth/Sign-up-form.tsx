/**
 * The `SignUpForm` function is a React component that displays a form for users to
 * sign up with a username, following Zod schema rules for validation.
 * @param {SignUpFormSchema} data - The `data` parameter in the `onSubmit` function
 * refers to the form data submitted by the user when they click the "ENTER" button
 * in the sign-up form. In this case, the `data` object will contain the username
 * entered by the user in the input field of the form.
 */
"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input" 
import { useForm } from "react-hook-form"
import { Label } from "../ui/label"
import { signUpFormSchema, SignUpFormSchema,  } from "@/app/schemas/auth-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user"

export function SignUpForm({ className, ...props }: React.ComponentProps<"div">) {
  const router = useRouter();
  const { addUsername } = useUserStore();

  const {
    register,
    handleSubmit,
    //calling formState
    formState: { errors, isValid }, 
  } = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
    mode: "onChange", 
  });

function onSubmit(data: SignUpFormSchema) {
    addUsername(data.username);
    router.push("/feed");
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="w-full max-w-[500px] border shadow-sm">
        <CardHeader className="px-6 pt-4 pb-1">
          <CardTitle className="font-bold text-xl">
            Welcome to CodeLeap Network!
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="username" className="text-sm font-normal text-muted-foreground">
                Please enter your username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="John doe"
                className={cn(
                  " h-10 px-3 text-sm",
                  errors.username && "border-red-500" // Highlight field on error
                )}
                {...register("username")}
              />
              {errors.username && (
                <span className="text-xs text-red-500">{errors.username.message}</span>
              )}
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={!isValid} // Button follows Zod schema rules
                className={cn(
                  "px-8 h-9 text-white text-sm font-semibold transition-all duration-200",
                  isValid
                    ? "hover:bg-primary/80"
                    : "bg-muted-foreground cursor-not-allowed"
                )}
              >
                ENTER
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}