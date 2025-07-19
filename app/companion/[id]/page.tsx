import CompanionComponents from "@/components/CompanionComponents";
import { getCompanion } from "@/lib/actions/companion-action";
import { getSubjectColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

interface CompanionSessionPageProps {
  params: Promise<{ id: string }>;
}

const CompanionSession = async ({ params }: CompanionSessionPageProps) => {
  const { id } = await params;
  const companion = await getCompanion(id);
  const user = await currentUser();
  const { duration, name, topic, subject, voice } = companion;
  if (!companion) redirect("/companion");
  if (!user) redirect("/sign-in");
  return (
    <main>
      <article className="flex rounded-border justify-between p-6 max-md:flex-col">
        <div className="flex items-center gap-4">
          <div
            className="flex items-center justify-center rounded-lg max-md:hidden size-[72px]"
            style={{ backgroundColor: getSubjectColor(subject) }}
          >
            <Image
              src={`/icons/${subject}.svg`}
              alt={subject}
              width={35}
              height={35}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <p className="font-bold text-2xl">{name}</p>
              <div className="max-sm:hidden subject-badge">{subject}</div>
            </div>

            <p className="text-lg">{topic}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 flex-col max-md:hidden">
          <div className="items-start text-xl  font-semibold">
            <span
              style={{ color: getSubjectColor(subject) }}
              className="font-bold text-2xl"
            >
              {duration}
            </span>{" "}
            Minutes
          </div>
          <div className="text-xl font-bold">
            Voice: <span style={{ color: "skyblue" }}>{voice}</span>
          </div>
        </div>
      </article>
      <CompanionComponents
        {...companion}
        companionId={id}
        userName={user.firstName}
        userImage={user.imageUrl}
      />
    </main>
  );
};

export default CompanionSession;
