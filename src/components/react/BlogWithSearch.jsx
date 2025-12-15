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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-0 mt-6">
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
      <div className="col-span-1 grid grid-cols-1 gap-0">
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
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 sm:grid-cols-1 mt-2">
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
        <form className="mt-10 sm:flex sm:max-w-md lg:w-1/2">
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
              <li className="flex items-center justify-center h-8 text-[#667085] text-sm px-4 py-2 font-semibold hover:bg-[#F9F5FF] hover:text-[#6941C6]  rounded-lg">
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
      {/* <div className="flex justify-center w-full mt-8">
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
      </div> */}
<div class="flex justify-center w-full mt-0 mb-4">
  <div class="w-full">
    <div class="bg-[#AA8FFF40] rounded-2xl p-12 flex flex-col justify-between items-center w-full">
      <div class="text-center">
        <h2 class="text-2xl font-semibold text-gray-900">
          Powerful Integrations for Powerful Businesses
        </h2>
        <p class="text-gray-600 mt-2">
          Integrations for e-commerce and retail eco-system
        </p>
      </div>
      <div class="flex space-x-4 mt-6 lg:mt-2">
        <button class="px-4 py-2 font-semibold border border-gray-300 rounded-lg text-gray-800 bg-white hover:bg-gray-100">
          <a href="/integrations" class="no-underline">
            Learn more
          </a>
        </button>
        <a href="/Get-Started" class="px-4 py-2 no-underline font-semibold bg-[#7F56D9] text-white rounded-lg hover:bg-purple-700">
          Get started
        </a>
      </div>
    </div>
  </div>
</div>

      {/*Latest Blog */}
      <div class="py-4 border-t-2 border-vulcan-800 mt-8">
        <div className="flex pb-6 mt-2 justify-between items-center">
          <p class="font-semibold">Latest</p>
          <a class="font-medium cursor-pointer" href="/latest/blog">
            View All
          </a>
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
