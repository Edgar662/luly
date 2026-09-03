import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Lang = "en" | "pt";
type LetterId =
  | "today"
  | "sleep"
  | "water"
  | "sick"
  | "laugh"
  | "miss"
  | "photo"
  | "attention"
  | "cute"
  | "loveletter"
  | "naughty"
  | "overthinking"
  | "sad"
  | "secret";

type Step =
  | { type: "text"; text: string; emphasize?: boolean; signature?: boolean }
  | { type: "card"; icon: string; title: string; lines: string[] }
  | { type: "interact"; icon?: string; prompt: string; buttonLabel: string; response: string };

interface LetterDef {
  emoji: string;
  hubLabel: string;
  steps: Step[];
  endTitle: string;
  layout?: "sparse" | "polaroid";
}

const FEATURED_LETTER: LetterId = "today";

const ALL_LETTERS: LetterId[] = [
  "sleep",
  "water",
  "sick",
  "laugh",
  "miss",
  "photo",
  "attention",
  "sad",
  "overthinking",
  "cute",
  "loveletter",
  "naughty",
];

interface PeekCardSpec {
  id: LetterId;
  rotate: number;
  z: number;
  nudgeY: number;
}

const PEEK_ROWS: PeekCardSpec[][] = [
  [
    { id: "sleep", rotate: -7, z: 3, nudgeY: 6 },
    { id: "naughty", rotate: 4, z: 5, nudgeY: -2 },
    { id: "water", rotate: -3, z: 4, nudgeY: 8 },
  ],
  [
    { id: "cute", rotate: 6, z: 8, nudgeY: -2 },
    { id: "miss", rotate: -5, z: 9, nudgeY: 6 },
    { id: "laugh", rotate: 3, z: 7, nudgeY: -8 },
  ],
];

const RANDOM_POOL: LetterId[] = [
  "sleep",
  "water",
  "sick",
  "laugh",
  "miss",
  "photo",
  "attention",
  "sad",
  "overthinking",
  "cute",
  "loveletter",
  "naughty",
];

const UNLOCK_SECRET_AT = 3;

interface ThemePalette {
  gradient: string;
  particle: string;
  particlesEnabled?: boolean;
  card: string;
  cardTint: string;
  heading: string;
  body: string;
  accent: string;
  accentDark: string;
  muted: string;
}

const COVER_BG = "linear-gradient(180deg, #fff9f6 0%, #fdf1f0 45%, #fbe8ec 100%)";

const THEMES: Record<"hub" | LetterId, ThemePalette> = {
  hub: {
    gradient: "radial-gradient(ellipse 120% 80% at 50% 0%, #fdfaf5, #faf6ee 55%, #f3ead9 100%)",
    particle: "cherry-blossom",
    particlesEnabled: false,
    card: "#fffdf9",
    cardTint: "#f3ead9",
    heading: "#5c4a3a",
    body: "#8a7562",
    accent: "#e0577f",
    accentDark: "#c33d68",
    muted: "#b3a48f",
  },
  today: {
    gradient: "radial-gradient(ellipse 120% 80% at 50% 0%, #fde8ee, #fdf0f4 55%, #f4e6f6 100%)",
    particle: "cherry-blossom",
    card: "#fff3f6",
    cardTint: "#ffe4ec",
    heading: "#7d3352",
    body: "#a45c78",
    accent: "#e0577f",
    accentDark: "#c33d68",
    muted: "#c98ba3",
  },
  sleep: {
    gradient: "radial-gradient(ellipse 120% 80% at 50% 0%, #f5f3fb, #eef0fa 55%, #e3e6f5 100%)",
    particle: "star",
    card: "#faf9fd",
    cardTint: "#eceffa",
    heading: "#4a4766",
    body: "#726f8f",
    accent: "#8b87b8",
    accentDark: "#6a668f",
    muted: "#b4b1d1",
  },
  water: {
    gradient: "radial-gradient(ellipse 120% 80% at 50% 0%, #eaf9fb, #dcf3f6 55%, #c8ecf0 100%)",
    particle: "droplet",
    card: "#f2fcfd",
    cardTint: "#ddf3f5",
    heading: "#1f6b74",
    body: "#3f8c95",
    accent: "#34a7b3",
    accentDark: "#227a84",
    muted: "#7fc3ca",
  },
  sick: {
    gradient: "radial-gradient(ellipse 120% 80% at 50% 0%, #eef8f0, #dcf0e2 55%, #c8e6d2 100%)",
    particle: "pill",
    card: "#f2faf5",
    cardTint: "#ddf0e4",
    heading: "#2f6b46",
    body: "#4f8a68",
    accent: "#4caf7d",
    accentDark: "#358a5c",
    muted: "#8ec6a8",
  },
  laugh: {
    gradient: "radial-gradient(ellipse 120% 80% at 50% 0%, #fff1de, #ffdcb8 55%, #ffbf91 100%)",
    particle: "tears-of-joy",
    card: "#fff8f2",
    cardTint: "#ffe4c8",
    heading: "#9c4a1f",
    body: "#c17240",
    accent: "#ef8b4c",
    accentDark: "#d16b28",
    muted: "#e0a679",
  },
  miss: {
    gradient: "radial-gradient(ellipse 120% 80% at 50% 0%, #fbf3e7, #f8ecda 55%, #f0dfc4 100%)",
    particle: "sparkles",
    card: "#fdf8ef",
    cardTint: "#f4e8d2",
    heading: "#6b4a2f",
    body: "#8f6a45",
    accent: "#c98a4b",
    accentDark: "#a06a32",
    muted: "#c9a877",
  },
  photo: {
    gradient: "radial-gradient(ellipse 120% 80% at 50% 0%, #faf6f0, #f5ede1 55%, #ecdfcb 100%)",
    particle: "camera",
    card: "#fdfaf5",
    cardTint: "#f0e4d2",
    heading: "#5a4a34",
    body: "#8a7457",
    accent: "#c99356",
    accentDark: "#a3763c",
    muted: "#cbb28c",
  },
  attention: {
    gradient: "radial-gradient(ellipse 120% 80% at 50% 0%, #fff0ec, #ffe0d8 55%, #ffcabb 100%)",
    particle: "growing-heart",
    card: "#fff6f3",
    cardTint: "#ffdccf",
    heading: "#8a3420",
    body: "#b8583c",
    accent: "#e8623c",
    accentDark: "#c04726",
    muted: "#dd9d84",
  },
  cute: {
    gradient: "radial-gradient(ellipse 120% 80% at 50% 0%, #fff0f5, #ffe3ee 55%, #ffd0e3 100%)",
    particle: "sparkles",
    card: "#fff6fa",
    cardTint: "#ffe1ee",
    heading: "#91315f",
    body: "#b8567f",
    accent: "#e8578f",
    accentDark: "#c53a70",
    muted: "#dd9ab5",
  },
  loveletter: {
    gradient: "radial-gradient(ellipse 120% 80% at 50% 0%, #fbf6ee, #f7ecd9 55%, #efd9b8 100%)",
    particle: "love-letter",
    card: "#fdf9f0",
    cardTint: "#f2e2c2",
    heading: "#5c3323",
    body: "#8a5c3f",
    accent: "#a83b32",
    accentDark: "#7e2a24",
    muted: "#c79a72",
  },
  naughty: {
    gradient: "radial-gradient(ellipse 120% 80% at 50% 0%, #3d1620, #2a0f16 55%, #180a0d 100%)",
    particle: "smirking-face",
    particlesEnabled: false,
    card: "#2b1218",
    cardTint: "#3a1a22",
    heading: "#f3e2e0",
    body: "#c99a9e",
    accent: "#b0334a",
    accentDark: "#8a2338",
    muted: "#7a4a52",
  },
  overthinking: {
    gradient: "radial-gradient(ellipse 120% 80% at 50% 0%, #f6f5fa, #eeecf5 55%, #e2e0ee 100%)",
    particle: "thought-balloon",
    card: "#f9f8fc",
    cardTint: "#e9e7f2",
    heading: "#4c4a63",
    body: "#726f8a",
    accent: "#8a86ab",
    accentDark: "#676387",
    muted: "#b3b0c8",
  },
  sad: {
    gradient: "radial-gradient(ellipse 120% 80% at 50% 0%, #f7f0ee, #f0e4e1 55%, #e4d2cd 100%)",
    particle: "pleading-face",
    particlesEnabled: false,
    card: "#faf5f3",
    cardTint: "#ecdcd7",
    heading: "#6b4844",
    body: "#8f6a65",
    accent: "#a97a71",
    accentDark: "#855c54",
    muted: "#c7a49d",
  },
  secret: {
    gradient: "radial-gradient(ellipse 120% 80% at 50% 0%, #2a1c2e, #1a1119 55%, #0f0a10 100%)",
    particle: "locked-with-key",
    particlesEnabled: false,
    card: "#1e1522",
    cardTint: "#2b1e30",
    heading: "#f0e6ea",
    body: "#b9a3ad",
    accent: "#9c6b8a",
    accentDark: "#7a4d68",
    muted: "#6b5560",
  },
};

