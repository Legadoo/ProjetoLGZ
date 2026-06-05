export type InfluencerPreview = {
  name: string;
  nickname: string;
  slug: string;
  shortBio: string;
  fullBio: string;
  legendaryzStory: string;
  contentCategory: string;
  highlightPhrase: string;
  profileImageUrl?: string;
  bannerImageUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
  youtubeUrl?: string;
};

export const influencers: InfluencerPreview[] = [
  {
    name: "Gustavo",
    nickname: "Chapolin",
    slug: "chapolin",
    shortBio: "Criador de conteúdo, liderança e visão estratégica da LGZ.",
    fullBio:
      "Chapolin representa a persistência da Legendaryz. É uma figura ligada à construção da organização, comunidade, bastidores e crescimento da marca.",
    legendaryzStory:
      "Dentro da Legendaryz, Chapolin carrega a missão de manter a organização viva, conectando comunidade, jogadores, influenciadores e projetos digitais.",
    contentCategory: "E-sports, comunidade e lifestyle gamer",
    highlightPhrase: "Desde 2017 mantendo a chama lendária acesa.",
    instagramUrl: "https://instagram.com/legendaryzgg"
  },
  {
    name: "Lucas",
    nickname: "Legado",
    slug: "legado",
    shortBio: "Cofundador, visão de produto e construção digital da LGZ.",
    fullBio:
      "Legado atua na parte estratégica e digital, ajudando a transformar a Legendaryz em uma plataforma forte, organizada e preparada para crescer.",
    legendaryzStory:
      "Sua história na Legendaryz está ligada à evolução da marca, criação de projetos e fortalecimento da presença digital.",
    contentCategory: "Produto, comunidade e tecnologia",
    highlightPhrase: "Construindo o legado da LGZ no digital.",
    instagramUrl: "https://instagram.com/legendaryzgg"
  }
];

export function getInfluencers() {
  return influencers;
}

export function getInfluencerBySlug(slug: string) {
  return influencers.find((influencer) => influencer.slug === slug);
}
