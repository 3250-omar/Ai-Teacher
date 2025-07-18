import CompanionsBuilder from "@/components/CompanionsBuilder";
import { CreatingCompanionPermission } from "@/lib/actions/companion-action";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ca } from "zod/v4/locales";

const newCompanion = async () => {
  const { userId } = await auth();
  if (!userId) return redirect("/sign-in");
  const canCreateCompanion = await CreatingCompanionPermission();
  return (
    <main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center">
      {canCreateCompanion ? (
        <article className="flex flex-col gap-4 w-full">
          <h1>Companion Builder</h1>
          <CompanionsBuilder />
        </article>
      ) : (
        <article className="companion-limit">
          <Image
            src="/images/limit.svg"
            alt="Companion Limit Reached"
            width={360}
            height={230}
          />
          <div className="cta-badge">Upgrade your plan</div>
          <h1> You Reached Your Limit</h1>
          <p>
            You've reached the maximum number of companions allowed on your
            current plan. Upgrade your plan to create more companions.
          </p>
          <Link
            href="/subscription"
            className="btn-primary w-full justify-center"
          >
            Upgrade My Plan
          </Link>
        </article>
      )}
      {canCreateCompanion}
    </main>
  );
};

export default newCompanion;
