import React from 'react';

// Dados para os passos do workflow.
const steps = [
    { 
        number: '01', 
        title: 'Research and Strategy', 
        icon: '🚀', // Ícone de foguetão
        description: 'Conduct thorough market of the research to the fast target audience behaviors. Submit as many design tasks.' 
    },
    { 
        number: '02', 
        title: 'Plan Customization', 
        icon: '🐼', // Ícone de panda
        description: 'Conduct thorough market of the research to the fast target audience behaviors. Submit as many design tasks.' 
    },
    { 
        number: '03', 
        title: 'Finished & User Testing', 
        icon: '🔄', // Ícone de atualização
        description: 'Conduct thorough market of the research to the fast target audience behaviors. Submit as many design tasks.' 
    },
];

const Workflow = () => {
    return (
        <section className="py-20 lg:py-24 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <p className="text-sm font-bold text-gray-500 tracking-widest">WORKFLOW</p>
                    <h2 className="text-5xl font-serif mt-4">How We Work</h2>
                </div>
                
                {/* O grid principal que alinha os passos e os conectores */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
                    {steps.map((step, index) => (
                        <React.Fragment key={step.number}>
                            {/* Componente do Passo */}
                            <div className="text-center md:col-span-1">
                                <div className="inline-block bg-white rounded-full p-5 shadow-md mb-4 text-4xl">
                                    {step.icon}
                                </div>
                                <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                                <p className="text-gray-600 px-4">{step.description}</p>
                            </div>

                            {/* Conector - visível apenas em ecrãs médios e maiores, e não após o último item */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:flex items-center justify-center mt-16 md:col-span-1">
                                     <div className="w-full border-t-2 border-dashed border-gray-300 relative">
                                        <span className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gray-50 px-2 text-2xl font-bold text-gray-400">
                                            {step.number}
                                        </span>
                                     </div>
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Workflow;
