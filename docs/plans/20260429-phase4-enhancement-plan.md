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
**Última Atualização:** 2026-05-01  
**Status:** Phases 1-6 ✅ Concluídas | Phase 7 ⬜ Próxima

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

## ✅ Phase 6: Acessibilidade Avançada (Concluída)

**Objetivo:** Garantir acessibilidade completa para leitores de tela  
**Tempo Estimado:** 4-6 horas  
**Concluída em:** 2026-05-01  
**Dependências:** Phases 1-5  
**Status:** ✅ **CONCLUÍDA & VALIDADA**

### T6.1 — NVDA Support ✅
**Implementação:** Landmarks, headings, ARIA labels, correção de aria-live

- [x] Navegação por headings (`<h1>` presente)
- [x] Labels de formulários (`aria-labelledby` apontando para label com `id`)
- [x] Navegação por formulários (`aria-label` no `<form>` para atalho "F")
- [x] Cards anunciados (`aria-label` com nome + nota)
- [x] Botões com labels descritivos (`aria-label` em todos)
- [x] **Correção:** `aria-live` apenas quando visível (evita leitura de textos ocultos)
- [x] **Correção:** `aria-hidden="true"` em elementos invisíveis ("acordando servidor", etc.)

### T6.2 — VoiceOver Support ✅
**Implementação:** Rotor landmarks, live regions condicionais

- [x] Rotor mostrando headings/links
- [x] Landmark regions (`role="banner"`, `main`, `search`, `region`)
- [x] Status updates (`aria-live="polite"` apenas quando visível)

### T6.3 — Keyboard Navigation ✅
**Implementação:** Skip link, focus management, formulário identificado

- [x] Skip link (primeiro elemento focável, "Pular para conteúdo")
- [x] Tab order lógico (input → botões → links)
- [x] Escape fecha modais (SettingsModal dropdown)
- [x] Enter/Space ativa botões (comportamento padrão)
- [x] Focus indicators (`focus-visible:ring-2` em todos elementos)
- [x] Formulário com `aria-label` (reconhecido pelo atalho "F" do NVDA)

### T6.4 — Documentação A11y ✅
**Arquivo:** `docs/runbooks/ACCESSIBILITY.md`

- [x] Checklist testes manuais (NVDA + VoiceOver)
- [x] Padrões de código (exemplos de skip link, status, cards)
- [x] Links WCAG e ARIA Authoring Practices
- [x] Validação build + TypeScript + ESLint

### T6.5 — Correções NVDA (Pós-Teste) ✅
**Data:** 2026-05-02

**Problemas identificados nos testes manuais:**
1. NVDA anunciava "Não reconheci esse prato" e "Algo deu errado" no carregamento inicial
2. Atalho `F` não detectava o formulário (conflito com `role="search"`)

**Correções aplicadas:**
- [x] `WineList.tsx`: Renderização condicional dos estados (só renderiza no DOM quando visíveis)
- [x] `Harmonizer.tsx`: Adicionado `role="form"` explícito ao formulário
- [x] `Harmonizer.tsx`: Removido `role="search"` da `<section>` pai
- [x] `ACCESSIBILITY.md`: Atualizado com notas das correções

**Arquivos modificados:**
- `web/app/components/WineList.tsx` — renderização condicional dos estados
- `web/app/components/Harmonizer.tsx` — `role="form"` + removido `role="search"`
- `docs/runbooks/ACCESSIBILITY.md` — documentação das correções

---

### T6.6 — Declaração de Acessibilidade (eMAG) ✅
**Requisito eMAG:** Declaração de conformidade e canais de comunicação

**Implementação:**
- [x] Criada página `/acessibilidade` com declaração formal
- [x] Link no footer do Harmonizer para acessar a declaração
- [x] Status de conformidade com eMAG 3.1 e WCAG 2.1 AA
- [x] Lista de recursos de acessibilidade disponíveis
- [x] Canal de comunicação para feedback (e-mail)
- [x] Referências às normas eMAG e WCAG

**Arquivos criados/modificados:**
- `web/app/acessibilidade/page.tsx` — Página de declaração de acessibilidade
- `web/app/components/Harmonizer.tsx` — Footer com link para acessibilidade

---

### T6.7 — Preparação para Access Monitor Plus (eMAG) ✅
**Requisito eMAG:** Validar conformidade formal via ferramenta oficial

**Instruções para validação:**
1. Acesse: https://accessmonitor.acessibilidade.gov.pt/
2. Insira a URL de produção do HarmonizAI
3. Execute a avaliação automática
4. Verifique os resultados WCAG 2.1

**Checklist pré-validação:**
- [x] Estrutura semântica HTML5 (header, main, section, footer)
- [x] Atributos ARIA em elementos interativos
- [x] Textos alternativos em imagens
- [x] Contraste de cores verificado
- [x] Navegação por teclado funcional
- [x] Skip link implementado

---

### T6.8 — Testes Manuais Realizados ✅
**Data:** 2026-05-02

**Resultados NVDA:**
- ✅ Navegação por headings (`H`) — Funcionando
- ✅ Navegação por formulários (`F`) — Funcionando após foco via Skip Link ou Tab
- ✅ Labels de formulários — Anunciadas corretamente
- ✅ Botões — Descrições claras via `aria-label`
- ✅ Estados ocultos — NÃO lidos no carregamento (renderização condicional)
- ✅ Skip link — Primeiro elemento focável, funcional

**Nota importante:** Atalho `F` do NVDA requer que o foco esteja dentro do conteúdo principal. 
Comportamento padrão: Tab até "Pular para conteúdo principal" → Enter → conteúdo recebe foco → `F` detecta formulário.

---

### 🔄 Backlog — Features Futuras

#### T6.F1 — VLibras (eMAG Recomendação)
**Status:** ⬜ **BACKLOG** — Não prioritário

Widget de tradução para Libras (Língua Brasileira de Sinais).

**Requisitos:**
- Integração com VLibras do governo federal (https://vlibras.gov.br/)
- Script JavaScript oficial do gov.br
- Botão flutuante de acesso
- Requer avaliação de performance (carregamento externo)

**Prioridade:** Baixa — Acessibilidade atual já cobre leitores de tela e navegação por teclado.

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
- **Fases 1-6:** Concluídas ✅
- **Fases 5.5, 8:** Frontend-only (Settings, i18n)
- **Fases 7:** Backend/ML (fuzzy matching, dataset)

**Próxima ação:** Executar Phase 7 (Algoritmo & Dataset) ou Phase 8 (Internacionalização)
