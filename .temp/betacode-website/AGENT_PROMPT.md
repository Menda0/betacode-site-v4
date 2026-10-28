# Prompt para o agente de IA

Copia o texto abaixo para o teu agente, com a pasta `betacode-website/` disponível no repositório ou no contexto dele.

---

Vais implementar o redesign do website da Betacode (betacode.tech) no nosso projeto.

A pasta `betacode-website/` contém o protótipo aprovado, que é a especificação:

- **HTML navegável** de todas as páginas: homepage, calculadora de preços, Betacode Ventures, Insights, 7 artigos e contacto.
- **Assets finais** (logos, fotos, avatares, logos de apoios light/dark).
- **Screenshots de referência** em `docs/screenshots/`.
- **Ficheiros-fonte** com toda a copy PT/EN em `docs/source/`.
- **Regras da calculadora de preços** em `docs/calculadora-precos.md`.

Antes de escrever código:

1. Lê `IMPLEMENTATION.md` do início ao fim. Segue as rotas, o design system, o comportamento de cada página, as "Regras que não se podem quebrar" (§8) e a checklist (§11).
2. Serve o protótipo localmente (`python3 -m http.server` dentro de `betacode-website/`) e percorre todas as páginas em PT/EN e light/dark, incluindo os formulários e o wizard.
3. Analisa a stack atual do repositório. Se não houver uma definida, usa Next.js (App Router) + TypeScript, como descrito no §2.

Na implementação:

- **Componentes:** reconstrói as páginas como componentes reais. Não copies o `assets/vendor/dc-runtime.js` nem o padrão `<template>` / `{{…}}`.
- **Copy:** extrai toda a copy PT/EN para ficheiros de i18n, sem alterar o texto. Não acrescentes travessões nem copy nova sem aprovação.
- **Artigos:** move-os para MDX ou para o CMS do projeto.
- **Partilhados primeiro:** cria o cabeçalho, o rodapé, os tokens de tema e os botões/cartões partilhados, e só depois as páginas.
- **Formulários:** liga-os ao backend (§7), com validação, anti-spam e emails de confirmação.
- **Pontos em aberto:** não inventes respostas para os pontos do §10. Deixa-os assinalados com `TODO(betacode):` e lista-os no resumo final.

Trabalha página a página e confirma cada uma contra os screenshots antes de passar à seguinte. No fim, entrega:

- a lista do que foi feito;
- o estado de cada item da checklist §11;
- os pontos em aberto que ficaram por decidir.
