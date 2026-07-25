> Você é um agente executor. Sua única função é aplicar as TASKs abaixo, na
> ordem listada, uma por vez. Não interprete, não melhore, não pule etapas.
> Após aplicar cada TASK, marque seu Status como [x] Concluído. Se uma TASK
> depender de outra ainda pendente, pare e sinalize o bloqueio em vez de
> improvisar uma solução alternativa. Não avance para a próxima TASK antes
> de concluir a atual.

# Plano de Ação — Auditoria Figma × Código (landing-vip)

Ordenado por severidade (P0 primeiro; nenhuma P0 nesta auditoria) e depois
por dependência. Fonte de verdade: nós Figma `235:340` (Desktop) e `235:495`
(Mobile) — ver `01-divergencias.md`.

---

## P1 — Crítico

### TASK-DIV-30
- **Origem:** DIV-30
- **Arquivo alvo:** `landing-vip/assets/fonts/obvia-condensed-medium.otf` (novo) + `landing-vip/style.css`
- **Localização:** novo bloco `@font-face` no topo de `style.css`, antes de `:root`
- **Ação:** Adicionar
- **Valor atual:** Arquivo de fonte não existe dentro de `landing-vip/`; `--font-heading` sem `@font-face`.
- **Valor novo:** Copiar `C:\Users\Bruno\Desktop\ALLOUT\fonts\fonnts.com-Obvia_Condensed_Medium.otf` para `landing-vip/assets/fonts/obvia-condensed-medium.otf` e adicionar:
  ```css
  @font-face {
    font-family: 'Obvia Condensed';
    src: url('assets/fonts/obvia-condensed-medium.otf') format('opentype');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }
  ```
- **Dependências:** Nenhuma
- **Critério de aceite:** o arquivo `landing-vip/assets/fonts/obvia-condensed-medium.otf` existe e `style.css` contém a regra `@font-face` acima.
- **Status:** [ ] Pendente

### TASK-DIV-13
- **Origem:** DIV-13
- **Arquivo alvo:** `style.css`
- **Localização:** `:root { --font-heading: ... }` (linha 16)
- **Ação:** Substituir
- **Valor atual:** `--font-heading: 'Obvia Condensed', 'Oswald', 'Arial Narrow', sans-serif;`
- **Valor novo:** `--font-heading: 'Obvia Condensed', 'Oswald', 'Arial Narrow', sans-serif;` (mantém fallback, mas passa a resolver para a fonte real porque `@font-face` da TASK-DIV-30 já registra o nome `'Obvia Condensed'`)
- **Dependências:** TASK-DIV-30
- **Critério de aceite:** com `@font-face` presente, qualquer elemento com `var(--font-heading)` renderiza com `Obvia Condensed` (verificável via DevTools → Computed → font-family carregada).
- **Status:** [ ] Pendente

### TASK-DIV-01-a
- **Origem:** DIV-01
- **Arquivo alvo:** `index.html`
- **Localização:** `<h1 class="hero__title">` (linha 21)
- **Ação:** Substituir
- **Valor atual:** `<h1 class="hero__title">entre em nosso<br>grupo VIP</h1>`
- **Valor novo:** `<h1 class="hero__title"><span class="hero__title-desktop">Entre no Grupo VIP da ALL OUT RUN</span><span class="hero__title-mobile">Entre no Grupo VIP da ALLOUT</span></h1>`
- **Dependências:** Nenhuma
- **Critério de aceite:** o elemento `.hero__title` contém os dois `<span>` com os textos exatos acima.
- **Status:** [ ] Pendente

### TASK-DIV-01-b
- **Origem:** DIV-01
- **Arquivo alvo:** `style.css`
- **Localização:** novo par de regras junto a `.hero__title` (base ~linha 98) e dentro de `@media (min-width: 1024px)` (~linha 324)
- **Ação:** Adicionar
- **Valor atual:** (regras não existem)
- **Valor novo:**
  ```css
  .hero__title-desktop { display: none; }
  .hero__title-mobile { display: inline; }
  ```
  dentro de `@media (min-width: 1024px)`:
  ```css
  .hero__title-desktop { display: inline; }
  .hero__title-mobile { display: none; }
  ```
- **Dependências:** TASK-DIV-01-a
- **Critério de aceite:** abaixo de 1024px só "Entre no Grupo VIP da ALLOUT" fica visível; a partir de 1024px só "Entre no Grupo VIP da ALL OUT RUN" fica visível.
- **Status:** [ ] Pendente

