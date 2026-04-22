import type { UseCaseId } from "@/features/useCases/types";
import { useCases } from "@/features/useCases/data";
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

interface UseCasesSidebarProps {
  activeId: UseCaseId;
  onSelect: (id: UseCaseId) => void;
}

/**
 * UseCasesSidebar
 * Kategorileri listeleyen sol menu bileşeni
 */
export function UseCasesSidebar({
  activeId,
  onSelect,
}: UseCasesSidebarProps) {
  return (
    <div className="flex flex-col gap-2">
      {Object.entries(useCases).map(([id, useCase]) => (
        <button
          key={id}
          onClick={() => onSelect(id as UseCaseId)}
          className={`flex items-center gap-3 rounded-lg px-4 py-3 text-left transition-all duration-200 ${
            activeId === id
              ? "bg-orange-100 text-orange-700"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          {(() => {
            const Icon = iconMap[useCase.icon as keyof typeof iconMap];
            return Icon ? (
              <Icon className="h-6 w-6 flex-shrink-0" />
            ) : null;
          })()}
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium">{useCase.title}</span>
            <span
              className={`text-xs ${
                activeId === id
                  ? "text-orange-600"
                  : "text-gray-500"
              }`}
            >
              Senaryo
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
