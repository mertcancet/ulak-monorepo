import { ChevronDown } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import type { LanguageOption } from "./toolbar.data";

interface LanguageMenuProps {
  languages: LanguageOption[];
  selectedLanguage: string;
  selectedLanguageLabel: string;
  onSelectLanguage: (languageCode: string) => void;
}

export function QuickSelectLanguageMenu({
  languages,
  selectedLanguage,
  selectedLanguageLabel,
  onSelectLanguage,
}: LanguageMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-background/50 border-border hover:bg-secondary ml-auto h-8 gap-2"
        >
          <span className="text-xs font-bold tracking-wider uppercase">
            {selectedLanguageLabel}
          </span>
          <ChevronDown className="text-muted-foreground h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuRadioGroup
          value={selectedLanguage}
          onValueChange={onSelectLanguage}
        >
          {languages.map(language => (
            <DropdownMenuRadioItem key={language.code} value={language.code}>
              {language.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
