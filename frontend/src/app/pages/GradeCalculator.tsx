import { useState } from "react";

const fields = {
  ciencias: {
    name: "Ciencias y Tecnología",
    subjects: ["Física", "Química", "Biología", "Dibujo Técnico II", "Geología"],
  },
  letras: {
    name: "Humanidades y Ciencias Sociales",
    subjects: ["Historia del Arte", "Geografía", "Economía de la Empresa", "Literatura Universal"],
  },
};

export function GradeCalculator() {
  const [selectedField, setSelectedField] = useState<keyof typeof fields>("ciencias");
  const [bachilleratoGrade, setBachilleratoGrade] = useState("");

  const [generalSubjects, setGeneralSubjects] = useState<Record<string, string>>({
    lengua: "",
    ingles: "",
    historia: "",
    modalidad: ""
  });

  const [specificSubjects, setSpecificSubjects] = useState<Record<string, { grade: string; weight: string }>>({});
  const [modalidadWeight, setModalidadWeight] = useState("");
  const [calculatedGrade, setCalculatedGrade] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  const handleGradeKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "-" || e.key === "+") {
      e.preventDefault();
    }
  };

  const sanitizeGrade = (value: string): string => {
    if (value === "") return "";
    let num = parseFloat(value);
    if (isNaN(num)) return "";
    if (num < 0) num = 0;
    if (num > 10) num = 10;
    return num.toString();
  };

  const handleGeneralChange = (subject: string, value: string) => {
    setGeneralSubjects({
      ...generalSubjects,
      [subject]: sanitizeGrade(value),
    });
  };

  const handleSpecificChange = (subject: string, field: "grade" | "weight", value: string) => {
    setSpecificSubjects({
      ...specificSubjects,
      [subject]: {
        ...specificSubjects[subject],
        [field]: field === "grade" ? sanitizeGrade(value) : value,
      },
    });
  };

  const calculateGrade = () => {
    setError("");
    setCalculatedGrade(null);
    const bach = parseFloat(bachilleratoGrade);

    if (isNaN(bach) || bach < 5 || bach > 10) {
      setError("Introduce una nota de Bachillerato válida (5-10)");
      return;
    }

    const gGrades = Object.values(generalSubjects).map(v => parseFloat(v));
    if (gGrades.some(isNaN)) {
      setError("Por favor, rellena todas las notas de la Fase General");
      return;
    }

    // ⚖️ VALIDACIÓN LEGAL 1: Media de la fase general obligatoria >= 4.00
    const generalPhaseAverage = gGrades.reduce((a, b) => a + b, 0) / 4;
    if (generalPhaseAverage < 4) {
      setError(`Fase General suspensa (Media: ${generalPhaseAverage.toFixed(2)}). Se requiere un mínimo de 4.00 para promediar con Bachillerato.`);
      return;
    }

    // ⚖️ VALIDACIÓN LEGAL 2: Nota de acceso general ((Bach * 0.6) + (PAU * 0.4)) >= 5.00
    const accesoGrade = (bach * 0.6) + (generalPhaseAverage * 0.4);
    if (accesoGrade < 5) {
      setError(`No apto para acceso universitario. La combinación ponderada es de ${accesoGrade.toFixed(2)} (Mínimo requerido: 5.00).`);
      return;
    }

    const listaPuntos: number[] = [];

    // ⚖️ VALIDACIÓN LEGAL 3: La troncal general solo pondera si tiene un 5.00 o más en el examen
    const notaModalidad = parseFloat(generalSubjects.modalidad);
    const pesoModalidad = parseFloat(modalidadWeight);
    if (!isNaN(notaModalidad) && !isNaN(pesoModalidad) && notaModalidad >= 5) {
      listaPuntos.push(notaModalidad * pesoModalidad);
    }

    // 🔧 CORRECCIÓN DEL BUG CRÍTICO DE LA FASE ESPECÍFICA
    Object.entries(specificSubjects).forEach(([_, data]) => {
      if (!data) return;
      const grade = parseFloat(data.grade);
      const weight = parseFloat(data.weight);
      // Corregido: Comprobar que weight existe y es un número válido
      if (!isNaN(grade) && !isNaN(weight) && weight > 0 && grade >= 5) {
        listaPuntos.push(grade * weight);
      }
    });

    // Ordenamos las ponderaciones de mayor a menor beneficio económico de puntos
    listaPuntos.sort((a, b) => b - a);

    // Se eligen los dos mejores impactos de la fase específica
    const puntosEspecifica = (listaPuntos[0] || 0) + (listaPuntos[1] || 0);

    const finalGrade = Math.min(accesoGrade + puntosEspecifica, 14);
    setCalculatedGrade(parseFloat(finalGrade.toFixed(2)));
  };

  return (
    <div className="min-h-screen bg-white py-8 md:py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">Calculadora de Nota PAU</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border-2 border-red-400 text-red-700 font-medium text-sm">
            ⚠️ {error}
          </div>
        )}

        <div className="space-y-8">
          {/* 1. Expediente */}
          <div className="border-2 border-gray-200 p-6 bg-gray-50">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">1. Expediente Académico</h2>
            <label className="block mb-2 text-gray-700 font-medium">Nota Media de Bachillerato (5-10):</label>
            <input
              type="number"
              min="5"
              max="10"
              step="0.01"
              onKeyPress={handleGradeKeyPress}
              value={bachilleratoGrade}
              onChange={(e) => setBachilleratoGrade(sanitizeGrade(e.target.value))}
              className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-[#007bff] bg-white text-base"
              placeholder="Ej: 8.25"
            />
          </div>

          {/* 2. Fase General */}
          <div className="border-2 border-gray-200 p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">2. Fase General Obligatoria</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1 font-medium">Lengua Castellana y Literatura II</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.01"
                  onKeyPress={handleGradeKeyPress}
                  value={generalSubjects.lengua}
                  onChange={(e) => handleGeneralChange("lengua", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-[#007bff]"
                  placeholder="0 - 10"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1 font-medium">Lengua Extranjera II (Inglés)</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.01"
                  onKeyPress={handleGradeKeyPress}
                  value={generalSubjects.ingles}
                  onChange={(e) => handleGeneralChange("ingles", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-[#007bff]"
                  placeholder="0 - 10"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1 font-medium">Historia de España / Filosofía</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.01"
                  onKeyPress={handleGradeKeyPress}
                  value={generalSubjects.historia}
                  onChange={(e) => handleGeneralChange("historia", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-[#007bff]"
                  placeholder="0 - 10"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1 font-medium">Troncal de Modalidad (Matemáticas II / Latín II)</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.01"
                    onKeyPress={handleGradeKeyPress}
                    value={generalSubjects.modalidad}
                    onChange={(e) => handleGeneralChange("modalidad", e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 focus:outline-none focus:border-[#007bff]"
                    placeholder="0 - 10"
                  />
                  <select
                    value={modalidadWeight}
                    onChange={(e) => setModalidadWeight(e.target.value)}
                    className="w-40 px-2 py-2 border border-gray-300 focus:outline-none focus:border-[#007bff] text-sm bg-white"
                  >
                    <option value="">¿Pondera?</option>
                    <option value="0.1">0.1</option>
                    <option value="0.2">0.2</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Fase Específica */}
          <div className="border-2 border-gray-200 p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">3. Fase Específica (Asignaturas Voluntarias)</h2>
            <div className="mb-6">
              <label className="block mb-2 text-gray-700 font-medium">Selecciona tu Modalidad de Bachillerato:</label>
              <select
                value={selectedField}
                onChange={(e) => {
                  setSelectedField(e.target.value as keyof typeof fields);
                  setSpecificSubjects({});
                }}
                className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-[#007bff] bg-white"
              >
                {Object.entries(fields).map(([key, field]) => (
                  <option key={key} value={key}>
                    {field.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              {fields[selectedField].subjects.map((subject) => (
                <div key={subject} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center border border-gray-200 p-4 bg-white">
                  <div className="font-medium text-gray-900">{subject}</div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Nota examen (Opcional)</label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.01"
                      onKeyPress={handleGradeKeyPress}
                      value={specificSubjects[subject]?.grade || ""}
                      onChange={(e) => handleSpecificChange(subject, "grade", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-[#007bff]"
                      placeholder="0 - 10"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Ponderación en tu grado destino</label>
                    <select
                      value={specificSubjects[subject]?.weight || ""}
                      onChange={(e) => handleSpecificChange(subject, "weight", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-[#007bff] bg-white text-sm"
                    >
                      <option value="">No ponderar (0.0)</option>
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
            className="w-full bg-[#007bff] text-white py-3 md:py-4 text-base md:text-lg font-bold hover:bg-[#0056b3] transition-colors shadow-sm"
          >
            Calcular Nota de Admisión
          </button>

          {/* Resultado */}
          {calculatedGrade !== null && (
            <div className="border-2 border-[#007bff] bg-blue-50 p-8 text-center animate-fadeIn">
              <h2 className="text-2xl font-bold mb-2 text-gray-900">Tu Nota de Admisión Final</h2>
              <div className="text-4xl md:text-6xl font-black text-[#007bff] mb-4">
                {calculatedGrade} <span className="text-xl md:text-2xl font-normal text-gray-500">/ 14</span>
              </div>
              <p className="text-sm text-gray-700 font-medium max-w-2xl mx-auto leading-relaxed">
                {calculatedGrade >= 12
                  ? "¡Excelente puntuación! Tienes un perfil altamente competitivo para prácticamente cualquier grado de alta demanda (Medicina, Ingenierías Dobles, etc.)."
                  : calculatedGrade >= 9
                    ? "Muy buena nota. Tienes el acceso prácticamente asegurado a la gran mayoría de carreras del sistema universitario público."
                    : calculatedGrade >= 7
                      ? "Nota media-estándar. Podrás entrar en múltiples de las titulaciones ofertadas de corte intermedio."
                      : "Nota de acceso ajustada a la base. Te recomendamos revisar campus alternativos o ponderaciones estratégicas de 0.2."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}