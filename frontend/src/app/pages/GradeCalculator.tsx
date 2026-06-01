import { useState } from "react";

const fields = {
  ciencias: {
    name: "Ciencias",
    subjects: [
      "Matemáticas II",
      "Física",
      "Química",
      "Biología",
      "Dibujo Técnico II",
      "Geología",
    ],
  },
  letras: {
    name: "Letras",
    subjects: [
      "Latín II",
      "Griego II",
      "Historia del Arte",
      "Geografía",
      "Literatura Universal",
      "Economía de la Empresa",
    ],
  },
  tecnologia: {
    name: "Tecnología",
    subjects: [
      "Matemáticas II",
      "Física",
      "Dibujo Técnico II",
      "Tecnología Industrial II",
      "Electrotecnia",
      "Química",
    ],
  },
};

export function GradeCalculator() {
  const [selectedField, setSelectedField] = useState<keyof typeof fields>("ciencias");
  const [generalPhaseGrade, setGeneralPhaseGrade] = useState("");
  const [specificSubjects, setSpecificSubjects] = useState<Record<string, { grade: string; weight: string }>>({});
  const [calculatedGrade, setCalculatedGrade] = useState<number | null>(null);

  const handleSubjectChange = (subject: string, field: "grade" | "weight", value: string) => {
    setSpecificSubjects({
      ...specificSubjects,
      [subject]: {
        ...specificSubjects[subject],
        [field]: value,
      },
    });
  };

  const calculateGrade = () => {
    const general = parseFloat(generalPhaseGrade);
    if (isNaN(general) || general < 0 || general > 10) {
      alert("Por favor, introduce una nota válida para la fase general (0-10)");
      return;
    }

    let specificPoints = 0;
    Object.entries(specificSubjects).forEach(([_, data]) => {
      const grade = parseFloat(data.grade);
      const weight = parseFloat(data.weight);
      if (!isNaN(grade) && !isNaN(weight) && grade >= 5) {
        specificPoints += grade * weight;
      }
    });

    const finalGrade = Math.min(general + specificPoints, 14);
    setCalculatedGrade(parseFloat(finalGrade.toFixed(2)));
  };

  return (
    <div className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl mb-6">Calculadora de Nota PAU</h1>

        <div className="bg-blue-50 border border-[#007bff] p-6 mb-8">
          <h2 className="text-xl mb-3">¿Cómo funciona?</h2>
          <p className="text-gray-700 mb-2">
            La nota de acceso a la universidad se calcula sumando:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li><strong>Fase General:</strong> Tu nota media de Bachillerato y los exámenes obligatorios (máximo 10 puntos)</li>
            <li><strong>Fase Específica:</strong> Hasta 4 puntos adicionales según las asignaturas ponderadas por la universidad</li>
            <li><strong>Nota final:</strong> Máximo 14 puntos</li>
          </ul>
        </div>

        <div className="space-y-8">
          <div className="border-2 border-gray-200 p-6">
            <h2 className="text-2xl mb-4">Fase General</h2>
            <label className="block mb-2 text-gray-700">Nota de la fase general (0-10):</label>
            <input
              type="number"
              min="0"
              max="10"
              step="0.01"
              value={generalPhaseGrade}
              onChange={(e) => setGeneralPhaseGrade(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-[#007bff]"
              placeholder="Ej: 7.5"
            />
          </div>

          <div className="border-2 border-gray-200 p-6">
            <h2 className="text-2xl mb-4">Fase Específica</h2>

            <div className="mb-6">
              <label className="block mb-2 text-gray-700">Selecciona tu campo de estudio:</label>
              <select
                value={selectedField}
                onChange={(e) => setSelectedField(e.target.value as keyof typeof fields)}
                className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-[#007bff]"
              >
                {Object.entries(fields).map(([key, field]) => (
                  <option key={key} value={key}>
                    {field.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              <p className="text-gray-700 mb-3">
                Introduce las notas de tus asignaturas específicas y sus ponderaciones (0.1 o 0.2):
              </p>
              {fields[selectedField].subjects.map((subject) => (
                <div key={subject} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center border border-gray-200 p-4">
                  <div className="font-medium">{subject}</div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Nota (0-10)</label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.01"
                      value={specificSubjects[subject]?.grade || ""}
                      onChange={(e) => handleSubjectChange(subject, "grade", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-[#007bff]"
                      placeholder="Ej: 8.5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Ponderación</label>
                    <select
                      value={specificSubjects[subject]?.weight || ""}
                      onChange={(e) => handleSubjectChange(subject, "weight", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-[#007bff]"
                    >
                      <option value="">Seleccionar</option>
                      <option value="0.1">0.1</option>
                      <option value="0.2">0.2</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={calculateGrade}
            className="w-full bg-[#007bff] text-white py-4 text-lg hover:bg-[#0056b3] transition-colors"
          >
            Calcular Nota Final
          </button>

          {calculatedGrade !== null && (
            <div className="border-2 border-[#007bff] bg-blue-50 p-8 text-center">
              <h2 className="text-2xl mb-4">Tu Nota de Acceso a la Universidad</h2>
              <div className="text-6xl font-bold text-[#007bff] mb-4">
                {calculatedGrade}
              </div>
              <p className="text-gray-700">
                {calculatedGrade >= 12
                  ? "¡Excelente nota! Tienes muchas opciones de grados universitarios."
                  : calculatedGrade >= 9
                  ? "Buena nota. Podrás acceder a la mayoría de grados universitarios."
                  : calculatedGrade >= 7
                  ? "Nota correcta. Consulta las notas de corte de tus grados de interés."
                  : "Considera mejorar tu nota con la fase específica para más opciones."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
