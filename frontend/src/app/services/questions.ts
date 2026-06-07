export interface Option {
    id: string;
    text: string;
}

export interface Question {
    id: number;
    question: string;
    options: Option[];
}

export const questions: Question[] = [
    {
        id: 1,
        question: "Estás liderando un trabajo en equipo para clase y surge un problema imprevisto. ¿Cuál es tu reacción natural?",
        options: [
            { id: "A", text: "Analizo los datos del error, divido el problema en partes y diseño una estrategia optimizada para solucionarlo." },
            { id: "B", text: "Busco una alternativa original en la que nadie haya pensado, rompiendo un poco las reglas establecidas si es necesario." },
            { id: "C", text: "Me aseguro de escuchar cómo se siente cada miembro del equipo y busco mediar para que todos colaboren en armonía." },
            { id: "D", text: "Me da curiosidad el origen del problema; investigo a fondo el porqué ha fallado el sistema para entender su lógica interna." },
        ],
    },
    {
        id: 2,
        question: "Si pudieras pasar un año entero trabajando en un gran proyecto financiado, ¿en qué preferirías invertir tu tiempo?",
        options: [
            { id: "A", text: "En el desarrollo y construcción de una herramienta tecnológica, software o infraestructura eficiente." },
            { id: "B", text: "En la creación de una obra cultural, pieza de diseño, guion literario o exposición artística de impacto visual." },
            { id: "C", text: "En un programa de intervención comunitaria para mejorar directamente la salud, bienestar o educación de un colectivo." },
            { id: "D", text: "En un estudio experimental dentro de un laboratorio para aislar variables y descubrir un nuevo avance científico." },
        ],
    },
    {
        id: 3,
        question: "Imagina que entras a una librería o a una plataforma de documentales. ¿Qué temática capta tu atención de forma magnética?",
        options: [
            { id: "A", text: "Automatización, grandes infraestructuras, inteligencia artificial o el funcionamiento del ecosistema financiero." },
            { id: "B", text: "Historia del arte, evolución del lenguaje, filosofía, cine independiente o análisis del comportamiento creativo." },
            { id: "C", text: "Biografías de grandes líderes sociales, psicología humana, gestión de crisis humanitarias o divulgación médica." },
            { id: "D", text: "Física cuántica, misterios del universo, genética, neurociencia o la evolución de las especies y ecosistemas." },
        ],
    },
    {
        id: 4,
        question: "¿Qué tipo de superpoder mental encaja mejor con tu forma de procesar el mundo del día a día?",
        options: [
            { id: "A", text: "Estructura mental: Capacidad para ordenar el caos, optimizar recursos escasos y hacer que las cosas funcionen rápido." },
            { id: "B", text: "Pensamiento divergente: Habilidad para conectar ideas que parecen no tener relación y darles una estética única." },
            { id: "C", text: "Empatía situacional: Detectar al instante las necesidades de las personas y saber cómo comunicar el mensaje idóneo." },
            { id: "D", text: "Hiperenfoque analítico: Capacidad para concentrarte en un único enigma complejo durante horas hasta descifrarlo." },
        ],
    },
    {
        id: 5,
        question: "Cuando un amigo te pide consejo ante una situación complicada de su vida, tú tiendes de forma intuitiva a:",
        options: [
            { id: "A", text: "Ofrecerle un plan de acción estructurado con pasos específicos (1, 2 y 3) para solucionar el problema con la cabeza fría." },
            { id: "B", text: "Ayudarle a cambiar de perspectiva para que vea el dilema desde un enfoque completamente diferente y creativo." },
            { id: "C", text: "Acompañarle emocionalmente, escucharle activamente y validar lo que siente antes de proponer nada." },
            { id: "D", text: "Hacerle preguntas analíticas para desmenuzar las causas raíz de la situación y entender el origen del conflicto." },
        ],
    },
    {
        id: 6,
        question: "Te regalan un mueble modular muy complejo o un dispositivo tecnológico avanzado totalmente desmontado. ¿Cómo actúas?",
        options: [
            { id: "A", text: "Sigo las instrucciones técnicas paso a paso minuciosamente, asegurándome de que la estructura sea sólida y funcional." },
            { id: "B", text: "Intento montarlo intuitivamente a mi manera y, si me sobra alguna pieza, busco la forma creativa de integrarla o tunearla." },
            { id: "C", text: "Pido ayuda a alguien para montarlo juntos, convirtiendo la tarea en un rato agradable y colaborativo." },
            { id: "D", text: "Estudio los planos primero para comprender la física y el principio de ingeniería detrás del diseño antes de tocar nada." },
        ],
    },
    {
        id: 7,
        question: "Si tuvieras que enfrentarte a un entorno de trabajo ideal para mantenerte motivado a largo plazo, valorarías más:",
        options: [
            { id: "A", text: "Objetivos claros, incentivos basados en la eficiencia y herramientas punteras para automatizar tareas." },
            { id: "B", text: "Libertad absoluta para proponer ideas disruptivas, flexibilidad de horarios y un entorno estéticamente inspirador." },
            { id: "C", text: "Un clima de compañerismo enfocado en generar un impacto ético o social, donde el trato humano sea la prioridad." },
            { id: "D", text: "Acceso a bases de datos académicas, debates conceptuales profundos y retos que pongan a prueba mi intelecto." },
        ],
    },
    {
        id: 8,
        question: "Cuando jugarías a un videojuego de estrategia, rol o un juego de mesa complejo, ¿cuál suele ser tu rol preferido?",
        options: [
            { id: "A", text: "El estratega/constructor: El que gestiona los recursos de la base, optimiza las defensas y calcula las probabilidades de éxito." },
            { id: "B", text: "El explorador/personalizador: El que busca rutas secretas, experimenta con combinaciones raras y cuida la estética del personaje." },
            { id: "C", text: "El curador/soporte: El que protege al equipo, coordina la comunicación del grupo y asegura que nadie se quede atrás." },
            { id: "D", text: "El analista de mecánicas: El que descifra los patrones ocultos de los enemigos y calcula las estadísticas exactas de las reglas." },
        ],
    },
    {
        id: 9,
        question: "¿Qué te genera una mayor sensación de frustración o incomodidad en tu día a día?",
        options: [
            { id: "A", text: "La ineficiencia: Ver procesos burocráticos lentos o herramientas mal diseñadas que hacen perder el tiempo." },
            { id: "B", text: "La monotonía: Tener que hacer exactamente la misma tarea repetitiva todos los días sin margen para la originalidad." },
            { id: "C", text: "La indiferencia: Estar en un lugar frío donde la gente compite de forma egoísta y no se ayuda mutuamente." },
            { id: "D", text: "La falta de lógica: Que me den órdenes o explicaciones sin argumentos sólidos ni datos reales que las respalden." },
        ],
    },
    {
        id: 10,
        question: "Imagina que el periódico local te encarga escribir una columna de opinión. ¿Sobre qué te saldría hablar con más pasión?",
        options: [
            { id: "A", text: "Sobre cómo las nuevas tecnologías o modelos económicos van a transformar la infraestructura de las ciudades modernas." },
            { id: "B", text: "Sobre la pérdida de identidad cultural, el diseño urbano, el cine actual o las nuevas tendencias artísticas." },
            { id: "C", text: "Sobre las deficiencias en el sistema de bienestar, los derechos humanos, la salud mental o la educación juvenil." },
            { id: "D", text: "Sobre los últimos hitos en la carrera espacial, dilemas de la bioética o el impacto del cambio climático desde los datos." },
        ],
    },
];