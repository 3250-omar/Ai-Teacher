import CompanionCard from "@/components/CompanionCard";
import FilterSubject from "@/components/FilterSubject";
import SearchInput from "@/components/SearchInput";
import { getAllCompanions } from "@/lib/actions/companion-action";
import { getSubjectColor } from "@/lib/utils";
import { SearchParams } from "@/types";

const companionLibrary = async ({ searchParams }: SearchParams) => {
  const filtering = await searchParams;
  const subject = filtering.subject ? filtering.subject : "";
  const topic = filtering.topic ? filtering.topic : "";
  const companions = await getAllCompanions({ subject, topic });

  return (
    <main>
      <section className="flex justify-between gap-4 max-sm:flex-col">
        <h1>Companion Library</h1>
        <div className="flex gap-4 items-center">
          <SearchInput />
          <FilterSubject />
        </div>
      </section>
      <section className="companions-grid">
        {companions.map((companion) => (
          <CompanionCard
            key={companion.id}
            color={getSubjectColor(companion.subject)}
            {...companion}
          />
        ))}
      </section>
    </main>
  );
};

export default companionLibrary;
