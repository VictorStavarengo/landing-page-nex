const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-4xl lg:text-5xl font-serif font-semibold mb-6">
                        Let's Create Something New
                    </h2>
                    <a 
                        href="#" 
                        className="bg-green-500 text-white px-8 py-3 rounded-md font-semibold hover:bg-green-600 transition-transform transform hover:scale-105 inline-block"
                    >
                        Get a Quote
                    </a>
                </div>
                <div className="mt-12 border-t border-gray-700 pt-8 text-center text-gray-400">
                    <p>&copy; 2025 NEX | Desenvolvido para o teste de Front-End.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
