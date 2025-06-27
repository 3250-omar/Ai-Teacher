import { Plus } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

//call to action section
const CTA = () => {
  return (
    <section className="cta-section">
      <p className="cta-badge  ">Start Learning Your Way</p>
      <h2 className="font-bold text-2xl">
        Build and Personalize Learning Companion
      </h2>
      <p>
        Pick a name, subject, voice, & personality — and start learning through
        voice conversations that feel natural and fun.
      </p>
      <Image
        src="/images/cta.svg"
        alt="CTA"
        width={350}
        height={350}
        priority
      />
      <Link href={"/companion/new"}>
        <Button className=" p-6 bg-button-cta text-lg cursor-pointer">
          {" "}
          <Plus />
          Build New Companion{" "}
        </Button>
      </Link>
    </section>
  );
};

export default CTA;
