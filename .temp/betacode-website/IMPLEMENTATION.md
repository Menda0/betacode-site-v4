# Betacode — redesign do website: instruções de implementação

Este pacote contém o redesign completo do site da Betacode (betacode.tech), aprovado em protótipo. O objetivo é implementar estas páginas no site real, em produção, com o mesmo design, copy, comportamento e estados (PT/EN, light/dark).

Lê este documento inteiro antes de começar. As secções "Regras que não se podem quebrar" e "Pontos em aberto" são obrigatórias.

---

## 1. O que está no pacote

```
betacode-website/
├── index.html                      Homepage
├── pricing.html                    Calculadora de preços (wizard)
├── betacode-ventures.html          Betacode Ventures
├── insights.html                   Listagem de artigos
├── contact.html                    Contacto
├── insights/<slug>.html            7 artigos (um ficheiro por artigo)
├── assets/
│   ├── brand/      logo.png, logo-white.png, logo-animated.gif, mark.png, wordmarks
│   ├── avatars/    marco-mendao.jpg, pedro-gorrao.jpg
│   ├── clients/    unicef, evolve, tymber, rupeal, coach-id
│   ├── funding/    iefp, pessoas2030, portugal2030, ue (cada um em -light e -dark)
│   ├── photos/     fotos da secção "O que fazemos" e outras
│   ├── team/       fotos da grelha "A equipa por trás do código"
│   ├── fonts/      bc-digits.ttf (só usado por código legado da homepage, ver §9)
│   └── vendor/     React 18.3.1 + dc-runtime.js (só para o protótipo funcionar)
└── docs/
    ├── screenshots/   cada página em PT/light e EN/dark (1440px de largura)
    ├── source/        ficheiros-fonte do protótipo (.dc.html)
    └── calculadora-precos.md   regras de negócio da calculadora de preços
```

### Como ver o protótipo

As páginas precisam de ser servidas por HTTP (não abrir com `file://`):

```bash
cd betacode-website
python3 -m http.server 8080
# abrir http://localhost:8080
```

- Todas as páginas têm seletor PT/EN e botão light/dark no cabeçalho.
- Também se pode abrir diretamente com `?lang=en&theme=dark`.
- A navegação entre páginas do protótipo mantém a língua e o tema.
- Formulários, filtros, pesquisa, wizard e ecrãs de sucesso funcionam (sem backend).

### Importante: o protótipo NÃO é o código final

Os ficheiros HTML usam um runtime mínimo (`assets/vendor/dc-runtime.js`) que lê um template e uma classe de lógica por página. Isto existe só para o protótipo ser navegável. **Não copies este runtime para produção.** Usa os ficheiros como especificação visual e funcional e reconstrói as páginas como componentes reais na stack do site.

Onde está cada coisa em cada ficheiro HTML:

- `<template id="dc-tpl">`: o markup da página, com `{{variável}}`, `<sc-for>` (loops) e `<sc-if>` (condicionais).
- `<script type="text/x-dc-logic">`: a lógica e **toda a copy PT/EN** (objetos `COPY`, `t`, função `L(pt, en)`), paletas de cores, dados (artigos, serviços, clientes, regras da calculadora).
- `<head>`: o CSS da página (classes, animações, media queries).

---

## 2. Stack recomendada

Se o site atual já tem uma stack definida, mantém-na. Caso contrário:

- **Next.js (App Router) + TypeScript.**
- **i18n com rotas** `/pt/...` **e** `/en/...`, como no site atual (next-intl ou equivalente). A copy está toda nos ficheiros-fonte e deve ser extraída para ficheiros de mensagens (`messages/pt.json`, `messages/en.json`).
- **Tema light/dark** com variáveis CSS e um atributo no `<html>` (`data-theme="dark"`). Por defeito segue `prefers-color-scheme`; a escolha do utilizador fica guardada (cookie, para evitar flash no SSR).
- **Fontes com** `next/font/google`**:** Montserrat (500–800), Inter (400–600), JetBrains Mono (400–700).
- **Imagens com** `next/image`, em WebP/AVIF e com tamanhos responsivos. As fotos originais têm até 500 KB.
- **Artigos em MDX ou num CMS headless**, em vez do objeto `ART` no código (ver §6).

---

## 3. Rotas

