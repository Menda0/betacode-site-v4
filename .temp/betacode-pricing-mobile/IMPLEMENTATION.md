# Calculadora de preços: versão mobile

Especificação para implementar a versão mobile da calculadora de preços da Betacode (`/pt/pricing` e `/en/pricing`).

**Não é uma página nova.** É o layout que a mesma página `/pricing` deve ter em ecrãs estreitos. A lógica, as regras de negócio, os preços e a copy são **exatamente os mesmos** da versão desktop.

---

## 1. Conteúdo do pacote

| Pasta / ficheiro | O que é |
| --- | --- |
| `prototype/index.html` | Protótipo navegável da calculadora mobile (PT/EN, light/dark, fluxo completo) |
| `screenshots/` | Todos os estados, em 390×844 (iPhone 14/15), em `pt-light` e `en-dark` |
| `source/PricingMobile.dc.html` | Fonte do protótipo mobile: markup, CSS e lógica |
| `source/Pricing.dc.html` | Fonte da versão desktop, para comparar (mesma lógica) |
| `calculadora-precos.md` | Regras de negócio da calculadora (ramificações, preços, passos) |

**Ver o protótipo:**

```bash
cd prototype && python3 -m http.server 8080
# abrir http://localhost:8080 com o DevTools em modo telemóvel (390×844)
# extras: ?lang=en  ?theme=dark
```

O protótipo usa um runtime mínimo (`assets/vendor/dc-runtime.js`) só para funcionar. **Não é código para produção.** Os links para outras páginas do site não funcionam neste pacote.

### Screenshots

| Ficheiro | Estado |
| --- | --- |
| `01-inicio-ecra`, `01-inicio-pagina-completa` | Primeira pergunta (tipo de negócio) |
| `02-menu-aberto` | Menu mobile |
| `03-pergunta-2`, `04-pergunta-3` | Perguntas seguintes, com "Voltar" e barra de progresso |
| `05-estimativa-ecra-barra-fixa` | Estimativa com a **barra fixa** em baixo |
| `05-estimativa-pagina-completa` | Estimativa completa |
| `06-proposta-pagina-completa` | Passo da proposta (formulário) |
| `07-proposta-resumo-aberto` | Resumo da estimativa aberto |
| `08-proposta-erros` | Validação dos campos obrigatórios |
| `09-sucesso-pagina-completa` | Ecrã de sucesso |

Nas capturas de "página completa", o cabeçalho e a barra fixa aparecem no seu lugar natural. No telemóvel ficam fixos (topo e fundo).

---

## 2. Abordagem

- **Breakpoint:** a versão mobile aplica-se com **`max-width: 760px`**. Acima disso fica o layout desktop atual.
- **Um só componente:** a calculadora deve ser um componente com estado partilhado. Muda só a apresentação (CSS e, onde indicado, markup condicional). **Não duplicar a lógica** de cálculo.
- **Largura máxima:** em mobile o conteúdo ocupa a largura toda, com 16px de margem lateral.
- **Cores, tipografia e tokens:** iguais ao resto do site (ver `IMPLEMENTATION.md` do site). Montserrat 800 nos títulos, Inter no corpo, JetBrains Mono nos detalhes.

---

## 3. Diferenças em relação ao desktop, por zona

### 3.1 Cabeçalho e menu

São os mesmos da homepage mobile.

- **Cabeçalho:** fixo no topo, 60px de altura, com fundo sólido. Tem o logo animado (32px), o botão coral "Contacto" e o botão de menu (44×44).
- **Menu:**
  - Abre uma folha que desce do topo, com cantos inferiores arredondados (28px) e o fundo da página desfocado por trás.
  - Os links são grandes (Montserrat 800, 32px) e numerados `01`–`05`. "Preços" fica a coral, com `aria-current="page"`.
  - Tem também o seletor PT/EN, o botão claro/escuro, o email e o telefone (`mailto:` / `tel:`), e em baixo "Estimar preço" e "Começar projeto".
  - Fecha no X, ao tocar no fundo e com a tecla Esc.

### 3.2 Introdução

- **Ordem:** kicker `// calculadora de preços`, H1 a 30px, subtítulo a 15px e as 3 promessas com `{ }` (que nunca partem linha).
- **Alinhamento:** tudo alinhado à esquerda. No desktop está centrado.

### 3.3 Progresso (substitui os 5 círculos numerados)

- **Linha de cima:** o nome do passo atual, em 14px bold (ex.: "Financiamento").
- **Barra:** 5 segmentos de 4px de altura, com 4px de espaço entre eles.
  - Concluído: navy (`var(--band)`).
  - Atual: coral `#EB5648`.
  - Por fazer: `var(--border)`.
- **Acessibilidade:** usar `role="progressbar"` com `aria-valuenow`, `aria-valuemin="1"` e `aria-valuemax="5"`.
- **Indicador de passo:** "Passo X de 5" aparece no topo do cartão, à direita. À esquerda fica "← Voltar".

### 3.4 Perguntas

