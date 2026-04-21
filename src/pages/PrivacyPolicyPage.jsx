import { Link } from "react-router-dom";
import ContentPageLayout from "../components/ContentPageLayout";
import { CONTACT } from "../data/constants";

/**
 * Política de Privacidade e Uso de Imagem — texto institucional com complemento
 * mínimo sobre o site (cookies, integrações digitais).
 */
export default function PrivacyPolicyPage() {
  const headingClass =
    "text-xl font-semibold text-[#216F48] scroll-mt-24 font-[Poppins,sans-serif]";

  return (
    <ContentPageLayout
      title="Política de Privacidade e Uso de Imagem"
      subtitle="LGPD (Lei nº 13.709/2018) e Lei de Direitos Autorais (Lei nº 9.610/1998)"
    >
      <section className="space-y-8">
        <p>
          A <strong>Igreja Presbiteriana da Penha</strong>, em parceria com a plataforma Eklesia, compromete-se a
          tratar com ética e segurança todas as informações pessoais e imagens coletadas em suas atividades, cultos,
          eventos e canais digitais, conforme a LGPD (Lei nº 13.709/2018) e a Lei de Direitos Autorais (Lei nº
          9.610/1998).
        </p>

        <h2 id="coleta" className={headingClass}>
          1. Coleta de informações
        </h2>
        <p>A coleta ocorre quando o participante:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>preenche formulários de cadastro, inscrição ou voluntariado;</li>
          <li>utiliza o aplicativo ou site da igreja;</li>
          <li>participa de cultos, eventos ou transmissões online.</li>
        </ul>
        <p>Os dados podem incluir nome, CPF, e-mail, telefone, endereço, data de nascimento e imagem.</p>

        <h2 id="finalidade" className={headingClass}>
          2. Finalidade
        </h2>
        <p>As informações são usadas para:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>gestão administrativa e pastoral da igreja;</li>
          <li>comunicação de atividades, eventos e campanhas;</li>
          <li>registro histórico e estatístico;</li>
          <li>divulgação de conteúdos institucionais, transmissões e materiais audiovisuais.</li>
        </ul>

        <h2 id="imagem" className={headingClass}>
          3. Uso de imagem e voz
        </h2>
        <p>
          Ao ingressar nos ambientes da igreja ou participar de suas atividades, o membro ou visitante autoriza, de
          forma gratuita, o uso de sua imagem, voz e testemunhos em transmissões, fotos, vídeos e materiais de
          divulgação, em mídias digitais ou impressas. Esse consentimento é livre, informado e inequívoco, podendo
          ser revogado a qualquer momento mediante solicitação formal à igreja.
        </p>

        <h2 id="seguranca" className={headingClass}>
          4. Acesso e segurança
        </h2>
        <p>
          O acesso aos dados é restrito a pessoas autorizadas, mediante compromisso de confidencialidade. A igreja
          adota medidas de segurança compatíveis com as melhores práticas de proteção de dados.
        </p>

        <h2 id="direitos" className={headingClass}>
          5. Direitos do titular
        </h2>
        <p>O titular pode, a qualquer tempo, solicitar:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>confirmação da existência de tratamento;</li>
          <li>correção, atualização ou exclusão de dados;</li>
          <li>revogação de consentimento.</li>
        </ul>
        <p>
          As solicitações devem ser feitas pelos canais oficiais da igreja. Neste site, você pode utilizar o contato
          por e-mail:{" "}
          <a href={`mailto:${CONTACT.email}`} className="text-[#216F48] underline">
            {CONTACT.email}
          </a>
          , ou o endereço: {CONTACT.address}, {CONTACT.city}.
        </p>

        <h2 id="cookies" className={headingClass}>
          6. Site e dados neste ambiente digital
        </h2>
        <p className="text-sm text-gray-700">
          Complemento específico ao uso deste site: utilizamos medidas como conexão HTTPS e registro da sua escolha
          quanto ao carregamento incorporado de vídeo (YouTube) e feed (Instagram/Meta), mediante consentimento
          obtido pelo banner de cookies, associado a identificador técnico em cookie de primeira parte (HttpOnly), conforme
          descrito no rodapé em “Preferências de cookies”. O site pode carregar fontes via Google Fonts e integrar
          agenda ou inscrições com sistemas de gestão (por exemplo, Eklesia); nesses casos aplicam-se também as
          políticas dos respectivos fornecedores.
        </p>

        <p className="text-sm text-gray-600 pt-2">
          <strong>Última atualização:</strong> abril de 2026.
        </p>

        <p className="pt-4">
          <Link
            to="/"
            className="text-[#216F48] font-medium underline focus:outline-none focus:ring-2 focus:ring-[#216F48] focus:ring-offset-2 rounded"
          >
            Voltar à página inicial
          </Link>
        </p>
      </section>
    </ContentPageLayout>
  );
}
