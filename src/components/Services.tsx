const serviceItems = [
    { 
        title: 'Web Design And Development', 
        icon: '📦', // Pode substituir por um SVG mais tarde
        description: "Established In 1995, NEXIN Has Been Leading Force In The Digital Landscape For Over Two Decades. We're A Passionate"
    },
    { 
        title: 'Branding And Creative Services', 
        icon: '⌘', // Pode substituir por um SVG mais tarde
        description: "Established In 1995, NEXIN Has Been Leading Force In The Digital Landscape For Over Two Decades. We're A Passionate"
    },
    { 
        title: 'Creative Digital Agency', 
        icon: '⬢', // Pode substituir por um SVG mais tarde
        description: "Established In 1995, NEXIN Has Been Leading Force In The Digital Landscape For Over Two Decades. We're A Passionate"
    },
];

const Services = () => {
    return (
        <section className="py-20 lg:py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <p className="text-sm font-bold text-gray-500 tracking-widest">SERVICES</p>
                    <h2 className="text-4xl lg:text-5xl font-serif mt-4 leading-tight">
                        Empowering Brands Through<br />
                        Strategic Digital Services
                    </h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {serviceItems.map((item) => (
                        <div 
                            key={item.title} 
                            className="border border-gray-200 rounded-lg p-8 text-center hover:shadow-2xl hover:border-green-400 transition-all duration-300 transform hover:-translate-y-2"
                        >
                             <div className="text-6xl mb-6 text-gray-800">{item.icon}</div>
                             <h3 className="text-2xl font-semibold mb-4 text-gray-900">{item.title}</h3>
                             <p className="text-gray-600 leading-relaxed">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
