# Plano de Implementação — Frontend Visual Refresh

**Data:** 2026-04-29  
**Origem:** `.windsurf/brainstorm-temp/20260429150000-frontend-visual-refresh-brainstorm.md`  
**Clarificações:** `docs/plans/frontend-visual-refresh.clarifications.md`

---

## Resumo Executivo

Redesign visual completo do frontend HarmonizAI para torná-lo mais moderno, legível e profissional. Escopo limitado às **Phases 1-3** (Foundation, Layout, Components) conforme clarificações.

**Decisões-chave consolidadas:**
- 8 animações Core (page load, hover, staggered cards, shimmer)
- WCAG AA: fontes 14px+, contraste 4.5:1
- CSS custom properties com `oklch()` para dark mode futuro
- Placeholder temático para imagens (cores por tipo de vinho)

---

## Phase 1: Foundation — Design System & Setup

**Objetivo:** Estabelecer base visual completa antes de tocar em componentes.

### Task 1.1 — Instalar dependências
**Arquivos:** `web/package.json`, `web/package-lock.json`  
**Acceptance Criteria:**
- [ ] `framer-motion` instalado (^11.x)
- [ ] `lucide-react` instalado (^0.x)
- [ ] Ambos listados em `dependencies` (não devDependencies)

### Task 1.2 — Configurar fontes Google
**Arquivos:** `web/app/layout.tsx`  
**Acceptance Criteria:**
- [ ] Remover link da fonte Roboto existente
- [ ] Adicionar Playfair Display: 400, 500, 600, 700
- [ ] Adicionar Inter: 400, 500, 600, 700
- [ ] Configurar font-display: swap para performance

### Task 1.3 — Atualizar tema Tailwind (globals.css)
**Arquivos:** `web/app/globals.css`  
**Acceptance Criteria:**
- [ ] Definir paleta com `oklch()`:
  - Primary: Burgundy `#722F37` (oklch(40% 0.12 15))
  - Secondary: Olive `#5F7161` (oklch(50% 0.06 150))
  - Accent: Gold `#C9A961` (oklch(70% 0.1 85))
  - Neutros: escala de cinzos quentes (oklch)
- [ ] Criar variações 50-950 para cada cor (para dark mode futuro)
- [ ] Definir tipografia:
  - `--font-display`: Playfair Display
  - `--font-body`: Inter
  - Escala: xs(14px), sm(14px), base(16px), lg(18px), xl(20px), 2xl(24px), 3xl(30px)
- [ ] Definir sombras consistentes:
  - resting: `0 1px 3px rgba(0,0,0,0.08)`
  - hover: `0 4px 12px rgba(0,0,0,0.12)`
  - active: `0 2px 4px rgba(0,0,0,0.08)`
- [ ] Definir border-radius: 6px (inputs), 12px (cards), 9999px (pills)
- [ ] Definir espaçamento: 4px grid (0.5, 1, 2, 3, 4, 6, 8, 10, 12, 16...)

### Task 1.4 — Criar componentes base
**Arquivos:** `web/app/components/ui/Button.tsx`, `Card.tsx`, `Badge.tsx`  
**Acceptance Criteria:**
- [ ] `Button` com variants: primary, secondary, ghost, outline
- [ ] `Button` com states: default, hover, active, disabled, loading
- [ ] `Button` usando Tailwind classes do novo tema
- [ ] `Card` com borda 1px, radius 12px, sombra resting
- [ ] `Card` com hover: translateY(-2px) + shadow hover
- [ ] `Badge` com variants: default, primary, secondary, accent, outline
- [ ] `Badge` para scores: gold (90-100), silver (80-89), bronze (70-79)

### Task 1.5 — Skeleton melhorado
**Arquivos:** `web/app/components/ui/Skeleton.tsx`  
**Acceptance Criteria:**
- [ ] Skeleton base com gradiente na paleta Burgundy
- [ ] Animação shimmer otimizada (GPU-accelerated)
- [ ] Variantes: text, circle, rectangle, card-wine

---

## Phase 2: Layout — Estrutura & Responsividade

**Objetivo:** Corrigir proporções e implementar responsividade correta.

### Task 2.1 — Refatorar layout.tsx
**Arquivos:** `web/app/layout.tsx`  
**Acceptance Criteria:**
- [ ] Estrutura semântica: header, main, footer (opcional)
- [ ] Container com max-width apropriado (1280px ou 1440px)
- [ ] Padding responsivo: px-4 sm:px-6 lg:px-8
- [ ] Altura mínima correta (min-h-screen, não min-h-dvh problemático)

### Task 2.2 — Refatorar page.tsx — Estrutura principal
**Arquivos:** `web/app/page.tsx`  
**Acceptance Criteria:**
- [ ] Remover `mx-none` inválido, usar `mx-auto` quando apropriado
- [ ] Grid responsivo correto:
  - Mobile: single column, stacked
  - Tablet (md): input full, cards 2-col grid
  - Desktop (lg+): side-by-side, cards single column
- [ ] Gap adequado: gap-8 (mobile), gap-12 (tablet), gap-16 (desktop)
- [ ] Header com proporções corrigidas (logo não distorcido)

