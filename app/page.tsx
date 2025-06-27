import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
import { companionCardsConstants, recentSessions } from "@/constants";

const Page = () => {
  return (
    <main>
      <h1>Popular Companions</h1>
      <section className="companions-grid">
        {companionCardsConstants.map((item) => (
          <CompanionCard item={item} key={item.id} />
        ))}
      </section>
      <section className="home-section">
        <CompanionsList
          companions={recentSessions}
          title="Recently Completed Sessions"
          classNames={"w-2/3 max-lg:w-full"}
        />
        <CTA />
      </section>
    </main>
  );
};

export default Page;
