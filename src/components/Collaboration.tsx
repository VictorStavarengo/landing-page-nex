const ArrowRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
);

// Dados para os logótipos.
const logos = [
    { name: 'Tech Logo', src: 'https://raw.githubusercontent.com/tailwindui/class-spy/main/logos/1.svg' },
    { name: 'Technology', src: 'https://raw.githubusercontent.com/tailwindui/class-spy/main/logos/2.svg' },
    { name: 'Slogan Here', src: 'https://raw.githubusercontent.com/tailwindui/class-spy/main/logos/3.svg' },
    { name: 'System', src: 'https://raw.githubusercontent.com/tailwindui/class-spy/main/logos/4.svg' },
    { name: 'Another Logo', src: 'https://raw.githubusercontent.com/tailwindui/class-spy/main/logos/5.svg' },
];

const Collaboration = () => {
    return (
        <section className="bg-gray-900 text-white py-20 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-serif font-semibold leading-tight">
                        We Collaborate With A Few Disability Service<br />
                        Providers To Create Inclusive Goods That<br />
                        Meet Their Requirements.
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-12 text-center md:text-left items-start mb-20">
                    <div className="md:col-span-1 flex flex-col items-center md:items-start">
                        <p className="text-8xl font-bold text-white">25+</p>
                        <p className="text-xl text-gray-300">Years Of Experience</p>
                    </div>
                    <div className="md:col-span-1 space-y-4">
                        <p className="text-gray-400 leading-relaxed">
                            Established In 1995, NEXIN Has Been A Leading Force In The Digital Landscape For Over Two Decades. We're A Passionate Team Of Designers.
                        </p>
                        <a href="#" className="inline-flex items-center font-semibold text-green-400 hover:text-green-300 transition-colors">
                            More About Us <ArrowRightIcon className="w-4 h-4 ml-2" />
                        </a>
                    </div>
                    <div className="md:col-span-1 space-y-4">
                        <p className="text-gray-400 leading-relaxed">
                            Established In 1995, NEXIN Has Been A Leading Force In The Digital Landscape For Over Two Decades. We're A Passionate Team Of Designers.
                        </p>
                        <a href="#" className="inline-flex items-center font-semibold text-green-400 hover:text-green-300 transition-colors">
                            Get In Touch <ArrowRightIcon className="w-4 h-4 ml-2" />
                        </a>
                    </div>
                </div>

                <div className="border-t border-gray-700 pt-16">
                     <p className="text-center text-lg text-gray-400 mb-8">We Worked With Global Largest Brands</p>
                     <div className="flex flex-wrap justify-center items-center gap-x-12 sm:gap-x-16 gap-y-8">
                        {logos.map((logo, index) => (
                            <img key={index} src={logo.src} alt={logo.name} className="h-8 object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Collaboration;
