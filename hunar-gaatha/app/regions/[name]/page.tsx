
import RegionDetail from './RegionDetail';

export async function generateStaticParams() {
  return [
    { name: 'rajasthan' },
    { name: 'gujarat' },
    { name: 'west-bengal' },
    { name: 'uttar-pradesh' },
    { name: 'odisha' },
    { name: 'kashmir' },
  ];
}

export default function RegionPage({ params }: { params: { name: string } }) {
  return <RegionDetail regionName={params.name} />;
}
