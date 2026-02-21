import pastorAmauri from "../assets/pastors/AmauriOliveira.svg";
import pastorFabio from "../assets/pastors/FabioCarvalho.svg";
import pastorCarlosHenrique from "../assets/pastors/CarlosHenrique.svg";
import pastorCarlosLima from "../assets/pastors/CarlosLima.svg";
import pastorPaulo from "../assets/pastors/PauloCastro.svg";
import pastorRogerio from "../assets/pastors/RogerioCChaves.svg";
import pastorCornelio from "../assets/pastors/CornelioCastro.svg";
import pastorFilipe from "../assets/pastors/FilipeChecon.svg";
import ConexaoComDeus from "../assets/ConexaoComDeus.svg";
import EBT from "../assets/EBT.svg";
import EtepWhite from "../assets/EtepWhite.svg";
import { isSafeUrl } from "../utils/safeUrl";

/* ─── Links de navegação (compartilhados entre header e footer) ─── */
export const NAV_LINKS = [
  {
    label: "Igreja",
    href: "#",
    children: [
      { label: "70 anos", href: "#" },
      { label: "Quem somos", href: "/quem-somos" },
      {
        label: "Doutrina",
        href: "#",
        children: [{ label: "Confissões de fé", href: "/confissoes-de-fe" }],
      },
      {
        label: "Cultos",
        href: "#",
        children: [
          { label: "Dominicais", href: "#" },
          { label: "Conexão com Deus", href: "#" },
          { label: "Tarde da Esperança", href: "#" },
        ],
      },
      { label: "SOS", href: "#" },
      { label: "Movimento", href: "#" },
      { label: "Oficiais", href: "#" },
    ],
  },
  {
    label: "Ministérios",
    href: "#",
    children: [
      { label: "Integração", href: "#" },
      { label: "Música", href: "#" },
      { label: "Coral Perfeito Louvor", href: "#" },
      { label: "Coral Jovem", href: "#" },
      { label: "Coral João Calvino", href: "#" },
      { label: "Orquestra IPP", href: "#" },
      { label: "Louvor", href: "#" },
      { label: "Jovens +", href: "#" },
      { label: "GAM", href: "#" },
      { label: "Lar Cristão", href: "#" },
      { label: "MAD", href: "#" },
      { label: "Terceira Idade", href: "#" },
      { label: "Faça Parte", href: "#" },
    ],
  },
  {
    label: "Sociedades Internas",
    href: "#",
    children: [
      { label: "UCP — Penha Kids", href: "#" },
      { label: "UPA — SOS", href: "#" },
      { label: "UMP — Movimento", href: "#" },
      { label: "SAF", href: "#" },
      { label: "UPH", href: "#" },
    ],
  },
  {
    label: "Agenda",
    href: "/agenda",
    children: [{ label: "Eventos", href: "/agenda" }],
  },
  {
    label: "Estudos Bíblicos",
    href: "#",
    children: [
      { label: "Pequenos Grupos", href: "#" },
      { label: "EBT", href: "#" },
      { label: "ETEP", href: "#" },
      { label: "Que Palavra", href: "#" },
    ],
  },
  {
    label: "Ação Social",
    href: "#",
    children: [
      { label: "Hebron", href: "#" },
      { label: "Projeto Esperança", href: "#" },
      { label: "Penha Care", href: "#" },
      { label: "P.A.C.A.", href: "#" },
    ],
  },
  {
    label: "Baixe o App",
    href: "/baixe-app",
  },
];

/* ─── Informações de contato ─── */
export const CONTACT = {
  address: "R. Maj. Rudge, 145 — Penha de França",
  city: "São Paulo — SP, 03607-010",
  phone: "(011) 2641-7654",
  phoneHref: "tel:+551126417654",
  email: "contato@ippenha.com.br",
  mapsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=R.+Maj.+Rudge,+145+-+Penha+de+Franca,+Sao+Paulo+-+SP,+03607-010",
};

/* ─── Redes sociais ─── */
export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/ippenha/",
  youtube: "https://www.youtube.com/@ippenha",
  youtubeCultos: "https://www.youtube.com/@ippenha",
};