| Página | Rota PT | Rota EN | Fonte no protótipo |
| --- | --- | --- | --- |
| Homepage | `/pt` | `/en` | `index.html` (`docs/source/Main.dc.html`) |
| Calculadora de preços | `/pt/pricing` | `/en/pricing` | `pricing.html` (`Pricing.dc.html`) |
| Betacode Ventures | `/pt/betacode-ventures` | `/en/betacode-ventures` | `betacode-ventures.html` (`Ventures.dc.html`) |
| Insights | `/pt/insights` | `/en/insights` | `insights.html` (`Insights.dc.html`) |
| Artigo | `/pt/insights/<slug>` | `/en/insights/<slug>` | `insights/<slug>.html` (`Article.dc.html`, prop `slug`) |
| Contacto | `/pt/contact` | `/en/contact` | `contact.html` (`Contact.dc.html`) |

Slugs dos artigos (iguais aos do site atual, mais um novo):

| Chave interna | Slug | Autor |
| --- | --- | --- |
| `agentic` | `the-agentic-era-of-software` | Marco Mendão (**novo**) |
| `cofounder` | `why-startups-need-a-technical-co-founder` | Pedro Gorrão |
| `stack` | `building-applications-with-javascript-typescript-as-the-backbone` | Marco Mendão |
| `lean` | `why-lean-startup-is-the-rosetta-stone-of-betacode` | Pedro Gorrão |
| `legacy` | `how-to-transform-legacy-software-into-a-modern-product` | Marco Mendão |
| `mvp` | `how-to-build-an-mvp-in-3-months` | Pedro Gorrão |
| `ai` | `how-ai-can-help-you-create-your-next-project` | Marco Mendão |

---

## 4. Design system

### Cores

Marca: coral `#EB5648`, coral escuro (botões, links ativos) `#D8402F`, hover do botão `#BF3424`, navy `#1B1C51`, navy profundo `#13143A`.

Tokens por tema (variáveis CSS usadas em todas as páginas):

| Token | Light | Dark |
| --- | --- | --- |
| `--bg` | `#FFFFFF` | `#0D0E24` |
| `--surface` | `#F4F4F8` | `#16173A` |
| `--card` | `#FFFFFF` | `#1D1E48` |
| `--text` | `#1B1C51` | `#F2F2FA` |
| `--muted` | `#4A4B7A` | `#B9BADB` |
| `--border` | `#E6E6EF` | `#272960` |
| `--border2` | `#C9CAE0` | `#3A3C7A` |
| `--band` | `#1B1C51` | `#1B1C51` |
| `--kicker` | `#B83324` | `#FF8A7D` |

Rodapé: light com fundo `#F4F4F8`; dark com fundo `#08091A` e borda `#272960`. As restantes variáveis estão no objeto `foot` de cada ficheiro-fonte.

A homepage tem uma paleta mais rica (bandas navy e coral). Consulta o objeto de paleta em `Main.dc.html`.

### Tipografia

- **Títulos:** Montserrat 800, com `letter-spacing` negativo (H1 entre 58 e 60px, cerca de −0.035em).
- **Corpo:** Inter, 15 a 19px, `line-height` entre 1.55 e 1.6.
- **Detalhes de código:** JetBrains Mono. Usada em kickers (`// insights`), chips, contadores e terminais.

### Componentes recorrentes

- **Kicker:** texto mono pequeno na cor `--kicker`, no formato `// secção`.
- **Botões:** `.btn-coral` é o primário (fundo `#D8402F`, raio 12px, 52px de altura). `.btn-line` é o secundário (contorno de 1.5px). Alvos de toque com pelo menos 44px.
- **Cartões:** raio entre 18 e 28px, borda de 1px em `--border`. No hover sobem 2 a 4px e ganham sombra.
- **Chips e pills de filtro:** raio 999px. O estado ativo usa `aria-pressed="true"`.
- **Capas geradas dos artigos:** cor por categoria (eng `#1B1C51`, biz `#D8402F`, start `#2A2C6E`, ven `#13143A`), padrão de pontos, um glifo grande translúcido e um snippet de código.
- **Chavetas** `{ }`**:** como elemento decorativo, nunca podem quebrar linha (`white-space: nowrap`). Ver §8.

### Cabeçalho (igual em todas as páginas)

