# Clarifications — Phase 4: HarmonizAI Enhancements

## Source Plan
- `docs/plans/20260429-phase4-enhancement-plan.md`

## Session 2026-04-29

### Q1: Prioridade inicial
**Pergunta:** Qual fase executar primeiro para maior impacto?
- A) Phase 1 (Lighthouse) — Rápido, melhora performance
- B) Phase 4 (Dark Mode) — Visível, usuários notam
- C) Phase 6 (Algoritmo) — Core do produto, mas demorado

**Recomendação:** A — Lighthouse é quick win e estabelece baseline.

**Final Answer:** **A** — Phase 1 (Lighthouse Audit & Otimização)

**Impact on Plan:** Ordem de execução: 1 → 2 → 3 → 4 → 5 → 6

---

### Q2: Escopo PWA
**Pergunta:** Qual escopo para PWA (Phase 3)?
- A) Completo — Manifest + Service Worker + Offline + Instalação
- B) Básico — Apenas Manifest
- C) Mínimo — Ícone e theme-color apenas

**Recomendação:** B — Básico é suficiente sem complexidade.

**Final Answer:** **A** — PWA Completo (todas as tasks T3.1-T3.4)

**Impact on Plan:** Manter todas as tasks da Phase 3. Tempo: 6-8h.

---

### Q3: Tamanho do dataset
**Pergunta:** Quantos vinhos adicionar?
- A) +50 vinhos — Dobra catálogo, tempo razoável
- B) +100 vinhos — Triplica, mais variedade
- C) Scraping automatizado — Rápido mas qualidade incerta

**Recomendação:** A — +50 é suficiente sem sobrecarregar.

**Final Answer:** **A** — +50 vinhos curados manualmente

**Impact on Plan:** Task T6.3 ajustada para +50 vinhos.

---

### Q4: Animações Phase 2
**Pergunta:** Qual conjunto de animações?
- A) Todas — Ripple + Placeholder + Staggered
- B) Apenas Placeholder rotativo
- C) Apenas Ripple
- D) Nenhuma — Focar em outras phases

**Recomendação:** B — Placeholder tem maior impacto visual.

**Final Answer:** **A** — Todas as animações (T2.1 + T2.2 + T2.3)

**Impact on Plan:** Manter todas as tasks da Phase 2.

---

### Q5: Testes de acessibilidade
**Pergunta:** Como conduzir testes a11y (Phase 5)?
- A) Manuais apenas — NVDA + VoiceOver + Keyboard
- B) Automatizados — axe-core no build
- C) Ambos — Manuais + ferramentas
- D) Deferir — Apenas Lighthouse a11y por enquanto

**Recomendação:** C — Ambos garantem cobertura completa.

**Final Answer:** **C** — Testes manuais + ferramentas automatizadas

**Impact on Plan:** Adicionar task para axe-core ou similar no build.

---

## Coverage Summary

| Category | Status | Notes |
|----------|--------|-------|
| Priorização | ✅ Resolved | Phase 1 primeiro |
| PWA Escopo | ✅ Resolved | Completo (T3.1-T3.4) |
| Dataset | ✅ Resolved | +50 vinhos |
| Animações | ✅ Resolved | Todas as 3 tasks |
| A11y Testing | ✅ Resolved | Manuais + automatizados |

---

## Resumo das Decisões

1. **Execução:** Phase 1 → 2 → 3 → 4 → 5 → 6
2. **PWA:** Completo (manifest + SW + offline + instalação)
3. **Dataset:** +50 vinhos curados manualmente
4. **Animações:** Todas (ripple + placeholder + staggered)
5. **A11y:** Manuais (NVDA/VoiceOver) + automatizados (axe-core)

---

## Próximo Passo

Plano pronto para execução via `/pwf-work-plan`
