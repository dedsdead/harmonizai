import { AlertCircle, ArrowLeft, CheckCircle2, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

export const metadata = {
  title: "Declaração de Acessibilidade — HarmonizAI",
  description: "Conheça os compromissos e medidas de acessibilidade do HarmonizAI para garantir acesso universal.",
};

export default function AcessibilidadePage() {
  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="-ml-2 mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao HarmonizAI
            </Button>
          </Link>
          <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Declaração de Acessibilidade
          </h1>
          <p className="mt-2 text-ink-muted">
            Compromisso com a acessibilidade digital e inclusão
          </p>
        </div>

        {/* Status */}
        <Card className="mb-6 p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-green-100 p-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold text-ink">
                Status de Conformidade
              </h2>
              <p className="mt-1 text-ink-muted">
                O HarmonizAI está em conformidade com as diretrizes de acessibilidade 
                <strong> WCAG 2.1 nível AA</strong> e segue as recomendações do 
                <strong> eMAG 3.1</strong> (Modelo de Acessibilidade em Governo Eletrônico).
              </p>
              <p className="mt-2 text-sm text-ink-subtle">
                Última avaliação: Maio de 2026
              </p>
            </div>
          </div>
        </Card>

        {/* Compromissos */}
        <Card className="mb-6 p-6">
          <h2 className="font-display text-lg font-semibold text-ink mb-4">
            Nossos Compromissos
          </h2>
          <ul className="space-y-3 text-ink-muted">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-primary-500 mt-0.5" />
              <span>Garantir navegação completa via teclado (Tab, Enter, Escape)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-primary-500 mt-0.5" />
              <span>Compatibilidade com leitores de tela (NVDA, VoiceOver, JAWS)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-primary-500 mt-0.5" />
              <span>Contraste adequado entre texto e fundo (modo claro e escuro)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-primary-500 mt-0.5" />
              <span>Textos alternativos em elementos visuais essenciais</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-primary-500 mt-0.5" />
              <span>Indicadores visuais de foco em todos elementos interativos</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-primary-500 mt-0.5" />
              <span>Link para pular direto ao conteúdo principal</span>
            </li>
          </ul>
        </Card>

        {/* Recursos de Acessibilidade */}
        <Card className="mb-6 p-6">
          <h2 className="font-display text-lg font-semibold text-ink mb-4">
            Recursos de Acessibilidade Disponíveis
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="font-medium text-ink">Navegação por Teclado</h3>
              <p className="mt-1 text-sm text-ink-muted">
                Use Tab para navegar, Enter para ativar, Escape para fechar modais.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="font-medium text-ink">Leitores de Tela</h3>
              <p className="mt-1 text-sm text-ink-muted">
                Compatível com NVDA (Windows), VoiceOver (macOS/iOS) e TalkBack (Android).
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="font-medium text-ink">Alto Contraste</h3>
              <p className="mt-1 text-sm text-ink-muted">
                Modo escuro disponível com contraste otimizado para leitura.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="font-medium text-ink">Tamanho de Fonte</h3>
              <p className="mt-1 text-sm text-ink-muted">
                Interface responsiva que respeita as configurações de zoom do navegador.
              </p>
            </div>
          </div>
        </Card>

        {/* Feedback */}
        <Card className="mb-6 p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-primary-100 p-2">
              <AlertCircle className="h-5 w-5 text-primary-600" />
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold text-ink">
                Encontrou alguma barreira?
              </h2>
              <p className="mt-1 text-ink-muted">
                Se você encontrou dificuldades para acessar qualquer conteúdo ou 
                identificou problemas de acessibilidade, por favor nos avise:
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href="mailto:acessibilidade@harmonizai.com.br"
                  className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 hover:underline"
                >
                  acessibilidade@harmonizai.com.br
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </Card>

        {/* Referências */}
        <Card className="mb-6 p-6">
          <h2 className="font-display text-lg font-semibold text-ink mb-4">
            Referências e Normas
          </h2>
          <ul className="space-y-2 text-ink-muted">
            <li>
              <a
                href="https://www.gov.br/governodigital/pt-br/acessibilidade-e-usuario/acessibilidade-digital/modelo-de-acessibilidade"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 hover:underline"
              >
                eMAG 3.1 — Modelo de Acessibilidade em Governo Eletrônico
                <ExternalLink className="h-4 w-4" />
              </a>
            </li>
            <li>
              <a
                href="https://www.w3.org/WAI/WCAG21/quickref/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 hover:underline"
              >
                WCAG 2.1 — Diretrizes de Acessibilidade W3C
                <ExternalLink className="h-4 w-4" />
              </a>
            </li>
            <li>
              <a
                href="https://www.w3.org/WAI/ARIA/apg/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 hover:underline"
              >
                ARIA Authoring Practices Guide
                <ExternalLink className="h-4 w-4" />
              </a>
            </li>
          </ul>
        </Card>

        {/* Footer */}
        <footer className="text-center text-sm text-ink-subtle">
          <p>HarmonizAI — Todos os direitos reservados</p>
          <p className="mt-1">Última atualização: 02 de Maio de 2026</p>
        </footer>
      </div>
    </main>
  );
}