interface UIStrings {
  coverTitle: string;
  coverSubtitle: string;
  coverButton: string;
  hubTitle: string;
  hubSubtitle: string;
  categoryDays: string;
  categoryMiss: string;
  categoryNeed: string;
  categoryUs: string;
  categorySecret: string;
  surprise: string;
  seeAll: string;
  seeLess: string;
  continueMid: string;
  continueLast: string;
  restart: string;
  backToHub: string;
  endSignature: string;
}

const UI: Record<Lang, UIStrings> = {
  en: {
    coverTitle: "For you, my love ♡",
    coverSubtitle: "I made you a little something.",
    coverButton: "open ♡",
    hubTitle: "Whenever you need me ♡",
    hubSubtitle: "I'm always a card away",
    categoryDays: "for your days",
    categoryMiss: "for when you miss me",
    categoryNeed: "for when you need me",
    categoryUs: "for us",
    categorySecret: "🔐 secret",
    surprise: "surprise me →",
    seeAll: "see them all →",
    seeLess: "← back to the box",
    continueMid: "continue →",
    continueLast: "continue 🌸",
    restart: "read again",
    backToHub: "back to the envelopes",
    endSignature: "from your love",
  },
  pt: {
    coverTitle: "Pra você, meu amor ♡",
    coverSubtitle: "Eu fiz uma coisinha pra você.",
    coverButton: "abrir ♡",
    hubTitle: "Sempre que precisar de mim ♡",
    hubSubtitle: "eu tô sempre a uma cartinha de distância",
    categoryDays: "pros seus dias",
    categoryMiss: "pra quando sentir minha falta",
    categoryNeed: "pra quando precisar de mim",
    categoryUs: "pra nós",
    categorySecret: "🔐 secreta",
    surprise: "me surpreenda →",
    seeAll: "ver todas →",
    seeLess: "← voltar pra caixa",
    continueMid: "continuar →",
    continueLast: "continuar 🌸",
    restart: "ler de novo",
    backToHub: "voltar pras cartinhas",
    endSignature: "do seu amor",
  },
};

