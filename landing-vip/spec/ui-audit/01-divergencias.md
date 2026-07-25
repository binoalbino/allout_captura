# Auditoria Figma × Código — Divergências

**Fonte 1 (Golden Source / Figma):** arquivo `ALL-OUT-RUN` (fileKey
`SqkHw0vVKU63kdhIq9lUMe`), frame **"Pagina Captura - All Out"**, nós
`235:340` (Desktop, 1920×2084) e `235:495` (Mobile, 430×3058). Dados
extraídos via `get_design_context` e `get_metadata` nesta sessão.
Data da última modificação do arquivo: **REQUER CONFIRMAÇÃO MANUAL** — as
tools MCP disponíveis não retornam timestamp de última edição.

**Fonte 2 (Implementação atual):** `landing-vip/index.html`,
`landing-vip/style.css`, `landing-vip/script.js` (versão v1, lidos
integralmente nesta sessão).

**Design tokens do Figma:** `get_variable_defs` no nó `235:340` retornou
`{}` — não há Figma Variables publicadas neste arquivo. Todo "Valor
Esperado" abaixo é hex/px literal extraído do `get_design_context`, não um
nome de token.

---

## Tabela de Divergências

| ID | Categoria | Severidade | Nó Figma | Seletor/Elemento no código | Valor Esperado (Figma) | Valor Atual (Código) | Evidência |
|----|----|----|----|----|----|----|----|
| DIV-01 | Layout & Grid | P1 | `235:361` "Entre no Grupo VIP da ALL OUT RUN" | `index.html:21` `.hero__title` | Texto: "Entre no Grupo VIP da ALL OUT RUN" | Texto: "entre em nosso grupo VIP" | `get_design_context(235-340)` nó 235:361 |
| DIV-02 | Layout & Grid | P1 | `235:389` "Frame 1707478858" (card lima envolvendo título+lead dos benefícios) | `index.html:63-70` `.benefits > .container` (sem wrapper) | Bloco título+lead dentro de um card lima arredondado (`rounded-[11px]`, 1068×292 desktop / 328×422 mobile) com foto de fundo | Título e lead renderizados direto no fundo branco da seção, sem card | `get_design_context(235-340)` nó 235:389; `get_design_context(235-495)` nó 235:529 |
| DIV-03 | Layout & Grid | N/A | `235:554`/`235:417` (ordem do CTA secundário) | `index.html:91-95` | Ordem: cards → texto de fechamento → CTA | Mesma ordem | SEM DIVERGÊNCIA |
| DIV-04 | Layout & Grid | N/A | `235:558`/`235:343` (footer) | `index.html:99-113` | logo → links → voltar ao topo | Mesma ordem | SEM DIVERGÊNCIA |
| DIV-05 | Layout & Grid | N/A | `235:356`/`235:497` (hero) | `index.html:14-60` | logo → título → lead → features → form | Mesma ordem | SEM DIVERGÊNCIA |
| DIV-06 | Espaçamento | P2 | `235:356` `gap-[35px]` | `style.css:94` `.hero__content { gap: 24px; }` | `gap: 35px` | `gap: 24px` | `get_design_context(235-340)` nó 235:356 |
| DIV-07 | Espaçamento | P2 | `235:364` `gap-[15px]` (linha) / `235:365` `gap-[16px]` (item) | `style.css:326` (desktop) `gap: 24px 40px;` / `style.css:120` (mobile) `gap: 14px;` | `gap: 15px` entre itens, `16px` interno ao item | `24px 40px` desktop / `14px` mobile | `get_design_context(235-340)` nó 235:364/365 |
| DIV-08 | Espaçamento | N/A | `235:374` `gap-[12px]` | `style.css:144` `.vip-form { gap: 12px; }` | `gap: 12px` | `gap: 12px` | SEM DIVERGÊNCIA |
| DIV-09 | Espaçamento | N/A | `235:396` `gap-[20px_22px]` | `style.css:343` `.benefits__grid { gap: 20px 22px; }` | `gap: 20px 22px` | `gap: 20px 22px` | SEM DIVERGÊNCIA |
| DIV-10 | Espaçamento | P3 | `235:388` `gap-[25px]` (empilhamento card→grid→closing) | `style.css:236,243` margens individuais (`40px`/`40px`) | `gap: 25px` consistente | Margens ad-hoc de `40px` | `get_design_context(235-340)` nó 235:388 |
| DIV-11 | Tipografia | P1 | `235:361` `text-[75px] leading-[90px] tracking-[-2.25px]` | `style.css:324` `.hero__title { font-size: 56px; letter-spacing: -1.7px; }` | `75px` / `-2.25px` | `56px` / `-1.7px` | `get_design_context(235-340)` nó 235:361 |
| DIV-12 | Tipografia | P3 | `235:502` `text-[42.12px] leading-[50.544px] tracking-[-1.2636px]` | `style.css:102-104` `font-size: 42px; line-height: 1.2; letter-spacing: -1.2px;` | `42.12px` / `line-height 50.544px (≈1.2)` / `-1.2636px` | `42px` / `line-height:1.2` / `-1.2px` | `get_design_context(235-495)` nó 235:502 |
| DIV-13 | Tipografia | P1 | `235:361` `font-['Obvia_Condensed:Medium']` | `style.css:16` `--font-heading: 'Obvia Condensed', 'Oswald', 'Arial Narrow', sans-serif;` (sem `@font-face`) | Fonte real `Obvia Condensed Medium` | Fallback `Oswald`/`Arial Narrow` (arquivo `.otf` existe em `C:\Users\Bruno\Desktop\ALLOUT\fonts\fonnts.com-Obvia_Condensed_Medium.otf` mas não está em `landing-vip/` nem declarado) | `get_design_context(235-340)` nó 235:361; `Glob **/*.otf` desta sessão |
| DIV-14 | Tipografia | P2 | `235:382`/`235:420` `text-[18px]` (label do botão) | `style.css:59` `.btn-cta__label { font-size: 16px; }` | `18px` | `16px` | `get_design_context(235-340)` nó 235:382/235:420 |
| DIV-15 | Tipografia | P3 | `235:382` conteúdo literal `"ENTRAR NO GRUPO VIP"` | `index.html:45` conteúdo `"Entrar no Grupo VIP"` + CSS `text-transform: uppercase` | Texto-fonte já em caixa alta | Texto-fonte em caixa mista, uppercase via CSS (resultado visual idêntico) | `get_design_context(235-340)` nó 235:382 |
| DIV-16 | Tipografia | P2 | `235:537` `text-[64px]` (número do card, mobile) | `style.css:260` `.benefit-card__num { font-size: 56px; }` (base/mobile) | `64px` | `56px` | `get_design_context(235-495)` nó 235:537 |
| DIV-17 | Tipografia | P3 | `235:532` `text-[36px]` (título benefícios, mobile) | `style.css:226` `.benefits__title { font-size: 34px; }` (base/mobile) | `36px` | `34px` | `get_design_context(235-495)` nó 235:532 |
| DIV-18 | Cores | P1 | `235:381`/`235:419` gradiente `#45D4EF → #22B8D5 → #11ABC8 → #009DBB` | `style.css:50` `.btn-cta { background: linear-gradient(160deg, var(--color-lime-1), var(--color-lime-2) 50%, var(--color-lime-3)); }` | Gradiente ciano/azul | Gradiente lima (`#f6ffa7 → #d6e07e → #b7c254`) | `get_design_context(235-340)` nó 235:381/235:419 |
| DIV-19 | Cores | P1 | `235:400`/`235:405`/`235:410`/`235:415` `text-[#009dbb]` (número do card) | `style.css:256-262` `.benefit-card__num` sem `color` declarado (herda `#202020`) | `#009dbb` | `#202020` (herdado) | `get_design_context(235-340)` nó 235:400 |
| DIV-20 | Cores | P1 | `235:389` `bg-[#cad65f]` (card envolvendo título+lead) | `style.css` `.benefits` sem background de card (fundo branco da seção) | `#cad65f` no card | Sem card / fundo branco | `get_design_context(235-340)` nó 235:389 |
| DIV-21 | Cores | N/A | `235:366` `bg-[#cad65f]` (dot) | `style.css:8` `--color-lime-accent: #cad65f;` | `#cad65f` | `#cad65f` | SEM DIVERGÊNCIA |
| DIV-22 | Cores | N/A | `#fdfdfc`/`#202020`/`#828284`/`#c8c8c8` (textos) | `style.css:3-14` tokens `:root` | valores idênticos | valores idênticos | SEM DIVERGÊNCIA |
| DIV-23 | Componentes/Estados | N/A | (sem hover/focus no frame estático do Figma) | `style.css:54-55` `.btn-cta:hover/:active` | Sem especificação (design estático) | Adição de `translateY` no hover | SEM DIVERGÊNCIA (adição não conflita com nenhuma evidência) |
| DIV-24 | Componentes/Estados | P2 | `235:362` "Vector 1" (traço decorativo sob o título, 298×3px) | Ausente em `index.html`/`style.css` | Elemento decorativo presente | Elemento ausente | `get_design_context(235-340)` nó 235:362 |
| DIV-25 | Componentes/Estados | N/A | `235:375-380` campos sem `<label>` visível, só placeholder | `index.html:34-42` mesmo padrão | Igual | Igual | SEM DIVERGÊNCIA |
| DIV-26 | Componentes/Estados | N/A | `235:385` checkbox sem estado "checked" visível no frame estático | `style.css:197-200` `.consent input:checked + .consent__box` | Sem especificação | Adição de preenchimento lima no `:checked` | SEM DIVERGÊNCIA (adição não conflita com nenhuma evidência) |
| DIV-27 | Assets | P1 | `imgDsfzfa1` (foto de fundo do card lima) | Não existe em `landing-vip/assets/` | Asset baixado e referenciado | Asset ausente | `get_design_context(235-340)` const `imgDsfzfa1` |
| DIV-28 | Assets | P2 | `imgVector1` (traço decorativo sob o título) | Não existe em `landing-vip/assets/` | Asset baixado e referenciado | Asset ausente | `get_design_context(235-340)` const `imgVector1` |
| DIV-29 | Assets | N/A | `imgFrame10`/`imgFrame11`/`imgGroup14`/`imgSdfdf1` | `landing-vip/assets/logo.svg`, `arrow-top.svg`, `bg-desktop.png`, `bg-mobile.png` | Mesmo conteúdo visual (IDs de export mudam a cada pull, conteúdo não) | Já baixados e em uso | SEM DIVERGÊNCIA |
| DIV-30 | Assets | P1 | `font-['Obvia_Condensed:Medium']` (uso em todo heading) | `landing-vip/` não contém nenhum `.otf`/`.woff` | Fonte real embutida via `@font-face` | Fonte não está dentro do projeto (só existe em `C:\Users\Bruno\Desktop\ALLOUT\fonts\`) | `Glob **/*.otf`, `Glob landing-vip/**/*` desta sessão |
| DIV-31 | Responsividade | P3 | 2 frames Figma (1920px / 430px), sem breakpoint intermediário definido | `style.css:309` `@media (min-width: 1024px)` | REQUER CONFIRMAÇÃO MANUAL (Figma não define o corte exato) | `1024px` | Ausência de 3º frame/anotação de breakpoint no Figma |
| DIV-32 | Responsividade | P2 | `235:366` (40px, desktop) vs `235:506` (30.543px, mobile) — `.dot` | `style.css:130-136` `.dot { width: 30px; height: 30px; }` sem override em `@media (min-width: 1024px)` | `40px` desktop / `~30px` mobile | `30px` fixo em ambos | `get_design_context(235-340)` nó 235:366; `get_design_context(235-495)` nó 235:506 |
| DIV-33 | Responsividade | N/A | Responsividade do card lima (292px→422px) | Subsumido por DIV-02/DIV-20 (componente inexistente) | — | — | N/A — sem componente para auditar responsividade |
| DIV-34 | Interações | N/A | Nenhum protótipo Figma encontrado (frame estático) | `script.js` inteiro | Nenhuma especificação de interação no Figma | Lógica de validação/envio própria do projeto | `get_metadata`/`get_design_context` não retornaram links de protótipo |
| DIV-35 | Interações | N/A | `235:558`/`235:566` ícone estático "voltar ao topo" | `index.html:108` `href="#top"` + `style.css:23` `scroll-behavior: smooth` | Sem especificação de interação | Scroll suave (melhoria não conflitante) | SEM DIVERGÊNCIA |

**Nenhuma divergência classificada como P0 (bloqueante) foi identificada** —
nenhuma diverge de uma Invariante Arquitetural (ver abaixo).

---

## Invariantes Identificadas

- **INV-01** | Payload enviado ao webhook: `{name, email, whatsapp, consent, source: "landing-vip", submittedAt}` | `script.js:30-37` | Imutável porque o workflow n8n em `WEBHOOK_URL` (script.js:2) já está configurado para consumir essas chaves; renomear campos quebra a automação silenciosamente (sem erro visível no client).
- **INV-02** | IDs consumidos via `document.getElementById`/`form.<name>`: `vip-form`, `form-status`, `submit-btn`, `name`, `email`, `whatsapp`, `consent` | `script.js:4-6,16-19`; `index.html:33-58` | Imutável porque renomear/remover quebra o listener de submit e a leitura dos valores, interrompendo toda a captura de lead.
- **INV-03** | `WEBHOOK_URL` real de produção (n8n) | `script.js:2` | Não deve ser revertida para o placeholder nem alterada sem instrução explícita do usuário — é a integração já configurada em produção.
- **INV-04** | Atributo `data-scroll-to="name"` no CTA secundário + listener genérico `[data-scroll-to]` | `index.html:93`; `script.js:61-68` | Renomear o `id="name"` do campo sem atualizar este atributo quebra o scroll-to-form do CTA da seção de benefícios.

## Restrições de Design Identificadas

- **RES-01** | Stack fixo vanilla HTML/CSS/JS, sem build step, sem framework/lib nova (confirmado: nenhum `package.json`/bundler no projeto) | Todo o projeto `landing-vip/` | Introduzir tooling de build quebra a premissa de que o "agente executor" só edita arquivos estáticos diretamente.
- **RES-02** | Convenção de nomenclatura BEM-like já estabelecida (`.hero__title`, `.benefit-card__num`, `.btn-cta__label`) | Qualquer CSS novo em `style.css` | Usar outra convenção (ex.: utilitários estilo Tailwind) quebra a consistência e a legibilidade do arquivo existente.
- **RES-03** | Sem CSS-in-JS e sem `style=""` inline além do que já existe (projeto hoje não usa inline styles) | `style.css` | Misturar fontes de estilo dificulta manutenção e diverge do padrão já fixado na v1.
- **RES-04** | Nenhuma Figma Variable/token publicado no arquivo (`get_variable_defs` → `{}`) | Toda task de cor/tipografia no plano de ação | Valores "esperados" devem ser hex/px literais extraídos do `get_design_context`, nunca nomes de token inventados.
