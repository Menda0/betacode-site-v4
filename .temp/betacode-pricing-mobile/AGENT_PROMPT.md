# Prompt para o agente de IA

Copia o texto abaixo para o teu agente, com a pasta `betacode-pricing-mobile/` disponível no repositório ou no contexto dele.

---

Implementa a versão mobile da calculadora de preços da Betacode, na página `/pricing` que já existe (PT e EN).

A especificação está na pasta `betacode-pricing-mobile/`.

1. **Ler** o `IMPLEMENTATION.md` do início ao fim, e também o `calculadora-precos.md` (regras de negócio).
2. **Ver o protótipo:** abrir `prototype/` num servidor local (`python3 -m http.server`) com o DevTools em modo telemóvel (390×844). Percorrer o fluxo completo em PT/EN e light/dark.
3. **Comparar** com as capturas em `screenshots/` e com o código-fonte em `source/PricingMobile.dc.html`. Esse ficheiro tem o markup, o CSS e toda a copy.

Regras:

- **Mesma página:** a versão mobile é o layout da mesma página abaixo de **760px**. Não criar uma rota nova nem duplicar a lógica de cálculo; reutilizar o componente/estado que a calculadora desktop já usa.
- **Desktop intacto:** não alterar nada acima de 760px.
- **Copy:** não alterar textos nem preços. Toda a copy PT/EN já existe na calculadora desktop.
- **Elementos novos em mobile:**
  - barra de progresso segmentada;
  - barra fixa "Pedir proposta" no passo da estimativa;
  - resumo recolhível da estimativa no passo da proposta;
  - tabs de serviços com scroll horizontal.
- **Navegação:** o Voltar do browser deve recuar um passo do wizard.
- **Acessibilidade:** alvos de toque com pelo menos 44px, inputs a 16px (sem zoom no iOS), `role="progressbar"`, foco preso no menu aberto e `prefers-reduced-motion`.

No fim, confirma cada ponto da checklist (§5 do `IMPLEMENTATION.md`), com capturas a 390px em light e dark dos passos 1, estimativa, proposta e sucesso.