const LETTERS: Record<Lang, Record<LetterId, LetterDef>> = {
  en: {
    today: {
      emoji: "cherry-blossom",
      hubLabel: "For today",
      steps: [
        { type: "text", text: "hey, Lily 🌸" },
        { type: "text", text: "just a little check-in, nothing dramatic" },
        { type: "text", text: "however today's going, good, boring, kind of a mess, all valid" },
        { type: "card", icon: "hugging-face", title: "emergency hug", lines: ["please hold for as long as necessary"] },
        { type: "text", text: "I don't need a reason to think about you, but today it happened like eleven times" },
        {
          type: "card",
          icon: "memo",
          title: "today's prescription",
          lines: ["1 something you actually enjoy", "1 glass of water, don't argue", "0 pressure to be productive", "a little rest, guilt-free"],
        },
        { type: "text", text: "and hey, whatever this day turns into" },
        { type: "text", text: "I'm still on your team 🌸" },
        { type: "text", text: "if I were there right now..." },
        { type: "text", text: "I'd probably just sit next to you" },
        { type: "text", text: "ask about your day, actually listen" },
        { type: "text", text: "steal a little bit of your snack without asking" },
        { type: "text", text: "and eventually..." },
        { type: "text", text: "just hold you for a while 🤍", emphasize: true },
      ],
      endTitle: "I love you, today and every other one 🌸",
    },
    sleep: {
      emoji: "crescent-moon",
      hubLabel: "Open this when you can't sleep",
      layout: "sparse",
      steps: [
        { type: "text", text: "still awake, lily? 🌙" },
        { type: "text", text: "put the phone down for a sec" },
        { type: "card", icon: "wind-face", title: "little breathing thing", lines: ["in for 4", "hold for 4", "out for 4", "again"] },
        { type: "text", text: "now imagine my arm under your head and my hand on your back, just like that" },
        { type: "text", text: "now put your phone away" },
        { type: "text", text: "close your eyes" },
        { type: "text", text: "and imagine I'm there with you 🌙", emphasize: true },
      ],
      endTitle: "goodnight, my cute cute 🌙",
    },
    water: {
      emoji: "droplet",
      hubLabel: "Open this when you haven't drunk water",
      steps: [
        { type: "text", text: "luly" },
        { type: "text", text: "go beber agua" },
        { type: "text", text: "yes, I'm telling you again" },
        {
          type: "interact",
          icon: "droplet",
          prompt: "don't make me come there and force you",
          buttonLabel: "I drank water ♡",
          response: "good girl 🤍 now you can continue",
        },
        { type: "text", text: "my cute cute needs to stay hydrated" },
      ],
      endTitle: "hydration queen 💧",
    },
    sick: {
      emoji: "face-thermometer",
      hubLabel: "Open this when you're feeling sick",
      steps: [
        { type: "text", text: "my poor little luly 🤒" },
        { type: "text", text: "you never complain when you're actually sick, which is how I know this one's real" },
        {
          type: "card",
          icon: "thermometer",
          title: "care kit",
          lines: ["drink water", "rest", "eat something", "stop pretending you're invincible"],
        },
        { type: "text", text: "I wish I could bring you soup myself and tuck you in" },
        { type: "text", text: "rest is not optional today, doctor's orders, well, mine" },
      ],
      endTitle: "feel better soon, I'll be checking on you more than usual 🤒",
    },
    laugh: {
      emoji: "tears-of-joy",
      hubLabel: "Open this when you need a little laugh",
      steps: [
        { type: "text", text: "emergency joke deployment 😂" },
        { type: "text", text: "why don't scientists trust atoms? because they make up everything" },
        { type: "text", text: "...okay that one was bad, I know" },
        { type: "card", icon: "see-no-evil-monkey", title: "backup joke", lines: ["I'm not a photographer, but I can picture us together"] },
        { type: "text", text: "I'll accept being laughed at instead of with, if it helps" },
      ],
      endTitle: "there it is, there's the smile 😂",
    },
    miss: {
      emoji: "hugging-face",
      hubLabel: "Open this when you miss me",
      layout: "polaroid",
      steps: [
        { type: "text", text: "you miss me huh 🫂" },
        { type: "text", text: "come here my cute cute" },
        { type: "text", text: "I miss you too" },
        { type: "text", text: "unfortunately I'm not there right now" },
        { type: "text", text: "so you're gonna have to survive with this little piece of me" },
        {
          type: "interact",
          icon: "camera",
          prompt: "proof you're thinking about me",
          buttonLabel: "send pic ♡",
          response: "waiting... 🤍 (I'm serious, go)",
        },
      ],
      endTitle: "I'm never really far, Luly 🫂",
    },
    photo: {
      emoji: "camera",
      hubLabel: "Open this when you want to make me happy",
      layout: "polaroid",
      steps: [
        { type: "text", text: "I have a very simple solution 📸" },
        { type: "text", text: "send me a pic" },
        { type: "text", text: "preferably of your cute face" },
        { type: "interact", icon: "camera", prompt: "I'll be waiting", buttonLabel: "send pic ♡", response: "yesss 🤍 that's the one" },
      ],
      endTitle: "you just made my day, Luly 📸",
    },
    attention: {
      emoji: "growing-heart",
      hubLabel: "Open this when you need attention",
      steps: [
        { type: "text", text: "oh 💗" },
        { type: "text", text: "so you need attention now" },
        { type: "text", text: "come here lily" },
        { type: "text", text: "you have mine" },
        { type: "interact", icon: "growing-heart", prompt: "don't leave me on read", buttonLabel: "text me", response: "there she is 🤍" },
      ],
      endTitle: "always got time for you, cutie 💗",
    },
    cute: {
      emoji: "sparkles",
      hubLabel: "Open this when you forget how cute you are",
      steps: [
        { type: "text", text: "okay I need to say some things out loud ✨" },
        { type: "text", text: "you're cute" },
        { type: "text", text: "you're adorable" },
        { type: "text", text: "you're my favorite" },
        { type: "text", text: "and yes" },
        { type: "text", text: "I'm biased 🤍", emphasize: true },
      ],
      endTitle: "my cute cute, full stop ✨",
    },
    loveletter: {
      emoji: "love-letter",
      hubLabel: "Open this when you need a little love",
      layout: "sparse",
      steps: [
        { type: "text", text: "Luly," },
        { type: "text", text: "there are some things I don't say enough, so I'm putting them here instead" },
        { type: "text", text: "you make my ordinary life feel like something worth looking forward to" },
        { type: "text", text: "I like you in the mornings before either of us has said anything smart yet" },
        { type: "text", text: "I like you when you're dramatic about small things and pretend you're not" },
        { type: "text", text: "I like you most days, honestly, more than most days" },
        { type: "text", text: "you didn't ask to be my favorite person, you just became it" },
        { type: "text", text: "love you" },
        { type: "text", text: "your annoying boy ♡", signature: true },
      ],
      endTitle: "this one's just for you 💌",
    },
    naughty: {
      emoji: "smirking-face",
      hubLabel: "Open this when you're feeling a little naughty",
      steps: [
        { type: "text", text: "okay luly 😏" },
        { type: "text", text: "since you're here" },
        { type: "text", text: "let me ask you something" },
        { type: "text", text: "what color is your underwear right now" },
        { type: "interact", icon: "smirking-face", prompt: "no pressure", buttonLabel: "😏", response: "that's what I thought 😏 text me the real answer later" },
      ],
      endTitle: "to be continued... 😏",
    },
    overthinking: {
      emoji: "thought-balloon",
      hubLabel: "Open this when you're overthinking",
      layout: "sparse",
      steps: [
        { type: "text", text: "stop thinking for a second 💭" },
        { type: "text", text: "breathe" },
        { type: "text", text: "whatever's going through your head right now" },
        { type: "text", text: "you don't have to solve everything tonight" },
        { type: "text", text: "it can wait" },
      ],
      endTitle: "one thought at a time, cutie 💭",
    },
    sad: {
      emoji: "pleading-face",
      hubLabel: "Open this when you're feeling sad",
      steps: [
        { type: "text", text: "hey lily 🥺" },
        { type: "text", text: "I don't know exactly what happened" },
        { type: "text", text: "but you don't have to pretend you're okay with me" },
        { type: "text", text: "come here" },
        { type: "text", text: "you can be sad" },
        { type: "text", text: "I'll stay 🤍", emphasize: true },
      ],
      endTitle: "however long it takes, I'm here 🥺",
    },
    secret: {
      emoji: "locked-with-key",
      hubLabel: "you weren't supposed to find this",
      steps: [
        { type: "text", text: "you weren't supposed to find this 🔐" },
        { type: "text", text: "okay since you're here" },
        { type: "text", text: "this is the one I didn't plan on writing" },
        { type: "text", text: "I don't actually have a script for this letter, I just wanted a place that was only ours" },
        {
          type: "text",
          text: "so: hi, it's really me, not a template, not a joke, just me thinking about you longer than I'd ever admit out loud",
        },
        { type: "text", text: "that's it, that's the secret 🤍", emphasize: true },
      ],
      endTitle: "now you know 🔐",
    },
  },
  pt: {
    today: {
      emoji: "cherry-blossom",
      hubLabel: "Pra hoje",
      steps: [
        { type: "text", text: "oi, Lily 🌸" },
        { type: "text", text: "só um oizinho, nada demais" },
        { type: "text", text: "seja lá como o dia tá indo, bom, chato, uma bagunça, tudo bem" },
        { type: "card", icon: "hugging-face", title: "abraço de emergência", lines: ["segure pelo tempo que for necessário"] },
        { type: "text", text: "eu não preciso de motivo pra pensar em você, mas hoje isso aconteceu umas onze vezes" },
        {
          type: "card",
          icon: "memo",
          title: "receita de hoje",
          lines: ["1 coisa que você realmente gosta", "1 copo de água, sem discutir", "0 pressão pra ser produtiva", "um descanso, sem culpa"],
        },
        { type: "text", text: "e olha, seja lá em que esse dia vire" },
        { type: "text", text: "eu continuo do seu time 🌸" },
        { type: "text", text: "se eu estivesse aí agora..." },
        { type: "text", text: "eu provavelmente sentaria do seu lado" },
        { type: "text", text: "perguntaria como foi seu dia, de verdade" },
        { type: "text", text: "roubaria um pouco do seu lanche sem pedir" },
        { type: "text", text: "e no fim..." },
        { type: "text", text: "só ficaria te abraçando um tempo 🤍", emphasize: true },
      ],
      endTitle: "Te amo, hoje e todos os outros dias 🌸",
    },
    sleep: {
      emoji: "crescent-moon",
      hubLabel: "Abra isso quando não conseguir dormir",
      layout: "sparse",
      steps: [
        { type: "text", text: "ainda acordada, luly? 🌙" },
        { type: "text", text: "larga o celular um segundo" },
        { type: "card", icon: "wind-face", title: "respiraçãozinha", lines: ["inspira por 4", "segura por 4", "solta por 4", "de novo"] },
        { type: "text", text: "agora imagina meu braço debaixo da sua cabeça e minha mão nas suas costas, desse jeitinho" },
        { type: "text", text: "agora larga o celular" },
        { type: "text", text: "fecha os olhos" },
        { type: "text", text: "e imagina que eu tô aí com você 🌙", emphasize: true },
      ],
      endTitle: "boa noite, minha cute cute 🌙",
    },
    water: {
      emoji: "droplet",
      hubLabel: "Abra isso quando não tiver bebido água",
      steps: [
        { type: "text", text: "luly" },
        { type: "text", text: "vai beber água" },
        { type: "text", text: "sim, eu tô falando de novo" },
        {
          type: "interact",
          icon: "droplet",
          prompt: "não me faça aí ir te obrigar",
          buttonLabel: "eu bebi água ♡",
          response: "boa menina 🤍 agora pode continuar",
        },
        { type: "text", text: "minha cute cute precisa ficar hidratada" },
      ],
      endTitle: "rainha da hidratação 💧",
    },
    sick: {
      emoji: "face-thermometer",
      hubLabel: "Abra isso quando estiver doente",
      steps: [
        { type: "text", text: "minha luly doentinha 🤒" },
        { type: "text", text: "você nunca reclama quando tá doente de verdade, é assim que eu sei que dessa vez é sério" },
        {
          type: "card",
          icon: "thermometer",
          title: "kit de cuidado",
          lines: ["beber água", "descansar", "comer alguma coisa", "parar de fingir que é invencível"],
        },
        { type: "text", text: "eu queria poder levar sopa pra você e te ajeitar na cama" },
        { type: "text", text: "descansar não é opcional hoje, ordem médica, bom, minha" },
      ],
      endTitle: "melhora logo, vou ficar de olho em você mais que o normal 🤒",
    },
    laugh: {
      emoji: "tears-of-joy",
      hubLabel: "Abra isso quando precisar rir um pouco",
      steps: [
        { type: "text", text: "piada de emergência ativada 😂" },
        { type: "text", text: "por que o livro de matemática ficou triste? porque tinha muitos problemas" },
        { type: "text", text: "...eu sei, essa foi ruim" },
        { type: "card", icon: "see-no-evil-monkey", title: "piada reserva", lines: ["Eu não sou fotógrafo, mas consigo me imaginar com você pro resto da vida"] },
        { type: "text", text: "eu aceito rir de mim mesmo, se ajudar" },
      ],
      endTitle: "aí sim, aí tá o sorriso 😂",
    },
    miss: {
      emoji: "hugging-face",
      hubLabel: "Abra isso quando sentir minha falta",
      layout: "polaroid",
      steps: [
        { type: "text", text: "sentindo minha falta né 🫂" },
        { type: "text", text: "vem cá minha cute cute" },
        { type: "text", text: "eu também sinto sua falta" },
        { type: "text", text: "infelizmente eu não tô aí agora" },
        { type: "text", text: "então vai ter que sobreviver com esse pedacinho de mim" },
        {
          type: "interact",
          icon: "camera",
          prompt: "prova que tá pensando em mim",
          buttonLabel: "manda foto ♡",
          response: "esperando... 🤍 (falo sério, vai)",
        },
      ],
      endTitle: "eu nunca tô tão longe assim, luly 🫂",
    },
    photo: {
      emoji: "camera",
      hubLabel: "Abra isso quando quiser me deixar feliz",
      layout: "polaroid",
      steps: [
        { type: "text", text: "eu tenho uma solução bem simples 📸" },
        { type: "text", text: "manda uma foto pra mim" },
        { type: "text", text: "de preferência da sua cara linda" },
        { type: "interact", icon: "camera", prompt: "vou ficar esperando", buttonLabel: "manda foto ♡", response: "issoo 🤍 essa foi a certa" },
      ],
      endTitle: "você acabou de alegrar meu dia, luly 📸",
    },
    attention: {
      emoji: "growing-heart",
      hubLabel: "Abra isso quando precisar de atenção",
      steps: [
        { type: "text", text: "ah 💗" },
        { type: "text", text: "então agora você quer atenção" },
        { type: "text", text: "vem cá lily" },
        { type: "text", text: "você já tem a minha" },
        { type: "interact", icon: "growing-heart", prompt: "não me deixa no vácuo", buttonLabel: "me manda mensagem", response: "aí está ela 🤍" },
      ],
      endTitle: "sempre tenho tempo pra você, cutie 💗",
    },
    cute: {
      emoji: "sparkles",
      hubLabel: "Abra isso quando esquecer o quanto é fofa",
      steps: [
        { type: "text", text: "ok preciso falar umas coisas em voz alta ✨" },
        { type: "text", text: "você é linda" },
        { type: "text", text: "você é fofa demais" },
        { type: "text", text: "você é minha favorita" },
        { type: "text", text: "e sim" },
        { type: "text", text: "eu sou suspeito 🤍", emphasize: true },
      ],
      endTitle: "minha cute cute, ponto final ✨",
    },
    loveletter: {
      emoji: "love-letter",
      hubLabel: "Abra isso quando precisar de um pouco de amor",
      layout: "sparse",
      steps: [
        { type: "text", text: "Luly," },
        { type: "text", text: "tem coisas que eu não falo o suficiente, então vou deixar escritas aqui" },
        { type: "text", text: "você faz minha vida comum parecer algo que vale a pena esperar" },
        { type: "text", text: "eu gosto de você de manhã, antes de nenhum de nós ter dito nada inteligente ainda" },
        { type: "text", text: "eu gosto de você quando fica dramática com coisa pequena e finge que não" },
        { type: "text", text: "eu gosto de você na maioria dos dias, sinceramente, mais que na maioria dos dias" },
        { type: "text", text: "você não pediu pra ser minha pessoa favorita, você só virou" },
        { type: "text", text: "te amo" },
        { type: "text", text: "seu namorado chato ♡", signature: true },
      ],
      endTitle: "essa aqui é só sua 💌",
    },
    naughty: {
      emoji: "smirking-face",
      hubLabel: "Abra isso quando estiver um pouco safada",
      steps: [
        { type: "text", text: "ok luly 😏" },
        { type: "text", text: "já que você tá aqui" },
        { type: "text", text: "deixa eu te perguntar uma coisa" },
        { type: "text", text: "que cor é a sua calcinha agora" },
        { type: "interact", icon: "smirking-face", prompt: "sem pressão", buttonLabel: "😏", response: "foi o que eu pensei 😏 me manda a resposta de verdade depois" },
      ],
      endTitle: "continua depois... 😏",
    },
    overthinking: {
      emoji: "thought-balloon",
      hubLabel: "Abra isso quando estiver pensando demais",
      layout: "sparse",
      steps: [
        { type: "text", text: "para de pensar por um segundo 💭" },
        { type: "text", text: "respira" },
        { type: "text", text: "seja lá o que tiver passando pela sua cabeça agora" },
        { type: "text", text: "você não precisa resolver tudo hoje" },
        { type: "text", text: "pode esperar" },
      ],
      endTitle: "um pensamento de cada vez, cutie 💭",
    },
    sad: {
      emoji: "pleading-face",
      hubLabel: "Abra isso quando estiver triste",
      steps: [
        { type: "text", text: "ei lily 🥺" },
        { type: "text", text: "eu não sei exatamente o que aconteceu" },
        { type: "text", text: "mas você não precisa fingir que tá bem comigo" },
        { type: "text", text: "vem cá" },
        { type: "text", text: "você pode ficar triste" },
        { type: "text", text: "eu fico 🤍", emphasize: true },
      ],
      endTitle: "o tempo que precisar, eu tô aqui 🥺",
    },
    secret: {
      emoji: "locked-with-key",
      hubLabel: "você não devia ter achado isso",
      steps: [
        { type: "text", text: "você não devia ter achado isso 🔐" },
        { type: "text", text: "ok já que você tá aqui" },
        { type: "text", text: "essa é a que eu não planejei escrever" },
        { type: "text", text: "eu não tenho um roteiro pra essa carta, eu só queria um lugar que fosse só nosso" },
        {
          type: "text",
          text: "então: oi, sou eu mesmo, não é template, não é piada, sou só eu pensando em você mais tempo do que eu admitiria em voz alta",
        },
        { type: "text", text: "é isso, esse é o segredo 🤍", emphasize: true },
      ],
      endTitle: "agora você sabe 🔐",
    },
  },
};

