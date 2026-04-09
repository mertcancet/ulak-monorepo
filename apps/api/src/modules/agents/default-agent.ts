import { eq } from "drizzle-orm";
import db from "~/db";
import { agentFlows, agents } from "~/db/schema";

const DEFAULT_AGENT_NAME = "Yeni Agent";

const buildDefaultFlow = () => ({
  nodes: [
    {
      id: "agent-main",
      type: "custom",
      position: { x: 220, y: 180 },
      data: {
        title: "Agent",
        content: "Yeni olusturulan varsayilan agent.",
        color: "text-emerald-500",
        isGlobal: false,
        instructions:
          "Kullanicidan ihtiyacini net bir sekilde ogren, kisa ve net cevaplar ver.",
        allow_interruptions: true,
        greet_prompt: "Merhaba, size nasil yardimci olabilirim?",
        goodbye_prompt: "Yardimci olabildiysem ne mutlu. Iyi gunler.",
        tools: [],
        llm: {
          provider: "google",
          model: "gemini-2.5-flash-native-audio-preview-12-2025",
          is_realtime: true,
          voice: "Autonoe",
          api_key: "",
        },
      },
    },
  ],
  edges: [],
});

export const ensureDefaultAgentForUser = async (userId: string) => {
  const [existingAgent] = await db
    .select({ id: agents.id })
    .from(agents)
    .where(eq(agents.ownerUserId, userId))
    .limit(1);

  if (existingAgent) {
    return;
  }

  await db.transaction(async tx => {
    const [agent] = await tx
      .insert(agents)
      .values({
        ownerUserId: userId,
        name: DEFAULT_AGENT_NAME,
        description: "Sistemin otomatik olusturdugu varsayilan agent.",
        isActive: true,
      })
      .returning();

    await tx.insert(agentFlows).values({
      ownerUserId: userId,
      agentId: agent.id,
      flow: buildDefaultFlow(),
    });
  });
};
