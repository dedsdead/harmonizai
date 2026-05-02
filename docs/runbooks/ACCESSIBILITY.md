# Accessibility Runbook - HarmonizAI

> **Status:** Phase 6 - Acessibilidade Avançada ✅ Concluída & Testada
> **Última atualização:** 2026-05-02
> 
> **Testes Manuais Realizados (NVDA):**
> - ✅ Navegação por headings (`H`)
> - ✅ Navegação por formulários (`F`) — Requer foco no conteúdo via Tab ou Skip Link
> - ✅ Labels de formulários anunciadas corretamente
> - ✅ Estados ocultos NÃO lidos no carregamento
> 
> **Correções NVDA (2026-05-02):**
> - Renderização condicional de EmptyState, NotFoundState, ErrorState — Componentes só existem no DOM quando visíveis
> - Adicionado `role="form"` explícito ao formulário para detecção pelo atalho `F`
> - Removido `role="search"` da section para evitar conflito com formulário
> 
> **Features Futuras (Backlog):**
> - ⬜ VLibras — Widget de tradução para Libras (requer integração externa gov.br)

---

## 📋 Checklist de Testes Manuais

### T6.1 — NVDA (Windows)

| Teste | Como Verificar | Status |
|-------|----------------|--------|
| Navegação por headings | Pressione `H` para pular entre headings | ✅ h1 presente |
| Labels de formulários | Tab até o textarea, NVDA deve anunciar "O que você vai comer hoje?" | ✅ `aria-labelledby` apontando para label |
| Navegação por formulários | Pressione `F` deve encontrar o formulário de busca | ✅ `aria-label` no `<form>` |
| Cards anunciados | Setas para navegar entre articles | ✅ `aria-label` com nome + nota |
| Botões com labels | Tab até botões, verificar descrição | ✅ `aria-label` presente |
| Status updates | Iniciar busca, NVDA deve anunciar "Buscando..." | ✅ `aria-live="polite"` apenas quando visível |
| Conteúdo oculto | NVDA NÃO deve ler estados invisíveis no carregamento | ✅ Renderização condicional — estados só existem no DOM quando visíveis |

**Teclas NVDA:**
- `H` — Próximo heading
- `Tab` — Próximo elemento focável
- `D` — Próximo região (landmark)
- `F` — Próximo formulário

---

### T6.2 — VoiceOver (macOS)

| Teste | Como Verificar | Status |
|-------|----------------|--------|
| Rotor headings | `VO + U` → selecionar Headings | ✅ h1 presente |
| Rotor links | `VO + U` → selecionar Links | ✅ Links Vivino/Comprar |
| Landmarks | `VO + U` → selecionar Landmarks | ✅ banner, main, search, region |
| Status updates | Iniciar busca, VoiceOver anuncia mudança | ✅ aria-live="polite" |

**Teclas VoiceOver:**
- `VO = Cmd + Option`
- `VO + U` — Abrir rotor
- `VO + →/←` — Navegar por palavra
- `Tab` — Navegar por elemento

---

### T6.3 — Keyboard Navigation

| Teste | Tecla | Status |
|-------|-------|--------|
| Skip Link | `Tab` (primeiro elemento) | ✅ "Pular para conteúdo principal" |
| Tab order lógico | `Tab` através da página | ✅ Ordem: Skip → Input → Botões |
| Escape fecha modal | `Esc` no SettingsModal | ✅ Fecha dropdown |
| Enter submit | `Enter` no textarea | ✅ Executa busca |
| Space ativa botão | `Space` em botões | ✅ Funciona |
| Focus visible | `Tab` até elementos | ✅ ring-2 em todos botões |

---

## 🏛️ Landmarks (Regiões da Página)

```
[role="banner"]        → Header com logo e título
[role="main"]          → Conteúdo principal
  <section>           → Seção de busca (sem role para não conflitar com form)
    <form>            → Formulário com aria-label
  [role="region"]      → Resultados das harmonizações
```

---

## ♿ Atributos ARIA Implementados

### Harmonizer.tsx
- `role="banner"` — Header
- `role="main"` — Conteúdo principal
- `aria-label="Formulário de busca de harmonização"` — Identificação do formulário (para atalho `F` do NVDA)
- `id="dish-label"` + `aria-labelledby="dish-label"` — Label associado ao textarea
- `id="dish-hint"` + `aria-describedby="dish-hint"` — Instruções adicionais
- `id="app-description"` — Descrição associada

### WineList.tsx
- `role="region"` — Container de resultados
- `aria-label="Resultados das harmonizações"` — Identificação
- `role="status"` + `aria-live="polite"` **apenas quando visível** — Evita leitura de status ocultos
- `aria-hidden="true"` quando invisível — Esconde do NVDA
- `aria-hidden={!visible}` em EmptyState/NotFoundState/ErrorState — Evita leitura no carregamento
- `aria-label` em cada article — Nome do vinho + nota

### SettingsModal.tsx
- `aria-label="Configurações de tema"` — Botão trigger
- `aria-expanded={isOpen}` — Estado do dropdown
- `aria-haspopup="dialog"` — Indica popup
- `role="dialog"` — Dropdown container
- `aria-pressed={isActive}` — Estado da opção

### layout.tsx
- Skip link — Primeiro elemento focável
- `aria-live="polite"` + `aria-atomic="true"` — Live region global

---

## 🎨 Focus Indicators

Todos elementos interativos têm focus visible:

```css
/* Padrão aplicado */
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300
```

Elementos com foco:
- Botão "Harmonizar"
- Botão "Nova busca"
- Links "Vivino" e "Comprar"
- Example tags
- Theme toggle
- Settings modal trigger

---

## 📝 Padrões de Código

### Skip Link
```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only ..."
>
  Pular para conteúdo principal
</a>
<main id="main-content">...</main>
```

### Status Announcements (Correção NVDA)
**Importante:** `aria-live` só deve estar presente quando o elemento está visível.

```tsx
// ❌ Errado: aria-live sempre presente, NVDA lê mesmo quando invisível
<div role="status" aria-live="polite" className="opacity-0">...

// ✅ Correto: Renderização condicional baseada em visibilidade
function StateCaption({ visible, text }) {
  if (!visible) {
    return <div aria-hidden="true" className="opacity-0">...</div>;
  }
  return (
    <div role="status" aria-live="polite" className="opacity-100">
      {text}
    </div>
  );
}
```

### Card com ARIA Label
```tsx
<article
  aria-label={`${wine.name}, nota ${wine.score.total_score.toFixed(0)}`}
>
  ...
</article>
```

---

## 🔗 Referências

- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [NVDA User Guide](https://www.nvaccess.org/files/nvda/documentation/userGuide.html)
- [VoiceOver Guide](https://www.apple.com/voiceover/info/guide/)

---

## ✅ Validação

- [x] Build passa sem erros
- [x] TypeScript compila
- [x] ESLint a11y plugin passa
- [x] Testes manuais NVDA (Windows)
- [x] Testes manuais VoiceOver (macOS)
- [x] Keyboard navigation validada

