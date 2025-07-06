"use client";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchInput = () => {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("topic") || "";
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const Delayfn = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "topic",
          value: searchQuery,
        });

        router.push(newUrl);
      } else {
        if (pathName === "/companion") {
          const newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["topic"],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 500);
    return () => clearTimeout(Delayfn);
  }, [pathName, query, searchParams, searchQuery, router]);
  return (
    <div className="flex items-center gap-4 rounded-xl border-1 border-gray-300  px-2 py-1 relative">
      <Image
        alt="searchIcon"
        src="./icons/search.svg"
        width={15}
        height={15}
        priority
      />
      <input
        type="text"
        placeholder="Search"
        className="outline-none items-center flex text-sm  flex-1"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
