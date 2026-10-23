const makeQuestion = (id, question, options, correctIndex, legacyLevel = id <= 7 ? 1 : id <= 14 ? 2 : 3, tier = legacyLevel + 1) => ({
  id,
  level: tier,
  legacyLevel,
  question,
  answers: options.map((text, index) => ({ text, correct: index === correctIndex })),
});

const questions = {
  Matemáticas: [
    makeQuestion(1, "Resuelve: 3x − 7 = 2x + 11", ["16", "17", "18", "19"], 2),
    makeQuestion(2, "Simplifica (2⁸ × 2⁴) ÷ 2¹⁰", ["2", "4", "8", "16"], 1),
    makeQuestion(3, "Un triángulo rectángulo tiene catetos de 9 cm y 12 cm. ¿Cuánto mide la hipotenusa?", ["13 cm", "15 cm", "18 cm", "21 cm"], 1),
    makeQuestion(4, "El 40 % de un número es 72. ¿Cuál es el número?", ["180", "188", "200", "288"], 0),
    makeQuestion(5, "¿Cuál es la mediana de 4, 9, 10, 12 y 25?", ["9", "10", "12", "25"], 1),
    makeQuestion(6, "¿Cuánto es 3/4 − 2/5?", ["1/20", "7/20", "1/2", "1/5"], 1),
    makeQuestion(7, "Si (x − 2)(x + 3) = 0, ¿cuál es la raíz mayor?", ["−3", "−2", "2", "3"], 2),
    makeQuestion(8, "Un triángulo tiene ángulos de 2x, 3x y 4x. ¿Cuánto mide su ángulo mayor?", ["40°", "60°", "80°", "100°"], 2),
    makeQuestion(9, "¿Cuánto es 5/6 − 3/8?", ["11/24", "7/24", "1/2", "2/3"], 0),
    makeQuestion(10, "Un rectángulo tiene perímetro de 46 cm y su largo mide 3 cm más que su ancho. ¿Cuál es su área?", ["120 cm²", "130 cm²", "140 cm²", "160 cm²"], 1),
    makeQuestion(11, "¿Cuánto es (3² × 3³) ÷ 3²?", ["27", "81", "243", "729"], 0),
    makeQuestion(12, "Un precio aumenta 20 % y luego baja 20 %. Comparado con el precio inicial, el precio final es…", ["Igual", "4 % menor", "4 % mayor", "8 % menor"], 1),
    makeQuestion(13, "Dos alarmas suenan cada 18 y 24 minutos. Si suenan juntas ahora, ¿en cuántos minutos volverán a coincidir?", ["42", "48", "72", "96"], 2),
    makeQuestion(14, "¿Cuánto es 3/5 + 7/12?", ["71/60", "10/17", "1/60", "31/60"], 0),
    makeQuestion(15, "¿Cuál es la pendiente de la recta y = 3x + 2?", ["2", "3", "5", "-3"], 1),
    makeQuestion(21, "Resuelve el sistema: 2x + y = 11 y x − y = 1. ¿Cuánto vale x?", ["3", "4", "5", "6"], 1, 1),
    makeQuestion(22, "¿Cuál es el área de un círculo de radio 3 cm?", ["3π cm²", "6π cm²", "9π cm²", "12π cm²"], 2, 1),
    makeQuestion(23, "Una receta para 6 personas usa 450 g de arroz. ¿Cuánto se necesita para 10 personas?", ["650 g", "700 g", "750 g", "900 g"], 2, 1),
    makeQuestion(24, "¿Cuál es la factorización de x² − 5x + 6?", ["(x−1)(x−6)", "(x−2)(x−3)", "(x+2)(x+3)", "(x−2)(x+3)"], 1, 1),
    makeQuestion(25, "En una bolsa hay 5 fichas rojas y 3 azules. ¿Cuál es la probabilidad de sacar una azul?", ["3/8", "5/8", "1/3", "3/5"], 0, 1),
    makeQuestion(26, "Un vehículo recorre 210 km en 3 horas a velocidad constante. ¿Cuántos kilómetros recorre en 5 horas?", ["300 km", "330 km", "350 km", "420 km"], 2, 1),
    makeQuestion(27, "¿Qué valor de x satisface 5(2x − 3) = 3x + 20?", ["4", "5", "6", "7"], 1, 2),
    makeQuestion(28, "¿Cuál es el volumen de un cilindro de radio 2 cm y altura 5 cm?", ["10π cm³", "20π cm³", "25π cm³", "40π cm³"], 1, 2),
    makeQuestion(29, "Una chaqueta de $180.000 tiene primero 20 % de descuento y luego 10 % adicional. ¿Cuál es el precio final?", ["$126.000", "$129.600", "$132.000", "$144.000"], 1, 2),
    makeQuestion(30, "¿Cuál es la suma de los ángulos interiores de un polígono de 8 lados?", ["900°", "1.080°", "1.260°", "1.440°"], 1, 2),
    makeQuestion(31, "Si 2ˣ = 32, ¿cuánto vale x?", ["4", "5", "6", "16"], 1, 2),
    makeQuestion(32, "En un grupo, la razón entre hombres y mujeres es 3:5 y hay 40 personas. ¿Cuántas mujeres hay?", ["15", "20", "25", "30"], 2, 2),
    makeQuestion(33, "¿Cuáles son las soluciones de x² − 7x + 10 = 0?", ["2 y 5", "−2 y −5", "1 y 10", "−1 y −10"], 0, 3),
    makeQuestion(34, "Una inversión de $500.000 crece 10 % anual compuesto durante 2 años. ¿Cuál es su valor final?", ["$600.000", "$605.000", "$610.000", "$620.000"], 1, 3),
    makeQuestion(35, "¿Cuál es la distancia entre los puntos (1, 2) y (7, 10) en el plano cartesiano?", ["8", "9", "10", "12"], 2, 3),
    makeQuestion(36, "Se lanzan dos dados equilibrados. ¿Cuál es la probabilidad de que la suma sea 8?", ["5/36", "1/6", "7/36", "1/4"], 0, 3),
    makeQuestion(37, "Una población de bacterias se duplica cada 3 horas. Si empieza con 200, ¿cuántas habrá después de 12 horas?", ["1.600", "2.400", "3.200", "4.000"], 2, 3),
    makeQuestion(38, "¿Cuál es la ecuación de la recta que pasa por (2, 5) y tiene pendiente 3?", ["y = 3x − 1", "y = 3x + 1", "y = 2x + 1", "y = 5x − 3"], 0, 3),
    makeQuestion(16, "Resuelve: 3(2x - 4) = 18", ["x = 4", "x = 5", "x = 6", "x = 7"], 1),
    makeQuestion(17, "Un artículo de $240.000 sube 15 %. ¿Cuál es su nuevo precio?", ["$264.000", "$276.000", "$280.000", "$285.000"], 1),
    makeQuestion(18, "¿Cuál es la solución positiva de x² - 9 = 0?", ["-3", "0", "3", "9"], 2),
    makeQuestion(19, "Una bolsa tiene 3 fichas rojas y 2 azules. ¿Cuál es la probabilidad de sacar una roja?", ["2/5", "3/5", "1/2", "3/2"], 1),
    makeQuestion(20, "Si f(x) = 2x² - 3, ¿cuánto vale f(4)?", ["21", "25", "29", "35"], 2),
  ],
  "Cultura general de Colombia": [
    makeQuestion(1, "¿Qué busca proteger principalmente la Ley 70 de 1993?", ["Los resguardos indígenas de la Amazonía", "La identidad y los derechos territoriales de comunidades negras", "El patrimonio arqueológico de San Agustín", "La propiedad de las islas del Caribe"], 1),
    makeQuestion(2, "¿En qué región natural colombiana se encuentra la península de La Guajira?", ["Andina", "Caribe", "Pacífica", "Orinoquía"], 1),
    makeQuestion(3, "¿En qué departamento está el Parque Arqueológico Nacional de Tierradentro?", ["Nariño", "Cauca", "Huila", "Chocó"], 1),
    makeQuestion(4, "¿Entre cuáles cordilleras colombianas se extiende principalmente el valle del río Magdalena?", ["Occidental y Central", "Central y Oriental", "Oriental y Occidental", "Baudó y Occidental"], 1),
    makeQuestion(5, "¿Qué mezcla de tradiciones caracteriza el Carnaval de Barranquilla, reconocido por la UNESCO?", ["Andinas y amazónicas", "Indígenas, africanas y europeas", "Árabes y asiáticas", "Llaneras y antárticas"], 1),
    makeQuestion(6, "¿Qué tres departamentos conforman el núcleo tradicional del Eje Cafetero?", ["Caldas, Quindío y Risaralda", "Antioquia, Chocó y Córdoba", "Tolima, Huila y Cauca", "Santander, Boyacá y Cundinamarca"], 0),
    makeQuestion(7, "¿Qué ecosistema de alta montaña colombiano se destaca por sus frailejones y su función hídrica?", ["Manglar", "Páramo", "Sabana inundable", "Bosque seco tropical"], 1),
    makeQuestion(8, "¿Qué función cumple principalmente el Banco de la República en Colombia?", ["Administrar los impuestos nacionales", "Emitir moneda y conducir la política monetaria", "Aprobar el presupuesto del Congreso", "Vigilar las elecciones"], 1),
    makeQuestion(9, "¿Qué movimiento literario se asocia especialmente con Gabriel García Márquez?", ["Naturalismo", "Realismo mágico", "Romanticismo", "Costumbrismo"], 1),
    makeQuestion(10, "¿Cómo se llamó Bogotá durante el periodo del Virreinato de la Nueva Granada?", ["Santa Fe", "Villa de Leyva", "San Bonifacio", "Nueva Cartagena"], 0),
    makeQuestion(11, "¿Qué departamento colombiano está formado principalmente por las islas de San Andrés, Providencia y Santa Catalina?", ["Bolívar", "Magdalena", "Archipiélago de San Andrés, Providencia y Santa Catalina", "La Guajira"], 2),
    makeQuestion(12, "¿Qué ciudad fue uno de los principales puertos fortificados de la América española en el Caribe?", ["Cartagena de Indias", "Villavicencio", "Pasto", "Honda"], 0),
    makeQuestion(13, "¿Qué dos cuerpos de agua conecta el Canal del Dique?", ["Río Cauca y río Atrato", "Río Magdalena y bahía de Cartagena", "Río Sinú y golfo de Morrosquillo", "Río Meta y río Orinoco"], 1),
    makeQuestion(14, "¿Qué nombre recibe el sistema montañoso aislado situado al norte de los Andes, entre Cesar, La Guajira y Magdalena?", ["Serranía del Baudó", "Sierra Nevada de Santa Marta", "Serranía de San Lucas", "Macarena"], 1),
    makeQuestion(15, "¿Cuál es el ave nacional de Colombia?", ["Cóndor de los Andes", "Guacamaya azul", "Águila real", "Tucán"], 0),
    makeQuestion(21, "¿Cuál fue el principal producto de exportación colombiano durante buena parte del siglo XX?", ["Café", "Cobre", "Trigo", "Algodón"], 0, 1),
    makeQuestion(22, "¿Qué ciudad fue capital del Virreinato de la Nueva Granada?", ["Cartagena", "Santa Fe de Bogotá", "Popayán", "Tunja"], 1, 1),
    makeQuestion(23, "¿En qué departamento se encuentra el desierto de la Tatacoa?", ["Cesar", "La Guajira", "Huila", "Boyacá"], 2, 1),
    makeQuestion(24, "¿Qué pueblo indígena construyó terrazas y caminos en la Sierra Nevada de Santa Marta antes de la llegada española?", ["Muisca", "Tairona", "Quimbaya", "Pasto"], 1, 1),
    makeQuestion(25, "¿Qué río recorre gran parte del Chocó y desemboca en el golfo de Urabá?", ["Río Atrato", "Río Meta", "Río Cesar", "Río Sumapaz"], 0, 1),
    makeQuestion(26, "¿Qué ciudad colombiana es conocida como la 'Ciudad Blanca' por su arquitectura colonial?", ["Popayán", "Manizales", "Pasto", "Santa Marta"], 0, 1),
    makeQuestion(27, "¿Qué organismo decide si una ley contradice la Constitución Política de Colombia?", ["Corte Constitucional", "Consejo Nacional Electoral", "Contraloría General", "Consejo de Estado"], 0, 2),
    makeQuestion(28, "¿Qué mecanismo permite a los ciudadanos votar para terminar anticipadamente el mandato de un alcalde o gobernador?", ["Plebiscito", "Revocatoria del mandato", "Cabildo abierto", "Consulta popular"], 1, 2),
    makeQuestion(29, "¿Qué pueblo indígena se asocia históricamente con el altiplano Cundiboyacense?", ["Muisca", "Tairona", "Wayuu", "Embera"], 0, 2),
    makeQuestion(30, "¿Qué lengua criolla se habla tradicionalmente en el archipiélago de San Andrés, Providencia y Santa Catalina?", ["Palenquero", "Criollo sanandresano", "Nasa yuwe", "Wayuunaiki"], 1, 2),
    makeQuestion(31, "¿Qué expedición científica del siglo XVIII estudió y clasificó la flora del Nuevo Reino de Granada?", ["Expedición Botánica dirigida por José Celestino Mutis", "Comisión Corográfica dirigida por Agustín Codazzi", "Misión Kemmerer", "Expedición de Humboldt al Orinoco"], 0, 2),
    makeQuestion(32, "¿Qué cordillera colombiana es la más extensa de las tres ramas de los Andes en el país?", ["Cordillera Occidental", "Cordillera Central", "Cordillera Oriental", "Sierra Nevada de Santa Marta"], 2, 2),
    makeQuestion(33, "¿Qué mecanismo de protección de derechos fundamentales introdujo la Constitución de 1991?", ["Acción de tutela", "Acción cambiaria", "Recurso de casación", "Consulta popular obligatoria"], 0, 3),
    makeQuestion(34, "¿Qué artículo transitorio de la Constitución de 1991 dio origen a la Ley 70 de 1993?", ["Artículo transitorio 1", "Artículo transitorio 16", "Artículo transitorio 55", "Artículo transitorio 80"], 2, 3),
    makeQuestion(35, "¿Cuál es el complejo de páramo más extenso de Colombia?", ["Chingaza", "Cruz Verde–Sumapaz", "Los Nevados", "Santurbán"], 1, 3),
    makeQuestion(36, "¿Qué batalla del 7 de agosto de 1819 fue decisiva para la independencia de la Nueva Granada?", ["Batalla de Palonegro", "Batalla de Boyacá", "Batalla de los Llanos", "Batalla de Cartagena"], 1, 3),
    makeQuestion(37, "¿Qué río recorre gran parte del Chocó y desemboca en el golfo de Urabá, en el Caribe?", ["Atrato", "Magdalena", "Cauca", "Sinú"], 0, 3),
    makeQuestion(38, "¿Qué reconocimiento cultural de la UNESCO recibió el Carnaval de Barranquilla en 2008?", ["Patrimonio Mundial Natural", "Patrimonio Cultural Inmaterial de la Humanidad", "Reserva de la Biosfera", "Memoria del Mundo"], 1, 3),
    makeQuestion(16, "¿Qué obtuvo Estados Unidos mediante el Tratado Hay-Bunau-Varilla de 1903?", ["Derechos para construir y administrar una zona del canal en Panamá", "La soberanía sobre todo el territorio panameño", "La cesión de las islas de San Andrés", "El control del río Magdalena"], 0),
    makeQuestion(17, "Según el artículo 1 de la Constitución de 1991, Colombia es una república…", ["Federal y confesional", "Unitaria, descentralizada y pluralista", "Monárquica y centralizada", "Parlamentaria y federal"], 1),
    makeQuestion(18, "¿Qué área protegida colombiana se extiende desde la costa Caribe hacia la Sierra Nevada de Santa Marta?", ["Parque Nacional Natural Tayrona", "Parque Nacional Natural Los Nevados", "Parque Nacional Natural El Tuparro", "Parque Nacional Natural Amacayacu"], 0),
    makeQuestion(19, "¿Qué pueblo prehispánico se asocia con la construcción de Teyuna, hoy llamada Ciudad Perdida?", ["Muisca", "Tairona", "Quimbaya", "Zenú"], 1),
    makeQuestion(20, "¿Qué entidad dirige y organiza las elecciones nacionales en Colombia?", ["Registraduría Nacional del Estado Civil", "Banco de la República", "Procuraduría General", "Consejo Superior de la Judicatura"], 0),
  ],
};

