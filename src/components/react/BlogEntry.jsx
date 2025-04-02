import React, { useState } from 'react';

const BlogEntry = ({ title, url, description, pubDate, author, image, authorImage }) => {
  return <li
    className="group border bg-vulcan-800 border-white/5 overflow-hidden rounded-lg shadow-vulcan-950 shadow-2xl">
    <a href={url} title={title}>
      <div
        className="flex items-end shadow-2xl shadow-vulcan-950 justify-center overflow-hidden rounded-t-lg">
        <div className="flex">
          <img
            className="group-hover:scale-105 duration-300  object-cover"
            loading="lazy"
            src={image}
            alt={title}
            width="640"
          />
        </div>
      </div>
      <div className="p-6">
        <p>
          <time className="text-xs text-indigo-300" datetime={pubDate}>{pubDate}</time>
        </p>
        <h3 className="mt-5 text-lg font-medium leading-6 text-white">
          {title}
        </h3>
        <p className="mt-2 text-base text-vulcan-300 line-clamp-1">
          {description}
        </p>
      </div>
    </a>
  </li>
}

export default BlogEntry;