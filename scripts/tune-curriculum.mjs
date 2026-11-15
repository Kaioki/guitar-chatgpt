import fs from "node:fs";
const p = "app/plan-data.ts";
let source = fs.readFileSync(p, "utf8");
function getArray(name) {
  const marker = \`export const \${name} =\`;
  const start = source.indexOf(marker);
  const open = source.indexOf("[", start);
  const close = source.indexOf("] as const;", open);
  if (start < 0 || open < 0 || close < 0) throw new Error("Cannot locate " + name);
  return { value: JSON.parse(source.slice(open, close + 1)), open, close };
}
const phases = getArray("phases");
const weeks = getArray("weeks");
const repertoire = getArray("repertoire");
if (weeks.value.length !== 429 || phases.value.length !== 33) throw new Error("Unexpected curriculum state");

const changes = {
  4: ["Conserver la pulsation dans les changements d’accord acoustiques", "Undone The Sweater Song ; Where Is My Mind ; There’s This Girl, en arrangements acoustiques pour une guitare.", "Six accords ouverts propres et deux changements continus à 50 bpm."],
  5: ["Contrôler les rythmiques étouffées sur acoustique", "Need 2 ; Spit in My Face ; Babydoll, adaptés en accompagnements acoustiques et rythmiques étouffées.", "Croches régulières, changements ouverts continus et étouffements propres sans perte de volume."],
  10: ["Construire un arrangement acoustique complet à plusieurs voix", "Reptilia ; Ode to the Mets ; The Adults Are Talking, versions solo acoustiques simplifiées.", "Basses, mélodie et rythme séparés puis assemblés sans chercher à reproduire deux guitares simultanément."],
  14: ["Aborder les accords de septième et la bossa acoustique", "From the Start ; Duvet en arrangement acoustique solo, avec basse alternée et mélodie.", "Barrés, basse alternée et syncope maîtrisés séparément."],
  15: ["Démêler les arpèges rythmiques et le fingerstyle", "Let Down ; Knives Out ; Jigsaw Falling Into Place, arrangements acoustiques à une guitare.", "Triades mobiles, syncopes et arpèges sur deux voix automatisés."],
  16: ["Développer les lignes mélodiques et articulations acoustiques", "Just ; Reptilia ; The Adults Are Talking, arrangements acoustiques mélodiques sans amplification.", "Partie acoustique complète validée ; chaque ligne mélodique est préparée séparément."],
  21: ["Décomposer Paranoid Android en arrangement acoustique", "Paranoid Android : première moitié en arrangement solo acoustique, voix et transitions simplifiées.", "Arpèges, changements de mesure et transitions comptés sur une carte."],
  22: ["Achever Paranoid Android en guitare acoustique solo", "Paranoid Android : seconde moitié puis intégrale en arrangement acoustique à une guitare.", "Première moitié continue, voix équilibrées et forme complète mémorisée."]
};
for (const [n, v] of Object.entries(changes)) {
  const phase = phases.value[Number(n) - 1];
  phase.title = v[0]; phase.focus = v[1]; phase.gate = v[2];
}
const all = repertoire.value;
all.sort((a,b) => {
  const moduleOf = x => Number(x.info.match(/M(\d+)/)?.[1] ?? 999);
  return moduleOf(a)-moduleOf(b) || a.number-b.number;
});
all.forEach((x,i) => x.number = i+1);
source = source.slice(0, phases.open) + JSON.stringify(phases.value,null,2) + source.slice(phases.close + 10);
const p2 = source.indexOf("export const weeks =");
const wOpen = source.indexOf("[",p2);
const wClose = source.indexOf("] as const;",wOpen);
source = source.slice(0,wOpen) + JSON.stringify(weeks.value,null,2) + source.slice(wClose+10);
const rStart = source.indexOf("export const repertoire =");
const rOpen = source.indexOf("[",rStart);
const rClose = source.indexOf("] as const;",rOpen);
source = source.slice(0,rOpen) + JSON.stringify(all,null,2) + source.slice(rClose+10);
fs.writeFileSync(p,source);
let test = fs.readFileSync("tests/guitar-progress.test.mjs","utf8").replace("with the 312/104 boundary","with the 312/117 boundary");
fs.writeFileSync("tests/guitar-progress.test.mjs",test);
console.log("Acoustic phase labels and repertoire order updated.");
