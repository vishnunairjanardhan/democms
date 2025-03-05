import React, { useState } from "react";
import BlogEntry from "./BlogEntry";
import BlogLayout from "./BlogLayout";
import LatestBlog from "./LatestBlog";

const BlogWithSearch = ({ sortedPosts, tags }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(sortedPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const postsPerPage = 11;

  const handleSearchChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);
    const filtered = sortedPosts.filter(
      (post) =>
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

  const BlogGrid = ({ blogs }) => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      <div>
        {blogs.length > 0 && (
          <BlogEntry
            url={`/blog/${blogs[0].slug}`}
            title={blogs[0].data.heading}
            description={blogs[0].data.description}
            alt={blogs[0].data.heading}
            pubDate={new Date(blogs[0].data.pubDate).toLocaleDateString()}
            author={blogs[0].data.author}
            image={blogs[0].data.image.url}
            authorImage={blogs[0].data.authorImage}
          />
        )}
      </div>
      <div className="col-span-1 grid grid-cols-1 gap-4">
        {blogs.slice(1, 4).map((post) => (
          <BlogLayout
            key={post.slug}
            url={`/blog/${post.slug}`}
            title={post.data.heading}
            description={post.data.description}
            alt={post.data.heading}
            pubDate={new Date(post.data.pubDate).toLocaleDateString()}
            image={post.data.image.url}
          />
        ))}
      </div>
    </div>
  );
  const LatestBlogGrid = ({ blogs }) => (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 sm:grid-cols-1">
      {blogs.slice(5, 13).map((post) => (
          <LatestBlog
            key={post.slug}
            url={`/blog/${post.slug}`}
            title={post.data.heading}
            description={post.data.description}
            alt={post.data.heading}
            pubDate={new Date(post.data.pubDate).toLocaleDateString()}
            image={post.data.image.url}
          />
        ))}
    </div>
  );
  return (
    <div className="flex flex-wrap">
      {/* Search Bar */}
      <div className="flex justify-center w-full">
        <form className="mt-6 sm:flex sm:max-w-md lg:w-1/2">
          <input
            type="text"
            name="search"
            id="search"
            required
            className="block w-full h-10 px-4 py-2 text-sm text-indigo-300 bg-transparent border rounded-lg border-black/10 focus:border-indigo-300 focus:outline-none"
            placeholder="Search Blog"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </form>
      </div>

      {/* Tags Section */}
      <div className="mt-12">
        <ul className="flex flex-wrap gap-2 mx-auto justify-center" role="list">
          {tags.map((tag) => (
            <a href={`/tags/${tag}`} key={tag}>
              <li className="flex items-center justify-center h-8 text-xs px-4 py-2 font-semibold hover:bg-gray-200 border border-vulcan-700 rounded-lg">
                {tag}
              </li>
            </a>
          ))}
        </ul>
      </div>

      {/* Blog Grid */}
      {currentPosts.length > 0 ? (
        <BlogGrid blogs={currentPosts} />
      ) : (
        <div className="py-24 flex justify-center w-full">
          <p className="text-4xl font-semibold text-white sm:text-5xl">
            No results
          </p>
        </div>
      )}

      {/* CTA Button & Modal */}
      <div className="flex justify-center w-full mt-8">
        <div className="w-full">
          <div
            onClick={() => setIsModalOpen(true)}
            className="w-full cursor-pointer"
          >
            <div className="w-full">
              <span className="relative px-4 py-2 transition-all ease-out bg-gray-900 bg-opacity-0 rounded-md group-hover:bg-opacity-100 duration-400">
                <img
                  className="w-full m-0"
                  loading="lazy"
                  role="img"
                  src="/assets/blog/CTA-Referral.webp"
                  alt="Get started CTA button"
                />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* React Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl bg-gradient-to-b from-indigo-500 via-indigo-500/5 shadow-2xl rounded-3xl p-[0.060rem]"
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside modal
          >
            <div className="bg-vulcan-50 rounded-3xl p-10 text-center">
              <iframe
                src="../GetStarted"
                width="100%"
                height="600"
                frameBorder="0"
                allowFullScreen
                title="Calendly"
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/*Latest Blog */}
      <div class="p-4 border-t-2 border-vulcan-800">
        <div className="flex justify-between items-center">
          <p class="pb-2 font-semibold">Latest</p>
          <a class="font-semibold cursor-pointer" href="/latest/blog">View All</a>
        </div>
      {currentPosts.length > 0 ? (
        <LatestBlogGrid blogs={currentPosts} />
      ) : (
        <div className="py-24 flex justify-center w-full">
          <p className="text-4xl font-semibold text-white sm:text-5xl">
            No results
          </p>
        </div>
      )}
      </div>
      {/* Pagination */}
      {/* <div className="flex justify-center w-full mt-8">
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

          {(() => {
            const pageNumbers = [];
            const maxPages = 6;
            let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
            let endPage = Math.min(totalPages, startPage + maxPages - 1);

            if (endPage - startPage < maxPages - 1) {
              startPage = Math.max(1, endPage - maxPages + 1);
            }

            for (let i = startPage; i <= endPage; i++) {
              pageNumbers.push(
                <li key={i}>
                  <button
                    onClick={() => paginate(i)}
                    className={`px-4 py-2 border rounded ${
                      i === currentPage
                        ? 'bg-gray-200 text-black font-semibold'
                        : 'bg-white text-vulcan-900 font-semibold'
                    }`}
                  >
                    {i}
                  </button>
                </li>
              );
            }
            return pageNumbers;
          })()}

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
      </div> */}
    </div>
  );
};

export default BlogWithSearch;