- **Cartão:** padding de 16px e raio de 22px.
- **Títulos:** perguntas a 24px.
- **Opções:** ocupam a largura toda, com ícone de 40px, título a 15px, descrição a 13px e seta à direita. O alvo de toque inteiro é a linha, com pelo menos 72px de altura.
- **Avanço:** tocar numa opção avança sozinho, como no desktop.

### 3.5 Estimativa

- **Tabs dos serviços:** ficam numa fila com scroll horizontal (`scroll-snap`), sem scrollbar visível. Cada tab tem pelo menos 150px de largura e o recomendado mostra o selo "TOP".
- **Cabeçalho do serviço (banda navy):** fica em coluna.
  1. Nome, modelo e selo "Recomendado".
  2. Descrição.
  3. Uma linha separadora, seguida de "custo de desenvolvimento" à esquerda e o preço (26px) à direita.
- **Animação do serviço:** painel de 160px de altura, com a cena escalada a 90%.
- **Corpo:** "Porque recomendamos", chips do que está incluído, os 2 números em grelha de 2 colunas e o "Ver equipa e taxas horárias" recolhível.
- **Barra fixa (novo em mobile):** fica colada ao fundo do ecrã enquanto se lê a estimativa.
  - À esquerda: nome do serviço (12px, cortado com reticências) e preço (17px, 800).
  - À direita: botão coral "Pedir proposta →".
  - Fundo `var(--bg)`, borda superior, sombra suave e respeito pela `env(safe-area-inset-bottom)`.
  - Implementar com `position: sticky; bottom: 0` dentro do bloco da estimativa.

### 3.6 Proposta

- **Resumo da estimativa (novo):** fica no topo, num cartão recolhível (`<details>`), fechado por defeito.
  - Fechado mostra "a sua estimativa" e "Nome do serviço · Preço".
  - Aberto mostra a forma de cálculo, as respostas em chips e "O que acontece a seguir" (3 passos).
  - Substitui a coluna lateral do desktop.
- **Formulário numa só coluna**, com os mesmos campos e regras:
  - Nome\* e E-mail\*.
  - Sítio web (opcional, validado se for preenchido).
  - "Quando gostaria de começar?" com pills.
  - Descrição (opcional).
- **Tamanho dos campos:** os inputs têm `font-size: 16px`, para o iOS não fazer zoom ao focar.
- **Botão:** "Enviar pedido →" ocupa a largura toda (54px), com o texto de privacidade por baixo.
- **Erros:** aparecem por baixo de cada campo depois da primeira tentativa de envio.

### 3.7 Sucesso

- **Conteúdo:** o mesmo do desktop, num só eixo vertical.
- **Botões:** empilhados e em largura total: "Voltar à página inicial", "Betacode Ventures" e "Fazer nova estimativa".

### 3.8 Por baixo do cartão

- **Respostas:** "As suas respostas" em chips.
- **Contacto direto:** um botão de contorno, em largura total, "Prefere conversar? Fale connosco diretamente", que leva a `/contact`.

### 3.9 Rodapé

É o rodapé mobile do site:

- logo, tagline;
- navegação e social em 2 colunas;
- apoios numa grelha 2×2 (versões light e dark, sem fundo branco);
- texto de financiamento e copyright.

---

## 4. Comportamento

- **Mudar de passo:** ao avançar ou recuar, fazer scroll suave até ao topo do cartão, para o título da pergunta ficar visível por baixo do cabeçalho fixo (`scroll-margin-top: 72px`).
- **Botão Voltar do browser:** cada passo deve ter estado no URL (por exemplo `?step=2`) ou usar `history`, para o Voltar do telemóvel recuar um passo em vez de sair da página.
- **Teclado:** quando o teclado virtual está aberto no passo da proposta, a barra fixa da estimativa não aparece (só existe no passo da estimativa).
- **Regras de negócio:** voltar numa pergunta apaga a resposta dessa pergunta, e mudar o tipo de negócio limpa o ramo anterior, como em `calculadora-precos.md`.
- **Movimento reduzido:** com `prefers-reduced-motion` as animações dos serviços ficam estáticas.

---

## 5. Checklist de aceitação

- [ ] A 390px, 375px e 360px não há scroll horizontal.
- [ ] Todos os alvos de toque têm pelo menos 44×44px.
- [ ] A barra de progresso reflete o passo atual (navy, coral e cinzento) e o nome do passo está correto em cada ramo (startup ou negócio estabelecido).
- [ ] A barra fixa da estimativa fica sempre visível ao fazer scroll, mostra o serviço escolhido nas tabs e respeita a safe area do iPhone.
- [ ] As tabs dos serviços deslizam com o dedo e o serviço selecionado fica visível.
- [ ] O resumo recolhível da proposta abre e fecha e mostra as respostas certas.
- [ ] Os inputs não fazem zoom no iOS (16px).
- [ ] As mensagens de erro e o ecrã de sucesso são iguais aos do desktop, em PT e EN.
- [ ] O menu abre e fecha (X, fundo, Esc) e o foco fica preso dentro dele enquanto está aberto.
- [ ] Light e dark estão corretos em todos os estados (comparar com `screenshots/*__en-dark.jpg`).
- [ ] Nenhuma alteração ao desktop acima de 760px.
