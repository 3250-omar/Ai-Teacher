import CompanionsBuilder from "@/components/CompanionsBuilder";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const newCompanion = async () => {
  const { userId } = await auth();
  if (!userId) return redirect("/sign-in");
  return (
    <main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center">
      <article className="flex flex-col gap-4 w-full">
        <h1>Companion Builder</h1>
        <CompanionsBuilder />
      </article>
    </main>
  );
};

export default newCompanion;
