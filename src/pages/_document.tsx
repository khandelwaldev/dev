import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="scroll-smooth">
      <Head />
      <body className="bg-richBlack text-seasalt max-w-[650px] px-[15px] w-full mx-auto">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
