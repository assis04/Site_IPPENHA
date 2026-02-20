import { useState } from "react";
import { CopySimple, Check } from "@phosphor-icons/react";
import ContentPageLayout from "../components/ContentPageLayout";

const BANK_ACCOUNTS = [
  {
    bankCode: "237",
    bankName: "BANCO BRADESCO",
    agency: "0118-0",
    account: "208606-9",
    pixKey: "62.946.058/0001-80",
    pixLabel: "CNPJ",
  },
  {
    bankCode: "341",
    bankName: "BANCO ITAÚ",
    agency: "0738",
    account: "51137-7",
    pixKey: "tesouraria.ippenha@gmail.com",
    pixLabel: "E-mail",
  },
];

const CNPJ = "62.946.058/0001-80";

export default function ContribuaPage() {
  return (
    <ContentPageLayout title="Contribua" subtitle="Depósitos ou Transferências">
      <div className="not-prose">
        {/* Cabeçalho institucional */}
        <div className="mb-10">
          <h2
            className="text-black mb-1"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: "22px",
              lineHeight: "1.4",
            }}
          >
            IGREJA PRESBITERIANA DA PENHA
          </h2>
          <div className="flex items-center gap-2 text-gray-600">
            <span
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400,
                fontSize: "16px",
              }}
            >
              CNPJ: {CNPJ}
            </span>
            <CopyButton value={CNPJ} label="CNPJ" />
          </div>
        </div>

        {/* Cards dos bancos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BANK_ACCOUNTS.map((bank) => (
            <BankCard key={bank.bankCode} bank={bank} />
          ))}
        </div>
      </div>
    </ContentPageLayout>
  );
}

function BankCard({ bank }) {
  return (
    <article className="bg-[#F0F2E4] rounded-2xl p-6 sm:p-8 shadow-sm">
      {/* Badge do banco */}
      <div className="inline-block bg-[#216F48] text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
        {bank.bankCode} — {bank.bankName}
      </div>

      {/* Dados da conta */}
      <dl
        className="space-y-3 text-gray-700"
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "16px",
          lineHeight: "1.5",
        }}
      >
        <div>
          <dt className="text-xs uppercase tracking-wide text-gray-500 font-medium">
            Agência
          </dt>
          <dd className="font-semibold text-black">{bank.agency}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-gray-500 font-medium">
            Conta
          </dt>
          <dd className="font-semibold text-black">{bank.account}</dd>
        </div>

        {/* Chave PIX */}
        <div className="pt-3 border-t border-gray-300/50">
          <dt className="text-xs uppercase tracking-wide text-gray-500 font-medium mb-1">
            Chave PIX ({bank.pixLabel})
          </dt>
          <dd className="flex items-center gap-2">
            <span className="font-semibold text-[#216F48] break-all">
              {bank.pixKey}
            </span>
            <CopyButton value={bank.pixKey} label={`Chave PIX ${bank.bankName}`} />
          </dd>
        </div>
      </dl>
    </article>
  );
}

function CopyButton({ value, label }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = value;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="shrink-0 p-1.5 rounded-lg hover:bg-[#216F48]/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#216F48] focus:ring-offset-1"
      aria-label={copied ? `${label} copiado` : `Copiar ${label}`}
      title={copied ? "Copiado!" : "Copiar"}
    >
      {copied ? (
        <Check size={18} weight="bold" className="text-[#216F48]" />
      ) : (
        <CopySimple size={18} weight="bold" className="text-gray-500" />
      )}
    </button>
  );
}
