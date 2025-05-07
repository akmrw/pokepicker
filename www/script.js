import { Http } from '@capacitor-community/http';
const config = require("./config.json")
let db;

document.addEventListener("DOMContentLoaded", () => {
  (async () => {

    const cardLoader = document.getElementById("cardLoader");
    cardLoader.innerHTML = `
      <p id="loaderText">Lade Karten…</p>
      <div id="progressBarContainer">
        <div id="progressBar"></div>
      </div>
      <div id="progressText">0%</div>
    `;
    cardLoader.classList.remove("hidden");
    cardLoader.classList.add("shown");
    
    //SQLite-Datenbank-Initialisierung
    const { initDatabase, getDaten, getName, getEngName, getCardIds, updateCardIds, insertCard, getCardById, getCardsByIds, updatePrice, 
      getTrainers, insertTrainer, getTrainerCardIds, getTrainerById,
      getEnergies, insertEnergie, getEnergieCardIds, getEnergieById } = await import("./db-init.js");
    db = await initDatabase();

    //Tabelle definieren
    const data = await getDaten();
    const tbody = document.querySelector("#kartentabelle tbody");

    window.cachedCards = {};
    window.cachedPokemonCardsByName = {};
    window.cachedTrainerCardsByType = {};
    window.cachedEnergyCardsByType = {};

    let current = 0;
    const total = data.values.length;

    //Tabelle aus Datenbank füllen
    for (const eintrag of data.values) {
      const tr = document.createElement("tr");

      let dexNr = parseInt(eintrag.dex);

      //Tabellenspalten mit Dex-Nr., Pokémon-Name und -Bild füllen
      let html = `
        <td class="dexnr">${eintrag.dex}</td>
        <td class="pokemon">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dexNr}.png" alt="${eintrag.name}"><br>
          <a href="https://www.pokewiki.de/${eintrag.name}" target="_blank">${eintrag.name}</a>
        </td>
        <td id="td_${eintrag.dex}">
          <div id="kartenContainer_${eintrag.dex}" style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px;"></div>
          <button id="neueKarteBtn_${eintrag.dex}" onclick="openOverlay('${eintrag.dex}')">+ Neue Karte</button>
        </td>
      `;

      tr.innerHTML = html;
      tbody.appendChild(tr);

      await loadSavedCards(eintrag.dex);

      // Fortschritt berechnen
      current++;
      const percent = Math.min(99, Math.round((current / total) * 100));
      const progressBar = document.getElementById("progressBar");
      const progressText = document.getElementById("progressText");
      if (progressBar) progressBar.style.width = percent + "%";
      if (progressText) progressText.textContent = percent + "%";

    } 

    progressBar.style.width = "100%";
    progressText.textContent = "100%";

    cardLoader.classList.add("hidden");
    cardLoader.classList.remove("shown");
    cardLoader.innerHTML = "";

    updateEintragsAnzahl();
    updateKartenAnzahl();
    updateGesamtwert();

    //Aktualisieren der gezeigten Anzahl der Tabellen-Einträge
    function updateEintragsAnzahl() {
      const rows = document.querySelectorAll("#kartentabelle tbody tr");
      let sichtbareZeilen = 0;
      //zählt alle nicht versteckten (also sichtbaren) Zeilen
      rows.forEach(row => {
        if (row.style.display !== "none") sichtbareZeilen++;
      });
      document.getElementById("eintragsAnzahl").textContent = `(${sichtbareZeilen})`;
    }

    function updateKartenAnzahl() {
      const rows = document.querySelectorAll("#kartentabelle tbody tr");
      let gesamt = 0;
    
      rows.forEach(row => {
        if (row.style.display === "none") return;
    
        const cards = row.querySelectorAll("div[id^='kartenContainer_'] img");
        gesamt += cards.length;
      });
    
      document.getElementById("kartenAnzahl").textContent = `(${gesamt})`;
    }    

    async function loadSavedCards(dex) {
      
      const container = document.getElementById(`kartenContainer_${dex}`);
      
      let cardIds = await getCardIds(dex);
      if (!cardIds) return;
    
      const ids = cardIds.split(";").filter(id => id.trim());
      const cards = await getCardsByIds(ids.map(id => parseInt(id)));
      // Karten nach avg30 absteigend sortieren
      cards.sort((a, b) => (b.avg30 || 0) - (a.avg30 || 0));

      const fragment = document.createDocumentFragment();

      for (const card of cards) {
        window.cachedCards[card.cardId] = card;

        const img = document.createElement("img");
        img.alt = card.cardId;
        img.style.width = "50px";
        img.style.height = "69px";
        img.style.objectFit = "cover";
        img.src = card.imageLow;

        img.addEventListener("click", () => openCardGallery(dex, ids.indexOf(String(card.id))));
        fragment.appendChild(img);
      }

      container.appendChild(fragment);

    }

    async function openCardGallery(dex, startIndex) {
      const overlayElement = document.querySelector("#overlay");
      overlayElement.innerHTML = `<div id="overlayContent"><div class="loader"></div></div>`;
      overlayElement.classList.remove("hidden");
      overlayElement.classList.add("shown");
    
      let cardIds = await getCardIds(dex);
      if (!cardIds) return;
    
      const ids = cardIds.split(";").filter(id => id.trim() !== "");
    
      if (ids.length === 0) {
        overlayElement.classList.add("hidden");
        overlayElement.classList.remove("shown");
        return;
      }
    
      let currentIndex = startIndex;
    
      async function showCard() {
        
        const id = ids[currentIndex];
    
        try {
          const card = await getCardById(id);

          let hinzugefügtAm = "Unbekannt";
          if (card.addedAt) {
            const datum = new Date(card.addedAt);
            const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
            //const options = { day: '2-digit', month: '2-digit', year: 'numeric' }; // nur Datum, ohne Zeit
            hinzugefügtAm = datum.toLocaleString('de-DE', options);
          }

          let variante = "Keine Angabe";

          if (card.basic == 1) variante = "Basic";
          if (card.reverse == 1) variante = "Reverse";
          if (card.holo == 1) variante = "Holo";

          // 🔁 Preis laden (mit Fallback)
          let wert30d = await fetchPrice(card.cardId);
          if (wert30d == null) {
            const cleanedId = cleanCardId(card.cardId);
            wert30d = await fetchPrice(cleanedId);
          }

          // 💶 Preis formatieren oder Ersatz anzeigen
          let preisText = "–";
          if (wert30d != null) {
            const wert = wert30d.toFixed(2);
            let farbe = "#DEDEDE"; // Standard grau
            let symbol = "🪙";      // Günstig

            if (wert30d > 20) {
              farbe = "#FF4444";
              symbol = "🔥";
            } else if (wert30d > 5) {
              farbe = "#FFAA00";
              symbol = "💰";
            }

            preisText = `<span style="color:${farbe};">${symbol} ${wert}€</span>`;
          }
          
          overlayElement.innerHTML = `
            <div id="overlayContent">
            <button class="closeGallery" id="closeGallery">X</button>
              <h2>Karte ansehen</h2>
              <div style="display:flex; align-items:center; justify-content:center;">
                <div style="display:flex; flex-direction:column; align-items:center;">
                  <img src="${card.imageHigh}" alt="${id}" style="max-width:300px; max-height:400px; margin:0 20px;">
                  <p style="margin-top:10px;">
                    ID: ${card.cardId} | Variante: <strong>${variante}</strong><br>
                    30d-Wert: <strong>${preisText}</strong><br>
                    Hinzugefügt am: <strong>${hinzugefügtAm}
                  </p>
                </div>
              </div>
              <button id="prevCard" style="font-size:24px;">⬅️</button>
              <button id="nextCard" style="font-size:24px;">➡️</button>
              <br><br>
              <button id="deleteCard">❌ Karte löschen</button>
            </div>
          `;    
    
          document.getElementById("prevCard").addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + ids.length) % ids.length;
            showCard();
          });
    
          document.getElementById("nextCard").addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % ids.length;
            showCard();
          });
    
          document.getElementById("deleteCard").addEventListener("click", async () => {
            if (confirm("Willst du diese Karte wirklich löschen?")) {
              const dbId = ids[currentIndex]; // das ist die Karten-ID in der DB
          
              // 1. Karte aus cards-Tabelle löschen
              await db.run(`DELETE FROM cards WHERE id = ?`, [dbId]);
          
              // 2. ID aus der Liste entfernen und speichern
              ids.splice(currentIndex, 1);
              await updateCardIds(dex, ids.join(";") + ";");
          
              // 3. Galerie und Container neu laden
              overlayElement.classList.add("hidden");
              overlayElement.classList.remove("shown");
              overlayElement.innerHTML = "";
          
              const container = document.getElementById(`kartenContainer_${dex}`);
              container.innerHTML = "";
              loadSavedCards(dex);
              updateKartenAnzahl();
              updateGesamtwert();
            }
          });
    
          document.getElementById("closeGallery").addEventListener("click", () => {
            overlayElement.classList.add("hidden");
            overlayElement.classList.remove("shown");
            overlayElement.innerHTML = "";
          });
    
        } catch (error) {
          console.error("Fehler beim Anzeigen der Karte:", error);
          overlayElement.classList.add("hidden");
          overlayElement.classList.remove("shown");
          overlayElement.innerHTML = "";
        }
      }
    
      showCard();
    }    

    //Öffnet das Overlay zum Aussuchen des neuen Kartentyps nach Klick auf Button "+ Neue Karte"
    window.openOverlay = async function (dex) {

      const overlayElement = document.querySelector("#overlay");
      
      // Ladeanzeige
      overlayElement.innerHTML = `
        <div id="overlayContent">
          <h2>Bitte warten...</h2>
          <p>Karten werden geladen</p>
          <div class="loader"></div>
        </div>
      `;
      overlayElement.classList.remove("hidden");
      overlayElement.classList.add("shown");
    
      try {
        
        const name = await getName(dex);
        let engName = await getEngName(dex);

        if (engName == "Nidoran♂") engName = "Nidoran ♂";
        if (engName == "Nidoran♀") engName = "Nidoran ♀";
        if (engName == "Sirfetch’d") engName = "Sirfetch'd";

        let cards = window.cachedPokemonCardsByName[engName];
        if (!cards) {
          cards = await fetchCards(engName);
          if (cards) {
            window.cachedPokemonCardsByName[engName] = cards;
          }
        }
    
        if (!cards || cards.length === 0) {
          overlayElement.innerHTML = `
            <div id='overlayContent'>
              <h2>Keine Karten gefunden.</h2> 
              <button class="overlayMenuBtn" id="BackBtn">Schließen</button>
            </div>
          `;

          document.getElementById("BackBtn").addEventListener("click", e => {
            e.preventDefault();
            overlayElement.classList.add("hidden");
            overlayElement.classList.remove("shown");
            overlayElement.innerHTML = "";
          });

          return;
        }
    
        let html = `
          <div id="overlayContent">
            <button class="closeGallery" id="BackBtn">X</button>
            <h2>
              Kartenauswahl für<br>
              <strong>${name}</strong>:
            </h2>
            <p>Welche Karte möchtest du hinzufügen?</p>
            <div class="kartenGrid">
        `;
    
        for (const card of cards) {
          let wert30d = card.avg30;
        
          let preisText = "–";
          if (wert30d != null) {
            const wert = wert30d.toFixed(2);
            let farbe = "#DEDEDE";
            let symbol = "🪙";
        
            if (wert30d > 20) {
              farbe = "#FF4444";
              symbol = "🔥";
            } else if (wert30d > 5) {
              farbe = "#FFAA00";
              symbol = "💰";
            }
        
            preisText = `<span style="color:${farbe}; font-size:14px;">${symbol} ${wert}€</span>`;
          }
        
          html += `
            <div class="kartenItem" onclick="karteAuswählen('${card.id}', '${dex}', '${name}')">
              <div>ID: ${card.id}</div>
              <img src="${card.images.small}" alt="${name}">
              <div>${preisText}</div>
            </div>
          `;
        }        
    
        html += `
            </div>
          </div>
        `;
    
        overlayElement.innerHTML = html;
    
        document.getElementById("BackBtn").addEventListener("click", e => {
          e.preventDefault();
          overlayElement.classList.add("hidden");
          overlayElement.classList.remove("shown");
          overlayElement.innerHTML = "";
        });
    
      } catch (error) {
        console.error(error);
        overlayElement.innerHTML = `
        <div id='overlayContent'>
          <h2>Fehler beim Laden.</h2>
          <button class="overlayMenuBtn" id="BackBtn">Schließen</button>
        </div>`;

        document.getElementById("BackBtn").addEventListener("click", e => {
          e.preventDefault();
          overlayElement.classList.add("hidden");
          overlayElement.classList.remove("shown");
          overlayElement.innerHTML = "";
        });

      }
        
    };

    function cleanCardId(cardId) {
      return cardId.replace(/-(0*)(\d+)/, (match, zeros, number) => {
        return '-' + parseInt(number, 10);
      });
    }
  
    async function fetchCards(engName) {
      try {
        const url = `https://api.pokemontcg.io/v2/cards?q=name:"${engName}"&orderBy=-set.releaseDate`;
        const response = await Http.get({
          url: url,
          headers: {
            'Accept': 'application/json',
            'X-Api-Key': config.API_KEY,
            'Connection': 'close'
          }
        });
    
        if (response.status !== 200) {
          console.error("Fehler beim Abrufen der Karten:", response.status, response);
          return null;
        }
    
        const cards = response.data.data;
    
        // Extrahiere 30d-Preis direkt
        for (const card of cards) {
          const prices = card.cardmarket?.prices;
          card.avg30 = prices?.avg30 ?? null;
        }
    
        return cards;
    
      } catch (error) {
        console.error('Fehler beim Abrufen über HTTP:', error.message);
        return null;
      }
    }

    async function fetchAllTrainerCards(subtype) {
      let allCards = [];
      let page = 1;
      let pageSize = 250;
      let more = true;
    
      while (more) {
        const url = `https://api.pokemontcg.io/v2/cards?q=supertype:Trainer subtypes:${subtype}&orderBy=name&page=${page}&pageSize=${pageSize}`;
    
        const response = await Http.get({
          url,
          headers: {
            'Accept': 'application/json',
            'X-Api-Key': config.API_KEY,
            'Connection': 'close'
          }
        });
    
        if (response.status !== 200 || !response.data?.data?.length) {
          more = false;
          break;
        }
    
        const cards = response.data.data;
    
        // Optional: avg30 ermitteln
        for (const card of cards) {
          const prices = card.cardmarket?.prices;
          card.avg30 = prices?.avg30 ?? null;
        }
    
        allCards = allCards.concat(cards);
    
        // Wenn weniger als pageSize zurückkam → keine weiteren Seiten
        if (cards.length < pageSize) {
          more = false;
        } else {
          page++;
        }
      }
    
      return allCards;
    }    

    async function fetchPrice(cardId) {
      try {
        const url = `https://api.pokemontcg.io/v2/cards?q=id:${cardId}`;
        const response = await Http.get({
          url,
          headers: {
            'Accept': 'application/json',
            'X-Api-Key': config.API_KEY,
            'Connection': 'close'
          }
        });
    
        if (response.status !== 200 || !response.data?.data?.length) {
          console.error("Fehler beim Abrufen der Karte:", response.status, response);
          return null;
        }
    
        const prices = response.data.data[0]?.cardmarket?.prices;
        return prices?.avg30 ?? null;
    
      } catch (error) {
        console.error('Fehler beim Preisabruf:', error.message);
        return null;
      }
    }    

    window.karteAuswählen = async function (cardId, dex, name) {

      const overlayElement = document.querySelector("#overlay");

      overlayElement.innerHTML = `<div id="overlayContent"><div class="loader"></div></div>`;
      overlayElement.classList.remove("hidden");
      overlayElement.classList.add("shown");
    
      const response = await Http.get({
        url: `https://api.pokemontcg.io/v2/cards/${cardId}`,
        headers: {
          'Accept': 'application/json',
          'X-Api-Key': config.API_KEY,
          'Connection': 'close'
        }
      });
    
      if (response.status !== 200) {
        console.error("Fehler beim Abrufen der Karte:", response.status, response);
        return;
      }      
    
      const cardData = response.data.data;
      cardData.imageSmall = cardData.images?.small || null;
      cardData.imageLarge = cardData.images?.large || null;
      const cardDbId = await insertCard(cardData);

      if (!cardDbId) {
        console.error("Keine ID von insertCard erhalten – Abbruch.");
        return;
      }

      cardData.id = cardDbId;
      window.cachedCards[cardData.cardId] = cardData;
    
      overlayElement.innerHTML = `
        <div id="overlayContent">
          <h2>Karte hinzugefügt!</h2>
          <p>Du hast <strong>${name}</strong> (${cardId}) ausgewählt.</p>
          <br>
          <p>Welche Variante möchtest du speichern?</p>
          <button class="overlayMenuBtn" id="btnBasic">Basic</button>
          <button class="overlayMenuBtn" id="btnReverse">Reverse</button>
          <button class="overlayMenuBtn" id="btnHolo">Holo</button>
          <br><br>
          <button class="overlayMenuBtn" id="closeOverlayConfirm">Überspringen</button>
        </div>
      `;
    
      async function finalizeCardSelection(variantType) {

        overlayElement.innerHTML = `<div id="overlayContent"><div class="loader"></div></div>`;
        overlayElement.classList.remove("hidden");
        overlayElement.classList.add("shown");

        if (variantType !== "none") {
          await db.run(`UPDATE cards SET ${variantType} = 1 WHERE id = ?`, [cardDbId]);
        }
    
        let cardIds = await getCardIds(dex);
        if (!cardIds) cardIds = "";
        cardIds += cardDbId + ";";
        await updateCardIds(dex, cardIds);

        const container = document.getElementById(`kartenContainer_${dex}`);
        container.innerHTML = ""; // Container leeren
        await loadSavedCards(dex); // neu laden und korrekt einsortieren
    
        overlayElement.classList.add("hidden");
        overlayElement.classList.remove("shown");
        overlayElement.innerHTML = "";

        updateEintragsAnzahl();
        updateKartenAnzahl();
        updateGesamtwert();
      }
    
      document.getElementById("btnBasic").addEventListener("click", () => finalizeCardSelection("basic"));
      document.getElementById("btnReverse").addEventListener("click", () => finalizeCardSelection("reverse"));
      document.getElementById("btnHolo").addEventListener("click", () => finalizeCardSelection("holo"));
      document.getElementById("closeOverlayConfirm").addEventListener("click", () => finalizeCardSelection("none"));
      
    };    

    async function updateGesamtwert() {
      try {
        const cardResult = await db.query(`SELECT avg30 FROM cards WHERE avg30 IS NOT NULL`);
        const trainerResult = await db.query(`SELECT avg30 FROM trainer WHERE avg30 IS NOT NULL`);
        const energieResult = await db.query(`SELECT avg30 FROM energy WHERE avg30 IS NOT NULL`);
        let summe = 0;
    
        for (const row of cardResult.values) {
          summe += row.avg30;
        }

        for (const row of trainerResult.values) {
          summe += row.avg30;
        }

        for (const row of energieResult.values) {
          summe += row.avg30;
        }
    
        let symbol = "🪙";
        if (summe > 1000) symbol = "🔥";
        else if (summe > 500) symbol = "💰";
    
        const text = `Gesamtwert: ${symbol} ${summe.toFixed(2)}€`;
        document.getElementById("gesamtwert").textContent = text;
    
      } catch (error) {
        console.error("Fehler beim Berechnen des Gesamtwerts:", error);
      }
    }
    
    async function aktualisiereAllePreise() {
      const result = await db.query(`SELECT cardId FROM cards`);
      const trainerResult = await db.query(`SELECT cardId FROM trainer`);
      const energieResult = await db.query(`SELECT cardId FROM energy`);
    
      let aktualisiert = 0;
      let current = 0;
      const total = result.values.length + trainerResult.values.length + energieResult.values.length;;
    
      alert(`Aktualisierung von ${total} Preisen gestartet.`);
    
      for (const row of result.values) {
        const cardId = row.cardId;
    
        let preis = await fetchPrice(cardId);
        if (preis == null) {
          const cleaned = cleanCardId(cardId);
          preis = await fetchPrice(cleaned);
        }
    
        if (preis != null) {
          await updatePrice(cardId, preis);
          aktualisiert++;
        }
    
        current++;
        const percent = Math.round((current / total) * 100);
        const updateProgress = document.getElementById("preiseAktualisierenProgress");
        if (updateProgress) updateProgress.textContent = percent + "%";
      }
    
      for (const row of trainerResult.values) {
        const cardId = row.cardId;
    
        let preis = await fetchPrice(cardId);
        if (preis == null) {
          const cleaned = cleanCardId(cardId);
          preis = await fetchPrice(cleaned);
        }
    
        if (preis != null) {
          await db.run(`UPDATE trainer SET avg30 = ? WHERE cardId = ?`, [preis, cardId]);
          aktualisiert++;
        }
    
        current++;
        const percent = Math.round((current / total) * 100);
        const updateProgress = document.getElementById("preiseAktualisierenProgress");
        if (updateProgress) updateProgress.textContent = percent + "%";
      }

      for (const row of energieResult.values) {
        const cardId = row.cardId;
    
        let preis = await fetchPrice(cardId);
        if (preis == null) {
          const cleaned = cleanCardId(cardId);
          preis = await fetchPrice(cleaned);
        }
    
        if (preis != null) {
          await db.run(`UPDATE energy SET avg30 = ? WHERE cardId = ?`, [preis, cardId]);
          aktualisiert++;
        }
    
        current++;
        const percent = Math.round((current / total) * 100);
        const updateProgress = document.getElementById("preiseAktualisierenProgress");
        if (updateProgress) updateProgress.textContent = percent + "%";
      }
    
      const updateProgress = document.getElementById("preiseAktualisierenProgress");
      if (updateProgress) updateProgress.textContent = "";
      
      alert(`${aktualisiert} Preise wurden aktualisiert!`);
      updateGesamtwert();
    }      

    window.aktualisiereAllePreise = aktualisiereAllePreise;

    //Filtert die Tabellen-Einträge nach Input (Dex-Nr. oder Name)
    function searchTable() {
      let input = document.getElementById("search");
      let filter = input.value.toUpperCase();
      let table = document.getElementById("kartentabelle");
      let tr = table.getElementsByTagName("tr");

      for (let i = 1; i < tr.length; i++) {
        tr[i].style.display = "none";
        let td = tr[i].getElementsByTagName("td");
        for (let j = 0; j < td.length; j++) {
          let cell = td[j];
          if (cell && cell.innerHTML.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
            break;
          }
        }
      }

      updateEintragsAnzahl();
      updateKartenAnzahl();
      updateGesamtwert();
    }

    window.searchTable = searchTable; // wichtig, sonst geht onkeyup="search()" im HTML nicht!
    
    const filterStates = {
      reverse: "neutral", // kann sein: "neutral", "positive", "negative"
      holo: "neutral",
      v: "neutral",
      vmax: "neutral",
      ex: "neutral",
      shiny: "neutral"
    };

    function applyFilter() {
      const rows = document.querySelectorAll("#kartentabelle tbody tr");
    
      rows.forEach(row => {
        const container = row.querySelector("div[id^='kartenContainer_']");
        const cards = container.querySelectorAll("img");
    
        let hasReverse = false;
        let hasHolo = false;
        let hasV = false;
        let hasVMAX = false;
        let hasEX = false;
        let hasShiny = false;
    
        cards.forEach(img => {
          const cardId = img.alt;
          const card = window.cachedCards?.[cardId];
          if (!card) return;
    
          if (card.reverse == 1) hasReverse = true;
          if (card.holo == 1) hasHolo = true;
          if (card.subTypes?.toLowerCase().includes("v") || card.cardName?.toLowerCase().includes(" v")) hasV = true;
          if (card.subTypes?.toLowerCase().includes("vmax") || card.cardName?.toLowerCase().includes(" vmax") || 
              card.subTypes?.toLowerCase().includes("vstar") || card.cardName?.toLowerCase().includes(" vstar")) hasVMAX = true;
          if (card.subTypes?.toLowerCase().includes("ex") || card.cardName?.toLowerCase().includes(" ex")) hasEX = true;
          if (card.subTypes?.toLowerCase().includes("radiant") || card.rarity?.toLowerCase().includes("shiny")) hasShiny = true;

        });
    
        let show = true;
    
        // Reverse-Filter prüfen
        if (filterStates.reverse === "positive" && !hasReverse) show = false;
        if (filterStates.reverse === "negative" && hasReverse) show = false;
    
        // Holo-Filter prüfen
        if (filterStates.holo === "positive" && !hasHolo) show = false;
        if (filterStates.holo === "negative" && hasHolo) show = false;

        // V-Filter prüfen
        if (filterStates.v === "positive" && !hasV) show = false;
        if (filterStates.v === "negative" && hasV) show = false;

        // VMAX-Filter prüfen
        if (filterStates.vmax === "positive" && !hasVMAX) show = false;
        if (filterStates.vmax === "negative" && hasVMAX) show = false;

        // Ex-Filter prüfen
        if (filterStates.ex === "positive" && !hasEX) show = false;
        if (filterStates.ex === "negative" && hasEX) show = false;

        // Shiny-Filter prüfen
        if (filterStates.shiny === "positive" && !hasShiny) show = false;
        if (filterStates.shiny === "negative" && hasShiny) show = false;
    
        row.style.display = show ? "" : "none";
      });
    
      updateEintragsAnzahl();
      updateKartenAnzahl();
      updateGesamtwert();
    }
    
    function toggleFilter(type) {
      // Toggle durch die drei Zustände
      if (filterStates[type] === "neutral") {
        filterStates[type] = "positive";
      } else if (filterStates[type] === "positive") {
        filterStates[type] = "negative";
      } else {
        filterStates[type] = "neutral";
      }
    
      applyFilter();
      updateNavStyles();
    }

    function updateNavStyles() {
      const reverseBtn = document.getElementById("filter-reverse");
      const holoBtn = document.getElementById("filter-holo");
      const vBtn = document.getElementById("filter-v");
      const vmaxBtn = document.getElementById("filter-vmax");
      const exBtn = document.getElementById("filter-ex");
      const shinyBtn = document.getElementById("filter-shiny");
    
      reverseBtn.className = filterStates.reverse === "positive"
        ? "active-positive"
        : filterStates.reverse === "negative"
        ? "active-negative"
        : "";
    
      holoBtn.className = filterStates.holo === "positive"
        ? "active-positive"
        : filterStates.holo === "negative"
        ? "active-negative"
        : "";
    
      vBtn.className = filterStates.v === "positive"
        ? "active-positive"
        : filterStates.v === "negative"
        ? "active-negative"
        : "";
    
      vmaxBtn.className = filterStates.vmax === "positive"
        ? "active-positive"
        : filterStates.vmax === "negative"
        ? "active-negative"
        : "";
    
      exBtn.className = filterStates.ex === "positive"
        ? "active-positive"
        : filterStates.ex === "negative"
        ? "active-negative"
        : "";
    
      shinyBtn.className = filterStates.shiny === "positive"
        ? "active-positive"
        : filterStates.shiny === "negative"
        ? "active-negative"
        : "";
    }

    document.getElementById("filter-alle").addEventListener("click", (e) => {
      e.preventDefault();
      filterStates.reverse = "neutral";
      filterStates.holo = "neutral";
      filterStates.v = "neutral";
      filterStates.vmax = "neutral";
      filterStates.ex = "neutral";
      filterStates.shiny = "neutral";
      applyFilter();
      updateNavStyles();
    });
    
    document.getElementById("filter-reverse").addEventListener("click", (e) => {
      e.preventDefault();
      toggleFilter("reverse");
    });
    
    document.getElementById("filter-holo").addEventListener("click", (e) => {
      e.preventDefault();
      toggleFilter("holo");
    });

    document.getElementById("filter-v").addEventListener("click", (e) => {
      e.preventDefault();
      toggleFilter("v");
    });

    document.getElementById("filter-vmax").addEventListener("click", (e) => {
      e.preventDefault();
      toggleFilter("vmax");
    });

    document.getElementById("filter-ex").addEventListener("click", (e) => {
      e.preventDefault();
      toggleFilter("ex");
    });

    document.getElementById("filter-shiny").addEventListener("click", (e) => {
      e.preventDefault();
      toggleFilter("shiny");
    });

    window.zeigePokemonTabelle = function () {
      document.getElementById("kartentabelle").classList.remove("hidden");
      document.getElementById("trainertabelle").classList.add("hidden");
      document.getElementById("energietabelle").classList.add("hidden");
    };
    
    window.zeigeTrainerTabelle = async function () {
      document.getElementById("kartentabelle").classList.add("hidden");
      document.getElementById("trainertabelle").classList.remove("hidden");
      document.getElementById("energietabelle").classList.add("hidden");
    
      const tbody = document.querySelector("#trainertabelle tbody");
      tbody.innerHTML = "";
    
      const trSupporter = document.createElement("tr");
      trSupporter.innerHTML = `
        <td>Unterstützer</td>
        <td>
          <div id="supporterContainer" style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px;"></div>
          <button onclick="openTrainerOverlay('Supporter')">+ Unterstützer</button>
        </td>
      `;
      tbody.appendChild(trSupporter);

      const trItem = document.createElement("tr");
      trItem.innerHTML = `
        <td>Item</td>
        <td>
          <div id="itemContainer" style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px;"></div>
          <button onclick="openTrainerOverlay('Item')">+ Item</button>
        </td>
      `;
      tbody.appendChild(trItem);

      const trStadium = document.createElement("tr");
      trStadium.innerHTML = `
        <td>Stadion</td>
        <td>
          <div id="stadiumContainer" style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px;"></div>
          <button onclick="openTrainerOverlay('Stadium')">+ Stadion</button>
        </td>
      `;
      tbody.appendChild(trStadium);

      const trTool = document.createElement("tr");
      trTool.innerHTML = `
        <td>Ausrüstung</td>
        <td>
          <div id="toolContainer" style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px;"></div>
          <button onclick="openTrainerOverlay('Tool')">+ Ausrüstung</button>
        </td>
      `;
      tbody.appendChild(trTool);
    
      await loadTrainerCards();
    };

    async function loadTrainerCards() {
      const supporterContainer = document.getElementById("supporterContainer");
      const itemContainer = document.getElementById("itemContainer");
      const stadiumContainer = document.getElementById("stadiumContainer");
      const toolContainer = document.getElementById("toolContainer");
      
      const trainers = await getTrainers();
    
      if (!trainers || !Array.isArray(trainers)) {
        console.error("getTrainers() lieferte keine gültige Liste:", trainers);
        return;
      }
    
      trainers.sort((a, b) => (b.avg30 || 0) - (a.avg30 || 0));
    
      const supporterFragment = document.createDocumentFragment();
      const itemFragment = document.createDocumentFragment();
      const stadiumFragment = document.createDocumentFragment();
      const toolFragment = document.createDocumentFragment();
      
      for (const trainer of trainers) {
        window.cachedCards[trainer.cardId] = trainer;
    
        const img = document.createElement("img");
        img.src = trainer.imageLow;
        img.alt = trainer.cardId;
        img.style.width = "50px";
        img.style.height = "69px";
        img.style.objectFit = "cover";
        const subtype = trainer.subTypes?.toLowerCase() || "";
        img.addEventListener("click", () => openTrainerCardGallery(trainer.id, subtype));

        if (trainer.subTypes?.toLowerCase().includes("supporter")) supporterFragment.appendChild(img);
        else if (trainer.subTypes?.toLowerCase().includes("item")) itemFragment.appendChild(img);
        else if (trainer.subTypes?.toLowerCase().includes("stadium")) stadiumFragment.appendChild(img);
        else if (trainer.subTypes?.toLowerCase().includes("tool")) toolFragment.appendChild(img);
      }
    
      supporterContainer.appendChild(supporterFragment);
      itemContainer.appendChild(itemFragment);
      stadiumContainer.appendChild(stadiumFragment);
      toolContainer.appendChild(toolFragment);
      
    } 

    window.openTrainerOverlay = async function (subType) {
      const overlayElement = document.querySelector("#overlay");
    
      // Ladeanzeige
      overlayElement.innerHTML = `
        <div id="overlayContent">
          <h2>Bitte warten...</h2>
          <p>Karten werden geladen</p>
          <div class="loader"></div>
        </div>
      `;

      overlayElement.classList.remove("hidden");
      overlayElement.classList.add("shown");
    
      try {
        
        let cards = window.cachedTrainerCardsByType[subType];
        if (!cards) {
          cards = await fetchAllTrainerCards(subType);
          if (cards) {
            window.cachedTrainerCardsByType[subType] = cards;
          }
        }

        if (!cards || cards.length === 0) {
          overlayElement.innerHTML = `
            <div id='overlayContent'>
              <h2>Keine Karten gefunden.</h2> 
              <button class="overlayMenuBtn" id="BackBtn">Schließen</button>
            </div>
          `;
          document.getElementById("BackBtn").addEventListener("click", () => {
            overlayElement.classList.add("hidden");
            overlayElement.classList.remove("shown");
            overlayElement.innerHTML = "";
          });
          return;
        }
    
        let html = `
          <div id="overlayContent">
            <button class="closeGallery" id="BackBtn">X</button>
            <h2>Kartenauswahl für<br><strong>${subType}</strong>:</h2>
            <p>
              Welche Karte möchtest du hinzufügen?<br>
              <input type="text" id="nummerSuche" placeholder="Kartennummer eingeben…" onkeyup="filterTrainerCardsByNumber()">
            </p>
            <div class="kartenGrid">
        `;
    
        for (const card of cards) {
          const wert30d = card.avg30;
          let preisText = "–";
    
          if (wert30d != null) {
            const wert = wert30d.toFixed(2);
            let farbe = "#DEDEDE";
            let symbol = "🪙";
            if (wert30d > 20) {
              farbe = "#FF4444";
              symbol = "🔥";
            } else if (wert30d > 5) {
              farbe = "#FFAA00";
              symbol = "💰";
            }
    
            preisText = `<span style="color:${farbe}; font-size:14px;">${symbol} ${wert}€</span>`;
          }
    
          const nummer = card.id.split("-")[1]; // z. B. "123"

          html += `
            <div class="kartenItem" data-id="${card.id}" data-number="${nummer}" onclick="trainerKarteAuswählen('${card.id}')">
              <div>ID: ${card.id}</div>
              <img src="${card.images.small}" alt="${card.name}">
              <div>${preisText}</div>
            </div>
          `;

        }
    
        html += `
            </div>
          </div>
        `;
        overlayElement.innerHTML = html;
    
        document.getElementById("BackBtn").addEventListener("click", () => {
          overlayElement.classList.add("hidden");
          overlayElement.classList.remove("shown");
          overlayElement.innerHTML = "";
        });
    
      } catch (error) {
        console.error(error);
        overlayElement.innerHTML = `
          <div id='overlayContent'>
            <h2>Fehler beim Laden.</h2>
            <button class="overlayMenuBtn" id="BackBtn">Schließen</button>
          </div>`;
        document.getElementById("BackBtn").addEventListener("click", () => {
          overlayElement.classList.add("hidden");
          overlayElement.classList.remove("shown");
          overlayElement.innerHTML = "";
        });
      }
    };

    async function fetchAllTrainerCards(subtype) {
      let allCards = [];
      let page = 1;
      let pageSize = 250;
      let more = true;
    
      while (more) {
        const url = `https://api.pokemontcg.io/v2/cards?q=supertype:Trainer subtypes:${subtype}&orderBy=name&page=${page}&pageSize=${pageSize}`;
    
        const response = await Http.get({
          url,
          headers: {
            'Accept': 'application/json',
            'X-Api-Key': config.API_KEY,
            'Connection': 'close'
          }
        });
    
        if (response.status !== 200 || !response.data?.data?.length) {
          more = false;
          break;
        }
    
        const cards = response.data.data;
    
        // Optional: avg30 ermitteln
        for (const card of cards) {
          const prices = card.cardmarket?.prices;
          card.avg30 = prices?.avg30 ?? null;
        }
    
        allCards = allCards.concat(cards);
    
        // Wenn weniger als pageSize zurückkam → keine weiteren Seiten
        if (cards.length < pageSize) {
          more = false;
        } else {
          page++;
        }
      }
    
      return allCards;
    }

    window.trainerKarteAuswählen = async function (cardId) {
      const overlayElement = document.querySelector("#overlay");
    
      overlayElement.innerHTML = `<div id="overlayContent"><div class="loader"></div></div>`;
      overlayElement.classList.remove("hidden");
      overlayElement.classList.add("shown");
    
      try {
        const response = await Http.get({
          url: `https://api.pokemontcg.io/v2/cards/${cardId}`,
          headers: {
            'Accept': 'application/json',
            'X-Api-Key': config.API_KEY,
            'Connection': 'close'
          }
        });
    
        if (response.status !== 200) {
          console.error("Fehler beim Abrufen der Karte:", response.status, response);
          return;
        }
    
        const cardData = response.data.data;
        cardData.imageSmall = cardData.images?.small || null;
        cardData.imageLarge = cardData.images?.large || null;
    
        const trainerDbId = await insertTrainer(cardData);
        if (!trainerDbId) {
          console.error("Keine ID von insertCard erhalten – Abbruch.");
          return;
        }

        cardData.id = trainerDbId;
        window.cachedCards[cardData.cardId] = cardData; 
    
        // Schritt 1: Auswahl der Variante
        overlayElement.innerHTML = `
          <div id="overlayContent">
            <h2>Karte hinzugefügt!</h2>
            <p>Du hast <strong>${cardId}</strong> ausgewählt.</p>
            <br>
            <p>Welche Variante möchtest du speichern?</p>
            <button class="overlayMenuBtn" id="btnBasic">Basic</button>
            <button class="overlayMenuBtn" id="btnReverse">Reverse</button>
            <button class="overlayMenuBtn" id="btnHolo">Holo</button>
            <br><br>
            <button class="overlayMenuBtn" id="closeOverlayConfirm">Überspringen</button>
          </div>
        `;
    
        async function finalizeTrainerSelection(variantType, trainerDbId) {        
          overlayElement.innerHTML = `<div id="overlayContent"><div class="loader"></div></div>`;
          overlayElement.classList.remove("hidden");
          overlayElement.classList.add("shown");
        
          try {
            if (variantType !== "none") {
              await db.run(`UPDATE trainer SET ${variantType} = 1 WHERE id = ?`, [trainerDbId]);
            }
        
            const supporterContainer = document.getElementById("supporterContainer");
            supporterContainer.innerHTML = "";
            const itemContainer = document.getElementById("itemContainer");
            itemContainer.innerHTML = "";
            const stadiumContainer = document.getElementById("stadiumContainer");
            stadiumContainer.innerHTML = "";
            const toolContainer = document.getElementById("toolContainer");
            toolContainer.innerHTML = "";
            await loadTrainerCards();
        
          } catch (e) {
            console.error("Fehler in finalizeTrainerSelection:", e.message, e);
          }
        
          overlayElement.classList.add("hidden");
          overlayElement.classList.remove("shown");
          overlayElement.innerHTML = "";
          await updateGesamtwert(); 
        }        
    
        document.getElementById("btnBasic").addEventListener("click", () => finalizeTrainerSelection("basic", trainerDbId));
        document.getElementById("btnReverse").addEventListener("click", () => finalizeTrainerSelection("reverse", trainerDbId));
        document.getElementById("btnHolo").addEventListener("click", () => finalizeTrainerSelection("holo", trainerDbId));
        document.getElementById("closeOverlayConfirm").addEventListener("click", () => finalizeTrainerSelection("none", trainerDbId));
    
      } catch (error) {
        console.error("Fehler bei trainerKarteAuswählen:", error);
        overlayElement.innerHTML = `
          <div id="overlayContent">
            <h2>Fehler beim Hinzufügen.</h2>
            <p>${error.message}</p>
            <button class="overlayMenuBtn" id="closeOverlayConfirm">Schließen</button>
          </div>
        `;
        document.getElementById("closeOverlayConfirm").addEventListener("click", () => {
          overlayElement.classList.add("hidden");
          overlayElement.classList.remove("shown");
          overlayElement.innerHTML = "";
        });
      }
    };

    async function openTrainerCardGallery(startId, filterSubType) {
      const overlayElement = document.querySelector("#overlay");
      overlayElement.innerHTML = `<div id="overlayContent"><div class="loader"></div></div>`;
      overlayElement.classList.remove("hidden");
      overlayElement.classList.add("shown");
    
      let allIds = await getTrainerCardIds(); // Array von DB-IDs (nicht cardId!)
      if (!allIds || !allIds.length) return;
    
      // Filter nach Subtyp: basic oder special
      const filteredIds = [];
      const idMap = {}; // ID → Daten
    
      for (const id of allIds) {
        const card = await getTrainerById(id);
        if (!card) continue;
    
        const subtype = card.subTypes?.toLowerCase() || "";
        const match = (filterSubType === "supporter" && subtype.includes("supporter")) ||
                      (filterSubType === "item" && subtype.includes("item")) ||
                      (filterSubType === "stadium" && subtype.includes("stadium")) ||
                      (filterSubType === "tool" && subtype.includes("tool"));
    
        if (match) {
          filteredIds.push(id);
          idMap[id] = card;
        }
      }
    
      if (!filteredIds.length) {
        overlayElement.classList.add("hidden");
        overlayElement.classList.remove("shown");
        return;
      }
    
      let currentIndex = filteredIds.findIndex(id => id === startId);
      if (currentIndex === -1) currentIndex = 0;
    
      async function showTrainerCard() {
        const id = filteredIds[currentIndex];
        const card = idMap[id] || await getTrainerById(id);
    
        if (!card) return;
    
        let hinzugefügtAm = "Unbekannt";
        if (card.addedAt) {
          const datum = new Date(card.addedAt);
          hinzugefügtAm = datum.toLocaleString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
        }
    
        let variante = "Keine Angabe";
        if (card.basic == 1) variante = "Basic";
        if (card.reverse == 1) variante = "Reverse";
        if (card.holo == 1) variante = "Holo";
    
        let preisText = "–";
        let wert30d = await fetchPrice(card.cardId);
        if (wert30d == null) {
          const cleanedId = cleanCardId(card.cardId);
          wert30d = await fetchPrice(cleanedId);
        }
    
        if (wert30d != null) {
          const wert = wert30d.toFixed(2);
          let farbe = "#DEDEDE", symbol = "🪙";
          if (wert30d > 20) { farbe = "#FF4444"; symbol = "🔥"; }
          else if (wert30d > 5) { farbe = "#FFAA00"; symbol = "💰"; }
          preisText = `<span style="color:${farbe};">${symbol} ${wert}€</span>`;
        }
    
        overlayElement.innerHTML = `
          <div id="overlayContent">
            <button class="closeGallery" id="closeGallery">X</button>
            <h2>Trainer-Karte ansehen</h2>
            <div style="display:flex; align-items:center; justify-content:center;">
              <div style="display:flex; flex-direction:column; align-items:center;">
                <img src="${card.imageHigh}" alt="${id}" style="max-width:300px; max-height:400px; margin:0 20px;">
                <p style="margin-top:10px;">
                  ID: ${card.cardId} | Variante: <strong>${variante}</strong><br>
                  30d-Wert: <strong>${preisText}</strong><br>
                  Hinzugefügt am: <strong>${hinzugefügtAm}</strong>
                </p>
              </div>
            </div>
            <button id="prevTrainer">⬅️</button>
            <button id="nextTrainer">➡️</button>
            <br><br>
            <button id="deleteTrainer">❌ Karte löschen</button>
          </div>
        `;
    
        document.getElementById("prevTrainer").addEventListener("click", () => {
          currentIndex = (currentIndex - 1 + filteredIds.length) % filteredIds.length;
          showTrainerCard();
        });
    
        document.getElementById("nextTrainer").addEventListener("click", () => {
          currentIndex = (currentIndex + 1) % filteredIds.length;
          showTrainerCard();
        });
    
        document.getElementById("deleteTrainer").addEventListener("click", async () => {
          if (confirm("Willst du diese Karte wirklich löschen?")) {
            await db.run(`DELETE FROM trainer WHERE id = ?`, [id]);
        
            // Overlay schließen
            overlayElement.classList.add("hidden");
            overlayElement.classList.remove("shown");
            overlayElement.innerHTML = "";
        
            // Tabelle neu laden
            const supporterContainer = document.getElementById("supporterContainer");
            const itemContainer = document.getElementById("itemContainer");
            const stadiumContainer = document.getElementById("stadiumContainer");
            const toolContainer = document.getElementById("toolContainer"); // optional, je nach Struktur
        
            if (supporterContainer) supporterContainer.innerHTML = "";
            if (itemContainer) itemContainer.innerHTML = "";
            if (stadiumContainer) stadiumContainer.innerHTML = "";
            if (toolContainer) toolContainer.innerHTML = "";
        
            await loadTrainerCards();
            await updateGesamtwert();
          }
        });              
    
        document.getElementById("closeGallery").addEventListener("click", () => {
          overlayElement.classList.add("hidden");
          overlayElement.classList.remove("shown");
          overlayElement.innerHTML = "";
        });
      }
    
      showTrainerCard();
    }    

    window.filterTrainerCardsByNumber = function () {
      const value = document.getElementById("nummerSuche").value.trim();
      document.querySelectorAll(".kartenItem").forEach(item => {
        const number = item.dataset.number;
        item.style.display = number && number.startsWith(value) ? "block" : "none";
      });
    }; 
    
    window.zeigeEnergieTabelle = async function () {
      document.getElementById("kartentabelle").classList.add("hidden");
      document.getElementById("trainertabelle").classList.add("hidden");
      document.getElementById("energietabelle").classList.remove("hidden");
    
      const tbody = document.querySelector("#energietabelle tbody");
      tbody.innerHTML = "";
    
      const trBasis = document.createElement("tr");
      trBasis.innerHTML = `
        <td>Basis-Energie</td>
        <td>
          <div id="basisEnergieContainer" style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px;"></div>
          <button onclick="openEnergieOverlay('Basic')">+ Basis</button>
        </td>
      `;
      tbody.appendChild(trBasis);

      const trSpezial = document.createElement("tr");
      trSpezial.innerHTML = `
        <td>Spezial-Energie</td>
        <td>
          <div id="spezialEnergieContainer" style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px;"></div>
          <button onclick="openEnergieOverlay('Special')">+ Spezial</button>
        </td>
      `;
      tbody.appendChild(trSpezial);
    
      await loadEnergieCards();
    };

    async function loadEnergieCards() {
      const basicContainer = document.getElementById("basisEnergieContainer");
      const specialContainer = document.getElementById("spezialEnergieContainer");
    
      const energies = await getEnergies();
    
      if (!energies || !Array.isArray(energies)) {
        console.error("getEnergies() lieferte keine gültige Liste:", energies);
        return;
      }
    
      energies.sort((a, b) => (b.avg30 || 0) - (a.avg30 || 0));
    
      const basicFragment = document.createDocumentFragment();
      const specialFragment = document.createDocumentFragment();
    
      for (const energie of energies) {
        window.cachedCards[energie.cardId] = energie;
    
        const img = document.createElement("img");
        img.src = energie.imageLow;
        img.alt = energie.cardId;
        img.style.width = "50px";
        img.style.height = "69px";
        img.style.objectFit = "cover";
        const subtype = energie.subTypes?.toLowerCase() || "";
        img.addEventListener("click", () => openEnergieCardGallery(energie.id, subtype.includes("basic") ? "basic" : "special"));

        if (energie.subTypes?.toLowerCase().includes("basic")) basicFragment.appendChild(img);
        else if (energie.subTypes?.toLowerCase().includes("special")) specialFragment.appendChild(img);
      }
    
      basicContainer.appendChild(basicFragment);
      specialContainer.appendChild(specialFragment);
      
    } 

    window.openEnergieOverlay = async function (subType) {
      const overlayElement = document.querySelector("#overlay");
    
      // Ladeanzeige
      overlayElement.innerHTML = `
        <div id="overlayContent">
          <h2>Bitte warten...</h2>
          <p>Karten werden geladen</p>
          <div class="loader"></div>
        </div>
      `;

      overlayElement.classList.remove("hidden");
      overlayElement.classList.add("shown");
    
      try {

        let cards = window.cachedEnergyCardsByType[subType];
        if (!cards) {
          cards = await fetchAllEnergieCards(subType);
          if (cards) {
            window.cachedEnergyCardsByType[subType] = cards;
          }
        }

        if (!cards || cards.length === 0) {
          overlayElement.innerHTML = `
            <div id='overlayContent'>
              <h2>Keine Karten gefunden.</h2> 
              <button class="overlayMenuBtn" id="BackBtn">Schließen</button>
            </div>
          `;
          document.getElementById("BackBtn").addEventListener("click", () => {
            overlayElement.classList.add("hidden");
            overlayElement.classList.remove("shown");
            overlayElement.innerHTML = "";
          });
          return;
        }
    
        let html = `
          <div id="overlayContent">
            <button class="closeGallery" id="BackBtn">X</button>
            <h2>Kartenauswahl für<br><strong>${subType}</strong>:</h2>
            <p>
              Welche Karte möchtest du hinzufügen?<br>
              <input type="text" id="nummerSuche" placeholder="Kartennummer eingeben…" onkeyup="filterEnergieCardsByNumber()">
            </p>
            <div class="kartenGrid">
        `;
    
        for (const card of cards) {
          const wert30d = card.avg30;
          let preisText = "–";
    
          if (wert30d != null) {
            const wert = wert30d.toFixed(2);
            let farbe = "#DEDEDE";
            let symbol = "🪙";
            if (wert30d > 20) {
              farbe = "#FF4444";
              symbol = "🔥";
            } else if (wert30d > 5) {
              farbe = "#FFAA00";
              symbol = "💰";
            }
    
            preisText = `<span style="color:${farbe}; font-size:14px;">${symbol} ${wert}€</span>`;
          }
    
          const nummer = card.id.split("-")[1]; // z. B. "123"

          html += `
            <div class="kartenItem" data-id="${card.id}" data-number="${nummer}" onclick="energieKarteAuswählen('${card.id}')">
              <div>ID: ${card.id}</div>
              <img src="${card.images.small}" alt="${card.name}">
              <div>${preisText}</div>
            </div>
          `;

        }
    
        html += `
            </div>
          </div>
        `;
        overlayElement.innerHTML = html;
    
        document.getElementById("BackBtn").addEventListener("click", () => {
          overlayElement.classList.add("hidden");
          overlayElement.classList.remove("shown");
          overlayElement.innerHTML = "";
        });
    
      } catch (error) {
        console.error(error);
        overlayElement.innerHTML = `
          <div id='overlayContent'>
            <h2>Fehler beim Laden.</h2>
            <button class="overlayMenuBtn" id="BackBtn">Schließen</button>
          </div>`;
        document.getElementById("BackBtn").addEventListener("click", () => {
          overlayElement.classList.add("hidden");
          overlayElement.classList.remove("shown");
          overlayElement.innerHTML = "";
        });
      }
    };

    async function fetchAllEnergieCards(subtype) {
      let allCards = [];
      let page = 1;
      let pageSize = 250;
      let more = true;
    
      while (more) {
        const url = `https://api.pokemontcg.io/v2/cards?q=supertype:Energy subtypes:${subtype}&orderBy=name&page=${page}&pageSize=${pageSize}`;
    
        const response = await Http.get({
          url,
          headers: {
            'Accept': 'application/json',
            'X-Api-Key': config.API_KEY,
            'Connection': 'close'
          }
        });
    
        if (response.status !== 200 || !response.data?.data?.length) {
          more = false;
          break;
        }
    
        const cards = response.data.data;
    
        // Optional: avg30 ermitteln
        for (const card of cards) {
          const prices = card.cardmarket?.prices;
          card.avg30 = prices?.avg30 ?? null;
        }
    
        allCards = allCards.concat(cards);
    
        // Wenn weniger als pageSize zurückkam → keine weiteren Seiten
        if (cards.length < pageSize) {
          more = false;
        } else {
          page++;
        }
      }
    
      return allCards;
    }

    window.energieKarteAuswählen = async function (cardId) {
      const overlayElement = document.querySelector("#overlay");
    
      overlayElement.innerHTML = `<div id="overlayContent"><div class="loader"></div></div>`;
      overlayElement.classList.remove("hidden");
      overlayElement.classList.add("shown");
    
      try {
        const response = await Http.get({
          url: `https://api.pokemontcg.io/v2/cards/${cardId}`,
          headers: {
            'Accept': 'application/json',
            'X-Api-Key': config.API_KEY,
            'Connection': 'close'
          }
        });
    
        if (response.status !== 200) {
          console.error("Fehler beim Abrufen der Karte:", response.status, response);
          return;
        }
    
        const cardData = response.data.data;
        cardData.imageSmall = cardData.images?.small || null;
        cardData.imageLarge = cardData.images?.large || null;
    
        const energieDbId = await insertEnergie(cardData);
        if (!energieDbId) {
          console.error("Keine ID von insertCard erhalten – Abbruch.");
          return;
        }

        cardData.id = energieDbId;
        window.cachedCards[cardData.cardId] = cardData; 
    
        // Schritt 1: Auswahl der Variante
        overlayElement.innerHTML = `
          <div id="overlayContent">
            <h2>Karte hinzugefügt!</h2>
            <p>Du hast <strong>${cardId}</strong> ausgewählt.</p>
            <br>
            <p>Welche Variante möchtest du speichern?</p>
            <button class="overlayMenuBtn" id="btnBasic">Basic</button>
            <button class="overlayMenuBtn" id="btnReverse">Reverse</button>
            <button class="overlayMenuBtn" id="btnHolo">Holo</button>
            <br><br>
            <button class="overlayMenuBtn" id="closeOverlayConfirm">Überspringen</button>
          </div>
        `;
    
        async function finalizeEnergieSelection(variantType, energieDbId) {        
          overlayElement.innerHTML = `<div id="overlayContent"><div class="loader"></div></div>`;
          overlayElement.classList.remove("hidden");
          overlayElement.classList.add("shown");
        
          try {
            if (variantType !== "none") {
              await db.run(`UPDATE energy SET ${variantType} = 1 WHERE id = ?`, [energieDbId]);
            }
        
            const basisContainer = document.getElementById("basisEnergieContainer");
            basisContainer.innerHTML = "";
            const spezialContainer = document.getElementById("spezialEnergieContainer");
            spezialContainer.innerHTML = "";
            await loadEnergieCards();
        
          } catch (e) {
            console.error("Fehler in finalizeEnergieSelection:", e.message, e);
          }
        
          overlayElement.classList.add("hidden");
          overlayElement.classList.remove("shown");
          overlayElement.innerHTML = "";
          await updateGesamtwert(); 
        }        
    
        document.getElementById("btnBasic").addEventListener("click", () => finalizeEnergieSelection("basic", energieDbId));
        document.getElementById("btnReverse").addEventListener("click", () => finalizeEnergieSelection("reverse", energieDbId));
        document.getElementById("btnHolo").addEventListener("click", () => finalizeEnergieSelection("holo", energieDbId));
        document.getElementById("closeOverlayConfirm").addEventListener("click", () => finalizeEnergieSelection("none", energieDbId));
    
      } catch (error) {
        console.error("Fehler bei energieKarteAuswählen:", error);
        overlayElement.innerHTML = `
          <div id="overlayContent">
            <h2>Fehler beim Hinzufügen.</h2>
            <p>${error.message}</p>
            <button class="overlayMenuBtn" id="closeOverlayConfirm">Schließen</button>
          </div>
        `;
        document.getElementById("closeOverlayConfirm").addEventListener("click", () => {
          overlayElement.classList.add("hidden");
          overlayElement.classList.remove("shown");
          overlayElement.innerHTML = "";
        });
      }
    };

    async function openEnergieCardGallery(startId, filterSubType) {
      const overlayElement = document.querySelector("#overlay");
      overlayElement.innerHTML = `<div id="overlayContent"><div class="loader"></div></div>`;
      overlayElement.classList.remove("hidden");
      overlayElement.classList.add("shown");
    
      let allIds = await getEnergieCardIds(); // Array von DB-IDs (nicht cardId!)
      if (!allIds || !allIds.length) return;
    
      // Filter nach Subtyp: basic oder special
      const filteredIds = [];
      const idMap = {}; // ID → Daten
    
      for (const id of allIds) {
        const card = await getEnergieById(id);
        if (!card) continue;
    
        const subtype = card.subTypes?.toLowerCase() || "";
        const match = (filterSubType === "basic" && subtype.includes("basic")) ||
                      (filterSubType === "special" && subtype.includes("special"));
    
        if (match) {
          filteredIds.push(id);
          idMap[id] = card;
        }
      }
    
      if (!filteredIds.length) {
        overlayElement.classList.add("hidden");
        overlayElement.classList.remove("shown");
        return;
      }
    
      let currentIndex = filteredIds.findIndex(id => id === startId);
      if (currentIndex === -1) currentIndex = 0;
    
      async function showEnergieCard() {
        const id = filteredIds[currentIndex];
        const card = idMap[id] || await getEnergieById(id);
    
        if (!card) return;
    
        let hinzugefügtAm = "Unbekannt";
        if (card.addedAt) {
          const datum = new Date(card.addedAt);
          hinzugefügtAm = datum.toLocaleString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
        }
    
        let variante = "Keine Angabe";
        if (card.basic == 1) variante = "Basic";
        if (card.reverse == 1) variante = "Reverse";
        if (card.holo == 1) variante = "Holo";
    
        let preisText = "–";
        let wert30d = await fetchPrice(card.cardId);
        if (wert30d == null) {
          const cleanedId = cleanCardId(card.cardId);
          wert30d = await fetchPrice(cleanedId);
        }
    
        if (wert30d != null) {
          const wert = wert30d.toFixed(2);
          let farbe = "#DEDEDE", symbol = "🪙";
          if (wert30d > 20) { farbe = "#FF4444"; symbol = "🔥"; }
          else if (wert30d > 5) { farbe = "#FFAA00"; symbol = "💰"; }
          preisText = `<span style="color:${farbe};">${symbol} ${wert}€</span>`;
        }
    
        overlayElement.innerHTML = `
          <div id="overlayContent">
            <button class="closeGallery" id="closeGallery">X</button>
            <h2>Energie-Karte ansehen</h2>
            <div style="display:flex; align-items:center; justify-content:center;">
              <div style="display:flex; flex-direction:column; align-items:center;">
                <img src="${card.imageHigh}" alt="${id}" style="max-width:300px; max-height:400px; margin:0 20px;">
                <p style="margin-top:10px;">
                  ID: ${card.cardId} | Variante: <strong>${variante}</strong><br>
                  30d-Wert: <strong>${preisText}</strong><br>
                  Hinzugefügt am: <strong>${hinzugefügtAm}</strong>
                </p>
              </div>
            </div>
            <button id="prevEnergie">⬅️</button>
            <button id="nextEnergie">➡️</button>
            <br><br>
            <button id="deleteEnergie">❌ Karte löschen</button>
          </div>
        `;
    
        document.getElementById("prevEnergie").addEventListener("click", () => {
          currentIndex = (currentIndex - 1 + filteredIds.length) % filteredIds.length;
          showEnergieCard();
        });
    
        document.getElementById("nextEnergie").addEventListener("click", () => {
          currentIndex = (currentIndex + 1) % filteredIds.length;
          showEnergieCard();
        });
    
        document.getElementById("deleteEnergie").addEventListener("click", async () => {
          if (confirm("Willst du diese Karte wirklich löschen?")) {
            try {
              await db.run(`DELETE FROM energy WHERE id = ?`, [id]);
        
              // Overlay schließen
              overlayElement.classList.add("hidden");
              overlayElement.classList.remove("shown");
              overlayElement.innerHTML = "";
        
              // Tabelle neu aufbauen
              const basicContainer = document.getElementById("basisEnergieContainer");
              const spezialContainer = document.getElementById("spezialEnergieContainer");
              if (basicContainer) basicContainer.innerHTML = "";
              if (spezialContainer) spezialContainer.innerHTML = "";
              await loadEnergieCards();
              await updateGesamtwert();
        
            } catch (err) {
              console.error("Fehler beim Löschen der Energie-Karte:", err);
              alert("Beim Löschen ist ein Fehler aufgetreten.");
            }
          }
        });               
    
        document.getElementById("closeGallery").addEventListener("click", () => {
          overlayElement.classList.add("hidden");
          overlayElement.classList.remove("shown");
          overlayElement.innerHTML = "";
        });
      }
    
      showEnergieCard();
    }    

    window.filterEnergieCardsByNumber = function () {
      const value = document.getElementById("nummerSuche").value.trim();
      document.querySelectorAll(".kartenItem").forEach(item => {
        const number = item.dataset.number;
        item.style.display = number && number.startsWith(value) ? "block" : "none";
      });
    }; 

    /* async function updateCardNameForExistingCards() {
      const { values: cards } = await db.query("SELECT id, cardId FROM cards WHERE cardName IS NULL OR cardName = ''");
    
      for (const card of cards) {
        try {
          const response = await Http.get({
            url: `https://api.tcgdex.net/v2/en/cards/${card.cardId}`,
            headers: { 'Accept': 'application/json' }
          });
    
          if (response.status !== 200 || !response.data) {
            console.warn(`Keine Daten für Karte ${card.cardId}`);
            continue;
          }
    
          const cardName = response.data.name || null;
          await db.run(`UPDATE cards SET cardName = ? WHERE id = ?`, [cardName, card.id]);
    
        } catch (error) {
          console.error(`Fehler beim Aktualisieren von ${card.cardId}:`, error.message);
        }
      }
    
      console.log("cardName-Update abgeschlossen.");
    }
    
    updateCardNameForExistingCards(); */

  })();
});