import React, { useState } from 'react';

const Blogs = ({ title, url, description, pubDate, author, image, authorImage }) => {
  return <div
    className="group flex md:flex-col">
    <a href={url} title={title}>
      <div
        className="flex items-end justify-center overflow-hidden rounded-lg">
        <div className="flex ">
          <img
            className="group-hover:scale-105 duration-300 object-cover w-2/4"
            loading="lazy"
            src={image}
            alt={title}
          />
        </div>
      </div>
    </a>
  </div>
}

export default Blogs;