- **Posicionamento:** sticky, com fundo **sólido** (`--bg`, sem transparência nem blur) e borda inferior.
- **Logo animado:** `assets/brand/logo-animated.gif`. Em light usa `mix-blend-mode: multiply`. Em dark usa `filter: invert(1) hue-rotate(180deg) saturate(1.3); mix-blend-mode: screen`. Com `prefers-reduced-motion` mostra o logo estático (`logo.png` / `logo-white.png`).
- **Navegação:** Início, Preços, Betacode Ventures, Insights. O link ativo fica coral e sublinhado.
- **Seletores:** segmentado PT | EN, botão de tema (sol/lua) e CTA coral "Contacto".

### Rodapé (igual em todas as páginas)

- **Conteúdo:** logo, tagline, coluna de navegação e coluna social (Facebook, Instagram, X/Twitter, GitHub).
- **Faixa de apoios:** logos IEFP, Pessoas 2030, Portugal 2030 e UE. Cada um tem versão **light** e **dark** em `assets/funding/`. Não há caixa branca por trás dos logos.
- **Texto de financiamento** e, por baixo, copyright e `{ feito em Portugal }`.

---

## 5. Páginas

### 5.1 Homepage (`Main.dc.html`)

As secções, por ordem:

1. **Hero**
   - Slogan "Software que transforma o seu negócio." com o subtítulo longo.
   - CTAs: Começar um projeto, Estimar preço e Ver como ajudamos (âncora para `#servicos`).
   - Terminal animado à direita, que escreve continuamente comandos relacionados com código.
2. **Clientes:** UNICEF, Evolve, Tymber, Rupeal Group e Coach ID.
3. **"O que fazemos"**
   - Tabs: Negócios tradicionais, Empresas tecnológicas, Startups, Betacode Ventures.
   - Cada tab tem a sua própria animação CSS relacionada com o conteúdo, mais serviços e um CTA.
4. **Banda Betacode Ventures:** co-fundador técnico pago em equity.
5. **Equipa:** "A equipa por trás do código", com uma grelha de 8 fotos e enquadramentos (`object-position`) já afinados.
6. **Insights:** cartões com avatares dos autores.
7. **CTA final** com foto.
8. **Rodapé.**

Os enquadramentos das fotos foram afinados um a um. Respeita os valores de `object-position` do ficheiro-fonte.

### 5.2 Calculadora de preços (`Pricing.dc.html` + `docs/calculadora-precos.md`)

Wizard de 5 passos: **O seu negócio → Contexto → Objetivo → Estimativa → Proposta**.

- **Regras de negócio:** todas as ramificações e valores estão em `docs/calculadora-precos.md` e implementados na lógica do ficheiro-fonte.
- **Preços:** não se mostram no início. O wizard acompanha o utilizador e só revela a estimativa no passo 4.
- **Opções:** linhas de largura total, com ícone, título, descrição e seta.
- **Estimativa:**
  - Tabs fixas por serviço, para não haver saltos ao trocar de serviço.
  - Cartões com estrutura e altura uniformes, para a caixa não oscilar de tamanho.
  - Cada serviço tem a sua animação.
- **Proposta:** formulário de contacto com pills "quando quer começar".
- **Fim:** ecrã de sucesso depois do envio.
- **Voltar atrás:** voltar numa pergunta apaga a resposta dessa pergunta, e mudar o tipo de negócio limpa o ramo anterior (como no documento de regras).

### 5.3 Betacode Ventures (`Ventures.dc.html`)

- **Hero navy** com um anel animado de 0 a 100%.
- **3 passos** do processo.
- **Secção de parceria** em duas colunas, com a animação de "handshake" entre o fundador e a Betacode.
- **Caso Coach ID** (`#coachid`), com kicker `// resultados`:
  - **100+** clientes na primeira semana.
  - **60+** clientes pagantes.
- **Formulário de candidatura** (`#candidatura`), com campo de fase da startup e ecrã de sucesso.

### 5.4 Insights (`Insights.dc.html`)

- **Filtros** com contadores: Todos, Engenharia, Negócio, Startups, Ventures.
- **Pesquisa** em tempo real no título e no resumo.
- **Destaque:** o artigo mais recente aparece em cartão grande. Hoje é "A era agêntica do software".
- **Grelha** com os restantes artigos.
- **Estado vazio** com botão "Ver todos os artigos".
- **Dois CTAs:** Betacode Ventures e contacto/preço.
- **Rodapé.**

### 5.5 Artigo (`Article.dc.html`)

- **Topo:**
  - Breadcrumb.
  - Categoria, H1 e lead.
  - Autor com avatar, data e tempo de leitura.
  - Capa gerada.
