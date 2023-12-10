import UnstyledLink, {
  UnstyledLinkProps,
} from "@/components/elements/UnstyledLink";

import { twclsx } from "@/libs/twclsx";

export interface UnderlineLinkProps extends UnstyledLinkProps {
  children: React.ReactNode;
}

const UnderlineLink: React.FC<UnderlineLinkProps> = ({
  children,
  ...props
}) => {
  return (
    <UnstyledLink
      className={twclsx("relative", "inline-block", "text-[#20a4f3]", "group", "no-underline")}
      {...props}
    >
      {children}
      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#20a4f3] transform origin-right scale-x-0 transition-transform duration-250 ease-out group-hover:origin-left group-hover:scale-x-100"></span>
    </UnstyledLink>
  );
};

export default UnderlineLink;