const createNumericOptions = (answer, seed) => {
  const offsets = [1, -1, 2, -2, 3, -3, 5, -5];
  const distractors = [];
  for (let offsetIndex = seed % offsets.length; distractors.length < 3; offsetIndex += 1) {
    const candidate = answer + offsets[offsetIndex % offsets.length];
    if (candidate !== answer && !distractors.includes(candidate)) distractors.push(candidate);
  }
  const choices = [answer, ...distractors];
  const shift = seed % choices.length;
  const rotated = [...choices.slice(shift), ...choices.slice(0, shift)];
  return { options: rotated.map(String), correctIndex: rotated.indexOf(answer) };
};

const introductoryMathQuestions = Array.from({ length: 30 }, (_, index) => {
  const id = 1001 + index;
  const a = (index % 9) + 2;
  const b = ((index * 3) % 8) + 2;
  const c = ((index * 5) % 5) + 2;
  const form = index % 6;
  let prompt;
  let answer;
  if (form === 0) {
    prompt = `¿Cuánto es ${a} + ${b}?`;
    answer = a + b;
  } else if (form === 1) {
    prompt = `¿Cuánto es ${a + b} − ${b}?`;
    answer = a;
  } else if (form === 2) {
    prompt = `¿Cuánto es ${a} × ${b}?`;
    answer = a * b;
  } else if (form === 3) {
    prompt = `¿Cuánto es ${a * b} ÷ ${b}?`;
    answer = a;
  } else if (form === 4) {
    prompt = `Resuelve respetando la jerarquía: ${a} + ${b} × ${c}.`;
    answer = a + b * c;
  } else {
    prompt = `Resuelve respetando los paréntesis: (${a} + ${b}) × ${c}.`;
    answer = (a + b) * c;
  }
  const { options, correctIndex } = createNumericOptions(answer, index);
  return makeQuestion(id, prompt, options, correctIndex, 0, 1);
});

