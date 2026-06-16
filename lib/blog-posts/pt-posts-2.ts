import { blogAuthors } from '../blog-authors'
import type { BlogPost } from '../blog-types'

export const blogPostsPtPart2: BlogPost[] = [
  {
    slug: 'how-to-transform-legacy-software-into-a-modern-product',
    title: 'Como Transformar Software Legacy num Produto Moderno',
    excerpt:
      'Um guia prático para empresas presas em código e infraestrutura desatualizados — partir o monólito, entregar em fatias e usar ferramentas modernas para migrar sem parar o negócio.',
    publishedAt: '2026-06-15',
    author: blogAuthors.marcoMendao,
    category: 'Engenharia',
    readingTimeMinutes: 11,
    content: [
      {
        type: 'paragraph',
        content:
          'A maioria das empresas não começa por querer operar com software legacy. Acontece gradualmente — uma plataforma construída há cinco ou dez anos ainda sustenta o negócio, mas cada nova funcionalidade demora mais, cada deploy parece arriscado e contratar programadores que queiram trabalhar nela fica mais difícil a cada ano. A tecnologia não é só antiga; a infraestrutura à volta dela também costuma ser.',
      },
      {
        type: 'paragraph',
        content:
          'O instinto é reescrever tudo de raiz. Isso quase nunca funciona. Reescrituras big-bang demoram anos, custam uma fortuna e deixam-no com dois sistemas para manter enquanto os utilizadores esperam. Há uma forma melhor: evoluir o produto peça a peça, usar a infraestrutura como ponte entre o antigo e o novo, e manter-se suficientemente lean para entregar valor em cada passo.',
      },
      {
        type: 'heading',
        content: 'Quando o software e a infraestrutura estão ambos atrasados',
        level: 2,
      },
      {
        type: 'paragraph',
        content:
          'Legacy não é apenas um framework antigo ou uma linguagem que ninguém quer tocar. É a stack completa — código da aplicação, esquemas de base de dados, pipelines de deploy, servidores, rede e os hábitos operacionais que cresceram à volta de tudo isto.',
      },
      {
        type: 'list',
        items: [
          'Camada de aplicação: codebases monolíticas, dependências desatualizadas, sem testes automatizados, funcionalidades fortemente acopladas para que nada possa mudar de forma isolada',
          'Camada de dados: esquemas desenhados há anos, índices em falta, lógica de negócio enterrada em stored procedures',
          'Infraestrutura: setups bare-metal ou cloud inicial, deploys manuais, sem ambientes de staging que espelhem produção',
          'Operações: equipas de on-call a apagar fogos em vez de melhorar, releases agendadas trimestralmente porque cada uma é aterrorizante',
        ],
      },
      {
        type: 'paragraph',
        content:
          'Se isto lhe parece familiar, não está sozinho. Negócios tradicionais, scale-ups e até empresas de tecnologia batem nesta parede. O produto ainda funciona — os clientes dependem dele — mas o custo da mudança não para de subir. Modernizar não é um luxo; é como se mantém competitivo, retém talento e responde ao que o mercado realmente precisa.',
      },
      {
        type: 'heading',
        content: 'Partir o monólito em partes geríveis',
        level: 2,
      },
      {
        type: 'paragraph',
        content:
          'Um monólito não é mau por si. Trouxe-o até aqui. O problema é que quando tudo vive numa única codebase com tabelas de base de dados partilhadas e dependências implícitas, não consegue modernizar uma área sem arriscar todo o sistema.',
      },
      {
        type: 'paragraph',
        content:
          'O objetivo não são microserviços por ter microserviços. É identificar bounded contexts — áreas coerentes do produto que podem ser geridas, implementadas e evoluídas de forma independente. Faturação. Gestão de utilizadores. Relatórios. Um fluxo de trabalho específico que os clientes usam diariamente. Cada um destes é um candidato a ser descascado.',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Mapear o sistema: documentar o que existe, quem usa e onde a dor é mais alta',
          'Encontrar costuras naturais: procurar módulos com poucas dependências do resto da codebase',
          'Extrair uma fatia de cada vez: começar com algo valioso mas isolado — não o motor central no primeiro dia',
          'Definir interfaces claras: APIs, eventos ou contratos partilhados entre antigo e novo para que as equipas não fiquem bloqueadas umas às outras',
          'Manter o monólito a correr: o sistema legacy fica live enquanto novos serviços assumem responsabilidades específicas',
        ],
      },
      {
        type: 'paragraph',
        content:
          'Aplicámos este padrão com Next.js e Nest.js — um frontend moderno desacoplado de serviços backend — mas o princípio mantém-se independentemente da stack. O que importa é desenhar fronteiras que correspondam à forma como o negócio realmente funciona, não à forma como os programadores originais organizaram pastas.',
      },
      {
        type: 'heading',
        content: 'Refatorar funcionalidades antigas, construir novas em tecnologia moderna',
        level: 2,
      },
      {
        type: 'paragraph',
        content:
          'Modernizar não é copy-paste. Os utilizadores não querem a mesma experiência desajeitada num novo framework — querem algo melhor. Isso significa duas coisas a acontecer em paralelo: refazer funcionalidades existentes para funcionarem corretamente e parecerem atuais, e adicionar novas capacidades que não eram possíveis na stack antiga.',
      },
      {
        type: 'heading',
        content: 'Refatorar o que já existe',
        level: 3,
      },
      {
        type: 'paragraph',
        content:
          'Quando reconstrói uma funcionalidade legacy, trate-a como uma decisão de produto, não apenas como uma tradução de código. Questione cada ecrã, cada campo, cada passo. De que precisam os utilizadores hoje? O que pode remover? A Coach ID passou exatamente por isto — oito anos de feedback de mercado condensados numa v2 que manteve o que funcionava e eliminou o que não funcionava.',
      },
      {
        type: 'list',
        items: [
          'Entreviste utilizadores e equipas de suporte antes de escrever uma única linha',
          'Simplifique fluxos de trabalho — UIs legacy acumulam cruft ao longo de anos de "só mais um campo"',
          'Escreva testes para a nova versão para nunca regredir',
          'Corra antigo e novo em paralelo até ter confiança na paridade',
        ],
      },
      {
        type: 'heading',
        content: 'Evoluir com tecnologia de ponta',
        level: 3,
      },
      {
        type: 'paragraph',
        content:
          'A nova plataforma é a oportunidade de adotar ferramentas que desbloqueiam velocidade e capacidade — hosting cloud-native, frameworks frontend modernos, design API-first, pipelines CI/CD, observabilidade e funcionalidades assistidas por IA onde genuinamente ajudam. Mas mantenha disciplina: escolha tecnologia que a equipa consiga operar em produção, não o que foi lançado na semana passada no Hacker News.',
      },
      {
        type: 'paragraph',
        content:
          'O sweet spot são ferramentas comprovadas e bem documentadas que resolvem bottlenecks reais na migração. Uma Progressive Web App em vez de um cliente legacy só para desktop. Bases de dados geridas em vez de servidores self-hosted que ninguém mantém. Deploys automatizados em vez de uploads manuais por FTP.',
      },
      {
        type: 'heading',
        content: 'Usar a infraestrutura como ponte',
        level: 2,
      },
      {
        type: 'paragraph',
        content:
          'É aqui que as migrações têm sucesso ou falham. Precisa de ambos os sistemas a correr em simultâneo durante meses — por vezes mais. A infraestrutura é o que torna isso invisível para os utilizadores.',
      },
      {
        type: 'list',
        items: [
          'Reverse proxies (nginx, Traefik, Cloudflare): encaminhar tráfego para serviços legacy ou novos com base no path URL, feature flag ou segmento de utilizador — os utilizadores acedem a um domínio, vocês decidem o que serve o pedido',
          'Load balancers: distribuir tráfego entre instâncias antigas e novas, permitir deploys zero-downtime e fazer rollback instantâneo se algo falhar',
          'Cloud hosting (AWS, GCP, Azure, Vercel): criar novos ambientes em minutos, escalar independentemente dos servidores legacy e pagar pelo que usa durante a transição',
          'API gateways: centralizar autenticação, rate limiting e routing para que novos microserviços se liguem sem alterar o cliente',
          'Message queues e event buses: permitir que sistemas legacy e novos comuniquem de forma assíncrona sem acoplamento forte',
          'Feature flags: lançar gradualmente nova funcionalidade a uma percentagem de utilizadores antes do cutover completo',
        ],
      },
      {
        type: 'paragraph',
        content:
          'O padrão chama-se frequentemente strangler fig — o novo sistema envolve lentamente e substitui o antigo, ramo a ramo. Reverse proxies são o mecanismo que o torna possível ao nível da rede. Os utilizadores continuam a usar o mesmo URL. Nos bastidores, cada vez mais pedidos aterram na stack moderna.',
      },
      {
        type: 'heading',
        content: 'Dividir para conquistar — mas manter-se lean',
        level: 2,
      },
      {
        type: 'paragraph',
        content:
          'O maior erro na modernização de legacy é tentar fazer demasiado de uma vez. Um roadmap de 24 meses com quinze fluxos de trabalho e um comité de direção que se reúne mensalmente não entrega nada útil até ao mês dezoito — se é que entrega.',
      },
      {
        type: 'paragraph',
        content:
          'Em vez disso, pense em rapidez de mercado para cada fatia. Escolha uma peça do produto. Defina o que "feito" significa em semanas, não em trimestres. Entregue. Obtenha feedback. Avance para a peça seguinte. É a mesma mentalidade lean que usamos para MVPs, aplicada à modernização.',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Escolha primeiro a fatia de maior impacto e menor risco — algo que os utilizadores sentem todos os dias mas que não toca no motor central de transações',
          'Defina um deadline rígido: 4–8 semanas para ter a primeira fatia live atrás do proxy',
          'Mantenha a equipa pequena e focada — um squad dedicado, não uma rotação de quem estiver disponível',
          'Meça resultados, não linhas de código: frequência de deploy, taxa de incidentes, satisfação do utilizador, tempo para entregar a próxima funcionalidade',
          'Celebre cada cutover — cada peça que sai do legacy é progresso real, não "planeamento da fase 2"',
        ],
      },
      {
        type: 'paragraph',
        content:
          'Dividir para conquistar não significa fragmentar a atenção por vinte iniciativas. Significa conquista sequencial — um território de cada vez, totalmente assegurado antes de avançar. A parte lean é o que mantém o momentum: cada release prova que a abordagem funciona e constrói confiança organizacional para continuar.',
      },
      {
        type: 'heading',
        content: 'Por onde começar',
        level: 2,
      },
      {
        type: 'paragraph',
        content:
          'Se está a olhar para uma plataforma legacy e a perguntar-se se deve remendar, reescrever ou migrar peça a peça — comece com uma auditoria honesta. O que lhe está a custar mais? Releases lentos? Rotatividade de programadores? Reclamações de clientes sobre UX? Faturas de infraestrutura? Escolha o ponto de dor que mapeia para uma fatia isolável do produto e construa a ponte.',
      },
      {
        type: 'paragraph',
        content:
          'Na Betacode, ajudámos negócios tradicionais e empresas de tecnologia a modernizar sem parar o negócio — desde partir monólitos até montar a infraestrutura cloud que permite ao antigo e ao novo coexistir. Se quer um segundo par de olhos no plano de migração, os nossos serviços de Tech Consulting e External Tech Team foram construídos exatamente para isto.',
      },
    ],
  },
  {
    slug: 'how-to-build-an-mvp-in-3-months',
    title: 'Como Construir um MVP em 3 Meses',
    excerpt:
      'Porque três meses é o sweet spot para ir da ideia ao produto live — e um roadmap prático para chegar lá usando princípios de lean startup em cada passo.',
    publishedAt: '2025-11-12',
    author: blogAuthors.pedroGorrao,
    category: 'Startups',
    readingTimeMinutes: 10,
    content: [
      {
        type: 'paragraph',
        content:
          'A maioria dos fundadores não falha porque a ideia é má. Falham porque passam seis meses a construir a coisa errada — ou doze meses a construir algo que ninguém pediu. Quando lançam, o runway acabou, um concorrente chegou primeiro, ou descobrem que o mercado nunca quis aquilo.',
      },
      {
        type: 'paragraph',
        content:
          'Três meses é o prazo que usamos na Betacode para cada MVP — seja através do nosso serviço de MVP Development ou de uma parceria Betacode Ventures. Não é arbitrário. É a janela em que consegue construir algo real, colocá-lo nas mãos de utilizadores e ainda ter runway suficiente para agir com base no que aprende. Eis porque importa, como fazer e onde o lean startup se encaixa.',
      },
      {
        type: 'heading',
        content: 'Porque três meses importam',
        level: 2,
      },
      {
        type: 'paragraph',
        content:
          'Um MVP não é uma versão mais pequena do produto final. É o experimento mais rápido que pode correr para testar a sua suposição mais arriscada. Três meses impõem a disciplina que a maioria dos fundadores evita quando não há deadline.',
      },
      {
        type: 'list',
        items: [
          'Preservação de runway — cada mês passado a construir isolado é um mês em que não está a aprender. Um limite de 3 meses mantém o burn rate controlado enquanto produz algo tangível',
          'Velocidade de aprendizagem — quanto mais cedo utilizadores reais tocam no produto, mais cedo sabe se deve perseverar, pivotar ou parar. Dados vencem opiniões sempre',
          'Janela competitiva — os mercados movem-se rápido. O fundador que valida em 90 dias tem vantagem estrutural sobre quem ainda está a wireframear ao fim do mês seis',
          'Conversas com investidores — "estamos a construir" é fraco. "Lançámos há seis semanas, aqui estão os nossos números" é uma conversa completamente diferente',
          'Foco da equipa — um deadline rígido mata scope creep. Quando só tem três meses, cada funcionalidade tem de merecer o seu lugar',
          'Momentum psicológico — entregar cria energia. Equipas que lançam cedo mantêm-se motivadas; equipas que constroem para sempre perdem fé na ideia',
        ],
      },
      {
        type: 'paragraph',
        content:
          'Aprendemos isto da forma difícil com a Wishmood. Tínhamos uma ideia, construímos rápido, mas não tínhamos um ciclo de aprendizagem estruturado. Quando aplicámos a mesma disciplina de 3 meses à Coach ID através da Betacode Ventures, a diferença foi abissal — 100+ clientes e clientes pagantes na primeira semana porque construímos para aprender, não para impressionar.',
      },
      {
        type: 'heading',
        content: 'Como construir um MVP em 3 meses',
        level: 2,
      },
      {
        type: 'paragraph',
        content:
          'Um MVP de 3 meses não é sobre cortar cantos na qualidade. É sobre cortar scope impiedosamente enquanto mantém a experiência central sólida. Eis os princípios que fazem tudo funcionar.',
      },
      {
        type: 'heading',
        content: 'Comece com um plano',
        level: 3,
      },
      {
        type: 'paragraph',
        content:
          'Não se improvisa um MVP de 3 meses. As equipas que entregam a tempo começam com um plano escrito — não uma especificação de 200 páginas, mas um documento claro a que toda a equipa pode recorrer quando surgem questões de scope.',
      },
      {
        type: 'list',
        items: [
          'Enunciado do problema — um parágrafo a descrever o utilizador, a dor e porque o produto a resolve',
          'Jornada central do utilizador — um fluxo passo a passo do único workflow que o MVP tem de suportar',
          'Abordagem técnica — stack, esboço de arquitetura e target de deploy decididos desde o início',
          'Limites de scope — uma lista "a construir" e uma lista "não a construir", ambas acordadas antes do desenvolvimento começar',
          'Métricas de sucesso — como saberá que o MVP funcionou: registos, taxa de ativação, clientes pagantes, retenção',
          'Papéis na equipa — quem toma decisões de produto, quem toma decisões técnicas e quem desbloqueia o quê',
        ],
      },
      {
        type: 'paragraph',
        content:
          'Na Betacode, o plano é co-criado com o fundador nas primeiras duas semanas. É um documento vivo — atualizamo-lo quando aprendemos algo novo — mas é sempre a âncora. Quando alguém pergunta "devíamos também adicionar...?", a resposta é "está no plano?"',
      },
      {
        type: 'heading',
        content: 'Identificar funcionalidades core — desenvolver o resto depois',
        level: 3,
      },
      {
        type: 'paragraph',
        content:
          'A disciplina mais difícil em qualquer MVP é dizer não. Os fundadores veem a visão completa — cada funcionalidade, cada integração, cada edge case. Os utilizadores não precisam da visão. Precisam de uma coisa bem feita.',
      },
      {
        type: 'paragraph',
        content:
          'Usamos um framework simples para separar o que entra nos 3 meses do que espera:',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Must-have — sem isto, o produto não funciona. Entra no MVP.',
          'Should-have — importante mas não bloqueia o lançamento. Vai para o roadmap pós-lançamento.',
          'Could-have — adições agradáveis que os utilizadores podem pedir. Guarde-as até ter dados.',
          'Won\'t-have (por agora) — explicitamente excluídas da v1. Escreva-as para que ninguém as meta escondidas.',
        ],
      },
      {
        type: 'paragraph',
        content:
          'O MVP da Coach ID focou-se numa coisa: permitir que treinadores planificassem e executassem sessões de treino semanais. Pagamentos, assistente de IA, dashboard de administração e o editor de exercícios importavam — mas vieram por ordem de prioridade depois do core loop estar live e validado. Tentar construir tudo de uma vez teria adiado o lançamento meses.',
      },
      {
        type: 'list',
        items: [
          'Se remover uma funcionalidade torna o produto inútil — é core. Construa.',
          'Se remover uma funcionalidade torna o produto menos conveniente mas ainda funcional — adie.',
          'Se uma funcionalidade só importa à escala — adie até ter escala.',
          'Se ninguém pediu em entrevistas a utilizadores — não construa.',
        ],
      },
      {
        type: 'heading',
        content: 'Definir milestones e acompanhar o desenvolvimento',
        level: 3,
      },
      {
        type: 'paragraph',
        content:
          'Um plano sem milestones é um desejo. Divida os 3 meses em checkpoints semanais com entregáveis concretos — não "fazer progresso no backend" mas "fluxo de autenticação a funcionar em staging até sexta-feira".',
      },
      {
        type: 'list',
        items: [
          'Semana 1–2: Plano finalizado, arquitetura definida, ambiente de desenvolvimento pronto',
          'Semana 3–4: Modelos de dados core e endpoints de API para o workflow principal',
          'Semana 5–6: Frontend ligado ao backend, happy path a funcionar end to end em staging',
          'Semana 7–8: Testes internos com a equipa, bugs críticos corrigidos, edge cases do fluxo core tratados',
          'Semana 9–10: Deploy em produção, monitorização no lugar, onboarding de utilizadores iniciais começa',
          'Semana 11–12: Feedback recolhido, correções críticas entregues, decisão perseverar/pivotar tomada',
        ],
      },
      {
        type: 'paragraph',
        content:
          'O follow-up é o que separa equipas que entregam de equipas que derivam. Fazemos standups diários curtos e uma demo semanal onde a equipa mostra software a funcionar — não slides, não mockups Figma, não "está quase". Cada semana, algo novo corre em staging que não funcionava na semana anterior.',
      },
      {
        type: 'list',
        items: [
          'Demos semanais — o fundador vê progresso real e pode redirecionar cedo se algo estiver off',
          'Revisões de milestone — em cada checkpoint, pergunte: estamos no caminho certo, precisamos de cortar scope ou ajustar o plano?',
          'Escalação de blockers — se algo está bloqueado há mais de um dia, é levantado imediatamente, não na próxima revisão de sprint',
          'Disponibilidade do fundador — o fundador de negócio tem de estar acessível para decisões de produto. Esperar três dias por uma resposta mata o momentum',
          'Acompanhamento transparente — um board partilhado onde todos veem o que está feito, em progresso e bloqueado',
        ],
      },
      {
        type: 'heading',
        content: 'Aproveitar a IA como acelerador de desenvolvimento',
        level: 3,
      },
      {
        type: 'paragraph',
        content:
          'A IA não substitui uma equipa de desenvolvimento — mas usada corretamente, comprime timelines nas tarefas que antes comiam semanas. Em 2026, ignorar a IA no processo de MVP é deixar velocidade na mesa.',
      },
      {
        type: 'list',
        items: [
          'Boilerplate e scaffolding — a IA gera estrutura de projeto, endpoints CRUD, esquemas de base de dados e stubs de testes em horas em vez de dias',
          'Code review e debugging — programadores usam IA para apanhar bugs, sugerir correções e refatorar mais rápido durante a fase de build',
          'Documentação — docs de API, ficheiros README e guias de onboarding gerados junto com o código, não como afterthought',
          'Prototipagem de UI — iteração rápida em layouts e componentes antes de se comprometer com designs finais',
          'Funcionalidades de produto — funcionalidades com IA como assistentes de chat, geração de conteúdo ou recomendações inteligentes podem ser diferenciadores core construídos no próprio MVP, não adicionados depois',
        ],
      },
      {
        type: 'paragraph',
        content:
          'A Coach ID lançou com um assistente virtual de IA como parte do MVP — não porque era fácil, mas porque ferramentas de IA permitiram integrá-lo dentro da janela de 3 meses sem uma equipa de ML dedicada. A chave é saber onde a IA poupa tempo (código repetitivo, documentação, integrações standard) e onde não poupa (decisões de arquitetura, design de experiência do utilizador, debugging em produção). Julgamento humano sobre o que construir; velocidade da IA sobre como construir.',
      },
      {
        type: 'paragraph',
        content:
          'Na Betacode, os nossos programadores usam ferramentas de IA diariamente — não para saltar o pensamento, mas para eliminar o trabalho repetitivo que abranda um sprint de 3 meses. Isso é uma semana extra de polish, ou uma funcionalidade extra, ou simplesmente lançar a tempo.',
      },
      {
        type: 'heading',
        content: 'Outras práticas que o mantêm no caminho certo',
        level: 3,
      },
      {
        type: 'list',
        items: [
          'Staging desde o primeiro dia — cada funcionalidade aterga num ambiente de staging partilhado antes de produção. Sem "funciona na minha máquina".',
          'Deploy cedo, deploy frequente — configure CI/CD na semana um para que entregar em staging seja um git push, não um ritual de meio dia',
          'Um product owner — uma pessoa toma decisões finais de scope. Comités matam MVPs.',
          'Desenhar para iteração — construa código modular para que funcionalidades pós-lançamento encaixem sem reescritas, mesmo que o MVP em si seja pequeno',
          'Escrever decisões — quando corta uma funcionalidade ou muda de direção, documente o porquê. Evita o mesmo debate acontecer duas vezes.',
          'Celebrar vitórias semanais — o momentum importa. Reconheça o que foi entregue, não só o que falta.',
        ],
      },
      {
        type: 'heading',
        content: 'Onde o lean startup se encaixa',
        level: 2,
      },
      {
        type: 'paragraph',
        content:
          'O MVP de 3 meses não é apenas um plano de projeto — é uma metodologia lean startup aplicada com deadline. Cada fase mapeia diretamente para o ciclo build-measure-learn.',
      },
      {
        type: 'heading',
        content: 'Antes de construir: aprendizagem validada',
        level: 3,
      },
      {
        type: 'paragraph',
        content:
          'A fase de planeamento é pura aprendizagem. Não está a validar se consegue construir o produto — está a validar se alguém o quer. Entrevistas a utilizadores, análise de concorrentes e definição de scope são experimentos. Se os dados dizem que o problema não é suficientemente doloroso, pivota antes de escrever código. Isso é lean startup a poupar-lhe meses de desenvolvimento desperdiçado.',
      },
      {
        type: 'heading',
        content: 'Enquanto constrói: o mínimo viável em tudo',
        level: 3,
      },
      {
        type: 'paragraph',
        content:
          'Durante o desenvolvimento, aplique "minimum viable" a cada decisão. Arquitetura minimum viable — stack comprovada, não experimental. Funcionalidades minimum viable — um workflow, não dez. Equipa minimum viable — um squad focado, não um departamento. A pergunta em cada standup não é "fizemos progresso?" mas "estamos a construir a coisa mais pequena que testa a nossa suposição?"',
      },
      {
        type: 'heading',
        content: 'Depois de lançar: medir e decidir',
        level: 3,
      },
      {
        type: 'paragraph',
        content:
          'Depois do lançamento, fecha o ciclo. Construiu o mínimo, agora mede os resultados. É aqui que o lean startup separa fundadores que se adaptam de fundadores que dobram a aposta numa ideia a falhar porque estão emocionalmente ligados a ela.',
      },
      {
        type: 'list',
        items: [
          'Perseverar — os utilizadores estão a interagir, a proposta de valor core mantém-se e as métricas estão a tender na direção certa. Invista em iteração.',
          'Pivotar — os dados mostram que os utilizadores querem algo adjacente ao que construiu. Ajuste o produto, não a ambição.',
          'Parar — o mercado não está lá. Mate rápido, documente o que aprendeu e avance. Isso não é falha; é aprendizagem validada.',
        ],
      },
      {
        type: 'heading',
        content: 'Lean startup em todo o negócio',
        level: 3,
      },
      {
        type: 'paragraph',
        content:
          'A metodologia não para no produto. Aplicamos princípios lean à forma como estruturamos o próprio engagement:',
      },
      {
        type: 'list',
        items: [
          'Betacode Ventures — investimos a nossa equipa upfront sem taxas de dev, porque o nosso upside depende do produto ter sucesso. Isso é alinhamento lean: só ganhamos se ganhar',
          'MVP Development — um engagement fixo de 3 meses com scope definido, não um retainer open-ended que incentiva entrega lenta',
          'Tech Consulting — ajudamo-lo a perceber o que construir primeiro e o que ignorar, não escrever uma spec de 200 páginas para tudo',
          'Internalization — quando o MVP se prova, ajudamo-lo a contratar a equipa que já conhece o produto, em vez de começar de raiz',
        ],
      },
      {
        type: 'heading',
        content: 'O que mata o timeline de 3 meses',
        level: 2,
      },
      {
        type: 'paragraph',
        content:
          'Vimos os mesmos erros descarrilar timelines de MVP repetidamente. Evite estes e já está à frente da maioria dos fundadores:',
      },
      {
        type: 'list',
        items: [
          'Scope creep — "já que estamos nisto, vamos também adicionar..." é o inimigo. Cada adição adia o lançamento semanas',
          'Perfeccionismo — esperar pelo design perfeito, arquitetura perfeita ou nome perfeito antes de lançar',
          'Construir em stealth — seis meses de desenvolvimento sem uma única conversa com utilizadores',
          'Estrutura de equipa errada — freelancers que desaparecem, agências a faturar por hora, ou fundadores a tentar programar sozinhos à noite e ao fim de semana',
          'Sem métricas — lançar sem saber como é o sucesso, para não conseguir dizer se funcionou',
          'Ignorar feedback — lançar e depois defender o produto em vez de ouvir o que os utilizadores dizem',
        ],
      },
      {
        type: 'heading',
        content: 'Comece o relógio',
        level: 2,
      },
      {
        type: 'paragraph',
        content:
          'Três meses são suficientes para construir algo real, lançar e aprender se a ideia tem pernas. Não é tempo suficiente para desperdiçar na coisa errada — e é exatamente esse o ponto. O deadline é a metodologia.',
      },
      {
        type: 'paragraph',
        content:
          'Se tem uma ideia e precisa de uma equipa que saiba correr este playbook — seja como co-fundador técnico através da Betacode Ventures ou num sprint de MVP focado — fale connosco. A melhor altura para começar o relógio foi ontem. A segunda melhor é agora.',
      },
    ],
  },
]
