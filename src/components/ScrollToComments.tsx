import React, { useEffect, useState } from "react";
import { CommentIcon } from "./Icons";

const ScrollToComments: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const commentsSection = document.getElementById("comments");
      if (commentsSection) {
        const rect = commentsSection.getBoundingClientRect();
        setIsVisible(rect.top > window.innerHeight || rect.bottom < 0);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToComments = () => {
    const commentsSection = document.getElementById("comments");
    if (commentsSection) {
      commentsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button
      id="goToCommentsButton"
      onClick={scrollToComments}
      style={{ display: isVisible ? "block" : "none" }}
      className="fixed bottom-4 right-4 outline-none transition-opacity duration-200 p-2 border border-white/70 rounded-lg backdrop-blur-sm hover:bg-[#2ec4b6]/10 hover:border-[#20a4f3] z-40"
    >
      <CommentIcon className="w-6 h-6" />
    </button>
  );
};

export default ScrollToComments;
