import ContentPageLayout from "../components/ContentPageLayout";
import QRCodeAppStore from "../assets/QRcodes/QRCodeAppStore.svg";
import QRCodeGooglePlay from "../assets/QRcodes/QRCodePlayStore.svg";
import { GooglePlayLogoIcon } from "@phosphor-icons/react";
import { AppStoreLogoIcon } from "@phosphor-icons/react";
import { STORE_LINK } from "../data/constants";

export default function BaixeAppPage() {
  return (
    <ContentPageLayout
      title="Baixe o App da IP Penha"
      subtitle="Tenha a IP Penha na palma da sua mão! "
    >
      {/* <div className="flex items-center justify-between">
        <div className="flex flex-col items-center">
          <h2 className="text-center font-bold text-xl">
            QR Code para download do App na App Store
          </h2>
          <img src={QRCodeAppStore} alt="QR Code App Store" className="w-96" />
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-center font-bold text-xl">
            QR Code para download do App no Google Play
          </h2>
          <img
            src={QRCodeGooglePlay}
            alt="QR Code Google Play"
            className="w-96"
          />
        </div>
      </div> */}

      <section className="w-full bg-[#F0F2E4] font-poppins">
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Coluna da Esquerda: Texto e Botões */}
          <div className="flex flex-col gap-6 text-left">
            <p className="text-gray-700 text-lg">
              Acompanhe os cultos, acesse estudos bíblicos, faça suas doações e
              receba notificações importantes diretamente no seu celular.
            </p>

            <div className="flex flex-wrap gap-4 mt-4">
              {/* Botão App Store + QR Code Pequeno */}
              <div className="flex flex-col items-center gap-2">
                <button className=" lg:w-50 bg-black text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-gray-800 transition-all">
                  <a href={STORE_LINK.apple} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                      <AppStoreLogoIcon size={32} />
                      <div className="text-left">
                        <p className="text-[10px] uppercase">Disponível no</p>
                        <p className="text-lg font-semibold leading-tight">
                          App Store
                        </p>
                      </div>
                  </a>
                </button>
                <img
                  src={QRCodeAppStore}
                  alt="QR Code"
                  className="w-50 h-50 border p-1 bg-white rounded-lg shadow-sm"
                />
              </div>

              {/* Botão Google Play + QR Code Pequeno */}
              <div className="flex flex-col items-center gap-2">
                <button className="lg:w-50 bg-black text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-gray-800 transition-all">
                  <a href={STORE_LINK.android} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                      <GooglePlayLogoIcon size={32} />
                      <div className="text-left">
                        <p className="text-[10px] uppercase">Disponível no</p>
                        <p className="text-lg font-semibold leading-tight">
                          Google Play
                        </p>
                      </div>
                  </a>
                </button>
                <img
                  src={QRCodeGooglePlay}
                  alt="QR Code"
                  className="w-50 h-50 border p-1 bg-white rounded-lg shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Coluna da Direita: Mockup do Celular */}
          <div className="flex justify-center relative">
            <div className="absolute w-72 h-72 bg-[#0F715C] rounded-full filter blur-3xl opacity-20 -z-10">
              <img
                src="/app-mockup.png"
                alt="App IP Penha"
                className="w-full max-w-[350px] drop-shadow-2xl animate-bounce-slow"
              />
            </div>
          </div>
        </div>
      </section>
    </ContentPageLayout>
  );
}
