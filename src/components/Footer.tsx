import React, { FC } from "react";
import { socialLiks } from "@/data/socialLinks";
import Link from "next/link";
import NowPlaying from "./NowPlaying";

interface GridItem {
  label: string;
  href: string;
}

const grid1: GridItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Projects", href: "/projects" },
];

const grid2: GridItem[] = [
  { label: "Guestbook", href: "/guestbook" },
  { label: "Tags", href: "/tags" },
  { label: "Uses", href: "/uses" },
  { label: "Contact", href: "/Contact" },
];

const Footer: FC = () => {
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-base font-medium mb-3">See what I'm listening on Spotify right now.</h1>
        <NowPlaying />
      </div>
      <div className="flex flex-col-reverse gap-8 sm:flex-row sm:justify-between">
        <div className="max-w-[400px]">
          <h1 className="text-lg font-semibold">About Me</h1>
          <p className="text-base opacity-60">
            {`I'm`} Dev, a <strong>front-end developer</strong> who loves
            intuitive, clean and modern UI design.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <li className="flex flex-col space-y-4">
            {grid1.map((grid) => (
              <Link
                href={grid.href}
                key={grid.label}
                className="hover:text-[#20a4f3]"
              >
                {grid.label}
              </Link>
            ))}
          </li>
          <li className="flex flex-col space-y-4">
            {grid2.map((grid) => (
              <Link
                href={grid.href}
                key={grid.label}
                className="hover:text-[#20a4f3]"
              >
                {grid.label}
              </Link>
            ))}
          </li>
        </div>
      </div>
      <hr className="border border-white/40 opacity-30 mt-6 mb-3" />
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between h-[70px] sm:h-[50px] items-center">
        <p>&copy; 2024, Dev</p>
        <div className="flex items-center gap-4">
          {socialLiks.map((link) => (
            <Link
              href={link.href}
              key={link.label}
              target="_blank"
              className="hover:text-[#20a4f3]"
            >
              {link.icon}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
