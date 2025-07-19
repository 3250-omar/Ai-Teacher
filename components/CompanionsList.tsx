import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getSubjectColor } from "@/lib/utils";
import { Companion } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface CompanionsListProps {
  companions?: Companion[];
  title: string;
  classNames?: string;
}
const CompanionsList = ({
  companions,
  title,
  classNames,
}: CompanionsListProps) => {
  return (
    <article className={`companion-list ${classNames}`}>
      <h2 className="text-3xl font-bold">{title}</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className=" text-lg w-2/3">Lessons</TableHead>
            <TableHead className="text-lg ">Subject</TableHead>
            <TableHead className="text-lg text-right ">Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!companions?.length && (
            <TableRow>
              <TableCell colSpan={3} className="text-2xl font-bold underline">
                No companions Yet , add your First
              </TableCell>
            </TableRow>
          )}
          {companions?.map(({ id, subject, duration, name, topic }, index) => (
            <TableRow key={`${id}-${index}`}>
              <TableCell className="font-medium">
                <Link href={`/companion/${id}`}>
                  <div className="flex items-center gap-2">
                    <div
                      className="flex items-center justify-center size-[72px] rounded-lg max-md:hidden"
                      style={{ backgroundColor: getSubjectColor(subject) }}
                    >
                      <Image
                        src={`/icons/${subject}.svg`}
                        alt={subject}
                        width={35}
                        height={35}
                      />
                    </div>
                    <div className="flex flex-col gap-2 ">
                      <p className="font-bold text-xl"> {name}</p>
                      <p className="text-lg ">{topic}</p>
                    </div>
                  </div>
                </Link>
              </TableCell>
              <TableCell>
                <div
                  className="subject-badge w-fit max-sm:block hidden"
                  style={{ backgroundColor: getSubjectColor(subject) }}
                >
                  <Image
                    src={`/icons/${subject}.svg`}
                    alt={subject}
                    width={18}
                    height={18}
                  />
                </div>
                <p className="font-bold text-sm text-center max-sm:hidden max-md:block subject-badge ">
                  {subject}
                </p>
              </TableCell>
              <TableCell className="text-right">
                <div className="items-center flex gap-2 justify-end">
                  <Image
                    src="/icons/clock.svg"
                    width={15}
                    height={15}
                    alt="time"
                    className="md:hidden max-md:block"
                  />
                  <p className="font-bold text-xl ">{duration}</p>
                  <p className="max-md:hidden font-bold">mins</p>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </article>
  );
};

export default CompanionsList;
