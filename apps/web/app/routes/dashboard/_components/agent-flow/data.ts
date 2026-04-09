import type { Edge, Node } from "reactflow";

export const initialNodes: Node[] = [
  {
    id: "agent-main",
    type: "custom",
    position: { x: 220, y: 180 },
    data: {
      title: "Agent",
      content: "Musteri temsilcisi agent.",
      color: "text-emerald-500",
      isGlobal: false,
      instructions:
        "Sen Ebru'sun, Gotur adli sirkette musteri temsilcisisin. Siparis kontrolu, iptal ve iade konusunda yardimci ol.",
      allow_interruptions: true,
      greet_prompt:
        "Merhaba, burasi Gotur musteri destek departmani. Bugun size nasil yardimci olabilirim?",
      goodbye_prompt: "Cikmadan once kullaniciya samimi bir sekilde veda et.",
      tools: ["cancel_order", "fetch_order_status"],
      llm: {
        provider: "google",
        model: "gemini-2.5-flash-native-audio-preview-12-2025",
        is_realtime: true,
        voice: "Autonoe",
        api_key: "",
      },
    },
  },
  {
    id: "http-tool-cancel-order",
    type: "custom",
    position: { x: 520, y: 90 },
    data: {
      title: "HTTP Tool",
      content: "cancel_order",
      color: "text-sky-500",
      isGlobal: false,
      description:
        "Siparisi iptal etmek icin kullanilir. Siparis iptal edildikten sonra iade islemi baslatilir.",
      id: "cancel_order",
      url: "https://webhook.site/cf733231-152e-4b71-bd22-3db680d99c3b/orders/:order_id",
      method: "DELETE",
      headers: {
        Authorization: "Bearer <TOKEN>",
      },
      timeout: 10,
      max_retry: 0,
      follow_redirects: false,
      body: {
        id: "$order_id",
      },
      query_params: null,
      parameters: {
        type: "object",
        properties: {
          order_id: {
            type: "string",
            description: "Iptal edilecek siparisin id'si",
          },
        },
        required: ["order_id"],
      },
      error_message: "Islem basarisiz oldu. Lutfen tekrar deneyin.",
      success_message: "Siparisin iptal olduguna dair kullaniciyi bilgilendir.",
    },
  },
  {
    id: "http-tool-fetch-status",
    type: "custom",
    position: { x: 520, y: 270 },
    data: {
      title: "HTTP Tool",
      content: "fetch_order_status",
      color: "text-sky-500",
      isGlobal: false,
      description: "Siparisin mevcut durumunu sorgulamak icin kullanilir.",
      id: "fetch_order_status",
      url: "https://webhook.site/cf733231-152e-4b71-bd22-3db680d99c3b/orders/:order_id/status",
      method: "GET",
      headers: {
        Authorization: "Bearer <TOKEN>",
      },
      timeout: 10,
      max_retry: 0,
      follow_redirects: false,
      body: null,
      query_params: null,
      parameters: {
        type: "object",
        properties: {
          order_id: {
            type: "string",
            description: "Sorgulanacak siparisin id'si",
          },
        },
        required: ["order_id"],
      },
      error_message: "Siparis durumu alinamadi. Lutfen tekrar deneyin.",
    },
  },
];

export const initialEdges: Edge[] = [
  {
    id: "e-agent-cancel",
    source: "agent-main",
    target: "http-tool-cancel-order",
    type: "smoothstep",
  },
  {
    id: "e-agent-status",
    source: "agent-main",
    target: "http-tool-fetch-status",
    type: "smoothstep",
  },
];
