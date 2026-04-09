export default function ProjectDetailsPage({ params }: { params: { slug: string } }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Project Details</h1>
      <p>Content for the project goes here.</p>
    </div>
  );
}
