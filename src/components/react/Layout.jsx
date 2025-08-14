import React from 'react';

const BlogLayout = ({ title, url, image }) => {
  return (
    <a href={url}>
      <li className="grid grid-cols-[auto,1fr] gap-4 ">
        <div className="w-[160px] overflow-hidden">
          <img className="rounded-sm object-cover w-full h-full" src={image} alt={title} />
        </div>
        <div className="text-black text-sm">{title}</div>
      </li>
    </a>
  );
};

export default BlogLayout;
