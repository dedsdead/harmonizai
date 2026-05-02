---
title: "HarmonizAI Enhancement Roadmap"
type: enhancement
status: active
date: 2026-04-29
phased: true
ticket: HARMONIZAI-ROADMAP-001
---

# HarmonizAI Enhancement Roadmap

**Visão:** Evoluir o HarmonizAI com melhorias de performance, experiência do usuário e funcionalidades avançadas.  
**Data de Criação:** 2026-04-29  
**Última Atualização:** 2026-04-30  
**Status:** Phases 1-5 ✅ Concluídas | Phase 6 ⬜ Próxima

---

## 📋 Status do Roadmap

| Phase | Nome | Status | Score/Métricas |
|-------|------|--------|----------------|
| **1** | Lighthouse Audit & Otimização | ✅ **CONCLUÍDA** | Performance ~99 |
| **2** | Otimizações Avançadas | ✅ **CONCLUÍDA** | FCP -40%, CLS 0 |
| **3** | Animações Avançadas | ✅ **CONCLUÍDA** | Ripple, Placeholder, Staggered |
| **4** | PWA Features | ✅ **CONCLUÍDA** | Manifest, SW, Offline, Install |
| **5** | Dark Mode Completo | ⬜ **PENDENTE** | - |
| **6** | Testes Acessibilidade | ⬜ **PENDENTE** | - |
| **7** | Melhorias Algoritmo | ⬜ **PENDENTE** | - |

**Origem:** `docs/plans/20260429-frontend-visual-refresh-plan.md` - Phase 4 Future Work  
**Clarificações:** `docs/plans/20260429-phase4-enhancement-plan.clarifications.md`  
**Documentação Técnica:** `docs/reports/lighthouse-baseline.md`

---

## 📌 Diretrizes do Projeto

### Decisões Consolidadas

| ID | Questão | Decisão Tomada |
|----|---------|----------------|
| Q1 | Prioridade inicial | **Phase 1** (Lighthouse) → 2 → 3 → 4 → 5 → 6 |
| Q2 | PWA escopo | **Completo** — Manifest + SW + Offline + Instalação |
| Q3 | Dataset | **+50 vinhos** curados manualmente |
| Q4 | Animações | **Todas** — Ripple + Placeholder + Staggered |
| Q5 | A11y testing | **Manuais + Automatizados** — NVDA/VoiceOver + axe-core |

### Estrutura do Roadmap

- **Phases 1-2:** Quick wins de performance e otimização técnica ✅
- **Phases 3-5:** Melhorias de UX e novas funcionalidades
- **Phases 6-7:** Qualidade, acessibilidade e algoritmo

**Complexidade:** Mix de quick wins (Lighthouse) e features avançadas (ML, PWA)

---

---

## ✅ Phase 1: Lighthouse Audit & Otimização (Concluída)

**Objetivo:** Estabelecer baseline de performance e otimizar Core Web Vitals  
**Tempo Estimado:** 2-4 horas  
**Concluída em:** 2026-04-29

### 🎯 Resultados Alcançados

| Métrica | Valor | Score |
|---------|-------|-------|
| Performance | - | **~99** |
| FCP | 0.3s | 1.0 |
| LCP | 0.9s | 0.96 |
| CLS | 0 | 1.0 |

### Tarefas Concluídas

#### T1.1 — Lighthouse Audit ✅
- [x] Criar baseline para documentação
- [x] Performance Score ~99 alcançado
- [x] FCP otimizado para 0.3s

#### T1.2 — Performance ✅
- [x] Preconnect/dns-prefetch para API Railway
- [x] Compress + trailingSlash + reactStrictMode
- [x] next/font/google (FCP -40%)
- [x] Dynamic import WineList

#### T1.3 — Acessibilidade ✅
- [x] Aria-labels em links de ação
- [x] Aria-hidden em ícones decorativos
- [x] Focus visible styles

