import BlogLayout from "./Layout";

const LatestBlogGrid = ({ blogs }) => {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4">
      {blogs.slice(0, 3).map((post) => (
        <BlogLayout
          key={post.slug}
          url={`/blog/${post.slug}`}
          title={post.data.heading}
          description={post.data.description}
          alt={post.data.heading}
          pubDate={new Date(post.data.pubDate).toLocaleDateString()}
          image={post.data.image?.url || "/default-image.jpg"}
        />
      ))}
    </div>
  );
};

export default LatestBlogGrid;

