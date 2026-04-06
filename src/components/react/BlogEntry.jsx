import React, { useState } from 'react';

const BlogEntry = ({ title, url, description, pubDate, author, image, authorImage, isPriority = false }) => {
  return <div
    className="group flex md:flex-col">
    <a href={url} title={title} aria-label={`Read more about ${title}`}>
      <div
        className="flex items-end justify-center overflow-hidden rounded-lg aspect-video w-full h-auto">
        <div className="flex w-full h-full">
          <img
            className="group-hover:scale-105 duration-300 object-cover w-full h-full"
            src={image}
            alt={title}
            width="1200"
            height="675"
            loading={isPriority ? "eager" : "lazy"}
            fetchpriority={isPriority ? "high" : "auto"}
            decoding="async"
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