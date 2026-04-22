import { Badge } from "~/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import type { ContactNumberItem } from "./constants";

interface ContactNumbersSectionProps {
  numbers: ContactNumberItem[];
}

const groupStyles: Record<ContactNumberItem["customerGroup"], string> = {
  Pazarlama: "bg-brand/10 text-brand border-brand/30",
  Bilgilendirme: "bg-warning/10 text-warning border-warning/30",
  Randevu: "bg-success/10 text-success border-success/30",
};

export function ContactNumbersSection({ numbers }: ContactNumbersSectionProps) {
  return (
    <section className="bg-card border-border overflow-hidden rounded-2xl border shadow-sm">
      <div className="border-border border-b p-4">
        <h2 className="text-foreground text-sm font-semibold">Tum Numaralar</h2>
        <p className="text-muted-foreground mt-1 text-xs">
          Kitledeki tum numaralar ve musteri grup bilgileri.
        </p>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-secondary/50 border-border border-b hover:bg-transparent">
            <TableHead className="h-10 pl-4 text-[11px]">Kisi</TableHead>
            <TableHead className="h-10 text-[11px]">Telefon</TableHead>
            <TableHead className="h-10 text-[11px]">Hedef Kitle</TableHead>
            <TableHead className="h-10 text-[11px]">Musteri Grubu</TableHead>
            <TableHead className="h-10 text-[11px]">Sehir</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {numbers.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-muted-foreground py-8 text-center text-xs"
              >
                Numara bulunamadi.
              </TableCell>
            </TableRow>
          )}

          {numbers.map(item => (
            <TableRow
              key={item.id}
              className="border-border/80 border-b last:border-b-0"
            >
              <TableCell className="py-3 pl-4 text-xs font-semibold">
                {item.fullName}
              </TableCell>
              <TableCell className="py-3 text-xs">{item.phone}</TableCell>
              <TableCell className="py-3 text-xs">
                {item.audienceName}
              </TableCell>
              <TableCell className="py-3">
                <Badge className={groupStyles[item.customerGroup]}>
                  {item.customerGroup}
                </Badge>
              </TableCell>
              <TableCell className="py-3 text-xs">{item.city}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
