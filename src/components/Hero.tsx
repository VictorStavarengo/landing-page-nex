import React from 'react';

// Pode mover este ícone para um ficheiro separado de ícones mais tarde
const ArrowRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
);

const Hero = () => {
    return (
        <section className="bg-white py-20 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Coluna da Esquerda: Título Principal */}
                    <div className="relative text-center lg:text-left">
                        <p className="text-lg font-medium text-gray-600">Great Design Services</p>
                        <p className="text-lg font-medium text-gray-600 mb-4">Without The Pretentiousness.</p>
                        
                        <h1 className="text-7xl sm:text-8xl md:text-9xl font-serif font-bold text-gray-900 leading-none tracking-tighter">
                            Digital
                        </h1>
                        
                        <div className="relative flex flex-col sm:flex-row items-center justify-center lg:justify-start mt-[-1.5rem] md:mt-[-2.5rem]">
                             <div className="bg-green-400 text-black font-bold py-2 px-6 rounded-full text-lg z-10 shadow-lg">
                                WEB DESIGN
                             </div>
                             <img 
                                src="https://placehold.co/100x100/EAB308/000000?text=3D" 
                                alt="Elemento 3D" 
                                className="w-24 h-24 rounded-full sm:ml-[-2rem] mt-[-1rem] sm:mt-0 border-4 border-white shadow-lg"
                             />
                             <h1 className="text-7xl sm:text-8xl md:text-9xl font-serif font-bold text-gray-900 leading-none sm:ml-4 mt-[-1.5rem] sm:mt-0 tracking-tighter">
                                Solution
                            </h1>
                        </div>
                    </div>

                    {/* Coluna da Direita: Texto e Card de Reviews */}
                    <div className="space-y-8">
                        <p className="text-lg text-gray-600 leading-relaxed">
                            We Believe That The Surest Measure Of Success Is When Our Partners Win. We're More Than Just The Visuals, We're Here To Support Your Growth.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-lg shadow-xl border border-gray-100">
                            <div className="flex -space-x-4 mb-4 sm:mb-0">
                                <img className="w-12 h-12 rounded-full border-2 border-white" src="https://i.pravatar.cc/48?img=1" alt="Reviewer 1" />
                                <img className="w-12 h-12 rounded-full border-2 border-white" src="https://i.pravatar.cc/48?img=2" alt="Reviewer 2" />
                                <img className="w-12 h-12 rounded-full border-2 border-white" src="https://i.pravatar.cc/48?img=3" alt="Reviewer 3" />
                                <div className="w-12 h-12 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600">15k+</div>
                            </div>
                            <div className="text-center sm:text-left mb-4 sm:mb-0 sm:ml-4">
                                <p className="font-bold text-lg text-gray-900">Excellent 4.000+ Reviews</p>
                            </div>
                            <a href="#" className="flex items-center text-gray-600 font-semibold hover:text-green-500 transition-colors">
                                <span>View All Services</span>
                                <ArrowRightIcon className="w-5 h-5 ml-2" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
