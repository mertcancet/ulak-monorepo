import type { AgentHandoffToolFormData } from "@cleon/shared";
import { useQuery } from "@tanstack/react-query";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Select } from "~/components/ui/select";
import { Slider } from "~/components/ui/slider";
import { Switch } from "~/components/ui/switch";
import { Textarea } from "~/components/ui/textarea";
import { agentsApi } from "~/lib/agents-api";

export type { AgentHandoffToolFormData };

interface AgentHandoffToolFormProps {
  data: AgentHandoffToolFormData;
  onChange: (data: AgentHandoffToolFormData) => void;
}

export function AgentHandoffToolForm({
  data,
  onChange,
}: AgentHandoffToolFormProps) {
  const { data: agents = [], isLoading: isAgentsLoading } = useQuery({
    queryKey: ["agents", "agent-handoff"],
    queryFn: async () => {
      const response = await agentsApi.listAgents();
      return response.data;
    },
  });

  const update = (partial: Partial<AgentHandoffToolFormData>) => {
    onChange({ ...data, ...partial });
  };

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-5">
        <h3 className="text-foreground text-sm font-semibold">
          Temel bilgiler
        </h3>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="agent-handoff-name">Ad</Label>
          <Input
            id="agent-handoff-name"
            placeholder="e.g. transfer_to_support_agent"
            value={data.name}
            onChange={e => update({ name: e.target.value })}
          />
          <p className="text-muted-foreground text-xs">
            En az 3 karakter, harfle baslamali ve sadece kucuk harf/rakam/_/-
            icerebilir
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="agent-handoff-desc">Açıklama</Label>
          <Textarea
            id="agent-handoff-desc"
            placeholder="or. Görüşmeyi uygun olduğunda destek temsilcisine aktar."
            value={data.description}
            onChange={e => update({ description: e.target.value })}
          />
        </div>

        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-foreground text-sm font-medium">
              Kesintilere izin verme
            </span>
            <span className="text-muted-foreground text-xs">
              Araç çalışırken kullanıcının konuşmasını engeller
            </span>
          </div>
          <Switch
            checked={data.disallowInterruptions}
            onCheckedChange={val => update({ disallowInterruptions: val })}
          />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h3 className="text-foreground text-sm font-semibold">
            Aktarım ayarları
          </h3>
          <p className="text-muted-foreground mt-0.5 text-xs">
            Görüşme hangi temsilciye ve hangi bağlamla aktarılacak
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="agent-handoff-destination">Hedef Temsilci</Label>
          <Select
            id="agent-handoff-destination"
            value={data.destinationAgent}
            onChange={e => update({ destinationAgent: e.target.value })}
          >
            <option value="" disabled>
              {isAgentsLoading ? "Temsilciler yükleniyor..." : "Temsilci seçin"}
            </option>
            {agents.map(agent => (
              <option key={agent.id} value={agent.id}>
                {agent.name}
              </option>
            ))}
          </Select>
          <p className="text-muted-foreground text-xs">
            Seçilen Temsilci kimliği destination_agent alanına gönderilir
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="agent-handoff-context-strategy">
            Bağlam stratejisi
          </Label>
          <Select
            id="agent-handoff-context-strategy"
            value={data.contextStrategy}
            onChange={e =>
              update({
                contextStrategy: e.target
                  .value as AgentHandoffToolFormData["contextStrategy"],
              })
            }
          >
            <option value="all">Tüm görüşme bağlamını aktar</option>
            <option value="last_n">Son N mesajı aktar</option>
            <option value="none">Bağlam aktarma</option>
          </Select>
        </div>

        {data.contextStrategy === "last_n" && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label>Aktarılacak mesaj limiti</Label>
              <span className="text-muted-foreground text-xs">
                {data.contextMessageLimit}
              </span>
            </div>
            <Slider
              min={1}
              max={20}
              value={[data.contextMessageLimit]}
              onValueChange={([v]) => update({ contextMessageLimit: v ?? 1 })}
            />
            <p className="text-muted-foreground text-xs">
              Son N mesajı aktarımında kullanılır
            </p>
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="agent-handoff-message">Aktarım mesajı</Label>
          <Textarea
            id="agent-handoff-message"
            placeholder="Müşteriyi faturalama destek temsilcisine aktarıyorum."
            value={data.handoffMessage ?? ""}
            onChange={e => update({ handoffMessage: e.target.value })}
            rows={3}
          />
        </div>
      </section>
    </div>
  );
}

export const defaultAgentHandoffToolData: AgentHandoffToolFormData = {
  name: "",
  description: "",
  disallowInterruptions: false,
  destinationAgent: "",
  contextStrategy: "all",
  contextMessageLimit: 1,
  handoffMessage: "",
};
