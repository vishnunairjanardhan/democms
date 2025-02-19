import React, { useState } from 'react';
import BlogEntry from './BlogEntry';

const BlogWithSearch = ({ sortedPosts, tags }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(sortedPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const handleSearchChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);
    const filtered = sortedPosts.filter((post) =>
      post.data.title.toLowerCase().includes(searchValue) ||
      post.data.description.toLowerCase().includes(searchValue) ||
      post.data.heading.toLowerCase().includes(searchValue)
    );
    setFilteredPosts(filtered);
    setCurrentPage(1);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const BlogGrid = ({ blogs }) => {
    return (
      <div className="grid grid-cols-3 gap-6 p-6">
        <div className="col-span-2">
          {blogs.length > 0 && (
            <BlogEntry
              url={`/blog/${blogs[0].slug}`}
              title={blogs[0].data.heading}
              description={blogs[0].data.description}
              alt={blogs[0].data.heading}
              pubDate={new Date(blogs[0].data.pubDate).toLocaleDateString()}
              author={blogs[0].data.author}
              image={blogs[0].data.image.url}
            />
          )}
        </div>
        <div className="col-span-1 grid grid-cols-1 gap-4">
          {blogs.slice(1, 3).map((post) => (
            <BlogEntry
              key={post.slug}
              url={`/blog/${post.slug}`}
              title={post.data.heading}
              description={post.data.description}
              alt={post.data.heading}
              pubDate={new Date(post.data.pubDate).toLocaleDateString()}
              author={post.data.author}
              image={post.data.image.url}
            />
          ))}
        </div>
      </div>
    );
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
            className="block w-full h-10 px-4 py-2 text-sm text-indigo-300 bg-transparent border rounded-lg border-black/10 focus:border-indigo-300 focus:outline-none"
            placeholder="Search blog"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </form>
      </div>
      <div className="mt-12">
        <ul className="flex flex-wrap gap-2 mx-auto justify-center" role="list">
          {tags.map((tag) => (
            <a href={`/tags/${tag}`} key={tag}>
              <li className="flex items-center justify-center h-8 text-xs px-4 py-2 font-semibold text-white bg-vulcan-900 hover:text-indigo-400 border border-vulcan-700 rounded-lg">
                {tag}
              </li>
            </a>
          ))}
        </ul>
      </div>
      {currentPosts.length > 0 ? (
        <BlogGrid blogs={currentPosts} />
      ) : (
        <div className="py-24 flex justify-center w-full">
          <p className="text-4xl font-semibold text-white sm:text-5xl">No results</p>
        </div>
      )}
      <div className="flex justify-center w-full mt-8">
        <nav>
          <ul className="flex space-x-2">
            {currentPage > 1 && (
              <>
                <li>
                  <button
                    onClick={() => paginate(1)}
                    className="px-4 py-2 border rounded bg-white text-vulcan-900 font-semibold"
                  >
                    First
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    className="px-4 py-2 border rounded bg-white text-vulcan-900 font-semibold"
                  >
                    Previous
                  </button>
                </li>
              </>
            )}
            {[...Array(totalPages)].map((_, index) => (
              <li key={index + 1}>
                <button
                  onClick={() => paginate(index + 1)}
                  className={`px-4 py-2 border rounded ${
                    index + 1 === currentPage
                      ? 'bg-indigo-400 text-white'
                      : 'bg-white text-vulcan-900 font-semibold'
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            {currentPage < totalPages && (
              <>
                <li>
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    className="px-4 py-2 border rounded bg-white text-vulcan-900 font-semibold"
                  >
                    Next
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => paginate(totalPages)}
                    className="px-4 py-2 border rounded bg-white text-vulcan-900 font-semibold"
                  >
                    Last
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default BlogWithSearch;
