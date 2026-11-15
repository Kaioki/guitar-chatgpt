import fs from "node:fs";
const p = "app/page.tsx";
let source = fs.readFileSync(p,"utf8").replace("55 nouveaux titres et 2 morceaux déjà abordés","56 nouveaux titres et 2 morceaux déjà abordés");
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

console.log("Dashboard journeys and repertoire count updated.");

// Trigger final dashboard rebuild.
