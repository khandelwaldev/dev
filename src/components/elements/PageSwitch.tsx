import React, { FC } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/Icons";

interface PageSwitchProps {
  title: string;
  href: string;
}

const PageSwitch: FC<PageSwitchProps> = ({ title, href }) => {
  return (
    <Link
      href={href}
      className="mt-10 flex items-center gap-3 hover:gap-4 ease-in-out duration-300 text-lg hover:text-[#20a4f3]"
    >
      {title} <ArrowRightIcon className="w-5 h-5" />
    </Link>
  );
};

export default PageSwitch;
