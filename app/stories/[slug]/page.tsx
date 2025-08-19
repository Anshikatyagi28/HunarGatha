
import StoryDetail from './StoryDetail';

export async function generateStaticParams() {
  return [
    { slug: 'meera-devi-journey' },
    { slug: 'pottery-master-rajesh' },
    { slug: 'kantha-revival-story' },
  ];
}

export default function StoryPage({ params }: { params: { slug: string } }) {
  return <StoryDetail storySlug={params.slug} />;
}