#### T1.4 — SEO ✅
- [x] Meta description expandida
- [x] Open Graph tags completos
- [x] JSON-LD structured data

---

---

## ✅ Phase 2: Otimizações Avançadas (Concluída)

**Objetivo:** Otimizações de bundle, render-blocking e code splitting  
**Tempo Estimado:** 2-3 horas  
**Concluída em:** 2026-04-30

### 🎯 Resultados Alcançados

| Tarefa | Impacto | Status |
|--------|---------|--------|
| Bundle Analyzer | Análise de dependências | ✅ |
| Dynamic Import | Redução bundle inicial | ✅ |
| next/font/google | **FCP -40%** | ✅ |
| Prefetch API | Warm-up conexão | ✅ |

### Tarefas Concluídas

#### T2.1 — Bundle Analyzer ✅
- [x] @next/bundle-analyzer instalado
- [x] Script `analyze` configurado
- [x] Configuração condicional ANALYZE=true

#### T2.2 — Dynamic Imports ✅
- [x] WineList via next/dynamic
- [x] Skeleton loader criado
- [x] SSR desabilitado

#### T2.3 — next/font/google ✅
- [x] Inter (body) e Playfair Display (display)
- [x] CSS variables atualizadas
- [x] Render-blocking eliminado

#### T2.4 — Prefetch API ✅
- [x] Prefetch API health endpoint
- [x] Preconnect Railway mantido

---

---

## ✅ Phase 3: Animações Avançadas (Concluída)

**Objetivo:** Adicionar micro-interações premium para delight do usuário  
**Tempo Estimado:** 4-6 horas  
**Concluída em:** 2026-04-30  
**Status:** ✅ **CONCLUÍDA**

### 🎯 Resultados

| Tarefa | Implementação | Status |
|--------|---------------|--------|
| T3.1 | Ripple Effect Material Design | ✅ |
| T3.2 | Placeholder rotativo com typing animation | ✅ |
| T3.3 | Staggered badges + hover effects + smooth scroll | ✅ |

### T3.1 — Ripple Effect nos Botões ✅
**Arquivo:** `web/app/components/ui/Button.tsx`

**Implementado:**
- [x] Ripple effect Material Design ao clicar
- [x] CSS animations (@keyframes ripple-animation)
- [x] Funciona em todos os variants
- [x] Respeita prefers-reduced-motion

### T3.2 — Placeholder Rotativo ✅
**Arquivo:** `web/app/components/Harmonizer.tsx`

**Implementado:**
- [x] Array de 7 placeholders rotativos
- [x] Animação digitação (100ms/char) e deleção (50ms/char)
- [x] Pausa automática ao focar no input
- [x] Transição suave entre placeholders

### T3.3 — Staggered Micro-interactions ✅
**Arquivos:** `web/app/components/WineList.tsx`, `Harmonizer.tsx`

**Implementado:**
- [x] Animação staggered para badges (delay 100ms cada)
- [x] Hover effects com scale nos links Vivino/Comprar
- [x] Smooth scroll para resultados em mobile
- [x] Performance mantida (usa CSS transforms)

---

---

## ✅ Phase 4: PWA Features (Concluída)

**Objetivo:** Transformar em Progressive Web App instalável  
**Tempo Estimado:** 6-8 horas  
**Concluída em:** 2026-04-30  
**Status:** ✅ **CONCLUÍDA**

### 🎯 Resultados

| Tarefa | Implementação | Status |
|--------|---------------|--------|
| T4.1 | Web App Manifest completo | ✅ |
| T4.2 | Service Worker com cache | ✅ |
| T4.3 | Offline fallback page | ✅ |
| T4.4 | Install prompt (Android/iOS) | ✅ |

### T4.1 — Web App Manifest ✅
**Arquivos:** `web/public/manifest.json`, `web/app/layout.tsx`

