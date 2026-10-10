import type { Deliverable, FontPairId, Proposal, Testimonial, ThemeId } from "./proposal";

export type TemplateKey = "agencia" | "consultoria" | "juridico" | "saude" | "tech" | "infoproduto";

export type TemplateIconKey = "TrendingUp" | "Target" | "Scale" | "Stethoscope" | "Code2" | "Rocket";

type TemplateFields = Pick<
  Proposal,
  | "offer" | "validityDays"
  | "coverEyebrow" | "coverHeadline" | "coverSubtitle"
  | "diagnosisText" | "monthlyPainCost"
  | "methodName" | "methodIntro"
  | "bioText" | "bioCredentials" | "metricsLine"
  | "payMode" | "cardInstallment" | "cardCount" | "pixValue" | "pixDiscount"
  | "boletoInstallment" | "boletoCount"
  | "guaranteeEnabled" | "guaranteeText" | "urgencyReason" | "fullPriceText"
  | "closingMessage" | "ctaText"
>;

export interface Template {
  key: TemplateKey;
  label: string;
  iconKey: TemplateIconKey;
  description: string;
  theme: ThemeId;
  fontPair: FontPairId;
  accent: string;
  consultantRole: string;
  data: TemplateFields & {
    methodSteps: string[];
    milestones: string[];
    deliverables: Omit<Deliverable, "id">[];
    testimonials: Omit<Testimonial, "id">[];
  };
}

const CLOSING =
  "Essa proposta foi desenhada sob medida para o seu negócio. O próximo passo é um só: confirmar de acordo abaixo.";