/* ─── Links da loja de apps ─── */
export const STORE_LINK = {
  apple: "https://apps.apple.com/br/app/ippenha/id6736615288?l=en-GB",
  android:
    "https://play.google.com/store/apps/details?id=br.com.eklesia.appEK3038",
};

/* ─── URL do perfil do Instagram (validada) ─── */
const INSTAGRAM_PROFILE_URL_RAW =
  import.meta.env.VITE_INSTAGRAM_PROFILE_URL || SOCIAL_LINKS.instagram;
export const INSTAGRAM_PROFILE_URL = isSafeUrl(INSTAGRAM_PROFILE_URL_RAW)
  ? INSTAGRAM_PROFILE_URL_RAW
  : SOCIAL_LINKS.instagram;

/* ─── Dados dos pastores ─── */
export const PASTORS = [
  {
    name: "Amauri Oliveira",
    role: "Pastor presidente",
    slug: "pastor-amauri-oliveira",
    image: pastorAmauri,
    title:"",
    bio: "O Rev. Amauri Oliveira serve à IPPenha há mais de uma década, exercendo um ministério marcado pelo acolhimento pastoral e visão estratégica. Casado com Márcia e pai de três filhos, o Rev. Amauri dedica especial atenção ao fortalecimento de casais e famílias. Além de seu pastoreio local, preside a Agência Presbiteriana de Missões Transculturais (APMT/IPB), refletindo seu profundo compromisso com a evangelização global e o suporte a missionários ao redor do mundo.",
  },
  {
    name: "Fábio Carvalho",
    role: "Pastor auxiliar",
    slug: "pastor-fabio-carvalho",
    image: pastorFabio,
    title:"",
    bio: "Experiência Pastoral e Adoração Com mais de 28 anos de ministério pastoral, o Rev. Fábio Carvalho traz para a IPPenha a vivência de quem conhece as histórias da alma humana. Mineiro, casado com Janaína e pai de quatro filhos, ele é um perfil inspirador para a nossa juventude. Sua atuação é excepcional nas áreas de música, adolescentes e família, utilizando sua vasta experiência e histórias de vida para conectar gerações através de uma mensagem de esperança e fidelidade a Deus.",
  },
  {
    name: "Carlos Henrique",
    role: "Pastor auxiliar",
    slug: "pastor-carlos-henrique",
    image: pastorCarlosHenrique,
    title:"Pregação Expositiva e Ministério Infantil",
    bio: "Reconhecido por sua maestria na pregação expositiva, o Rev. Carlos Henrique tem o dom de tornar as Escrituras claras e aplicáveis. Casado com Renata e pai de dois filhos, ele atua também como capelão escolar e universitário. Sua paixão pelo ensino bíblico se estende aos menores: ele lidera o Penha Kids, cuidando para que nossas crianças cresçam no conhecimento e na graça do Senhor Jesus.",
  },
  {
    name: "Carlos Lima",
    role: "Pastor auxiliar",
    slug: "pastor-carlos-lima",
    image: pastorCarlosLima,
    title:"Educação Cristã e Comunicação",
    bio: " O Rev. Carlos Lima é o responsável pela solidez do ensino em nossa comunidade. Professor universitário com décadas de experiência na UNICSUL, ele aplica seu conhecimento acadêmico e sua formação em Publicidade para organizar e potencializar a Escola Bíblica e os departamentos de ensino da IPPenha. É casado com Michelle e pai de dois filhos, unindo erudição e prática ministerial para a edificação da igreja.",
  },
  {
    name: "Paulo Castro",
    role: "Pastor auxiliar",
    slug: "pastor-paulo-castro",
    image: pastorPaulo,
    title:"Missões e Ministério Hispânico Ordenado em 2025",
    bio: "O Rev. Paulo Castro representa o vigor da nova geração de pastores missionários. Tendo crescido no campo missionário no Paraguai, é fluente em espanhol e lidera a Igreja Hispânica que funciona em nossa comunidade. Casado com Priscila e pai da pequena Sarah, Paulo também coordena os trabalhos com jovens e adolescentes, focando na formação de uma identidade cristã bíblica e culturalmente relevante.",
  },
  {
    name: "Rogério C. Chaves",
    role: "Pastor auxiliar",
    slug: "pastor-rogerio-c-chaves",
    image: pastorRogerio,
    title:"Organização, Gestão e Assistência Social",
    bio: "O Rev. Rogério Castro traz sua bem-sucedida experiência no mundo empresarial para o serviço integral do Reino. Responsável pela logística, agenda e organização administrativa da IPPenha, ele garante que a estrutura da igreja funcione para a glória de Deus. Casado com Daniela e pai de dois filhos, Rogério lidera a plantação da IP Piratininga, onde desenvolve um trabalho excepcional de cuidado com os necessitados e assistência social em uma região carente de nossa cidade.",
  },
  {
    name: "Cornélio Castro",
    role: "Pastor auxiliar",
    slug: "pastor-cornelio-castro",
    image: pastorCornelio,
    title:"Legado Missionário e Cuidado Pastoral",
    bio: "Com uma trajetória de décadas servindo como missionário no Paraguai, o Rev. Cornélio Castro é uma referência de perseverança e amor às almas. Casado com Ema e pai de dois filhos (incluindo o Rev. Paulo Castro), ele atua hoje na divulgação do trabalho da APMT por todo o Brasil. Na IPPenha, seu coração pastoral se manifesta de forma especial no ministério de visitação aos idosos, trazendo consolo e sabedoria aos veteranos da nossa fé.",
  },
  {
    name: "Filipe Checon",
    role: "Pastor auxiliar",
    slug: "pastor-filipe-checon",
    image: pastorFilipe,
    title:"Plantio e Revitalização de Igrejas | Capelania | Liturgia | Evangelismo e Discipulado | Integração e Acolhimento",
    bio: "O Rev. Filipe Checon reúne, com excelência, a firmeza necessária à Capelania e a ternura indispensável ao discipulado cristão. Sua liderança é marcada por visão estratégica, zelo pastoral e profundo compromisso com a expansão do Reino de Deus. À frente da Comissão de Plantio e Revitalização de Igrejas na IP Penha e no Presbitério PSSP, conduz projetos com coragem missionária e sólida fundamentação bíblica. Atua como pastor responsável pelo acompanhamento e desenvolvimento de nossos seminaristas, investindo na formação de uma nova geração de líderes comprometidos com a Palavra e com a Igreja.Casado com Télia e pai de dois filhos (Hannah e Benjamin), Filipe alia vocação ministerial e vida familiar exemplar. Lidera ainda a expansão da IP Penha por meio da revitalização da IP Carrão, fortalecendo comunidades e reacendendo a chama da missão. a sede, lidera com dedicação a área de Evangelismo e Discipulado, promovendo crescimento espiritual consistente e intencional. Também é o responsável pela Liturgia e organização dos cultos, assegurando que cada culto reflita reverência, ordem e centralidade em Cristo. Supervisiona a área de Integração e Acolhimento, garantindo que cada visitante seja recebido com cuidado, atenção e amor cristão, sentindo-se, desde o primeiro contato, parte viva da nossa família da fé.",
  },
];

