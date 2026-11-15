import fs from "node:fs";
const p = "app/page.tsx";
let source = fs.readFileSync(p,"utf8");
const replacement = `const standardJourneys = [
 { standard: "Guitare classique", start: 14, end: 26, label: "Premiers pas classiques", badge: "Classique", heroLabel: "Tronc commun", summary: "Posture, attaque aux doigts, alternance, lecture en première position et première phrase de Gymnopédie n° 1." },
 { standard: "Premiers morceaux acoustiques", start: 27, end: 52, label: "Construire les fondations", badge: "Acoustique", heroLabel: "Tronc commun", summary: "Accords ouverts, changements fluides, arpèges et arrangements acoustiques complets." },
 { standard: "Let You Down", start: 157, end: 169, label: "Fingerstyle EmileGuitar", badge: "Fingerstyle", heroLabel: "Mélodie et accompagnement", summary: "Basse, mélodie puis voix intérieure dans la version complète d’EmileGuitar." },
 { standard: "Spécialisation classique", start: 313, end: 416, label: "Après le tronc commun", badge: "Spécialisation", heroLabel: "Spécialisation classique", summary: "Clair de lune, Gwyn, Asturias et La Campanella : gestes préparés, transcription précise et validation au rythme d’Albert." },
 { standard: "Module électrique final", start: 417, end: 429, label: "Option rock et électrique", badge: "Électrique", heroLabel: "Module final facultatif", summary: "Versions originales rock, riffs, power chords, étouffements, articulations et jeu lead." },
] as const;`;
source = source.replace(/const standardJourneys = \[[\s\S]*?\] as const;/, replacement);
if (!source.includes('standard: "Module électrique final"')) throw new Error("Dashboard journey insertion failed");
fs.writeFileSync(p,source);
const r = "README.md";
let readme = fs.readFileSync(r,"utf8").replace("55 nouveaux titres souhaités et 2 déjà abordés","56 nouveaux titres souhaités et 2 déjà abordés");
fs.writeFileSync(r,readme);

const dataPath = "app/plan-data.ts";
let dataSource = fs.readFileSync(dataPath,"utf8");
const weeksMarker = "export const weeks =";
const weeksStart = dataSource.indexOf(weeksMarker);
const weeksOpen = dataSource.indexOf("[",weeksStart);
const weeksClose = dataSource.indexOf("\n];",weeksOpen) + 1;
if (weeksClose <= 0) throw new Error("Cannot locate end of weeks array");
const planWeeks = JSON.parse(dataSource.slice(weeksOpen,weeksClose+1));
const gwynSteps = [
"Choisir une transcription légitime pour guitare acoustique six cordes. Vérifier accordage, tonalité, tessiture, difficulté des positions et si l’arrangement est réellement solo. Écarter toute version qui exige deux guitares simultanées.",
"Écouter le thème de Gwyn et le chanter. Relever la mélodie principale sur la transcription ; jouer uniquement les notes mélodiques, sans basse ni accords.",
"Travailler les basses seules au pouce. Marquer les changements harmoniques et vérifier que les notes graves restent compatibles avec la guitare acoustique choisie.",
"Jouer les accords et notes intérieures séparément. Identifier les positions qui demandent un démanché et noter un doigté stable avant de les assembler.",
"Assembler mélodie et basse sur deux mesures. Réduire les notes d’accompagnement si nécessaire pour conserver une ligne mélodique claire et une exécution confortable.",
"Apprendre la phrase suivante en cellules de deux mesures. Travailler les liaisons, les notes tenues et les silences avant d’augmenter la durée.",
"Relier les deux premières phrases. Faire six répétitions du raccord, puis jouer le passage entier à tempo lent sans ajouter de nuance nouvelle.",
"Travailler la section contrastante ou la variation retenue dans l’arrangement. Séparer les voix, puis réintroduire une note intérieure à la fois.",
"Stabiliser les changements de position. Préparer chaque déplacement avant le temps concerné et relâcher la main gauche entre les attaques.",
"Construire les nuances du thème. Garder la basse douce, faire ressortir la mélodie et éviter de forcer l’attaque pour obtenir du volume.",
"Assembler le périmètre complet de l’arrangement choisi. Repérer les deux transitions les moins stables et les travailler isolément, sans accélérer.",
"Approcher le tempo de travail par paliers de 2 bpm après trois répétitions propres. Enregistrer une prise et noter le passage qui nécessite encore une reprise.",
"Enregistrer une interprétation continue du périmètre défini. Vérifier justesse, équilibre des voix, continuité et confort ; conserver la transcription et la version exactes dans le journal."
];
for (let i=0;i<13;i++) {
  planWeeks[338+i].repertoire = "Gwyn, Lord of Cinder — " + gwynSteps[i];
}
dataSource = dataSource.slice(0,weeksOpen) + JSON.stringify(planWeeks,null,2) + dataSource.slice(weeksClose+2);
fs.writeFileSync(dataPath,dataSource);

console.log("Dashboard journeys and repertoire count updated.");

// Trigger final dashboard rebuild.
