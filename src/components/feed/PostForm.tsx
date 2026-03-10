/**
 * The above code defines a React component called `PostForm` that handles form
 * submission with validation using `react-hook-form` and `zodResolver`.
 * @property {PostFormSchema} initialData - The `initialData` property in the
 * `PostForm` component is used to provide initial values for the form fields.
 * These initial values will be populated in the form fields when the component is
 * rendered. It allows you to pre-fill the form with existing data, which is useful
 * for scenarios like editing existing
 * @property onSubmit - The `onSubmit` property in the `PostForm` component is a
 * function that will be called when the form is submitted. It takes the form data
 * as an argument and typically handles the submission logic, such as making an API
 * request to save the data.
 * @property onCancel - The `onCancel` property in the `PostForm` component is a
 * function that is called when the user clicks on the "Cancel" button in the form.
 * It is optional and can be used to handle the cancellation of the form submission
 * or any other desired action. If provided, it will be
 * @property {boolean} isPending - The `isPending` property in the `PostForm`
 * component is used to indicate whether the form submission is currently pending
 * or in progress. This property is typically used to disable form inputs or show a
 * loading state while the form is being submitted asynchronously. When `isPending`
 * is `true`, it
 * @property {string} submitLabel - The `submitLabel` property in the `PostForm`
 * component is used to define the label text for the submit button when the form
 * is not in a pending state (i.e., when the user can submit the form). It
 * typically represents the action that will be performed when the user clicks the
 * submit
 * @property {string} pendingLabel - The `pendingLabel` property in the `PostForm`
 * component is used to determine the label displayed on the submit button when the
 * form submission is pending or in progress. It allows you to customize the text
 * displayed on the button while the form submission is being processed, typically
 * showing a loading indicator or a
 * @property {string} submitColor - The `submitColor` property in the `PostForm`
 * component is used to specify the background color of the submit button when it
 * is not in a pending state. If no `submitColor` is provided when using the
 * `PostForm` component, it defaults to "bg-primary hover:bg-primary/
 */
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
