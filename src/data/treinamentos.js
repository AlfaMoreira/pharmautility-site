// Treinamentos em Segurança do Trabalho (Normas Regulamentadoras).
// Conteúdo transcrito do documento "Pharmautility — Treinamentos de Segurança do Trabalho.html".
// Não acrescentar cursos, números ou afirmações que não estejam no documento de origem.

export const destaques = [
  { numero: '13', texto: 'Normas Regulamentadoras cobertas no catálogo' },
  { numero: '4', texto: 'Programas de treinamento estruturados' },
  { numero: '2', texto: 'Profissionais com registro técnico à frente do conteúdo' },
];

export const diferenciais = [
  {
    icone: 'i-shield',
    titulo: 'Conteúdo específico por norma',
    texto: 'Cada módulo é escrito a partir do texto técnico da NR aplicável e dos riscos reais da atividade — não de um roteiro padrão reaproveitado entre clientes.',
  },
  {
    icone: 'i-target',
    titulo: 'Responsabilidade técnica formal',
    texto: 'Conteúdo conduzido por instrutor com formação em Segurança do Trabalho e, quando aplicável, com responsabilidade técnica assinada por engenheira com registro no CREA.',
  },
  {
    icone: 'i-doc',
    titulo: 'Teoria e prática no mesmo pacote',
    texto: 'Apostila, avaliação com gabarito comentado e modelo de certificado — material pronto para aplicar, imprimir e arquivar junto ao PGR da empresa.',
  },
  {
    icone: 'i-layers',
    titulo: 'Estrutura modular e mensurável',
    texto: 'Carga horária distribuída por módulo, objetivos de aprendizagem explícitos e critério de aprovação definido — fácil de auditar e de adaptar ao perfil da equipe.',
  },
];

export const cursos = [
  {
    id: 'nr-12',
    sigla: 'NR-12',
    area: 'Máquinas e Equipamentos',
    status: 'pronto',
    rotuloStatus: 'Material completo',
    titulo: 'Segurança em Máquinas e Equipamentos',
    meta: [
      { tipo: 'tempo', texto: '8 horas' },
      { tipo: 'modulos', texto: '7 módulos' },
      { tipo: 'pratica', texto: 'Prática com máquina real' },
    ],
    descricao: 'Princípios aplicáveis a tornos, prensas, serras, máquinas de madeira, robôs, esteiras e demais famílias de máquinas — da análise de risco ao controle de energias perigosas.',
    modulos: [
      { rotulo: 'Mód. 1–2', texto: 'NR-12, conceitos, responsabilidades e análise de riscos' },
      { rotulo: 'Mód. 3', texto: 'Proteções e dispositivos de segurança' },
      { rotulo: 'Mód. 4', texto: 'Tipos de máquinas e riscos específicos' },
      { rotulo: 'Mód. 5–7', texto: 'Operação, manutenção, EPI/EPC, emergência e avaliação prática' },
    ],
    normas: ['NR-12'],
  },
  {
    id: 'glp',
    sigla: 'GLP',
    area: 'Empilhadeiras',
    status: 'pronto',
    rotuloStatus: 'Material completo',
    titulo: 'Troca segura de cilindro de GLP em empilhadeiras',
    meta: [
      { tipo: 'tempo', texto: '4 horas' },
      { tipo: 'pratica', texto: 'Avaliação: 10 questões · 70% mín.' },
    ],
    descricao: 'Procedimento completo de troca de cilindro, riscos de incêndio, explosão e asfixia, e resposta a vazamento — com comunicação interna segura em área classificada.',
    modulos: [
      { rotulo: 'Mód. 1', texto: 'Fundamentos: normas, GLP, riscos, fontes de ignição' },
      { rotulo: 'Mód. 2', texto: 'Procedimento: preparar, inspecionar, desconectar, instalar, testar' },
      { rotulo: 'Mód. 3', texto: 'Emergências: vazamento, incêndio, proibições' },
      { rotulo: 'Mód. 4', texto: 'Prática: estudos de caso, checklist, responsabilidades' },
    ],
    normas: ['NR-01', 'NR-06', 'NR-11', 'NR-12', 'NR-20', 'NR-23', 'NR-26'],
  },
  {
    id: 'nr-33',
    sigla: 'NR-33',
    area: 'Espaços Confinados',
    status: 'consulta',
    rotuloStatus: 'Sob consulta',
    titulo: 'Segurança em Espaços Confinados',
    meta: [{ tipo: 'modulos', texto: 'Carga horária sob medida' }],
    descricao: 'Reconhecimento e avaliação de riscos em espaços confinados, Permissão de Entrada e Trabalho (PET), monitoramento atmosférico, papéis do vigia e do supervisor, e procedimentos de resgate.',
    modulos: [
      { texto: 'Identificação de espaços confinados e riscos atmosféricos' },
      { texto: 'Permissão de Entrada e Trabalho e monitoramento contínuo' },
      { texto: 'Papéis: trabalhador autorizado, vigia e supervisor de entrada' },
      { texto: 'Planejamento de resgate e primeiros socorros' },
    ],
    normas: ['NR-33'],
  },
  {
    id: 'nr-35',
    sigla: 'NR-35',
    area: 'Trabalho em Altura',
    status: 'consulta',
    rotuloStatus: 'Sob consulta',
    titulo: 'Segurança no Trabalho em Altura',
    meta: [{ tipo: 'modulos', texto: 'Carga horária sob medida' }],
    descricao: 'Atividades acima de 2 m com risco de queda: Análise de Risco, Permissão de Trabalho, sistemas de proteção contra quedas, ancoragem e procedimentos de resgate e emergência.',
    modulos: [
      { texto: 'Análise de Risco (AR) e Permissão de Trabalho (PT)' },
      { texto: 'Sistemas de proteção contra quedas e pontos de ancoragem' },
      { texto: 'Inspeção de EPI para altura (talabarte, trava-quedas, cinto)' },
      { texto: 'Procedimentos de emergência e resgate em altura' },
    ],
    normas: ['NR-35'],
  },
];

