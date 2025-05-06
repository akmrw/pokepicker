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
    const { initDatabase, getDaten, getName, getEngName, getCardIds, updateCardIds, insertCard, getCardById, getCardsByIds, updatePrice } = await import("./db-init.js");
    db = await initDatabase();

    //Tabelle definieren
    const data = await getDaten();
    const tbody = document.querySelector("#kartentabelle tbody");

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

    window.cachedCards = {};
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
      const percent = Math.round((current / total) * 100);
      const progressBar = document.getElementById("progressBar");
      const progressText = document.getElementById("progressText");
      if (progressBar) progressBar.style.width = percent + "%";
      if (progressText) progressText.textContent = percent + "%";

    } 

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
      const fragment = document.createDocumentFragment();

      for (const card of cards) {
        console.log("Geladene Karte:", card);  // DEBUG
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

        const cards = await fetchCards(engName);
    
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
          console.log("Response body:", response.data);
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
        console.log("Response body:", response.data);
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
    
      overlayElement.innerHTML = `
        <div id="overlayContent">
          <h2>Karte hinzugefügt!</h2>
          <p>Du hast <strong>${name}</strong> (${cardId}) ausgewählt.</p>
          <br>
          <button class="overlayMenuBtn" id="btnBasic">Basic</button>
          <button class="overlayMenuBtn" id="btnReverse">Reverse</button>
          <button class="overlayMenuBtn" id="btnHolo">Holo</button>
          <br><br>
          <button class="overlayMenuBtn" id="closeOverlayConfirm">OK</button>
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
        const img = document.createElement("img");
        img.src = cardData.images.small;
        img.alt = cardId;
        img.style.width = "50px";
        img.style.height = "69px";
        img.style.objectFit = "cover";
    
        img.addEventListener("click", async () => {
          const ids = (await getCardIds(dex)).split(";").filter(id => id.trim());
          openCardGallery(dex, ids.indexOf(cardDbId.toString()));
        });
    
        container.appendChild(img);
    
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
        const result = await db.query(`SELECT avg30 FROM cards WHERE avg30 IS NOT NULL`);
        let summe = 0;
    
        for (const row of result.values) {
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
      let aktualisiert = 0;
      let current = 0;
      let total = result.values.length;
    
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
    
      alert(`${aktualisiert} Preise wurden aktualisiert.`);
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

  })();
});