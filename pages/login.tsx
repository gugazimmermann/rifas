import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import HomeLayout from "@/components/HomeLayout";
import FormInput from "@/components/FormInput";
import FormButton from "@/components/FormButton";
import FormLink from "@/components/FormLink";
import { loginSchema, LoginSchema } from "@/utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Login() {
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/dashboard");
      } else {
        const errorData = await res.json();
        setError("root.serverError", {
          message: errorData.error_description || "Falha ao realizar o Login",
        });
      }
    } catch (error: any) {
      setError("root.serverError", {
        message: error.message || "Falha ao realizar o Login",
      });
    }
  };

  return (
    <HomeLayout>
      <div className="flex flex-1 flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Entrar</h1>
        {errors.root?.serverError && (
          <p className="text-red-500 font-bold mb-4">
            {errors.root.serverError.message}
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
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <FormInput
                id="password"
                label="Senha"
                type="password"
                {...field}
                error={errors.password?.message}
              />
            )}
          />
          <div className="flex items-center justify-center">
            <FormButton text="Entrar" />
          </div>
        </form>
        <div className="mt-4">
          <FormLink to="/forgot-password" text="Esqueceu a senha?" />
        </div>
        <div className="mt-2">
          <FormLink to="/signup" text="Novo cadastro" />
        </div>
        <div className="mt-2">
          <FormLink to="/" text="Voltar" />
        </div>
      </div>
    </HomeLayout>
  );
}
