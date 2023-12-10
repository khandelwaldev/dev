import React, { FC } from 'react';
import Giscus from '@giscus/react';

interface CommentsProps {}

const Comments: FC<CommentsProps> = () => {
  return (
    <Giscus
      id="comments"
      repo="khandelwaldev/dev"
      repoId="R_kgDOKuSc0A"
      category="General"
      categoryId="DIC_kwDOKuSc0M4CbBzl"
      mapping="pathname"
      term="Welcome to my portfolio"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="dark"
      lang="en"
      loading="lazy"
    />
  );
};

export default Comments;