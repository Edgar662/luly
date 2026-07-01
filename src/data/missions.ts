import kimCorda from "../assets/characters/kim-corda.png";

export interface QuizOption {
  id: string;
  text: { en: string; pt: string };
  reaction: { en: string; pt: string };
}

export interface ChoiceQuestion {
  id: string;
  type: "choice";
  prompt: { en: string; pt: string };
  options: QuizOption[];
}

export interface TextQuestion {
  id: string;
  type: "text";
  prompt: { en: string; pt: string };
  placeholder: { en: string; pt: string };
  reaction: { en: string; pt: string };
}

// Simple Caesar shift, letters only — spaces/punctuation pass through.
// The plaintext `message` lives here; the encoded version is derived at
// render time so we never have to hand-encode two languages.
export interface CipherQuestion {
  id: string;
  type: "cipher";
  prompt: { en: string; pt: string };
  intro: { en: string; pt: string };
  message: { en: string; pt: string };
  shift: number;
  placeholder: { en: string; pt: string };
  successReaction: { en: string; pt: string };
  failReaction: { en: string; pt: string };
}

export interface TwoTruthsStatement {
  text: { en: string; pt: string };
  isLie: boolean;
}

export interface TwoTruthsOneLieQuestion {
  id: string;
  type: "twoTruthsOneLie";
  prompt: { en: string; pt: string };
  statements: TwoTruthsStatement[];
  correctReaction: { en: string; pt: string };
  wrongReaction: { en: string; pt: string };
}

export interface MatchPair {
  left: { en: string; pt: string };
  right: { en: string; pt: string };
}

export interface MatchPairsQuestion {
  id: string;
  type: "matchPairs";
  prompt: { en: string; pt: string };
  pairs: MatchPair[];
  reaction: { en: string; pt: string };
}

export interface SliderQuestion {
  id: string;
  type: "slider";
  prompt: { en: string; pt: string };
  min: number;
  max: number;
  step: number;
  unit: { en: string; pt: string };
  answer: number;
  tolerance: number;
  reactionClose: { en: string; pt: string };
  reactionFar: { en: string; pt: string };
}

export interface TimedChallengeQuestion {
  id: string;
  type: "timedChallenge";
  prompt: { en: string; pt: string };
  seconds: number;
  buttonLabel: { en: string; pt: string };
  successReaction: { en: string; pt: string };
  timeoutReaction: { en: string; pt: string };
}

export interface SafeQuestion {
  id: string;
  type: "safe";
  prompt: { en: string; pt: string };
  hint: { en: string; pt: string };
  code: string;
  successReaction: { en: string; pt: string };
  wrongReaction: { en: string; pt: string };
}

export type QuizQuestion =
  | ChoiceQuestion
  | TextQuestion
  | CipherQuestion
  | TwoTruthsOneLieQuestion
  | MatchPairsQuestion
  | SliderQuestion
  | TimedChallengeQuestion
  | SafeQuestion;

export interface MissionData {
  id: number;
  image: string;
  badge: { en: string; pt: string };
  briefingLines: { en: string[]; pt: string[] };
  title: { en: string; pt: string };
  objective: { en: string; pt: string };
  questions: QuizQuestion[];
}