### TASK-DIV-11
- **Origem:** DIV-11
- **Arquivo alvo:** `style.css`
- **Localização:** `.hero__title` dentro de `@media (min-width: 1024px)` (linha 324)
- **Ação:** Substituir
- **Valor atual:** `font-size: 56px; letter-spacing: -1.7px;`
- **Valor novo:** `font-size: 75px; letter-spacing: -2.25px;` (e `line-height: 90px;` no lugar de herdar `line-height: 1.2` da regra base)
- **Dependências:** Nenhuma
- **Critério de aceite:** `.hero__title` a partir de 1024px possui `font-size: 75px;`, `letter-spacing: -2.25px;` e `line-height: 90px;`.
- **Status:** [ ] Pendente

### TASK-DIV-27
- **Origem:** DIV-27
- **Arquivo alvo:** `landing-vip/assets/` (novo arquivo) + `style.css`
- **Localização:** baixar asset `imgDsfzfa1` (URL retornada por `get_design_context(235-340)`, expira em ~7 dias a partir desta sessão) para `landing-vip/assets/benefits-bg.png`
- **Ação:** Adicionar
- **Valor atual:** Asset não existe no projeto.
- **Valor novo:** Arquivo `landing-vip/assets/benefits-bg.png` presente e referenciado pela regra criada na TASK-DIV-02/TASK-DIV-20 (`background-image: url("assets/benefits-bg.png")`).
- **Dependências:** Nenhuma
- **Critério de aceite:** o arquivo existe em `landing-vip/assets/benefits-bg.png`.
- **Status:** [ ] Pendente

### TASK-DIV-02
- **Origem:** DIV-02
- **Arquivo alvo:** `index.html`
- **Localização:** dentro de `<main class="benefits"><div class="container">`, antes de `.benefits__grid` (linhas 63-71)
- **Ação:** Adicionar
- **Valor atual:**
  ```html
  <h2 class="benefits__title">Não é só um grupo. É fazer parte da corrida.</h2>
  <p class="benefits__lead"> ... </p>
  <div class="benefits__grid">
  ```
- **Valor novo:** envolver o `<h2>` e o `<p class="benefits__lead">` existentes em um novo wrapper:
  ```html
  <div class="benefits__intro-card">
    <h2 class="benefits__title">Não é só um grupo. É fazer parte da corrida.</h2>
    <p class="benefits__lead"> ... </p>
  </div>
  <div class="benefits__grid">
  ```
  (conteúdo interno do `<h2>`/`<p>` permanece o mesmo, apenas adiciona o wrapper `.benefits__intro-card`)
- **Dependências:** Nenhuma
- **Critério de aceite:** `.benefits__title` e `.benefits__lead` estão aninhados dentro de um elemento `.benefits__intro-card`.
- **Status:** [ ] Pendente

### TASK-DIV-20
- **Origem:** DIV-20
- **Arquivo alvo:** `style.css`
- **Localização:** nova regra `.benefits__intro-card`, próxima a `.benefits__title` (~linha 222)
- **Ação:** Adicionar
- **Valor atual:** (regra não existe)
- **Valor novo:**
  ```css
  .benefits__intro-card {
    position: relative;
    overflow: hidden;
    border-radius: 11px;
    background-color: #cad65f;
    padding: 40px 24px;
    margin-bottom: 25px;
  }
  ```
- **Dependências:** TASK-DIV-02
- **Critério de aceite:** `.benefits__intro-card` existe em `style.css` com `background-color: #cad65f` e `border-radius: 11px`.
- **Status:** [ ] Pendente

### TASK-DIV-19
- **Origem:** DIV-19
- **Arquivo alvo:** `style.css`
- **Localização:** `.benefit-card__num` (linha 256)
- **Ação:** Adicionar
- **Valor atual:**
  ```css
  .benefit-card__num {
    font-family: var(--font-heading);
    font-weight: 600;
    text-transform: uppercase;
    font-size: 56px;
    letter-spacing: -1.7px;
    line-height: 1;
  }
  ```
- **Valor novo:** adicionar a linha `color: #009dbb;` dentro da mesma regra.
- **Dependências:** Nenhuma
- **Critério de aceite:** `.benefit-card__num` possui `color: #009dbb;`.
- **Status:** [ ] Pendente

