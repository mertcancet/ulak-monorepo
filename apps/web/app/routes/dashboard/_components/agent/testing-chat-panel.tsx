import { Bot, Send, User } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "~/components/ui/button";

type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

export function TestingChatPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Merhaba, ben temsilcinizim. Yazılı olarak sorularınızı yanıtlayabilirim.",
    },
  ]);
  const [input, setInput] = useState<string>("");

  const nextMessageId = useMemo<number>(() => messages.length + 1, [messages]);

  const handleSendMessage = (): void => {
    const trimmed = input.trim();
    if (!trimmed) {
      return;
    }

    const userMessage: ChatMessage = {
      id: nextMessageId,
      role: "user",
      content: trimmed,
    };

    const assistantReply: ChatMessage = {
      id: nextMessageId + 1,
      role: "assistant",
      content:
        "Mesajınızı aldım. Bu alanda temsilcinin yazılı cevaplarını test edebilirsiniz.",
    };

    setMessages(prev => [...prev, userMessage, assistantReply]);
    setInput("");
  };

  return (
    <div className="relative z-10 flex flex-1 flex-col p-4">
      <div className="bg-background/50 border-border mb-3 flex flex-1 flex-col gap-3 overflow-y-auto rounded-lg border p-3">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex items-start gap-2 ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {message.role === "assistant" ? (
              <div className="bg-primary/10 text-primary mt-0.5 rounded-full p-1.5">
                <Bot className="h-3.5 w-3.5" />
              </div>
            ) : null}

            <div
              className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground rounded-tr-sm"
                  : "bg-secondary text-secondary-foreground rounded-tl-sm"
              }`}
            >
              {message.content}
            </div>

            {message.role === "user" ? (
              <div className="bg-secondary text-muted-foreground mt-0.5 rounded-full p-1.5">
                <User className="h-3.5 w-3.5" />
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <div className="bg-background/70 border-border flex items-center gap-2 rounded-lg border p-2">
        <input
          value={input}
          onChange={event => setInput(event.target.value)}
          onKeyDown={event => {
            if (event.key === "Enter") {
              event.preventDefault();
              handleSendMessage();
            }
          }}
          placeholder="Mesajınızı yazın..."
          className="placeholder:text-muted-foreground text-foreground flex-1 bg-transparent px-2 py-1 text-sm outline-none"
        />
        <Button
          type="button"
          size="icon"
          onClick={handleSendMessage}
          className="h-8 w-8"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
