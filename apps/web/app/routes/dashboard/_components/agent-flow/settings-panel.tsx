import { Maximize2 } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Switch } from "~/components/ui/switch";
import type { FlowNodeData } from "~/store/flow-store";
import { useFlowStore } from "~/store/flow-store";

type ExpandableField = "instructions" | "greet_prompt" | "goodbye_prompt";

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

  // Local state for JSON text fields to allow proper editing
  const [headersText, setHeadersText] = useState(
    toJsonString(selectedNodeData.headers),
  );
  const [bodyText, setBodyText] = useState(toJsonString(selectedNodeData.body));
  const [parametersText, setParametersText] = useState(
    toJsonString(selectedNodeData.parameters),
  );
  const [expandedField, setExpandedField] = useState<ExpandableField | null>(
    null,
  );

  // Sync local state when selected node changes
  // biome-ignore lint: these dependencies ensure state resets when node/data changes
  useEffect(() => {
    setHeadersText(toJsonString(selectedNodeData.headers));
    setBodyText(toJsonString(selectedNodeData.body));
    setParametersText(toJsonString(selectedNodeData.parameters));
    setExpandedField(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNodeId]);

  const expandedFieldTitle =
    expandedField === "instructions"
      ? "Sistem Promptu"
      : expandedField === "greet_prompt"
        ? "Karsilama Mesaji"
        : expandedField === "goodbye_prompt"
          ? "Veda Mesaji"
          : "";

  const expandedFieldPlaceholder =
    expandedField === "instructions"
      ? "Agent davranisini aciklayan prompt"
      : expandedField === "greet_prompt"
        ? "Merhaba, size nasil yardimci olabilirim?"
        : expandedField === "goodbye_prompt"
          ? "Gorusme sonunda soylenecek mesaj"
          : "";

  const expandedFieldValue =
    expandedField === "instructions"
      ? (selectedNodeData.instructions ?? "")
      : expandedField === "greet_prompt"
        ? (selectedNodeData.greet_prompt ?? "")
        : expandedField === "goodbye_prompt"
          ? (selectedNodeData.goodbye_prompt ?? "")
          : "";

  const updateExpandedFieldValue = (value: string) => {
    if (expandedField === "instructions") {
      updateSelectedNodeData({ instructions: value });
      return;
    }

    if (expandedField === "greet_prompt") {
      updateSelectedNodeData({ greet_prompt: value });
      return;
    }

    if (expandedField === "goodbye_prompt") {
      updateSelectedNodeData({ goodbye_prompt: value });
    }
  };

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
    <aside className="bg-background border-border font-display flex h-full w-90 flex-col border-l">
      <div className="border-border border-b px-4 py-3">
        <h2 className="text-sm font-bold">Dugum Ayarlari</h2>
        <p className="text-muted-foreground mt-0.5 text-[11px]">
          Canvas uzerinden secilen dugumu buradan duzenleyebilirsin.
        </p>
      </div>

      <div className="scrollbar-hide flex-1 space-y-4 overflow-y-auto p-4">
        {!selectedNode && (
          <div className="border-border bg-secondary/20 rounded-xl border border-dashed p-4">
            <p className="text-muted-foreground text-xs leading-relaxed">
              Duzenlemek icin once canvas uzerinde bir node sec.
            </p>
          </div>
        )}

        {selectedNode && (
          <>
            <section className="border-border bg-secondary/20 space-y-3 rounded-xl border p-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-muted-foreground text-[10px] tracking-wider uppercase">
                  Node ID
                </span>
                <span className="max-w-52 truncate text-[10px] font-semibold">
                  {selectedNode.id}
                </span>
              </div>

              <div>
                <p className="text-muted-foreground mb-2 block text-[11px] font-semibold tracking-wider uppercase">
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
                <p className="text-muted-foreground mb-2 block text-[11px] font-semibold tracking-wider uppercase">
                  Kisa Aciklama
                </p>
                <textarea
                  value={selectedNodeData.content ?? ""}
                  onChange={event =>
                    updateSelectedNodeData({ content: event.target.value })
                  }
                  className="bg-background border-border focus:ring-primary/20 focus:border-primary/30 min-h-20 w-full resize-y rounded-lg border px-3 py-2 text-xs outline-none focus:ring-1"
                  placeholder="Node aciklamasi"
                />
              </div>
            </section>

            {isAgentNode && (
              <section className="border-border space-y-3 rounded-xl border p-3">
                <h3 className="text-sm font-semibold">Agent Ayarlari</h3>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-muted-foreground mb-2 block text-[11px] font-semibold tracking-wider uppercase">
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
                    <p className="text-muted-foreground mb-2 block text-[11px] font-semibold tracking-wider uppercase">
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
                  <p className="text-muted-foreground mb-2 block text-[11px] font-semibold tracking-wider uppercase">
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
                  <p className="text-muted-foreground mb-2 block text-[11px] font-semibold tracking-wider uppercase">
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

                <div className="border-border bg-secondary/20 rounded-lg border px-2.5 py-2">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold tracking-wider uppercase">
                        Gercek Zamanli
                      </p>
                      <p className="text-muted-foreground text-[10px] leading-tight">
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
                  <p className="text-muted-foreground mb-2 block text-[11px] font-semibold tracking-wider uppercase">
                    Sistem Promptu
                  </p>
                  <div className="relative">
                    <textarea
                      value={selectedNodeData.instructions ?? ""}
                      onChange={event =>
                        updateSelectedNodeData({
                          instructions: event.target.value,
                        })
                      }
                      className="bg-secondary/15 border-border focus:ring-primary/20 focus:border-primary/30 min-h-56 w-full resize-y rounded-xl border px-4 py-3 pr-10 font-mono text-[12px] leading-6 outline-none focus:ring-1"
                      placeholder="Agent davranisini aciklayan prompt"
                    />
                    <button
                      type="button"
                      onClick={() => setExpandedField("instructions")}
                      className="text-muted-foreground hover:text-foreground absolute right-2 bottom-2 rounded-md p-1 transition-colors"
                      title="Buyut"
                      aria-label="Sistem Promptu buyut"
                    >
                      <Maximize2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-muted-foreground mb-2 block text-[11px] font-semibold tracking-wider uppercase">
                    Karsilama Mesaji
                  </p>
                  <div className="relative">
                    <textarea
                      value={selectedNodeData.greet_prompt ?? ""}
                      onChange={event =>
                        updateSelectedNodeData({
                          greet_prompt: event.target.value,
                        })
                      }
                      className="bg-background border-border focus:ring-primary/20 focus:border-primary/30 min-h-20 w-full resize-y rounded-lg border px-3 py-2 pr-9 text-xs outline-none focus:ring-1"
                      placeholder="Merhaba, size nasil yardimci olabilirim?"
                    />
                    <button
                      type="button"
                      onClick={() => setExpandedField("greet_prompt")}
                      className="text-muted-foreground hover:text-foreground absolute right-2 bottom-2 rounded-md p-1 transition-colors"
                      title="Buyut"
                      aria-label="Karsilama Mesaji buyut"
                    >
                      <Maximize2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-muted-foreground mb-2 block text-[11px] font-semibold tracking-wider uppercase">
                    Veda Mesaji
                  </p>
                  <div className="relative">
                    <textarea
                      value={selectedNodeData.goodbye_prompt ?? ""}
                      onChange={event =>
                        updateSelectedNodeData({
                          goodbye_prompt: event.target.value,
                        })
                      }
                      className="bg-background border-border focus:ring-primary/20 focus:border-primary/30 min-h-20 w-full resize-y rounded-lg border px-3 py-2 pr-9 text-xs outline-none focus:ring-1"
                      placeholder="Gorusme sonunda soylenecek mesaj"
                    />
                    <button
                      type="button"
                      onClick={() => setExpandedField("goodbye_prompt")}
                      className="text-muted-foreground hover:text-foreground absolute right-2 bottom-2 rounded-md p-1 transition-colors"
                      title="Buyut"
                      aria-label="Veda Mesaji buyut"
                    >
                      <Maximize2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-muted-foreground mb-2 block text-[11px] font-semibold tracking-wider uppercase">
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
              <section className="border-border space-y-3 rounded-xl border p-3">
                <h3 className="text-sm font-semibold">HTTP Tool Ayarlari</h3>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-muted-foreground mb-2 block text-[11px] font-semibold tracking-wider uppercase">
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
                    <p className="text-muted-foreground mb-2 block text-[11px] font-semibold tracking-wider uppercase">
                      Method
                    </p>
                    <select
                      value={selectedNodeData.method ?? "GET"}
                      onChange={event =>
                        updateSelectedNodeData({ method: event.target.value })
                      }
                      className="bg-background border-border h-9 w-full rounded-lg border px-3 text-xs outline-none"
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
                  <p className="text-muted-foreground mb-2 block text-[11px] font-semibold tracking-wider uppercase">
                    Aciklama
                  </p>
                  <textarea
                    value={selectedNodeData.description ?? ""}
                    onChange={event =>
                      updateSelectedNodeData({
                        description: event.target.value,
                      })
                    }
                    className="bg-background border-border focus:ring-primary/20 focus:border-primary/30 min-h-20 w-full resize-y rounded-lg border px-3 py-2 text-xs outline-none focus:ring-1"
                    placeholder="Tool ne icin kullaniliyor?"
                  />
                </div>

                <div>
                  <p className="text-muted-foreground mb-2 block text-[11px] font-semibold tracking-wider uppercase">
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
                    <p className="text-muted-foreground mb-2 block text-[11px] font-semibold tracking-wider uppercase">
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
                    <p className="text-muted-foreground mb-2 block text-[11px] font-semibold tracking-wider uppercase">
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
                      <span className="text-muted-foreground text-[11px]">
                        Redirect
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-muted-foreground mb-2 block text-[11px] font-semibold tracking-wider uppercase">
                    Headers (JSON)
                  </p>
                  <textarea
                    value={headersText}
                    onChange={event => setHeadersText(event.target.value)}
                    onBlur={() => {
                      const parsed = parseJsonOrFallback(
                        headersText,
                        selectedNodeData.headers ?? {},
                      );
                      if (parsed !== null) {
                        updateSelectedNodeData({
                          headers: parsed as Record<string, string>,
                        });
                      }
                    }}
                    className="bg-secondary/15 border-border focus:ring-primary/20 focus:border-primary/30 min-h-24 w-full resize-y rounded-lg border px-3 py-2 font-mono text-xs outline-none focus:ring-1"
                    placeholder='{"Authorization": "Bearer ..."}'
                  />
                </div>

                <div>
                  <p className="text-muted-foreground mb-2 block text-[11px] font-semibold tracking-wider uppercase">
                    Body (JSON)
                  </p>
                  <textarea
                    value={bodyText}
                    onChange={event => setBodyText(event.target.value)}
                    onBlur={() => {
                      const parsed = parseJsonOrFallback(
                        bodyText,
                        selectedNodeData.body ?? null,
                      );
                      updateSelectedNodeData({ body: parsed });
                    }}
                    className="bg-secondary/15 border-border focus:ring-primary/20 focus:border-primary/30 min-h-24 w-full resize-y rounded-lg border px-3 py-2 font-mono text-xs outline-none focus:ring-1"
                    placeholder='{"id": "$order_id"}'
                  />
                </div>

                <div>
                  <p className="text-muted-foreground mb-2 block text-[11px] font-semibold tracking-wider uppercase">
                    Parametreler (JSON Schema)
                  </p>
                  <textarea
                    value={parametersText}
                    onChange={event => setParametersText(event.target.value)}
                    onBlur={() => {
                      const parsed = parseJsonOrFallback(
                        parametersText,
                        selectedNodeData.parameters ?? {},
                      );
                      if (parsed !== null) {
                        updateSelectedNodeData({ parameters: parsed });
                      }
                    }}
                    className="bg-secondary/15 border-border focus:ring-primary/20 focus:border-primary/30 min-h-32 w-full resize-y rounded-lg border px-3 py-2 font-mono text-xs outline-none focus:ring-1"
                    placeholder='{"type":"object","properties":{}}'
                  />
                </div>

                <div>
                  <p className="text-muted-foreground mb-2 block text-[11px] font-semibold tracking-wider uppercase">
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
                  <p className="text-muted-foreground mb-2 block text-[11px] font-semibold tracking-wider uppercase">
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
              <section className="border-border bg-secondary/20 rounded-xl border p-3">
                <p className="text-muted-foreground text-xs">
                  Bu node tipi icin ozel bir form tanimli degil.
                </p>
              </section>
            )}
          </>
        )}
      </div>

      <Dialog
        open={expandedField !== null}
        onOpenChange={isOpen => {
          if (!isOpen) {
            setExpandedField(null);
          }
        }}
      >
        <DialogContent className="overflow-hidden p-0 sm:max-w-225">
          <DialogHeader className="border-border border-b px-5 py-4">
            <DialogTitle className="text-base">
              {expandedFieldTitle}
            </DialogTitle>
          </DialogHeader>

          <div className="p-5">
            <textarea
              value={expandedFieldValue}
              onChange={event => updateExpandedFieldValue(event.target.value)}
              className="bg-background border-border focus:ring-primary/20 focus:border-primary/30 min-h-[60vh] w-full resize-none rounded-xl border px-4 py-3 font-mono text-sm leading-7 outline-none focus:ring-1"
              placeholder={expandedFieldPlaceholder}
            />

            <div className="mt-4 flex justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setExpandedField(null)}
              >
                Kapat
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </aside>
  );
};
