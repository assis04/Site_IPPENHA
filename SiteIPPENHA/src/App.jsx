import {
  InstagramLogoIcon,
  YoutubeLogoIcon,
  MapTrifoldIcon,
  PlayIcon,
} from "@phosphor-icons/react";
import IPPENHA from "./assets/IPPENHA.svg";
import logo from "./assets/logo.svg";
import ConexaoComDeus from "./assets/ConexaoComDeus.svg";
import ConexaoComDeusBlack from "./assets/ConexaoComDeusBlack.svg";
import PenhaKids from "./assets/PenhaKids.svg";
import Hebron from "./assets/Hebron.svg";
import QPalavra from "./assets/QPalavra.svg";
import Integraçao from "./assets/Integraçao.svg";
import EBT from "./assets/EBT.svg";
import PastorsSection from "./components/PastorsSection";
import InstagramSection from "./components/InstagramSection";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <header className="w-full bg-white">
        {/* faixa superior */}
        <div className="h-2 bg-[#3AAF7D]" />

        <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src={logo}
              alt="Logo da Igreja Presbiteriana da Penha"
              className="h-12"
            />
          </div>

          {/* Links */}
          <ul className="hidden lg:flex gap-8 items-center text-gray-700 font-medium">
            <li className="hover:text-[#0F715C] cursor-pointer">Igreja</li>
            <li className="hover:text-[#0F715C] cursor-pointer">Ministérios</li>
            <li className="hover:text-[#0F715C] cursor-pointer">Agenda</li>
            <li className="hover:text-[#0F715C] cursor-pointer">Estudos</li>
            <li className="hover:text-[#0F715C] cursor-pointer">Ação Social</li>
            <li className="hover:text-[#0F715C] cursor-pointer">
              Baixar o App
            </li>
          </ul>

          {/* Ações */}
          <div className="flex items-center gap-4">
            <button className="bg-[#0F715C] text-white px-6 py-2 rounded-full hover:opacity-90">
              Contribua
            </button>

            <div className="bg-gray-200 p-2 rounded-full cursor-pointer">
              <YoutubeLogoIcon size={22} weight="fill" />
            </div>

            <div className="bg-gray-200 p-2 rounded-full cursor-pointer">
              <InstagramLogoIcon size={22} />
            </div>
          </div>
        </nav>
      </header>

      <main className="w-full bg-white">
        {/* HERO */}

        <section className="w-full min-h-[90vh] flex items-center bg-[url('../assets/Fundo.svg')] bg-no-repeat bg-top bg-cover">
          {/* CONTEÚDO */}

          <div className=" max-w-7xl m-auto px-28 grid grid-cols-1 lg:grid-cols-2 items-center  ">
            {/* Texto */}
            <div className="flex flex-col gap-6 lg:w-90 ">
              <h1 className="text-xl lg:text-3xl font-bold text-gray-900 leading-tight ">
                Alcançados pela Graça, Enviados para Servir.
              </h1>
              <p className="text-xl text-white">
                Na Igreja Presbiteriana da Penha, vivemos a alegria de pertencer
                a Deus. Somos uma comunidade de fé reformada que ama a Bíblia e
                se dedica com fervor à missão de proclamar Cristo em nosso
                bairro e em todo o mundo. Venha ser parte de uma família que
                acolhe e transforma.
              </p>
              <div className="flex gap-5 justify-around">
                <button className="flex items-center justify-center gap-2 bg-[#0F715C] text-white text-sm w-55 h-9 px-3 rounded-full">
                  Venha nos visitar
                  <MapTrifoldIcon size={20} />
                </button>
                <button className="flex items-center justify-center gap-2 border border-white text-white text-sm w-55 h-9 px-3 rounded-full">
                  Assistir Online
                  <PlayIcon size={20} weight="fill" />
                </button>
              </div>
            </div>

            {/* Imagem */}
            <div className=" flex  justify-end ">
              <img
                src={IPPENHA}
                alt="Imagem da igreja IPPENHA"
                className="max-w-150"
              />
            </div>
          </div>
        </section>

        {/* Seção Cards */}

        <section className="w-full bg-white py-16">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 ">
            <div className="bg-[#3C6F48] text-white p-8 flex flex-col rounded-3xl text-center justify-center">
              <h3 className="font-bold text-2xl">Cultos Dominicais</h3>
              <p>9h | 18h Culto Hispano 11h</p>
            </div>

            <div className="bg-[#F0F2E4] text-black p-8 rounded-3xl flex flex-col items-center text-center  justify-center">
              <img src={EBT} alt="" />
              <button className="font-semibold">Inscreva-se</button>
            </div>

            <div className="bg-[#1F3827] text-white p-8 rounded-3xl flex flex-col items-center text-center  justify-center">
              <img src={ConexaoComDeus} alt="Conexão com Deus" />
              <p>Segunda-feira 20h</p>
            </div>

            <div className="bg-[#E0F2CF] text-black p-8 rounded-3xl flex flex-col items-center text-center  justify-center">
              <h3 className="font-bold text-2xl">Tarde da Esperança</h3>
              <p>Quarta-feira 14h30</p>
            </div>

            <div className="bg-[#3C6F48] text-white p-8 rounded-3xl flex flex-col  items-center text-center  justify-center">
              <h3 className="font-bold text-2xl">ETEP</h3>
              <p>Quinta-feira 20h</p>
            </div>
          </div>
        </section>

        {/* Seção seja bem vindo */}

        <section className="w-full bg-[#F0F2E4] ">
          <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-12 items-center ">
            {/* Container do Vídeo */}
            <div className="w-full lg:w-1/2 aspect-video">
              <iframe
                src="https://www.youtube.com/embed/bEMX8tceKR0"
                title="Vídeo de Boas Vindas"
                loading="lazy"
                className="w-full h-full rounded-2xl shadow-2xl border-none"
                allowFullScreen
              ></iframe>
            </div>
            <div className=" flex flex-col gap-3 py-6 lg:w-150 text-black px-6">
              <h2 className="text-4xl font-bold text-black">
                SEJA BEM VINDO À IPPENHA!
              </h2>
              <p className="text-sm text-black leading-relaxed">
                Na IP Penha, você encontrará uma igreja acolhedora que pulsa com
                a vida de Cristo em cada detalhe. Somos uma igreja de gerações e
                nosso compromisso é criar um ambiente onde as famílias se sintam
                nutridas, onde o ensino da fé bíblica seja o alicerce para uma
                vida de propósito e significado. Somos uma comunidade viva que
                busca refletir a glória de Deus através de relacionamentos
                autênticos e de um acolhimento que abraça a todos.
              </p>
              <p className="text-sm text-black leading-relaxed">
                Amamos o ensino bíblico profundo e vivemos essa verdade de forma
                contemporânea, com cultos vibrantes que celebram a soberania de
                Deus com alegria e fervor.
              </p>
              <p className="text-sm text-black leading-relaxed">
                Entendemos que o nosso chamado é transbordar o amor de Cristo
                servindo ao mundo com integridade e paixão. Ser missional é o
                que nos identifica, unindo a sã doutrina ao serviço na prática.
                Venha caminhar conosco e descobrir como a fé antiga pode ser
                surpreendentemente atual e transformadora para você e sua
                família!
              </p>
            </div>
          </div>
        </section>

        {/* Ministerios */}

        <section className="w-full bg-white">
          <div className="max-w-7xl mx-auto px-6 pt-6 items-center ">
            <h2 className="text-2xl font-bold text-black text-center">
              Ministérios
            </h2>
            <div className="flex gap-16 justify-center py-8">
              <img src={ConexaoComDeusBlack} alt="Conexão com Deus" />
              <img src={EBT} alt="EBT" />
              <img src={Hebron} alt="Hebron" />
              <img src={QPalavra} alt="Q Palavra" />
              <img src={PenhaKids} alt="Penha Kids" />
              <img src={Integraçao} alt="Integração" />
            </div>
          </div>
        </section>

        <PastorsSection />

        <InstagramSection className="mt-20" />
      </main>

      <Footer />
    </>
  );
}

export default App;
