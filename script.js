// 📥 Télécharger les cartes PDF
function telechargerCartes() {
  const lien = "https://www.dl.dropboxusercontent.com/scl/fi/urjh0s56phn1c54agykm1/cartes-loup-garou.pdf?rlkey=3kwow1amohmbwics5vycam69o&";

  // Crée un iframe invisible pour forcer le téléchargement
  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.src = lien;
  document.body.appendChild(iframe);

  setTimeout(() => {
    document.body.removeChild(iframe);
  }, 3000);

  // ✅ Crée un message de confirmation
  const message = document.createElement("p");
  message.textContent = "📥 Les cartes ont été téléchargées avec succès !";
  message.style.color = "#fff";
  message.style.backgroundColor = "#ca4b0f";
  message.style.padding = "10px";
  message.style.borderRadius = "8px";
  message.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";
  message.style.marginTop = "15px";
  message.style.textAlign = "center";

  document.getElementById("intro-page").appendChild(message);

  // ⏱️ Supprimer le message après quelques secondes
  setTimeout(() => {
    message.remove();
  }, 5000);
}



// 🔀 Page intro → sélection
function entrerDansJeu() {
  document.getElementById("intro-page").style.display = "none";
  document.getElementById("page-selection").style.display = "block";
}

// 🔀 Page selection → intro
function retourIntro() {
  document.getElementById("page-selection").style.display = "none";
  document.getElementById("intro-page").style.display = "block";
}

// 🔐 Variables globales
let partieDejaLancee = false;
let audio = null; // sera créé au lancement voix des personnages
let fondSonore = new Audio("https://www.dl.dropboxusercontent.com/scl/fi/py1l7xjx4gaiiao9q82k8/Musique-de-fond-loup-garou.mp3?rlkey=jcw8ab6965yz2u98r7p2r98wf&"); // fond d’ambiance
fondSonore.loop = true;
fondSonore.volume = 0.3; // optionnel : 0.0 à 1.0

