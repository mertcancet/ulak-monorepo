import { useMemo, useState } from "react";
import {
  AudienceStatsGrid,
  BulkCallsHeader,
  CampaignQueueSection,
  type CampaignStatus,
  ContactNumbersSection,
  campaignItems,
  contactNumberItems,
} from "./_components/bulk-calls";

export default function BulkCallsPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"Tum" | CampaignStatus>(
    "Tum",
  );

  const filteredCampaigns = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return campaignItems.filter(item => {
      const matchesQuery =
        !normalizedQuery ||
        [item.name, item.segment, item.id]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      const matchesStatus =
        statusFilter === "Tum" || item.status === statusFilter;

      return matchesQuery && matchesStatus;
    });
  }, [query, statusFilter]);

  const totalTargets = filteredCampaigns.reduce(
    (sum, item) => sum + item.targetCount,
    0,
  );
  const totalAnswered = filteredCampaigns.reduce(
    (sum, item) => sum + item.answeredCount,
    0,
  );
  const avgConversion =
    filteredCampaigns.length === 0
      ? 0
      : Math.round(
          filteredCampaigns.reduce(
            (sum, item) => sum + item.conversionRate,
            0,
          ) / filteredCampaigns.length,
        );

  return (
    <div className="bg-background animate-in fade-in flex h-full flex-col overflow-hidden duration-300">
      <BulkCallsHeader />

      <main className="scrollbar-thin flex-1 space-y-6 overflow-y-auto p-6">
        <AudienceStatsGrid />
        <CampaignQueueSection
          filteredCampaigns={filteredCampaigns}
          query={query}
          statusFilter={statusFilter}
          setQuery={setQuery}
          setStatusFilter={setStatusFilter}
          totalTargets={totalTargets}
          totalAnswered={totalAnswered}
          avgConversion={avgConversion}
        />
        <ContactNumbersSection numbers={contactNumberItems} />
      </main>
    </div>
  );
}