export const metodo = [
  { titulo: 'Diagnóstico', texto: 'Levantamento das máquinas, atividades e normas aplicáveis ao cliente.' },
  { titulo: 'Conteúdo técnico', texto: 'Módulos escritos a partir do procedimento e dos riscos reais da operação.' },
  { titulo: 'Treinamento', texto: 'Carga teórica e prática, com máquinas e equipamentos do próprio estabelecimento.' },
  { titulo: 'Avaliação', texto: 'Prova com critério de aprovação definido e gabarito comentado para a turma.' },
  { titulo: 'Certificação', texto: 'Emissão de certificado com conteúdo programático, instrutor e validade.' },
];

export const equipe = [
  {
    iniciais: 'JM',
    nome: 'Josue Santos Moreira',
    funcao: 'Técnico em Segurança do Trabalho · Instrutor',
    bio: 'Conduz a parte teórica e prática dos treinamentos, com foco em reconhecimento de perigos, procedimentos operacionais seguros e resposta a emergências em ambiente industrial.',
    registro: 'Registro 0116694/SP',
  },
  {
    iniciais: 'GL',
    nome: 'Eng.ª Gabriela Pereira Lemos',
    funcao: 'Engenheira · Responsável Técnica',
    bio: 'Responde tecnicamente pelo conteúdo dos treinamentos que exigem responsabilidade técnica formal, validando o conteúdo programático frente às Normas Regulamentadoras aplicáveis.',
    registro: 'CREA-SP nº 5070436281',
  },
];

// "cursos" usa os ids acima; "correlata" indica norma tratada de forma correlata no curso.
export const normas = [
  { nr: 'NR-01', titulo: 'Disposições Gerais e Gerenciamento de Riscos Ocupacionais', cursos: ['glp'] },
  { nr: 'NR-04', titulo: 'Serviços Especializados em Engenharia de Segurança e Medicina do Trabalho', cursos: ['glp'], correlata: true },
  { nr: 'NR-05', titulo: 'Comissão Interna de Prevenção de Acidentes e de Assédio', cursos: ['glp'], correlata: true },
  { nr: 'NR-06', titulo: 'Equipamento de Proteção Individual', cursos: ['glp'] },
  { nr: 'NR-09', titulo: 'Avaliação e Controle de Exposições Ocupacionais a Agentes Físicos, Químicos e Biológicos', cursos: ['glp'], correlata: true },
  { nr: 'NR-10', titulo: 'Segurança em Instalações e Serviços em Eletricidade', cursos: ['glp'], correlata: true },
  { nr: 'NR-11', titulo: 'Transporte, Movimentação, Armazenagem e Manuseio de Materiais', cursos: ['glp'] },
  { nr: 'NR-12', titulo: 'Segurança no Trabalho em Máquinas e Equipamentos', cursos: ['nr-12', 'glp'] },
  { nr: 'NR-20', titulo: 'Segurança no Trabalho com Inflamáveis e Combustíveis', cursos: ['glp'] },
  { nr: 'NR-23', titulo: 'Proteção Contra Incêndios', cursos: ['glp'] },
  { nr: 'NR-26', titulo: 'Sinalização de Segurança', cursos: ['glp'] },
  { nr: 'NR-33', titulo: 'Segurança e Saúde nos Trabalhos em Espaços Confinados', cursos: ['nr-33'] },
  { nr: 'NR-35', titulo: 'Segurança e Saúde no Trabalho em Altura', cursos: ['nr-35'] },
];

export const pontosContato = [
  'Conteúdo adaptado às máquinas e à atividade real da empresa',
  'Apostila, avaliação e certificado inclusos no pacote',
  'Responsabilidade técnica formal sobre o conteúdo aplicado',
];

export const opcoesCurso = [
  'NR-12 — Segurança em Máquinas e Equipamentos',
  'GLP — Troca de cilindro em empilhadeiras',
  'NR-33 — Espaços Confinados',
  'NR-35 — Trabalho em Altura',
  'Ainda não sei / quero orientação',
];
