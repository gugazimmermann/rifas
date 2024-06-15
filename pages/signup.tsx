import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import HomeLayout from "@/components/HomeLayout";
import FormInput from "@/components/FormInput";
import FormButton from "@/components/FormButton";
import FormLink from "@/components/FormLink";
import { signupSchema, SignupSchema } from "@/utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Signup() {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      phone: "",
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });

  const onSubmit = async (data: SignupSchema) => {
    try {
      const res = await fetch("/api/auth/signup", {
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
          message: errorData.error || "Erro ao criar cadastro",
        });
      }
    } catch (error: any) {
      setError("root.serverError", {
        message: error.message || "Erro ao criar cadastro",
      });
    }
  };

  return (
    <HomeLayout>
      <h1 className="text-3xl font-bold m-4 text-center">Cadastro</h1>
      {errors.root?.serverError && (
        <p className="text-red-500 font-bold text-center mt-4">
          {errors.root.serverError.message}
        </p>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto">
        <div className="flex flex-row px-8 gap-8">
          <div className="w-1/2">
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
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <FormInput
                  id="name"
                  label="Nome"
                  type="text"
                  {...field}
                  error={errors.name?.message}
                />
              )}
            />
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <FormInput
                  id="phone"
                  label="Telefone"
                  type="text"
                  mask="(00) 00000-0000"
                  {...field}
                  error={errors.phone?.message}
                />
              )}
            />
          </div>
          <div className="w-1/2">
            <Controller
              name="street"
              control={control}
              render={({ field }) => (
                <FormInput
                  id="street"
                  label="Rua"
                  type="text"
                  {...field}
                  error={errors.street?.message}
                />
              )}
            />
            <Controller
              name="number"
              control={control}
              render={({ field }) => (
                <FormInput
                  id="number"
                  label="Número"
                  type="text"
                  {...field}
                  error={errors.number?.message}
                />
              )}
            />
            <Controller
              name="complement"
              control={control}
              render={({ field }) => (
                <FormInput
                  id="complement"
                  label="Complemento"
                  type="text"
                  {...field}
                  error={errors.complement?.message}
                />
              )}
            />
            <Controller
              name="neighborhood"
              control={control}
              render={({ field }) => (
                <FormInput
                  id="neighborhood"
                  label="Bairro"
                  type="text"
                  {...field}
                  error={errors.neighborhood?.message}
                />
              )}
            />
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <FormInput
                  id="city"
                  label="Cidade"
                  type="text"
                  {...field}
                  error={errors.city?.message}
                />
              )}
            />
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <FormInput
                  id="state"
                  label="Estado"
                  type="text"
                  mask="aa"
                  {...field}
                  error={errors.state?.message}
                />
              )}
            />
            <Controller
              name="zipCode"
              control={control}
              render={({ field }) => (
                <FormInput
                  id="zipCode"
                  label="CEP"
                  type="text"
                  mask="00.000-000"
                  {...field}
                  error={errors.zipCode?.message}
                />
              )}
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <FormButton text="Cadastrar" />
        </div>
      </form>
      <div className="mt-4 w-full text-center">
        <FormLink to="/" text="Voltar" />
      </div>
    </HomeLayout>
  );
}
