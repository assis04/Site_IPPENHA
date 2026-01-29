import {InstagramLogoIcon, YoutubeLogoIcon } from "@phosphor-icons/react";
import IPPENHA from "./assets/IPPENHA.svg";
import logo from "./assets/logo.svg";
function App() {
  return (
    <>
      <header className="lg:w-full lg:h-25 bg-gray-200 items-center justify-center">
        <div className="bg-[#3AAF7D] lg:h-2"></div>
        <ul className=" lg:px-30 lg:h-full flex items-center justify-around bg-white">
          <li><img src={logo} alt="Logo da Igreja Presbiteriana da Penha" /></li>
          <li>Igreja</li>
          <li>Ministerios</li>
          <li>Agenda</li>
          <li>Estudos</li>
          <li>Ação Social</li>
          <li>Baixar o APP</li>
          <li>
            <button className="bg-[#0F715C] text-white px-6 py-2 rounded-3xl">Contribua</button>
          </li>
          <li className="bg-[#d2d2d2] p-1 rounded-3xl"><YoutubeLogoIcon size={29} color="#000000" weight="fill" /></li>
          <li className="bg-[#d2d2d2] p-1 rounded-3xl"><InstagramLogoIcon size={29} color="#000000" weight="regular" /></li>
          
        </ul>
      </header>
      <main className= "lg:w-full lg:h-screen bg-[#F0F2E4]">
        <div className="bg-[url('../assets/Fundo.svg')] lg:w-full lg:h-full flex bg-contain bg-no-repeat">
          <div className="flex w-full  justify-center lg:gap-70 lg:ml-25 lg:mt-25 ">
            <div className=" flex flex-col  text-left items-start lg:w-1/4 lg:gap-2">
              <h1 className="text-black-700 lg:text-3xl font-bold">
                Alcançados pela Graça, <br/>Enviados para Servir.
              </h1>
              <p className="text-white lg:text-2xl">
                Na Igreja Presbiteriana da Penha, vivemos a alegria de pertencer a
                Deus. Somos uma comunidade de fé reformada que ama a Bíblia e se
                dedica com fervor à missão de proclamar Cristo em nosso bairro e
                em todo o mundo. Venha ser parte de uma família que acolhe e
                transforma.
              </p>
              <div className="flex lg:gap-15">
                <button className="bg-[#0F715C] text-white px-4 rounded-3xl">Venha nos visitar </button>
                <button className="border border-white text-white px-4  rounded-3xl">Assistir Online</button>
              </div>
            </div>
            <div>
              <img className= "lg:w-120" src={IPPENHA} alt="Logo IPPENHA"/>
            </div>
          </div>
        </div>
        <div className="lg:h-71 flex lg:w-full bg-white justify-center items-center lg:gap-10 lg:flex lg:mt-10">
          <div className="bg-[#0F715C] text-white w-60 h-60 p-10 text-sm rounded-4xl">Cultos Dominicais 9h | 18h <br /> Culto Hispano 11h</div>
          <div className="bg-[#0F715C] text-white w-60 h-60 p-10 text-sm rounded-4xl"><button>Inscreva-se</button></div>
          <div className="bg-[#0F715C] text-white w-60 h-60 p-10 text-sm rounded-4xl">3</div>
          <div className="bg-[#0F715C] text-white w-60 h-60 p-10 text-sm rounded-4xl">4</div>
          <div className="bg-[#0F715C] text-white w-60 h-60 p-10 text-sm rounded-4xl">5</div>
        </div>
      </main>
    </>
  );
}

export default App;
