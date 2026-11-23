// ---------- Les éléments de la page ----------
const fond = document.getElementById("fond");
const fond2 = document.getElementById("fond2");
const zone = document.getElementById("zone-boutons");
const titre = document.getElementById("titre");
const msg = document.getElementById("message");
const doomEl = document.getElementById("doom");
const fuyard = document.getElementById("fuyard");

// ---------- Petites fonctions utiles ----------
function hasard(min, max) {
  return Math.random() * (max - min) + min;
}

function choisir(liste) {
  return liste[Math.floor(Math.random() * liste.length)];
}

let timerMessage;
function montrer(texte) {
  msg.innerHTML = texte;
  msg.classList.add("visible");
  clearTimeout(timerMessage);
  timerMessage = setTimeout(() => msg.classList.remove("visible"), 4500);
}

// ---------- Les images de fond aléatoires ----------
function imageAleatoire() {
  const numero = Math.floor(Math.random() * 100000);
  return "url('https://picsum.photos/seed/" + numero + "/1200/800'), " +
         "linear-gradient(45deg, #ff00aa, #00ffe5, #ffee00)";
}

function changerFond() {
  fond.style.backgroundImage = imageAleatoire();
  fond2.style.backgroundImage = imageAleatoire();
}

// ---------- Les textes absurdes ----------
const textes = ["CLIQUE", "NON PAS LÀ", "OUI", "PEUT-ÊTRE", "???", "ALT+F4", "AIDE",
  "🍕", "SURPRISE", "NE ME TOUCHE PAS", "+1", "MAIS POURQUOI", "ERREUR 404",
  "JE SUIS UN BOUTON", "PRESS START", "🐸", "MIAM", "BOUTON", "ÇA MARCHE ?"];

const phrases = ["Tu as cliqué. Je le savais.", "Le bouton t'a regardé.",
  "Bravo ! Ça ne sert à rien.", "Les pixels ont faim.", "Il est trop tard.",
  "Ton ordinateur te remercie. Peut-être.", "Tout ceci est parfaitement normal."];

const titres = ["BIENVENUE (OU PAS)", "TU NE DEVRAIS PAS ÊTRE ICI", "BOUTON BOUTON BOUTON",
  "ERREUR : TROP DE FUN", "🌀🌀🌀", "QUI A ÉTEINT LA LUMIÈRE ?"];

const emojis = ["🍄", "⭐", "👾", "🎮", "💎", "🪙", "🕹️", "🔥", "🐸"];

// ---------- Ce que fait un bouton au hasard ----------
const actions = [
  changerFond,
  () => creerBoutons(5),
  () => document.body.classList.toggle("tourne"),
  () => montrer(choisir(phrases)),
  () => { titre.textContent = choisir(titres); }
];

function creerBoutons(nombre) {
  for (let i = 0; i < nombre; i++) {
    const b = document.createElement("button");
    b.className = "bouton-fou";
    b.textContent = choisir(textes);
    b.style.top = hasard(0, 95) + "%";
    b.style.left = hasard(0, 85) + "%";
    b.style.fontSize = hasard(12, 38) + "px";
    b.style.padding = hasard(4, 20) + "px " + hasard(8, 30) + "px";
    b.style.background = "hsl(" + hasard(0, 360) + ", 100%, 55%)";
    b.style.color = choisir(["black", "white"]);
    b.style.transform = "rotate(" + hasard(-25, 25) + "deg)";
    b.style.borderRadius = choisir(["0px", "10px", "50px", "50%"]);
    b.onclick = () => choisir(actions)();
    zone.appendChild(b);
  }
  // On évite d'avoir trop de boutons (sinon la page rame)
  while (zone.children.length > 120) {
    zone.removeChild(zone.firstChild);
  }
}

// ---------- Les gros boutons ----------
document.getElementById("multiplier").onclick = () => creerBoutons(8);
document.getElementById("tourner").onclick = () => document.body.classList.toggle("tourne");
document.getElementById("fond-btn").onclick = changerFond;

const boutonCalme = document.getElementById("calme");
boutonCalme.onclick = () => {
  document.body.classList.toggle("calme");
  boutonCalme.textContent = document.body.classList.contains("calme")
    ? "🤪 Remettre le chaos" : "😌 Mode calme";
};

