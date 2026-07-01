export interface Translations {
  boot: { lines: string[] };
  nameEntry: {
    missionBadge: string;
    title: string;
    subtitle: string;
    usernameLabel: string;
    usernamePlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    loginButton: string;
    authenticating: string;
    accessDeniedTitle: string;
    accessDeniedBody: string;
    hint: string;
    anonymous: string;
  };
  header: {
    appName: string;
    appSubtitle: string;
    status: string;
    statusValue: string;
  };
  welcome: {
    welcomeLine: string;
    agentPrefix: string;
    unknownName: string;
    revealedDesc: string;
    anonymousDesc: string;
    mysteryDesc: string;
    missionButton: string;
  };
  briefing: {
    eyebrow: string;
    connecting: string;
    objectiveLabel: string;
    acceptButton: string;
    introRevealed: string[];
    introAnonymous: string[];
  };
  mission: {
    questionLabel: string;
    ofLabel: string;
    submitButton: string;
    nextButton: string;
    finishButton: string;
    completeTitle: string;
    completeBody: string;
    backButton: string;
  };
  profile: {
    title: string;
    codenameLabel: string;
    unknown: string;
    levelLabel: string;
    levelValue: string;
    missionsLabel: string;
  };
  menu: {
    missions: { title: string; activeSuffix: string };
    dossier: { title: string; status: string };
    files: { title: string; status: string };
    achievements: { title: string; status: string };
    comms: { title: string; status: string };
    lockedLabel: string;
    lockedHint: string;
  };
  character: {
    liveFeed: string;
    noteTitle: string;
    noteBody: string;
  };
  footer: {
    system: string;
    connection: string;
  };
}

