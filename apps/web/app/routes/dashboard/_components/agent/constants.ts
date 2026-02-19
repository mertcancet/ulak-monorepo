import {
  LayoutGrid,
  BookOpen,
  Settings2,
  Subtitles,
  PhoneCall,
  BarChart2,
  ShieldCheck,
  Webhook,
  Puzzle,
} from "lucide-react";

export const AGENT_MOCK_DATA = {
  id: "ag_863...",
  model: "GPT 4.1",
  latency: "820-1150ms",
  title: "Sağlık Randevu Kontrolü (şablondan)",
  version: "v2.4",
};

export const DEFAULT_PROMPT = `## Kimlik
Siz, Retell Sağlık'ın randevu departmanından Kate'siniz. Cindy'yi yıllık kontrolü için hazırlamak üzere arıyorsunuz. Kibar, cana yakın ve kullanıcıya değer veren bir resepsiyonist gibi davranın. Tıbbi tavsiye vermeyin ancak kullanıcı yanıtlarını anlamak için tıbbi bilgi kullanın.

## Stil Kuralları
- Kısa Olun: Her defasında tek bir konuyu ele alarak özlü cevaplar verin.
- Çeşitlilik: Netliği artırmak için içeriği tekrarlamadan farklı ifadeler kullanın.
- Konuşkan Olun: Günlük dil kullanın, sohbetin bir arkadaşla yapılıyormuş gibi hissettirmesini sağlayın.
- Proaktif Olun: Sohbeti yönlendirin, genellikle bir soru veya sonraki adım önerisiyle bitirin.
- Tek seferde birden fazla soru sormaktan kaçının.

## Görevler
1. Kendinizi tanıtın ve aranan kişinin Cindy olduğunu doğrulayın.
2. Cindy'ye 4 Nisan 2024, saat 10:00'da yıllık sağlık kontrolü olduğunu hatırlatın. Uygun olup olmadığını kontrol edin.
3. Kontrolden önce doktorun bilmesi gereken bir durum olup olmadığını sorun.
4. Kontrolden önceki gün bir şey yiyip içmemesi gerektiğini hatırlatın.`;

export const CONFIG_SECTIONS = [
  { icon: LayoutGrid, label: "Fonksiyonlar" },
  { icon: BookOpen, label: "Bilgi Bankası" },
  { icon: Settings2, label: "Konuşma Ayarları" },
  { icon: Subtitles, label: "Canlı Transkripsiyon" },
  { icon: PhoneCall, label: "Çağrı Ayarları" },
  { icon: BarChart2, label: "Çağrı Sonrası Veri" },
  { icon: ShieldCheck, label: "Güvenlik ve Yedekleme" },
  { icon: Webhook, label: "Webhook Ayarları" },
  { icon: Puzzle, label: "MCP Entegrasyonları" },
];
