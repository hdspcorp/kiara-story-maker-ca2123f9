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
    subtitle:
      "Uma trilha guiada, objetiva e profissional para configurar o Alpha, emitir documentos fiscais e operar os principais processos com segurança.",
    heroBadge: "Trilha oficial Keevo • Alpha Core",
    ctaFirst: "Iniciar capacitação",
    ctaContinue: "Continuar capacitação",
    ctaReview: "Revisar capacitação",
  },
  prerequisitesTitle: "Antes de começar no Alpha",
  prerequisitesLead:
    "Esta etapa é obrigatória para uma implantação segura. Confirme os requisitos fiscais, cadastrais e tributários antes de avançar para os vídeos.",
  prerequisites: [
    {
      id: "p1",
      title: "🔐 Certificado Digital A1 — Obrigatório",
      body: "O Alpha utiliza exclusivamente o Certificado Digital A1 para comunicação com os órgãos fiscais. Antes de continuar, confirme que: ✔ Você possui um Certificado Digital A1 válido. ✔ O certificado não está vencido. ✔ Você possui o arquivo do certificado (.PFX/.P12). ✔ Você conhece a senha do certificado.",
    },
    {
      id: "p2",
      title: "🏛 Credenciamento para emissão de notas — Obrigatório",
      body: "Sua empresa precisa estar autorizada pelos órgãos competentes para emitir documentos fiscais. Verifique se o credenciamento foi realizado para o tipo de documento que sua empresa emitirá. Exemplos: ✔ NF-e (Nota Fiscal Eletrônica). ✔ NFC-e (quando aplicável). ✔ NFS-e (Prefeitura). ✔ CT-e (quando aplicável). ✔ MDF-e (quando aplicável). O tipo de credenciamento varia conforme a atividade da empresa.",
    },
    {
      id: "p3",
      title: "🧾 Inscrição Estadual e/ou Municipal — Obrigatório quando aplicável",
      body: "Antes de emitir notas fiscais, confirme que sua empresa possui as inscrições exigidas para sua atividade. Verifique se: ✔ A Inscrição Estadual está ativa. ✔ A Inscrição Municipal está regular para prestadores de serviço.",
    },
    {
      id: "p4",
      title: "📄 CNPJ ativo — Obrigatório",
      body: "Confira se o CNPJ da empresa encontra-se: ✔ Ativo na Receita Federal. ✔ Sem impedimentos para emissão de documentos fiscais.",
    },
    {
      id: "p5",
      title: "🏢 Regime Tributário definido — Obrigatório",
      body: "Antes da implantação, a empresa já deve ter definido seu enquadramento tributário junto ao contador. Exemplos: ✔ Simples Nacional. ✔ Lucro Presumido. ✔ Lucro Real.",
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
      id: "aula1",
      order: 1,
      title: "Aula 1 • Primeiros passos e configuração fiscal",
      menus: [
        {
          id: "aula1-primeiros-passos",
          order: 1,
          title: "Primeiros passos no Keevo Center",
          videos: [
            {
              id: "v1",
              title: "Cadastro de Empresa / Vincular certificado",
              url: "https://youtu.be/7mjEntwePUE?si=fZpzK_oGAWu8FJiq",
              order: 1,
              required: true,
              duration: "",
              description:
                "Cadastro da empresa e vínculo inicial do certificado pelo Keevo Center.",
              objectives: [],
            },
            {
              id: "v5",
              title: "Cadastro de Usuário",
              url: "https://youtu.be/NNzr9jJT2_8?si=zrR3iBDSAsE7B02Z",
              order: 2,
              required: true,
              duration: "",
              description: "Criação de usuários para acesso ao ambiente.",
              objectives: [],
            },
            {
              id: "v2",
              title: "Permissão de Usuário",
              url: "https://youtu.be/ZjfJKJ8Q76o?si=PlpHthC_eT4mQE6H",
              order: 3,
              required: true,
              duration: "",
              description: "Configuração das permissões de acesso ao sistema.",
              objectives: [],
            },
            {
              id: "v4",
              title: "Gestão de Licenças",
              url: "https://youtu.be/aDuMbVus-fU?si=M5wpTeFaOCLvKkEJ",
              order: 4,
              required: true,
              duration: "",
              description: "Orientações sobre licenciamento no Alpha.",
              objectives: [],
            },
            {
              id: "v3",
              title: "Vincular Certificado",
              url: "https://youtu.be/kChNLX5K_pM?si=FwyfKyo5Gz-F2gmv",
              order: 5,
              required: true,
              duration: "",
              description:
                "Complementar para quando o certificado não for vinculado no cadastro da empresa.",
              objectives: [],
            },
          ],
        },
        {
          id: "aula1-configurando-emissao",
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
                "Cadastro das séries responsáveis pela sequência de numeração de cada documento.",
              objectives: [],
            },
            {
              id: "v11",
              title: "Configuração NF-e / NFS-e",
              url: "https://youtu.be/OrAQnSHJDZc?si=OigcwrJ2s49cNoCs",
              order: 2,
              required: true,
              duration: "",
              description: "Parâmetros de emissão para notas modelo 55 e NFS-e.",
              objectives: [],
            },
          ],
        },
      ],
    },
    {
      id: "aula2",
      order: 2,
      title: "Aula 2 • Cadastros básicos para emissão de notas fiscais",
      menus: [
        {
          id: "aula2-cadastros-basicos",
          order: 1,
          title: "Cadastros básicos para emissão",
          videos: [
            {
              id: "v17",
              title: "Cadastro de Clientes e Fornecedores",
              url: "https://youtu.be/OJkDAx3XtTo?si=BOP2NKs9ewK8026U",
              order: 1,
              required: true,
              duration: "",
              description: "Cadastro de clientes, fornecedores e transportadores.",
              objectives: [],
            },
            {
              id: "v15",
              title: "Cadastro de Mercadoria",
              url: "https://youtu.be/lcf-KxxqjVY?si=1hc9eeBIghBQyTug",
              order: 2,
              required: true,
              duration: "",
              description: "Cadastro de produtos e mercadorias.",
              objectives: [],
            },
            {
              id: "v13",
              title: "Cadastro de Serviços",
              url: "https://youtu.be/EUxQrevbU_A?si=eukbms6VP_dD3831",
              order: 3,
              required: true,
              duration: "",
              description: "Cadastro de serviços para emissão de NFS-e.",
              objectives: [],
            },
            {
              id: "v12",
              title: "Cadastro de Meios de Pagamento",
              url: "https://youtu.be/lvrQorxf6VY?si=6Ba6FQRLK8p7uea_",
              order: 4,
              required: true,
              duration: "",
              description: "Configuração dos meios de pagamento utilizados nas operações.",
              objectives: [],
            },
          ],
        },
      ],
    },
    {
      id: "aula3",
      order: 3,
      title: "Aula 3 • Emissão de notas e documentos complementares",
      menus: [
        {
          id: "aula3-emissao",
          order: 1,
          title: "Como emitir notas fiscais",
          videos: [
            {
              id: "v10",
              title: "Emissão de NF-e — Lançamento de Saída",
              url: "https://youtu.be/eGRS9jiuGGA?si=_HlZ_sK0gbjYyb53",
              order: 1,
              required: true,
              duration: "",
              description: "Emissão de NF-e pelo lançamento de saída.",
              objectives: [],
            },
            {
              id: "v7",
              title: "Emissão de NFS-e — Nota de Serviços",
              url: "https://youtu.be/asAEFY1CaX8?si=CqZtRxt818F2eh-U",
              order: 2,
              required: true,
              duration: "",
              description: "Emissão de nota fiscal de serviços.",
              objectives: [],
            },
          ],
        },
        {
          id: "aula3-complementares",
          order: 2,
          title: "Documentos fiscais complementares",
          videos: [
            {
              id: "placeholder-cancelamento",
              title: "Cancelamento, Carta de Correção Eletrônica e Inutilização de Numeração",
              url: "",
              order: 1,
              required: true,
              duration: "A produzir",
              description: "Material previsto para documentos fiscais complementares.",
              objectives: [],
            },
            {
              id: "placeholder-complementar",
              title: "Nota Fiscal Complementar",
              url: "",
              order: 2,
              required: true,
              duration: "A produzir",
              description: "Material previsto.",
              objectives: [],
            },
            {
              id: "placeholder-ajuste",
              title: "Nota Fiscal de Ajuste",
              url: "",
              order: 3,
              required: true,
              duration: "A produzir",
              description: "Aguardando liberação devido a nota de débito e crédito.",
              objectives: [],
            },
            {
              id: "placeholder-devolucao",
              title: "Nota Fiscal de Devolução",
              url: "",
              order: 4,
              required: true,
              duration: "A produzir",
              description: "Compra e venda.",
              objectives: [],
            },
            {
              id: "placeholder-entrada",
              title: "Lançamento de Entrada",
              url: "",
              order: 5,
              required: true,
              duration: "A produzir",
              description: "Falta fazer o material/Guideflow.",
              objectives: [],
            },
          ],
        },
      ],
    },
    {
      id: "aula4",
      order: 4,
      title: "Aula 4 • Configuração e faturamento financeiro",
      menus: [
        {
          id: "aula4-financeiro",
          order: 1,
          title: "Configuração e faturamento financeiro",
          videos: [
            {
              id: "v6",
              title: "Plano de Contas Gerencial",
              url: "https://youtu.be/lyX2iWgCNf4?si=xLM6wW6OA_mbYA5Z",
              order: 1,
              required: true,
              duration: "",
              description: "Organização do plano gerencial.",
              objectives: [],
            },
            {
              id: "v16",
              title: "Cadastro de Contas",
              url: "https://youtu.be/dIQrcZaL--o?si=e60LM-uyr_KXUP7B",
              order: 2,
              required: true,
              duration: "",
              description: "Cadastro de contas bancárias.",
              objectives: [],
            },
            {
              id: "v8",
              title: "Movimentos Financeiro e Bancário",
              url: "https://youtu.be/m97EEDKcibY?si=Iwjq1pY6Z7WAuJIE",
              order: 3,
              required: true,
              duration: "",
              description: "Movimento bancário, baixa parcial e baixa total.",
              objectives: [],
            },
          ],
        },
        {
          id: "aula4-complementares-financeiros",
          order: 2,
          title: "Documentos financeiros complementares",
          videos: [
            {
              id: "v9",
              title: "Lançamento Recorrente",
              url: "https://youtu.be/SqJS5jCmLUE?si=QimcHWYZYn2wYIH3",
              order: 1,
              required: true,
              duration: "",
              description: "Configuração de lançamentos recorrentes.",
              objectives: [],
            },
            {
              id: "placeholder-rateio",
              title: "Regras de Rateio",
              url: "",
              order: 2,
              required: true,
              duration: "A produzir",
              description: "Material previsto.",
              objectives: [],
            },
            {
              id: "placeholder-extrato",
              title: "Importação de Extrato Bancário",
              url: "",
              order: 3,
              required: true,
              duration: "A produzir",
              description: "Material previsto.",
              objectives: [],
            },
            {
              id: "placeholder-renegociacao",
              title: "Renegociação",
              url: "",
              order: 4,
              required: true,
              duration: "A produzir",
              description: "Material previsto.",
              objectives: [],
            },
          ],
        },
      ],
    },
    {
      id: "aula5",
      order: 5,
      title: "Aula 5 • Add-ons: contratos",
      menus: [
        {
          id: "aula5-contratos",
          order: 1,
          title: "Configuração e faturamento de contratos",
          videos: [
            {
              id: "placeholder-contratos",
              title: "Cadastro de Contratos",
              url: "",
              order: 1,
              required: false,
              duration: "A produzir",
              description: "Conteúdo para clientes que contratarem add-ons.",
              objectives: [],
            },
            {
              id: "placeholder-faturamento-contratos",
              title: "Confirmação e Faturamento de Contratos",
              url: "",
              order: 2,
              required: false,
              duration: "A produzir",
              description: "Conteúdo para clientes que contratarem add-ons.",
              objectives: [],
            },
            {
              id: "placeholder-venda-avulsa",
              title: "Venda avulsa",
              url: "",
              order: 3,
              required: false,
              duration: "A produzir",
              description: "Conteúdo para clientes que contratarem add-ons.",
              objectives: [],
            },
            {
              id: "placeholder-config-contratos",
              title: "Configuração de Contratos (Reajuste / Renovação / 13º de Honorários)",
              url: "",
              order: 4,
              required: false,
              duration: "A produzir",
              description: "Conteúdo para clientes que contratarem add-ons.",
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
