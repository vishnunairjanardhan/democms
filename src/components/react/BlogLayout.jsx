import React, { useState } from 'react';

const BlogLayout = ({ title, url, description, pubDate, author, image, authorImage }) => {
  return (
    <div className="group">
      <a href={url} title={title} className="flex flex-col md:flex-row w-full">
        {/* Image on the left */}
        <div className="md:w-2/4 aspect-video flex-shrink-0">
          <img
            className="group-hover:scale-105 duration-300 object-cover w-full h-full rounded-md"
            loading="lazy"
            decoding="async"
            width="400"
            height="225"
            src={typeof image === 'string' && image.includes('/assets/blog/') && !image.includes('_thumb.') ? image.replace(/\.[a-zA-Z0-9]+$/, '_thumb.webp') : image?.src || image}
            alt={title}
          />
        </div>

        {/* Content on the right */}
        <div className="md:w-2/4 md:pl-6 flex flex-col justify-center">
          <p>
            <time className="text-xs text-vulcan-800" dateTime={pubDate}>
              {pubDate}
            </time>
          </p>
          <h3 className="mt-3 text-lg font-medium leading-6">{title}</h3>
          <p className="mt-2 text-base text-vulcan-900 line-clamp-2">{description}</p>

          {/* Show author only if it exists */}
          {author && <p className="mt-4 text-sm font-medium">Author: {author}</p>}
        </div>
      </a>
    </div>

  )
}

export default BlogLayout;