// ---------- La traînée d'emojis derrière la souris ----------
let dernier = 0;
document.addEventListener("mousemove", (e) => {
  const maintenant = Date.now();
  if (maintenant - dernier < 70) return;
  dernier = maintenant;
  const s = document.createElement("span");
  s.className = "trace";
  s.textContent = choisir(emojis);
  s.style.left = e.clientX + "px";
  s.style.top = e.clientY + "px";
  document.body.appendChild(s);
  setTimeout(() => s.remove(), 1000);
});

// =====================================================
//   🥚 LES EASTER EGGS (ne regarde pas si tu veux chercher !)
// =====================================================

// --- Petit son de pièce façon Mario ---
function pieceMario() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = "square";
  o.connect(g);
  g.connect(ctx.destination);
  o.frequency.setValueAtTime(988, ctx.currentTime);
  o.frequency.setValueAtTime(1319, ctx.currentTime + 0.1);
  g.gain.setValueAtTime(0.1, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
  o.start();
  o.stop(ctx.currentTime + 0.6);
}

// --- Easter egg Doom : taper "iddqd" ---
function doom() {
  doomEl.classList.add("actif");
  montrer("😈 GOD MODE ACTIVÉ");
  setTimeout(() => doomEl.classList.remove("actif"), 5000);
}

// --- Easter egg Street Fighter : taper "hadouken" ---
function hadouken() {
  const boule = document.createElement("span");
  boule.className = "boule";
  boule.textContent = "🔵🔥";
  boule.style.top = hasard(10, 80) + "vh";
  document.body.appendChild(boule);
  montrer("HADOUKEN !");
  setTimeout(() => boule.remove(), 1600);
}

// --- Easter egg Minecraft : taper "creeper" ---
function creeper() {
  montrer("Tssssss…");
  setTimeout(() => {
    document.body.classList.add("secoue");
    montrer("💥 Aw man...");
    setTimeout(() => document.body.classList.remove("secoue"), 700);
  }, 1500);
}

// --- Écoute du clavier : Konami code + mots secrets ---
const konami = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft",
  "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
let positionKonami = 0;
let lettres = "";

document.addEventListener("keydown", (e) => {
  const touche = e.key.length === 1 ? e.key.toLowerCase() : e.key;

  // Konami code
  if (touche === konami[positionKonami]) {
    positionKonami++;
    if (positionKonami === konami.length) {
      positionKonami = 0;
      pieceMario();
      montrer("🍄 1UP ! Tu as gagné une vie.<br>Utilise-la bien.");
    }
  } else {
    positionKonami = (touche === konami[0]) ? 1 : 0;
  }

  // Mots secrets
  if (e.key.length === 1) {
    lettres = (lettres + e.key.toLowerCase()).slice(-12);
    if (lettres.endsWith("iddqd")) doom();
    if (lettres.endsWith("hadouken")) hadouken();
    if (lettres.endsWith("creeper")) creeper();
  }
});

// --- Easter egg Star Fox : cliquer 5 fois sur le titre ---
let clicsTitre = 0;
titre.addEventListener("click", () => {
  clicsTitre++;
  if (clicsTitre === 5) {
    clicsTitre = 0;
    montrer("Fais un tonneau ! 🚀");
    document.body.classList.add("tonneau");
    setTimeout(() => document.body.classList.remove("tonneau"), 1000);
  }
});

// --- Easter egg Zelda (Navi) : 7 clics sur le point presque invisible ---
let clicsSecret = 0;
document.getElementById("secret").addEventListener("click", () => {
  clicsSecret++;
  if (clicsSecret === 7) {
    clicsSecret = 0;
    montrer("🧚 Hey ! Listen !");
  }
});

// --- Easter egg Zelda (vieil homme) : le bouton qui fuit finit par abandonner ---
let fuites = 0;
fuyard.addEventListener("mouseover", () => {
  if (fuites >= 8) return;
  fuites++;
  fuyard.style.top = hasard(10, 80) + "vh";
  fuyard.style.left = hasard(5, 75) + "vw";
  if (fuites === 8) {
    fuyard.textContent = "…bon, j'abandonne. Clique.";
  }
});

fuyard.addEventListener("click", () => {
  if (fuites < 8) {
    montrer("Raté ! 😜");
    return;
  }
  montrer("IL EST DANGEREUX D'Y ALLER SEUL !<br>PRENDS ÇA : 🗡️");
});

// --- Easter egg Portal : ouvre la console (touche F12) ---
console.log("%c🍰 Le gâteau est un mensonge.", "font-size:20px; color:orange;");
console.log("Tu as ouvert la console… GLaDOS est fière de toi. 🤖");

// ---------- Démarrage ----------
changerFond();
creerBoutons(22);
setInterval(changerFond, 5000);