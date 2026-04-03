import type React from "react";
import { Input } from "~/components/ui/input";
import { Switch } from "~/components/ui/switch";
import type { FlowNodeData } from "~/store/flow-store";
import { useFlowStore } from "~/store/flow-store";

const toJsonString = (value: unknown) =>
  value == null ? "" : JSON.stringify(value, null, 2);

const parseJsonOrFallback = (
  value: string,
  fallback: unknown,
): Record<string, unknown> | null => {
  if (!value.trim()) {
    return fallback as Record<string, unknown> | null;
  }

  try {
    return JSON.parse(value) as Record<string, unknown>;
  } catch {
    return fallback as Record<string, unknown> | null;
  }
};

export const SettingsPanel: React.FC = () => {
  const { selectedNodeId, nodes, setNodes } = useFlowStore();
  const selectedNode = nodes.find(node => node.id === selectedNodeId) ?? null;
  const selectedNodeData = (selectedNode?.data ?? {}) as FlowNodeData;

  const isAgentNode =
    selectedNodeData.title === "Agent" ||
    selectedNode?.id.startsWith("agent") ||
    false;

  const isHttpToolNode =
    selectedNodeData.title === "HTTP Tool" ||
    selectedNode?.id.includes("http") ||
    false;

  const updateSelectedNodeData = (patch: Partial<FlowNodeData>) => {
    if (!selectedNodeId) {
      return;
    }

    setNodes(currentNodes =>
      currentNodes.map(node => {
        if (node.id !== selectedNodeId) {
          return node;
        }

        const currentData = (node.data ?? {}) as Record<string, unknown>;
        return {
          ...node,
          data: {
            ...currentData,
            ...patch,
          },
        };
      }),
    );
  };

  return (
    <aside className="w-90 bg-background border-l border-border flex flex-col font-display">
      <div className="px-4 py-3 border-b border-border">
        <h2 className="text-sm font-bold">Dugum Ayarlari</h2>
        <p className="text-[11px] text-muted-foreground mt-0.5">
          Canvas uzerinden secilen dugumu buradan duzenleyebilirsin.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 scrollbar-hide space-y-4">
        {!selectedNode && (
          <div className="p-4 border border-dashed border-border rounded-xl bg-secondary/20">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Duzenlemek icin once canvas uzerinde bir node sec.
            </p>
          </div>
        )}

        {selectedNode && (
          <>
            <section className="space-y-3 p-3 border border-border rounded-xl bg-secondary/20">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  Node ID
                </span>
                <span className="text-[10px] font-semibold truncate max-w-52">
                  {selectedNode.id}
                </span>
              </div>

              <div>
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                  Baslik
                </p>
                <Input
                  type="text"
                  value={selectedNodeData.title ?? ""}
                  onChange={event =>
                    updateSelectedNodeData({ title: event.target.value })
                  }
                  placeholder="Node basligi"
                />
              </div>

              <div>
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                  Kisa Aciklama
                </p>
                <textarea
                  value={selectedNodeData.content ?? ""}
                  onChange={event =>
                    updateSelectedNodeData({ content: event.target.value })
                  }
                  className="w-full min-h-20 px-3 py-2 text-xs bg-background border border-border rounded-lg outline-none resize-y focus:ring-1 focus:ring-primary/20 focus:border-primary/30"
                  placeholder="Node aciklamasi"
                />
              </div>
            </section>

            {isAgentNode && (
              <section className="space-y-3 p-3 border border-border rounded-xl">
                <h3 className="text-sm font-semibold">Agent Ayarlari</h3>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                      Saglayici
                    </p>
                    <Input
                      type="text"
                      value={selectedNodeData.llm?.provider ?? ""}
                      onChange={event =>
                        updateSelectedNodeData({
                          llm: {
                            ...(selectedNodeData.llm ?? {}),
                            provider: event.target.value,
                          },
                        })
                      }
                      placeholder="google"
                    />
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                      Ses
                    </p>
                    <Input
                      type="text"
                      value={selectedNodeData.llm?.voice ?? ""}
                      onChange={event =>
                        updateSelectedNodeData({
                          llm: {
                            ...(selectedNodeData.llm ?? {}),
                            voice: event.target.value,
                          },
                        })
                      }
                      placeholder="Autonoe"
                    />
                  </div>
                </div>

                <div>
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                    Model
                  </p>
                  <Input
                    type="text"
                    value={selectedNodeData.llm?.model ?? ""}
                    onChange={event =>
                      updateSelectedNodeData({
                        llm: {
                          ...(selectedNodeData.llm ?? {}),
                          model: event.target.value,
                        },
                      })
                    }
                    placeholder="gemini-2.5-flash..."
                  />
                </div>

                <div>
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                    API Anahtari
                  </p>
                  <Input
                    type="password"
                    value={selectedNodeData.llm?.api_key ?? ""}
                    onChange={event =>
                      updateSelectedNodeData({
                        llm: {
                          ...(selectedNodeData.llm ?? {}),
                          api_key: event.target.value,
                        },
                      })
                    }
                    placeholder="API anahtarini gir"
                  />
                </div>

                <div className="rounded-lg border border-border bg-secondary/20 px-2.5 py-2">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-wider">
                        Gercek Zamanli
                      </p>
                      <p className="text-[10px] text-muted-foreground leading-tight">
                        is_realtime ve allow_interruptions ayarlarini yonet.
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Switch
                        size="sm"
                        checked={Boolean(selectedNodeData.llm?.is_realtime)}
                        onCheckedChange={checked =>
                          updateSelectedNodeData({
                            llm: {
                              ...(selectedNodeData.llm ?? {}),
                              is_realtime: Boolean(checked),
                            },
                          })
                        }
                        aria-label="Gercek zamanli"
                      />
                      <Switch
                        size="sm"
                        checked={Boolean(selectedNodeData.allow_interruptions)}
                        onCheckedChange={checked =>
                          updateSelectedNodeData({
                            allow_interruptions: Boolean(checked),
                          })
                        }
                        aria-label="Kesilebilir"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                    Sistem Promptu
                  </p>
                  <textarea
                    value={selectedNodeData.instructions ?? ""}
                    onChange={event =>
                      updateSelectedNodeData({
                        instructions: event.target.value,
                      })
                    }
                    className="w-full min-h-56 px-4 py-3 text-[12px] leading-6 bg-secondary/15 border border-border rounded-xl outline-none resize-y focus:ring-1 focus:ring-primary/20 focus:border-primary/30 font-mono"
                    placeholder="Agent davranisini aciklayan prompt"
                  />
                </div>

                <div>
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                    Karsilama Mesaji
                  </p>
                  <textarea
                    value={selectedNodeData.greet_prompt ?? ""}
                    onChange={event =>
                      updateSelectedNodeData({
                        greet_prompt: event.target.value,
                      })
                    }
                    className="w-full min-h-20 px-3 py-2 text-xs bg-background border border-border rounded-lg outline-none resize-y focus:ring-1 focus:ring-primary/20 focus:border-primary/30"
                    placeholder="Merhaba, size nasil yardimci olabilirim?"
                  />
                </div>

                <div>
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                    Veda Mesaji
                  </p>
                  <textarea
                    value={selectedNodeData.goodbye_prompt ?? ""}
                    onChange={event =>
                      updateSelectedNodeData({
                        goodbye_prompt: event.target.value,
                      })
                    }
                    className="w-full min-h-20 px-3 py-2 text-xs bg-background border border-border rounded-lg outline-none resize-y focus:ring-1 focus:ring-primary/20 focus:border-primary/30"
                    placeholder="Gorusme sonunda soylenecek mesaj"
                  />
                </div>

                <div>
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                    Kullanilabilir Tool ID Listesi (virgulle)
                  </p>
                  <Input
                    type="text"
                    value={(selectedNodeData.tools ?? []).join(", ")}
                    onChange={event =>
                      updateSelectedNodeData({
                        tools: event.target.value
                          .split(",")
                          .map(item => item.trim())
                          .filter(Boolean),
                      })
                    }
                    placeholder="cancel_order, fetch_order_status"
                  />
                </div>
              </section>
            )}

            {isHttpToolNode && (
              <section className="space-y-3 p-3 border border-border rounded-xl">
                <h3 className="text-sm font-semibold">HTTP Tool Ayarlari</h3>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                      Tool ID
                    </p>
                    <Input
                      type="text"
                      value={selectedNodeData.id ?? ""}
                      onChange={event =>
                        updateSelectedNodeData({ id: event.target.value })
                      }
                      placeholder="cancel_order"
                    />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                      Method
                    </p>
                    <select
                      value={selectedNodeData.method ?? "GET"}
                      onChange={event =>
                        updateSelectedNodeData({ method: event.target.value })
                      }
                      className="w-full h-9 px-3 text-xs bg-background border border-border rounded-lg outline-none"
                    >
                      <option value="GET">GET</option>
                      <option value="POST">POST</option>
                      <option value="PUT">PUT</option>
                      <option value="PATCH">PATCH</option>
                      <option value="DELETE">DELETE</option>
                    </select>
                  </div>
                </div>

                <div>
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                    Aciklama
                  </p>
                  <textarea
                    value={selectedNodeData.description ?? ""}
                    onChange={event =>
                      updateSelectedNodeData({
                        description: event.target.value,
                      })
                    }
                    className="w-full min-h-20 px-3 py-2 text-xs bg-background border border-border rounded-lg outline-none resize-y focus:ring-1 focus:ring-primary/20 focus:border-primary/30"
                    placeholder="Tool ne icin kullaniliyor?"
                  />
                </div>

                <div>
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                    URL
                  </p>
                  <Input
                    type="text"
                    value={selectedNodeData.url ?? ""}
                    onChange={event =>
                      updateSelectedNodeData({ url: event.target.value })
                    }
                    placeholder="https://..."
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                      Timeout
                    </p>
                    <Input
                      type="number"
                      value={selectedNodeData.timeout ?? 10}
                      onChange={event =>
                        updateSelectedNodeData({
                          timeout: Number(event.target.value),
                        })
                      }
                    />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                      Max Retry
                    </p>
                    <Input
                      type="number"
                      value={selectedNodeData.max_retry ?? 0}
                      onChange={event =>
                        updateSelectedNodeData({
                          max_retry: Number(event.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="pt-6">
                    <div className="flex items-center gap-2">
                      <Switch
                        size="sm"
                        checked={Boolean(selectedNodeData.follow_redirects)}
                        onCheckedChange={checked =>
                          updateSelectedNodeData({
                            follow_redirects: Boolean(checked),
                          })
                        }
                        aria-label="Yonlendirme"
                      />
                      <span className="text-[11px] text-muted-foreground">
                        Redirect
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                    Headers (JSON)
                  </p>
                  <textarea
                    value={toJsonString(selectedNodeData.headers)}
                    onChange={event =>
                      updateSelectedNodeData({
                        headers: (parseJsonOrFallback(
                          event.target.value,
                          selectedNodeData.headers ?? {},
                        ) ?? {}) as Record<string, string>,
                      })
                    }
                    className="w-full min-h-24 px-3 py-2 text-xs bg-secondary/15 border border-border rounded-lg outline-none resize-y focus:ring-1 focus:ring-primary/20 focus:border-primary/30 font-mono"
                    placeholder='{"Authorization": "Bearer ..."}'
                  />
                </div>

                <div>
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                    Body (JSON)
                  </p>
                  <textarea
                    value={toJsonString(selectedNodeData.body)}
                    onChange={event =>
                      updateSelectedNodeData({
                        body: parseJsonOrFallback(
                          event.target.value,
                          selectedNodeData.body ?? null,
                        ),
                      })
                    }
                    className="w-full min-h-24 px-3 py-2 text-xs bg-secondary/15 border border-border rounded-lg outline-none resize-y focus:ring-1 focus:ring-primary/20 focus:border-primary/30 font-mono"
                    placeholder='{"id": "$order_id"}'
                  />
                </div>

                <div>
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                    Parametreler (JSON Schema)
                  </p>
                  <textarea
                    value={toJsonString(selectedNodeData.parameters)}
                    onChange={event =>
                      updateSelectedNodeData({
                        parameters:
                          parseJsonOrFallback(
                            event.target.value,
                            selectedNodeData.parameters ?? {},
                          ) ?? {},
                      })
                    }
                    className="w-full min-h-32 px-3 py-2 text-xs bg-secondary/15 border border-border rounded-lg outline-none resize-y focus:ring-1 focus:ring-primary/20 focus:border-primary/30 font-mono"
                    placeholder='{"type":"object","properties":{}}'
                  />
                </div>

                <div>
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                    Hata Mesaji
                  </p>
                  <Input
                    type="text"
                    value={selectedNodeData.error_message ?? ""}
                    onChange={event =>
                      updateSelectedNodeData({
                        error_message: event.target.value,
                      })
                    }
                    placeholder="Islem basarisiz oldu."
                  />
                </div>

                <div>
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                    Basari Mesaji
                  </p>
                  <Input
                    type="text"
                    value={selectedNodeData.success_message ?? ""}
                    onChange={event =>
                      updateSelectedNodeData({
                        success_message: event.target.value,
                      })
                    }
                    placeholder="Islem tamamlandi."
                  />
                </div>
              </section>
            )}

            {!isAgentNode && !isHttpToolNode && (
              <section className="p-3 border border-border rounded-xl bg-secondary/20">
                <p className="text-xs text-muted-foreground">
                  Bu node tipi icin ozel bir form tanimli degil.
                </p>
              </section>
            )}
          </>
        )}
      </div>
    </aside>
  );
};
