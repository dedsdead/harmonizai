# Plano de Correção — Layout Responsivo

**Data:** 2026-04-29  
**Tipo:** hotfix  
**Origem:** Teste manual da Phase 2 revelou problemas de usabilidade

---

## Problemas Identificados

### 1. Altura Excessiva
- `min-h-screen` em `page.tsx` força scroll para ver input
- Input + tags de exemplo devem estar **visíveis sem scroll** em desktop

### 2. WineList Desatualizado
- Usa classes antigas: `text-ink-muted`, `bg-secondary/15`, `border-border`
- Não foi atualizado para novo tema Tailwind (oklch)
- Cores quebradas ou inexistentes

### 3. Cards Mal Dispostos
- 5 cards em coluna única ocupam muito espaço vertical
- Sem scroll interno, forçam scroll da página inteira
- Não aproveitam espaço horizontal em telas widescreen

---

## Soluções

### A. Layout Compacto (page.tsx)
- Remover `min-h-screen`
- Usar `h-screen` ou `max-h-screen` com overflow controlado
- Header compacto (reduzir padding/margens)
- Input section: sempre visível, não scrollável
- Results section: scroll interno se necessário

### B. WineList Atualizado (WineList.tsx)
- Substituir classes antigas pelas novas do tema
- `text-ink-muted` → `text-neutral-500`
- `bg-secondary/15` → `bg-secondary-100`
- `border-border` → `border-neutral-200`
- etc.

### C. Grid de Cards (WineList.tsx)
- **Desktop:** 2 colunas de cards (grid-cols-2)
- **Mobile:** 1 coluna (grid-cols-1)
- Scroll interno na lista se exceder altura disponível
- Altura máxima calculada: `calc(100vh - header - input - gaps)`

---

## Tasks

### Task 1 — Layout Compacto
**Arquivo:** `web/app/page.tsx`

- [ ] Remover `min-h-screen` do container principal
- [ ] Usar `h-screen overflow-hidden` para desktop
- [ ] Reduzir padding do header: `py-4 lg:py-6` (não `py-6 lg:py-10`)
- [ ] Reduzir margin-top do main: `mt-4 lg:mt-6` (não `mt-8 lg:mt-12`)
- [ ] Results section: `overflow-y-auto` com `max-h` calculada
- [ ] Garantir input + tags visíveis sem scroll em viewport 900px+

### Task 2 — Atualizar WineList (Classes)
**Arquivo:** `web/app/components/WineList.tsx`

- [ ] Atualizar todas as classes de cores para novo tema
- [ ] `text-primary` → `text-primary-600`
- [ ] `text-secondary` → `text-secondary-500`
- [ ] `text-ink-muted` → `text-neutral-500`
- [ ] `text-ink-subtle` → `text-neutral-400`
- [ ] `bg-card` → `bg-white`
- [ ] `border-border` → `border-neutral-200`
- [ ] `bg-secondary/15` → `bg-secondary-100`

### Task 3 — Grid de Cards
**Arquivo:** `web/app/components/WineList.tsx`

- [ ] Container de cards: `grid grid-cols-1 lg:grid-cols-2 gap-3`
- [ ] Altura máxima: `max-h-[calc(100vh-280px)]` ou similar
- [ ] Scroll interno: `overflow-y-auto pr-2` (para scrollbar)
- [ ] Reduzir altura dos cards se necessário

### Task 4 — Teste Responsivo
- [ ] Desktop 1920x1080: input visível, cards em 2 colunas
- [ ] Desktop 1366x768: input visível, cards scrolláveis
- [ ] Tablet 768x1024: layout empilhado funcional
- [ ] Mobile 375x667: layout empilhado, input acessível

---

## Acceptance Criteria

1. Input + tags de exemplo visíveis **sem scroll** em telas ≥900px de altura
2. Cards de vinho dispostos em **2 colunas** em desktop
3. Lista de cards com **scroll interno** se exceder espaço
4. Nenhuma classe CSS antiga (`-ink-*`, `-border`) no WineList
5. Cores consistentes com novo tema (Burgundy/Olive/Gold)

---

## Estimativa

**Tempo:** 30-45 minutos  
**Complexidade:** Baixa (refatoração de classes)

---

## Próximo Passo

Após correção, retornar à:
```
/pwf-work-plan docs/plans/20260429-frontend-visual-refresh-plan.md Phase 3
```
