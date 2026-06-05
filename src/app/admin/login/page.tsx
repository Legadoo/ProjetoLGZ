import Link from "next/link";
import { FaLock, FaUserShield } from "react-icons/fa";
import { loginAdminAction } from "@/actions/auth.actions";

type PageProps = {
  searchParams?: Promise<{
    error?: string;
  }>;
};

function getErrorMessage(error?: string) {
  if (error === "missing") {
    return "Preencha e-mail e senha.";
  }

  if (error === "invalid") {
    return "E-mail ou senha inválidos.";
  }

  return null;
}

export default async function AdminLoginPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const errorMessage = getErrorMessage(params?.error);

  return (
    <main className="min-h-screen bg-[#050008] px-4 py-10 text-white">
      <section className="mx-auto grid min-h-[calc(100vh-80px)] max-w-6xl items-center gap-8 lg:grid-cols-[1fr_480px]">
        <div>
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-purple-500/30 bg-purple-950/30 px-5 py-3 text-sm font-black uppercase text-purple-200">
            <FaUserShield />
            Acesso administrativo
          </div>

          <h1 className="text-5xl font-black uppercase leading-none md:text-7xl">
            LGZ <span className="lgz-text-gradient block">Admin</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
            Área interna exclusiva para gerenciamento da Legendaryz. Admins acessam produtos, pedidos,
            clientes, influenciadores, staff, calendário e configurações gerais.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex rounded-xl border border-purple-500/40 px-5 py-3 text-sm font-black uppercase text-purple-200 transition hover:bg-purple-950/40"
          >
            Voltar para o site
          </Link>
        </div>

        <form action={loginAdminAction} className="lgz-panel rounded-3xl p-8">
          <div className="mb-8 grid h-16 w-16 place-items-center rounded-2xl border border-purple-500/40 bg-purple-950/40 text-2xl text-purple-200">
            <FaLock />
          </div>

          <h2 className="text-3xl font-black uppercase">Entrar no painel</h2>

          <p className="mt-3 text-sm leading-6 text-zinc-400">
            Use sua conta administrativa da Legendaryz.
          </p>

          {errorMessage && (
            <div className="mt-5 rounded-xl border border-red-500/40 bg-red-950/30 p-4 text-sm text-red-200">
              {errorMessage}
            </div>
          )}

          <div className="mt-6 grid gap-4">
            <label className="grid gap-2">
              <span className="text-sm font-bold uppercase text-zinc-300">E-mail</span>
              <input
                name="email"
                type="email"
                defaultValue="admin@legendaryz.gg"
                className="h-12 rounded-xl border border-purple-500/30 bg-black/50 px-4 text-white outline-none transition focus:border-purple-300"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-bold uppercase text-zinc-300">Senha</span>
              <input
                name="password"
                type="password"
                defaultValue="admin123"
                className="h-12 rounded-xl border border-purple-500/30 bg-black/50 px-4 text-white outline-none transition focus:border-purple-300"
              />
            </label>
          </div>

          <button type="submit" className="lgz-button mt-8 w-full">
            Acessar admin
          </button>
        </form>
      </section>
    </main>
  );
}