const About = () => {
    return (
        <section className="py-20 lg:py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <p className="text-sm font-bold text-gray-500 tracking-widest">WHAT SETS US APART</p>
                    <h2 className="text-4xl lg:text-5xl font-serif mt-4 leading-tight">
                        Driving Digital Success<br />
                        With Strategy Design
                    </h2>
                </div>

                {/* Primeira Linha do Grid */}
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-16 lg:mb-24">
                    <div>
                        <img src="https://placehold.co/600x450/E2E8F0/A0AEC0?text=Team+Working" alt="Equipa a trabalhar num portátil" className="rounded-lg shadow-lg w-full" />
                    </div>
                    <div className="space-y-6">
                        <p className="text-lg text-gray-600 leading-relaxed">
                            We Believe That The Surest Measure Of Success Is When Our Partners With Us More Than Half It's More Than Just The Visuals.
                        </p>
                        <div className="space-y-4 text-gray-600">
                            <p>We Believe That The Surest Measure Of Success Is When Our Partners With Us More Than Half It's More Than Just The Visuals. We're Here To Support Your Growth.</p>
                            <p>We Believe That The Surest Measure Of Success Is When Our Partners With Us More Than Half It's More Than Just The Visuals.</p>
                        </div>
                    </div>
                </div>

                 {/* Segunda Linha do Grid */}
                 <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8 order-last lg:order-first">
                        <div>
                            <h3 className="text-3xl font-semibold mb-3 text-gray-900">Our Mission</h3>
                            <p className="text-gray-600 leading-relaxed">Conduct thorough market research to the fast target audience behaviours. Submit as many design tasks.</p>
                        </div>
                        <div className="flex space-x-4">
                            <div className="bg-green-100 p-6 rounded-lg text-center flex-1 transform hover:scale-105 transition-transform">
                                <img src="https://placehold.co/80x80/34D399/FFFFFF?text=Icon" className="mx-auto mb-3 rounded-full" alt="Ícone de Marketing"/>
                                <p className="font-semibold text-gray-800">Marketing Strategy</p>
                            </div>
                            <div className="bg-yellow-100 p-6 rounded-lg text-center flex-1 transform hover:scale-105 transition-transform">
                                <img src="https://placehold.co/80x80/FBBF24/FFFFFF?text=Icon" className="mx-auto mb-3 rounded-full" alt="Ícone de UX/UI" />
                                <p className="font-semibold text-gray-800">UX/UI Solution</p>
                            </div>
                        </div>
                    </div>
                    <div className="order-first lg:order-last">
                        <img src="https://placehold.co/600x450/FEEBC8/D69E2E?text=Hands+on+Laptop" alt="Mãos num portátil" className="rounded-lg shadow-lg w-full" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
