import React, { FC } from 'react';
import Giscus from '@giscus/react';

interface CommentsProps {}

const Comments: FC<CommentsProps> = () => {
  return (
    <Giscus
      id="comments"
      repo="khandelwaldev/dev"
      repoId="R_kgDOK3-l3Q"
      category="General"
      categoryId="DIC_kwDOK3-l3c4CboeQ"
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