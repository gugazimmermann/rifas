import { useForm, Controller } from "react-hook-form";
import HomeLayout from "@/components/HomeLayout";
import FormInput from "@/components/FormInput";
import FormButton from "@/components/FormButton";
import FormLink from "@/components/FormLink";
import { forgotPasswordSchema, ForgotPasswordSchema } from "@/utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ForgotPassword() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
    setValue,
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgotPasswordSchema) => {
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setValue("email", "");
        const result = await res.json();
        setError("root.successMessage", { message: result.message });
      } else {
        const errorData = await res.json();
        setError("root.serverError", {
          message: errorData.error_description || "Erro ao enviar código",
        });
      }
    } catch (error: any) {
      setError("root.serverError", {
        message: error.message || "Erro ao enviar código",
      });
    }
  };

  return (
    <HomeLayout>
      <div className="flex flex-1 flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Esqueceu a Senha</h1>
        {errors.root?.serverError && (
          <p className="text-red-500 font-bold mb-4">
            {errors.root.serverError.message}
          </p>
        )}
        {errors.root?.successMessage && (
          <p className="text-green-500 font-bold mb-4">
            {errors.root.successMessage.message}
          </p>
        )}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg"
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <FormInput
                id="email"
                label="Email"
                type="email"
                {...field}
                error={errors.email?.message}
              />
            )}
          />
          <div className="flex items-center justify-center">
            <FormButton text="Redefinir Senha" />
          </div>
        </form>
        <div className="mt-4 w-full text-center">
          <FormLink to="/login" text="Voltar" />
        </div>
      </div>
    </HomeLayout>
  );
}
