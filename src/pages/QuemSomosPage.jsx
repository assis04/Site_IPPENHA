import ContentPageLayout from "../components/ContentPageLayout";
import igrejaImg from "../assets/pages/igreja-fachada.jpg";

export default function QuemSomosPage() {
  return (
    <ContentPageLayout
      title="Sobre a Igreja"
      image={igrejaImg}
      imageAlt="Fachada da Igreja Presbiteriana da Penha"
    >
      <p className="mb-4">
        Há anos atrás, um grupo de crentes começou a se reunir aos domingos em
        Escola Dominical, na casa do Sr. Luís Gonçalves Ribeiro, e ali se
        reuniram de fevereiro a dezembro de 1947.
      </p>
      <p className="mb-4">
        Durante o ano de 1948, os cultos passaram a acontecer na casa do irmão
        Josias Navarro Jr. e, em 1949 a se realizar na casa da Irmã Angélica de
        Oliveira e do Sr. Rids Xavier de Castilho. Por causa de dificuldades de
        local, houve uma interrupção em 1950, sendo os trabalhos retomados em 11
        de maio de 1951, sob a liderança do Pr. Alfred Stein, da Igreja
        Presbiteriana do Brás.
      </p>
      <p className="mb-4">
        Deus havia concedido uma grande benção, que fora a aquisição do atual
        terreno, indicado ao pastor por nossa irmã Lucia Bigarelli Patriani. No
        terreno havia uma pequena casa, onde a congregação se reuniu até sua
        organização como Igreja, no dia 19 de fevereiro de 1956, através de uma
        reunião presidida pelo Pr. Boanerges Ribeiro. Nessa ocasião, foram
        eleitos os primeiros presbíteros, os irmãos: Gerson de Moura Muzel,
        Alfeu Patriani, Joaquim Gonzaga, Henrique Vasconcelos e José Vasconcelos
        Jr.. O primeiro rol de membros foi formado já no dia de sua organização,
        com duzentos e cinquenta e cinco membros maiores e setenta e dois
        menores, sendo então um total de 327 membros.
      </p>
      <p className="mb-4">
        Podemos, sem sombra de dúvidas, dizer que Deus havia operado um
        avivamento naquela congregação que, em cinco anos cresceu tanto. A
        alegria e o fervor eram marcas da Igreja, que já contava com sociedades
        internas, como a SAF organizada desde 1951 e também o Coral João
        Calvino, formado em 1954.
      </p>
      <p className="mb-4">
        Ao longo dos anos, foram muitas sementes lançadas e muitos bons frutos
        colhidos. Novas Igrejas têm sido iniciadas e plantadas como a IP Vila
        Buenos Aires, IP Jardim Campos, IP Jardim Cumbica, IP Jardim Acácio, IP
        Jardim Castelo, IP Tatuapé, IP Jardim Marina e IP Monte Sinai. Ministros
        do evangelho têm sido gerados entre nós, missionários têm sido enviados,
        nações têm sido tocadas pela palavra de Deus e tantas pessoas entre nós
        têm sido salvas, restauradas e treinadas para o serviço e engrandecimento
        do Reino dos céus.
      </p>
      <p className="mb-4">
        Hoje somos cerca de 1400 membros e Deus nos tem dado a alegria de contar
        com irmãos comprometidos, talentosos e dotados pelo Espírito Santo, cujo
        exercício dos dons tem edificado a igreja mais e mais. E ela segue em
        paz, crescendo em número e sendo edificada no temor do Senhor.
      </p>
      <p className="mb-4">
        Louvado seja Deus pelos anos de história passados até aqui, louvado seja
        Deus pelos anos que temos pela frente, pelos quais esperamos, cheios de
        expectativas, que grandes coisas estão por vir e que obras maiores vão
        acontecer na IP Penha.
      </p>
      <p
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 700,
          fontSize: "20px",
          lineHeight: "1.6",
          letterSpacing: "0.015em",
          textAlign: "justify",
        }}
      >
        Organização: 19 de fevereiro de 1956.
      </p>
    </ContentPageLayout>
  );
}