### Task 2.3 — Seção de Input
**Arquivos:** `web/app/page.tsx` (input section)  
**Acceptance Criteria:**
- [ ] Card container envolvendo textarea
- [ ] Textarea com auto-resize (min 2 rows, max 6)
- [ ] Placeholder claro: "Descreva o prato (ex: sushi, churrasco...)"
- [ ] Botão "Harmonizar" com loading state integrado
- [ ] Tags de exemplo com ícones (🍣, 🍝, 🥩, 🐟) e hover elevado
- [ ] Animação staggered nas tags (50ms delay entre cada)

### Task 2.4 — Responsividade mobile-first
**Arquivos:** `web/app/page.tsx`, `globals.css`  
**Acceptance Criteria:**
- [ ] Touch targets mínimo 44px em todos os elementos interativos
- [ ] Fontes nunca menores que 14px (conforme WCAG AA)
- [ ] Cards full-width em mobile com padding adequado
- [ ] Testar breakpoints: <640px, 640-1024px, >1024px

---

## Phase 3: Components — WineList & Interactions

**Objetivo:** Redesign completo dos cards com animações e micro-interações.

### Task 3.1 — Refatorar WineList container
**Arquivos:** `web/app/components/WineList.tsx`  
**Acceptance Criteria:**
- [ ] Container com gap-4 entre cards
- [ ] Animação staggered entrance (80ms entre cards)
- [ ] StateCaption com ícones Lucide (não emojis)
- [ ] Mensagens claras para cada estado (empty, loading, not_found, error)

### Task 3.2 — Refatorar WineCard
**Arquivos:** `web/app/components/WineList.tsx` (WineCard)  
**Acceptance Criteria:**
- [ ] Card container: borda 1px, radius 12px, sombra resting, hover elevado
- [ ] Área de imagem: ratio 3:4 consistente (108x144px ou proporcional)
- [ ] Placeholder com cor do tipo de vinho:
  - Tinto: Burgundy `#722F37`
  - Branco: Amarelo suave `#F4E087`
  - Espumante: Dourado `#E2D893`
  - Rosé: Rosa claro `#FFB6C1`
- [ ] Skeleton durante loading com gradiente temático
- [ ] Hover na imagem: leve zoom (scale 1.02)

### Task 3.3 — Informações do vinho
**Arquivos:** `web/app/components/WineList.tsx`  
**Acceptance Criteria:**
- [ ] Nome: Playfair Display, 18px, weight 600, truncate
- [ ] Vinícola: Inter, 14px, cor neutra-600
- [ ] Origem: Badge com bandeira (emoji) + texto, não uppercase
- [ ] Características: Chips coloridos por categoria (bg neutro, texto primário)
- [ ] Score: Badge circular colorido (gold/silver/bronze) com percentual

### Task 3.4 — Ações do card
**Arquivos:** `web/app/components/WineList.tsx`  
**Acceptance Criteria:**
- [ ] Botão "Ver no Vivino" com ícone ExternalLink (Lucide)
- [ ] Botão "Comprar" com ícone ShoppingCart (Lucide)
- [ ] Estilo ghost/outline para não competir com conteúdo
- [ ] Hover: fill com cor primária
- [ ] Target="_blank" rel="noreferrer" em ambos

### Task 3.5 — Estados especiais
**Arquivos:** `web/app/components/WineList.tsx`  
**Acceptance Criteria:**
- [ ] Estado empty: Ilustração SVG (taça vazia) + texto amigável
- [ ] Estado not_found: Ilustração SVG (prato desconhecido) + sugestão
- [ ] Estado error: Ilustração SVG (sinal de alerta) + CTA retry
- [ ] Estado slow_loading: Mensagem "Acordando servidor..." com spinner

### Task 3.6 — Animações Core (8 essenciais)
**Arquivos:** `web/app/components/`, `web/app/page.tsx`  
**Acceptance Criteria:**
1. [ ] Page load: Header fade-in + slide-down (0.3s ease-out)
2. [ ] Page load: Input fade-in + scale from 0.98 (0.2s delay)
3. [ ] Page load: Tags staggered fade-in (50ms entre cada)
4. [ ] Button hover: translateY(-1px) + shadow elevation
5. [ ] Button active: translateY(0) + shadow reduction
6. [ ] Card hover: translateY(-2px) + shadow elevation
7. [ ] Cards entrance: Staggered (80ms entre cards)
8. [ ] Loading shimmer: GPU-accelerated, cor temática

---

## Acceptance Criteria Geral

- [ ] Lighthouse Performance: 90+
- [ ] Lighthouse Accessibility: 90+ (WCAG AA)
- [ ] Lighthouse Best Practices: 95+
- [ ] Lighthouse SEO: 90+
- [ ] Nenhum erro de TypeScript
- [ ] Nenhum warning de ESLint
- [ ] Funcionalidade existente 100% preservada (API, estados, navegação)

---

## Open Items (Phase 4 - Trabalho Futuro)

- [ ] Testes cross-browser (Safari, Firefox, Edge)
- [ ] Testes acessibilidade avançados (NVDA, VoiceOver)
- [ ] Dark mode completo
- [ ] PWA features (service worker, offline)
- [ ] Animações adicionais (ripple, placeholder rotativo)

---

## Checklist Pré-Implementação

- [ ] Backup da pasta `web/` ou commit atual
- [ ] Node.js 18+ disponível
- [ ] Backend rodando localmente para testes

---

## Próximo Comando

Após revisar este plano, execute:
```
/pwf-work-plan docs/plans/20260429-frontend-visual-refresh-plan.md Phase 1
```
