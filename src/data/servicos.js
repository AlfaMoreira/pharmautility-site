// Serviços da PharmaUtility — fonte única para a listagem e as páginas individuais.
// Conteúdo derivado do texto extraído do site atual (ver contexto-e-conteudo-novo-site-pharmautility.md).
// Textos marcados como "a validar" dependem de revisão técnica antes da publicação definitiva.

export const servicos = [
  {
    // Página dedicada: src/pages/servicos/qualificacao-sistemas-agua-pw-wfi.astro
    slug: 'qualificacao-sistemas-agua-pw-wfi',
    dedicada: true,
    numero: '01',
    nome: 'Qualificação de Sistemas de Água — PW e WFI',
    chamada: 'Sistemas de água purificada (PW), água para injetáveis (WFI) e vapor puro do projeto à análise de rotina: dimensionamento, instalação, qualificação, manutenção e análises.',
  },
  {
    // Página dedicada: src/pages/servicos/qualificacao-vapor-puro.astro
    slug: 'qualificacao-vapor-puro',
    dedicada: true,
    numero: '02',
    nome: 'Qualificação de Vapor Puro',
    chamada: 'Geração, distribuição e pontos de uso de vapor puro qualificados conforme os requisitos do projeto, com estudos IQ, OQ e PQ.',
  },
  {
    // Página dedicada: src/pages/servicos/qualificacao-hvac-salas-limpas.astro
    // (os campos abaixo seguem como resumo do serviço).
    slug: 'qualificacao-hvac-salas-limpas',
    dedicada: true,
    // Imagem de fundo fixa exibida somente nesta página (a página rola o texto sobre ela).
    fundo: { nome: '/assets/images/hvac-fundo', largura: 2752, altura: 1536 },
    numero: '03',
    nome: 'Qualificação de HVAC e Salas Limpas',
    chamada: 'Qualificação IQ, OQ e PQ de HVAC em salas limpas farmacêuticas, hospitalares e data centers, com classificação ISO 14644, integridade de filtros HEPA e mapeamento térmico.',
    necessidade: 'Manter as condições ambientais exigidas pelo processo: temperatura, umidade, pressão diferencial, fluxo de ar e controle de partículas.',
    escopo: [
      'Sistemas de climatização (AVAC/HVAC) de áreas farmacêuticas, hospitalares e industriais.',
      'Filtros, vazão, pressão e condições ambientais.',
      'Classificação de áreas, mapeamento e monitoramento ambiental.',
      'Ensaios de desempenho definidos em conjunto com o cliente.',
    ],
    etapas: [
      { tag: '01', titulo: 'Revisão de projeto', texto: 'Análise do projeto, dos fluxogramas e das especificações dos componentes.' },
      { tag: '02', titulo: 'Verificação da instalação', texto: 'Inspeção de campo e verificação documental.' },
      { tag: '03', titulo: 'Ensaios de desempenho', texto: 'Execução dos ensaios com instrumentação calibrada.' },
      { tag: '04', titulo: 'Classificação e monitoramento', texto: 'Mapeamento e acompanhamento das áreas.' },
      { tag: '05', titulo: 'Relatório final', texto: 'Consolidação dos resultados, análise de desvios e recomendações.' },
    ],
    entregaveis: [
      'Relatório de revisão de projeto',
      'Protocolos e relatórios de qualificação',
      'Resultados de classificação e de desempenho',
      'Registro dos instrumentos utilizados e de suas calibrações',
    ],
  },
  {
    // Página dedicada: src/pages/servicos/qualificacao-ar-comprimido-gases.astro
    // (os campos abaixo seguem como resumo do serviço).
    slug: 'qualificacao-ar-comprimido-gases',
    dedicada: true,
    // Imagem de fundo na primeira dobra (rola com o conteúdo).
    fundo: { nome: '/assets/images/ar-comprimido-fundo', largura: 2752, altura: 1536 },
    numero: '04',
    nome: 'Qualificação de Ar Comprimido e Gases',
    chamada: 'Qualificação de ar comprimido de processo, ar medicinal, ar respirável e cilindros de gases, com ensaios nos pontos de uso conforme ISO 8573, farmacopeias e EN 12021.',
    necessidade: 'Assegurar que o ar e os gases que entram em contato direto ou indireto com o produto atendam ao nível de qualidade exigido pelo processo.',
    escopo: [
      'Sistemas de geração, tratamento e distribuição de ar comprimido.',
      'Ensaios de partículas, umidade, óleo e microbiologia, conforme a série ISO 8573 e o escopo definido.',
      'Gases industriais e ar respirável.',
      'Ensaios nos pontos de uso, com instrumentação calibrada.',
    ],
    etapas: [
      { tag: 'IQ', titulo: 'Verificação do sistema', texto: 'Documentação, compressor, filtros, secador e materiais da rede de distribuição.' },
      { tag: 'OQ', titulo: 'Ensaios nos pontos de uso', texto: 'Ensaios analíticos com o sistema operando nas condições normais de processo.' },
      { tag: 'RT', titulo: 'Relatório técnico', texto: 'Resultados por ponto e por parâmetro, avaliação de conformidade e recomendações.' },
    ],
    entregaveis: [
      'Identificação dos pontos de uso ensaiados',
      'Resultados analíticos por ponto e por parâmetro',
      'Comparativo com os limites normativos e avaliação de conformidade',
      'Recomendações técnicas em caso de desvio',
      'Relatório assinado pelo responsável técnico',
    ],
  },
  {
    // Página dedicada: src/pages/servicos/qualificacao-cabines-fluxo-laminar-contencao.astro
    // (os entregáveis abaixo são usados pela página).
    slug: 'qualificacao-cabines-fluxo-laminar-contencao',
    dedicada: true,
    numero: '05',
    nome: 'Cabines, Fluxos e Equipamentos de Contenção',
    chamada: 'Qualificação, manutenção, descontaminação e troca de filtro HEPA de cabines de segurança biológica, fluxos laminares, cabines de pesagem e capelas de exaustão.',
    necessidade: 'Comprovar que o equipamento protege o operador, o produto e o ambiente, reduzindo riscos de contaminação cruzada e de exposição a agentes biológicos e químicos.',
    escopo: [
      'Cabines de segurança biológica (CSB).',
      'Câmaras de fluxo laminar, horizontais e verticais.',
      'Cabines de pesagem e contenção.',
      'Capelas de exaustão.',
    ],
    etapas: [
      { tag: 'IQ', titulo: 'Instalação', texto: 'Verificação da instalação, da documentação e das condições do local.' },
      { tag: 'OQ', titulo: 'Operação', texto: 'Velocidades de ar, filtros, alarmes e sistemas de sinalização.' },
      { tag: 'PQ', titulo: 'Desempenho', texto: 'Ensaios de contenção e de padrão de fluxo em condições de uso.' },
    ],
    entregaveis: [
      'Relatório técnico com os resultados de cada ensaio',
      'Laudo de conformidade',
      'Rastreabilidade dos equipamentos de medição utilizados',
      'Evidências documentadas para auditorias e inspeções',
    ],
  },
  {
    // Página dedicada: src/pages/servicos/calibracao-qualificacao-equipamentos.astro
    // (etapas, entregáveis e necessidade abaixo são usados pela página).
    slug: 'calibracao-qualificacao-equipamentos',
    dedicada: true,
    numero: '06',
    nome: 'Calibração e Qualificação de Equipamentos',
    chamada: 'Calibração rastreável e qualificação IQ/OQ/PQ de equipamentos de temperatura, pressão, rotação, físico-química e instrumentos analíticos.',
    necessidade: 'Ter medições confiáveis e documentação pronta para auditoria, com a menor interrupção possível da operação.',
    escopo: [
      'Temperatura e umidade: estufas, câmaras, freezers, autoclaves, termopares e Pt-100.',
      'Pressão: manômetros, vacuômetros, transdutores e transmissores.',
      'Velocidade e rotação: centrífugas, agitadores e tacômetros.',
      'Físico-química: pHmetros, condutivímetros, espectrofotômetros, Karl Fischer e outros instrumentos.',
      'Qualificação analítica de instrumentos de laboratório, como cromatografia, espectrometria e espectrofotometria.',
    ],
    etapas: [
      { tag: '01', titulo: 'Planejamento', texto: 'Definição dos instrumentos, faixas, pontos e critérios de aceitação com o cliente.' },
      { tag: '02', titulo: 'Verificação inicial (as found)', texto: 'Estado do equipamento como recebido.' },
      { tag: '03', titulo: 'Execução rastreável', texto: 'Medições com padrões calibrados, sob condições controladas.' },
      { tag: '04', titulo: 'Erro e incerteza', texto: 'Tratamento estatístico dos resultados, conforme o GUM.' },
      { tag: '05', titulo: 'Ajuste e verificação final (as left)', texto: 'Quando aplicável.' },
      { tag: '06', titulo: 'Certificado e laudo', texto: 'Resultados, incertezas e parecer de conformidade.' },
    ],
    entregaveis: [
      'Certificados de calibração com rastreabilidade ao Sistema Internacional de Unidades (SI)',
      'Cálculo de incerteza de medição',
      'Protocolos e relatórios de qualificação',
      'Laudo técnico com parecer de conformidade',
    ],
  },
  {
    // Página dedicada: src/pages/servicos/qualificacao-monitoramento-cadeia-fria.astro
    // (os entregáveis abaixo são usados pela página).
    slug: 'qualificacao-monitoramento-cadeia-fria',
    dedicada: true,
    numero: '07',
    nome: 'Qualificação e Monitoramento de Cadeia Fria',
    chamada: 'Mapeamento térmico, TAB e qualificação de HVAC, monitoramento contínuo, ensaios de ar ambiente (NBR 17037) e água para consumo humano em um único programa.',
    necessidade: 'Garantir que câmaras frias, salas climatizadas e áreas de expedição operem dentro da faixa definida pelo projeto, com o ambiente e a água de consumo documentados.',
    escopo: [
      'TAB de HVAC: balanceamento de vazão e de diferencial de pressão entre ambientes, verificação de renovações de ar e ajuste de dampers e difusores.',
      'Ensaios de ar ambiente conforme a ABNT NBR 17037: partículas, microbiologia do ar, CO₂, temperatura, umidade relativa e velocidade do ar.',
      'Água para consumo humano: plano de amostragem por ponto de coleta, análises físico-químicas e microbiológicas.',
    ],
    etapas: [
      { tag: '01', titulo: 'Diagnóstico e plano', texto: 'Levantamento dos ambientes, dos pontos de coleta e dos parâmetros de projeto.' },
      { tag: '02', titulo: 'Medições e ensaios', texto: 'Execução do TAB, dos ensaios de ar e da coleta de água.' },
      { tag: '03', titulo: 'Laudo técnico', texto: 'Parâmetros medidos comparados aos especificados, com plano de ação quando necessário.' },
    ],
    entregaveis: [
      'Relatório técnico com os parâmetros medidos versus os especificados',
      'Laudo interpretativo da qualidade do ar ambiente',
      'Laudos de água para apresentação à vigilância sanitária, quando aplicável',
      'Acompanhamento das não conformidades até a resolução',
    ],
  },
  {
    slug: 'validacao-gxp',
    numero: '08',
    nome: 'Portfólio GxP e Validação',
    chamada: 'Planos, protocolos e relatórios para sistemas, processos e equipamentos sujeitos aos requisitos GxP.',
    necessidade: 'Sustentar auditorias internas e externas com evidências documentadas, rastreáveis e coerentes com o risco do processo.',
    escopo: [
      'Qualificação e validação de sistemas, equipamentos e utilidades.',
      'Avaliação de riscos e definição de requisitos.',
      'Foco em integridade de dados e controle de riscos.',
      'Suporte a auditorias internas e externas.',
    ],
    etapas: [
      { tag: '01', titulo: 'Planejar', texto: 'Definição do escopo e da estratégia de validação.' },
      { tag: '02', titulo: 'Avaliar riscos', texto: 'Identificação e priorização dos riscos do sistema e do processo.' },
      { tag: '03', titulo: 'Definir requisitos', texto: 'Especificação dos requisitos do usuário e dos critérios de aceitação.' },
      { tag: '04', titulo: 'Executar testes', texto: 'Execução dos protocolos com registros rastreáveis.' },
      { tag: '05', titulo: 'Consolidar evidências', texto: 'Organização do pacote de evidências por requisito.' },
      { tag: '06', titulo: 'Emitir relatórios', texto: 'Relatórios técnicos com conclusões e recomendações.' },
    ],
    entregaveis: [
      'Planos de validação e qualificação',
      'Protocolos IQ/OQ/PQ',
      'Relatórios técnicos detalhados',
      'Matriz de rastreabilidade (RTM)',
      'Pacote completo de evidências de validação',
    ],
  },
  {
    // Página dedicada: src/pages/servicos/qualificacao-termica-equipamentos-criticos.astro
    // (os entregáveis abaixo são usados pela página).
    slug: 'qualificacao-termica-equipamentos-criticos',
    dedicada: true,
    numero: '09',
    nome: 'Qualificação Térmica de Equipamentos Críticos',
    chamada: 'Mapeamento de temperatura e qualificação térmica de ultrafreezers a autoclaves e calor seco, com estudos de robustez, protocolos e sensores calibrados.',
    necessidade: 'Comprovar que cada equipamento opera dentro da faixa especificada para o uso pretendido, com evidências defensáveis perante a ANVISA e os clientes.',
    escopo: [
      'Câmaras climáticas, estufas de incubação, secagem e esterilização.',
      'Freezers e ultrafreezers, com mapeamento em baixa temperatura.',
      'Autoclaves horizontais e verticais, com estudo de penetração.',
      'Salas e câmaras de estabilidade, data centers e galpões de armazenamento.',
      'Banhos térmicos, câmaras frias, geladeiras científicas e refrigeradores.',
    ],
    etapas: [
      { tag: 'QI', titulo: 'Qualificação de Instalação', texto: 'Verificação da documentação técnica, da identificação do equipamento e das condições do local de instalação.' },
      { tag: 'QO', titulo: 'Qualificação de Operação', texto: 'Funcionamento com o equipamento vazio: setpoints, alarmes, controles, tempo de estabilização e uniformidade.' },
      { tag: 'QD', titulo: 'Qualificação de Desempenho', texto: 'Avaliação em condição real de uso, com carga representativa da rotina.' },
    ],
    entregaveis: [
      'Protocolo de qualificação assinado antes da execução',
      'Relatório técnico com resultados, gráficos de temperatura e curva de mapeamento',
      'Certificados de calibração dos instrumentos utilizados',
      'Identificação do responsável técnico pela execução e aprovação',
    ],
  },
];

export const buscarServico = (slug) => servicos.find((s) => s.slug === slug);
