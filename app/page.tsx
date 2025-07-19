import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
import {
  getAllCompanions,
  getRecentSessions,
} from "@/lib/actions/companion-action";
import { getSubjectColor } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";

const Page = async () => {
  const companions = await getAllCompanions({ limit: 3 });
  const { userId } = await auth();
  const recentlySessions = await getRecentSessions(10, userId || "");

  return (
    <main>
      <h1>Popular Companions</h1>
      <section className="companions-grid">
        {companions.map((companion) => (
          <CompanionCard
            {...companion}
            key={companion.id}
            color={getSubjectColor(companion.subject)}
          />
        ))}
      </section>
      <section className="home-section">
        <CompanionsList
          companions={recentlySessions}
          title="Your Recently Completed Sessions"
          classNames={"w-2/3 max-lg:w-full"}
        />
        <CTA />
      </section>
    </main>
  );
};

export default Page;
