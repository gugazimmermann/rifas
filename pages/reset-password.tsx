import { useEffect } from "react";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import HomeLayout from "@/components/HomeLayout";
import FormInput from "@/components/FormInput";
import FormButton from "@/components/FormButton";
import FormLink from "@/components/FormLink";
import { resetPasswordSchema, ResetPasswordSchema } from "@/utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ResetPassword() {
  const router = useRouter();
  const { token } = router.query;

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
    register,
    setValue,
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { token: "", password: "" },
  });

  useEffect(() => {
    if (token) {
      setValue("token", token as string);
    }
  }, [token, setValue]);

  const onSubmit = async (data: ResetPasswordSchema) => {
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/login");
      } else {
        const errorData = await res.json();
        setError("root.serverError", {
          message: errorData.error || "Erro ao redefinir senha",
        });
      }
    } catch (error: any) {
      setError("root.serverError", {
        message: error.message || "Erro ao redefinir senha",
      });
    }
  };

  return (
    <HomeLayout>
      <div className="flex flex-1 flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Redefinir Senha</h1>
        {errors.root?.serverError && (
          <p className="text-red-500 font-bold mb-4">
            {errors.root.serverError.message}
          </p>
        )}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg"
        >
          <input type="hidden" {...register("token")} />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <FormInput
                id="password"
                label="Nova Senha"
                type="password"
                {...field}
                error={errors.password?.message}
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
