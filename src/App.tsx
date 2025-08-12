import React, { useState, createContext, useContext } from 'react';

// --- Tipos de Dados ---
type Endereco = {
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string; // Cidade
    uf: string;
};

type SVGProps = React.SVGProps<SVGSVGElement>;

// --- Contexto para o Modal ---
// Usar Context API para o estado do modal é uma boa prática e atende ao requisito de "estado global".
type ModalContextType = {
    isModalOpen: boolean;
    toggleModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal deve ser usado dentro de um ModalProvider");
    }
    return context;
};

const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => setIsModalOpen(!isModalOpen);

    return (
        <ModalContext.Provider value={{ isModalOpen, toggleModal }}>
            {children}
        </ModalContext.Provider>
    );
};


// --- Componente do Modal de Busca de CEP ---
const CepModal = () => {
    const { isModalOpen, toggleModal } = useModal();
    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState<Endereco | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearchCep = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!cep) return;

        setLoading(true);
        setError(null);
        setEndereco(null);

        const cleanedCep = cep.replace(/\D/g, ''); // Remove tudo que não for dígito

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`);
            const data = await response.json();

            if (data.erro) {
                throw new Error('CEP não encontrado.');
            }
            
            setEndereco(data);

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ocorreu um erro ao buscar o CEP.');
        } finally {
            setLoading(false);
        }
    };

    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-lg relative">
                <button onClick={toggleModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
                    <XIcon className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Busca de Endereço por CEP</h2>
                
                <form onSubmit={handleSearchCep}>
                    <div className="flex items-center space-x-2 mb-4">
                        <input
                            type="text"
                            value={cep}
                            onChange={(e) => setCep(e.target.value)}
                            placeholder="Digite o CEP (ex: 01001-000)"
                            className="flex-grow p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                        />
                        <button type="submit" disabled={loading} className="bg-green-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-600 transition disabled:bg-gray-400">
                            {loading ? 'Buscando...' : 'Buscar'}
                        </button>
                    </div>
                </form>

                {error && <p className="text-red-500 text-center my-4">{error}</p>}

                {endereco && (
                    <div className="mt-6 space-y-4 animate-fade-in">
                        <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">Resultado da Busca</h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Logradouro</label>
                            <input type="text" value={endereco.logradouro} disabled className="w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Complemento</label>
                            <input type="text" value={endereco.complemento} disabled className="w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Bairro</label>
                            <input type="text" value={endereco.bairro} disabled className="w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md" />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-600">Cidade</label>
                                <input type="text" value={endereco.localidade} disabled className="w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">UF</label>
                                <input type="text" value={endereco.uf} disabled className="w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


// --- Ícones ---
const MenuIcon = (props: SVGProps) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
  </svg>
);

const XIcon = (props: SVGProps) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const SearchIcon = (props: SVGProps) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const ArrowRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
);

const ChevronDownIcon = (props: SVGProps) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);


// --- Componente Header ---
const Header = () => {
  const { toggleModal } = useModal(); // Usa o hook do contexto para pegar a função
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [
    { name: 'Home', dropdown: false },
    { name: 'About Us', dropdown: false },
    { name: 'Portfolio', dropdown: true },
    { name: 'Pages', dropdown: true },
    { name: 'Blog', dropdown: true },
    { name: 'Contact Us', dropdown: false },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40"> {/* Diminuído o z-index para o modal ficar por cima */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="#" className="text-3xl font-bold text-gray-900">NEX</a>
          </div>
          <nav className="hidden lg:flex lg:items-center lg:space-x-8">
            {navLinks.map((link) => (
              <a key={link.name} href="#" className="flex items-center text-gray-600 hover:text-gray-900 font-medium">
                {link.name}
                {link.dropdown && <ChevronDownIcon className="w-4 h-4 ml-1" />}
              </a>
            ))}
          </nav>
          <div className="hidden lg:flex items-center space-x-4">
            {/* Botão de busca agora abre o modal */}
            <button onClick={toggleModal} className="text-gray-500 hover:text-gray-900">
              <SearchIcon className="h-6 w-6" />
            </button>
            <a href="#" className="bg-green-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-600 transition-colors">
              Get a Quote
            </a>
          </div>
          <div className="lg:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-gray-900">
              {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a key={link.name} href="#" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                {link.name}
                {link.dropdown && <ChevronDownIcon className="w-4 h-4 ml-1" />}
              </a>
            ))}
             {/* Adicionado botão de busca ao menu mobile */}
            <button onClick={toggleModal} className="w-full flex items-center justify-center px-3 py-2 mt-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                <SearchIcon className="h-6 w-6 mr-2" />
                Buscar CEP
            </button>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
             <div className="px-5">
                <a href="#" className="w-full block text-center bg-green-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-600 transition-colors">
                    Get a Quote
                </a>
             </div>
          </div>
        </div>
      )}
    </header>
  );
};

// --- Componente Hero ---
const Hero = () => {
    return (
        <section className="bg-white py-20 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="relative text-center lg:text-left">
                        <p className="text-lg font-medium text-gray-600">Great Design Services</p>
                        <p className="text-lg font-medium text-gray-600 mb-4">Without The Pretentiousness.</p>
                        <h1 className="text-7xl sm:text-8xl md:text-9xl font-serif font-bold text-gray-900 leading-none tracking-tighter">
                            Digital
                        </h1>
                        <div className="relative flex flex-col sm:flex-row items-center justify-center lg:justify-start mt-[-1.5rem] md:mt-[-2.5rem] lg:ml-4">
                             <div className="bg-lime-400 text-black font-bold py-2 px-6 rounded-full text-lg z-10 shadow-lg">
                                WEB DESIGN
                             </div>
                             <img 
                                src="https://placehold.co/100x100/27272A/FFFFFF?text=3D" 
                                alt="Elemento 3D" 
                                className="w-24 h-24 rounded-full sm:ml-[-2rem] mt-[-1rem] sm:mt-0 border-4 border-white shadow-lg"
                             />
                             <h1 className="text-7xl sm:text-8xl md:text-9xl font-serif font-bold text-gray-900 leading-none sm:ml-4 mt-[-1.5rem] sm:mt-0 tracking-tighter">
                                Solution
                            </h1>
                        </div>
                    </div>
                    <div className="space-y-8">
                        <p className="text-lg text-gray-600 leading-relaxed">
                            We Believe That The Surest Measure Of Success Is When Our Partners Win. We're More Than Just The Visuals, We're Here To Support Your Growth.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-lg shadow-lg border border-gray-100">
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

// --- Outros Componentes (Metrics, Collaboration, etc.) ---
// (O código para Metrics, Collaboration, Services, Workflow, About, Footer permanece o mesmo)
// Para manter o exemplo conciso, eles não estão repetidos aqui, mas devem estar no seu ficheiro.

const Metrics = () => {
    const stats = [ { value: '35k+', label: 'Project Complete' }, { value: '10k+', label: 'Happy Customers' }, { value: '25+', label: 'Years Experiences' }, { value: '88', label: 'Awards Achievement' }, ];
    return ( <section className="bg-gray-50 py-20 lg:py-24"> <div className="container mx-auto px-4 sm:px-6 lg:px-8"> <div className="grid grid-cols-2 lg:grid-cols-4 gap-8"> {stats.map((stat) => ( <div key={stat.label} className="bg-white p-6 rounded-full shadow-lg flex flex-col justify-center items-center aspect-square transition-transform hover:scale-105"> <p className="text-4xl md:text-5xl font-bold text-gray-900">{stat.value}</p> <p className="mt-2 text-base md:text-lg text-gray-600 text-center">{stat.label}</p> </div> ))} </div> </div> </section> );
};
const Collaboration = () => {
    const logos = [ { name: 'Tech Logo', src: 'https://raw.githubusercontent.com/tailwindui/class-spy/main/logos/1.svg' }, { name: 'Technology', src: 'https://raw.githubusercontent.com/tailwindui/class-spy/main/logos/2.svg' }, { name: 'Slogan Here', src: 'https://raw.githubusercontent.com/tailwindui/class-spy/main/logos/3.svg' }, { name: 'System', src: 'https://raw.githubusercontent.com/tailwindui/class-spy/main/logos/4.svg' }, { name: 'Another Logo', src: 'https://raw.githubusercontent.com/tailwindui/class-spy/main/logos/5.svg' }, ];
    return ( <section className="bg-gray-900 text-white py-20 lg:py-24"> <div className="container mx-auto px-4 sm:px-6 lg:px-8"> <div className="text-center mb-16"> <h2 className="text-4xl lg:text-5xl font-serif font-semibold leading-tight"> We Collaborate With A Few Disability Service<br /> Providers To Create Inclusive Goods That<br /> Meet Their Requirements. </h2> </div> <div className="grid md:grid-cols-3 gap-12 text-center md:text-left items-start mb-20"> <div className="md:col-span-1 flex flex-col items-center md:items-start"> <p className="text-8xl font-bold text-white">25+</p> <p className="text-xl text-gray-300">Years Of Experience</p> </div> <div className="md:col-span-1 space-y-4"> <p className="text-gray-400 leading-relaxed"> Established In 1995, NEXIN Has Been A Leading Force In The Digital Landscape For Over Two Decades. We're A Passionate Team Of Designers. </p> <a href="#" className="inline-flex items-center font-semibold text-green-400 hover:text-green-300 transition-colors"> More About Us <ArrowRightIcon className="w-4 h-4 ml-2" /> </a> </div> <div className="md:col-span-1 space-y-4"> <p className="text-gray-400 leading-relaxed"> Established In 1995, NEXIN Has Been A Leading Force In The Digital Landscape For Over Two Decades. We're A Passionate Team Of Designers. </p> <a href="#" className="inline-flex items-center font-semibold text-green-400 hover:text-green-300 transition-colors"> Get In Touch <ArrowRightIcon className="w-4 h-4 ml-2" /> </a> </div> </div> <div className="border-t border-gray-700 pt-16"> <p className="text-center text-lg text-gray-400 mb-8">We Worked With Global Largest Brands</p> <div className="flex flex-wrap justify-center items-center gap-x-12 sm:gap-x-16 gap-y-8"> {logos.map((logo, index) => ( <img key={index} src={logo.src} alt={logo.name} className="h-8 object-contain" style={{ filter: 'brightness(0) invert(1)' }} /> ))} </div> </div> </div> </section> );
};
const Services = () => {
    const serviceItems = [ { title: 'Web Design And Development', icon: '📦', description: "Established In 1995, NEXIN Has Been Leading Force In The Digital Landscape For Over Two Decades. We're A Passionate" }, { title: 'Branding And Creative Services', icon: '⌘', description: "Established In 1995, NEXIN Has Been Leading Force In The Digital Landscape For Over Two Decades. We're A Passionate" }, { title: 'Creative Digital Agency', icon: '⬢', description: "Established In 1995, NEXIN Has Been Leading Force In The Digital Landscape For Over Two Decades. We're A Passionate" }, ];
    return ( <section className="py-20 lg:py-24 bg-white"> <div className="container mx-auto px-4 sm:px-6 lg:px-8"> <div className="text-center mb-16"> <p className="text-sm font-bold text-gray-500 tracking-widest">SERVICES</p> <h2 className="text-4xl lg:text-5xl font-serif mt-4 leading-tight"> Empowering Brands Through<br /> Strategic Digital Services </h2> </div> <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"> {serviceItems.map((item) => ( <div key={item.title} className="border border-gray-200 rounded-lg p-8 text-center hover:shadow-2xl hover:border-green-400 transition-all duration-300 transform hover:-translate-y-2"> <div className="text-6xl mb-6 text-gray-800">{item.icon}</div> <h3 className="text-2xl font-semibold mb-4 text-gray-900">{item.title}</h3> <p className="text-gray-600 leading-relaxed">{item.description}</p> </div> ))} </div> </div> </section> );
};
const Workflow = () => {
    const steps = [ { number: '01', title: 'Research and Strategy', icon: '🚀', description: 'Conduct thorough market of the research to the fast target audience behaviors. Submit as many design tasks.' }, { number: '02', title: 'Plan Customization', icon: '🐼', description: 'Conduct thorough market of the research to the fast target audience behaviors. Submit as many design tasks.' }, { number: '03', title: 'Finished & User Testing', icon: '🔄', description: 'Conduct thorough market of the research to the fast target audience behaviors. Submit as many design tasks.' }, ];
    return ( <section className="py-20 lg:py-24 bg-gray-50"> <div className="container mx-auto px-4 sm:px-6 lg:px-8"> <div className="text-center mb-16"> <p className="text-sm font-bold text-gray-500 tracking-widest">WORKFLOW</p> <h2 className="text-5xl font-serif mt-4">How We Work</h2> </div> <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start"> {steps.map((step, index) => ( <React.Fragment key={step.number}> <div className="text-center md:col-span-1"> <div className="inline-block bg-white rounded-full p-5 shadow-md mb-4 text-4xl"> {step.icon} </div> <h3 className="text-2xl font-semibold mb-2">{step.title}</h3> <p className="text-gray-600 px-4">{step.description}</p> </div> {index < steps.length - 1 && ( <div className="hidden md:flex items-center justify-center mt-16 md:col-span-1"> <div className="w-full border-t-2 border-dashed border-gray-300 relative"> <span className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gray-50 px-2 text-2xl font-bold text-gray-400"> {step.number} </span> </div> </div> )} </React.Fragment> ))} </div> </div> </section> );
};
const About = () => {
    return ( <section className="py-20 lg:py-24 bg-white"> <div className="container mx-auto px-4 sm:px-6 lg:px-8"> <div className="text-center mb-16"> <p className="text-sm font-bold text-gray-500 tracking-widest">WHAT SETS US APART</p> <h2 className="text-4xl lg:text-5xl font-serif mt-4 leading-tight"> Driving Digital Success<br /> With Strategy Design </h2> </div> <div className="grid lg:grid-cols-2 gap-12 items-center mb-16 lg:mb-24"> <div> <img src="https://placehold.co/600x450/E2E8F0/A0AEC0?text=Team+Working" alt="Equipa a trabalhar num portátil" className="rounded-lg shadow-lg w-full" /> </div> <div className="space-y-6"> <p className="text-lg text-gray-600 leading-relaxed"> We Believe That The Surest Measure Of Success Is When Our Partners With Us More Than Half It's More Than Just The Visuals. </p> <div className="space-y-4 text-gray-600"> <p>We Believe That The Surest Measure Of Success Is When Our Partners With Us More Than Half It's More Than Just The Visuals. We're Here To Support Your Growth.</p> <p>We Believe That The Surest Measure Of Success Is When Our Partners With Us More Than Half It's More Than Just The Visuals.</p> </div> </div> </div> <div className="grid lg:grid-cols-2 gap-12 items-center"> <div className="space-y-8 order-last lg:order-first"> <div> <h3 className="text-3xl font-semibold mb-3 text-gray-900">Our Mission</h3> <p className="text-gray-600 leading-relaxed">Conduct thorough market research to the fast target audience behaviours. Submit as many design tasks.</p> </div> <div className="flex space-x-4"> <div className="bg-green-100 p-6 rounded-lg text-center flex-1 transform hover:scale-105 transition-transform"> <img src="https://placehold.co/80x80/34D399/FFFFFF?text=Icon" className="mx-auto mb-3 rounded-full" alt="Ícone de Marketing"/> <p className="font-semibold text-gray-800">Marketing Strategy</p> </div> <div className="bg-yellow-100 p-6 rounded-lg text-center flex-1 transform hover:scale-105 transition-transform"> <img src="https://placehold.co/80x80/FBBF24/FFFFFF?text=Icon" className="mx-auto mb-3 rounded-full" alt="Ícone de UX/UI" /> <p className="font-semibold text-gray-800">UX/UI Solution</p> </div> </div> </div> <div className="order-first lg:order-last"> <img src="https://placehold.co/600x450/FEEBC8/D69E2E?text=Hands+on+Laptop" alt="Mãos num portátil" className="rounded-lg shadow-lg w-full" /> </div> </div> </div> </section> );
};
const Footer = () => {
    return ( <footer className="bg-gray-900 text-white"> <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16"> <div className="text-center mb-12"> <h2 className="text-4xl lg:text-5xl font-serif font-semibold mb-6"> Let's Create Something New </h2> <a href="#" className="bg-green-500 text-white px-8 py-3 rounded-md font-semibold hover:bg-green-600 transition-transform transform hover:scale-105 inline-block"> Get a Quote </a> </div> <div className="mt-12 border-t border-gray-700 pt-8 text-center text-gray-400"> <p>&copy; 2025 NEX | Desenvolvido para o teste de Front-End.</p> </div> </div> </footer> );
};


// --- Componente Principal App ---
// Envolvemos a aplicação com o ModalProvider para que todos os componentes filhos possam usar o contexto.
function App() {
  return (
    <ModalProvider>
        <div className="bg-white font-sans">
            <Header />
            <main>
                <Hero />
                <Metrics />
                <Collaboration />
                <Services />
                <Workflow />
                <About />
            </main>
            <Footer />
            <CepModal /> {/* O Modal é renderizado aqui, mas a sua visibilidade é controlada pelo contexto */}
        </div>
    </ModalProvider>
  );
}

export default App;