const negativeAndExponentMathQuestions = Array.from({ length: 30 }, (_, index) => {
  const id = 1101 + index;
  const a = (index % 5) + 2;
  const b = ((index * 2) % 5) + 2;
  const c = ((index * 3) % 4) + 2;
  const form = index % 10;
  let prompt;
  let answer;
  if (form === 0) {
    prompt = `Calcula: −${a} + ${b}.`;
    answer = -a + b;
  } else if (form === 1) {
    prompt = `Calcula: ${a} − (−${b}).`;
    answer = a + b;
  } else if (form === 2) {
    prompt = `Calcula: (−${a}) × ${b}.`;
    answer = -a * b;
  } else if (form === 3) {
    prompt = `Calcula: (−${a}) × (−${b}).`;
    answer = a * b;
  } else if (form === 4) {
    prompt = `Resuelve respetando la jerarquía: −${a} + ${b} × ${c}.`;
    answer = -a + b * c;
  } else if (form === 5) {
    prompt = `Calcula: (−${a} + ${b}) × ${c}.`;
    answer = (-a + b) * c;
  } else if (form === 6) {
    prompt = `¿Cuánto es (−${a})²?`;
    answer = a ** 2;
  } else if (form === 7) {
    prompt = `¿Cuánto es (−${a})³?`;
    answer = -(a ** 3);
  } else if (form === 8) {
    prompt = `Calcula: −${a}² + ${b}.`;
    answer = -(a ** 2) + b;
  } else {
    prompt = `Calcula: (${a} − ${b})².`;
    answer = (a - b) ** 2;
  }
  const { options, correctIndex } = createNumericOptions(answer, index + 2);
  return makeQuestion(id, prompt, options, correctIndex, 1, 2);
});

