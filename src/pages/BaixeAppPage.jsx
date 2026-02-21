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

      <section className="lg:w-2/3 bg-[#FFFFFF] font-poppins justify-center items-center flex justify-self-center">
        <div className="max-w-7xl mx-auto px-6 py-6 gap-12 items-center">
          {/* Coluna da Esquerda: Texto e Botões */}
          <div className="flex flex-col gap-6 text-center items-center justify-center">
            <p className="text-gray-700 text-lg">
              Acompanhe os cultos, acesse estudos bíblicos, faça suas doações e
              receba notificações importantes diretamente no seu celular.
            </p>

            <div className="flex flex-wrap gap-4 mt-4 items-center justify-center">
              {/* Botão App Store + QR Code Pequeno */}
              <div className="flex flex-col items-center gap-2">
                <button className="w-52 bg-black text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-gray-800 transition-all">
                  <a href={STORE_LINK.apple} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3" aria-label="Baixar na App Store (abre em nova aba)">
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
                  alt="QR Code para baixar o app na App Store"
                  className="w-52 h-52 border p-1 bg-white rounded-lg shadow-sm"
                />
              </div>

              {/* Botão Google Play + QR Code Pequeno */}
              <div className="flex flex-col items-center gap-2">
                <button className="w-52 bg-black text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-gray-800 transition-all">
                  <a href={STORE_LINK.android} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3" aria-label="Baixar na Google Play (abre em nova aba)">
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
                  alt="QR Code para baixar o app na Google Play"
                  className="w-52 h-52 border p-1 bg-white rounded-lg shadow-sm"
                />
              </div>
            </div>
          </div>

        </div>
      </section>
    </ContentPageLayout>
  );
}
