import Buscador from "../components/Buscador";
import Header from "../components/Header";

export default function HomeView() {
  return (
    <>
      <Header />
      <main className="bg-gray-100 py-10 min-h-screen imagen-fondo">
        <div className="max-w-5xl mx-auto mt-10">
          <div className="lg:w-1/2 px-10 lg:p-0 space-y-6">
            <h1 className="text-5xl font-black">
              Todas tus <span className="text-cyan-400">redes sociales</span> en
              un enlace
            </h1>
            <p className="text-slate-800 text-xl">
              Únete a la comunidad de developers compartiendo sus redes
              sociales, comparte tu perfil de TikTok, Facebook, Instagram,
              Youtube y más
            </p>

            <Buscador />
          </div>
        </div>
      </main>
    </>
  );
}
