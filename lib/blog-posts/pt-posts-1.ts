import { blogAuthors } from '../blog-authors'
import type { BlogPost } from '../blog-types'

export const blogPostsPtPart1: BlogPost[] = [
  {
    slug: 'building-applications-with-javascript-typescript-as-the-backbone',
    title: 'Construir Aplicações com JavaScript/TypeScript como Base',
    excerpt:
      'Porque adoptamos JS/TS em todas as camadas — de deploys rápidos com Next.js e NestJS a equipas full-stack, um enorme pool de talento e um stack pensado para entrega lean startup.',
    publishedAt: '2026-06-17',
    author: blogAuthors.marcoMendao,
    category: 'Engenharia',
    readingTimeMinutes: 9,
    content: [
      {
        type: 'paragraph',
        content:
          'De poucos em poucos anos, a indústria debate qual linguagem ou framework vai dominar a seguir. Nós deixámos de debater há muito tempo. Na Betacode, JavaScript e TypeScript são a base de praticamente todas as aplicações que construímos — frontend, backend, APIs, ferramentas e scripts de infraestrutura. Não porque seja moda, mas porque entrega consistentemente aquilo de que os nossos clientes realmente precisam: velocidade, escalabilidade, eficiência de custos e a capacidade de iterar depressa.',
      },
      {
        type: 'paragraph',
        content:
          'Isto não é uma escolha religiosa. Já trabalhámos com Python, Java, PHP e mais. Mas quando uma startup precisa de um MVP em três meses, ou uma empresa tradicional precisa de modernizar sem contratar três equipas especializadas diferentes, um stack unificado ganha sempre. Eis porquê.',
      },
      {
        type: 'heading',
        content: '1. Deploy rápido',
        level: 2,
      },
      {
        type: 'paragraph',
        content:
          'A velocidade até produção é a primeira lição que o lean startup ensina — e os ecossistemas JavaScript foram construídos para isso. As ferramentas modernas permitem que um programador passe de `git push` a um URL em produção em minutos, não em dias.',
      },
      {
        type: 'list',
        items: [
          'Plataformas como Vercel e Netlify fazem deploy de aplicações Next.js automaticamente em cada commit — sem configuração de servidores, sem bottleneck de DevOps',
          'Backends NestJS containerizam de forma limpa e fazem deploy para qualquer cloud com pipelines CI/CD standard',
          'Hot module replacement e tempos de build rápidos mantêm os programadores em flow em vez de esperarem por compilações',
          'Ambientes de preview para cada pull request permitem que stakeholders revejam alterações antes de chegarem a produção',
        ],
      },
      {
        type: 'paragraph',
        content:
          'Quando o objectivo é colocar algo nas mãos dos utilizadores esta semana, e não no próximo trimestre, a fricção no deploy é o inimigo. As ferramentas JS/TS removem-na.',
      },
      {
        type: 'heading',
        content: '2. Frameworks escaláveis: Next.js e NestJS',
        level: 2,
      },
      {
        type: 'paragraph',
        content:
          '"JavaScript não escala" era uma crítica justa há quinze anos. Já não o é. Dois frameworks sustentam a maior parte do que construímos:',
      },
      {
        type: 'heading',
        content: 'Next.js para o frontend',
        level: 3,
      },
      {
        type: 'list',
        items: [
          'Server-side rendering e geração estática out of the box — primeiros carregamentos rápidos, bom SEO, utilizadores satisfeitos',
          'App Router com React Server Components reduz JavaScript no cliente e melhora a performance em escala',
          'API routes permitem entregar lógica de backend junto do frontend sem um serviço separado para necessidades simples',
          'Optimização de imagens, routing e code splitting integrados — defaults de produção sem configuração personalizada',
        ],
      },
      {
        type: 'heading',
        content: 'NestJS para o backend',
        level: 3,
      },
      {
        type: 'list',
        items: [
          'Arquitectura estruturada e opinativa inspirada no Angular — módulos, controllers, services e dependency injection',
          'TypeScript-first, para que os tipos fluam da base de dados à resposta da API sem camadas de tradução',
          'Suporte nativo para REST, GraphQL, WebSockets, microserviços e message queues',
          'Escala de um monólito único a serviços distribuídos sem mudar de framework',
        ],
      },
      {
        type: 'paragraph',
        content:
          'Juntos, Next.js e NestJS dão-lhe um caminho comprovado do MVP à plataforma de produção. Usámos exactamente esta combinação para decompor software monolítico em serviços modulares — o frontend e o backend evoluem de forma independente enquanto partilham a mesma linguagem e definições de tipos.',
      },
      {
        type: 'heading',
        content: '3. Equipas full-stack que custam menos',
        level: 2,
      },
      {
        type: 'paragraph',
        content:
          'Contratar programadores de frontend, backend e mobile separados é caro — e a coordenação entre eles é lenta. Quando todo o stack fala JavaScript/TypeScript, um único programador pode ser dono de uma funcionalidade de ponta a ponta: query à base de dados, endpoint de API, componente de UI e deploy.',
      },
      {
        type: 'list',
        items: [
          'Um programador pode entregar uma funcionalidade completa orientada ao utilizador sem esperar pelo sprint de outra equipa',
          'Tipos partilhados entre frontend e backend eliminam uma classe inteira de bugs de integração',
          'Equipas mais pequenas com competências mais amplas significam menor burn rate para startups e colaborações mais enxutas para empresas estabelecidas',
          'A transferência de conhecimento é mais rápida — onboarding num stack, não em três',
        ],
      },
      {
        type: 'paragraph',
        content:
          'Para os nossos serviços de Equipa técnica externa e Reforço de equipa, isto é uma vantagem directa de custo para os clientes. Obtém mais output por hora de programador porque ninguém fica bloqueado à espera que a equipa de API termine antes de a equipa de UI poder começar.',
      },
      {
        type: 'heading',
        content: '4. Uma enorme comunidade de desenvolvimento',
        level: 2,
      },
      {
        type: 'paragraph',
        content:
          'JavaScript é a linguagem de programação mais utilizada no mundo. Isto não é uma métrica de vaidade — significa que quando encontra um problema às 23h antes de um lançamento, alguém já o resolveu, escreveu sobre isso e publicou um pacote npm.',
      },
      {
        type: 'list',
        items: [
          'O npm aloja mais de dois milhões de pacotes — autenticação, pagamentos, analytics, geração de PDF, integrações de IA e praticamente tudo o resto',
          'Stack Overflow, GitHub Discussions e comunidades Discord dão respostas em horas, não em semanas',
          'A documentação dos frameworks (Next.js, NestJS, React, Node.js) é extensa, mantida e acessível a quem está a começar',
          'Talks de conferências, cursos e tutoriais mantêm o ecossistema a avançar — nunca fica preso a um framework morto',
        ],
      },
      {
        type: 'paragraph',
        content:
          'O tamanho da comunidade reduz directamente o risco do projecto. Stacks obscuros morrem; os ecossistemas JavaScript prosperam porque milhões de programadores dependem deles.',
      },
      {
        type: 'heading',
        content: '5. Um pool profundo de talento',
        level: 2,
      },
      {
        type: 'paragraph',
        content:
          'Portugal — onde a Betacode está sediada — tem um pool forte e crescente de programadores JavaScript e TypeScript. Universidades, bootcamps e engenheiros autodidactas convergem para este stack porque é o que o mercado exige. Isso é bom para nós e bom para os nossos clientes.',
      },
      {
        type: 'list',
        items: [
          'Mais fácil contratar e escalar equipas sem requisitos de linguagens de nicho',
          'A internalização é mais fluida — programadores que externaliza hoje podem juntar-se à sua equipa interna amanhã no mesmo stack',
          'Freelancers, agências e contratações a tempo inteiro competem no mesmo mercado de talento, mantendo a qualidade alta e os custos razoáveis',
          'Programadores júnior rampam mais depressa em JavaScript do que na maioria das alternativas, dando-lhe um pipeline para crescimento',
        ],
      },
      {
        type: 'paragraph',
        content:
          'Quando ajudamos clientes a internalizar talento através do nosso serviço de Internalização de equipa, a transição é fluida porque a tecnologia não muda — apenas muda o contrato de trabalho.',
      },
      {
        type: 'heading',
        content: '6. Aplicações responsivas e dinâmicas',
        level: 2,
      },
      {
        type: 'paragraph',
        content:
          'Os utilizadores esperam aplicações que pareçam instantâneas — transições suaves, actualizações em tempo real e layouts que funcionam em qualquer ecrã. JavaScript nasceu no browser, e nenhum outro stack o iguala para experiências interactivas e responsivas.',
      },
      {
        type: 'list',
        items: [
          'O modelo de componentes do React torna UIs complexas geríveis — peças reutilizáveis que se actualizam eficientemente quando os dados mudam',
          'Progressive Web Apps (PWAs) entregam experiências semelhantes a nativas a partir de um browser — sem app store necessária',
          'Server-side rendering com hidratação no cliente dá-lhe carregamentos iniciais rápidos mais interactividade rica a seguir',
          'Design responsivo é de primeira classe com frameworks CSS modernos e Tailwind — um codebase para desktop, tablet e telemóvel',
        ],
      },
      {
        type: 'paragraph',
        content:
          'A Coach ID lança-se como PWA construída neste stack — treinadores usam-na no relvado a partir do telemóvel, no escritório no desktop e em tablets durante sessões de treino. Uma aplicação, todos os dispositivos, sem builds nativos separados para manter.',
      },
      {
        type: 'heading',
        content: '7. Como encaixa no nosso negócio e no lean startup',
        level: 2,
      },
      {
        type: 'paragraph',
        content:
          'As escolhas tecnológicas na Betacode não são feitas isoladamente. Servem um modelo de negócio construído em entregar depressa, aprender rapidamente e ajudar os clientes a fazer o mesmo. JavaScript/TypeScript é o stack que faz esse modelo funcionar.',
      },
      {
        type: 'list',
        items: [
          'Desenvolvimento de MVP: uma equipa full-stack JS/TS pode entregar um produto funcional em ~3 meses porque não há mudança de contexto entre linguagens ou frameworks',
          'Betacode Ventures: investimos a nossa equipa upfront — o stack tem de ser um onde um squad pequeno se move à velocidade de startup sem overhead de infraestrutura',
          'Modernização de legacy: Next.js e NestJS permitem-nos retirar funcionalidades de um monólito uma de cada vez, encaminhar tráfego através de um proxy e entregar novos slices sem parar o negócio',
          'Ciclo lean startup: deploy rápido significa ciclos build-measure-learn rápidos — entregar na segunda-feira, obter dados de utilizadores na terça, pivotar na quarta',
        ],
      },
      {
        type: 'paragraph',
        content:
          'O Pedro escreveu sobre o lean startup como a nossa pedra de Rosetta. TypeScript é o alfabeto. É a linguagem comum que permite a uma equipa fundadora de duas pessoas, a um squad técnico externo e, eventualmente, a um departamento de engenharia internalizado trabalhar no mesmo codebase sem fricção.',
      },
      {
        type: 'heading',
        content: 'Um stack, muitos contextos',
        level: 2,
      },
      {
        type: 'paragraph',
        content:
          'Não estamos a dizer que JavaScript é a única linguagem que vale a pena aprender. Data science, sistemas embebidos e high-frequency trading vão sempre precisar de ferramentas especializadas. Mas para as aplicações web, plataformas SaaS, marketplaces e ferramentas internas que a maioria das empresas precisa — aquelas onde velocidade, iteração e custo importam mais — JavaScript e TypeScript continuam a ser o default mais forte.',
      },
      {
        type: 'paragraph',
        content:
          'Se está a começar um produto novo, a modernizar um antigo ou a tentar perceber que stack a sua equipa externa deve usar, a pergunta não é "qual é o framework mais recente?". É "o que nos coloca mais depressa à frente dos utilizadores, com uma equipa que conseguimos contratar, numa plataforma que escala quando tivermos sucesso?". Para nós, e para a maioria dos nossos clientes, a resposta continua a apontar para o mesmo sítio.',
      },
    ],
  },
  {
    slug: 'why-lean-startup-is-the-rosetta-stone-of-betacode',
    title: 'Porque o Lean Startup é a Pedra de Rosetta da Betacode',
    excerpt:
      'Do nosso primeiro produto Wishmood a cada colaboração com clientes hoje — como build-measure-learn se tornou a linguagem que usamos para ajudar empresas de software a entregar mais depressa e a desperdiçar menos.',
    publishedAt: '2026-06-16',
    author: blogAuthors.pedroGorrao,
    category: 'Negócio',
    readingTimeMinutes: 10,
    content: [
      {
        type: 'paragraph',
        content:
          'Antes de a Betacode ser uma empresa com clientes por Portugal e além, eram dois fundadores com uma ideia, um protótipo e muitas suposições. O nosso primeiro produto de startup foi o Wishmood — uma app de entrega on-demand, semelhante em espírito ao Uber Eats, construída para um contexto específico: praias, eventos ao ar livre e locais onde as apps de entrega tradicionais não operavam. Os utilizadores podiam encomendar comida e tê-la entregue na sua espreguiçadeira, no piquenique ou na tenda do festival.',
      },
      {
        type: 'paragraph',
        content:
          'O Wishmood não se tornou o próximo unicorn. Mas ensinou-nos algo mais valioso do que um exit bem-sucedido alguma vez poderia: como construir software sob incerteza, como matar más ideias depressa e como ouvir o mercado em vez do nosso próprio entusiasmo. Essas lições tornaram-se a pedra de Rosetta da Betacode — o framework que usamos para descodificar o problema de cada cliente, quer seja uma startup de duas pessoas ou uma empresa tradicional a correr software de 2012.',
      },
      {
        type: 'heading',
        content: 'O que aprendemos a construir o Wishmood',
        level: 2,
      },
      {
        type: 'paragraph',
        content:
          'O Wishmood nasceu de uma observação real: pessoas na praia queriam comida entregue, e restaurantes perto de zonas costeiras não tinham canal digital para as alcançar. A oportunidade parecia óbvia. Construímos depressa — app mobile, onboarding de restaurantes, logística de entrega, fluxo de pagamento. Éramos tecnólogos que sabiam entregar, e entregámos.',
      },
      {
        type: 'paragraph',
        content:
          'Mas entregar não é o mesmo que aprender. Descobrimos que a entrega na praia tem unit economics brutais — procura sazonal, tráfego pedonal difícil de prever, restaurantes com capacidade de cozinha limitada nas horas de ponta e rotas de entrega que não se mapeiam a grelhas urbanas. Os utilizadores adoraram a ideia nas entrevistas. A utilização real contou uma história mais complicada.',
      },
      {
        type: 'list',
        items: [
          'Assumimos que a procura era durante todo o ano; era fortemente sazonal',
          'Construímos funcionalidades antes de validar se os restaurantes comprometiam staff nas horas de rush',
          'Optimizámos a app antes de perceber se o modelo de negócio funcionava ao nível da unidade',
          'Aprendemos que "as pessoas querem isto" e "as pessoas pagam o suficiente para isto ser um negócio" são afirmações muito diferentes',
        ],
      },
      {
        type: 'paragraph',
        content:
          'O Wishmood foi a nossa introdução ao lean startup da forma mais directa possível — através de um fracasso que nos ensinou mais depressa do que qualquer livro. Não abandonámos a experiência. Pivotámos. Não para outra app de consumo, mas para uma pergunta que continuava a surgir: se conseguíamos ajudar-nos a aprender mais depressa, conseguiríamos ajudar outras empresas a fazer o mesmo?',
      },
      {
        type: 'heading',
        content: 'De fundadores de startup a enablers de startup',
        level: 2,
      },
      {
        type: 'paragraph',
        content:
          'A Betacode foi fundada em 2016 com uma mudança clara de mentalidade. Não estávamos a tentar adivinhar o próximo grande produto de consumo. Estávamos a aplicar os mesmos princípios lean do Wishmood para ajudar outras empresas a construir software — validar antes de escalar, entregar a versão útil mais pequena, medir o que importa e pivotar quando os dados o dizem.',
      },
      {
        type: 'paragraph',
        content:
          'É por isso que os nossos serviços têm este aspecto. Desenvolvimento de MVP não é "construímos o que quer que especifique" — é um sprint estruturado para colocar algo nas mãos de utilizadores reais em semanas. Consultoria técnica não é um documento de arquitectura de 200 páginas — é ajudá-lo a perceber o que construir primeiro e o que ignorar. Betacode Ventures é a aposta lean definitiva: investimos a nossa equipa upfront, entregamos um MVP em ~3 meses e deixamos o mercado decidir se a ideia tem pernas.',
      },
      {
        type: 'paragraph',
        content:
          'A Coach ID é a prova. Oito anos de conhecimento de domínio, milhares de treinadores e uma decisão de reconstruir de raiz em vez de remendar uma plataforma legacy — porque a pergunta lean não era "conseguimos migrar a base de dados?" mas "de que é que os treinadores realmente precisam hoje?". A v2 entregou-se depressa, teve utilizadores reais na primeira semana e validou a proposta de valor com clientes pagantes de imediato.',
      },
      {
        type: 'heading',
        content: 'O que o lean startup significa na prática',
        level: 2,
      },
      {
        type: 'paragraph',
        content:
          'Eric Ries cunhou "lean startup", mas as ideias são mais antigas do que o rótulo. Construir pequeno, aprender depressa, não desperdiçar recursos em coisas que ninguém quer. Para empresas de tecnologia, traduz-se num ciclo repetível:',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Build — entregar a versão mínima que testa a sua suposição mais arriscada',
          'Measure — recolher dados de utilizadores reais, não opiniões de reuniões',
          'Learn — decidir se persevera, pivota ou mata a iniciativa',
        ],
      },
      {
        type: 'paragraph',
        content:
          'O inimigo do lean não é a ambição. É a certeza — a crença de que já sabe o que os clientes querem, por isso pode construir o produto completo. Cada mês gasto a construir funcionalidades que ninguém pediu é um mês em que não aprendeu.',
      },
      {
        type: 'heading',
        content: 'Como o aplicamos a empresas de tecnologia',
        level: 2,
      },
      {
        type: 'paragraph',
        content:
          'Lean startup não é só para fundadores com pitch decks. Usamos os mesmos princípios com empresas de tecnologia a escalar o produto, empresas tradicionais a digitalizar e startups à procura de um co-fundador técnico. O contexto muda; o método não.',
      },
      {
        type: 'heading',
        content: 'Para startups',
        level: 3,
      },
      {
        type: 'list',
        items: [
          'Defina a suposição mais arriscada antes de escrever código — normalmente é "alguém paga por isto?" e não "conseguimos construir?"',
          'Lance com um fluxo de trabalho central, não uma matriz de funcionalidades',
          'Fale com utilizadores semanalmente, não trimestralmente',
          'Trate o MVP como ferramenta de aprendizagem, não como versão reduzida do produto final',
        ],
      },
      {
        type: 'heading',
        content: 'Para empresas de tecnologia',
        level: 3,
      },
      {
        type: 'list',
        items: [
          'Valide novas linhas de produto com protótipos antes de comprometer um squad completo durante seis meses',
          'Use reforço de equipa para testar capacidade antes de contratar permanentemente — contratação lean, não despedimentos lean',
          'Divida iniciativas grandes em slices entregáveis para que cada sprint produza aprendizagem, não apenas barras de progresso',
          'Meça resultados (retenção, receita, tickets de suporte) em vez de output (story points, linhas de código)',
        ],
      },
      {
        type: 'heading',
        content: 'Para empresas tradicionais',
        level: 3,
      },
      {
        type: 'list',
        items: [
          'Comece pelo problema de negócio, não pela lista de desejos tecnológicos',
          'Faça piloto com um departamento ou um fluxo de trabalho antes de implementar em toda a empresa',
          'Mantenha o sistema antigo a correr enquanto o novo se prova — sem cutovers big-bang',
          'Forme equipas internas em paralelo com a construção para que o conhecimento fique in-house',
        ],
      },
      {
        type: 'heading',
        content: 'Os erros que vemos repetidamente',
        level: 2,
      },
      {
        type: 'paragraph',
        content:
          'Depois de quase uma década a aplicar princípios lean em dezenas de projectos, os padrões de falha são previsíveis:',
      },
      {
        type: 'list',
        items: [
          'O stealth build — seis meses de desenvolvimento isolado, seguidos de um lançamento que ninguém pediu',
          'A feature factory — entregar constantemente mas nunca verificar se a utilização ou a receita se moveram',
          'A arquitectura perfeita — gastar meses em infraestrutura antes de um único utilizador ter tocado no produto',
          'A spec de comité — um documento de requisitos de 50 páginas escrito por pessoas que não vão usar o software',
          'A armadilha do sunk cost — continuar uma iniciativa a falhar porque "já investimos tanto"',
        ],
      },
      {
        type: 'paragraph',
        content:
          'O lean startup dá-lhe permissão — na verdade, dá-lhe a obrigação — de parar quando os dados dizem para parar. Isso é mais difícil do que parece quando egos, orçamentos e timelines estão envolvidos. Também é a diferença entre uma empresa que se adapta e uma que fica sem runway a construir a coisa errada.',
      },
      {
        type: 'heading',
        content: 'Porque isto continua a importar em 2026',
        level: 2,
      },
      {
        type: 'paragraph',
        content:
          'A IA consegue escrever código mais depressa do que nunca. As plataformas cloud conseguem levantar infraestrutura em minutos. O custo de construir baixou — mas o custo de construir a coisa errada não baixou. Se calhar, subiu, porque as equipas conseguem agora entregar más ideias a uma velocidade sem precedentes.',
      },
      {
        type: 'paragraph',
        content:
          'O lean startup é mais relevante hoje, não menos. As ferramentas mudaram; a disciplina não. Valide antes de escalar. Entregue pequeno. Meça com honestidade. Pivotar sem vergonha. Estes são os princípios que nos levaram de uma app de entrega na praia que não funcionou a uma empresa de software que ajuda outros a evitar os mesmos erros — e a construir o que funciona.',
      },
      {
        type: 'heading',
        content: 'A pedra de Rosetta',
        level: 2,
      },
      {
        type: 'paragraph',
        content:
          'Quando nos sentamos com um novo cliente — quer seja um fundador com uma ideia ou um CEO com uma plataforma legacy — estamos na verdade a fazer as mesmas perguntas que nos fizemos durante o Wishmood: Qual é a suposição mais arriscada? Qual é a coisa mais pequena que podemos construir para a testar? O que dizem os dados? Devemos perseverar ou pivotar?',
      },
      {
        type: 'paragraph',
        content:
          'Essa é a pedra de Rosetta. Uma linguagem para descodificar cada desafio de software. É por isso que a Betacode existe, porque o nosso modelo Ventures funciona e porque acreditamos que os melhores parceiros tecnológicos não se limitam a escrever código — ajudam-no a aprender o que construir a seguir.',
      },
    ],
  },
]
