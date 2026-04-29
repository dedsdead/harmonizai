# Clarifications — Frontend Visual Refresh

## Source Plan
- `.windsurf/brainstorm-temp/20260429150000-frontend-visual-refresh-brainstorm.md`

## Session 2026-04-29

### Q1: Priorização de animações
- **Pergunta:** Das ~15 animações propostas, quais são must-have vs nice-to-have?
- **Recomendação:** Core (page load + hover states + staggered cards)
- **Resposta Final:** **B) Core** — Page load + hover + staggered cards, equilíbrio custo/benefício
- **Impacto no Plano:** Limitar implementação a 8 animações essenciais, removendo ripple effects complexos e placeholder rotativo

### Q2: Fallback de imagens
- **Pergunta:** Comportamento quando imagens Vivino falham?
- **Recomendação:** Placeholder temático por tipo de vinho
- **Resposta Final:** **B) Placeholder temático** — Cor do tipo de vinho (tinto=vinho, branco=amarelo, etc)
- **Impacto no Plano:** Refinar componente `BottleVisual` existente com gradientes mais elegantes, não implementar retry automático

### Q3: Conformidade de acessibilidade
- **Pergunta:** Qual nível WCAG?
- **Recomendação:** Nível AA (padrão industry)
- **Resposta Final:** **B) Nível AA** — Fontes 16px+, contraste 4.5:1, touch targets 44px
- **Impacto no Plano:** Fonte mínima 14px (não 10px), garantir contraste de cores Burgundy/Gold, testar com Lighthouse a11y

### Q4: Escopo de implementação
- **Pergunta:** Quantas phases implementar?
- **Recomendação:** Phases 1-3 (até Components completo)
- **Resposta Final:** **B) Phases 1-3** — Foundation + Layout + Components
- **Impacto no Plano:** Deixar Phase 4 (Polish: a11y tests, cross-browser) para trabalho futuro incremental

### Q5: Dark mode
- **Pergunta:** Como proceder com dark mode?
- **Recomendação:** Estruturar tokens apenas
- **Resposta Final:** **B) Estruturar tokens** — CSS variables preparadas, sem implementar tema escuro ainda
- **Impacto no Plano:** Definir todas as cores via CSS custom properties (ex: `--color-bg-primary` não `#fff`), usar `oklch()` para facilitar dark mode futuro

---

## Coverage Summary

| Categoria | Status | Notas |
|-----------|--------|-------|
| Functional scope | ✅ Clear | Redesign visual mantendo funcionalidade existente |
| Domain/data model | ✅ Clear | Interface Wine mantida, sem mudanças no contrato API |
| UX/interaction flows | ✅ Resolved | Animações Core definidas (8 essenciais) |
| NFRs | ✅ Resolved | WCAG AA, bundle budget implícito por escolha "Core" |
| Integration boundaries | ✅ Clear | API FastAPI existente, sem mudanças |
| Edge cases | ✅ Resolved | Fallback de imagens: placeholder temático |
| Terminology | ✅ Clear | Sistema de design Burgundy/Olive/Gold aprovado |
| Completion signals | ✅ Resolved | Phases 1-3 definem "done" claramente |

---

## Decisões Consolidadas para /pwf-plan

1. **Animações:** Implementar apenas 8 animações Core (page load stagger, hover states, card staggered entrance, loading shimmer)
2. **Cores:** Usar CSS custom properties com `oklch()` para preparar dark mode futuro
3. **Fontes:** Playfair Display (títulos) + Inter (body), mínimo 14px, target 16px+ para legibilidade
4. **Imagens:** Refinar `BottleVisual` com cores por tipo de vinho, sem retry automático
5. **Escopo:** Phases 1-3 completas, Phase 4 (polish avançado) para trabalho futuro