/* ─── Horários dos cultos ─── */
export const SCHEDULEDATA = [
  {
    title: "Cultos Dominicais",
    info: "Cultos Dominicais 9h | 18h",
    extra: "Culto Hispano 11h",
    bg: "bg-[#3C6F48]",
    textColor: "text-white",
    type: "text",
  },
  {
    title: "EBT",
    img: EBT,
    info: "Classes Dominicais",
    extra: "9h | 9h30",
    action: "Inscreva-se",
    link: "https://gestaoweb.eklesiaonline.com.br/divulgacao/n/74c7494264e77f31d4",
    bg: "bg-[#F0F2E4]",
    textColor: "text-[#3C6F48]",
    type: "image",
  },
  {
    title: "Conexão com Deus",
    img: ConexaoComDeus,
    info: "Segunda-feira 20h",
    bg: "bg-[#1F3827]",
    textColor: "text-white",
    type: "image",
  },
  {
    title: "Tarde da Esperança",
    info: "Quarta-feira 14h30",
    bg: "bg-[#E0F2CF]",
    textColor: "text-[#1F3827]",
    type: "text",
  },
  {
    title: "ETEP",
    img: EtepWhite,
    info: "Quinta-feira 20h",
    bg: "bg-[#3C6F48]",
    textColor: "text-white",
    type: "image",
  },
];