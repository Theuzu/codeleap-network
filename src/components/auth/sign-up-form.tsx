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
import { useUserStore } from "@/store/user"


export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {addUsername} = useUserStore();

const {
    register,
    handleSubmit,
    watch,
    formState: { isValid }
  } = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
    mode: "onChange" //Resolve while user is typing
  })

  const usernameValue = watch("username", "");

  function onSubmit(data: SignUpFormSchema) {
    addUsername(data.username); //update store username
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="w-full max-w-[500px] border border-foreground shadow-sm">
        <CardHeader className="px-6 pt-4 pb-1">
          <CardTitle className="font-bold text-xl">
            Welcome to CodeLeap Network!
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="username" className="text-sm font-normal text-black">
                Please enter your username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="John doe"
                  className="border-black h-10 px-3 text-sm placeholder:text-gray-500"
                {...register("username")}
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={!usernameValue.trim()}
                className={cn(
                  "px-8 h-9 text-sm font-semibold transition-all duration-200",
                  usernameValue.trim()
                    ? "hover:bg-primary/80 cursor-"
                    : "bg-[#6e6e6e] text-white cursor-not-allowed"
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