- **Corpo em duas colunas:**
  - À esquerda, sticky: índice (TOC) gerado a partir dos H2, com âncoras `#s1`, `#s2`…, e uma caixa "Em resumo".
  - À direita: o texto.
- **Tipos de bloco de conteúdo:** `p`, `h` (H2 numerado), `ul`, `ol`, `q` (citação) e `note` (caixa de destaque com título).
- **Final:**
  - Cartão do autor com bio.
  - CTA: para Ventures nas categorias Ventures e Startups, para contacto nas restantes.
  - "Continue a ler" com 2 artigos relacionados (mapa `REL`).
  - Rodapé.

### 5.6 Contacto (`Contact.dc.html`)

- **Coluna esquerda:**
  - Título e intro.
  - Cartão de email com botão "copiar".
  - Cartão de telefone (`tel:`).
  - Mapa ilustrado em SVG: Madan Parque com pino, campus da FCT NOVA, Al. Timor Lorosae, N377-1 e R. Lino Lima. Abre no Google Maps.
- **Coluna direita, formulário:**
  - Barra tipo terminal que escreve `$ betacode contact --topic "…"` conforme o assunto escolhido.
  - Assuntos em pills: Novo projeto, Modernizar software, Reforçar a equipa, Betacode Ventures, Outro assunto. O placeholder da mensagem muda com o assunto.
  - Campos: Nome, Email, Telefone (opcional), Empresa (opcional), Mensagem (mínimo 10 caracteres, contador /2000).
  - Erros inline por campo depois da primeira tentativa de envio.
  - Ecrã de sucesso personalizado com o primeiro nome e 3 passos do que acontece a seguir.
- **Em baixo:** "Ainda não está pronto para escrever?", com cartões para Ventures e para a calculadora.

Dados de contacto:

- **Email:** info@betacode.tech
- **Telefone:** +351 919 245 764
- **Morada:** Madan Parque, Rua dos Inventores, 2825-182 Caparica, Portugal

---

## 6. Conteúdo dos artigos

A copy completa PT/EN dos 7 artigos está no objeto `ART` em `docs/source/Article.dc.html`. Cada artigo tem:

- `cat`, `by`, `mins`, `date`, `glyph`, `code`
- `title`, `lead`, `take` (pontos do "Em resumo")
- `body`: lista de blocos

Migra cada artigo para um ficheiro MDX por língua (ou para o CMS) com este frontmatter:

```yaml
slug, title, lead, category, author, date, readingTime, takeaways[], glyph, coverCode, related[]
```

Para cada artigo:

- **SEO:** `<title>`, `meta description` (usar o lead), Open Graph e `hreflang` PT/EN.
- **Dados estruturados:** JSON-LD `Article`, com autor e data.
- **Listagem:** ordenada por data, com o mais recente em destaque.

---

## 7. Formulários (backend a ligar)

No protótipo os três formulários só validam e mostram o ecrã de sucesso. Em produção:

| Formulário           | Página                           | Campos                                                                             |
| -------------------- | -------------------------------- | ---------------------------------------------------------------------------------- |
| Contacto             | `/contact`                       | topic, name, email, phone, company, message                                        |
| Pedido de proposta   | `/pricing` (passo 5)             | respostas do wizard + estimativa + name, email, website, descrição, quando começar |
| Candidatura Ventures | `/betacode-ventures#candidatura` | campos do ficheiro-fonte, incluindo a fase da startup                              |

Requisitos:

- **Validação:** no cliente e no servidor.
- **Anti-spam:** honeypot e rate limit (ou Turnstile/reCAPTCHA invisível).
- **Envio:** email para info@betacode.tech e/ou CRM. Email de confirmação para o utilizador, porque o ecrã de sucesso do contacto diz que foi enviada uma confirmação.
- **Estados:** a enviar (botão desativado) e erro de envio com mensagem amigável.
- **Analytics:** eventos de conversão por formulário e por passo do wizard.

---

## 8. Regras que não se podem quebrar

### Copy

- **Sem travessões (—)** nem frases de contraste forçado ("não é X, é Y"). A copy não pode soar a texto gerado por IA.
- **Não usar "seniores".** A Betacode oferece vários níveis de experiência.
- **Sem a promessa "MVP em 3 meses" na homepage.** O título do artigo do MVP mantém-se porque é o título original.
- **Coach ID:**
  - Nunca chamar "produto v2".
  - Dizer que foi uma reconstrução do produto de raiz.
  - Números: **100+ clientes na primeira semana** e **60+ clientes pagantes**.