**Implementado:**
- [x] manifest.json completo (name, short_name, icons, theme_color)
- [x] Link rel="manifest" no layout
- [x] Ícone SVG escalável (`logo.svg` com `sizes: "any"`)
- [x] Theme color: Burgundy (#722F37)
- [x] Meta tags Apple iOS

### T4.2 — Service Worker ✅
**Arquivos:** `web/public/sw.js`, `web/app/components/ServiceWorkerRegister.tsx`

**Implementado:**
- [x] Registro automático do SW
- [x] Cache de assets estáticos
- [x] Estratégia: stale-while-revalidate
- [x] Skip API requests (Railway)

### T4.3 — Offline Fallback ✅
**Arquivos:** `web/public/offline.html`

**Implementado:**
- [x] Página offline.html estilizada
- [x] Logo e mensagem amigável
- [x] Botão "Tentar novamente"
- [x] Auto-redirect quando online

### T4.4 — Install Prompt ✅
**Arquivo:** `web/app/components/InstallPrompt.tsx`

**Implementado:**
- [x] Detectar beforeinstallprompt (Android/Chrome)
- [x] Banner sutil com animação
- [x] Suporte iOS com instruções
- [x] Persistência de dismiss no localStorage

### ✅ Testes Realizados

| Teste | Resultado |
|-------|-----------|
| Build de produção | ✅ Passou |
| Manifest válido | ✅ Chrome DevTools |
| Service Worker registrado | ✅ Aplicação funciona offline |
| Instalação PWA | ✅ Prompt exibido corretamente |
| Fallback offline | ✅ Página offline.html carrega |

---

---

## ✅ Phase 5: Dark Mode (Concluída)

**Objetivo:** Toggle de tema escuro/claro com persistência + Settings UI  
**Tempo Estimado:** 6-8 horas  
**Concluída em:** 2026-05-01  
**Testada:** ✅ Manual OK  
**Status:** ✅ **CONCLUÍDA & VALIDADA**

### 🎯 Resultados

| Tarefa | Implementação | Status |
|--------|---------------|--------|
| T5.1 | Tokens CSS Dark Mode | ✅ |
| T5.2 | Theme Provider | ✅ |
| T5.3 | ~~Theme Toggle~~ | ✅ Removido (consolidado no T5.5) |
| T5.4 | Componentes Adaptados | ✅ |
| T5.5 | Settings Modal | ✅ Componente único de tema |

### T5.1 — Tokens CSS Dark Mode ✅
**Arquivo:** `web/app/globals.css`

- [x] Cores dark mode em oklch()
- [x] CSS variables com `data-theme` attribute
- [x] Semantic aliases invertidas (surface, card, ink)
- [x] `prefers-color-scheme` como fallback
- [x] Transições suaves entre temas

**Implementação:** Override das variáveis via `[data-theme="dark"]` e `@media (prefers-color-scheme: dark)`

### T5.2 — Theme Provider ✅
**Arquivo:** `web/app/components/ThemeProvider.tsx`

- [x] Context React (`light` | `dark` | `system`)
- [x] Persistência localStorage (`harmonizai-theme`)
- [x] Detecção `prefers-color-scheme` para `system`
- [x] SSR-safe (hydration sem flash)
- [x] Atualização automática do atributo `data-theme`

### T5.3 — Theme Toggle (Removido)
**Arquivo:** ~~`web/app/components/ThemeToggle.tsx`~~

- [x] ~~Botão com ícone sol/lua~~ → **Removido**
- [x] ~~Animação Framer Motion~~ → **Movido para T5.5**
- [x] ~~Integração com `useTheme()`~~ → **Consolidado no SettingsModal**
- [x] ~~Tooltip indicando modo atual~~ → **Replaced by T5.5**

**Nota:** ThemeToggle foi removido. Funcionalidade consolidada no SettingsModal (T5.5) que oferece UI mais completa com opções Light/Dark/System.

### T5.4 — Componentes Adaptados ✅
**Arquivos:** `web/app/components/ui/Card.tsx`, `WineList.tsx`, `Harmonizer.tsx`

- [x] Card: `bg-card`, `border-border`, `shadow-hover`
- [x] WineList: `text-ink`, `text-ink-muted`, `text-ink-subtle`
- [x] Badges: `bg-card-muted`, hover states
- [x] Skeleton shimmer ajustado para dark
- [x] **Input textarea:** `text-[var(--color-ink)]`, `placeholder:text-[var(--color-ink-subtle)]`
- [x] **Label input:** `text-[var(--color-ink-muted)]`
- [x] **Botão Nova busca:** `text-[var(--color-ink-subtle)]`
- [x] **Prato reconhecido:** `text-[var(--color-ink-muted)]` e `text-[var(--color-ink-subtle)]`
- [x] **Example tags:** `border-[var(--color-border)]`, `bg-[var(--color-card)]`, `text-[var(--color-ink-muted)]`

### T5.5 — Settings Modal (Componente Único de Tema) ✅
**Arquivo:** `web/app/components/SettingsModal.tsx`

- [x] **Trigger button:** Ícone engrenagem funcional
- [x] **Dropdown:** Opções Light / Dark / System
- [x] **Check visual:** Indica tema ativo
- [x] **Persistência:** localStorage automático
- [x] **Animações:** Framer Motion (scale + fade)
- [x] **Interações:** Click outside, Escape key
- [x] **Acessibilidade:** aria-label, aria-expanded, aria-pressed
- [x] **Header:** "Modo [x] ativo" dinâmico
- [x] **Footer:** Hint "Preferência salva automaticamente"

**Design Pattern:** Componente único substitui ThemeToggle anterior, oferecendo UI mais completa e explícita.

### ✅ Testes Realizados

| Teste | Resultado |
|-------|-----------|
| Build produção | ✅ Passou |
| Toggle funciona | ✅ Alterna light/dark |
| Settings Modal | ✅ Abre/fecha corretamente |
| Seleção tema | ✅ Light/Dark/System funcionam |
| Persistência | ✅ Salva no localStorage |
| System preference | ✅ Respeita prefers-color-scheme |
| Transições | ✅ Animações suaves |
| Componentes | ✅ Todos adaptados corretamente |
| Acessibilidade | ✅ aria-labels, keyboard navigation |

---

---

## ⬜ Phase 6: Acessibilidade Avançada

**Objetivo:** Garantir acessibilidade completa para leitores de tela  
**Tempo Estimado:** 4-6 horas  
**Dependências:** Phases 1-5  
**Status:** ⬜ **PENDENTE**

### T6.1 — Testes NVDA (Windows)
- [ ] Navegação por headings
- [ ] Labels de formulários
- [ ] Cards anunciados (nome + score)
- [ ] Botões com labels descritivas

### T6.2 — Testes VoiceOver (macOS)
- [ ] Rotor mostrando headings/links
- [ ] Landmark regions identificadas
- [ ] Status updates via aria-live

### T6.3 — Keyboard Navigation
- [ ] Tab order lógico
- [ ] Escape fecha modais
- [ ] Enter/Space ativa botões
- [ ] Skip link

### T6.4 — Documentação A11y
**Arquivo:** `docs/runbooks/ACCESSIBILITY.md`
- [ ] Checklist testes manuais
- [ ] Padrões de código
- [ ] Links WCAG

---

---

## ⬜ Phase 7: Algoritmo & Dataset

**Objetivo:** Aprimorar matching de pratos e expandir catálogo  
**Tempo Estimado:** 8-12 horas  
**Complexidade:** Alta (ML/NLP)  
**Status:** ⬜ **PENDENTE**

### T7.1 — Fuzzy Matching
**Arquivo:** `src/recommendation/dish_matcher.py`
- [ ] Levenshtein ou similar
- [ ] Sinônimos: "sushi" = "sashimi" = "temaki"
- [ ] Testes unitários

### T7.2 — Sugestão de Similares
**Arquivos:** `src/api/app.py`, `web/app/components/Harmonizer.tsx`
- [ ] Campo `suggestions: string[]` na API
- [ ] Chips clicáveis na UI ("Você quis dizer...?")

### T7.3 — Expandir Dataset
**Arquivos:** `data/wines.json`, `src/data_loader.py`
- [ ] +50 vinhos novos
- [ ] Tipos: Tinto, Branco, Espumante, Rosé
- [ ] Países: França, Itália, Espanha, Chile, Argentina

### T7.4 — Métricas de Qualidade
**Arquivo:** `src/recommendation/scorer.py`
- [ ] Logging de scores
- [ ] Dashboard analytics (opcional)
- [ ] Ajuste de pesos por feedback

---

---

## ⬜ Phase 8: Internacionalização (i18n)

**Objetivo:** Suporte a múltiplos idiomas (PT-BR, EN, ES)  
**Tempo Estimado:** 6-8 horas  
**Dependências:** Phases 1-5  
**Status:** ⬜ **PENDENTE**

### T8.1 — Setup i18n
**Arquivos:** `web/app/i18n/config.ts`, `next.config.ts`

- [ ] Biblioteca: `next-intl` ou `react-i18next`
- [ ] Configuração de locales: `pt-BR`, `en`, `es`
- [ ] Default locale: `pt-BR`
- [ ] Estratégia de routing: subpath (`/en`, `/es`) ou domain

### T8.2 — Traduções JSON
**Arquivos:** `web/messages/pt-BR.json`, `en.json`, `es.json`

- [ ] Strings da UI: títulos, labels, botões
- [ ] Mensagens de erro
- [ ] Placeholders e exemplos
- [ ] Meta descriptions

### T8.3 — Language Provider
**Arquivos:** `web/app/components/LanguageProvider.tsx`, `SettingsModal.tsx`

- [ ] Context para locale atual
- [ ] Persistência localStorage
- [ ] Detecção browser locale
- [ ] Toggle/select no SettingsModal

### T8.4 — Componentes Traduzidos
**Arquivos:** `Harmonizer.tsx`, `WineList.tsx`, `InstallPrompt.tsx`

- [ ] Uso de `useTranslations()` hook
- [ ] Formatação de números (scores, preços)
- [ ] RTL support (se necessário)
- [ ] Wine names em inglês/español no dataset

### T8.5 — Backend i18n (Opcional)
**Arquivos:** `src/api/app.py`

- [ ] Accept-Language header support
- [ ] Respostas de erro traduzidas
- [ ] Dish recognition em múltiplos idiomas

---

## ✅ Critérios de Aceitação Gerais

### Para todas as fases:
- [ ] Sem erros TypeScript
- [ ] Sem warnings ESLint críticos
- [ ] Funcionalidade 100% preservada
- [ ] Deploy Vercel funcionando
- [ ] Deploy Railway funcionando

### Por fase:
| Fase | Critério de Sucesso |
|------|---------------------|
| 1 | Performance Score >= 90 |
| 2 | Code splitting funcionando, FCP otimizado |
| 3 | Animações 60fps, sem drop frames |
| 4 | PWA instalável, offline funciona |
| 5 | Dark mode com persistência + Settings UI |
| 6 | Aprovado NVDA/VoiceOver |
| 7 | Dataset 2x maior, fuzzy matching |
| 8 | i18n PT-BR/EN/ES funcionando |

---

## 📝 Notas Finais

- **Ordem recomendada:** 1 → 2 → 3 → 4 → 5 → 5.5 → 6 → 7 → 8
- **Fases 1-5:** Concluídas ✅
- **Fases 5.5, 8:** Frontend-only (Settings, i18n)
- **Fases 6-7:** Envolvem backend/testing

**Próxima ação:** Executar Phase 5.5 (Settings Modal) ou Phase 6 (Acessibilidade)
