import Link from "next/link";
import { FaGamepad, FaLock, FaUserShield } from "react-icons/fa";
import { loginUnifiedAction } from "@/actions/auth.actions";
import { PublicFooter } from "@/components/public/PublicFooter";
import { PublicHeader } from "@/components/public/PublicHeader";

type PageProps = {
  searchParams?: Promise<{
    error?: string;
    area?: string;
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

export default async function LoginPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const errorMessage = getErrorMessage(params?.error);
  const isAdminArea = params?.area === "admin";

  return (
    <>
      <PublicHeader />

      <main className="lgz-container grid min-h-[calc(100vh-220px)] items-center gap-8 py-10 lg:grid-cols-[1fr_480px]">
        <section>
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-purple-500/30 bg-purple-950/30 px-5 py-3 text-sm font-black uppercase text-purple-200">
            {isAdminArea ? <FaUserShield /> : <FaGamepad />}
            {isAdminArea ? "Acesso administrativo" : "Área do cliente"}
          </div>

          <h1 className="text-5xl font-black uppercase leading-none md:text-7xl">
            Entre na <span className="lgz-text-gradient block">Legendaryz</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
            Use seu e-mail e senha. Se sua conta for administrativa, você será levado para o painel admin.
            Se sua conta for de cliente, você será levado para a área da sua conta.
          </p>

          <div className="mt-8 grid gap-3 rounded-2xl border border-purple-500/30 bg-black/30 p-5 text-sm text-zinc-300">
            <p>
              <strong className="text-purple-200">Admin teste:</strong> admin@legendaryz.gg / admin123
            </p>
            <p>
              <strong className="text-purple-200">Cliente teste:</strong> cliente@legendaryz.gg / cliente123
            </p>
          </div>

          <Link
            href="/"
            className="mt-8 inline-flex rounded-xl border border-purple-500/40 px-5 py-3 text-sm font-black uppercase text-purple-200 transition hover:bg-purple-950/40"
          >
            Voltar para o site
          </Link>
        </section>

        <form action={loginUnifiedAction} className="lgz-panel rounded-3xl p-8">
          <div className="mb-8 grid h-16 w-16 place-items-center rounded-2xl border border-purple-500/40 bg-purple-950/40 text-2xl text-purple-200">
            <FaLock />
          </div>

          <h2 className="text-3xl font-black uppercase">Login único</h2>

          <p className="mt-3 text-sm leading-6 text-zinc-400">
            A Legendaryz identifica automaticamente se você é admin ou cliente.
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
                placeholder="Digite seu e-mail"
                defaultValue={isAdminArea ? "admin@legendaryz.gg" : "cliente@legendaryz.gg"}
                className="h-12 rounded-xl border border-purple-500/30 bg-black/50 px-4 text-white outline-none transition focus:border-purple-300"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-bold uppercase text-zinc-300">Senha</span>
              <input
                name="password"
                type="password"
                placeholder="Digite sua senha"
                defaultValue={isAdminArea ? "admin123" : "cliente123"}
                className="h-12 rounded-xl border border-purple-500/30 bg-black/50 px-4 text-white outline-none transition focus:border-purple-300"
              />
            </label>
          </div>

          <button type="submit" className="lgz-button mt-8 w-full">
            Entrar
          </button>

          <p className="mt-5 text-center text-xs leading-5 text-zinc-500">
            Admin e cliente são contas separadas. O redirecionamento depende do tipo da conta.
          </p>
        </form>
      </main>

      <PublicFooter />
    </>
  );
}