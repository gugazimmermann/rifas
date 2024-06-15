import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z
    .string()
    .min(6, { message: "Senha deve ter no mínimo 6 caracteres" }),
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  phone: z.string().min(1, { message: "Telefone é obrigatório" }),
  street: z.string().min(1, { message: "Rua é obrigatória" }),
  number: z.string().optional(),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, { message: "Bairro é obrigatório" }),
  city: z.string().min(1, { message: "Cidade é obrigatória" }),
  state: z.string().min(1, { message: "Estado é obrigatório" }),
  zipCode: z.string().min(1, { message: "CEP é obrigatório" }),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, { message: "Token é obrigatório" }),
  password: z
    .string()
    .min(6, { message: "Senha deve ter no mínimo 6 caracteres" }),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z
    .string()
    .min(6, { message: "Senha deve ter no mínimo 6 caracteres" }),
});

export type SignupSchema = z.infer<typeof signupSchema> & {
  serverError?: string;
};

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema> & {
  serverError?: string;
  successMessage?: string;
};

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export type LoginSchema = z.infer<typeof loginSchema>;
