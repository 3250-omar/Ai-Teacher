"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { subjects } from "@/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";

const FilterSubject = () => {
  const [selectedSelect, setSelectedSelect] = useState<string>("");
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("subject") || "";
  const router = useRouter();

  useEffect(() => {
    setSelectedSelect(query);
  }, [query]);

  const handleSubjectChange = (value: string) => {
    if (value === "Reset") {
      setSelectedSelect("");
      if (pathName === "/companion") {
        const newUrl = removeKeysFromUrlQuery({
          params: searchParams.toString(),
          keysToRemove: ["subject"],
        });
        router.push(newUrl, { scroll: false });
      }
    }

    if (value && value !== "Reset") {
      setSelectedSelect(value);
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "subject",
        value,
      });
      router.push(newUrl);
    }
  };

  return (
    <Select value={selectedSelect} onValueChange={handleSubjectChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Subject" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Subjects</SelectLabel>
          {subjects.map((subject) => (
            <SelectItem key={subject} value={subject}>
              {subject}
            </SelectItem>
          ))}
          <SelectItem value="Reset">Reset</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default FilterSubject;
