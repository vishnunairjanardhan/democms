import React, { useState } from "react";
import BlogEntry from "./BlogEntry";
import BlogLayout from "./BlogLayout";
import LatestBlog from "./LatestBlog";

const BlogWithSearch = ({ sortedPosts, tags }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(sortedPosts);
  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 11;

  // Handle search input
  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = sortedPosts.filter((post) => {
      const { title, description, heading } = post.data;
      return (
        title.toLowerCase().includes(value) ||
        description.toLowerCase().includes(value) ||
        heading.toLowerCase().includes(value)
      );
    });

    setFilteredPosts(filtered);
    setCurrentPage(1);
  };

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const currentPosts = filteredPosts.slice(
    indexOfLastPost - postsPerPage,
    indexOfLastPost
  );
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginate = (pageNum) => setCurrentPage(pageNum);

const LatestBlogGrid = ({ blogs }) => (
  <div className="grid grid-cols-1 gap-8 mt-2">
    {blogs.slice(0, 6).map((post) => (
      <div key={post.slug} className="rounded-lg overflow-hidden shadow-sm bg-white flex">
          <img
            src={post.data.image.url}
            alt={post.data.heading}
            className="h-40 w-auto rounded-2xl overflow-hidden object-cover hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-vulcan-900 line-clamp-2">
            {post.data.heading}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-3 mt-2">
            {post.data.description}
          </p>
          <p className="text-xs text-gray-400 mt-2">
            {new Date(post.data.pubDate).toLocaleDateString()}
          </p>
          <a
            href={`/blog/${post.slug}`}
            className="text-indigo-600 text-sm font-semibold mt-3 inline-block hover:underline"
          >
            Read More →
          </a>
        </div>
      </div>
    ))}
  </div>
);


  return (
    <div className="flex flex-wrap">
      {/* Search Bar */}
      <div className="flex justify-center w-full mt-10">
        <form className="sm:flex sm:max-w-md lg:w-1/2">
          <input
            type="text"
            id="search"
            name="search"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search Blog"
            className="w-full h-10 px-4 py-2 text-sm text-indigo-300 bg-transparent border rounded-lg border-black/10 focus:border-indigo-300 focus:outline-none"
          />
        </form>
      </div>

      {/* Tags Section */}
      <div className="mt-12">
        <ul className="flex flex-wrap gap-2 justify-center mx-auto" role="list">
          {tags.map((tag) => (
            <li key={tag}>
              <a
                href={`/tags/${tag}`}
                className="flex items-center justify-center h-8 px-4 py-2 text-sm font-semibold text-[#667085] hover:bg-[#F9F5FF] hover:text-[#6941C6] rounded-lg"
              >
                {tag}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Latest Blogs Section */}
      <div className="py-4 border-t-2 border-vulcan-800 mt-8 w-full">
        <div className="flex justify-between items-center pb-6 mt-2 max-w-4xl mx-auto">
        </div>
        {currentPosts.length > 0 ? (
          <LatestBlogGrid blogs={currentPosts} />
        ) : (
          <div className="w-full py-24 flex justify-center">
            <p className="text-4xl sm:text-5xl font-semibold text-white">
              No results
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
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

            {Array.from(
              { length: Math.min(totalPages, 6) },
              (_, i) => i + Math.max(1, currentPage - 3)
            )
              .filter((num) => num <= totalPages)
              .map((num) => (
                <li key={num}>
                  <button
                    onClick={() => paginate(num)}
                    className={`px-4 py-2 border rounded font-semibold ${
                      num === currentPage
                        ? "bg-gray-200 text-black"
                        : "bg-white text-vulcan-900"
                    }`}
                  >
                    {num}
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
