import { useState } from "react";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import TabHeader from "./tab-header";

const TextTab = () => {
  const [text, setText] = useState(
    `Bir müşteri destek temsilcisi gibi davran. 
Kullanıcıdan gelen soruları kibarca ve detaylı şekilde yanıtla. 
Gerektiğinde örneklerle açıklama yap ve teknik terimleri sadeleştir.`,
  );
  return (
    <div>
      <TabHeader title="Metin" />
      <div className="px-3">
        <Label
          htmlFor="text"
          className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80 ml-1"
        >
          Metin
        </Label>
        <Textarea
          id="text"
          placeholder="Metni buraya girin veya görüntüleyin..."
          className="w-full min-h-[200px] mt-4 p-2 text-base"
          value={text}
          onChange={e => setText(e.target.value)}
        />
      </div>
    </div>
  );
};

export default TextTab;
