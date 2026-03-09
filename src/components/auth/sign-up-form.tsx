import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input" 
import { FieldValues, useForm } from "react-hook-form"
import { Label } from "../ui/label"
import { signUpFormSchema, SignUpFormSchema,  } from "@/app/schemas/auth-schema"
import { zodResolver } from "@hookform/resolvers/zod"

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    watch,
  } = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema)
  })

  const username = watch("username", "")

  function onSubmit(payload: FieldValues) {
    console.log("submit", payload)
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="w-full max-w-[500px] border border-[#CCCCCC] shadow-sm">
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
                disabled={!username.trim()}
                className={cn(
                  "px-8 h-9 text-sm font-semibold transition-all duration-200",
                  username.trim()
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