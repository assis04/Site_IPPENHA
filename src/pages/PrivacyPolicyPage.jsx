import { Link } from "react-router-dom";
import ContentPageLayout from "../components/ContentPageLayout";
import { CONTACT } from "../data/constants";

/**
 * Política de Privacidade (LGPD) — modelo para revisão jurídica.
 */
export default function PrivacyPolicyPage() {
  return (
    <ContentPageLayout
      title="Política de Privacidade"
      subtitle="Lei Geral de Proteção de Dados (Lei nº 13.709/2018)"
      highlight="Este texto tem caráter informativo. Recomendamos que seja revisado por profissional habilitado (OAB) conforme a realidade da igreja e dos fornecedores de serviço."
    >
      <section className="space-y-8">
        <p>
          A <strong>Igreja Presbiteriana da Penha</strong> (“nós”, “nosso site”) respeita a privacidade dos
          visitantes e se compromete com a transparência sobre o tratamento de dados pessoais, em conformidade
          com a Lei Geral de Proteção de Dados Pessoais (LGPD).
        </p>

        <h2
          id="controlador"
          className="text-xl font-semibold text-[#216F48] scroll-mt-24"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          1. Controlador e contato
        </h2>
        <p>
          <strong>Controlador:</strong> Igreja Presbiteriana da Penha.
          <br />
          <strong>Endereço:</strong> {CONTACT.address}, {CONTACT.city}.
          <br />
          <strong>Canal para exercício de direitos e dúvidas sobre privacidade:</strong>{" "}
          <a href={`mailto:${CONTACT.email}`} className="text-[#216F48] underline">
            {CONTACT.email}
          </a>
          .
        </p>

        <h2
          id="dados"
          className="text-xl font-semibold text-[#216F48] scroll-mt-24"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          2. Quais dados podem ser tratados
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Dados de navegação:</strong> informações técnicas enviadas pelo navegador (como endereço IP,
            tipo de dispositivo e páginas acessadas), quando necessárias para segurança, estatísticas agregadas ou
            funcionamento do site.
          </li>
          <li>
            <strong>Dados fornecidos por você:</strong> quando entrar em contato por e-mail, telefone ou
            inscrições em serviços de terceiros (por exemplo, sistemas de gestão de eventos) vinculados a links do
            site.
          </li>
          <li>
            <strong>Cookies e armazenamento local:</strong> utilizamos armazenamento no seu dispositivo apenas
            para registrar sua preferência quanto ao carregamento de conteúdo de terceiros (veja a seção Cookies).
          </li>
        </ul>

        <h2
          id="finalidades"
          className="text-xl font-semibold text-[#216F48] scroll-mt-24"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          3. Finalidades e bases legais (LGPD)
        </h2>
        <p>
          Tratamos dados pessoais para: funcionamento e melhoria do site; cumprimento de obrigações legais;
          comunicação com interessados; e, quando aplicável, com base no <strong>consentimento</strong> para
          incorporação de conteúdo de terceiros (YouTube, exibição do feed do Instagram). A base legal específica
          pode variar conforme cada atividade — detalhes adicionais podem ser solicitados pelo canal indicado
          acima.
        </p>

        <h2
          id="terceiros"
          className="text-xl font-semibold text-[#216F48] scroll-mt-24"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          4. Fornecedores e conteúdo de terceiros
        </h2>
        <p>O site pode integrar ou apontar para serviços de terceiros, entre eles:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Google Fonts</strong> — carregamento de fontes a partir dos domínios do Google.
          </li>
          <li>
            <strong>YouTube (Google)</strong> — vídeo incorporado na página inicial, quando você aceita “conteúdo de
            terceiros”.
          </li>
          <li>
            <strong>Meta / Instagram</strong> — feed exibido no site mediante API e imagens hospedadas na rede
            social, quando você aceita “conteúdo de terceiros”.
          </li>
          <li>
            <strong>Eklesia / gestão de eventos</strong> — agenda e links de inscrição podem direcionar a
            plataformas de terceiros, que possuem políticas próprias.
          </li>
          <li>
            <strong>Hospedagem e infraestrutura</strong> — conforme contrato com o provedor do site.
          </li>
        </ul>
        <p>
          Recomendamos a leitura das políticas de privacidade desses fornecedores. Não controlamos o tratamento de
          dados feito diretamente por eles.
        </p>

        <h2
          id="cookies"
          className="text-xl font-semibold text-[#216F48] scroll-mt-24"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          5. Cookies e preferências
        </h2>
        <p>
          Ao visitar o site, você pode escolher entre manter apenas o necessário ao funcionamento básico ou também
          permitir o carregamento de incorporações (YouTube) e do feed do Instagram. A preferência é registrada em
          nosso servidor (banco de dados), associada a um identificador técnico armazenado em cookie de primeira
          parte (HttpOnly, não acessível por scripts). Um espelho pode ser mantido no armazenamento local do
          navegador apenas para funcionamento offline ou falha temporária da API. Você pode alterar ou revogar pelo
          link <strong>Preferências de cookies</strong> no rodapé.
        </p>

        <h2
          id="direitos"
          className="text-xl font-semibold text-[#216F48] scroll-mt-24"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          6. Direitos dos titulares (art. 18 da LGPD)
        </h2>
        <p>
          Você pode solicitar confirmação de tratamento, acesso, correção, anonimização, eliminação, portabilidade,
          informação sobre compartilhamento e revogação de consentimento, quando aplicável, observadas as exceções
          legais. Envie seu pedido para o e-mail indicado na seção “Controlador e contato”.
        </p>

        <h2
          id="seguranca"
          className="text-xl font-semibold text-[#216F48] scroll-mt-24"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          7. Segurança e retenção
        </h2>
        <p>
          Adotamos medidas técnicas e organizacionais compatíveis com o risco, como uso de HTTPS e boas práticas no
          desenvolvimento. Os prazos de retenção dependem da finalidade (por exemplo, mensagens de contato,
          registros exigidos em lei ou política do provedor).
        </p>

        <h2
          id="alteracoes"
          className="text-xl font-semibold text-[#216F48] scroll-mt-24"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          8. Alterações
        </h2>
        <p>
          Esta política pode ser atualizada. A data da versão vigente deve ser indicada abaixo após revisões
          formais pela liderança da igreja.
        </p>
        <p className="text-sm text-gray-600">
          <strong>Versão:</strong> 1.0 (março de 2026).
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
