# Betacode — intro de primeira visita

Animação de entrada de cerca de 5,5 s que aparece **uma única vez** por visitante, na primeira visita ao site.

**Características:**

- **Sem dependências:** CSS + JS puro. Funciona com qualquer stack: HTML estático, Next.js, WordPress, CakePHP, etc.
- **Logótipos embutidos** no JS, sem pedidos extra.
- **PT e EN**, com deteção automática pela língua do `<html lang>`.
- **Saltar:** com botão ou com a tecla Esc.
- **Movimento reduzido:** respeita `prefers-reduced-motion`.
- **Bots:** não aparece a motores de busca, Lighthouse nem browsers automatizados.

## Ficheiros

| Ficheiro | Para quê |
| --- | --- |
| `betacode-intro.css` | Estilos e animações (prefixo `bci-`, não colide com o site) |
| `betacode-intro.min.js` | Script para produção (~44 KB, com os 2 logótipos em base64) |
| `betacode-intro.js` | O mesmo script, legível |
| `demo.html` | Página de teste com botões para repetir a intro |
| `assets/` | Os PNG dos logótipos (só referência; o JS já os traz embutidos) |

**Testar:** dentro desta pasta, correr `python3 -m http.server 8080` e abrir http://localhost:8080/demo.html. Para inglês: `demo.html?lang=en`.

---

## Instalação

### HTML / qualquer site (PHP, WordPress, etc.)

1. Copia a pasta para o site, por exemplo para `/betacode-intro/`.
2. Acrescenta isto no `<head>` de **todas as páginas**, o mais acima possível e **sem `defer` nem `async`**:

```html
<link rel="stylesheet" href="/betacode-intro/betacode-intro.css">
<script src="/betacode-intro/betacode-intro.min.js"></script>
```

O script arranca sozinho. O site deve ter `<html lang="pt">` ou `<html lang="en">`.

### Next.js (App Router)

1. Copia `betacode-intro.css` e `betacode-intro.min.js` para `public/betacode-intro/`.
2. No `app/[locale]/layout.tsx` (ou no `app/layout.tsx`):

```tsx
export default function RootLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  return (
    <html lang={params.locale} suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="/betacode-intro/betacode-intro.css" />
        <script
          dangerouslySetInnerHTML={{ __html: `window.BetacodeIntroConfig={lang:${JSON.stringify(params.locale)},mode:'once'};` }}
        />
        <script src="/betacode-intro/betacode-intro.min.js" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
```

- **Next.js 15+:** `params` é uma Promise, por isso usa `const { locale } = await params` num layout `async`.
- **`suppressHydrationWarning` no `<html>` e no `<body>`:** é necessário porque a intro acrescenta uma classe ao `<html>` e um elemento ao `<body>` antes de o React hidratar.
- **Script normal no `<head>`:** usa-se um `<script>` normal, e não `next/script` com `lazyOnload`/`afterInteractive`, para a intro tapar a página antes do primeiro paint.

### Nuxt, Astro, SvelteKit, etc.

O mesmo princípio: CSS e script no `<head>` do layout base, carregados de forma síncrona.

---

## Configuração (opcional)

Define-se **antes** do script:

```html
<script>
  window.BetacodeIntroConfig = {
    lang: 'pt',              // 'pt' | 'en'. Por defeito lê <html lang>
    mode: 'once',            // 'once' (padrão) | 'always' (testes) | 'off'
    storageKey: 'bc-intro-v1', // mudar para 'bc-intro-v2' volta a mostrar a todos
    lockScroll: true,        // bloqueia o scroll durante a intro
    skipBots: true,          // não mostra a crawlers/Lighthouse
    zIndex: 2147483000,
    onDone: function () {}   // chamado no fim
  };
</script>
```

## API

```js
BetacodeIntro.start({ force: true })     // mostra outra vez, ignorando o "só uma vez"
BetacodeIntro.start({ force: true, lang: 'en' })
BetacodeIntro.skip()                     // abre os painéis já
BetacodeIntro.reset()                    // esquece que o visitante já viu
BetacodeIntro.hasSeen()                  // true/false

document.addEventListener('betacode:intro-done', () => { /* ex.: iniciar animações do hero */ });
```

---

## Linha temporal

Fundo navy `#13143A`, coral `#EB5648`.

| Tempo | O que acontece |
| --- | --- |
| 0–0,9 s | No canto escreve-se `$ betacode build --ola`. As chavetas `{ }` entram das laterais. |
| 0,5–2,5 s | Fragmentos de código flutuam e são sugados para o centro. |
| 2,3–2,7 s | As chavetas fecham-se: flash, dois anéis de choque e brilho coral. |
| 2,7–3,7 s | O símbolo `{B` nasce do impacto, desliza e revela BETACODE. |
| 3,75 s | Surge o slogan "Software que transforma o seu **negócio.**" |
| Sempre | Contador `build 000→100%`, barra coral e log ✓ estratégia, design, engenharia, lançamento. |
| 4,15–5,5 s | Uma costura coral acende ao centro e os painéis abrem para os lados, como chavetas, revelando o site. |

## Comportamento

- **Uma vez:** grava `bc-intro-v1` em `localStorage`, ou num cookie se o `localStorage` estiver bloqueado.
- **Sem flash:** a classe `bci-pending` no `<html>` tapa o site com navy até a intro montar.
- **Movimento reduzido:** mostra só o logótipo cerca de 1 s e faz fade.
- **Mobile (≤760px):** o palco escala para 58% e o log da direita fica escondido.
- **Fim:** remove todo o DOM da intro, repõe o scroll e emite `betacode:intro-done`.
- **Fontes:** usa Montserrat, Inter e JetBrains Mono se o site as tiver carregadas, com fallbacks de sistema.