export const translations: Record<"en" | "pt", Translations> = {
  en: {
    boot: {
      lines: [
        "KP SYSTEMS BIOS v2.0",
        "COPYRIGHT (C) KP SYSTEMS INC. ALL RIGHTS RESERVED.",
        "",
        "INITIALIZING KERNEL..........................[OK]",
        "VERIFYING SYSTEM INTEGRITY...................[OK]",
        "LOADING ENCRYPTED MODULES....................[OK]",
        "CONNECTING TO SATELLITE KP-1.................[OK]",
        "TRIANGULATING SIGNAL.........................[OK]",
        "ESTABLISHING SECURE CHANNEL..................[OK]",
        "DECRYPTING AGENT DATABASE....................[OK]",
        "",
        "> AUTHORIZATION LEVEL: UNKNOWN",
        "> WARNING: UNAUTHORIZED ATTEMPTS WILL BE TRACED.",
        "",
        "WELCOME TO THE KP COMM SYSTEM.",
        "AWAITING AGENT IDENTIFICATION...",
        "",
        "[ TAP ANYWHERE TO CONTINUE ]",
      ],
    },
    nameEntry: {
      missionBadge: "SYSTEM ACCESS",
      title: "IDENTIFICATION REQUIRED",
      subtitle:
        "Enter your access credentials to continue. If you'd rather keep them to yourself, that works too.",
      usernameLabel: "USERNAME",
      usernamePlaceholder: "Enter username...",
      passwordLabel: "PASSWORD",
      passwordPlaceholder: "Enter password...",
      loginButton: "LOG IN",
      authenticating: "AUTHENTICATING...",
      accessDeniedTitle: "ACCESS DENIED",
      accessDeniedBody: "No record of '{username}' in the system. Identity not found.",
      hint: "Command doesn't have your file on record. Maybe try the option below?",
      anonymous: "PREFER NOT TO SAY",
    },
    header: {
      appName: "COMM",
      appSubtitle: "Agent Communicator",
      status: "STATUS:",
      statusValue: "ONLINE",
    },
    welcome: {
      welcomeLine: "WELCOME,",
      agentPrefix: "AGENT",
      unknownName: "????",
      revealedDesc: "Identity confirmed. Welcome back to the system.",
      anonymousDesc: "You chose to keep your identity a secret. Fair enough, mystery agent.",
      mysteryDesc:
        "Your identity is still a mystery. Complete your profile to unlock the full system.",
      missionButton: "START FIRST MISSION",
    },
    briefing: {
      eyebrow: "INCOMING TRANSMISSION",
      connecting: "CONNECTING...",
      objectiveLabel: "OBJECTIVE",
      acceptButton: "ACCEPT MISSION",
      introRevealed: [
        "...signal locked...",
        "Agent {name}, good — identification confirmed.",
        "Command has your file open right now.",
      ],
      introAnonymous: [
        "...signal locked...",
        "No name on file. Interesting choice, agent.",
        "Command respects the silence. For now.",
        "We'll just call you 'Agent Unknown' until you decide otherwise.",
      ],
    },
    mission: {
      questionLabel: "QUESTION",
      ofLabel: "OF",
      submitButton: "CONFIRM ANSWER",
      nextButton: "NEXT",
      finishButton: "FINISH MISSION",
      completeTitle: "MISSION COMPLETE",
      completeBody: "Data logged. Command is calibrating your profile as we speak.",
      backButton: "RETURN TO BASE",
    },
    profile: {
      title: "AGENT PROFILE",
      codenameLabel: "Codename:",
      unknown: "UNKNOWN",
      levelLabel: "Level:",
      levelValue: "BEGINNER",
      missionsLabel: "Missions completed:",
    },
    menu: {
      missions: { title: "MISSIONS", activeSuffix: "ACTIVE MISSIONS" },
      dossier: { title: "DOSSIER", status: "PROFILE INCOMPLETE" },
      files: { title: "FILES", status: "0 FILES" },
      achievements: { title: "ACHIEVEMENTS", status: "0/20 ACHIEVEMENTS" },
      comms: { title: "TRANSMISSIONS", status: "0 NEW MESSAGES" },
      lockedLabel: "LOCKED",
      lockedHint: "Unlocks after Mission {id}",
    },
    character: {
      liveFeed: "Live Feed",
      noteTitle: "REMINDER",
      noteBody: "Every great agent starts with a simple mission.",
    },
    footer: {
      system: "KP SYSTEMS 2.0",
      connection: "SECURE CONNECTION ESTABLISHED",
    },
  },
  pt: {
    boot: {
      lines: [
        "KP SYSTEMS BIOS v2.0",
        "COPYRIGHT (C) KP SYSTEMS INC. TODOS OS DIREITOS RESERVADOS.",
        "",
        "INICIALIZANDO NUCLEO.........................[OK]",
        "VERIFICANDO INTEGRIDADE DO SISTEMA...........[OK]",
        "CARREGANDO MODULOS CRIPTOGRAFADOS............[OK]",
        "CONECTANDO AO SATELITE KP-1..................[OK]",
        "TRIANGULANDO SINAL............................[OK]",
        "ESTABELECENDO CANAL SEGURO....................[OK]",
        "DESCRIPTOGRAFANDO BANCO DE DADOS..............[OK]",
        "",
        "> NIVEL DE AUTORIZACAO: DESCONHECIDO",
        "> AVISO: TENTATIVAS NAO AUTORIZADAS SERAO RASTREADAS.",
        "",
        "BEM-VINDA AO SISTEMA KP COMM.",
        "AGUARDANDO IDENTIFICACAO DO AGENTE...",
        "",
        "[ TOQUE EM QUALQUER LUGAR PARA CONTINUAR ]",
      ],
    },
    nameEntry: {
      missionBadge: "ACESSO AO SISTEMA",
      title: "IDENTIFICAÇÃO NECESSÁRIA",
      subtitle:
        "Digite suas credenciais de acesso pra continuar. Se preferir guardar isso pra você, tudo bem também.",
      usernameLabel: "USUÁRIO",
      usernamePlaceholder: "Digite o usuário...",
      passwordLabel: "SENHA",
      passwordPlaceholder: "Digite a senha...",
      loginButton: "ENTRAR",
      authenticating: "AUTENTICANDO...",
      accessDeniedTitle: "ACESSO NEGADO",
      accessDeniedBody: "Nenhum registro de '{username}' no sistema. Identidade não encontrada.",
      hint: "O Comando não tem seu arquivo registrado. Que tal tentar a opção abaixo?",
      anonymous: "PREFIRO NÃO INFORMAR",
    },
    header: {
      appName: "COMM",
      appSubtitle: "Agent Communicator",
      status: "STATUS:",
      statusValue: "ONLINE",
    },
    welcome: {
      welcomeLine: "WELCOME,",
      agentPrefix: "AGENT",
      unknownName: "????",
      revealedDesc: "Identidade confirmada. Bem-vinda de volta ao sistema.",
      anonymousDesc: "Você escolheu manter sua identidade em sigilo. Tudo bem, agente misteriosa.",
      mysteryDesc:
        "Sua identidade ainda é um mistério. Complete seu perfil para desbloquear todo o sistema.",
      missionButton: "INICIAR PRIMEIRA MISSÃO",
    },
    briefing: {
      eyebrow: "TRANSMISSÃO RECEBIDA",
      connecting: "CONECTANDO...",
      objectiveLabel: "OBJETIVO",
      acceptButton: "ACEITAR MISSÃO",
      introRevealed: [
        "...sinal travado...",
        "Agente {name}, ótimo — identificação confirmada.",
        "O Comando já está com seu arquivo aberto.",
      ],
      introAnonymous: [
        "...sinal travado...",
        "Nenhum nome no arquivo. Escolha interessante, agente.",
        "O Comando respeita o silêncio. Por enquanto.",
        "Vamos te chamar de 'Agente Desconhecida' até você decidir o contrário.",
      ],
    },
    mission: {
      questionLabel: "PERGUNTA",
      ofLabel: "DE",
      submitButton: "CONFIRMAR RESPOSTA",
      nextButton: "PRÓXIMA",
      finishButton: "FINALIZAR MISSÃO",
      completeTitle: "MISSÃO CONCLUÍDA",
      completeBody: "Dados registrados. O Comando já está calibrando seu perfil.",
      backButton: "VOLTAR PARA A BASE",
    },
    profile: {
      title: "PERFIL DA AGENTE",
      codenameLabel: "Codinome:",
      unknown: "DESCONHECIDO",
      levelLabel: "Nível:",
      levelValue: "INICIANTE",
      missionsLabel: "Missões concluídas:",
    },
    menu: {
      missions: { title: "MISSÕES", activeSuffix: "MISSÕES ATIVAS" },
      dossier: { title: "DOSSIÊ", status: "PERFIL INCOMPLETO" },
      files: { title: "ARQUIVOS", status: "0 ARQUIVOS" },
      achievements: { title: "CONQUISTAS", status: "0/20 CONQUISTAS" },
      comms: { title: "COMUNICADOS", status: "0 NOVAS MENSAGENS" },
      lockedLabel: "BLOQUEADO",
      lockedHint: "Libera após a Missão {id}",
    },
    character: {
      liveFeed: "Live Feed",
      noteTitle: "LEMBRETE",
      noteBody: "Toda grande agente começa com uma missão simples.",
    },
    footer: {
      system: "KP SYSTEMS 2.0",
      connection: "CONEXÃO SEGURA ESTABELECIDA",
    },
  },
};

export type Language = keyof typeof translations;
