import {
  Bot,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  MoreVertical,
  Search,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import DashboardHeader from "./_components/dashboard-header";

const agents = [
  {
    id: 1,
    name: "Sağlık Kontrolü (şablondan)",
    type: "Tekil Komut",
    voice: "Cimo",
    voiceImg:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDFE04qOA0LzD1UUmktDRXDrl-UvuwAudLMxFGmnVqVdBZ7AeN9gf8LnFm_8gm39d6ACuczz67VSE-kiF9AI_Ax8clL_F03_gZeC77QphBQfMOh3rpENrHLnEQS8chh18ss_rUF-f53uqawef7bYC0Twexri6KFpWgF6hjN-C6xynZtie99MQmzGy-P4moWodPMU0xg-L8WLPE4h700MImRJyeM7AKMocGaW4hJBkEe_ai97yh2It8vddTIoyIShRSJy0LtzcjlF_A",
    phone: "-",
    lastEdited: "17/02/2026, 12:16",
  },
  {
    id: 2,
    name: "Hasta Tarama (şablondan)",
    type: "Sohbet Akışı",
    voice: "Cimo",
    voiceImg:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCpl0vODwez0TF22wNa1xlO3e77vQQtqRirB2lMq7NvopAT6F-KFpzf3heb_76Z1IezTXbDXOc-wnsak0jODWd0sT6WBaSL-jQlMtMJGoZL96pnd55G0_lm5ogMdCMrUmw1gdKrN6H72QyLNGsjnI6woDwtVPs5GlhVZICGXxBnF92QIv8xI42IbWtlA4SaTNr4RHD22ygpKuEV-b7P6uoXxL3dMez-DJJO3e9idtudjbjOVB6GKCHQCvAMevRbYCyWBAAaI8vFUn0",
    phone: "-",
    lastEdited: "17/02/2026, 12:12",
  },
];

export default function Dashboard() {
  return (
    <>
      <DashboardHeader>
        <h1 className="text-lg font-bold tracking-tight">Temsilciler</h1>
        <div className="flex items-center space-x-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-primary transition-colors" />
            <Input
              className="pl-9 pr-4 h-9 w-64 bg-secondary/50 border-border focus:bg-card transition-all"
              placeholder="Temsilci ara..."
            />
          </div>
          <Button variant="outline" size="sm" className="h-9 gap-2">
            <Download className="w-3.5 h-3.5" />
            İçe Aktar
          </Button>
          <Button size="sm" className="h-9 gap-2 font-semibold">
            <span>Temsilci Oluştur</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </Button>
        </div>
      </DashboardHeader>

      <div className="p-8 space-y-6 flex-1 overflow-auto">
        <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden glass">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent bg-secondary/30">
                <TableHead className="w-75 text-[11px] uppercase tracking-wider font-bold h-12">
                  Temsilci Adı
                </TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider font-bold h-12">
                  Temsilci Türü
                </TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider font-bold h-12">
                  Ses
                </TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider font-bold h-12">
                  Telefon
                </TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider font-bold h-12">
                  Son Düzenleme
                </TableHead>
                <TableHead className="w-12 h-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agents.map(agent => (
                <TableRow
                  key={agent.id}
                  className="group hover:bg-secondary/20 transition-colors"
                >
                  <TableCell className="py-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-secondary rounded-lg border border-border group-hover:border-primary/20 transition-colors">
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm font-semibold tracking-tight">
                        {agent.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge
                      variant="secondary"
                      className="font-medium text-[10px] px-2 py-0 h-5 bg-secondary text-muted-foreground border-border"
                    >
                      {agent.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-6 h-6 ring-1 ring-border">
                        <AvatarImage src={agent.voiceImg} />
                        <AvatarFallback>V</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-foreground/80 font-medium">
                        {agent.voice}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 text-sm text-muted-foreground">
                    {agent.phone}
                  </TableCell>
                  <TableCell className="py-4 text-sm text-muted-foreground/80">
                    {agent.lastEdited}
                  </TableCell>
                  <TableCell className="py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-40 border-border"
                      >
                        <DropdownMenuItem>Düzenle</DropdownMenuItem>
                        <DropdownMenuItem>Kopyala</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Sil
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="px-6 py-4 bg-secondary/10 border-t border-border flex items-center justify-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground disabled:opacity-30"
              disabled
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="w-7 h-7 flex items-center justify-center bg-primary text-primary-foreground rounded-lg text-xs font-bold shadow-sm">
              1
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
