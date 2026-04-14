import { Check, ChevronDown } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import type { AiModel } from "./toolbar.data";

interface ModelDialogProps {
  models: AiModel[];
  selectedModelId: string;
  selectedModelName: string;
  onSelectModel: (modelId: string) => void;
}

export function QuickSelectModelDialog({
  models,
  selectedModelId,
  selectedModelName,
  onSelectModel,
}: ModelDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-background/50 border-border hover:bg-secondary h-8 gap-2"
        >
          <span className="text-xs font-semibold">{selectedModelName}</span>
          <ChevronDown className="text-muted-foreground h-3 w-3" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>AI Model Secimi</DialogTitle>
          <DialogDescription>
            Testlerde kullanilacak temel modeli secin.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-2">
          {models.map(model => {
            const isSelected = model.id === selectedModelId;
            return (
              <button
                key={model.id}
                type="button"
                onClick={() => onSelectModel(model.id)}
                className={`border-border hover:border-primary/40 hover:bg-secondary/50 flex items-start justify-between rounded-xl border p-3 text-left transition-colors ${
                  isSelected ? "border-primary bg-primary/5" : ""
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{model.name}</span>
                    <span className="text-muted-foreground text-[11px] font-medium">
                      {model.provider}
                    </span>
                  </div>
                  <p className="text-muted-foreground mt-1 text-xs">
                    {model.description}
                  </p>
                </div>
                {isSelected ? (
                  <div className="bg-primary/10 text-primary rounded-full p-1">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                ) : null}
              </button>
            );
          })}
        </div>

        <DialogFooter>
          <Button type="button">Modeli Kaydet</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
