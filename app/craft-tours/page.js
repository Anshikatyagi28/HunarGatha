'use client';

import Link from 'next/link';

const toursData = [
    {
        title: "The Art of Chikankari",
        district: "Lucknow",
        description: "Explore the delicate shadow work and intricate needlework of Lucknow's famous Chikankari embroidery.",
        image: "https://readdy.ai/api/search-image?query=Artisan%20doing%20Chikankari%20embroidery%20in%20a%20Lucknow%20workshop%2C%20traditional%20fabric%20and%20threads%2C%20focused%20craftswoman%2C%20bright%20natural%20lighting&width=400&height=250&seq=chikankari-tour&orientation=landscape",
        link: "#", // Replace with actual video link
    },
    {
        title: "Crafting Itar: Kannauj's Liquid Gold",
        district: "Kannauj",
        description: "Witness the ancient deg-bhapka process of extracting natural fragrances to create exquisite itars.",
        image: "https://readdy.ai/api/search-image?query=Traditional%20itar%20making%20process%20in%20a%20Kannauj%20workshop%2C%20large%20copper%20vessels%2C%20distillation%20of%20flowers%2C%20heritage%20craftsmanship&width=400&height=250&seq=itar-tour&orientation=landscape",
        link: "#",
    },
    {
        title: "The Weaving of Banarasi Silk",
        district: "Varanasi",
        description: "Follow the journey of a single thread as it is woven into a majestic Banarasi silk saree on a traditional loom.",
        image: "https://readdy.ai/api/search-image?query=Indian%20weaver%20at%20a%20handloom%20creating%20Banarasi%20silk%20saree%2C%20golden%20threads%2C%20rich%20textile%20patterns%2C%20traditional%20workshop%20setting&width=400&height=250&seq=banarasi-tour&orientation=landscape",
        link: "#",
    },
    {
        title: "The Artisans of Brass City",
        district: "Moradabad",
        description: "Discover how raw brass is hammered, engraved, and polished to create stunning metal handicrafts.",
        image: "https://readdy.ai/api/search-image?query=Brass%20artisan%20in%20Moradabad%20crafting%20metalware%2C%20traditional%20tools%2C%20golden%20metal%20products%2C%20focused%20craftsmanship&width=400&height=250&seq=brass-tour&orientation=landscape",
        link: "#",
    },
];

export default function CraftToursPage() {
    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-2">
                        Virtual Craft Tours
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                        Step into the workshops and meet the artisans. These immersive videos reveal the stories and techniques behind each unique craft.
                    </p>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid md:grid-cols-2 gap-10">
                    {toursData.map((tour, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-3xl shadow-2xl p-8 transform transition-transform duration-300 hover:scale-[1.02] relative group overflow-hidden"
                        >
                            <img
                                src={tour.image}
                                alt={tour.title}
                                className="w-full h-auto rounded-xl mb-6 shadow-md transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Link href={tour.link} className="w-20 h-20 bg-white/80 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
                                    <i className="ri-play-fill text-4xl text-yellow-600"></i>
                                </Link>
                            </div>
                            <div className="relative">
                                <h3 className="font-bold text-2xl text-blue-900 mb-2">{tour.title}</h3>
                                <p className="text-sm text-gray-500 mb-4">{tour.district}</p>
                                <p className="text-gray-600 mb-6">{tour.description}</p>
                                <Link
                                    href={tour.link}
                                    className="inline-flex items-center px-6 py-3 bg-yellow-600 text-white font-bold rounded-full hover:bg-yellow-700 transition-colors shadow-lg"
                                >
                                    Watch Now <i className="ri-arrow-right-line ml-2"></i>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-lg text-gray-600 mb-6">Looking for a specific artisan?</p>
                    <Link
                        href="/artisans"
                        className="px-8 py-4 bg-blue-900 text-white font-bold rounded-full hover:bg-blue-800 transition-colors shadow-lg"
                    >
                        <i className="ri-team-line mr-2"></i> See All Artisans
                    </Link>
                </div>
            </main>
        </div>
    );
}