// NOTE: briefingLines, title, objective and every question/option/reaction
// below are placeholders. Swap them for your own inside jokes before this
// ships — see PLACEHOLDER markers.
// Identification (NameEntry.tsx) is just the login screen, not a tracked
// mission — this is genuinely her first completed mission.
export const missions: Record<number, MissionData> = {
  1: {
    id: 1,
    image: kimCorda,
    badge: { en: "MISSION 01", pt: "MISSÃO 01" },
    briefingLines: {
      en: [
        "Command has been keeping an eye on you for a while now.",
        "There's someone out there who thinks they already know you pretty well.",
        "Time to find out if they're right.",
        "This first one is easy. Just answer honestly. Or don't — we'll know either way.",
      ],
      pt: [
        "O Comando anda de olho em você já faz um tempo.",
        "Tem alguém aí fora que acha que já te conhece muito bem.",
        "Hora de descobrir se essa pessoa está certa.",
        "Essa primeira é fácil. Só responda com sinceridade. Ou não — a gente vai saber do mesmo jeito.",
      ],
    },
    title: { en: "OPERATION: FIRST STEP", pt: "OPERAÇÃO: PRIMEIRO PASSO" },
    objective: {
      en: "Climb aboard. Answer this round of questions so Command can calibrate your agent profile.",
      pt: "Suba a bordo. Responda essa rodada de perguntas pra o Comando calibrar seu perfil de agente.",
    },
    // PLACEHOLDER questions — replace with your real inside jokes whenever you want.
    questions: [
      {
        id: "q1",
        type: "choice",
        prompt: {
          en: "First thing's first — what's your chaos level today?",
          pt: "Antes de mais nada — qual é o seu nível de caos hoje?",
        },
        options: [
          {
            id: "a",
            text: { en: "Calm and collected", pt: "Calma e tranquila" },
            reaction: {
              en: "Suspiciously composed. Noted.",
              pt: "Suspeitosamente composta. Anotado.",
            },
          },
          {
            id: "b",
            text: { en: "Barely holding it together", pt: "Segurando as pontas por um fio" },
            reaction: { en: "Relatable. Mission still on.", pt: "Muito relatable. Missão segue de pé." },
          },
          {
            id: "c",
            text: { en: "Certified chaos gremlin", pt: "Gremlin do caos certificada" },
            reaction: { en: "Command loves this energy.", pt: "O Comando amou essa energia." },
          },
          {
            id: "d",
            text: {
              en: "Depends entirely on how much coffee I've had",
              pt: "Depende inteiramente de quanto café eu já tomei",
            },
            reaction: { en: "A truthful agent. Rare.", pt: "Uma agente sincera. Raro." },
          },
        ],
      },
      {
        id: "q2",
        type: "text",
        prompt: {
          en: "In one sentence: why should Command recruit you?",
          pt: "Em uma frase: por que o Comando deveria te recrutar?",
        },
        placeholder: { en: "Because I...", pt: "Porque eu..." },
        reaction: {
          en: "Bold. Filed under 'promising'.",
          pt: "Ousado. Arquivado como 'promissora'.",
        },
      },
      {
        id: "q3",
        type: "cipher",
        prompt: {
          en: "Incoming encrypted transmission.",
          pt: "Transmissão criptografada recebida.",
        },
        intro: {
          en: "Command sends short bursts sometimes. Simple shift cipher — each letter moved forward by 3.",
          pt: "Às vezes o Comando manda mensagens curtas. Cifra simples — cada letra deslocada 3 posições.",
        },
        message: { en: "CUTE CUTE BEBA AGUA", pt: "CUTE CUTE BEBA AGUA" },
        shift: 3,
        placeholder: { en: "Type the decoded message...", pt: "Digite a mensagem decifrada..." },
        successReaction: {
          en: "Decrypted perfectly. Now go drink some water — Command's orders.",
          pt: "Decifrado perfeitamente. Agora vai beber água — ordens do Comando.",
        },
        failReaction: {
          en: "Close enough. Command reveals it anyway: go drink some water.",
          pt: "Chegou perto. O Comando revela mesmo assim: vai beber água.",
        },
      },
      {
        id: "q4",
        type: "choice",
        prompt: {
          en: "Quick trivia: what does Kim Possible say whenever a new mission comes in?",
          pt: "Trivia rápida: o que a Kim Possible fala toda vez que chega uma nova missão?",
        },
        options: [
          {
            id: "a",
            text: { en: "\"What's the sitch?\"", pt: "\"Qual é a treta?\"" },
            reaction: { en: "Correct. You've done your homework.", pt: "Certinho. Você estudou." },
          },
          {
            id: "b",
            text: { en: "\"No big.\"", pt: "\"Sem problema.\"" },
            reaction: {
              en: "Close, but that's her 'no worries' line.",
              pt: "Quase, essa é a frase de 'sem crise' dela.",
            },
          },
          {
            id: "c",
            text: { en: "\"So not the drama.\"", pt: "\"Isso não é nada de mais.\"" },
            reaction: {
              en: "That one's more rival energy.",
              pt: "Essa é mais a vibe de rivalidade.",
            },
          },
          {
            id: "d",
            text: { en: "\"I can do anything.\"", pt: "\"Eu consigo fazer qualquer coisa.\"" },
            reaction: { en: "Confident guess. Not quite it.", pt: "Chute confiante. Não é bem essa." },
          },
        ],
      },
      {
        id: "q5",
        type: "text",
        prompt: {
          en: "If Kim recruited you as backup, what's the one skill you'd bring to the team?",
          pt: "Se a Kim te recrutasse como reforço, qual habilidade você traria pro time?",
        },
        placeholder: { en: "My skill is...", pt: "Minha habilidade é..." },
        reaction: {
          en: "Added to your file. Command is impressed.",
          pt: "Adicionado ao seu arquivo. O Comando ficou impressionado.",
        },
      },
      {
        id: "q6",
        type: "choice",
        prompt: {
          en: "Quick file check — which flower does Command have on record as your favorite?",
          pt: "Checagem rápida de arquivo — qual flor está registrada como sua favorita?",
        },
        options: [
          {
            id: "a",
            text: { en: "White tulips", pt: "Tulipas brancas" },
            reaction: {
              en: "Correct. Filed as #1 — red roses are a close second, though.",
              pt: "Correto. Registrada como #1 — rosas vermelhas ficam em segundo, bem pertinho.",
            },
          },
          {
            id: "b",
            text: { en: "Red roses", pt: "Rosas vermelhas" },
            reaction: { en: "Close. That's the #2 pick, not #1.", pt: "Quase. Essa é a #2, não a #1." },
          },
          {
            id: "c",
            text: { en: "Sunflowers", pt: "Girassóis" },
            reaction: { en: "Nice guess, wrong bouquet.", pt: "Bom chute, buquê errado." },
          },
          {
            id: "d",
            text: { en: "Orchids", pt: "Orquídeas" },
            reaction: { en: "Fancy, but not quite.", pt: "Chique, mas não é essa." },
          },
        ],
      },
      {
        id: "q7",
        type: "twoTruthsOneLie",
        prompt: {
          en: "Two of these are true. One is a lie. Which one?",
          pt: "Duas dessas são verdade. Uma é mentira. Qual?",
        },
        statements: [
          {
            text: {
              en: "Hazelnut milk chocolate is your favorite.",
              pt: "Chocolate de leite de avelã é seu favorito.",
            },
            isLie: false,
          },
          {
            text: {
              en: "He's never seen you in person — just heard that you're beautiful.",
              pt: "Ele nunca te viu pessoalmente — só ouviu dizer que você é linda.",
            },
            isLie: false,
          },
          {
            text: {
              en: "Your favorite color is blue.",
              pt: "Sua cor favorita é azul.",
            },
            isLie: true,
          },
        ],
        correctReaction: {
          en: "Correct. That one really was made up.",
          pt: "Correto. Essa realmente foi inventada.",
        },
        wrongReaction: {
          en: "Actually, the lie was the one about your favorite color.",
          pt: "Na verdade, a mentira era sobre sua cor favorita.",
        },
      },
      {
        id: "q8",
        type: "choice",
        prompt: {
          en: "What's the name of Ron Stoppable's pet naked mole rat?",
          pt: "Qual é o nome do rato-toupeira-pelado de estimação do Ron Stoppable?",
        },
        options: [
          {
            id: "a",
            text: { en: "Rufus", pt: "Rufus" },
            reaction: { en: "Correct. Snacks for the mole rat, agent.", pt: "Certo. Petisco pro rato, agente." },
          },
          {
            id: "b",
            text: { en: "Pepper", pt: "Pepper" },
            reaction: { en: "Nope, but great name for a pet.", pt: "Não é esse, mas seria um bom nome." },
          },
          {
            id: "c",
            text: { en: "Nibbles", pt: "Nibbles" },
            reaction: { en: "Wrong rodent. Try again someday.", pt: "Roedor errado. Tenta de novo um dia desses." },
          },
          {
            id: "d",
            text: { en: "Waffles", pt: "Waffles" },
            reaction: { en: "That's a pancake name, not his.", pt: "Esse é nome de panqueca, não dele." },
          },
        ],
      },
      {
        id: "q9",
        type: "text",
        prompt: {
          en: "Describe your perfect Saturday in exactly 5 words.",
          pt: "Descreva seu sábado perfeito em exatamente 5 palavras.",
        },
        placeholder: { en: "Five words, go...", pt: "Cinco palavras, vai..." },
        reaction: {
          en: "Poetic. Command is taking notes.",
          pt: "Poético. O Comando está anotando.",
        },
      },
      {
        id: "q10",
        type: "matchPairs",
        prompt: {
          en: "Match each codename to its file description.",
          pt: "Combine cada codinome com a descrição do arquivo.",
        },
        pairs: [
          {
            left: { en: "Wade", pt: "Wade" },
            right: {
              en: "Tech genius who never leaves his room",
              pt: "Gênio da tecnologia que nunca sai do quarto",
            },
          },
          {
            left: { en: "Rufus", pt: "Rufus" },
            right: { en: "Naked mole rat, surprisingly useful", pt: "Rato-toupeira, surpreendentemente útil" },
          },
          {
            left: { en: "Dr. Drakken", pt: "Dr. Drakken" },
            right: {
              en: "Villain who insists on being taken seriously",
              pt: "Vilão que insiste em ser levado a sério",
            },
          },
        ],
        reaction: { en: "All matched. File complete.", pt: "Tudo combinado. Arquivo completo." },
      },
      {
        id: "q11",
        type: "choice",
        prompt: {
          en: "Which of these was an actual Cold War-era spy gadget?",
          pt: "Qual desses foi um gadget de espionagem real da Guerra Fria?",
        },
        options: [
          {
            id: "a",
            text: { en: "A lipstick-shaped pistol", pt: "Uma pistola em formato de batom" },
            reaction: {
              en: "Real. The KGB called it the 'kiss of death'.",
              pt: "Real. A KGB chamava de 'beijo da morte'.",
            },
          },
          {
            id: "b",
            text: { en: "A poison-tipped umbrella", pt: "Um guarda-chuva com ponta envenenada" },
            reaction: {
              en: "Also real. Used in a real assassination.",
              pt: "Também real. Usado em um assassinato de verdade.",
            },
          },
          {
            id: "c",
            text: { en: "Both, unfortunately", pt: "Os dois, infelizmente" },
            reaction: { en: "Correct — and deeply unsettling.", pt: "Correto — e bem perturbador." },
          },
          {
            id: "d",
            text: { en: "Neither, that's just movies", pt: "Nenhum, isso é só filme" },
            reaction: { en: "Wish that were true. It's not.", pt: "Quem dera fosse verdade. Não é." },
          },
        ],
      },
      {
        id: "q12",
        type: "text",
        prompt: {
          en: "We've known each other about a month now — what's one question you've been wanting to ask me?",
          pt: "A gente se conhece tem uns um mês — qual pergunta você anda querendo me fazer?",
        },
        placeholder: { en: "Go ahead, ask...", pt: "Pode perguntar..." },
        reaction: {
          en: "Logged. I'll answer it for real later.",
          pt: "Registrado. Eu respondo de verdade depois.",
        },
      },
      {
        id: "q13",
        type: "slider",
        prompt: {
          en: "On a scale of 1 to 10 — how stubborn does Command's file say you are?",
          pt: "Numa escala de 1 a 10 — o quão teimosa o arquivo do Comando diz que você é?",
        },
        min: 1,
        max: 10,
        step: 1,
        unit: { en: "/10", pt: "/10" },
        answer: 10,
        tolerance: 3,
        reactionClose: { en: "Scary self-aware.", pt: "Assustadoramente autoconsciente." },
        reactionFar: { en: "The file says it's higher than that. Way higher.", pt: "O arquivo diz que é mais alto que isso. Bem mais." },
      },
      {
        id: "q14",
        type: "choice",
        prompt: {
          en: "Mission emergency: you need a snack immediately. What do you grab?",
          pt: "Emergência de missão: você precisa de um lanche imediatamente. O que você pega?",
        },
        options: [
          {
            id: "a",
            text: { en: "Something sweet", pt: "Algo doce" },
            reaction: { en: "Sugar-fueled agent, noted.", pt: "Agente movida a açúcar, anotado." },
          },
          {
            id: "b",
            text: { en: "Something salty", pt: "Algo salgado" },
            reaction: { en: "Solid tactical choice.", pt: "Escolha tática sólida." },
          },
          {
            id: "c",
            text: { en: "Leftovers, don't judge", pt: "Sobras, não julga" },
            reaction: { en: "No judgment here. Efficient.", pt: "Sem julgamento aqui. Eficiente." },
          },
          {
            id: "d",
            text: {
              en: "I don't eat during missions, I'm a professional",
              pt: "Eu não como durante missões, sou profissional",
            },
            reaction: { en: "Suspiciously disciplined.", pt: "Disciplina suspeita." },
          },
        ],
      },
      {
        id: "q15",
        type: "choice",
        prompt: {
          en: "Kim's blue-skinned, constantly monologuing nemesis is named:",
          pt: "O arqui-inimigo de pele azul e sempre discursando da Kim se chama:",
        },
        options: [
          {
            id: "a",
            text: { en: "Dr. Drakken", pt: "Dr. Drakken" },
            reaction: { en: "Correct. Ten points to you.", pt: "Certo. Dez pontos pra você." },
          },
          {
            id: "b",
            text: { en: "Professor Dementor", pt: "Professor Dementor" },
            reaction: { en: "Close, wrong accent though.", pt: "Quase, mas o sotaque é outro." },
          },
          {
            id: "c",
            text: { en: "Duff Killigan", pt: "Duff Killigan" },
            reaction: { en: "Nope, that one's obsessed with golf.", pt: "Não, esse é obcecado por golfe." },
          },
          {
            id: "d",
            text: { en: "Motor Ed", pt: "Motor Ed" },
            reaction: {
              en: "Wrong villain, seriously good guess though.",
              pt: "Vilão errado, mas foi um bom chute.",
            },
          },
        ],
      },
      {
        id: "q16",
        type: "text",
        prompt: {
          en: "If your codename had nothing to do with Kim Possible, what would it be?",
          pt: "Se seu codinome não tivesse nada a ver com a Kim Possible, qual seria?",
        },
        placeholder: { en: "Codename: ...", pt: "Codinome: ..." },
        reaction: {
          en: "Filed. That's a good alias, honestly.",
          pt: "Arquivado. Sinceramente, é um bom codinome.",
        },
      },
      {
        id: "q17",
        type: "timedChallenge",
        prompt: {
          en: "Alarm's tripped. Disarm it before Command notices.",
          pt: "O alarme disparou. Desarme antes que o Comando perceba.",
        },
        seconds: 8,
        buttonLabel: { en: "DISARM", pt: "DESARMAR" },
        successReaction: { en: "Disarmed with time to spare. Smooth.", pt: "Desarmado com tempo de sobra. Suave." },
        timeoutReaction: {
          en: "Time's up — but Command will let this one slide.",
          pt: "Tempo esgotado — mas o Comando vai deixar passar dessa vez.",
        },
      },
      {
        id: "q18",
        type: "choice",
        prompt: {
          en: "She once said she threw the key to her heart into the deepest part of the ocean. What did he say back?",
          pt: "Ela disse uma vez que jogou a chave do coração dela no fundo do mar mais profundo. O que ele respondeu?",
        },
        options: [
          {
            id: "a",
            text: {
              en: "\"That's why I bought a submarine.\"",
              pt: "\"Quer por isso que eu comprei um submarino.\"",
            },
            reaction: {
              en: "Correct. Command still hasn't found the key, but the submarine was a solid start.",
              pt: "Correto. O Comando ainda não achou a chave, mas o submarino foi um bom começo.",
            },
          },
          {
            id: "b",
            text: { en: "\"I'll just learn to breathe underwater.\"", pt: "\"Vou aprender a respirar debaixo d'água.\"" },
            reaction: { en: "Ambitious, but that's not the plan.", pt: "Ambicioso, mas não foi esse o plano." },
          },
          {
            id: "c",
            text: { en: "\"Finders keepers, I guess.\"", pt: "\"Achado não é roubado, então.\"" },
            reaction: { en: "Cute guess, wrong answer.", pt: "Chute fofo, resposta errada." },
          },
          {
            id: "d",
            text: { en: "\"Guess I'll give up looking.\"", pt: "\"Acho que vou desistir de procurar.\"" },
            reaction: { en: "Never. He's still looking.", pt: "Nunca. Ele ainda procura." },
          },
        ],
      },
      {
        id: "q19",
        type: "choice",
        prompt: {
          en: "Roughly how many UN-recognized countries are there in the world?",
          pt: "Aproximadamente quantos países reconhecidos pela ONU existem no mundo?",
        },
        options: [
          {
            id: "a",
            text: { en: "About 100", pt: "Cerca de 100" },
            reaction: { en: "Undercounting the world a bit.", pt: "Subestimando um pouco o mundo." },
          },
          {
            id: "b",
            text: { en: "About 150", pt: "Cerca de 150" },
            reaction: { en: "Getting warmer.", pt: "Esquentando." },
          },
          {
            id: "c",
            text: { en: "About 195", pt: "Cerca de 195" },
            reaction: { en: "Correct. Geography agent unlocked.", pt: "Correto. Agente de geografia desbloqueada." },
          },
          {
            id: "d",
            text: { en: "About 250", pt: "Cerca de 250" },
            reaction: { en: "Overcounting, but ambitious.", pt: "Passou um pouco, mas ambicioso." },
          },
        ],
      },
      {
        id: "q20",
        type: "text",
        prompt: {
          en: "Make up a mission code word — something only you'd remember.",
          pt: "Invente uma palavra-código de missão — algo que só você lembraria.",
        },
        placeholder: { en: "Code word: ...", pt: "Palavra-código: ..." },
        reaction: {
          en: "Encrypted and stored. Don't forget it.",
          pt: "Criptografado e guardado. Não esquece essa.",
        },
      },
      {
        id: "q21",
        type: "choice",
        prompt: {
          en: "How does Kim usually fund her missions?",
          pt: "Como a Kim geralmente banca as missões dela?",
        },
        options: [
          {
            id: "a",
            text: { en: "Babysitting", pt: "Cuidando de crianças" },
            reaction: { en: "Correct. Heroics don't pay the bills.", pt: "Certo. Heroísmo não paga as contas." },
          },
          {
            id: "b",
            text: { en: "A fast food job", pt: "Um emprego de fast food" },
            reaction: {
              en: "Wrong job, right side-hustle energy.",
              pt: "Emprego errado, mas a vibe de renda extra bate.",
            },
          },
          {
            id: "c",
            text: { en: "Dog walking", pt: "Passear com cachorros" },
            reaction: { en: "Not quite, but adorable guess.", pt: "Não é bem isso, mas o chute foi fofo." },
          },
          {
            id: "d",
            text: { en: "Her parents fund it", pt: "Os pais dela bancam" },
            reaction: { en: "Nope, she actually works for it.", pt: "Não, ela realmente trabalha por isso." },
          },
        ],
      },
      {
        id: "q22",
        type: "text",
        prompt: {
          en: "What's a completely useless talent you have?",
          pt: "Qual é um talento completamente inútil que você tem?",
        },
        placeholder: { en: "I can...", pt: "Eu consigo..." },
        reaction: {
          en: "Useless but noted as a personal strength.",
          pt: "Inútil, mas anotado como ponto forte pessoal.",
        },
      },
      {
        id: "q23",
        type: "choice",
        prompt: {
          en: "If this mission goes sideways, who do you call first?",
          pt: "Se essa missão der errado, pra quem você liga primeiro?",
        },
        options: [
          {
            id: "a",
            text: { en: "A friend", pt: "Um amigo" },
            reaction: { en: "Solid backup plan.", pt: "Plano de apoio sólido." },
          },
          {
            id: "b",
            text: { en: "Family", pt: "Família" },
            reaction: { en: "Reliable choice.", pt: "Escolha confiável." },
          },
          {
            id: "c",
            text: { en: "911, obviously", pt: "193, óbvio" },
            reaction: { en: "Practical. Very practical.", pt: "Prático. Muito prático." },
          },
          {
            id: "d",
            text: { en: "No one, I handle it alone", pt: "Ninguém, eu resolvo sozinha" },
            reaction: {
              en: "Noted, agent. Also, that's a little concerning.",
              pt: "Anotado, agente. Também é meio preocupante.",
            },
          },
        ],
      },
      {
        id: "q24",
        type: "safe",
        prompt: {
          en: "One last lock stands between you and the mission report. Command left a hint.",
          pt: "Uma última fechadura entre você e o relatório da missão. O Comando deixou uma pista.",
        },
        hint: {
          en: "Hint: day and month of the day that made September worth circling on the calendar.",
          pt: "Dica: dia e mês da data que fez setembro valer a pena marcar no calendário.",
        },
        code: "0409",
        successReaction: {
          en: "Access granted. Of course you knew that one.",
          pt: "Acesso concedido. Claro que você sabia essa.",
        },
        wrongReaction: {
          en: "The code was 0409, by the way. Your birthday. Command should really change that password.",
          pt: "O código era 0409, aliás. Seu aniversário. O Comando devia trocar essa senha.",
        },
      },
      {
        id: "q25",
        type: "text",
        prompt: {
          en: "Last one. In your own words — what do you think this whole mystery agent thing is really about?",
          pt: "Última pergunta. Com suas palavras — o que você acha que é essa história toda de agente misteriosa?",
        },
        placeholder: { en: "I think it's...", pt: "Eu acho que é..." },
        reaction: {
          en: "Filed as the final entry. Mission complete, agent.",
          pt: "Arquivado como o registro final. Missão cumprida, agente.",
        },
      },
    ],
  },
};
