import React, { useState } from 'react';
import BlogEntry from './BlogEntry';

const BlogWithSearch = ({ sortedPosts, tags }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(sortedPosts);

  const handleSearchChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filtered = sortedPosts.filter((post) =>
      post.data.title.toLowerCase().includes(searchValue) ||
      post.data.description.toLowerCase().includes(searchValue)
    );

    setFilteredPosts(filtered);
  };

  return (
    <div className="flex flex-wrap">
      <div className="flex justify-center w-full">
        <form className="mt-6 sm:flex sm:max-w-md lg:w-1/2">
          <input
            type="text"
            name="search"
            id="search"
            required
            className="block w-full h-10 px-4 py-2 text-sm text-indigo-300 bg-transparent border rounded-lg appearance-none border-white/10 placeholder-white/50 focus:border-indigo-300 focus:bg-transparent focus:outline-none focus:ring-indigo-300 sm:text-sm"
            placeholder="Search blog"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </form>
      </div>
      <div className="mt-12">
        <ul className="flex flex-wrap gap-2" role="list">
          {tags.map((tag) => (
            <a href={`/tags/${tag}`} key={tag}>
              <li className="flex items-center justify-center h-8 text-xs px-4 py-2 font-semibold text-white transition-all border rounded-lg bg-vulcan-900 hover:text-indigo-400 border-vulcan-700">
                {tag}
              </li>
            </a>
          ))}
        </ul>
      </div>
      {filteredPosts.length > 0 ? (
        <div className="py-24 flex">
          <ol className="grid grid-cols-1 gap-8 lg:grid-cols-2 sm:grid-cols-1" role="list">
            {filteredPosts.map((post) => (
              <BlogEntry
                url={`/blog/${post.slug}`}
                title={post.data.title}
                description={post.data.description}
                alt={post.data.title}
                pubDate={post.data.pubDate.toString().slice(0, 10)}
                author={post.data.author}
                image={post.data.image.url}
                key={post.slug}
              />
            ))}
          </ol>
        </div>
      ) : (
        <div className="py-24 flex justify-center w-full">
          <p class="text-4xl font-normal tracking-tighter text-white sm:text-5xl">
            No results
          </p>
        </div>
      )}
    </div>
  );
};

export default BlogWithSearch;
