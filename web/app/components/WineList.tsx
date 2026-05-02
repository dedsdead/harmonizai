"use client";

import { motion } from "framer-motion";
import { Check, ExternalLink, Search, ShoppingCart, Wine as WineIcon } from "lucide-react";
import { ScoreBadge } from "./ui/Badge";
import type { Wine, WineListState } from "../lib/wines";

const SLOT_COUNT = 5;

interface WineListProps {
  state: WineListState;
  wines?: Wine[];
  slowLoading?: boolean;
}

export function WineList({ state, wines = [], slowLoading = false }: WineListProps) {
  const slots = Array.from({ length: SLOT_COUNT });
  const showEmpty = state === "empty";
  const showLoading = state === "loading" && !slowLoading;
  const showSlowLoading = state === "loading" && slowLoading;
  const showPopulated = state === "populated";
  const showNotFound = state === "not_found";
  const showError = state === "error";

  return (
    <section
      role="region"
      aria-label="Resultados das harmonizações"
      className="flex h-full w-full flex-col gap-3"
    >
      {/* Status Bar - Announced via aria-live */}
      <div className="relative flex h-6 shrink-0 items-center">
        <StateCaption
          visible={showEmpty}
          icon={<WineIcon className="h-4 w-4 text-primary-400" />}
          text="Digite sua refeição para descobrirmos o vinho perfeito."
        />
        <StateCaption
          visible={showLoading}
          icon={<Spinner className="h-4 w-4 text-primary-600" />}
          text="Buscando as melhores harmonizações..."
        />
        <StateCaption
          visible={showSlowLoading}
          icon={<Spinner className="h-4 w-4 text-primary-600" />}
          text="Acordando o servidor, isso pode levar alguns segundos..."
        />
        <StateCaption
          visible={showPopulated}
          icon={
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-secondary-100 text-secondary-600">
              <Check className="h-3 w-3" />
            </span>
          }
          text={`${wines.length} harmoniza${wines.length === 1 ? "ção" : "ções"} encontradas`}
        />
        <StateCaption
          visible={showNotFound}
          icon={<Search className="h-4 w-4 text-ink-subtle" />}
          text="Não reconheci o prato. Tente descrever de outra forma."
        />
        <StateCaption
          visible={showError}
          icon={<span className="text-amber-500">!</span>}
          text="Erro ao conectar. Tente novamente em instantes."
        />
      </div>

      {/* Content Area */}
      <div className="relative flex-1 overflow-hidden">
        {/* Empty State - Only render when visible */}
        {showEmpty && <EmptyState />}

        {/* Not Found State - Only render when visible */}
        {showNotFound && <NotFoundState />}

        {/* Error State - Only render when visible */}
        {showError && <ErrorState />}

        {/* Cards Grid - 2 columns on desktop */}
        {(showLoading || showSlowLoading || showPopulated) && (
          <div className="grid h-full grid-cols-1 gap-3 overflow-y-auto pr-1 lg:grid-cols-2">
            {slots.map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <WineCard state={state} wine={wines[i]} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function StateCaption({
  visible,
  icon,
  text,
}: {
  visible: boolean;
  icon: React.ReactNode;
  text: string;
}) {
  // Return null when not visible - only render active status to DOM
  if (!visible) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="absolute flex items-center gap-2 text-sm text-ink-muted opacity-100"
    >
      {icon}
      <span>{text}</span>
    </div>
  );
}

function WineCard({ state, wine }: { state: WineListState; wine?: Wine }) {
  const showReal = state === "populated" && wine !== undefined;
  const shimmer = state === "loading";
  const skeletonClass = shimmer ? "skeleton skeleton-shimmer" : "skeleton";

  return (
    <article
      aria-label={wine ? `${wine.name}, nota ${wine.score.total_score.toFixed(0)}` : "Carregando harmonização"}
      className="relative flex gap-3 rounded-xl border border-border bg-card p-3 shadow-resting"
    >
      {/* Image */}
      <div className="relative h-[144px] w-[80px] shrink-0">
        <div
          className={`${skeletonClass} flex h-full w-full items-center justify-center rounded-lg transition-opacity duration-300 ${
            showReal ? "opacity-0" : "opacity-100"
          }`}
        >
          <BottleSilhouette className="h-[80%] w-auto text-ink-subtle" />
        </div>
        {wine && (
          <div
            className={`absolute inset-0 transition-opacity duration-300 ${
              showReal ? "opacity-100" : "opacity-0"
            }`}
          >
            {wine.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={wine.image_url} alt={wine.name} className="h-full w-full rounded-lg object-contain" />
            ) : (
              <BottleVisual color={getWineColor(wine.type_id)} />
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative min-w-0 flex-1">
        {/* Skeleton */}
        <div
          aria-hidden={showReal}
          className={`flex flex-col gap-1.5 transition-opacity duration-300 ${
            showReal ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className={`${skeletonClass} h-4 w-[70%] rounded`} />
          <div className={`${skeletonClass} h-3 w-[45%] rounded`} />
          <div className={`${skeletonClass} h-3 w-[55%] rounded`} />
          <div className="mt-1 flex flex-col gap-1">
            <div className={`${skeletonClass} h-2.5 w-full rounded`} />
            <div className={`${skeletonClass} h-2.5 w-[80%] rounded`} />
          </div>
          <div className={`${skeletonClass} mt-1 h-5 w-20 rounded-full`} />
        </div>

        {/* Real content */}
        {wine && (
          <div
            className={`absolute inset-0 flex min-w-0 flex-col transition-opacity duration-300 ${
              showReal ? "opacity-100" : "opacity-0"
            }`}
          >
            <h3 className="truncate font-display text-base font-semibold leading-tight text-ink">
              {wine.name}
            </h3>
            <p className="mt-0.5 truncate text-sm text-ink-muted">
              {wine.winery}
            </p>
            <p className="mt-0.5 text-xs text-ink-subtle">
              {wine.country} · {wine.region}
            </p>
            <div className="mt-1.5 flex flex-wrap gap-1">
              {wine.characteristics.slice(0, 3).map((char: string, idx: number) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1, duration: 0.2 }}
                  className="rounded bg-card-muted px-1.5 py-0.5 text-[10px] text-ink-muted transition-colors hover:bg-border"
                >
                  {char}
                </motion.span>
              ))}
            </div>
            <div className="mt-auto flex items-center justify-between gap-2">
              <ScoreBadge score={wine.score.total_score} />
              <div className="flex items-center gap-2">
                <motion.a
                  href={wine.vivino_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ver ${wine.name} no Vivino`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 text-xs font-medium text-ink-subtle transition-all hover:bg-primary-50 hover:text-primary-600"
                >
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  Vivino
                </motion.a>
                <motion.a
                  href={wine.shop_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Comprar ${wine.name}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 text-xs font-medium text-ink-subtle transition-all hover:bg-secondary-50 hover:text-secondary-600"
                >
                  <ShoppingCart className="h-3 w-3" aria-hidden="true" />
                  Comprar
                </motion.a>
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

function getWineColor(typeId: number) {
  switch (typeId) {
    case 1: return "#722F37"; // Red (Burgundy)
    case 2: return "#F4E087"; // White
    case 3: return "#E2D893"; // Sparkling
    case 4: return "#FFB6C1"; // Rosé
    default: return "#722F37";
  }
}

function BottleVisual({ color }: { color: string }) {
  return (
    <div
      className="flex h-full w-full items-center justify-center rounded-lg"
      style={{
        background: `linear-gradient(180deg, ${color}15 0%, ${color}35 100%)`,
      }}
    >
      <svg viewBox="0 0 40 100" className="h-[85%] w-auto" aria-hidden>
        <path
          d="M17 4 h6 v14 q0 3 2 6 q5 7 5 18 v52 q0 4 -4 4 h-12 q-4 0 -4 -4 v-52 q0 -11 5 -18 q2 -3 2 -6 z"
          fill={color}
        />
        <rect
          x="11"
          y="44"
          width="18"
          height="16"
          fill="rgba(255,255,255,0.9)"
          rx="1"
        />
      </svg>
    </div>
  );
}

function BottleSilhouette({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 100" className={className} fill="currentColor" aria-hidden>
      <path d="M17 4 h6 v14 q0 3 2 6 q5 7 5 18 v52 q0 4 -4 4 h-12 q-4 0 -4 -4 v-52 q0 -11 5 -18 q2 -3 2 -6 z" />
    </svg>
  );
}

function WineGlassIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M7 3h10l-1 9c-.3 2.5-2.4 4.5-4 4.5s-3.7-2-4-4.5L7 3z" />
      <line x1="12" y1="16.5" x2="12" y2="21" />
      <line x1="8" y1="21" x2="16" y2="21" />
    </svg>
  );
}

function Spinner({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <circle
        cx="12"
        cy="12"
        r="9"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeWidth="2.5"
      />
      <path
        d="M21 12a9 9 0 0 1-9 9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 12 12"
          to="360 12 12"
          dur="0.9s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}

// State Illustrations
function EmptyState() {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 opacity-100"
    >
      <div className="mb-4 rounded-full bg-primary-50 p-4">
        <EmptyGlassIllustration className="h-16 w-16 text-primary-400" />
      </div>
      <h3 className="font-display text-lg font-semibold text-ink">
        Pronto para harmonizar?
      </h3>
      <p className="mt-1 max-w-xs text-center text-sm text-ink-muted">
        Descreva sua refeição e descubra os vinhos perfeitos para acompanhar.
      </p>
    </div>
  );
}

function NotFoundState() {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 opacity-100"
    >
      <div className="mb-4 rounded-full bg-secondary-50 p-4">
        <QuestionPlateIllustration className="h-16 w-16 text-secondary-500" />
      </div>
      <h3 className="font-display text-lg font-semibold text-ink">
        Não reconheci esse prato
      </h3>
      <p className="mt-1 max-w-xs text-center text-sm text-ink-muted">
        Tente descrever de outra forma. Ex: "sushi de salmão" ou "churrasco de picanha".
      </p>
    </div>
  );
}

function ErrorState() {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 opacity-100"
    >
      <div className="mb-4 rounded-full bg-red-50 p-4">
        <AlertIllustration className="h-16 w-16 text-red-400" />
      </div>
      <h3 className="font-display text-lg font-semibold text-ink">
        Algo deu errado
      </h3>
      <p className="mt-1 max-w-xs text-center text-sm text-ink-muted">
        Não foi possível conectar ao servidor. Tente novamente em instantes.
      </p>
    </div>
  );
}

// SVG Illustrations
function EmptyGlassIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <path
        d="M20 8h24l-4 28c-.5 4-4 8-8 8s-7.5-4-8-8L20 8z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M24 20c2 4 6 6 10 6s8-2 10-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <line x1="32" y1="44" x2="32" y2="56" stroke="currentColor" strokeWidth="2" />
      <line x1="24" y1="56" x2="40" y2="56" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="48" cy="16" r="3" fill="currentColor" opacity="0.3" />
      <circle cx="52" cy="24" r="2" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

function QuestionPlateIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <ellipse
        cx="32"
        cy="36"
        rx="20"
        ry="8"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <ellipse
        cx="32"
        cy="32"
        rx="16"
        ry="6"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M24 28c2-2 4-3 8-3s6 1 8 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="44" cy="16" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
      <path
        d="M44 14v2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="44" cy="20" r="1" fill="currentColor" />
    </svg>
  );
}

function AlertIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <path
        d="M32 8L56 52H8L32 8z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M32 24v14"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="32" cy="46" r="2.5" fill="currentColor" />
    </svg>
  );
}
