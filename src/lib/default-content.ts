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
    "Confirme estes pontos para aproveitar melhor a capacitação. Basta abrir cada item.",
  prerequisites: [
    {
      id: "p1",
      title: "Certificado Digital",
      body: "Verifique a validade, a instalação no computador e o acesso ao certificado que será utilizado na emissão de documentos fiscais.",
    },
    {
      id: "p2",
      title: "Credenciamento para emissão de notas",
      body: "Confirme se a empresa já está credenciada junto aos órgãos competentes para emitir NFe, NFSe e demais documentos fiscais.",
    },
    {
      id: "p3",
      title: "Cadastro inicial da empresa",
      body: "Tenha em mãos os dados cadastrais e fiscais indispensáveis da empresa (razão social, CNPJ, inscrições, regime tributário).",
    },
    {
      id: "p4",
      title: "Configurações fiscais essenciais",
      body: "Reúna as informações mínimas para configurar tributação, séries fiscais e ambiente de emissão antes do primeiro envio.",
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
      title: "Iniciando a Jornada no Alpha",
      menus: [
        {
          id: "g1m1",
          order: 1,
          title: "Primeiros passos",
          videos: [
            {
              id: "v1",
              title: "Cadastro e Licenciamento da Empresa - Alpha Core",
              url: "https://youtu.be/7mjEntwePUE?si=fZpzK_oGAWu8FJiq",
              order: 1,
              required: true,
              duration: "",
              description: "",
              objectives: [],
            },
            {
              id: "v4",
              title: "Cadastro e Licenciamento da Empresa no Alpha Emissor",
              url: "https://youtu.be/aDuMbVus-fU?si=M5wpTeFaOCLvKkEJ",
              order: 2,
              required: true,
              duration: "",
              description: "",
              objectives: [],
            },
          ],
        },
        {
          id: "g1m2",
          order: 2,
          title: "Certificado e Permissões",
          videos: [
            {
              id: "v3",
              title: "Cadastro do Certificado",
              url: "https://youtu.be/kChNLX5K_pM?si=FwyfKyo5Gz-F2gmv",
              order: 1,
              required: true,
              duration: "",
              description: "",
              objectives: [],
            },
            {
              id: "v2",
              title: "Permissões de Acesso ao Sistema",
              url: "https://youtu.be/ZjfJKJ8Q76o?si=PlpHthC_eT4mQE6H",
              order: 2,
              required: true,
              duration: "",
              description: "",
              objectives: [],
            },
            {
              id: "v5",
              title: "Cadastro de Usuários",
              url: "https://youtu.be/NNzr9jJT2_8?si=zrR3iBDSAsE7B02Z",
              order: 3,
              required: true,
              duration: "",
              description: "",
              objectives: [],
            },
          ],
        },
      ],
    },
    {
      id: "g2",
      order: 2,
      title: "Configurações Essenciais",
      menus: [
        {
          id: "g2m1",
          order: 1,
          title: "Configurações Fiscais",
          videos: [
            {
              id: "v11",
              title: "Configurações NFe e NFSe",
              url: "https://youtu.be/OrAQnSHJDZc?si=OigcwrJ2s49cNoCs",
              order: 1,
              required: true,
              duration: "",
              description: "",
              objectives: [],
            },
            {
              id: "v14",
              title: "Cadastro de Série da Nota Fiscal",
              url: "https://youtu.be/haBiUVCapeY?si=Eqz9PxkG9gu9BW_5",
              order: 2,
              required: true,
              duration: "",
              description: "",
              objectives: [],
            },
          ],
        },
        {
          id: "g2m2",
          order: 2,
          title: "Cadastros Base",
          videos: [
            {
              id: "v17",
              title: "Cadastro de Cliente, Fornecedor, e Transportador",
              url: "https://youtu.be/OJkDAx3XtTo?si=BOP2NKs9ewK8026U",
              order: 1,
              required: true,
              duration: "",
              description: "",
              objectives: [],
            },
            {
              id: "v15",
              title: "Cadastro de Produtos",
              url: "https://youtu.be/lcf-KxxqjVY?si=1hc9eeBIghBQyTug",
              order: 2,
              required: true,
              duration: "",
              description: "",
              objectives: [],
            },
            {
              id: "v13",
              title: "Cadastro de Serviços",
              url: "https://youtu.be/EUxQrevbU_A?si=eukbms6VP_dD3831",
              order: 3,
              required: true,
              duration: "",
              description: "",
              objectives: [],
            },
            {
              id: "v12",
              title: "Cadastro de Meio de Pagamento",
              url: "https://youtu.be/lvrQorxf6VY?si=6Ba6FQRLK8p7uea_",
              order: 4,
              required: true,
              duration: "",
              description: "",
              objectives: [],
            },
            {
              id: "v16",
              title: "Cadastro de Conta Bancária",
              url: "https://youtu.be/dIQrcZaL--o?si=e60LM-uyr_KXUP7B",
              order: 5,
              required: true,
              duration: "",
              description: "",
              objectives: [],
            },
          ],
        },
        {
          id: "g2m3",
          order: 3,
          title: "Plano Gerencial",
          videos: [
            {
              id: "v6",
              title: "Plano Gerencial",
              url: "https://youtu.be/lyX2iWgCNf4?si=xLM6wW6OA_mbYA5Z",
              order: 1,
              required: true,
              duration: "",
              description: "",
              objectives: [],
            },
          ],
        },
      ],
    },
    {
      id: "g3",
      order: 3,
      title: "Capacitação do Alpha Core",
      menus: [
        {
          id: "g3m1",
          order: 1,
          title: "Vendas e Notas",
          videos: [
            {
              id: "v7",
              title: "Nota Fiscal de Vendas",
              url: "https://youtu.be/asAEFY1CaX8?si=CqZtRxt818F2eh-U",
              order: 1,
              required: true,
              duration: "",
              description: "",
              objectives: [],
            },
          ],
        },
        {
          id: "g3m2",
          order: 2,
          title: "Financeiro",
          videos: [
            {
              id: "v8",
              title: "Movimento Bancário",
              url: "https://youtu.be/m97EEDKcibY?si=Iwjq1pY6Z7WAuJIE",
              order: 1,
              required: true,
              duration: "",
              description: "",
              objectives: [],
            },
            {
              id: "v10",
              title: "Lançamento de Saída",
              url: "https://youtu.be/eGRS9jiuGGA?si=_HlZ_sK0gbjYyb53",
              order: 2,
              required: true,
              duration: "",
              description: "",
              objectives: [],
            },
            {
              id: "v9",
              title: "Lançamento Recorrente",
              url: "https://youtu.be/SqJS5jCmLUE?si=QimcHWYZYn2wYIH3",
              order: 3,
              required: true,
              duration: "",
              description: "",
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