### TASK-DIV-18
- **Origem:** DIV-18
- **Arquivo alvo:** `style.css`
- **Localização:** `:root` (linhas 5-8) e `.btn-cta` (linha 50)
- **Ação:** Substituir
- **Valor atual:**
  ```css
  --color-lime-1: #f6ffa7;
  --color-lime-2: #d6e07e;
  --color-lime-3: #b7c254;
  ...
  .btn-cta {
    background: linear-gradient(160deg, var(--color-lime-1), var(--color-lime-2) 50%, var(--color-lime-3));
  }
  ```
- **Valor novo:** adicionar novos tokens sem remover os existentes (que continuam em uso nos cards/dots):
  ```css
  --color-cta-1: #45d4ef;
  --color-cta-2: #22b8d5;
  --color-cta-3: #11abc8;
  --color-cta-4: #009dbb;
  ```
  e trocar o `background` de `.btn-cta` para:
  ```css
  background: linear-gradient(160deg, var(--color-cta-1), var(--color-cta-2) 50%, var(--color-cta-3) 75%, var(--color-cta-4));
  ```
- **Dependências:** Nenhuma
- **Critério de aceite:** `.btn-cta` renderiza com o gradiente ciano `#45d4ef → #22b8d5 → #11abc8 → #009dbb`, não mais o gradiente lima.
- **Status:** [ ] Pendente

---

## P2 — Moderada

### TASK-DIV-28
- **Origem:** DIV-28
- **Arquivo alvo:** `landing-vip/assets/` (novo arquivo)
- **Localização:** baixar asset `imgVector1` (URL retornada por `get_design_context(235-340)`, expira em ~7 dias a partir desta sessão) para `landing-vip/assets/title-underline.svg`
- **Ação:** Adicionar
- **Valor atual:** Asset não existe no projeto.
- **Valor novo:** Arquivo `landing-vip/assets/title-underline.svg` presente.
- **Dependências:** Nenhuma
- **Critério de aceite:** o arquivo existe em `landing-vip/assets/title-underline.svg`.
- **Status:** [ ] Pendente

### TASK-DIV-24
- **Origem:** DIV-24
- **Arquivo alvo:** `index.html` + `style.css`
- **Localização:** dentro de `.hero__title` (index.html linha 21) e nova regra `.hero__title-underline`
- **Ação:** Adicionar
- **Valor atual:** Sem elemento decorativo sob o título.
- **Valor novo:** em `index.html`, dentro do `<h1 class="hero__title">`, adicionar `<img src="assets/title-underline.svg" alt="" class="hero__title-underline">`; em `style.css`:
  ```css
  .hero__title-underline { width: 298px; height: 3px; margin-top: 8px; }
  ```
- **Dependências:** TASK-DIV-28
- **Critério de aceite:** `.hero__title-underline` está presente no DOM e referencia `assets/title-underline.svg`.
- **Status:** [ ] Pendente

### TASK-DIV-06
- **Origem:** DIV-06
- **Arquivo alvo:** `style.css`
- **Localização:** `.hero__content` (linha 94)
- **Ação:** Substituir
- **Valor atual:** `gap: 24px;`
- **Valor novo:** `gap: 35px;`
- **Dependências:** Nenhuma
- **Critério de aceite:** `.hero__content` possui `gap: 35px;`.
- **Status:** [ ] Pendente

### TASK-DIV-07
- **Origem:** DIV-07
- **Arquivo alvo:** `style.css`
- **Localização:** `.hero__features` base (linha 120) e dentro de `@media (min-width: 1024px)` (linha 326)
- **Ação:** Substituir
- **Valor atual:** base `gap: 14px;` / desktop `gap: 24px 40px;`
- **Valor novo:** base `gap: 15px;` / desktop `gap: 15px;` (a variação de eixo não existe no Figma — valor único `15px` em ambos os breakpoints)
- **Dependências:** Nenhuma
- **Critério de aceite:** `.hero__features` tem `gap: 15px` tanto na regra base quanto dentro do media query de 1024px.
- **Status:** [ ] Pendente

### TASK-DIV-14
- **Origem:** DIV-14
- **Arquivo alvo:** `style.css`
- **Localização:** `.btn-cta__label` (linha 59)
- **Ação:** Substituir
- **Valor atual:** `font-size: 16px;`
- **Valor novo:** `font-size: 18px;`
- **Dependências:** Nenhuma
- **Critério de aceite:** `.btn-cta__label` possui `font-size: 18px;`.
- **Status:** [ ] Pendente

### TASK-DIV-16
- **Origem:** DIV-16
- **Arquivo alvo:** `style.css`
- **Localização:** `.benefit-card__num` (linha 260, base/mobile)
- **Ação:** Substituir
- **Valor atual:** `font-size: 56px;`
- **Valor novo:** `font-size: 64px;`
- **Dependências:** Nenhuma
- **Critério de aceite:** `.benefit-card__num` (fora do media query de 1024px) possui `font-size: 64px;`.
- **Status:** [ ] Pendente