- **Slogan da homepage:** "Software que transforma o seu negócio."
- **Línguas:** toda a copy existe em PT e EN. Não deixar textos só numa língua.

### Visual

- **Branding:** manter cores, logos e fotos originais da Betacode.
- **App bar:** nunca transparente.
- **Chavetas** `{ }`**:** nunca partem linha.
- **Logos de apoios no rodapé:** versão light e dark e sem fundo branco.
- **Logo:** o logo animado é o GIF fornecido, com fundo branco puro. Não o substituir por uma reconstrução em código.

### Acessibilidade e qualidade

- **Contraste:** AA em light e dark.
- **Foco:** visível em todos os elementos interativos. Alvos com pelo menos 44px.
- **Movimento:** todas as animações respeitam `prefers-reduced-motion`.
- **Semântica:** `alt` em todas as imagens (os textos estão na copy), labels associadas aos campos e `aria-pressed` nos toggles.
- **Responsivo:** até 360px de largura sem scroll horizontal. Os layouts usam flex-wrap e grids `auto-fill`, por isso confirma em mobile.
- **Lighthouse:** 90 ou mais em Performance, Accessibility, Best Practices e SEO.

---

## 9. Notas técnicas sobre os ficheiros-fonte

- `Main.dc.html` tem CSS e lógica de uma versão anterior do logo, reconstruída em código (`.blogo-word`, `.bm-bin`, `bc-digits.ttf`, wordmarks). Essa versão **não é usada**: o cabeçalho usa o GIF. Não a implementes.
- Nos ficheiros-fonte, os links usam URLs reais do site (`https://www.betacode.tech/pt/...`) ou nomes de artboards (`ArtLean.dc.html`). Em produção, usa as rotas da tabela do §3.
- As cores de tema vivem num objeto `P` (light/dark) transformado em variáveis CSS. Implementa-as como variáveis em `:root` e `[data-theme="dark"]`.
- As fontes Google não carregam no ambiente onde as capturas foram tiradas. Os screenshots em `docs/screenshots/` mostram por isso fontes de sistema no lugar de Montserrat e Inter. O design final usa as fontes do §4.

---

## 10. Pontos em aberto (confirmar com a Betacode antes de publicar)

1. **Logo da UE no rodapé:** o ficheiro é de cofinanciamento **FEDER**, mas o texto fala em **FSE+**. Confirmar qual está correto e trocar o logo ou o texto.
2. **Contacto, assunto "Reforçar a equipa":** confirmar que deve existir.
3. **Contacto, prazo de resposta:** não está indicado. Se houver um compromisso real (por exemplo, "até 1 dia útil"), acrescentar à intro e ao ecrã de sucesso.
4. **Contacto, ecrã de sucesso:** os 3 passos (lemos, respondemos, marcamos conversa) são uma proposta. Confirmar o processo real.
5. **Artigo "A era agêntica do software":** a nota sobre o próximo passo do assistente da Coach ID (planos de treino completos com aprovação do treinador) tem de ser confirmada ou removida.
6. **Política de privacidade:** o formulário diz que os dados só servem para responder ao pedido. Ligar à política de privacidade e confirmar a conformidade com o RGPD.

---

## 11. Checklist de aceitação

- [ ] As 12 páginas (5 + 7 artigos) existem em `/pt` e `/en`, com copy idêntica ao protótipo.
- [ ] Light e dark em todas as páginas; a escolha persiste entre páginas e não há flash ao carregar.
- [ ] Cabeçalho e rodapé idênticos em todas as páginas.
- [ ] Wizard de preços segue `docs/calculadora-precos.md` em todas as ramificações e não mostra preços antes do passo 4.
- [ ] Filtros, pesquisa e estado vazio dos Insights funcionam.
- [ ] Artigos com TOC, âncoras, "Em resumo", relacionados e CTA correto por categoria.
- [ ] 3 formulários ligados ao backend, com validação, anti-spam, confirmação e ecrãs de sucesso.
- [ ] Animações (terminal, tabs, anel, handshake, mapa) funcionam e respeitam `prefers-reduced-motion`.
- [ ] SEO por página (title, description, OG, hreflang, sitemap, JSON-LD nos artigos).
- [ ] Comparação visual com `docs/screenshots/` a 1440px e verificação em mobile (360–430px).
- [ ] Pontos em aberto do §10 resolvidos com a Betacode.
