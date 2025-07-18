import CompanionsList from "@/components/CompanionsList";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  getUserCompanions,
  getUserSessions,
} from "@/lib/actions/companion-action";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
const profile = async () => {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  const companions = await getUserCompanions(user.id);
  const sessionHistory = await getUserSessions(user.id);
  console.log(user);
  return (
    <main className="min-lg:w-3/4">
      <section className="flex max-sm:flex-col justify-between gap-4 items-center">
        <div className="flex gap-4 items-center">
          <Image
            src={user.imageUrl}
            alt={user.firstName || ""}
            width={110}
            height={110}
          />
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-2xl">
              {user.firstName || "FirstName"} {user.lastName || "LastName"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {user.emailAddresses[0]?.emailAddress || "No email provided"}
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="border border-black p-3 flex flex-col h-fit rounded-lg gap-3 ">
            <div className="flex gap-2 items-center">
              <Image
                src="/icons/check.svg"
                alt="checked"
                width={22}
                height={22}
              />
              <p className="font-bold text-2xl">{sessionHistory.length}</p>
            </div>
            <div>Lessons Completed</div>
          </div>
          <div className="border border-black p-3 flex flex-col h-fit rounded-lg gap-3 ">
            <div className="flex gap-2 items-center">
              <Image src="/icons/cap.svg" alt="cap" width={22} height={22} />
              <p className="font-bold text-2xl">{companions.length}</p>
            </div>
            <div>Companions Created</div>
          </div>
        </div>
      </section>
      <Accordion type="multiple">
        <AccordionItem value="recent">
          <AccordionTrigger className="font-bold text-2xl">
            Recent Sessions
          </AccordionTrigger>
          <AccordionContent>
            <CompanionsList
              title="Recent Sessions"
              companions={sessionHistory}
              classNames="w-full"
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="companions">
          <AccordionTrigger className="font-bold text-2xl">
            My Companions {`(${companions.length})`}
          </AccordionTrigger>
          <AccordionContent>  
            <CompanionsList
              title="My Companions"
              companions={companions}
              classNames="w-full"
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
};

export default profile;
