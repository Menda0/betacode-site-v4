# Prompt para o agente de IA

Copia o texto abaixo para o teu agente, com a pasta `betacode-intro/` disponível no repositório ou no contexto dele.

---

Adiciona ao nosso website a intro de primeira visita da Betacode, que está na pasta `betacode-intro/`.

1. **Ler o `README.md`** da pasta inteiro. Abrir `demo.html` num servidor local (`python3 -m http.server`) para ver o resultado esperado.
2. **Analisar a stack do projeto** e seguir a secção de instalação correspondente:
   - Copiar `betacode-intro.css` e `betacode-intro.min.js` para a pasta de ficheiros estáticos (por exemplo `public/betacode-intro/`).
   - Carregar os dois no `<head>` do layout base partilhado por **todas** as páginas, de forma **síncrona** (sem `defer`/`async`, sem `next/script` lazy).
   - Passar a língua da página atual em `window.BetacodeIntroConfig.lang` (ou garantir `<html lang="pt|en">`).
   - Em React/Next.js, acrescentar `suppressHydrationWarning` ao `<html>` e ao `<body>`.
3. **Não alterar** a animação, as cores, os tempos nem a copy dos ficheiros. Se for preciso integrar, faz-se só pela configuração e pela API.
4. **Verificar:**
   - **Primeira visita:** a intro aparece sem flash do site antes dela. Ao recarregar, não aparece.
   - **Saltar:** o botão "Saltar intro" e a tecla Esc fecham-na de imediato.
   - **Movimento reduzido:** com `prefers-reduced-motion: reduce` aparece só o logótipo cerca de 1 s.
   - **Bots:** não aparece com user-agent de bot nem no Lighthouse, e o conteúdo da página continua no HTML (SEO).
   - **Inglês:** em `/en` aparece em inglês.
   - **Mobile:** a 390px fica bem enquadrada.
   - **Consola:** sem erros nem avisos de hidratação.
5. **Para testes:** deixar `BetacodeIntro.reset()` documentado, sem botões visíveis em produção.

No fim, diz onde foram colocados os ficheiros e que layout foi alterado, e confirma cada ponto do passo 4.
