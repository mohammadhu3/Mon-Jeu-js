let tabName = ["feu", "eau", "terre"];


function powerPc() {
  return Math.floor(Math.random() * 3);
}


function testWinner(choice1, choice2) {
  if (choice1 === 0 && choice2 === 2) return true; // feu bat terre
  if (choice1 === 1 && choice2 === 0) return true; // eau bat feu
  if (choice1 === 2 && choice2 === 1) return true; // terre bat eau
  return false;
}

const boutonFeu = document.querySelector(".bouton-feu");
const boutonEau = document.querySelector(".bouton-eau");
const boutonTerre = document.querySelector(".bouton-terre");
const boutonRejouer = document.querySelector(".bouton-rejouer");

const interractions = document.querySelector(".interractions");
const nombreParties = document.querySelector(".partie-number");
const nombreGagnees = document.querySelector(".score-user");
const nombrePerdues = document.querySelector(".score-computer");

let partiesJouer;
let partiesGagnes;
let partiesPerdues;
let computerChoice;

function updateScores() {
  nombreParties.textContent = partiesJouer.toString();
  nombreGagnees.textContent = partiesGagnes.toString();
  nombrePerdues.textContent = partiesPerdues.toString();
}

function gameReset() {
  partiesJouer = 0;
  partiesGagnes = 0;
  partiesPerdues = 0;
  computerChoice = powerPc();

  boutonEau.disabled = false;
  boutonFeu.disabled = false;
  boutonTerre.disabled = false;
  boutonRejouer.disabled = true;

  interractions.innerHTML = `<span class="neutral">Choisissez un élément...</span>`;
  updateScores();
}

gameReset();

function theWinnerIs(userChoice) {
  let str = `<i class="fa-solid fa-robot"></i> Ordinateur : <strong>${tabName[computerChoice]}</strong><br>
  <i class="fa-solid fa-user"></i> Vous : <strong>${tabName[userChoice]}</strong><br>Résultat : `;

  if (computerChoice === userChoice) {
    str += `<span class="draw">Égalité 🤝</span>`;
  } else if (testWinner(computerChoice, userChoice)) {
    partiesPerdues++;
    str += `<span class="lose">L'ordinateur a gagné 🤖</span>`;
  } else if (testWinner(userChoice, computerChoice)) {
    partiesGagnes++;
    str += `<span class="win">Vous avez gagné 🎉</span>`;
  }

  partiesJouer++;
  updateScores();

  if (partiesPerdues === 10 || partiesGagnes === 10) {
    boutonEau.disabled = true;
    boutonFeu.disabled = true;
    boutonTerre.disabled = true;
    boutonRejouer.disabled = false;

    if (partiesGagnes === 10)
      str += `<br><span class="win">Vous avez remporté la manche 🏆</span>`;
    else
      str += `<br><span class="lose">Vous avez perdu la manche 💀</span>`;
  } else {
    computerChoice = powerPc();
    str += `<br><span class="neutral">Essayez encore...</span>`;
  }

  interractions.innerHTML = str;
}


boutonFeu.addEventListener("click", () => theWinnerIs(0));
boutonEau.addEventListener("click", () => theWinnerIs(1));
boutonTerre.addEventListener("click", () => theWinnerIs(2));
boutonRejouer.addEventListener("click", gameReset);

const style = document.createElement("style");
style.textContent = `
  .win { color: #00ff9d; text-shadow: 0 0 8px #00ff9d; font-weight: bold; }
  .lose { color: #ff3b3b; text-shadow: 0 0 8px #ff3b3b; font-weight: bold; }
  .draw { color: #ffd86b; text-shadow: 0 0 8px #ffd86b; font-weight: bold; }
  .neutral { color: #a0b1ff; }`;
document.head.appendChild(style);