### TASK-DIV-32
- **Origem:** DIV-32
- **Arquivo alvo:** `style.css`
- **Localização:** `.dot` (linha 130-136) e dentro de `@media (min-width: 1024px)` (novo bloco)
- **Ação:** Ajustar
- **Valor atual:** `.dot { width: 30px; height: 30px; }` sem override desktop.
- **Valor novo:** manter `.dot { width: 30px; height: 30px; }` na base e adicionar dentro de `@media (min-width: 1024px)`:
  ```css
  .dot { width: 40px; height: 40px; }
  ```
- **Dependências:** Nenhuma
- **Critério de aceite:** `.dot` mede 40×40px a partir de 1024px de viewport e 30×30px abaixo disso.
- **Status:** [ ] Pendente

---

## P3 — Cosmética

### TASK-DIV-15
- **Origem:** DIV-15
- **Arquivo alvo:** `index.html`
- **Localização:** `<span class="btn-cta__label">Entrar no Grupo VIP</span>` (linha 45)
- **Ação:** Substituir
- **Valor atual:** `Entrar no Grupo VIP`
- **Valor novo:** `ENTRAR NO GRUPO VIP`
- **Dependências:** Nenhuma
- **Critério de aceite:** o texto-fonte do botão principal do formulário está em caixa alta (resultado visual não muda, pois `text-transform: uppercase` já aplicava).
- **Status:** [ ] Pendente

### TASK-DIV-17
- **Origem:** DIV-17
- **Arquivo alvo:** `style.css`
- **Localização:** `.benefits__title` (linha 226, base/mobile)
- **Ação:** Substituir
- **Valor atual:** `font-size: 34px;`
- **Valor novo:** `font-size: 36px;`
- **Dependências:** Nenhuma
- **Critério de aceite:** `.benefits__title` (fora do media query de 1024px) possui `font-size: 36px;`.
- **Status:** [ ] Pendente

### TASK-DIV-12
- **Origem:** DIV-12
- **Arquivo alvo:** `style.css`
- **Localização:** `.hero__title` base (linhas 102-104)
- **Ação:** Ajustar
- **Valor atual:** `font-size: 42px; line-height: 1.2; letter-spacing: -1.2px;`
- **Valor novo:** `font-size: 42.12px; line-height: 1.2; letter-spacing: -1.2636px;`
- **Dependências:** TASK-DIV-01-a, TASK-DIV-01-b
- **Critério de aceite:** `.hero__title` base possui `font-size: 42.12px;` e `letter-spacing: -1.2636px;`.
- **Status:** [ ] Pendente

### TASK-DIV-10
- **Origem:** DIV-10
- **Arquivo alvo:** `style.css`
- **Localização:** `.benefits__lead` (linha 236) e `.benefits__grid` (linha 243)
- **Ação:** Substituir
- **Valor atual:** `.benefits__lead { margin: 0 auto 40px; }` / `.benefits__grid { margin-bottom: 40px; }`
- **Valor novo:** remover os `margin-bottom` individuais e aplicar `gap: 25px;` + `display: flex; flex-direction: column;` no container pai `.benefits .container` (ou wrapper equivalente já usado)
- **Dependências:** TASK-DIV-02
- **Critério de aceite:** o espaçamento vertical entre `.benefits__intro-card`, `.benefits__grid` e `.benefits__closing` é de `25px` via `gap`, não via margins individuais.
- **Status:** [ ] Pendente

### TASK-DIV-31
- **Origem:** DIV-31
- **Arquivo alvo:** `style.css`
- **Localização:** `@media (min-width: 1024px)` (linha 309)
- **Ação:** Ajustar
- **Valor atual:** `@media (min-width: 1024px)`
- **Valor novo:** **REQUER CONFIRMAÇÃO MANUAL** — o Figma só define 2 frames (1920px / 430px) sem anotação de breakpoint; `1024px` é uma escolha de engenharia razoável já em uso, não uma divergência de valor. Task de confirmação, não de alteração mecânica: validar com o time de design se `1024px` é aceitável ou se deveria ser outro valor (ex.: `768px`, `900px`).
- **Dependências:** Nenhuma
- **Critério de aceite:** decisão registrada (manter `1024px` ou novo valor) documentada em comentário no `style.css` acima da media query.
- **Status:** [ ] Pendente
