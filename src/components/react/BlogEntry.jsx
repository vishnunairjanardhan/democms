import React, { useState } from 'react';

const BlogEntry = ({ title, url, description, pubDate, author, image, authorImage }) => {
  return <div
    className="group flex md:flex-col">
    <a href={url} title={title}>
      <div
        className="flex items-end shadow-2xl shadow-vulcan-950 justify-center overflow-hidden rounded-t-xl">
        <div className="flex">
          <img
            className="group-hover:scale-110 duration-300 aspect-[2/1] object-cover"
            loading="lazy"
            src={image}
            alt={title}
            // width="640"
          />
        </div>
      </div>
      <div className="py-8">
        <p>
          <time className="text-xs text-vulcan-800" datetime={pubDate}>{pubDate}</time>
        </p>
        <h3 className="mt-5 text-lg font-medium leading-6 ">
          {title}
        </h3>
        <p className="mt-2 text-base text-vulcan-900">
          {description}
        </p>
        <div>
          {/* <img src={authorImage} /> */}
          {author && <p className='text-base'>Author: {author}</p>}
          </div>
      </div>
    </a>
  </div>
}

export default BlogEntry;