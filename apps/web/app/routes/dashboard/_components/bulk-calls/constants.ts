import { BadgeCheck, CalendarClock, PhoneCall, Users } from "lucide-react";

export type CampaignStatus =
  | "Taslak"
  | "Planlandi"
  | "Calisiyor"
  | "Tamamlandi";

export interface CampaignItem {
  id: string;
  name: string;
  segment: string;
  status: CampaignStatus;
  targetCount: number;
  answeredCount: number;
  conversionRate: number;
  plannedAt: string;
}

export const campaignItems: CampaignItem[] = [
  {
    id: "bulk_101",
    name: "Nisan Check-Up Hatirlatma",
    segment: "Hasta Portfoyu / 45+",
    status: "Calisiyor",
    targetCount: 2400,
    answeredCount: 1312,
    conversionRate: 32,
    plannedAt: "Bugun 14:30",
  },
  {
    id: "bulk_102",
    name: "Yeni Paket Tanitimi",
    segment: "KOBI Musteriler",
    status: "Planlandi",
    targetCount: 1800,
    answeredCount: 0,
    conversionRate: 0,
    plannedAt: "Yarin 10:00",
  },
  {
    id: "bulk_103",
    name: "Randevu Onay Turu",
    segment: "Tedavi Sureci Aktif",
    status: "Tamamlandi",
    targetCount: 920,
    answeredCount: 811,
    conversionRate: 71,
    plannedAt: "Dun 16:15",
  },
  {
    id: "bulk_104",
    name: "Sadakat Geri Kazanim",
    segment: "Son 6 Ay Pasif",
    status: "Taslak",
    targetCount: 3100,
    answeredCount: 0,
    conversionRate: 0,
    plannedAt: "-",
  },
];

export const statusStyles: Record<CampaignStatus, string> = {
  Taslak: "bg-muted text-muted-foreground border-border",
  Planlandi: "bg-warning/10 text-warning border-warning/30",
  Calisiyor: "bg-brand/10 text-brand border-brand/30",
  Tamamlandi: "bg-success/10 text-success border-success/30",
};

export const audienceStats = [
  { label: "Toplam Kisi", value: "8,220", icon: Users },
  { label: "Aranabilir Numara", value: "7,914", icon: PhoneCall },
  { label: "Opt-In Uyum", value: "%97", icon: BadgeCheck },
  { label: "Tahmini Cevap", value: "%41", icon: CalendarClock },
];

export interface ContactNumberItem {
  id: string;
  fullName: string;
  phone: string;
  audienceName: string;
  customerGroup: "Pazarlama" | "Bilgilendirme" | "Randevu";
  city: string;
}

export const contactNumberItems: ContactNumberItem[] = [
  {
    id: "cnt_001",
    fullName: "Ayse Demir",
    phone: "+90 532 111 22 33",
    audienceName: "Bahar Kampanyasi",
    customerGroup: "Pazarlama",
    city: "Istanbul",
  },
  {
    id: "cnt_002",
    fullName: "Mehmet Yilmaz",
    phone: "+90 533 444 55 66",
    audienceName: "Check-Up Hatirlatma",
    customerGroup: "Bilgilendirme",
    city: "Ankara",
  },
  {
    id: "cnt_003",
    fullName: "Elif Kaya",
    phone: "+90 535 777 88 99",
    audienceName: "Randevu Takip",
    customerGroup: "Randevu",
    city: "Izmir",
  },
  {
    id: "cnt_004",
    fullName: "Can Akar",
    phone: "+90 536 000 11 22",
    audienceName: "Bahar Kampanyasi",
    customerGroup: "Pazarlama",
    city: "Bursa",
  },
];
