"use client";

import { motion } from "framer-motion";
import { Wine, UtensilsCrossed, Beef, Fish } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { WineList } from "./WineList";
import { fetchRecommendations, pingBackend, type Wine as WineType, type WineListState, type ApiResponse } from "../lib/wines";

const EXAMPLES = [
  { label: "Sushi", icon: Fish },
  { label: "Risoto", icon: UtensilsCrossed },
  { label: "Churrasco", icon: Beef },
  { label: "Salmão", icon: Fish },
];

export default function Harmonizer() {
  const [input, setInput] = useState("");
  const [listState, setListState] = useState<WineListState>("empty");
  const [wines, setWines] = useState<WineType[]>([]);
  const [recognizedDish, setRecognizedDish] = useState<ApiResponse["dish"]>(null);
  const [slowLoading, setSlowLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const slowTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    pingBackend();
  }, []);

  const canSubmit = input.trim().length > 0 && listState !== "loading";
  const isPopulated = listState === "populated";

  const runSearch = async () => {
    if (!canSubmit) return;
    setListState("loading");
    setWines([]);
    setSlowLoading(false);
    slowTimerRef.current = setTimeout(() => setSlowLoading(true), 3000);
    try {
      const data = await fetchRecommendations(input);
      if (!data.dish) {
        setListState("not_found");
        setRecognizedDish(null);
        return;
      }
      setRecognizedDish(data.dish);
      setWines(data.wines);
      setListState("populated");
    } catch (error) {
      console.error(error);
      setListState("error");
    } finally {
      if (slowTimerRef.current) {
        clearTimeout(slowTimerRef.current);
        slowTimerRef.current = null;
      }
      setSlowLoading(false);
    }
  };

  const handleReset = () => {
    setInput("");
    setWines([]);
    setRecognizedDish(null);
    setListState("empty");
    setSlowLoading(false);
    if (slowTimerRef.current) {
      clearTimeout(slowTimerRef.current);
      slowTimerRef.current = null;
    }
    textareaRef.current?.focus();
  };

  const pickExample = (example: string) => {
    setInput(example);
    textareaRef.current?.focus();
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden px-4 py-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex shrink-0 items-center gap-3 sm:gap-4"
      >
        <Image
          src="/logo.svg"
          alt="HarmonizAI Logo"
          width={56}
          height={56}
          priority
          className="h-12 w-auto sm:h-14"
        />
        <div className="flex flex-col">
          <h1 className="font-display text-2xl font-bold leading-none tracking-tight text-neutral-900 sm:text-3xl">
            <span className="text-primary-600">Harmoniz</span>
            <span className="text-secondary-500">AI</span>
          </h1>
          <p className="mt-1 text-sm text-neutral-600">
            Descubra o vinho ideal para sua refeição
          </p>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="mt-4 flex flex-1 gap-4 overflow-hidden lg:mt-6 lg:flex-row lg:gap-8">
        {/* Input Section */}
        <motion.section
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
          className="flex shrink-0 flex-col justify-start lg:w-1/3 lg:items-end"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              runSearch();
            }}
            className="w-full max-w-lg space-y-4"
          >
            <label
              htmlFor="dish"
              className="block text-base font-medium text-neutral-700"
            >
              O que você vai comer hoje?
            </label>

            <Card className="p-4" isHoverable={false}>
              <textarea
                id="dish"
                ref={textareaRef}
                rows={3}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    runSearch();
                  }
                }}
                placeholder="Descreva seu prato (ex: sushi variado, risoto de cogumelos...)"
                className="w-full resize-none border-0 bg-transparent text-base leading-relaxed text-neutral-900 outline-none placeholder:text-neutral-400"
              />

              <div className="mt-3 flex items-center justify-between gap-2">
                {isPopulated ? (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-sm text-neutral-500 transition hover:text-primary-600"
                  >
                    Nova busca
                  </button>
                ) : (
                  <span />
                )}
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={listState === "loading"}
                  disabled={!canSubmit}
                >
                  <Wine className="h-4 w-4" />
                  {listState === "loading" ? "Harmonizando..." : "Harmonizar"}
                </Button>
              </div>
            </Card>

            {/* Recognized Dish Badge */}
            {recognizedDish && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 rounded-lg border border-secondary-200 bg-secondary-50 px-3 py-2"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary-500 text-white">
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-sm text-neutral-700">
                  <span className="font-medium">Prato reconhecido:</span>{" "}
                  <span className="font-semibold text-secondary-700">{recognizedDish.display_name}</span>
                </span>
                <span className="ml-auto text-xs text-neutral-500">
                  ({(recognizedDish.confidence * 100).toFixed(0)}%)
                </span>
              </motion.div>
            )}

            {/* Example Tags */}
            <div className="flex flex-wrap gap-2">
              {EXAMPLES.map((ex, index) => {
                const Icon = ex.icon;
                return (
                  <motion.button
                    key={ex.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    type="button"
                    onClick={() => pickExample(ex.label)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-sm text-neutral-600 transition hover:border-primary-300 hover:text-primary-600"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {ex.label}
                  </motion.button>
                );
              })}
            </div>
          </form>
        </motion.section>

        {/* Results Section */}
        <aside className="flex min-h-0 flex-1 flex-col lg:w-2/3">
          <WineList state={listState} wines={wines} slowLoading={slowLoading} />
        </aside>
      </main>
    </div>
  );
}
