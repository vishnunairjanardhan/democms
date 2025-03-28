import React from 'react';

const BlogLayout = ({ title, url, image }) => {
  return (
    <a href={url}>
      <li className="flex">
        <div className="h-22" style={{ width: '200px' }}>
          <img className="rounded-sm" src={image} alt={title} />
        </div>
        <div className="ml-6 text-black text-sm">{title}</div>
      </li>
    </a>
  );
};

export default BlogLayout;