export const TEMPLATES: Template[] = [
  /* ------------------------------------------------------------ */
  {
    key: "agencia",
    label: "Agência de Marketing",
    iconKey: "TrendingUp",
    description: "Tráfego, conteúdo e performance",
    theme: "dark-gold",
    fontPair: "modern",
    accent: "#d9a94a",
    consultantRole: "Head de Estratégia",
    data: {
      offer: "Gestão de Marketing e Performance · 6 meses",
      validityDays: 7,
      coverEyebrow: "Proposta Comercial · Marketing de Performance",
      coverHeadline: "O caminho para dobrar suas vendas online em 90 dias, sem depender de indicação.",
      coverSubtitle:
        "Estratégia, mídia paga e conversão trabalhando juntas em um único sistema previsível de aquisição de clientes.",
      diagnosisText:
        "Hoje sua empresa depende de indicações e de posts esporádicos para vender. Esse cenário custa em média R$ 18.000 por mês em oportunidades que vão direto para a concorrência. Em 12 meses, isso representa R$ 216.000 deixados na mesa.",
      monthlyPainCost: 18000,
      methodName: "Método Aquisição 360",
      methodIntro:
        "A maioria das empresas tenta impulsionar posts e esperar resultado — e falha porque tráfego sem funil e sem dados vira custo, não investimento. O Método Aquisição 360 é diferente: integra oferta, criativos, mídia paga e CRM em um único ciclo, medido por receita e não por curtidas.",
      methodSteps: ["Diagnóstico e posicionamento", "Funil e oferta", "Mídia e criativos", "Otimização semanal"],
      milestones: ["Semana 1 · Diagnóstico", "Semana 3 · Campanhas no ar", "Dia 45 · Otimização", "Dia 90 · Escala"],
      deliverables: [
        { title: "Auditoria completa de marketing e funil", desc: "Mapeamos cada vazamento entre o anúncio e a venda.", value: 4500 },
        { title: "Estratégia de oferta e posicionamento", desc: "Uma promessa clara que diferencia você da concorrência.", value: 6000 },
        { title: "Gestão de tráfego pago (Meta + Google)", desc: "Campanhas criadas, monitoradas e otimizadas toda semana.", value: 18000 },
        { title: "Produção de criativos mensais", desc: "12 peças por mês entre vídeos, carrosséis e anúncios.", value: 12000 },
        { title: "Dashboard de resultados em tempo real", desc: "Você acompanha custo por lead e receita sem pedir relatório.", value: 3500 },
        { title: "Workshop de vendas para o time comercial", desc: "Treinamento para converter os leads que chegam.", value: 2500, bonus: true },
      ],
      bioText:
        "Mais de 10 anos liderando operações de crescimento para empresas de serviços, e-commerce e educação, sempre com foco em receita previsível.",
      bioCredentials: "Google Partner · Meta Business Partner · +120 projetos entregues",
      metricsLine: "R$ 38 milhões em vendas geradas para clientes nos últimos 24 meses",
      testimonials: [
        { name: "Mariana Costa", company: "Clínica Aurora", result: "3x em 90 dias", text: "Em três meses triplicamos os agendamentos vindos do digital. Pela primeira vez sei exatamente quanto cada real investido retorna." },
        { name: "Rafael Lima", company: "Lima Store", result: "ROAS de 6,2", text: "O time entendeu o nosso negócio e deixou de falar de métricas de vaidade. Hoje o marketing é a nossa principal fonte de receita." },
      ],
      payMode: "cartao",
      cardInstallment: 1497,
      cardCount: 12,
      pixValue: 16500,
      pixDiscount: 8,
      boletoInstallment: 2990,
      boletoCount: 6,
      guaranteeEnabled: true,
      guaranteeText:
        "Se em 60 dias você não enxergar evolução mensurável nos indicadores combinados, trabalhamos sem custo adicional até atingir.",
      urgencyReason: "Trabalhamos com no máximo 6 clientes ativos por trimestre para garantir atenção total ao seu projeto.",
      fullPriceText: "",
      closingMessage: CLOSING,
      ctaText: "Quero começar agora",
    },
  },

  /* ------------------------------------------------------------ */
  {
    key: "consultoria",
    label: "Consultoria",
    iconKey: "Target",
    description: "Estratégia e gestão para empresas",
    theme: "light-editorial",
    fontPair: "editorial",
    accent: "#a37918",
    consultantRole: "Sócio-consultor",
    data: {
      offer: "Consultoria de Gestão e Crescimento · 4 meses",
      validityDays: 10,
      coverEyebrow: "Proposta Comercial · Consultoria Estratégica",
      coverHeadline: "O caminho para uma operação lucrativa e previsível em 120 dias, sem depender do dono para tudo.",
      coverSubtitle:
        "Um plano de gestão sob medida, implantado ao seu lado, para transformar rotina apagando incêndios em crescimento com método.",
      diagnosisText:
        "Hoje as decisões da sua empresa passam pelo dono, os processos vivem na cabeça das pessoas e as metas mudam a cada mês. Esse cenário custa em média R$ 25.000 por mês em retrabalho, margem perdida e oportunidades adiadas. Em 12 meses, isso representa R$ 300.000.",
      monthlyPainCost: 25000,
      methodName: "Método Gestão Previsível",
      methodIntro:
        "A maioria dos gestores tenta contratar mais gente ou comprar uma nova ferramenta — e falha porque o problema é de processo e de rotina, não de pessoas. O Método Gestão Previsível é diferente: define indicadores, responsabilidades e cadência de decisão antes de qualquer investimento.",
      methodSteps: ["Raio-X da operação", "Metas e indicadores", "Processos e papéis", "Rotina de gestão"],
      milestones: ["Mês 1 · Diagnóstico", "Mês 2 · Processos", "Mês 3 · Implantação", "Mês 4 · Autonomia"],
      deliverables: [
        { title: "Diagnóstico completo da operação", desc: "Entrevistas, dados e análise de gargalos em todas as áreas.", value: 8000 },
        { title: "Plano estratégico de 12 meses", desc: "Metas, prioridades e orçamento em um único documento.", value: 12000 },
        { title: "Mapeamento e redesenho de processos", desc: "Os 5 processos que mais travam o crescimento, documentados.", value: 15000 },
        { title: "Acompanhamento quinzenal com o time", desc: "Reuniões de gestão conduzidas por nós até a rotina andar sozinha.", value: 14000 },
        { title: "Painel de indicadores (BI)", desc: "Números do negócio atualizados e acessíveis todo dia.", value: 5000 },
        { title: "Mentoria individual para o dono", desc: "4 sessões de 90 minutos sobre liderança e delegação.", value: 6000, bonus: true },
      ],
      bioText:
        "Consultor com 15 anos de experiência em gestão, ex-diretor de operações em empresas de médio porte, hoje apoiando donos de negócio a crescer com método.",
      bioCredentials: "MBA em Gestão Empresarial · Certificação PMP · +80 empresas atendidas",
      metricsLine: "Margem média +14 pontos percentuais nas empresas atendidas em 12 meses",
      testimonials: [
        { name: "Carlos Mendes", company: "Mendes Logística", result: "+22% de margem", text: "Saí do operacional e finalmente tenho tempo para pensar no negócio. O time agora sabe o que fazer e cobra resultado entre si." },
        { name: "Helena Prado", company: "Prado Alimentos", result: "Meta batida 5 meses seguidos", text: "A consultoria trouxe clareza. Hoje temos indicadores, rotina e previsibilidade — algo que eu achava impossível." },
      ],
      payMode: "cartao",
      cardInstallment: 2490,
      cardCount: 10,
      pixValue: 23000,
      pixDiscount: 6,
      boletoInstallment: 5900,
      boletoCount: 4,
      guaranteeEnabled: true,
      guaranteeText:
        "Se após o primeiro mês você sentir que o trabalho não está gerando clareza, devolvemos 100% do valor investido, sem burocracia.",
      urgencyReason: "Atendemos no máximo 4 empresas por semestre para manter o acompanhamento próximo e individual.",
      fullPriceText: "",
      closingMessage: CLOSING,
      ctaText: "Quero iniciar a consultoria",
    },
  },

  /* ------------------------------------------------------------ */
  {
    key: "juridico",
    label: "Serviços Jurídicos",
    iconKey: "Scale",
    description: "Advocacia e consultoria jurídica",
    theme: "dark-indigo",
    fontPair: "classic",
    accent: "#7075f0",
    consultantRole: "Advogado(a) sócio(a)",
    data: {
      offer: "Assessoria Jurídica Preventiva e Contratual · 12 meses",
      validityDays: 15,
      coverEyebrow: "Proposta de Honorários · Assessoria Jurídica",
      coverHeadline: "O caminho para uma empresa juridicamente blindada em 60 dias, sem surpresas em processos.",
      coverSubtitle:
        "Contratos sólidos, riscos mapeados e um escritório disponível sempre que a decisão precisa ser tomada com segurança.",
      diagnosisText:
        "Hoje seus contratos foram montados com modelos genéricos e ninguém revisa os riscos trabalhistas e tributários da operação. Esse cenário custa em média R$ 12.000 por mês em passivos, multas e acordos evitáveis. Em 12 meses, isso representa R$ 144.000.",
      monthlyPainCost: 12000,
      methodName: "Método Blindagem Preventiva",
      methodIntro:
        "A maioria das empresas só procura um advogado quando o problema já chegou — e falha porque litígio custa muito mais do que prevenção. O Método Blindagem Preventiva é diferente: revisa riscos, padroniza contratos e acompanha decisões antes que virem processo.",
      methodSteps: ["Mapa de riscos", "Contratos sob medida", "Compliance essencial", "Suporte contínuo"],
      milestones: ["Dia 7 · Mapa de riscos", "Dia 30 · Contratos prontos", "Dia 60 · Compliance", "Mês 12 · Revisão anual"],
      deliverables: [
        { title: "Auditoria jurídica da empresa", desc: "Análise completa de riscos contratuais, trabalhistas e tributários.", value: 7500 },
        { title: "Contratos padronizados sob medida", desc: "Prestação de serviços, clientes, fornecedores e sócios revisados.", value: 9000 },
        { title: "Assessoria jurídica contínua", desc: "Atendimento por escrito e reunião mensal para suas dúvidas.", value: 21600 },
        { title: "Política de privacidade e adequação à LGPD", desc: "Documentos e orientação para proteger os dados dos seus clientes.", value: 6000 },
        { title: "Revisão de contratos novos, sem limite", desc: "Cada novo acordo analisado em até 48 horas úteis.", value: 8400 },
        { title: "Treinamento jurídico para a liderança", desc: "Workshop de 2 horas sobre riscos do dia a dia.", value: 2500, bonus: true },
      ],
      bioText:
        "Advogado(a) com mais de 12 anos de atuação em direito empresarial, focado em prevenção e redução de passivos para empresas em crescimento.",
      bioCredentials: "OAB ativa · Especialização em Direito Empresarial · Pós-graduação em LGPD",
      metricsLine: "Mais de 200 contratos estruturados e 92% dos casos resolvidos sem litígio",
      testimonials: [
        { name: "Paulo Andrade", company: "Andrade Engenharia", result: "Zero ações em 2 anos", text: "Desde que padronizamos os contratos, não tivemos mais nenhuma disputa com clientes. A tranquilidade não tem preço." },
      ],
      payMode: "pix",
      cardInstallment: 1190,
      cardCount: 12,
      pixValue: 13800,
      pixDiscount: 10,
      boletoInstallment: 1250,
      boletoCount: 12,
      guaranteeEnabled: false,
      guaranteeText: "Reunião de alinhamento sem custo no primeiro mês para ajustar o escopo à sua realidade.",
      urgencyReason: "Mantemos um número limitado de clientes em assessoria contínua para garantir resposta em até 48 horas.",
      fullPriceText: "",
      closingMessage: CLOSING,
      ctaText: "Contratar assessoria",
    },
  },

  /* ------------------------------------------------------------ */
  {
    key: "saude",
    label: "Saúde e Clínicas",
    iconKey: "Stethoscope",
    description: "Tratamentos, planos e programas",
    theme: "light-editorial",
    fontPair: "modern",
    accent: "#a37918",
    consultantRole: "Diretor(a) clínico(a)",
    data: {
      offer: "Programa de Acompanhamento Integral · 6 meses",
      validityDays: 7,
      coverEyebrow: "Proposta de Tratamento · Programa Integral",
      coverHeadline: "O caminho para recuperar sua saúde e disposição em 6 meses, sem dietas malucas ou improviso.",
      coverSubtitle:
        "Uma equipe multidisciplinar cuidando de você com plano individual, exames de acompanhamento e suporte próximo.",
      diagnosisText:
        "Hoje você convive com cansaço, dores e consultas isoladas que nunca resolvem a causa. Esse cenário custa em média R$ 3.500 por mês em consultas repetidas, medicamentos e dias de produtividade perdidos. Em 12 meses, isso representa R$ 42.000.",
      monthlyPainCost: 3500,
      methodName: "Programa Saúde Integrada",
      methodIntro:
        "A maioria das pessoas tenta tratar sintoma por sintoma com especialistas que não conversam entre si — e falha porque o corpo funciona como um todo. O Programa Saúde Integrada é diferente: reúne médico, nutrição e acompanhamento em um único plano.",
      methodSteps: ["Avaliação completa", "Plano individual", "Acompanhamento mensal", "Manutenção"],
      milestones: ["Semana 1 · Avaliação", "Mês 1 · Início do plano", "Mês 3 · Reavaliação", "Mês 6 · Alta com plano"],
      deliverables: [
        { title: "Avaliação clínica completa", desc: "Consulta de 90 minutos com histórico detalhado.", value: 1200 },
        { title: "Bateria de exames laboratoriais", desc: "Painel completo na entrada e na reavaliação.", value: 1800 },
        { title: "Plano alimentar individualizado", desc: "Elaborado por nutricionista e ajustado todo mês.", value: 2400 },
        { title: "Consultas mensais de acompanhamento", desc: "Seis encontros para ajustar o tratamento ao seu ritmo.", value: 3600 },
        { title: "Canal direto com a equipe", desc: "Tire dúvidas por mensagem em horário comercial.", value: 1500 },
        { title: "Sessão de bem-estar e rotina de sono", desc: "Orientação prática para dormir e viver melhor.", value: 600, bonus: true },
      ],
      bioText:
        "Médico(a) com mais de 15 anos de prática clínica, dedicado(a) a tratamentos que cuidam da causa e não apenas do sintoma.",
      bioCredentials: "CRM ativo · Residência médica · Pós-graduação em Medicina do Estilo de Vida",
      metricsLine: "Mais de 1.800 pacientes acompanhados com 94% de satisfação",
      testimonials: [
        { name: "Juliana Ferraz", company: "Paciente do programa", result: "-12 kg em 5 meses", text: "Pela primeira vez senti que alguém olhou para mim por inteiro. Hoje acordo com disposição e meus exames estão ótimos." },
        { name: "Roberto Alves", company: "Paciente do programa", result: "Pressão controlada", text: "O acompanhamento mensal fez toda a diferença. Reduzi a medicação e voltei a praticar esporte." },
      ],
      payMode: "cartao",
      cardInstallment: 890,
      cardCount: 12,
      pixValue: 9900,
      pixDiscount: 8,
      boletoInstallment: 1790,
      boletoCount: 6,
      guaranteeEnabled: true,
      guaranteeText:
        "Se após a primeira reavaliação você sentir que o programa não é para você, devolvemos o valor das consultas ainda não realizadas.",
      urgencyReason: "Abrimos no máximo 15 novas vagas por mês para manter o tempo de consulta que cada paciente merece.",
      fullPriceText: "",
      closingMessage: CLOSING,
      ctaText: "Quero começar meu tratamento",
    },
  },

  /* ------------------------------------------------------------ */
  {
    key: "tech",
    label: "Tecnologia / Software",
    iconKey: "Code2",
    description: "Desenvolvimento sob medida",
    theme: "dark-indigo",
    fontPair: "tech",
    accent: "#7075f0",
    consultantRole: "CTO e sócio",
    data: {
      offer: "Desenvolvimento de Plataforma Web sob Medida · MVP em 10 semanas",
      validityDays: 10,
      coverEyebrow: "Proposta Técnica e Comercial · Software",
      coverHeadline: "O caminho para colocar seu produto no ar em 10 semanas, sem estourar prazo nem orçamento.",
      coverSubtitle:
        "Time sênior, entregas semanais e código que é seu desde o primeiro dia — do protótipo ao primeiro usuário pagante.",
      diagnosisText:
        "Hoje sua operação roda em planilhas e ferramentas que não conversam entre si. Esse cenário custa em média R$ 20.000 por mês em retrabalho manual, erros e vendas perdidas por falta de sistema. Em 12 meses, isso representa R$ 240.000.",
      monthlyPainCost: 20000,
      methodName: "Sprint Zero a Produção",
      methodIntro:
        "A maioria das empresas tenta contratar um desenvolvedor avulso ou uma fábrica de software barata — e falha porque falta produto, prazo e acompanhamento. O Sprint Zero a Produção é diferente: descobre o essencial, entrega em ciclos curtos e coloca você no controle.",
      methodSteps: ["Descoberta e escopo", "Design e protótipo", "Desenvolvimento em sprints", "Lançamento e suporte"],
      milestones: ["Semana 1 · Escopo fechado", "Semana 3 · Protótipo", "Semana 8 · Versão beta", "Semana 10 · Em produção"],
      deliverables: [
        { title: "Descoberta de produto e especificação", desc: "Workshop e documento com tudo o que será construído.", value: 9000 },
        { title: "Design de interface e protótipo navegável", desc: "Você valida as telas antes de escrever uma linha de código.", value: 14000 },
        { title: "Desenvolvimento do MVP (front e back)", desc: "Aplicação completa, testada e pronta para os primeiros usuários.", value: 52000 },
        { title: "Infraestrutura, deploy e monitoramento", desc: "Ambiente seguro, escalável e com alertas configurados.", value: 8000 },
        { title: "Treinamento e documentação", desc: "Sua equipe aprende a operar e evoluir o sistema.", value: 5000 },
        { title: "Suporte técnico prioritário por 60 dias", desc: "Correções e ajustes rápidos depois do lançamento.", value: 6000, bonus: true },
      ],
      bioText:
        "Engenheiro(a) de software com 14 anos de estrada, já liderou times de produto em startups e empresas de grande porte.",
      bioCredentials: "AWS Certified · Ex-líder técnico em fintech · +40 produtos lançados",
      metricsLine: "98% das entregas no prazo combinado nos últimos 3 anos",
      testimonials: [
        { name: "Tatiana Moura", company: "FinOne", result: "MVP em 9 semanas", text: "Entregaram um produto sólido, no prazo e com comunicação transparente. Captamos nossa rodada de investimento em cima dele." },
        { name: "Diego Santos", company: "LogiPlus", result: "-70% de retrabalho", text: "O sistema substituiu cinco planilhas e economizou horas do time todos os dias." },
      ],
      payMode: "boleto",
      cardInstallment: 7990,
      cardCount: 12,
      pixValue: 82000,
      pixDiscount: 7,
      boletoInstallment: 11500,
      boletoCount: 8,
      guaranteeEnabled: true,
      guaranteeText:
        "Entregas semanais com demonstração. Se alguma sprint não atingir o combinado, a próxima é por nossa conta.",
      urgencyReason: "Nosso time comporta no máximo 3 projetos simultâneos, e a próxima janela de início fecha em breve.",
      fullPriceText: "",
      closingMessage: CLOSING,
      ctaText: "Vamos construir juntos",
    },
  },

  /* ------------------------------------------------------------ */
  {
    key: "infoproduto",
    label: "Infoproduto / Curso",
    iconKey: "Rocket",
    description: "Cursos, mentorias e programas",
    theme: "dark-gold",
    fontPair: "serif-bold",
    accent: "#d9a94a",
    consultantRole: "Criador(a) e mentor(a)",
    data: {
      offer: "Mentoria Acelerada + Curso Completo · Turma 2026",
      validityDays: 5,
      coverEyebrow: "Convite Exclusivo · Programa de Transformação",
      coverHeadline: "O caminho para lançar seu primeiro produto digital em 60 dias, sem aparecer nem ter audiência grande.",
      coverSubtitle:
        "Passo a passo, aulas práticas e mentoria ao vivo para você sair do zero e fazer as primeiras vendas com segurança.",
      diagnosisText:
        "Hoje você tem conhecimento valioso, mas ele não vira renda — falta método, oferta e um caminho claro até a primeira venda. Esse cenário custa em média R$ 8.000 por mês em renda que você deixa de gerar. Em 12 meses, isso representa R$ 96.000.",
      monthlyPainCost: 8000,
      methodName: "Método Primeira Venda",
      methodIntro:
        "A maioria das pessoas tenta gravar o curso primeiro e só depois pensar em vender — e falha porque ninguém compra o que não validou. O Método Primeira Venda é diferente: valida a oferta, vende antes de produzir e só então constrói o conteúdo.",
      methodSteps: ["Escolha do nicho", "Oferta validada", "Página e lançamento", "Entrega e escala"],
      milestones: ["Semana 1 · Nicho definido", "Semana 3 · Oferta pronta", "Semana 5 · Lançamento", "Semana 8 · Primeiras vendas"],
      deliverables: [
        { title: "Curso completo em vídeo (42 aulas)", desc: "Do primeiro passo à primeira venda, com exercícios práticos.", value: 2997 },
        { title: "Mentoria em grupo ao vivo (8 encontros)", desc: "Tire dúvidas e receba feedback direto no seu projeto.", value: 3600 },
        { title: "Templates de oferta, página e e-mails", desc: "Modelos prontos para copiar, adaptar e publicar.", value: 1497 },
        { title: "Comunidade privada de alunos", desc: "Networking e apoio diário com quem está no mesmo caminho.", value: 997 },
        { title: "Revisão individual da sua oferta", desc: "Análise em vídeo da sua oferta e da sua página de vendas.", value: 1200 },
        { title: "Aulão bônus: Anúncios para iniciantes", desc: "Como colocar as primeiras campanhas no ar sem desperdiçar verba.", value: 697, bonus: true },
      ],
      bioText:
        "Criador(a) de produtos digitais há 8 anos, já ajudou centenas de especialistas a transformar conhecimento em negócio online.",
      bioCredentials: "+R$ 4 milhões em vendas · +2.500 alunos · Autor(a) do best-seller de marketing digital",
      metricsLine: "73% dos alunos fazem a primeira venda em até 60 dias",
      testimonials: [
        { name: "Camila Duarte", company: "Aluna · Turma 2025", result: "R$ 18 mil no 1º lançamento", text: "Eu achava que precisava de milhares de seguidores. O método me mostrou que só precisava de uma oferta clara." },
        { name: "Bruno Teixeira", company: "Aluno · Turma 2025", result: "Vendas em 38 dias", text: "Segui o passo a passo à risca e fiz minhas primeiras vendas antes mesmo de terminar de gravar o curso." },
      ],
      payMode: "cartao",
      cardInstallment: 197,
      cardCount: 12,
      pixValue: 2197,
      pixDiscount: 10,
      boletoInstallment: 397,
      boletoCount: 6,
      guaranteeEnabled: true,
      guaranteeText:
        "Garantia incondicional de 14 dias: se não gostar por qualquer motivo, devolvemos 100% do seu investimento.",
      urgencyReason: "As vagas da mentoria são limitadas a 40 alunos por turma, para que todos recebam atenção individual.",
      fullPriceText: "",
      closingMessage: CLOSING,
      ctaText: "Garantir minha vaga",
    },
  },
];
