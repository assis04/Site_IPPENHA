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
  { label: "Igreja", href: "#" },
  { label: "Ministérios", href: "#" },
  { label: "Agenda", href: "#" },
  { label: "Estudos", href: "#" },
  { label: "Ação Social", href: "#" },
  { label: "Baixar o App", href: "#" },
];

/* ─── Informações de contato ─── */
export const CONTACT = {
  address: "R. Maj. Rudge, 145 — Penha de França",
  city: "São Paulo — SP, 03607-010",
  phone: "(011) 2641-7654",
  phoneHref: "tel:+551126417654",
  email: "contato@ippenha.org.br",
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
  { name: "Amauri Oliveira", role: "Pastor presidente", slug: "pastor-1", image: pastorAmauri },
  { name: "Fábio Carvalho", role: "Pastor auxiliar", slug: "pastor-2", image: pastorFabio },
  { name: "Carlos Henrique", role: "Pastor auxiliar", slug: "pastor-3", image: pastorCarlosHenrique },
  { name: "Carlos Lima", role: "Pastor auxiliar", slug: "pastor-4", image: pastorCarlosLima },
  { name: "Paulo Castro", role: "Pastor auxiliar", slug: "pastor-5", image: pastorPaulo },
  { name: "Rogério C. Chaves", role: "Pastor auxiliar", slug: "pastor-6", image: pastorRogerio },
  { name: "Cornélio Castro", role: "Pastor auxiliar", slug: "pastor-7", image: pastorCornelio },
  { name: "Filipe Checon", role: "Pastor auxiliar", slug: "pastor-8", image: pastorFilipe },
];

/* ─── Horários dos cultos ─── */
export const SCHEDULES = [
  { name: "Cultos Dominicais", time: "Domingo — 9h | 18h" },
  { name: "Culto Hispano", time: "Domingo — 11h" },
  { name: "Conexão com Deus", time: "Segunda-feira — 20h" },
  { name: "Tarde da Esperança", time: "Quarta-feira — 14h30" },
  { name: "ETEP", time: "Quinta-feira — 20h" },
];
