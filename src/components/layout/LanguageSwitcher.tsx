import { GlobeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLocale, useTranslations } from '@/i18n';
import { usePathname, useRouter } from '@/i18n/navigation';

const languages = [
  { code: 'tr', name: 'Turkce', flag: 'TR' },
  { code: 'en', name: 'English', flag: 'EN' },
] as const;

export function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale as 'tr' | 'en' });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-white/80 hover:bg-white/10 hover:text-white"
        >
          <GlobeIcon className="size-5" />
          <span className="sr-only">{t('navbar.switchLanguage')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-40 border-white/10 bg-slate-950/95 text-white backdrop-blur-md"
      >
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={cn(
              'transition-colors data-[highlighted]:bg-white/5',
              locale === language.code &&
                'bg-primary/20 text-white data-[highlighted]:bg-primary/20',
            )}
          >
            <span className="mr-2 text-xs font-semibold text-primary/90">{language.flag}</span>
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
