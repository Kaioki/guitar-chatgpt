import fs from "node:fs";

const read = (p) => fs.readFileSync(p, "utf8");
const write = (p, s) => fs.writeFileSync(p, s);
function readArray(source, name) {
  const marker = \`export const \${name} =\`;
  const start = source.indexOf(marker);
  if (start < 0) throw new Error(\`Array \${name} not found\`);
  const open = source.indexOf("[", start);
  const close = source.indexOf("] as const;", open);
  if (open < 0 || close < 0) throw new Error(\`Array \${name} boundaries not found\`);
  return { value: JSON.parse(source.slice(open, close + 1)), before: source.slice(0, open), after: source.slice(close + 1) };
}
function writeArray(parts, value) { return parts.before + JSON.stringify(value, null, 2) + parts.after; }

const path = "app/plan-data.ts";
let source = read(path);
const phaseParts = readArray(source, "phases");
const weekParts = readArray(source, "weeks");
const repertoireParts = readArray(source, "repertoire");
const phases = phaseParts.value;
const weeks = weekParts.value;
const repertoire = repertoireParts.value;

if (weeks.length !== 416 || phases.length !== 32) throw new Error("Unexpected source curriculum dimensions");
if (repertoire.some(x => x.title === "Gwyn, Lord of Cinder")) throw new Error("Curriculum transformation already applied");

phases[1] = {
  number: 2, weeks: "14 à 26",
  title: "Entrer dans la guitare classique et lire une première pièce",
  focus: "Posture classique, attaque au doigt, alternance i-m, pouce, lecture en première position et premières phrases de Gymnopédie n° 1.",
  gate: "Son propre sur chaque corde, alternance i-m régulière, pouce indépendant et première phrase classique continue à tempo lent.",
  year: 1, track: "core"
};
phases[2].title = "Installer les accords ouverts et le fingerstyle acoustique";
phases[2].focus = "The Moon Song ; Someday I’ll Get It ; Pretend, en arrangements acoustiques.";
phases[22].focus = "Gymnopédie n° 1 : transcription acoustique complète, voix séparées puis polyphonie.";
phases[23].focus = "Sérénade de Schubert ; The Second Waltz ; consolidation du répertoire classique acoustique.";
phases[26].focus = "Gwyn, Lord of Cinder en arrangement acoustique avancé ; études préparatoires pour Asturias.";
phases[26].gate = "Gymnopédie et Clair de lune au tempo de travail ; arrangement acoustique de Gwyn cartographié, doigtés et voix séparés avant assemblage.";

const classicalLessons = [
["Établir la position classique","Installer une posture stable : guitare sur la jambe gauche ou support adapté, manche légèrement relevé, épaules relâchées. Jouer quatre cordes à vide avec p puis i, sans crispation.","Gymnopédie n° 1 : écouter la version retenue, repérer la tonalité et chanter le début. Ne pas chercher à jouer toute la pièce.","Compter quatre temps réguliers et identifier les cordes à vide à l’oreille.","Posture confortable pendant cinq minutes ; quatre cordes jouées sans bruit parasite."],
["Différencier pouce et doigts","Sur cordes 6 à 4, jouer p en noires ; sur cordes 3 à 1, jouer i-m alternés. Faire quatre séries lentes, main droite immobile entre les attaques.","Relever les trois premières notes de la mélodie de Gymnopédie et les chanter avant de les jouer sur une seule corde.","Lire les notes mi-fa-sol sur la première corde, cases 0-1-3.","Pouce stable et alternance i-m sans accélération sur huit mesures."],
["Produire une attaque classique nette","Sur une corde à vide, comparer attaque avec appui et sans appui ; choisir le geste qui donne un son rond et régulier. Faire trois séries de huit notes.","Jouer la mélodie seule de la première phrase de Gymnopédie, sans accompagnement, à 40-50 bpm.","Distinguer mélodie et accompagnement dans l’enregistrement.","Huit notes consécutives de même volume ; phrase mélodique sans arrêt."],
["Lire en première position","Lire les notes naturelles des cordes 1 et 2 jusqu’à la case 3. Dire le nom de la note, la jouer, puis vérifier à l’accordeur si nécessaire.","Travailler la deuxième phrase de Gymnopédie en notes seules ; assembler les deux phrases au tempo le plus lent propre.","Frapper le rythme avant de jouer ; repérer les valeurs longues et les silences.","Deux phrases enchaînées avec doigtés notés et rythme respecté."],
["Indépendance du pouce","Sur Am puis Em, jouer p sur la basse au temps 1 et i-m sur les aigus aux temps 2 et 3. Garder les autres temps silencieux.","Ajouter une basse simple à la première phrase de Gymnopédie, uniquement lorsque la mélodie est stable.","Écouter si la basse reste régulière sous la mélodie.","Huit mesures sans que la basse accélère ni couvre la mélodie."],
["Former un arpège p-i-m-a","Sur Am, jouer p5-i3-m2-a1 puis revenir a-m-i ; quatre cycles à 45 bpm. Vérifier chaque corde séparément.","Travailler la phrase suivante de Gymnopédie en arpège très simplifié ; ne conserver que les notes compatibles avec la main.","Nommer les doigts p-i-m-a et les cordes correspondantes.","Quatre cycles continus avec volume équilibré et aucun doigt qui se crispe."],
["Contrôler deux voix","Jouer une basse tenue puis une mélodie en notes séparées. Commencer par deux mesures, puis quatre ; ralentir si une voix disparaît.","Assembler basse et mélodie sur quatre mesures de Gymnopédie. Enregistrer une prise courte et noter la voix qui manque de stabilité.","Écouter séparément la ligne grave puis la ligne aiguë.","Quatre mesures où les deux voix restent audibles et indépendantes."],
["Articuler legato et notes détachées","Sur une petite gamme de Do majeur, jouer deux notes liées puis deux notes détachées. Garder le même tempo et le même volume.","Reprendre les phrases déjà apprises de Gymnopédie en soignant les fins de notes et les respirations.","Repérer les fins de phrase dans l’enregistrement et les chanter.","Deux contrastes d’articulation identifiables sans rupture de pulsation."],
["Déplacer la main sans tension","Déplacer la main gauche entre cases 1 et 3 sur les cordes aiguës ; anticiper le doigt suivant et relâcher la pression après chaque note.","Apprendre le raccord entre deux phrases de Gymnopédie ; isoler le déplacement puis l’intégrer à la mélodie.","Lire le doigté à voix haute avant de jouer le raccord.","Dix déplacements propres sur dix, sans bruit de glissé involontaire."],
["Équilibrer mélodie et accompagnement","Jouer la basse à volume doux et la mélodie à volume moyen. Alterner trois essais en exagérant puis réduire l’écart.","Ajouter progressivement les notes d’accompagnement prévues par l’arrangement de Gymnopédie ; ne pas remplir les silences.","Identifier à l’écoute quelle voix porte le thème.","Mélodie clairement dominante sans basse accentuée involontairement."],
["Stabiliser le tempo","Travailler deux mesures avec métronome, puis les rejouer sans clic. Comparer la durée et corriger uniquement le point de dérive.","Assembler les sections étudiées de Gymnopédie à tempo lent ; marquer les endroits qui nécessitent encore une reprise isolée.","Frapper le rythme de la pièce en comptant les subdivisions.","Deux passages continus au même tempo, sans accélération finale."],
["Construire une interprétation","Faire une prise de la pièce travaillée. Réécouter en notant seulement trois critères : continuité, équilibre des voix, qualité du son.","Jouer les phrases maîtrisées de Gymnopédie avec nuances sobres ; ne pas augmenter le tempo pour masquer une faiblesse.","Chanter le thème sans guitare, puis le retrouver sur le manche.","Prise enregistrée et trois corrections concrètes formulées."],
["Valider les fondations classiques","Reprendre posture, attaques, alternance, arpège et raccords. Faire une courte série de chaque, sans accumuler de répétitions fatigantes.","Enregistrer le périmètre réellement acquis de Gymnopédie ; noter la mesure exacte où reprendre au prochain bloc.","Écouter la prise et identifier une réussite ainsi qu’un axe de travail.","Deux prises propres sur deux jours ; aucun passage non maîtrisé déclaré acquis."]
];
for (let i = 0; i < 13; i++) {
  const w = weeks[13 + i];
  const [title, work, repertoireText, ear, validation] = classicalLessons[i];
  Object.assign(w, {
    title, objective: title + ".", work, repertoire: repertoireText, ear, validation,
    moduleNumber: 2, moduleTitle: "Entrer dans la guitare classique et lire une première pièce", year: 1
  });
}

const electricTitles = [
  "I Wanna Be Yours","Apocalypse","Cry","Undone The Sweater Song","Where Is My Mind","There’s This Girl",
  "Need 2","Spit in My Face","Babydoll","Eyes Without a Face","Treehouse","Mary","The Night We Met",
  "Destroy Myself Just for You","Heart to Heart","Chamber of Reflection","Home","A Wolf at the Door",
  "Reptilia","Ode to the Mets","The Adults Are Talking","Duvet","Let Down","Knives Out","Just","Paranoid Android"
];
for (const item of repertoire) {
  if (/Électrique/i.test(item.info)) item.info = item.info.replace(/Électrique(?: demandée| proposée)?/gi, "Acoustique — arrangement solo adapté");
  if (electricTitles.includes(item.title)) {
    item.target = "Version acoustique jouable : arrangement réduit à une seule guitare, avec priorité à la mélodie, à la basse et à la forme complète. La version électrique originale est réservée au module final.";
    item.level = "Niveau de l’arrangement acoustique à valider selon la transcription retenue.";
  }
}
repertoire.push({
  number: 58, title: "Gwyn, Lord of Cinder",
  info: "Motoi Sakuraba — Dark Souls • Acoustique • M27 S339 à S351",
  target: "Arrangement solo acoustique : thème mélodique, basses et accords répartis en voix séparées avant assemblage. Choisir une transcription légitime adaptée à six cordes.",
  level: "Avancé ; la difficulté dépend de l’arrangement, des positions et de la polyphonie."
});

const electricModule = [
["Auditer la guitare électrique et le son","Brancher l’instrument à faible volume. Régler un son clair, vérifier accordage, hauteur de sangle et position du câble. Enregistrer une note tenue puis une série de huit noires.","Écouter les parties électriques originales du répertoire retenu. Choisir une première partie rythmique et relever sa forme sans chercher à la jouer.","Distinguer son clair, saturation et bruit parasite ; identifier les six cordes.","Instrument accordé, volume maîtrisé et prise sans bruit de manipulation."],
["Stabiliser l’aller-retour","Sur corde 6 à vide, alterner médiator bas-haut en croches à 50 bpm pendant huit mesures. Garder une amplitude minimale.","Choisir un riff de I Wanna Be Yours ou Where Is My Mind. Le découper en cellules de deux temps et le jouer sur une seule corde si nécessaire.","Frapper les croches en comptant 1-et-2-et.","Huit mesures régulières sans accrocher les cordes voisines."],
["Installer les power chords","Former une quinte sur cordes 6-5 puis 5-4. Jouer deux attaques, étouffer, puis laisser deux temps de silence. Vérifier l’absence de cordes ouvertes.","Appliquer les power chords à une cellule du morceau choisi ; ne pas accélérer tant que les changements sont imprécis.","Écouter la différence entre accord ouvert et quinte étouffée.","Dix changements propres avec silence net entre les attaques."],
["Contrôler le palm mute","Poser le bord de la main droite près du chevalet. Comparer son étouffé et son ouvert sur une même corde ; déplacer la main par petits millimètres.","Travailler une cellule rythmique de Reptilia ou The Adults Are Talking en alternant notes étouffées et ouvertes.","Identifier les accents et les silences du riff original.","Contraste audible et tempo stable sur huit mesures."],
["Traverser les cordes sans parasite","Jouer une séquence de deux notes sur cordes adjacentes avec aller-retour. Préparer le déplacement du médiator avant le changement de corde.","Apprendre une cellule de riff en conservant les cordes non jouées étouffées par les deux mains.","Repérer la direction du contour mélodique avant de jouer.","Huit répétitions sans corde parasite ni arrêt."],
["Construire un riff complet","Assembler quatre cellules déjà travaillées ; jouer à 60 % du tempo de référence puis enregistrer. Marquer les accents et les reprises.","Travailler le riff principal de Reptilia ou Duvet, partie par partie ; ne pas mélanger rythmique et lead.","Écouter le riff puis chanter son rythme sans instrument.","Forme complète reconnaissable à tempo lent."],
["Préparer les bends et le vibrato","Sur une corde aiguë, travailler une petite pré-déformation contrôlée puis relâcher. N’ajouter les bends qu’après vérification de la hauteur cible à l’accordeur.","Choisir un seul ornement d’une partie lead ; si aucun bend n’est nécessaire, travailler une liaison ou un vibrato léger.","Comparer la note cible jouée directement et atteinte par bend.","Hauteur cible juste et geste sans douleur ; sinon reporter le bend."],
["Articuler hammer-on et pull-off","Sur une paire de cases adjacentes, jouer une note puis hammer-on et pull-off lentement. Garder un volume homogène sans forcer.","Appliquer l’articulation à une courte phrase lead de Just ou The Adults Are Talking, si la transcription l’exige.","Reconnaître à l’écoute une note attaquée et une note liée.","Huit groupes réguliers avec notes audibles et sans tension."],
["Travailler les changements de position","Jouer une phrase de trois notes, déplacer la main entière puis reprendre. Relâcher avant le déplacement et garder le pouce mobile.","Apprendre la deuxième cellule du solo choisi ; noter doigtés et positions pour éviter les déplacements improvisés.","Chanter la phrase avant de la retrouver sur le manche.","Dix déplacements anticipés sans perte de pulsation."],
["Séparer rythmique et lead","Jouer la partie rythmique seule, puis la lead seule. Marquer les mesures de repos et les entrées ; ne jamais superposer deux parties impossibles à jouer simultanément.","Choisir une partie complète de Reptilia, Duvet ou Paranoid Android et définir précisément le périmètre d’une seule guitare.","Écouter l’arrangement et repérer les couches qui doivent être simplifiées.","Carte de forme écrite et partie choisie jouable seule."],
["Assembler le premier morceau","Travailler P1-P2 puis P3-P4, six répétitions de chaque raccord. Enregistrer une prise à tempo réduit et noter le dernier passage instable.","Assembler la version électrique choisie sur toute sa forme, reprises comprises. Garder les silences et les transitions.","Compter les mesures et annoncer les entrées avant chaque section.","Un morceau entier joué lentement sans saut de section."],
["Approcher le tempo de référence","Augmenter de 2 bpm seulement après trois prises propres. Revenir au tempo précédent au premier défaut ; ne pas augmenter durée et vitesse en même temps.","Reprendre le morceau entier ; corriger deux passages maximum par séance puis refaire une prise complète.","Écouter si le groove reste identique quand le tempo augmente.","Deux prises propres au tempo de travail consigné."],
["Enregistrer et valider le module","Faire une prise continue, écouter avec la version de référence et noter son, rythme, transitions et maîtrise des cordes parasites. Choisir la prochaine pièce selon les critères réellement acquis.","Jouer le morceau retenu en entier. Archiver une prise et écrire la prochaine étape : nouveau riff, lead ou morceau plus complexe.","Décrire de mémoire la structure et chanter le riff principal.","Prise complète archivée ; les critères manquants deviennent le contenu du prochain bloc."]
];
for (let i = 0; i < 13; i++) {
  const n = 417 + i;
  const [title, work, repertoireText, ear, validation] = electricModule[i];
  weeks.push({
    id: "S" + n, number: n, title, objective: title + ".", work,
    repertoire: repertoireText, ear, validation,
    moduleNumber: 33, moduleTitle: "Module final — guitare électrique, rock et lead", year: 11
  });
}
phases.push({
  number: 33, weeks: "417 à 429",
  title: "Module final facultatif : guitare électrique, rock et lead",
  focus: "Versions électriques originales de I Wanna Be Yours, Apocalypse, Cry, Reptilia, The Adults Are Talking, Duvet, Just, Paranoid Android et autres titres rock du répertoire.",
  gate: "Fondations rythmiques et acoustiques solides ; riffs, étouffements, power chords et parties lead travaillés séparément avant le morceau entier.",
  year: 11, track: "specialization"
});

source = writeArray(phaseParts, phases);
const weekParts2 = readArray(source, "weeks");
source = writeArray(weekParts2, weeks);
const repertoireParts2 = readArray(source, "repertoire");
source = writeArray(repertoireParts2, repertoire);
write(path, source);

let progress = read("app/progress.ts").replace("CORE_BLOCKS = 312", "CORE_BLOCKS = 312").replace("SPECIALIZATION_BLOCKS = 104", "SPECIALIZATION_BLOCKS = 117");
write("app/progress.ts", progress);
let validation = read("app/backup-validation.ts").replace("<= 416", "<= 429");
write("app/backup-validation.ts", validation);
let page = read("app/page.tsx").replace("const TOTAL_WEEKS = 416;", "const TOTAL_WEEKS = 429;").replace("416 blocs de maîtrise", "429 blocs de maîtrise").replace("416 blocs", "429 blocs");
write("app/page.tsx", page);
let filename = read("app/backup-filename.ts").replace("416-blocs", "429-blocs");
write("app/backup-filename.ts", filename);
let test = read("tests/guitar-progress.test.mjs")
 .replace("416 ordered blocks", "429 ordered blocks")
 .replace("length:416", "length:429")
 .replace("phases.length,32", "phases.length,33")
 .replace("repertoire.length,57", "repertoire.length,58")
 .replace("S416", "S429")
 .replace("unitId:'S313'", "unitId:'S313'")
 .replace("S417'", "S430'")
 .replace("S416", "S429")
 .replace("416-blocs", "429-blocs");
test = test.replace("weeks[311].moduleNumber,24);assert.equal(weeks[312].moduleNumber,25)", "weeks[311].moduleNumber,24);assert.equal(weeks[312].moduleNumber,25);assert.equal(weeks[416].moduleNumber,33)")
 .replace("total:104,mastered:1,percent:1", "total:117,mastered:1,percent:0.9");
write("tests/guitar-progress.test.mjs", test);

let readme = read("README.md")
 .replace("416 blocs progressifs", "429 blocs progressifs")
 .replace("blocs 1 à 312", "blocs 1 à 312")
 .replace("blocs 313 à 416", "blocs 313 à 429")
 .replace("32 modules, 57 titres", "33 modules, 58 titres")
 .replace("Clair de lune, Asturias et La Campanella", "Gymnopédie dès le début, puis Clair de lune, Gwyn, Asturias et La Campanella")
 .replace("parcours guitare-albert-416", "parcours guitare-albert-429");
readme += "\n\n## Organisation instrumentale\n\nLe tronc commun et la spécialisation acoustique privilégient des morceaux réalisables sur guitare acoustique, avec des arrangements solo lorsque l’original utilise plusieurs instruments. Un module électrique facultatif clôt le parcours (blocs 417 à 429) et rassemble les versions originales rock, les power chords, les étouffements, les riffs et le jeu lead. Le module classique commence dès le deuxième module, avec posture, attaque aux doigts, lecture en première position et premières phrases de Gymnopédie n° 1.\n\n**Gwyn, Lord of Cinder** (Dark Souls, Motoi Sakuraba) est ajouté au module 27 sous forme d’un arrangement acoustique solo avancé. Il faudra sélectionner une transcription adaptée et autorisée ; le parcours décrit le travail musical, sans reproduire de partition protégée.\n";
write("README.md", readme);
console.log("Curriculum transformed: 429 blocks, 33 phases, 58 repertoire entries.");
