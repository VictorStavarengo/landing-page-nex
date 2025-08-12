
// Dados para as estatísticas.
const stats = [
    { value: '35k+', label: 'Project Complete' },
    { value: '10k+', label: 'Happy Customers' },
    { value: '25+', label: 'Years Experiences' },
    { value: '88', label: 'Awards Achievement' },
];

const Metrics = () => {
    return (
        <section className="bg-gray-50 py-20 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Grid que se adapta: 2 colunas em telas pequenas, 4 em telas grandes */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat) => (
                        <div key={stat.label} className="bg-white p-6 rounded-full shadow-lg flex flex-col justify-center items-center aspect-square transition-transform hover:scale-105">
                            <p className="text-4xl md:text-5xl font-bold text-gray-900">{stat.value}</p>
                            <p className="mt-2 text-base md:text-lg text-gray-600 text-center">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Metrics;
