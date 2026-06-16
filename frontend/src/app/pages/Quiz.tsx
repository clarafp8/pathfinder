import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { titulacionesAPI } from "../services/apiClient";
import { questions } from "../services/questions";

const ramaMapping: Record<string, number> = {
  A: 6,
  B: 9,
  C: 7,
  D: 10,
};

export function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [recomendacionesBBDD, setRecomendacionesBBDD] = useState<any[]>([]);
  const [loadingRecomendaciones, setLoadingRecomendaciones] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("usuario"));

  useEffect(() => {
    if (showResults) {
      setIsLoggedIn(!!localStorage.getItem("usuario"));
    }
  }, [showResults]);

  const loadRecomendacionesBBDD = async (topChoice: string) => {
    const idRama = ramaMapping[topChoice] || 6;
    setLoadingRecomendaciones(true);
    try {
      const data = await titulacionesAPI.getByRama(idRama);
      setRecomendacionesBBDD(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingRecomendaciones(false);
    }
  };

  const handleSelectAnswer = (optionId: string) => {
    const currentQuestionId = questions[currentQuestion].id;
    const nuevasRespuestas = {
      ...selectedAnswers,
      [currentQuestionId]: optionId,
    };
    setSelectedAnswers(nuevasRespuestas);

    setIsTransitioning(true);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setIsTransitioning(false);
      } else {
        setShowResults(true);
        const counts = { A: 0, B: 0, C: 0, D: 0 };
        Object.values(nuevasRespuestas).forEach((answer) => {
          counts[answer as keyof typeof counts]++;
        });
        const maxCount = Math.max(...Object.values(counts));
        const topChoice = Object.entries(counts).find(([_, count]) => count === maxCount)?.[0] || "A";
        loadRecomendacionesBBDD(topChoice);
      }
    }, 350);
  };

  const getRecommendation = () => {
    const counts = { A: 0, B: 0, C: 0, D: 0 };
    Object.values(selectedAnswers).forEach((answer) => {
      counts[answer as keyof typeof counts]++;
    });

    const maxCount = Math.max(...Object.values(counts));
    const topChoice = Object.entries(counts).find(([_, count]) => count === maxCount)?.[0];

    const recommendations = {
      A: {
        title: "Ingeniería y Arquitectura",
        description: "Tienes una mente analítica y te gustan los retos lógicos. Las carreras técnicas, el desarrollo de software y el diseño de estructuras son lo tuyo.",
      },
      B: {
        title: "Artes y Humanidades",
        description: "Tu creatividad, expresión e imaginación son tus puntos fuertes. Te interesan las industrias culturales, el diseño gráfico o la historia.",
      },
      C: {
        title: "Ciencias de la Salud",
        description: "Te motiva el contacto humano, el bienestar comunitario y el impacto social positivo. Las áreas de salud y cuidado médico encajan contigo.",
      },
      D: {
        title: "Ciencias",
        description: "Tu curiosidad científica, rigor empírico y pasión por descubrir el porqué de la naturaleza te llevarán lejos en el mundo de la investigación.",
      },
    };

    return recommendations[topChoice as keyof typeof recommendations] || recommendations.A;
  };

  const hasTie = () => {
    const counts = { A: 0, B: 0, C: 0, D: 0 };
    Object.values(selectedAnswers).forEach((answer) => {
      counts[answer as keyof typeof counts]++;
    });
    const maxCount = Math.max(...Object.values(counts));
    const tiedAreas = Object.values(counts).filter(count => count === maxCount).length;
    return tiedAreas > 1;
  };

  return (
    <div className="min-h-screen bg-white py-12 md:py-20 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        {showResults ? (
          <div className="border-2 border-[#007bff] p-8 md:p-12">
            <h1 className="text-2xl md:text-3xl mb-6 text-center">Resultados del Test Vocacional</h1>

            <div className="mb-8">
              <h2 className="text-xl md:text-2xl text-[#007bff] mb-4">{getRecommendation().title}</h2>
              <p className="text-base md:text-lg mb-4">{getRecommendation().description}</p>

              {hasTie() && (
                <p className="text-xs italic text-gray-500 mb-6 bg-blue-50 p-3 border-l-4 border-[#007bff]">
                  ¡Tienes un perfil muy versátil! Has empatado en varias áreas, pero aquí tienes tu opción principal destacada.
                </p>
              )}

              <div className="bg-gray-50 p-6 border border-gray-200">
                <h3 className="font-semibold mb-4 text-gray-900">Grados recomendados según tu resultado:</h3>

                {loadingRecomendaciones ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-gray-200 h-32 rounded border border-gray-300"></div>
                    ))}
                  </div>
                ) : recomendacionesBBDD.length === 0 ? (
                  <p className="text-sm text-gray-500 italic">No hay titulaciones dadas de alta en la base de datos para esta rama todavía.</p>
                ) : (
                  <div className="relative">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                      {isLoggedIn ? (
                        recomendacionesBBDD.slice(0, 3).map((titulacion: any) => (
                          <div key={titulacion.idTitulacion} className="bg-white border-2 border-gray-100 hover:border-[#007bff] p-5 shadow-sm flex flex-col justify-between min-h-[140px] transition-all duration-300">
                            <div>
                              <h4 className="font-bold text-gray-900 text-base mb-2">{titulacion.nombre}</h4>
                              <span className="inline-block bg-blue-50 text-[#007bff] text-xs px-2.5 py-1 font-semibold rounded mb-3">
                                {titulacion.tipo}
                              </span>
                            </div>
                            <div className="border-t pt-2 text-xs text-gray-500 flex justify-between items-center">
                              <span>Nota de Corte:</span>
                              <strong className="text-gray-950 text-sm">
                                {titulacion.notaCorte !== null && titulacion.notaCorte !== undefined ? titulacion.notaCorte : "5.00"}
                              </strong>
                            </div>
                          </div>
                        ))
                      ) : (
                        <>
                          <div className="bg-white border-2 border-gray-100 p-5 shadow-sm flex flex-col justify-between min-h-[140px]">
                            <div>
                              <h4 className="font-bold text-gray-900 text-base mb-2">{recomendacionesBBDD[0]?.nombre}</h4>
                              <span className="inline-block bg-blue-50 text-[#007bff] text-xs px-2.5 py-1 font-semibold rounded mb-3">
                                {recomendacionesBBDD[0]?.tipo}
                              </span>
                            </div>
                            <div className="border-t pt-2 text-xs text-gray-500 flex justify-between items-center">
                              <span>Nota de Corte:</span>
                              <strong className="text-gray-950 text-sm">
                                {recomendacionesBBDD[0]?.notaCorte !== null && recomendacionesBBDD[0]?.notaCorte !== undefined ? recomendacionesBBDD[0].notaCorte : "5.00"}
                              </strong>
                            </div>
                          </div>

                          <div className="bg-white border-2 border-gray-100/50 p-5 shadow-sm flex flex-col justify-between min-h-[140px] blur-[4px] select-none pointer-events-none">
                            <div>
                              <h4 className="font-bold text-gray-400 text-base mb-2">Grado Oculto Premium</h4>
                              <span className="inline-block bg-gray-100 text-gray-400 text-xs px-2.5 py-1 font-semibold rounded mb-3">
                                Grado Universitario
                              </span>
                            </div>
                            <div className="border-t pt-2 text-xs text-gray-300 flex justify-between items-center">
                              <span>Nota de Corte:</span>
                              <strong className="text-gray-400 text-sm">##.###</strong>
                            </div>
                          </div>

                          <div className="bg-white border-2 border-gray-100/50 p-5 shadow-sm flex flex-col justify-between min-h-[140px] blur-[4px] select-none pointer-events-none">
                            <div>
                              <h4 className="font-bold text-gray-400 text-base mb-2">Especialidad Alternativa</h4>
                              <span className="inline-block bg-gray-100 text-gray-400 text-xs px-2.5 py-1 font-semibold rounded mb-3">
                                Doble Grado
                              </span>
                            </div>
                            <div className="border-t pt-2 text-xs text-gray-300 flex justify-between items-center">
                              <span>Nota de Corte:</span>
                              <strong className="text-gray-400 text-sm">##.###</strong>
                            </div>
                          </div>
                        </>
                      )}

                    </div>

                    {!isLoggedIn && (
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-50/40 via-transparent to-transparent flex items-center justify-center p-4">
                        <div className="bg-white/95 backdrop-blur-sm border border-gray-200 p-6 shadow-xl text-center max-w-xs w-full pointer-events-auto rounded-sm transform translate-y-2">
                          <p className="text-xs font-bold text-gray-900 mb-1.5">
                            🔒 Desbloquea tus opciones alternativas
                          </p>
                          <p className="text-[11px] text-gray-500 mb-4 leading-relaxed">
                            Regístrate gratis en PathFinder para descubrir el informe completo y guardar tus resultados en tu perfil.
                          </p>
                          <button
                            onClick={() => navigate("/registro")}
                            className="w-full bg-[#007bff] text-white text-xs py-2.5 font-semibold hover:bg-[#0056b3] transition-colors shadow-sm tracking-wide uppercase mb-3"
                          >
                            Registrarse y ver todo
                          </button>

                          <p className="text-[11px] text-gray-600 border-t pt-2">
                            ¿Ya tienes una cuenta?{" "}
                            <button
                              onClick={() => {
                                navigate("/");
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className="text-[#007bff] font-bold hover:underline bg-transparent border-none p-0 cursor-pointer"
                            >
                              Inicia sesión aquí
                            </button>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setCurrentQuestion(0);
                  setSelectedAnswers({});
                  setShowResults(false);
                  setRecomendacionesBBDD([]);
                  setIsTransitioning(false);
                }}
                className="flex-1 bg-gray-200 text-gray-800 py-3 hover:bg-gray-300 transition-colors"
              >
                Repetir test
              </button>
              <button
                onClick={() => navigate("/descubrir")}
                className="flex-1 bg-[#007bff] text-white py-3 hover:bg-[#0056b3] transition-colors"
              >
                Explorar carreras
              </button>
            </div>
          </div>
        ) : (
          <div className={`transition-opacity duration-200 ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">
                Pregunta {currentQuestion + 1} de {questions.length}
              </span>
              <div className="flex gap-2 flex-wrap items-center">
                {questions.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 transition-all duration-300 ${index <= currentQuestion ? "bg-[#007bff]" : "bg-gray-200"} md:w-8 md:flex-none flex-1 min-w-[8px]`}
                  />
                ))}
              </div>
            </div>

            <h1 className="text-2xl md:text-3xl mb-8">{questions[currentQuestion].question}</h1>

            <div className="space-y-4 mb-8">
              {questions[currentQuestion].options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSelectAnswer(option.id)}
                  disabled={isTransitioning}
                  className={`w-full text-left p-6 border-2 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] ${selectedAnswers[questions[currentQuestion].id] === option.id
                    ? "border-[#007bff] bg-blue-50/70 shadow-sm font-semibold"
                    : "border-gray-200 hover:border-[#007bff] hover:bg-blue-50/20"
                    }`}
                >
                  <span className="font-semibold mr-3">{option.id}.</span>
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}