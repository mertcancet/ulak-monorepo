import type { UseCase } from "@/features/useCases/types";
import { ActionTimeline } from "./ActionTimeline";
import {
  Heart,
  Building2,
  ShoppingCart,
  UtensilsCrossed,
  BookOpen,
  DollarSign,
} from "lucide-react";

const iconMap = {
  Heart,
  Building2,
  ShoppingCart,
  UtensilsCrossed,
  BookOpen,
  DollarSign,
};

interface UseCasesDetailProps {
  useCase: UseCase;
}

/**
 * UseCasesDetail
 * Seçilen kullanım alanının detaylarını gösteren bileşen
 */
export function UseCasesDetail({ useCase }: UseCasesDetailProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          {(() => {
            const Icon = iconMap[useCase.icon as keyof typeof iconMap];
            return Icon ? (
              <Icon className="h-10 w-10 flex-shrink-0 text-orange-500" />
            ) : null;
          })()}
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              {useCase.title}
            </h2>
            <p className="text-sm text-gray-500">Senaryo Detayları</p>
          </div>
        </div>
      </div>

      {/* Problem - Solution Section */}
      <div className="space-y-4">
        <div className="rounded-lg bg-red-50 p-4 border-l-4 border-red-200">
          <h3 className="mb-2 text-sm font-semibold text-red-700 uppercase">
            Problem:
          </h3>
          <p className="text-sm text-red-900">{useCase.problem}</p>
        </div>

        <div className="rounded-lg bg-green-50 p-4 border-l-4 border-green-200">
          <h3 className="mb-2 text-sm font-semibold text-green-700 uppercase">
            Çözüm:
          </h3>
          <p className="text-sm text-green-900">{useCase.solution}</p>
        </div>
      </div>

      {/* Features */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
          Temel Özellikler:
        </h3>
        <div className="space-y-2">
          {useCase.features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange-500" />
              <p className="text-sm text-gray-700">{feature}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-3 rounded-lg bg-gray-50 p-6">
        <ActionTimeline items={useCase.timeline} />
      </div>

      {/* CTA */}
      <button className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-white transition-colors hover:bg-orange-600">
        Bize Ulaşın
      </button>
    </div>
  );
}
