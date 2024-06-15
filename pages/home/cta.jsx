import { signIn } from "next-auth/react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-sky-500 rounded-lg">
      <div className="flex flex-col items-center px-4 py-12 mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white">
          Leve suas rifas para outro nível
        </h2>

        <p className="block max-w-4xl mt-4 text-white">
          Tenha controle total, automatize as tarefas repetitivas, tenha
          relatórios e controle fincanceiro.
        </p>

        <div className="mt-6">
          <Link href="/login">
            <span className="inline-flex items-center justify-center px-4 py-2.5 overflow-hidden text-sm text-white transition-colors duration-300 rounded-lg shadow w-auto mx-2 bg-gray-800 hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80">
              <span className="mx-2">Entrar no Sistema</span>
            </span>
          </Link>
          <Link href="/signup">
            <span className="inline-flex items-center justify-center px-4 py-2.5 overflow-hidden text-sm text-white transition-colors duration-300 rounded-lg shadow w-auto mx-2 bg-blue-800 hover:bg-blue-700 focus:ring focus:ring-blue-300 focus:ring-opacity-80">
              <span className="mx-2">Faça seu Cadastro</span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
