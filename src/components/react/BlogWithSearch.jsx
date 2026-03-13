import React, { useState, useMemo, useEffect, useCallback } from "react";
import BlogEntry from "./BlogEntry";
import BlogLayout from "./BlogLayout";
import LatestBlog from "./LatestBlog";

const slugify = (text = "") =>
  text.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

const postsPerPage = 11;

/* ---- Moved OUTSIDE the parent to avoid React reconciler issues ---- */

const BlogGrid = ({ blogs }) => {
  if (!blogs || !blogs.length) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
      <div>
        <BlogEntry
          url={`/blog/${blogs[0].slug}`}
          title={blogs[0].data.heading}
          description={blogs[0].data.description}
          alt={blogs[0].data.heading}
          pubDate={blogs[0].data.pubDate}
          author={blogs[0].data.author}
          image={blogs[0].data.image}
          authorImage={blogs[0].data.authorImage}
        />
      </div>

      <div className="grid grid-cols-1 gap-0">
        {blogs.slice(1, 4).map((post) => (
          <BlogLayout
            key={post.slug}
            url={`/blog/${post.slug}`}
            title={post.data.heading}
            description={post.data.description}
            alt={post.data.heading}
            pubDate={post.data.pubDate}
            image={post.data.image}
          />
        ))}
      </div>
    </div>
  );
};

const LatestBlogGrid = ({ blogs }) => {
  if (!blogs || !blogs.length) return null;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 mt-2">
      {blogs.slice(5, 13).map((post) => (
        <LatestBlog
          key={post.slug}
          url={`/blog/${post.slug}`}
          title={post.data.heading}
          description={post.data.description}
          alt={post.data.heading}
          pubDate={post.data.pubDate}
          image={post.data.image}
        />
      ))}
    </div>
  );
};

/* ---------------------------------------------------------- */

const BlogWithSearch = ({ sortedPosts = [], tags = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  /* ---------------- SEARCH HANDLER ---------------- */

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  /* ---------------- DEBOUNCE SEARCH ---------------- */

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.toLowerCase());
      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  /* ---------------- FILTER POSTS ---------------- */

  const filteredPosts = useMemo(() => {
    if (!debouncedSearchTerm) return sortedPosts;

    return sortedPosts.filter(
      (post) =>
        post?.data?.title?.toLowerCase().includes(debouncedSearchTerm) ||
        post?.data?.description?.toLowerCase().includes(debouncedSearchTerm) ||
        post?.data?.heading?.toLowerCase().includes(debouncedSearchTerm)
    );
  }, [debouncedSearchTerm, sortedPosts]);

  /* ---------------- PAGINATION ---------------- */

  const currentPosts = useMemo(() => {
    const start = (currentPage - 1) * postsPerPage;
    const end = currentPage * postsPerPage;
    return filteredPosts.slice(start, end);
  }, [filteredPosts, currentPage]);

  return (
    <div className="flex flex-wrap">

      {/* Search */}
      <div className="flex justify-center w-full">
        <form className="mt-10 sm:flex sm:max-w-md lg:w-1/2 w-72">
          <input
            type="text"
            id="search"
            placeholder="Search Blog"
            value={searchTerm}
            onChange={handleSearchChange}
            className="block w-full h-10 px-4 py-2 text-sm border rounded-lg border-black/10 focus:border-indigo-300 focus:outline-none"
          />
        </form>
      </div>

      {/* Tags */}
      <div className="lg:mt-12 mt-6 w-full overflow-x-auto scrollbar-hide">
        <ul className="flex flex-nowrap lg:gap-3 gap-2 justify-start px-0">
          {tags.map((tag) => (
            <li key={tag} className="flex-shrink-0">
              <a
                href={`/tags/${slugify(tag)}`}
                className="flex items-center justify-center h-8 text-[#667085] text-sm px-3 py-2 font-semibold border hover:bg-[#F9F5FF] hover:text-[#6941C6] rounded-lg whitespace-nowrap"
              >
                {tag}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Blog Grid */}
      {currentPosts.length ? (
        <BlogGrid blogs={currentPosts} />
      ) : (
        <div className="py-24 flex justify-center w-full">
          <p className="text-4xl font-semibold">No results</p>
        </div>
      )}

      {/* CTA */}
      <div className="flex justify-center w-full mb-4">
        <div className="w-full">
          <div className="bg-[#AA8FFF40] rounded-2xl p-12 flex flex-col items-center text-center">
            <h2 className="text-2xl font-semibold text-gray-900">
              Powerful Integrations for Powerful Businesses
            </h2>

            <p className="text-gray-600 mt-2">
              Integrations for e-commerce and retail eco-system
            </p>

            <div className="flex space-x-4 mt-6">
              <a
                href="/integrations"
                className="px-4 py-2 font-semibold border border-gray-300 rounded-lg bg-white hover:bg-gray-100"
              >
                Learn more
              </a>

              <a
                href="/Get-Started"
                className="px-4 py-2 font-semibold bg-[#7F56D9] text-white rounded-lg hover:bg-purple-700"
              >
                Get started
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Latest */}
      <div className="py-4 border-t-2 mt-8 w-full">
        <div className="flex pb-6 justify-between items-center">
          <p className="font-semibold">Latest</p>
          <a href="/blog/all" className="font-medium">
            View All
          </a>
        </div>

        {currentPosts.length ? (
          <LatestBlogGrid blogs={currentPosts} />
        ) : null}
      </div>

    </div>
  );
};

export default BlogWithSearch;