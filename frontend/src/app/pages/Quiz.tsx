import { useState } from "react";
import { useNavigate } from "react-router";

const questions = [
  {
    id: 1,
    question: "¿Cuál de estas actividades disfrutas más?",
    options: [
      { id: "A", text: "Resolver problemas matemáticos y lógicos" },
      { id: "B", text: "Crear arte, música o contenido creativo" },
      { id: "C", text: "Ayudar y cuidar a otras personas" },
      { id: "D", text: "Investigar y descubrir cómo funcionan las cosas" },
    ],
  },
  {
    id: 2,
    question: "¿En qué tipo de entorno prefieres trabajar?",
    options: [
      { id: "A", text: "En una oficina con proyectos estructurados" },
      { id: "B", text: "En un estudio creativo o espacio artístico" },
      { id: "C", text: "En contacto directo con personas y comunidad" },
      { id: "D", text: "En un laboratorio o ambiente de investigación" },
    ],
  },
  {
    id: 3,
    question: "¿Qué tipo de retos te motivan más?",
    options: [
      { id: "A", text: "Optimizar sistemas y encontrar soluciones eficientes" },
      { id: "B", text: "Expresar ideas de forma innovadora y original" },
      { id: "C", text: "Hacer un impacto positivo en la sociedad" },
      { id: "D", text: "Descubrir nuevos conocimientos y teorías" },
    ],
  },
  {
    id: 4,
    question: "¿Qué asignatura te resultaba más interesante?",
    options: [
      { id: "A", text: "Matemáticas y Tecnología" },
      { id: "B", text: "Arte, Música o Literatura" },
      { id: "C", text: "Ciencias Sociales y Humanidades" },
      { id: "D", text: "Ciencias Naturales y Biología" },
    ],
  },
  {
    id: 5,
    question: "¿Cómo te ves en 10 años?",
    options: [
      { id: "A", text: "Liderando proyectos tecnológicos o empresariales" },
      { id: "B", text: "Trabajando en la industria creativa o cultural" },
      { id: "C", text: "Ayudando a mejorar la vida de las personas" },
      { id: "D", text: "Contribuyendo al avance científico" },
    ],
  },
];

export function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const handleSelectAnswer = (optionId: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questions[currentQuestion].id]: optionId,
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
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
        title: "Perfil Tecnológico/Empresarial",
        careers: "Ingeniería, Informática, Administración de Empresas, Economía",
        description: "Tienes una mente analítica y te gustan los retos lógicos. Las carreras STEM y empresariales podrían ser ideales para ti.",
      },
      B: {
        title: "Perfil Creativo/Artístico",
        careers: "Bellas Artes, Diseño, Comunicación Audiovisual, Arquitectura",
        description: "Tu creatividad e imaginación son tus puntos fuertes. Las carreras artísticas y de diseño te permitirán expresarte.",
      },
      C: {
        title: "Perfil Social/Humanístico",
        careers: "Medicina, Psicología, Trabajo Social, Educación, Derecho",
        description: "Te motiva ayudar a los demás y generar un impacto social positivo. Las carreras de ciencias sociales y salud son perfectas para ti.",
      },
      D: {
        title: "Perfil Científico/Investigador",
        careers: "Biología, Química, Física, Medicina, Farmacia",
        description: "Tu curiosidad científica y pasión por descubrir te llevarán lejos en las ciencias naturales y la investigación.",
      },
    };

    return recommendations[topChoice as keyof typeof recommendations] || recommendations.A;
  };

  if (showResults) {
    const recommendation = getRecommendation();
    return (
      <div className="min-h-screen bg-white py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="border-2 border-[#007bff] p-12">
            <h1 className="text-3xl mb-6 text-center">Resultados del Test Vocacional</h1>

            <div className="mb-8">
              <h2 className="text-2xl text-[#007bff] mb-4">{recommendation.title}</h2>
              <p className="text-lg mb-4">{recommendation.description}</p>

              <div className="bg-gray-50 p-6 border border-gray-200">
                <h3 className="font-semibold mb-2">Carreras recomendadas:</h3>
                <p className="text-gray-700">{recommendation.careers}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setCurrentQuestion(0);
                  setSelectedAnswers({});
                  setShowResults(false);
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
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const selectedAnswer = selectedAnswers[question.id];

  return (
    <div className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">
              Pregunta {currentQuestion + 1} de {questions.length}
            </span>
            <div className="flex gap-2">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-8 h-2 ${
                    index <= currentQuestion ? "bg-[#007bff]" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>

          <h1 className="text-3xl mb-8">{question.question}</h1>

          <div className="space-y-4 mb-8">
            {question.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSelectAnswer(option.id)}
                className={`w-full text-left p-6 border-2 transition-all ${
                  selectedAnswer === option.id
                    ? "border-[#007bff] bg-blue-50"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <span className="font-semibold mr-3">{option.id}.</span>
                {option.text}
              </button>
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={!selectedAnswer}
            className={`w-full py-3 transition-colors ${
              selectedAnswer
                ? "bg-[#007bff] text-white hover:bg-[#0056b3]"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {currentQuestion < questions.length - 1 ? "Siguiente Pregunta" : "Ver Resultados"}
          </button>
        </div>
      </div>
    </div>
  );
}
