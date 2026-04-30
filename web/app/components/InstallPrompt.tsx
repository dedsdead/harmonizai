"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Download, Smartphone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/Button";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);

  useEffect(() => {
    // Check if already installed or dismissed
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
    const isIOSStandalone = (window.navigator as unknown as { standalone?: boolean }).standalone;
    const dismissed = localStorage.getItem("harmonizai-install-dismissed") === "true";
    
    if (isStandalone || isIOSStandalone || dismissed) {
      return;
    }

    // Detect iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as unknown as { MSStream?: unknown }).MSStream;
    setIsIOS(isIOSDevice);

    // Listen for beforeinstallprompt (Android/Chrome)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Show iOS hint after 3 seconds if not installed
    if (isIOSDevice) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);
      return () => {
        window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        clearTimeout(timer);
      };
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === "accepted") {
      setIsVisible(false);
    }
    
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setHasDismissed(true);
    localStorage.setItem("harmonizai-install-dismissed", "true");
  };

  if (!isVisible || hasDismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-80"
      >
        <div className="rounded-xl border border-primary-200 bg-white p-4 shadow-lg">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-100">
              {isIOS ? (
                <Smartphone className="h-5 w-5 text-primary-600" />
              ) : (
                <Download className="h-5 w-5 text-primary-600" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-neutral-900">
                {isIOS ? "Adicionar à Tela Inicial" : "Instalar HarmonizAI"}
              </h3>
              <p className="mt-1 text-sm text-neutral-600">
                {isIOS 
                  ? "Toque em \"Compartilhar\" e depois \"Adicionar à Tela Inicial\" para instalar."
                  : "Adicione o HarmonizAI à sua tela inicial para acesso rápido."
                }
              </p>
              
              {!isIOS && deferredPrompt && (
                <div className="mt-3 flex gap-2">
                  <Button 
                    size="sm" 
                    onClick={handleInstall}
                    className="flex-1"
                  >
                    <Download className="h-4 w-4" />
                    Instalar
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={handleDismiss}
                  >
                    Agora não
                  </Button>
                </div>
              )}
              
              {isIOS && (
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={handleDismiss}
                  className="mt-2 w-full"
                >
                  Entendi
                </Button>
              )}
            </div>
            
            <button
              onClick={handleDismiss}
              className="shrink-0 rounded p-1 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-600"
              aria-label="Fechar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
