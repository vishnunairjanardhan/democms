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

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 6;
    let startPage, endPage;

    if (totalPages <= maxPagesToShow) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const maxPagesBeforeCurrentPage = Math.floor(maxPagesToShow / 2);
      const maxPagesAfterCurrentPage = Math.ceil(maxPagesToShow / 2) - 1;
      if (currentPage <= maxPagesBeforeCurrentPage) {
        startPage = 1;
        endPage = maxPagesToShow;
      } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
        startPage = totalPages - maxPagesToShow + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - maxPagesBeforeCurrentPage;
        endPage = currentPage + maxPagesAfterCurrentPage;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
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
      <div className="mt-12 ">
        <ul className="flex flex-wrap gap-2 mx-auto justify-center" role="list">
          {tags.map((tag) => (
            <a href={`/tags/${tag}`} key={tag}>
              <li className="flex items-center justify-center h-8 text-xs px-4 py-2 font-semibold text-white transition-all border rounded-lg bg-vulcan-900 hover:text-indigo-400 border-vulcan-700">
                {tag}
              </li>
            </a>
          ))}
        </ul>
      </div>
      {currentPosts.length > 0 ? (
        <div className="py-24 flex">
          <ol className="grid grid-cols-1 gap-8 lg:grid-cols-2 sm:grid-cols-1" role="list">
            {currentPosts.map((post) => (
              <BlogEntry
                url={`/blog/${post.slug}`}
                title={post.data.heading}
                description={post.data.description}
                alt={post.data.heading}
                pubDate={new Date(post.data.pubDate).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
                author={post.data.author}
                image={post.data.image.url}
                key={post.slug}
              />
            ))}
          </ol>
        </div>
      ) : (
        <div className="py-24 flex justify-center w-full">
          <p className="text-4xl font-semibold tracking-tighter text-white sm:text-5xl">
            No results
          </p>
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
            {getPageNumbers().map((pageNumber) => (
              <li key={pageNumber}>
                <button
                  onClick={() => paginate(pageNumber)}
                  className={`px-4 py-2 border rounded ${
                    pageNumber === currentPage
                      ? 'bg-indigo-400 text-white'
                      : 'bg-white text-vulcan-900 font-semibold'
                  }`}
                >
                  {pageNumber}
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
