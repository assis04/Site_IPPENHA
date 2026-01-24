import IPPENHA from "./assets/IPPENHA.svg";
import logo from "./assets/logo.svg";
function App() {
  return (
    <div>
      <header className="lg:w-full lg:h-25 bg-gray-200 items-center justify-center">
        <div className="bg-[#3AAF7D] lg:h-2"></div>
        <ul className=" lg:w-3/4 lg:h-full flex items-center justify-between bg-white">
          <li><img src={logo} alt="" /></li>
          <li>Igreja</li>
          <li>Ministerios</li>
          <li>Agenda</li>
          <li>Estudos</li>
          <li>Ação Social</li>
          <li>Baixar o APP</li>
          <li>
            <button>Contribua</button>
          </li>
          <li>Inta</li>
          <li>Youtube</li>
        </ul>
      </header>
      <main className= "lg:w-full lg:h-screen bg-[#D9D9D9]">
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
              <div className="flex lg:gap-20">
                <button>Venha nos visitar </button>
                <button>Assistir Online</button>
              </div>
            </div>
            <div>
              <img className= "lg:w-120" src={IPPENHA} alt="Logo IPPENHA"/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