function Emoji3D({ name, size = 32, className = "" }: { name: string; size?: number; className?: string }) {
  return (
    <img
      src={`/emoji/${name}.png`}
      alt=""
      draggable={false}
      className={className}
      style={{ width: size, height: size, display: "inline-block", objectFit: "contain" }}
    />
  );
}

function Petals({ image }: { image: string }) {
  const petals = [...Array(14)].map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 10 + Math.random() * 9,
    size: 20 + Math.random() * 20,
    drift: `${Math.random() * 80 - 40}px`,
    opacity: 0.5 + Math.random() * 0.4,
  }));

  return (
    <>
      {petals.map((p) => (
        <img
          key={p.id}
          src={`/emoji/${image}.png`}
          alt=""
          draggable={false}
          className="petal"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            ["--drift" as string]: p.drift,
          }}
        />
      ))}
    </>
  );
}

function MiniCard({
  id,
  lang,
  onOpen,
  rotate,
  variant,
  size = "sm",
  z,
}: {
  id: LetterId;
  lang: Lang;
  onOpen: (id: LetterId) => void;
  rotate: number;
  z?: number;
  variant: "envelope" | "note";
  size?: "sm" | "lg";
}) {
  const letter = LETTERS[lang][id];
  const letterTheme = THEMES[id];
  const w = size === "lg" ? 118 : 98;
  const minH = size === "lg" ? 140 : 112;
  const flapH = size === "lg" ? 52 : 42;
  const isEnvelope = variant === "envelope";

  return (
    <motion.button
      layoutId={`letter-${id}`}
      onClick={() => onOpen(id)}
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileTap={{ scale: 0.95 }}
      variants={{
        rest: { y: 0, rotate, scale: 1, boxShadow: "0 6px 14px -8px rgba(30,20,10,0.35)" },
        hover: { y: -8, rotate: 0, scale: 1.06, boxShadow: "0 16px 26px -10px rgba(30,20,10,0.4)" },
      }}
      className="relative flex flex-col items-center justify-start overflow-hidden"
      style={{
        width: w,
        minHeight: minH,
        zIndex: z,
        background: "#fdfbf6",
        border: "1px solid rgba(20,15,10,0.08)",
        borderRadius: isEnvelope ? 8 : 3,
        clipPath: isEnvelope ? undefined : "polygon(0 0, 100% 0, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
      }}
    >
      {isEnvelope && (
        <div
          className="absolute top-0 left-0"
          style={{
            width: 0,
            height: 0,
            borderLeft: `${w / 2}px solid transparent`,
            borderRight: `${w / 2}px solid transparent`,
            borderTop: `${flapH}px solid ${letterTheme.cardTint}`,
          }}
        />
      )}
      <div className="relative flex flex-col items-center gap-1.5 px-2 pb-2.5" style={{ marginTop: isEnvelope ? flapH - 8 : 10 }}>
        <Emoji3D name={letter.emoji} size={size === "lg" ? 26 : 20} />
        <span
          className="text-[9px] leading-tight text-center"
          style={{ fontFamily: "var(--font-cute-body)", fontWeight: 600, color: letterTheme.heading }}
        >
          {letter.hubLabel}
        </span>
      </div>
    </motion.button>
  );
}

