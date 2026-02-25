import React, { useState } from "react";
import Blogs from "./Blogs";

const slugify = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

const BlogWithSearch = ({ sortedPosts = [], tags = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(sortedPosts);
  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 12;

  const handleSearchChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filtered = sortedPosts.filter(
      (post) =>
        post?.data?.title?.toLowerCase().includes(searchValue) ||
        post?.data?.description?.toLowerCase().includes(searchValue) ||
        post?.data?.heading?.toLowerCase().includes(searchValue)
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
      const maxPagesBeforeCurrent = Math.floor(maxPagesToShow / 2);
      const maxPagesAfterCurrent = Math.ceil(maxPagesToShow / 2) - 1;

      if (currentPage <= maxPagesBeforeCurrent) {
        startPage = 1;
        endPage = maxPagesToShow;
      } else if (currentPage + maxPagesAfterCurrent >= totalPages) {
        startPage = totalPages - maxPagesToShow + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - maxPagesBeforeCurrent;
        endPage = currentPage + maxPagesAfterCurrent;
      }
    }

    for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);
    return pageNumbers;
  };

  return (
    <div className="flex flex-wrap">
      {/* Search */}
      <div className="flex justify-center w-full">
        <form className="mt-8 sm:flex w-full lg:w-1/2">
          <input
            type="text"
            id="search"
            className="block w-full h-10 px-4 py-2 text-sm text-indigo-300 bg-transparent border rounded-lg border-black/10 focus:border-indigo-300 focus:outline-none"
            placeholder="Search Blog"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </form>
      </div>

      {/* Tags */}
      <div className="mt-8 w-full">
        <ul className="flex flex-wrap gap-2 mx-auto justify-center" role="list">
          {tags.map((tag) => (
            <li key={tag}>
              <a
                href={`/tags/${slugify(tag)}`}
                className="flex items-center justify-center h-8 text-sm text-[#667085] px-4 py-2 font-semibold transition-all rounded-lg hover:bg-[#F9F5FF] hover:text-[#6941C6]"
              >
                {tag}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Blog Grid */}
      {currentPosts.length > 0 ? (
        <div className="py-[72px] w-full">
          <ol className="grid grid-cols-1 gap-8 lg:grid-cols-3" role="list">
            {currentPosts.map((post) => (
              <Blogs
                key={post.slug}
                url={`/blog/${post.slug}`}
                title={post.data.heading}
                description={post.data.description}
                alt={post.data.heading}
                pubDate={new Date(post.data.pubDate).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                author={post.data.author}
                image={post.data.image.url}
              />
            ))}
          </ol>
        </div>
      ) : (
        <div className="py-24 flex justify-center w-full">
          <p className="text-4xl font-semibold tracking-tighter sm:text-5xl">
            No results
          </p>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center w-full">
        <nav>
          <ul className="flex lg:space-x-2 space-x-1">
            {currentPage > 1 && (
              <>
                <li>
                  <button onClick={() => paginate(1)} className="px-4 py-2 border rounded bg-white font-semibold">
                    First
                  </button>
                </li>
                <li>
                  <button onClick={() => paginate(currentPage - 1)} className="px-4 py-2 border rounded bg-white font-semibold">
                    Previous
                  </button>
                </li>
              </>
            )}

            {getPageNumbers().map((pageNumber) => (
              <li key={pageNumber}>
                <button
                  onClick={() => paginate(pageNumber)}
                  className={`px-4 py-2 border rounded font-semibold ${
                    pageNumber === currentPage ? "bg-gray-200 text-black" : "bg-white"
                  }`}
                >
                  {pageNumber}
                </button>
              </li>
            ))}

            {currentPage < totalPages && (
              <>
                <li>
                  <button onClick={() => paginate(currentPage + 1)} className="px-4 py-2 border rounded bg-white font-semibold">
                    Next
                  </button>
                </li>
                <li>
                  <button onClick={() => paginate(totalPages)} className="px-4 py-2 border rounded bg-white font-semibold">
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