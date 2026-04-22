import { useState } from "react";
import type { UseCaseId } from "@/features/useCases/types";
import { useCases } from "@/features/useCases/data";
import { UseCasesSidebar } from "./UseCasesSidebar";
import { UseCasesDetail } from "./UseCasesDetail";

/**
 * UseCasesPage
 * Tüm kullanım alanlarını gösteren ana sayfa
 *
 * Features:
 * - Kategori seçimi
 * - Detaylı senaryo bilgisi
 * - Timeline gösterimi
 */
export function UseCasesPage() {
  const [activeId, setActiveId] = useState<UseCaseId>("healthcare");
  const activeUseCase = useCases[activeId];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-6 py-8 shadow-sm">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold text-gray-900">
            Aynı platform, farklı operasyon senaryoları.
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            CleonAI, çeşitli sektörlerde akıllı çağrı otomasyonu ve AI aracılı iş akışlarını destekler.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <UseCasesSidebar activeId={activeId} onSelect={setActiveId} />
            </div>
          </div>

          {/* Detail */}
          <div className="lg:col-span-3">
            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-lg">
              <UseCasesDetail useCase={activeUseCase} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="border-t border-gray-200 bg-white px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Senaryonuza uygun yapay zeka çağrı akışını kuralım
          </h2>
          <p className="mb-8 text-lg text-gray-600">
            Kısa bir demo görüşmesinde operasyon akışınızı netleştirelim. Sana özel çözümü canlı gösterelim.
          </p>
          <button className="rounded-lg bg-orange-500 px-8 py-3 font-semibold text-white transition-colors hover:bg-orange-600">
            Demo Iste
          </button>
        </div>
      </div>
    </div>
  );
}