const departmentCapitals = [
  ["Antioquia", "Medellín"], ["Atlántico", "Barranquilla"], ["Bolívar", "Cartagena"],
  ["Boyacá", "Tunja"], ["Caldas", "Manizales"], ["Caquetá", "Florencia"],
  ["Casanare", "Yopal"], ["Cauca", "Popayán"], ["Cesar", "Valledupar"],
  ["Chocó", "Quibdó"], ["Córdoba", "Montería"], ["Cundinamarca", "Bogotá"],
  ["Guainía", "Inírida"], ["Guaviare", "San José del Guaviare"], ["Huila", "Neiva"],
  ["La Guajira", "Riohacha"], ["Magdalena", "Santa Marta"], ["Meta", "Villavicencio"],
  ["Nariño", "Pasto"], ["Norte de Santander", "Cúcuta"], ["Putumayo", "Mocoa"],
  ["Quindío", "Armenia"], ["Risaralda", "Pereira"], ["San Andrés, Providencia y Santa Catalina", "San Andrés"],
  ["Santander", "Bucaramanga"], ["Sucre", "Sincelejo"], ["Tolima", "Ibagué"],
  ["Valle del Cauca", "Cali"], ["Arauca", "Arauca"], ["Amazonas", "Leticia"],
];

const introductoryColombiaQuestions = departmentCapitals.map(([department, capital], index) => {
  const id = 2001 + index;
  const wrongCapitals = [];
  for (let offset = 1; wrongCapitals.length < 3; offset += 1) {
    const candidate = departmentCapitals[(index + offset) % departmentCapitals.length][1];
    if (candidate !== capital && !wrongCapitals.includes(candidate)) wrongCapitals.push(candidate);
  }
  const choices = [capital, ...wrongCapitals];
  const shift = index % choices.length;
  const options = [...choices.slice(shift), ...choices.slice(0, shift)];
  return makeQuestion(id, `¿Cuál es la capital del departamento de ${department}?`, options, options.indexOf(capital), 0, 1);
});

