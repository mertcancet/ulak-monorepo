# Kullanım Alanları (Use Cases) Bileşenleri

Bu klasör, CleonAI'ın farklı endüstrilerdeki kullanım senaryolarını gösteren bileşenleri içerir.

## 📁 Dosya Yapısı

```
src/
├── features/useCases/
│   ├── types.ts        # TypeScript türleri
│   └── data.ts         # Kullanım alanlarının veri tanımı
├── components/useCases/
│   ├── UseCasesPage.tsx       # Ana sayfa bileşeni
│   ├── UseCasesSidebar.tsx    # Sol kategori menüsü
│   ├── UseCasesDetail.tsx     # Sağ detay bölümü
│   ├── ActionTimeline.tsx     # Timeline gösterimi
│   └── index.ts               # Barrel export
└── pages/useCases/
    └── UseCasesPage.tsx       # Route sayfası
```

## 🎯 Bileşenler

### `UseCasesPage`
Tüm arayüzü birleştiren ana bileşen. Responsif grid layout ile sidebar ve detail panelini gösterir.

### `UseCasesSidebar`
Tüm kullanım alanlarını lista halinde gösteren sol menu. Tıklanınca `onSelect` callback'i çağrılır.

### `UseCasesDetail`
Seçilen kullanım alanının problem, çözüm, özellikler ve timeline'ını gösteren detay paneli.

### `ActionTimeline`
Saat, adım ve durum bilgisini görsel bir timeline şeklinde gösterer bileşen.

## 📊 Veri Yapısı

Kullanım alanları `src/features/useCases/data.ts` dosyasında tanımlanır:

```typescript
{
  id: "healthcare",
  icon: "🏥",
  title: "Sağlık Sektörü",
  problem: "...",
  solution: "...",
  features: ["...", "...", "..."],
  timeline: [
    { time: "00:02", step: "...", status: "..." },
    // ...
  ]
}
```

## 🚀 Kullanım

```typescript
import { UseCasesPage } from "~/components/useCases";

export default function UseCase() {
  return <UseCasesPage />;
}
```

## 🎨 Tailwind CSS

Bileşenler Tailwind CSS ile stillendirilmiş:
- **Renkler**: Orange palette (primary), Gray (background)
- **Spacing**: 4-unit grid sistemi
- **Responsive**: `lg:` breakpoint ile tablet/desktop layout

## 📱 Responsive Tasarım

- **Mobile**: Sidebar aşağı / Detail üstte
- **Desktop (lg)**: Sidebar sol / Detail sağ (4:1 oranı)

## 🔧 Özelliklendirme

Yeni bir kullanım alanı eklemek için:

1. `src/features/useCases/data.ts`'e yeni senaryo ekle
2. `src/features/useCases/types.ts`'deki `UseCaseId` türüne id ekle
3. Bileşen otomatik olarak yeni kategoriyi gösterecek
