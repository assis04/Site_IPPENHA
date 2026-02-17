import pastorAmauri from "../assets/pastors/AmauriOliveira.svg";
import pastorFabio from "../assets/pastors/FabioCarvalho.svg";
import pastorCarlosHenrique from "../assets/pastors/CarlosHenrique.svg";
import pastorCarlosLima from "../assets/pastors/CarlosLima.svg";
import pastorPaulo from "../assets/pastors/PauloCastro.svg";
import pastorRogerio from "../assets/pastors/RogerioCChaves.svg";
import pastorCornelio from "../assets/pastors/CornelioCastro.svg";
import pastorFilipe from "../assets/pastors/FilipeChecon.svg";
import { isSafeUrl } from "../utils/safeUrl";

/* ─── Links de navegação (compartilhados entre header e footer) ─── */
export const NAV_LINKS = [
  {
    label: "Igreja",
    href: "#",
    children: [
      { label: "70 anos", href: "#" },
      { label: "Quem somos", href: "/quem-somos" },
      { label: "Doutrina", href: "#" },
      { label: "Confissões de fé", href: "#" },
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
    children: [
      { label: "Eventos", href: "/agenda" },
    ],
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
    href: "#",
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
};

/* ─── URL do perfil do Instagram (validada) ─── */
const INSTAGRAM_PROFILE_URL_RAW =
  import.meta.env.VITE_INSTAGRAM_PROFILE_URL || SOCIAL_LINKS.instagram;
export const INSTAGRAM_PROFILE_URL = isSafeUrl(INSTAGRAM_PROFILE_URL_RAW)
  ? INSTAGRAM_PROFILE_URL_RAW
  : SOCIAL_LINKS.instagram;

/* ─── Dados dos pastores ─── */
export const PASTORS = [
  { name: "Amauri Oliveira", role: "Pastor presidente", slug: "pastor-amauri-oliveira", image: pastorAmauri, bio: "" },
  { name: "Fábio Carvalho", role: "Pastor auxiliar", slug: "pastor-fabio-carvalho", image: pastorFabio, bio: "" },
  { name: "Carlos Henrique", role: "Pastor auxiliar", slug: "pastor-carlos-henrique", image: pastorCarlosHenrique, bio: "" },
  { name: "Carlos Lima", role: "Pastor auxiliar", slug: "pastor-carlos-lima", image: pastorCarlosLima, bio: "" },
  { name: "Paulo Castro", role: "Pastor auxiliar", slug: "pastor-paulo-castro", image: pastorPaulo, bio: "" },
  { name: "Rogério C. Chaves", role: "Pastor auxiliar", slug: "pastor-rogerio-c-chaves", image: pastorRogerio, bio: "" },
  { name: "Cornélio Castro", role: "Pastor auxiliar", slug: "pastor-cornelio-castro", image: pastorCornelio, bio: "" },
  { name: "Filipe Checon", role: "Pastor auxiliar", slug: "pastor-filipe-checon", image: pastorFilipe, bio: "" },
];

/* ─── Horários dos cultos ─── */
export const SCHEDULES = [
  { name: "Cultos Dominicais", time: "Domingo — 9h | 18h" },
  { name: "Culto Hispano", time: "Domingo — 11h" },
  { name: "Conexão com Deus", time: "Segunda-feira — 20h" },
  { name: "Tarde da Esperança", time: "Quarta-feira — 14h30" },
  { name: "ETEP", time: "Quinta-feira — 20h" },
];
