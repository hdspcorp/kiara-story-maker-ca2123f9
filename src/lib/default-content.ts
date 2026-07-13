// Default content used to seed the DB on first admin publish/save.
// Reflects the 17 real videos classified across the 3 mandatory groups.

export type Video = {
  id: string;
  title: string;
  url: string;
  order: number;
  required: boolean;
  duration: string;
  description: string;
  objectives: string[];
};

export type Menu = {
  id: string;
  title: string;
  order: number;
  videos: Video[];
};

export type Group = {
  id: string;
  title: string;
  order: number;
  menus: Menu[];
};

export type PrereqItem = { id: string; title: string; body: string };
export type ComplementaryItem = {
  id: string;
  title: string;
  description: string;
  url: string;
  visible: boolean;
  order: number;
};

export type Content = {
  page: {
    title: string;
    subtitle: string;
    heroBadge: string;
    ctaFirst: string;
    ctaContinue: string;
    ctaReview: string;
  };
  prerequisitesTitle: string;
  prerequisitesLead: string;
  prerequisites: PrereqItem[];
  complementary: ComplementaryItem[];
  kiara: {
    title: string;
    intro: string;
    initialMessage: string;
    placeholder: string;
  };
  groups: Group[];
};

export const DEFAULT_CONTENT: Content = {
  page: {
    title: "Capacitação Alpha Core",
    subtitle: "Aprenda a configurar e usar o Alpha com segurança, passo a passo.",
    heroBadge: "Trilha oficial Keevo",
    ctaFirst: "Iniciar capacitação",
    ctaContinue: "Continuar capacitação",
    ctaReview: "Revisar capacitação",
  },
  prerequisitesTitle: "Antes de começar no Alpha",
  prerequisitesLead:
    "Checklist obrigatório para garantir uma implantação fiscal segura, sem bloqueios na emissão e com todas as informações validadas antes da capacitação.",
  prerequisites: [
    {
      id: "p1",
      title: "🔐 Certificado Digital A1",
      body: "Obrigatório\n\nO Alpha utiliza exclusivamente o Certificado Digital A1 para comunicação com os órgãos fiscais.\n\nAntes de continuar, confirme que:\n\n✔ Você possui um Certificado Digital A1 válido.\n✔ O certificado não está vencido.\n✔ Você possui o arquivo do certificado (.PFX/.P12).\n✔ Você conhece a senha do certificado.",
    },
    {
      id: "p2",
      title: "🏛 Credenciamento para emissão de notas",
      body: "Obrigatório\n\nSua empresa precisa estar autorizada pelos órgãos competentes para emitir documentos fiscais.\n\nVerifique se o credenciamento foi realizado para o tipo de documento que sua empresa emitirá.\n\nExemplos:\n\n✔ NF-e (Nota Fiscal Eletrônica)\n✔ NFC-e (quando aplicável)\n✔ NFS-e (Prefeitura)\n✔ CT-e (quando aplicável)\n✔ MDF-e (quando aplicável)\n\nO tipo de credenciamento varia conforme a atividade da empresa.",
    },
    {
      id: "p3",
      title: "🧾 Inscrição Estadual e/ou Municipal",
      body: "Obrigatório (quando aplicável)\n\nAntes de emitir notas fiscais, confirme que sua empresa possui as inscrições exigidas para sua atividade.\n\nVerifique se:\n\n✔ A Inscrição Estadual está ativa.\n✔ A Inscrição Municipal está regular (para prestadores de serviço).",
    },
    {
      id: "p4",
      title: "📄 CNPJ ativo",
      body: "Obrigatório\n\nConfira se o CNPJ da empresa encontra-se:\n\n✔ Ativo na Receita Federal.\n✔ Sem impedimentos para emissão de documentos fiscais.",
    },
    {
      id: "p5",
      title: "🏢 Regime Tributário definido",
      body: "Obrigatório\n\nAntes da implantação, a empresa já deve ter definido seu enquadramento tributário junto ao contador.\n\nExemplos:\n\n✔ Simples Nacional\n✔ Lucro Presumido\n✔ Lucro Real",
    },
  ],
  complementary: [],
  kiara: {
    title: "Fale com a Kiara!",
    intro:
      "Tire dúvidas sobre o uso do sistema e os conteúdos desta capacitação. A Kiara está disponível para ajudar em qualquer dúvida relacionada ao sistema.",
    initialMessage: "Me conta, como eu posso te ajudar?",
    placeholder: "Digite sua pergunta aqui...",
  },
  groups: [
    {
      id: "g1",
      order: 1,
      title: "ALPHA CORE · Aula 1",
      menus: [
        {
          id: "g1m1",
          order: 1,
          title: "Primeiros passos e Keevo Center",
          videos: [
            {
              id: "v1",
              title: "Cadastro de Empresa / Vincular certificado",
              url: "https://youtu.be/7mjEntwePUE?si=fZpzK_oGAWu8FJiq",
              order: 1,
              required: true,
              duration: "",
              description:
                "Primeiro contato para cadastro da empresa, certificado e contexto inicial do Keevo Center.",
              objectives: [
                "Cadastrar a empresa",
                "Vincular o certificado A1",
                "Conhecer o fluxo inicial de implantação",
              ],
            },
            {
              id: "v5",
              title: "Cadastro de Usuário",
              url: "https://youtu.be/NNzr9jJT2_8?si=zrR3iBDSAsE7B02Z",
              order: 2,
              required: true,
              duration: "",
              description: "Criação e preparação dos usuários que acessarão o ambiente.",
              objectives: [],
            },
            {
              id: "v2",
              title: "Permissão de Usuário",
              url: "https://youtu.be/ZjfJKJ8Q76o?si=PlpHthC_eT4mQE6H",
              order: 3,
              required: true,
              duration: "",
              description: "Configuração de permissões para acesso seguro ao sistema.",
              objectives: [],
            },
            {
              id: "v4",
              title: "Gestão de Licenças",
              url: "https://youtu.be/aDuMbVus-fU?si=M5wpTeFaOCLvKkEJ",
              order: 4,
              required: true,
              duration: "",
              description: "Acompanhamento do licenciamento da empresa no Alpha.",
              objectives: [],
            },
            {
              id: "v3",
              title: "Vincular Certificado (complementar)",
              url: "https://youtu.be/kChNLX5K_pM?si=FwyfKyo5Gz-F2gmv",
              order: 5,
              required: true,
              duration: "",
              description:
                "Material complementar para vincular o certificado fora do cadastro inicial da empresa.",
              objectives: [],
            },
          ],
        },
        {
          id: "g1m2",
          order: 2,
          title: "Configurando o Alpha para emitir notas fiscais",
          videos: [
            {
              id: "v14",
              title: "Cadastro de Série (NF-e e NFS-e)",
              url: "https://youtu.be/haBiUVCapeY?si=Eqz9PxkG9gu9BW_5",
              order: 1,
              required: true,
              duration: "",
              description:
                "Cadastro de séries para controle da sequência de numeração dos documentos fiscais.",
              objectives: [],
            },
            {
              id: "v11",
              title: "Configuração NF-e / NFS-e",
              url: "https://youtu.be/OrAQnSHJDZc?si=OigcwrJ2s49cNoCs",
              order: 2,
              required: true,
              duration: "",
              description: "Configurações de emissão para notas modelo 55 e notas de serviço.",
              objectives: [],
            },
          ],
        },
      ],
    },
    {
      id: "g2",
      order: 2,
      title: "ALPHA CORE · Aula 2",
      menus: [
        {
          id: "g2m1",
          order: 1,
          title: "Cadastros básicos para emissão de Notas Fiscais",
          videos: [
            {
              id: "v17",
              title: "Cadastro de Clientes, Fornecedores e Transportadores",
              url: "https://youtu.be/OJkDAx3XtTo?si=BOP2NKs9ewK8026U",
              order: 1,
              required: true,
              duration: "",
              description: "Cadastros essenciais para emissão e relacionamento comercial.",
              objectives: [],
            },
            {
              id: "v15",
              title: "Cadastro de Mercadoria",
              url: "https://youtu.be/lcf-KxxqjVY?si=1hc9eeBIghBQyTug",
              order: 2,
              required: true,
              duration: "",
              description: "Registro de produtos e mercadorias utilizados na emissão fiscal.",
              objectives: [],
            },
            {
              id: "v13",
              title: "Cadastro de Serviços",
              url: "https://youtu.be/EUxQrevbU_A?si=eukbms6VP_dD3831",
              order: 3,
              required: true,
              duration: "",
              description: "Cadastro dos serviços para emissão de NFS-e.",
              objectives: [],
            },
            {
              id: "v12",
              title: "Cadastro de Meios de Pagamento",
              url: "https://youtu.be/lvrQorxf6VY?si=6Ba6FQRLK8p7uea_",
              order: 4,
              required: true,
              duration: "",
              description: "Meios de pagamento usados no financeiro e documentos fiscais.",
              objectives: [],
            },
          ],
        },
      ],
    },
    {
      id: "g3",
      order: 3,
      title: "ALPHA CORE · Aula 3",
      menus: [
        {
          id: "g3m1",
          order: 1,
          title: "Como emitir Notas Fiscais",
          videos: [
            {
              id: "v10",
              title: "Emissão de NF-e - Lançamento de Saída",
              url: "https://youtu.be/eGRS9jiuGGA?si=_HlZ_sK0gbjYyb53",
              order: 1,
              required: true,
              duration: "",
              description: "Fluxo de emissão de nota fiscal de saída.",
              objectives: [],
            },
            {
              id: "v7",
              title: "Emissão de NFS-e - Nota de Serviços",
              url: "https://youtu.be/asAEFY1CaX8?si=CqZtRxt818F2eh-U",
              order: 2,
              required: true,
              duration: "",
              description: "Fluxo de emissão de nota fiscal de serviços.",
              objectives: [],
            },
          ],
        },
      ],
    },
    {
      id: "g4",
      order: 4,
      title: "ALPHA CORE · Aula 4",
      menus: [
        {
          id: "g4m1",
          order: 1,
          title: "Configuração e Faturamento Financeiro",
          videos: [
            {
              id: "v6",
              title: "Plano de Contas Gerencial",
              url: "https://youtu.be/lyX2iWgCNf4?si=xLM6wW6OA_mbYA5Z",
              order: 1,
              required: true,
              duration: "",
              description: "Estruturação do plano de contas gerencial.",
              objectives: [],
            },
            {
              id: "v16",
              title: "Cadastro de Contas",
              url: "https://youtu.be/dIQrcZaL--o?si=e60LM-uyr_KXUP7B",
              order: 2,
              required: true,
              duration: "",
              description: "Cadastro de contas para controle financeiro.",
              objectives: [],
            },
            {
              id: "v8",
              title: "Movimentos Financeiro e Bancário",
              url: "https://youtu.be/m97EEDKcibY?si=Iwjq1pY6Z7WAuJIE",
              order: 3,
              required: true,
              duration: "",
              description: "Movimento bancário, baixa parcial e total de lançamentos financeiros.",
              objectives: [],
            },
            {
              id: "v9",
              title: "Lançamento Recorrente",
              url: "https://youtu.be/SqJS5jCmLUE?si=QimcHWYZYn2wYIH3",
              order: 4,
              required: true,
              duration: "",
              description: "Configuração de recorrências financeiras complementares.",
              objectives: [],
            },
          ],
        },
      ],
    },
  ],
};

export function ytIdFromUrl(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1) || null;
    if (u.hostname.includes("youtube.com")) {
      const v = u.searchParams.get("v");
      if (v) return v;
      const parts = u.pathname.split("/").filter(Boolean);
      const i = parts.indexOf("embed");
      if (i >= 0 && parts[i + 1]) return parts[i + 1];
    }
  } catch {
    return null;
  }
  return null;
}

export function flattenVideos(c: Content) {
  const out: { video: Video; group: Group; menu: Menu }[] = [];
  for (const g of [...c.groups].sort((a, b) => a.order - b.order))
    for (const m of [...g.menus].sort((a, b) => a.order - b.order))
      for (const v of [...m.videos].sort((a, b) => a.order - b.order))
        out.push({ video: v, group: g, menu: m });
  return out;
}