questions.Matemáticas = [
  ...introductoryMathQuestions,
  ...negativeAndExponentMathQuestions,
  ...questions.Matemáticas.map((question) => ({ ...question, level: question.level + 1 })),
];
const ColombiaTierByQuestionId = {
  1: 4, 2: 2, 3: 2, 4: 3, 5: 3, 6: 2, 7: 2, 8: 4, 9: 3, 10: 2,
  11: 2, 12: 3, 13: 4, 14: 3, 15: 2, 16: 5, 17: 5, 18: 3, 19: 3, 20: 5,
  21: 2, 22: 2, 23: 2, 24: 3, 25: 2, 26: 2, 27: 4, 28: 4, 29: 3,
  30: 3, 31: 4, 32: 3, 33: 5, 34: 5, 35: 5, 36: 5, 37: 3, 38: 5,
};
questions["Cultura general de Colombia"] = [
  ...introductoryColombiaQuestions,
  ...questions["Cultura general de Colombia"].map((question) => ({
    ...question,
    level: ColombiaTierByQuestionId[question.id] || question.level,
  })),
];

export default questions;

function shuffle(items) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

export function getRandomQuestionSequence(categoryQuestions, previousSets = []) {
  // Take four questions from each progressive tier, retaining the legacy
  // questions while the curriculum banks are expanded.
  const tiers = [1, 2, 3, 4, 5].map((tier) =>
    categoryQuestions.filter((question) => question.level === tier).sort((a, b) => a.id - b.id)
  );
  const splitInHalf = (items) => {
    const midpoint = Math.ceil(items.length / 2);
    return [items.slice(0, midpoint), items.slice(midpoint)];
  };
  const progressiveTiers = tiers[4].length >= 4
    ? tiers
    : [tiers[0], tiers[1], tiers[2], ...splitInHalf(tiers[3])];
  const levels = progressiveTiers
    .map((level, index) => level.map((question) => ({ ...question, level: index + 1 })));
  const questionCounts = [4, 4, 4, 4, 4];
  const history = previousSets.length && typeof previousSets[0] === "number"
    ? [previousSets]
    : previousSets;
  const previousSignatures = new Set(history.map((ids) => [...ids].sort((a, b) => a - b).join(",")));

  let selectedByLevel;
  let signature;
  do {
    selectedByLevel = levels.map((levelQuestions, index) => shuffle(levelQuestions).slice(0, questionCounts[index]));
    signature = selectedByLevel.flat().map(({ id }) => id).sort((a, b) => a - b).join(",");
  } while (previousSignatures.has(signature));

  return selectedByLevel.flatMap(shuffle);
}
