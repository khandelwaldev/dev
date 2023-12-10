import Blockquote from "./Blockquote";
import InlineCode from "./InlineCode";
import Pre from "./Pre";
import UnderlineLink from "@/components/elements/UnderlinedLink";

import { MDXRemoteProps } from "next-mdx-remote";

const MDXComponents = {
  a: UnderlineLink,
  blockquote: Blockquote,
  code: InlineCode,
  pre: Pre,
};

export default MDXComponents as MDXRemoteProps["components"];
