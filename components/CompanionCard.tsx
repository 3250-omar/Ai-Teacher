import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

interface companionsCardProps {
  id: string;
  subject: string;
  duration: number;
  color: string;
  topic: string;
  name: string;
}
const CompanionCard = (item: companionsCardProps) => {
  const { id, color, duration, subject, topic, name } = item;
  return (
    <article className={`companion-card `} style={{ backgroundColor: color }}>
      <div className="flex items-center justify-between">
        <p className="subject-badge"> {subject}</p>
        <Image
          src="/icons/bookmark.svg"
          alt="bookmark"
          className="companion-bookmark"
          width={24}
          height={24}
        />
      </div>
      <h2 className="text-2xl font-bold">{name}</h2>
      <p className="text-sm">Topic: {topic}</p>
      <div className="text-sm flex items-center gap-2">
        <Image src="/icons/clock.svg" alt="clock" height={16} width={16} />
        Duration: {duration} minutes
      </div>
      <Button className=" cursor-pointer  bg-button-cta">
        <Link href={`/companion/${id}`} className="w-full">
          Launch Lesson
        </Link>
      </Button>
    </article>
  );
};

export default CompanionCard;
