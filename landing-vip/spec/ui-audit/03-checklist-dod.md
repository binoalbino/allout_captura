# Checklist de Garantia de Objetivo (Definition of Done)

## Fase 6 — Verificação Cruzada (registro do cross-check)

Reli `01-divergencias.md` e `02-plano-de-acao.md` lado a lado.

- Divergências com severidade P1/P2/P3 (21 no total): DIV-01, 02, 06, 07,
  10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 24, 27, 28, 30, 31, 32.
- Cada uma tem pelo menos 1 TASK correspondente em `02-plano-de-acao.md`
  (DIV-01 gerou 2 tasks — TASK-DIV-01-a e TASK-DIV-01-b — por envolver duas
  mudanças atômicas distintas: reestruturação de markup + conteúdo por
  breakpoint). Total de 22 tasks para 21 divergências. **Nenhuma
  divergência órfã.**
- Divergências marcadas `N/A` (DIV-03, 04, 05, 08, 09, 21, 22, 23, 25, 26,
  29, 33, 34, 35) não geram task — são registros de cobertura ("SEM
  DIVERGÊNCIA"), não pendências.
- Toda TASK foi conferida contra as 4 Invariantes (INV-01 a INV-04) e as 4
  Restrições de Design (RES-01 a RES-04) de `01-divergencias.md`:
  nenhuma TASK renomeia/remove IDs de formulário, nenhuma TASK altera o
  payload do webhook ou a `WEBHOOK_URL`, nenhuma TASK introduz build
  step/framework novo, e toda TASK de cor/tipografia usa valor hex/px
  literal (não há tokens Figma a referenciar — RES-04). **Zero conflitos.**

---

## Checklist

- [x] Todas as divergências de `01-divergencias.md` possuem TASK correspondente
- [x] Nenhuma TASK viola uma Invariante Arquitetural listada
- [x] Nenhuma TASK viola uma Restrição de Design listada
- [x] Escopo tecnológico mantido (zero novas dependências introduzidas — apenas 2 novos arquivos de asset estático: fonte `.otf` e 2 imagens)
- [x] Toda TASK tem critério de aceite binário e não-ambíguo (exceção documentada: TASK-DIV-31, que é uma task de *confirmação manual* por design não definir o valor — o próprio critério de aceite exige registrar a decisão, não um valor cego)
- [x] As 8 dimensões da Fase 3 foram auditadas (Layout & Grid, Espaçamento, Tipografia, Cores, Componentes/Estados, Assets, Responsividade, Interações — cada uma com pelo menos um registro em `01-divergencias.md`)
- [x] Lista de TASK-IDs P0/BLOQUEANTE, para priorização do executor: **nenhuma** — esta auditoria não encontrou divergências que violem uma Invariante Arquitetural.

### Ordem de execução recomendada (P1 → P2 → P3, respeitando dependências)

**Status em 2026-07-24: as 22 tasks foram executadas — 21 divergências
resolvidas.** Todas as marcações `[ ] Pendente` em `02-plano-de-acao.md`
foram atualizadas para `[x] Concluído`, com notas nas tasks onde houve
efeito colateral (TASK-DIV-14 e TASK-DIV-12 aplicadas junto com
TASK-DIV-18 e TASK-DIV-01-a/b, respectivamente, por estarem nas mesmas
regras CSS) ou decisão registrada em comentário (TASK-DIV-31 — breakpoint
`1024px` mantido).

1. ✅ TASK-DIV-30 (asset da fonte)
2. ✅ TASK-DIV-13 (depende de DIV-30)
3. ✅ TASK-DIV-01-a
4. ✅ TASK-DIV-01-b (depende de DIV-01-a)
5. ✅ TASK-DIV-11
6. ✅ TASK-DIV-27 (asset do fundo do card)
7. ✅ TASK-DIV-02 (wrapper do card)
8. ✅ TASK-DIV-20 (depende de DIV-02)
9. ✅ TASK-DIV-19
10. ✅ TASK-DIV-18 (+ TASK-DIV-14 aplicada junto)
11. ✅ TASK-DIV-28 (asset do traço decorativo)
12. ✅ TASK-DIV-24 (depende de DIV-28)
13. ✅ TASK-DIV-06
14. ✅ TASK-DIV-07
15. ✅ TASK-DIV-14 (aplicada junto com DIV-18)
16. ✅ TASK-DIV-16
17. ✅ TASK-DIV-32
18. ✅ TASK-DIV-15
19. ✅ TASK-DIV-17
20. ✅ TASK-DIV-12 (depende de DIV-01-a/b — aplicada junto com DIV-01-a/b)
21. ✅ TASK-DIV-10 (depende de DIV-02)
22. ✅ TASK-DIV-31 (confirmação manual, sem dependência técnica — decisão: manter `1024px`)

---

## Protocolo de Verificação Final

Após a execução das 22 tasks acima por um agente executor (em sessão
futura), repetir a **Fase 3** (auditoria comparativa das 8 dimensões)
contra os arquivos `index.html`/`style.css`/`script.js` já atualizados,
usando novamente `get_design_context` nos nós `235:340` (Desktop) e
`235:495` (Mobile) como fonte de verdade. Preencher a coluna "Status" de
cada TASK como ✅ Confirmado ou ❌ Divergente ainda, e gerar
`04-verificacao-final.md` no mesmo formato de tabela de
`01-divergencias.md`, mostrando **apenas** os itens que restarem
divergentes (se todas as 22 tasks forem aplicadas corretamente, a tabela
final deve conter zero linhas de divergência, apenas os registros "SEM
DIVERGÊNCIA" herdados).
