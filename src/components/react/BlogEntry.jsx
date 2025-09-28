import React, { useState } from 'react';

const BlogEntry = ({ title, url, description, pubDate, author, image, authorImage }) => {
  return <div
    className="group flex md:flex-col">
    <a href={url} title={title}>
      <div
        className="flex items-end justify-center overflow-hidden rounded-lg">
        <div className="flex">
          <img
            className="group-hover:scale-105 duration-300 object-cover"
            loading="lazy"
            src={image}
            alt={title}
          />
        </div>
      </div>
      <div className="py-8">
        <p>
          <time className="text-xs text-vulcan-800" datetime={pubDate}>{pubDate}</time>
        </p>
        <h2 className="mt-5 text-3xl font-medium leading-10 ">
          {title}
        </h2>
        <p className="mt-2 text-base text-vulcan-900">
          {description}
        </p>
        <div>
          {author && <p className='text-base font-semibold'>Author: {author}</p>}
          </div>
      </div>
    </a>
  </div>
}

export default BlogEntry;