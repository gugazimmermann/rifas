import { useState } from "react";
import { z, ZodSchema } from "zod";

type UseFormHandlerProps<T> = {
  initialValues: T;
  validationSchema: ZodSchema<T>;
  onSubmit: (data: T) => Promise<string>;
  onSuccess?: () => void;
};

export default function useFormHandler<T>({
  initialValues,
  validationSchema,
  onSubmit,
  onSuccess,
}: UseFormHandlerProps<T>) {
  const [form, setForm] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value || "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    try {
      validationSchema.parse(form);
      const message = await onSubmit(form);
      if (message === "success" && onSuccess) onSuccess();
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof T, string>> =
          error.errors.reduce(
            (acc, curr) => {
              const path = curr.path[0] as keyof T;
              acc[path] = curr.message;
              return acc;
            },
            {} as Partial<Record<keyof T, string>>
          );
        setErrors(fieldErrors);
      } else {
        setServerError(error.message);
      }
    }
  };

  return { form, handleChange, handleSubmit, errors, serverError };
}