function BoxScene({
  lang,
  theme,
  ui,
  showAll,
  setShowAll,
  secretUnlocked,
  onOpen,
}: {
  lang: Lang;
  theme: ThemePalette;
  ui: UIStrings;
  showAll: boolean;
  setShowAll: (v: boolean) => void;
  secretUnlocked: boolean;
  onOpen: (id: LetterId) => void;
}) {
  const spreadLetters = secretUnlocked ? [...ALL_LETTERS, "secret" as LetterId] : ALL_LETTERS;

  return (
    <motion.div
      key="box"
      variants={coverContainer}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      className="relative z-10 w-full max-w-sm mx-auto px-2 text-center"
    >
      <motion.p variants={coverRise} className="text-3xl leading-snug" style={{ fontFamily: "var(--font-cute-hand)", color: theme.heading }}>
        {ui.hubTitle}
      </motion.p>
      <motion.p variants={coverRise} className="text-sm mt-1" style={{ fontFamily: "var(--font-cute-body)", color: theme.muted }}>
        {ui.hubSubtitle}
      </motion.p>

      <motion.div variants={coverRise} className="relative mt-9">
        <div
          className="absolute left-1/2 -bottom-3 -translate-x-1/2 rounded-full"
          style={{ width: "82%", height: 22, background: "radial-gradient(ellipse, rgba(60,45,30,0.22), transparent 72%)", filter: "blur(6px)" }}
        />

        <div
          className="relative rounded-[1.75rem] pt-9 px-4 pb-6"
          style={{
            background: "linear-gradient(180deg, #f6efe1, #ede0c8)",
            border: "1px solid rgba(60,45,20,0.1)",
            boxShadow: "inset 0 2px 10px rgba(60,40,15,0.12), 0 24px 40px -22px rgba(40,25,10,0.35)",
          }}
        >
          <span
            className="absolute -top-3 left-7 rounded-full px-3 py-1 text-[10px] tracking-wide"
            style={{ fontFamily: "var(--font-cute-signature)", fontStyle: "italic", background: theme.card, color: theme.body, border: `1px solid ${theme.muted}55` }}
          >
            for Luly
          </span>

          <motion.img
            src="/emoji/ribbon.png"
            alt=""
            variants={coverRise}
            className="absolute -top-6 -right-3"
            style={{ width: 44, height: 44, transform: "rotate(12deg)" }}
          />

          {!showAll ? (
            <>
              <div className="flex flex-col items-center gap-3">
                {PEEK_ROWS.map((row, ri) => (
                  <div key={ri} className="flex" style={{ marginLeft: ri % 2 === 0 ? -12 : 12 }}>
                    {row.map((c, i) => (
                      <div key={c.id} style={{ marginLeft: i === 0 ? 0 : -14, zIndex: c.z, transform: `translateY(${c.nudgeY}px)`, position: "relative" }}>
                        <MiniCard id={c.id} lang={lang} onOpen={onOpen} rotate={c.rotate} variant={i % 2 === 0 ? "envelope" : "note"} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="relative flex flex-col items-center mt-3">
                <MiniCard id={FEATURED_LETTER} lang={lang} onOpen={onOpen} rotate={-2} variant="envelope" size="lg" />
                <span
                  className="mt-1 text-[10px] tracking-wide"
                  style={{ fontFamily: "var(--font-cute-signature)", fontStyle: "italic", color: theme.accentDark }}
                >
                  for today ♡
                </span>
              </div>

              <button
                onClick={() => setShowAll(true)}
                className="mt-5 text-xs underline underline-offset-4"
                style={{ fontFamily: "var(--font-cute-body)", color: theme.body }}
              >
                {ui.seeAll}
              </button>
            </>
          ) : (
            <>
              <div className="flex flex-wrap justify-center gap-3 py-2" style={{ maxWidth: 340, margin: "0 auto" }}>
                <MiniCard id={FEATURED_LETTER} lang={lang} onOpen={onOpen} rotate={-2} variant="envelope" />
                {spreadLetters.map((id, i) => (
                  <MiniCard
                    key={id}
                    id={id}
                    lang={lang}
                    onOpen={onOpen}
                    rotate={(i % 2 === 0 ? -1 : 1) * (3 + (i % 3))}
                    variant={i % 2 === 0 ? "note" : "envelope"}
                  />
                ))}
              </div>
              <button
                onClick={() => setShowAll(false)}
                className="mt-4 text-xs underline underline-offset-4"
                style={{ fontFamily: "var(--font-cute-body)", color: theme.body }}
              >
                {ui.seeLess}
              </button>
            </>
          )}
        </div>
      </motion.div>

      <motion.button
        variants={coverRise}
        onClick={() => onOpen(RANDOM_POOL[Math.floor(Math.random() * RANDOM_POOL.length)])}
        className="mt-6 text-xs underline underline-offset-4"
        style={{ fontFamily: "var(--font-cute-body)", color: theme.muted }}
      >
        {ui.surprise}
      </motion.button>
    </motion.div>
  );
}

const coverContainer = { hidden: {}, show: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } } };
const coverRise = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

function CoverScene({
  theme,
  coverTitle,
  coverSubtitle,
  coverButton,
  onOpen,
}: {
  theme: ThemePalette;
  coverTitle: string;
  coverSubtitle: string;
  coverButton: string;
  onOpen: () => void;
}) {
  return (
    <motion.div
      key="cover"
      variants={coverContainer}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, scale: 1.08, transition: { duration: 0.55, ease: "easeIn" } }}
      className="relative z-10 w-full max-w-sm mx-auto px-2"
    >
      <div className="pointer-events-none absolute inset-0 overflow-visible -z-10">
        <motion.img
          src="/emoji/cherry-blossom.png"
          alt=""
          variants={coverRise}
          className="absolute -left-12 -top-8 opacity-20 blur-[2px]"
          style={{ width: 96, height: 96 }}
        />
        <motion.img
          src="/emoji/cherry-blossom.png"
          alt=""
          variants={coverRise}
          className="absolute -right-10 bottom-4 opacity-10 blur-[3px]"
          style={{ width: 72, height: 72 }}
        />
      </div>

      <div className="relative flex justify-end mb-10" style={{ marginRight: "8%" }}>
        <div className="relative">
          <motion.div
            variants={coverRise}
            className="absolute left-1/2 bottom-[-16px]"
            style={{
              width: 120,
              height: 20,
              marginLeft: -60,
              borderRadius: "50%",
              background: `radial-gradient(ellipse, ${theme.heading}45, transparent 70%)`,
              filter: "blur(5px)",
            }}
          />
          <motion.div variants={coverRise}>
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
              <img
                src="/emoji/love-letter.png"
                alt=""
                draggable={false}
                style={{ width: 150, height: 150, filter: `drop-shadow(0 16px 18px ${theme.heading}30)` }}
              />
            </motion.div>
          </motion.div>
          <motion.div variants={coverRise} className="absolute -top-3 -left-6" style={{ transform: "rotate(-14deg)" }}>
            <motion.img
              src="/emoji/cherry-blossom.png"
              alt=""
              draggable={false}
              animate={{ rotate: [-14, -6, -14] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{ width: 46, height: 46 }}
            />
          </motion.div>
        </div>
      </div>

      <div className="pl-1">
        <motion.p
          variants={coverRise}
          className="text-3xl leading-snug text-left"
          style={{ fontFamily: "var(--font-cute-hand)", color: theme.heading }}
        >
          {coverTitle}
        </motion.p>
        <motion.p variants={coverRise} className="text-sm mt-2 text-left" style={{ fontFamily: "var(--font-cute-body)", color: theme.muted }}>
          {coverSubtitle}
        </motion.p>
        <motion.button
          variants={coverRise}
          onClick={onOpen}
          whileHover={{ y: -3, boxShadow: `0 16px 30px -10px ${theme.accent}` }}
          whileTap={{ scale: 0.96 }}
          className="mt-6 rounded-full px-8 py-3 text-white text-base tracking-wide"
          style={{ fontFamily: "var(--font-cute-body)", fontWeight: 600, background: theme.accent, boxShadow: `0 10px 22px -10px ${theme.accent}` }}
        >
          {coverButton}
        </motion.button>
      </div>
    </motion.div>
  );
}

function InteractStep({
  icon,
  prompt,
  buttonLabel,
  response,
  theme,
}: {
  icon?: string;
  prompt: string;
  buttonLabel: string;
  response: string;
  theme: ThemePalette;
}) {
  const [done, setDone] = useState(false);
  return (
    <div className="flex flex-col items-center gap-5">
      {icon && <Emoji3D name={icon} size={56} />}
      <p className="text-xl text-center" style={{ fontFamily: "var(--font-cute-body)", color: theme.heading }}>
        {done ? response : prompt}
      </p>
      {!done && (
        <motion.button
          onClick={() => setDone(true)}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-full px-6 py-2.5 text-white text-sm"
          style={{ fontFamily: "var(--font-cute-body)", fontWeight: 600, background: theme.accent }}
        >
          {buttonLabel}
        </motion.button>
      )}
    </div>
  );
}

type Stage = number | "end";

function loadOpened(): Set<LetterId> {
  try {
    const raw = localStorage.getItem("luly-opened-letters");
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

export default function LoveLetter() {
  const [lang, setLang] = useState<Lang>("en");
  const [showCover, setShowCover] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [activeLetter, setActiveLetter] = useState<LetterId | null>(null);
  const [stage, setStage] = useState<Stage>(0);
  const [opened, setOpened] = useState<Set<LetterId>>(loadOpened);
  const ui = UI[lang];
  const themeKey = activeLetter ?? "hub";
  const theme = THEMES[themeKey];
  const secretUnlocked = opened.size >= UNLOCK_SECRET_AT;

  const openCover = () => setShowCover(false);
  const openLetter = (id: LetterId) => {
    setActiveLetter(id);
    setStage(0);
    if (id !== "secret" && !opened.has(id)) {
      const next = new Set(opened);
      next.add(id);
      setOpened(next);
      try {
        localStorage.setItem("luly-opened-letters", JSON.stringify([...next]));
      } catch {
        /* ignore */
      }
    }
  };
  const backToHub = () => setActiveLetter(null);
  const restartLetter = () => setStage(0);
  const next = () => {
    if (activeLetter === null || typeof stage !== "number") return;
    const letter = LETTERS[lang][activeLetter];
    if (stage + 1 >= letter.steps.length) {
      setStage("end");
    } else {
      setStage(stage + 1);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center px-6 py-12">
      <AnimatePresence>
        <motion.div
          key={showCover ? "cover-bg" : themeKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="fixed inset-0"
          style={{ background: showCover ? COVER_BG : theme.gradient, zIndex: -1 }}
        />
      </AnimatePresence>

      {!showCover && theme.particlesEnabled !== false && <Petals image={theme.particle} />}

      <div className="fixed top-4 right-4 z-20 flex rounded-full border border-white/60 shadow-sm overflow-hidden">
        {(["en", "pt"] as Lang[]).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className="px-3 py-1.5 text-xs tracking-wide transition-colors"
            style={{
              fontFamily: "var(--font-cute-body)",
              fontWeight: 600,
              background: lang === l ? theme.accent : theme.card,
              color: lang === l ? "white" : theme.muted,
              transition: "background-color 0.5s ease, color 0.5s ease",
            }}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {showCover ? (
          <CoverScene theme={theme} coverTitle={ui.coverTitle} coverSubtitle={ui.coverSubtitle} coverButton={ui.coverButton} onOpen={openCover} />
        ) : activeLetter === null ? (
          <BoxScene lang={lang} theme={theme} ui={ui} showAll={showAll} setShowAll={setShowAll} secretUnlocked={secretUnlocked} onOpen={openLetter} />
        ) : (
          <motion.div
            key="card"
            className="relative z-10 w-full max-w-md"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              layoutId={`letter-${activeLetter}`}
              className="relative rounded-[2rem] px-8 py-10 sm:px-12 sm:py-14 shadow-[0_20px_60px_-15px_rgba(196,74,120,0.35)] border border-white/60"
              animate={{ backgroundColor: theme.card }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-[0.06]"
                animate={{ backgroundImage: `repeating-linear-gradient(0deg, ${theme.accent} 0px, transparent 1px, transparent 32px)` }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />

              <AnimatePresence mode="wait">
                {typeof stage === "number" &&
                  (() => {
                    const letter = LETTERS[lang][activeLetter];
                    const step = letter.steps[stage];
                    const growthStages = ["seedling", "herb", "tulip", "cherry-blossom"];
                    const fraction = letter.steps.length > 1 ? stage / (letter.steps.length - 1) : 1;
                    const growthIndex = Math.min(growthStages.length - 1, Math.floor(fraction * growthStages.length));
                    const sparse = letter.layout === "sparse";
                    const polaroid = letter.layout === "polaroid";
                    const rotateDeg = stage % 2 === 0 ? -2 : 2;

                    return (
                      <motion.div
                        key={`${lang}-${activeLetter}-${stage}`}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.45 }}
                        className={`relative flex flex-col items-center text-center ${sparse ? "gap-12 py-6" : "gap-9"}`}
                      >
                        {step.type === "text" &&
                          (polaroid ? (
                            <div
                              className="bg-white px-5 pt-5 pb-9 shadow-md"
                              style={{ transform: `rotate(${rotateDeg}deg)`, border: "1px solid rgba(0,0,0,0.06)" }}
                            >
                              <p
                                className="text-xl leading-snug whitespace-pre-line"
                                style={{ fontFamily: "var(--font-cute-body)", color: theme.heading, maxWidth: 240 }}
                              >
                                {step.text}
                              </p>
                            </div>
                          ) : (
                            <p
                              className={
                                step.emphasize
                                  ? "text-3xl sm:text-4xl leading-snug whitespace-pre-line"
                                  : step.signature
                                    ? "text-xl italic whitespace-pre-line"
                                    : "text-2xl sm:text-[1.65rem] leading-snug whitespace-pre-line"
                              }
                              style={{
                                fontFamily: step.emphasize ? "var(--font-cute-hand)" : step.signature ? "var(--font-cute-signature)" : "var(--font-cute-body)",
                                color: step.emphasize ? theme.accentDark : theme.heading,
                              }}
                            >
                              {step.text}
                            </p>
                          ))}

                        {step.type === "card" && (
                          <div className="flex flex-col items-center gap-4">
                            <Emoji3D name={step.icon} size={64} />
                            <p
                              className="text-xs uppercase tracking-[0.2em]"
                              style={{ fontFamily: "var(--font-cute-body)", fontWeight: 700, color: theme.accentDark }}
                            >
                              {step.title}
                            </p>
                            <div
                              className="rounded-2xl border-2 border-dashed px-6 py-4 flex flex-col gap-1.5"
                              style={{ borderColor: theme.muted, background: theme.cardTint }}
                            >
                              {step.lines.map((line, i) => (
                                <p key={i} className="text-lg text-left" style={{ fontFamily: "var(--font-cute-body)", color: theme.heading }}>
                                  {line}
                                </p>
                              ))}
                            </div>
                          </div>
                        )}

                        {step.type === "interact" && (
                          <InteractStep icon={step.icon} prompt={step.prompt} buttonLabel={step.buttonLabel} response={step.response} theme={theme} />
                        )}

                        <motion.div key={growthIndex} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4 }}>
                          <Emoji3D name={growthStages[growthIndex]} size={26 + fraction * 22} />
                        </motion.div>

                        <button
                          onClick={next}
                          className="rounded-full px-7 py-2.5 text-white text-sm tracking-wide shadow-md transition-transform hover:scale-105 active:scale-95"
                          style={{ fontFamily: "var(--font-cute-body)", fontWeight: 600, background: theme.accent, boxShadow: `0 10px 25px -8px ${theme.accent}` }}
                        >
                          {stage + 1 >= letter.steps.length ? ui.continueLast : ui.continueMid}
                        </button>
                      </motion.div>
                    );
                  })()}

                {activeLetter !== null &&
                  stage === "end" &&
                  (() => {
                    const letter = LETTERS[lang][activeLetter];
                    return (
                      <motion.div
                        key={`${lang}-${activeLetter}-end`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="relative flex flex-col items-center gap-7 text-center"
                      >
                        <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                          <Emoji3D name={letter.emoji} size={84} />
                        </motion.div>
                        <motion.p
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                          className="text-3xl sm:text-4xl leading-tight"
                          style={{ fontFamily: "var(--font-cute-hand)", color: theme.accentDark }}
                        >
                          {letter.endTitle}
                        </motion.p>
                        <p className="text-lg italic" style={{ fontFamily: "var(--font-cute-signature)", color: theme.body }}>
                          {ui.endSignature}
                        </p>
                        <div className="flex items-center gap-5 mt-1">
                          <button
                            onClick={restartLetter}
                            className="text-sm underline underline-offset-4 transition-colors"
                            style={{ fontFamily: "var(--font-cute-body)", color: theme.muted }}
                          >
                            {ui.restart}
                          </button>
                          <button
                            onClick={backToHub}
                            className="text-sm underline underline-offset-4 transition-colors"
                            style={{ fontFamily: "var(--font-cute-body)", color: theme.muted }}
                          >
                            {ui.backToHub}
                          </button>
                        </div>
                      </motion.div>
                    );
                  })()}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