document.addEventListener("DOMContentLoaded", () => {
  // ✅ Sélection des cartes
  document.querySelectorAll(".character-card").forEach(card => {
    card.addEventListener("click", () => {
      card.classList.toggle("selected");
    });
  });

  // ▶️ Lancer la partie
  document.getElementById("start-game").addEventListener("click", () => {
    if (partieDejaLancee) return;
    partieDejaLancee = true;
    
  
    

    const audioMap = {
     "loup-garou": "https://dl.dropboxusercontent.com/scl/fi/p00l07dm7pqfbc2mp747r/Loup-Garou.mp3?rlkey=bbsu2se5tmvk2tngb4yzmukjj",
    "loup-doudou": "https://dl.dropboxusercontent.com/scl/fi/mz3lknet5aj56l9s9m087/Loup-Doudou.mp3?rlkey=kqrh7s5aqx50frmylcw6ewtsx",
    "juge": "https://dl.dropboxusercontent.com/scl/fi/do99j9ptgoo2f320d73qr/Juge.mp3?rlkey=pag2jk2umy4dv7qb493jj2av7",
    "transformatrice": "https://dl.dropboxusercontent.com/scl/fi/iu0845kkzacojqhu121bv/Transformatrice.mp3?rlkey=2a879ifojwmv0fe67v02mznu5",
    "voyante": "https://dl.dropboxusercontent.com/scl/fi/fuq9qs8c0qnanymhg0406/Voyante.mp3?rlkey=odg82efe6lit6e1q0u6l3m32r",
    "voleur": "https://dl.dropboxusercontent.com/scl/fi/qgbose1yicmlbds0mt95u/Voleur.mp3?rlkey=worp04s6g4wa0hnputy2m19sv&", 
    "magicien": "https://dl.dropboxusercontent.com/scl/fi/0fnqhz8uvcjp2m10jt2ta/Magicien.mp3?rlkey=th3h1a6qgpmtcb91mqkdilwly&", 
    "transition": "https://dl.dropboxusercontent.com/scl/fi/erj59dun9rx3ogvrtw1vw/Loup-Bis.mp3?rlkey=pe4abkzvseemnmgqq9kel9vvk&", 
    "sorciere": "https://dl.dropboxusercontent.com/scl/fi/ysrooyl4rwc8ehp506lwe/Sorci-re.mp3?rlkey=dl5aforg2mimb2sfv20a6hbqd&" 
  };
// 🔊 Son de fin
const transitionFinale = "https://dl.dropboxusercontent.com/scl/fi/9b30t5tk2wq2h5dwdhr8v/Transition-fin.mp3?rlkey=hrw5ej8th0y1pmb0gshbptly4&";
    
    const charactersSequence = [
      "loup-garou",
      "loup-doudou",
      "juge",
      "transformatrice",
      "voyante",
      "voleur",
      "magicien",
      "sorciere"
    ];

    const selectedAlts = Array.from(document.querySelectorAll(".character-card.selected img"))
      .map(img => img.alt.toLowerCase());

    const selectedSet = new Set(selectedAlts);
    const playedSounds = new Set();
    const finalSequence = [];

    charactersSequence.forEach((name, i) => {
      const next = charactersSequence[i + 1];

      // 🎭 transition toujours entre magicien et sorcière
      if (name === "magicien" && next === "sorciere") {
        finalSequence.push(audioMap.transition);
      }

      // 🎵 ajouter le son si sélectionné et pas encore joué
      if (selectedSet.has(name) && !playedSounds.has(name)) {
        finalSequence.push(audioMap[name]);
        playedSounds.add(name);
      }
    });

     // ✅ Ajout du son de transition fin
    finalSequence.push(transitionFinale);
    
    
     // 🎧 Lecture des sons en chaîne
    let i = 0;
    audio = new Audio();
    fondSonore.play(); // 🎼 lancement du fond sonore
    
    audio.src = finalSequence[i] || "";
    audio.play();

    audio.addEventListener("ended", () => {
      i++;
      if (i < finalSequence.length) {
        audio.src = finalSequence[i];
        audio.play();
      }else {
         console.log("✅ Tous les sons ont été joués, la musique de fond continue !");
        // Tu peux afficher un message ou déclencher une animation ici 🎉
      }
    });

    // 🎬 passage à la page finale
    document.getElementById("page-selection").style.display = "none";
    document.getElementById("page-jeu").style.display = "block";
  });

  // ⬅️ Retour à la sélection
  document.getElementById("back-to-game").addEventListener("click", () => {
    // 🛑 stop audio si en cours
    if (audio && !audio.paused) {
      audio.pause();
      audio.currentTime = 0;
    }

    if (!fondSonore.paused) {
      fondSonore.pause();
      fondSonore.currentTime = 0;
    }
    
    // 🔁 réinitialiser l’état
    partieDejaLancee = false;

    // 🎴 retour à la sélection
    document.getElementById("page-jeu").style.display = "none";
    document.getElementById("page-selection").style.display = "block";
  });
});



// LANCEMENT DU CHRONO
// ⏳ Chronomètre 2 minutes (remplace le bouton)
const chronoButton = document.getElementById("chrono");

if (chronoButton) {
  chronoButton.addEventListener("click", () => {
    let timeLeft = 120; // 2 minutes

    // Créer l'affichage du chrono
    const chronoDisplay = document.createElement("p");
    chronoDisplay.id = "chrono-affichage";
    chronoDisplay.style.fontSize = "20px";
    chronoDisplay.style.fontWeight = "bold";
    chronoDisplay.style.color = "white";
    chronoDisplay.style.textAlign = "center";
    chronoDisplay.style.margin = "10px";

    // 🔁 Remplacer le bouton par l'affichage
    chronoButton.replaceWith(chronoDisplay);

    // Déclencher le décompte
    const interval = setInterval(() => {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      chronoDisplay.textContent = `⏳ Temps restant : ${minutes}m ${seconds}s`;

      if (timeLeft <= 0) {
        clearInterval(interval);
        chronoDisplay.textContent = "✅ Le temps est écoulé !";
      }

      timeLeft--;
    }, 1000);
  });
} else {
  console.warn("⚠️ Le bouton #chrono n'est pas présent sur la page.");
}
