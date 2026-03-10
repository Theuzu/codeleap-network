import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { postFormSchema, PostFormSchema } from "@/app/schemas/post-schema";
import { useEffect } from "react";

type PostFormProps = {
  initialData?: PostFormSchema;
  onSubmit: (data: PostFormSchema) => void;
  onCancel?: () => void;
  isPending: boolean;
  submitLabel: string;
  pendingLabel: string;
  submitColor?: string;
};

export function PostForm({
  initialData,
  onSubmit,
  onCancel,
  isPending,
  submitLabel,
  pendingLabel,
  submitColor = "bg-primary hover:bg-primary/90", // Default values
}: PostFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<PostFormSchema>({
    resolver: zodResolver(postFormSchema),
    mode: "onChange",
    defaultValues: initialData,
  });

  // Update for the edit field
  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  const isDisabled = !isValid || !isDirty || isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="title" className="text-sm">
          Title
        </Label>
        <Input
          id="title"
          placeholder="Hello world"
          className={cn("h-10 px-3 text-sm", errors.title && "border-red-500")}
          {...register("title")}
        />
        {errors.title && (
          <span className="text-xs text-red-500">{errors.title.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="content" className="text-sm">
          Content
        </Label>
        <Textarea
          id="content"
          placeholder="Content here"
          rows={4}
          className={cn("px-3 text-sm", errors.content && "border-red-500")}
          {...register("content")}
        />
        {errors.content && (
          <span className="text-xs text-red-500">{errors.content.message}</span>
        )}
      </div>

      <div className="flex justify-end gap-3">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isPending}
            className="px-8 h-9 rounded-lg border-accent-foreground font-semibold cursor-pointer "
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          disabled={isDisabled}
          className={cn(
            "px-8 h-9 rounded-lg text-white text-sm font-semibold transition-all duration-200",
            !isDisabled
              ? `${submitColor} cursor-pointer`
              : "bg-muted-foreground cursor-not-allowed",
          )}
        >
          {isPending ? pendingLabel : submitLabel}
        </Button>
      </div>
    </form>
  );
}
