export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Blog Post</h1>
      <p>Content for the post goes here.</p>
    </div>
  );
}
