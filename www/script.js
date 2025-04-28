import { Http } from '@capacitor-community/http';

document.addEventListener("DOMContentLoaded", () => {
  (async () => {

    //Overlays definieren
    const overlay = document.getElementById("overlay");
    
    //SQLite-Datenbank-Initialisierung
    const { initDatabase, getDaten, getName, getEngName, getCardIds, updateCardIds } = await import("./db-init.js");
    const db = await initDatabase();
    const data = await getDaten();

    //Tabelle definieren
    const tbody = document.querySelector("#kartentabelle tbody");

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

      loadSavedCards(eintrag.dex);
      updateEintragsAnzahl();

    }

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

    async function loadSavedCards(dex) {
      const container = document.getElementById(`kartenContainer_${dex}`);
      let cardIds = await getCardIds(dex);
    
      if (!cardIds) return;
    
      const ids = cardIds.split(";").filter(id => id.trim() !== "");
    
      for (const id of ids) {
        try {
          const response = await Http.get({
            url: `https://api.tcgdex.net/v2/en/cards/${id}`,
            headers: { 'Accept': 'application/json' }
          });
    
          if (response.status !== 200) continue;
    
          const cardData = response.data;
          const img = document.createElement("img");
          img.src = cardData.image + "/low.webp";
          img.alt = id;
          img.style.width = "50px";
          img.style.height = "69px";
          img.style.objectFit = "cover";

          img.addEventListener("click", () => openCardGallery(dex, ids.indexOf(id)));
    
          container.appendChild(img);
    
        } catch (error) {
          console.error("Fehler beim Laden einer gespeicherten Karte:", error);
        }
      }
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
          const response = await Http.get({
            url: `https://api.tcgdex.net/v2/en/cards/${id}`,
            headers: { 'Accept': 'application/json' }
          });
    
          if (response.status !== 200) throw new Error();
    
          const cardData = response.data;
          overlayElement.innerHTML = `
            <div id="overlayContent">
              <h2>Karte ansehen</h2>
              <div style="display:flex; align-items:center; justify-content:center;">
                <button id="prevCard" style="font-size:24px;">⬅️</button>
                <img src="${cardData.image + '/low.webp'}" alt="${id}" style="max-width:200px; max-height:300px; margin:0 20px;">
                <button id="nextCard" style="font-size:24px;">➡️</button>
              </div>
              <br>
              <button id="deleteCard">❌ Karte löschen</button>
              <br><br>
              <button id="closeGallery">Schließen</button>
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
              ids.splice(currentIndex, 1);
              await updateCardIds(dex, ids.join(";") + ";");
              overlayElement.classList.add("hidden");
              overlayElement.classList.remove("shown");
              overlayElement.innerHTML = "";
              document.getElementById(`kartenContainer_${dex}`).innerHTML = "";
              loadSavedCards(dex);
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
        const engName = await getEngName(dex);
        const cards = await fetchCards(engName);
    
        if (!cards || cards.length === 0) {
          overlayElement.innerHTML = `
            <div id='overlayContent'>
              <h2>Keine Karten gefunden.</h2>
              <button class="overlayMenuBtn" id="BackBtn">Zurück</button>
            </div>
          `;

          document.getElementById("BackBtn").addEventListener("click", e => {
            e.preventDefault();
            openOverlay(dex);
          });

          return;
        }
    
        let html = `
          <div id="overlayContent">
            <h2>Kartenauswahl für ${name}:</h2>
            <p>Welche Karte möchtest du hinzufügen?</p>
            <div class="kartenGrid">
        `;
    
        cards.forEach(card => {
          html += `
            <div class="kartenItem" onclick="karteAuswählen('${card.id}', '${dex}', '${name}')">
              <img src="${card.image + '/low.webp'}" alt="${name}">
            </div>
          `;
        });
    
        html += `
            </div>
            <br><br>
            <button class="overlayMenuBtn" id="BackBtn">Zurück</button>
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
          <button class="overlayMenuBtn" id="BackBtn">Zurück</button>
        </div>`;

        document.getElementById("BackBtn").addEventListener("click", e => {
          e.preventDefault();
          overlayElement.classList.add("hidden");
          overlayElement.classList.remove("shown");
          overlayElement.innerHTML = "";
        });

      }
        
    };
  
    async function fetchCards(engName) {
      
      try {

        let url = `https://api.tcgdex.net/v2/en/cards?name=${engName}&image`;
        
        const response = await Http.get({
          url: url,
          headers: {
            'Accept': 'application/json',
            'Connection': 'close'
          }
        });
    
        if (response.status !== 200) {
          throw new Error(`Fehlerstatus: ${response.status}`);
        }
    
        const data = response.data; // Das fertige JSON
        return data;
        
      } catch (error) {
        console.error('Fehler beim Abrufen über HTTP:', error.message);
        return null;
      }
    }   

    window.karteAuswählen = async function (cardId, dex, name) {

      const overlayElement = document.querySelector("#overlay");
    
      overlayElement.innerHTML = `
        <div id="overlayContent">
          <h2>Karte hinzugefügt!</h2>
          <p>Du hast <strong>${name}</strong> (${cardId}) ausgewählt.</p>
          <br>
          <button class="overlayMenuBtn" id="closeOverlayConfirm">OK</button>
        </div>
      `;

      let cardIds = await getCardIds(dex);
      if (!cardIds) { cardIds = "" }; 
      cardIds += cardId + ";";   
      await updateCardIds(dex, cardIds);

      const container = document.getElementById(`kartenContainer_${dex}`);
      try {
        const response = await Http.get({
          url: `https://api.tcgdex.net/v2/en/cards/${cardId}`,
          headers: { 'Accept': 'application/json' }
        });

        if (response.status === 200) {
          const cardData = response.data;
          const img = document.createElement("img");
          img.src = cardData.image + "/low.webp";
          img.alt = cardId;
          img.style.width = "50px";
          img.style.height = "69px";
          img.style.objectFit = "cover";

          img.addEventListener("click", async () => openCardGallery(dex, (await getCardIds(dex)).split(";").filter(id => id.trim()).indexOf(cardId)));

          container.appendChild(img);
        }

      } catch (error) {
        console.error("Fehler beim direkten Nachladen der Karte:", error);
      }
    
      document.getElementById("closeOverlayConfirm").addEventListener("click", e => {
        e.preventDefault();
        const overlayElement = document.querySelector("#overlay");
        overlayElement.classList.add("hidden");
        overlayElement.classList.remove("shown");
        overlayElement.innerHTML = "";
      });

    };    

    //Filtert die Tabellen-Einträge nach Input (Dex-Nr. oder Name)
    function search() {
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
    }

    window.search = search; // wichtig, sonst geht onkeyup="search()" im HTML nicht!

    //Deklaration für Filter
    const filterZustand = {
      holo: false,
      fullart: false,
      vfamily: false,
      rares: false
    };
    
    //Filtert die Tabelle je nach geklicktem Filter
    function filterTabelle(filterName, felder) {

      const link = document.getElementById(`filter-${filterName}`);
      const isActive = filterZustand[filterName];
    
      //Toggle Zustand
      filterZustand[filterName] = !isActive;
    
      const rows = document.querySelectorAll("#kartentabelle tbody tr");
    
      rows.forEach(row => {
        let hasMatch = false;
    
        felder.forEach(feld => {
          const input = row.querySelector(`input[id^="${feld}_"]`);
          const val = input?.value?.trim();
          if (val && val !== "0") {
            hasMatch = true;
          }
        });
    
        if (!isActive) {
          //Erster Klick = positive Filterung → zeigen wenn etwas da ist
          row.style.display = hasMatch ? "" : "none";
        } else {
          //Zweiter Klick = negative Filterung → zeigen wenn NICHTS da ist
          row.style.display = hasMatch ? "none" : "";
        }
      });
    
      // Visuelles Feedback
      // Entferne zuerst alle anderen farbigen Klassen
      document.querySelectorAll("nav a").forEach(a => {
        a.classList.remove("active-positive", "active-negative");
      });
    
      if (!isActive) {
        link.classList.add("active-positive");
      } else {
        link.classList.add("active-negative");
      }

      updateEintragsAnzahl();

    }    
    
    // Klick-Handler für Filter
    document.getElementById("filter-holo").addEventListener("click", e => {
      e.preventDefault();
      filterTabelle("holo", ["reverse", "holo"]);
    });
    
    document.getElementById("filter-fullart").addEventListener("click", e => {
      e.preventDefault();
      filterTabelle("fullart", ["fullart"]);
    });
    
    document.getElementById("filter-vfamily").addEventListener("click", e => {
      e.preventDefault();
      filterTabelle("vfamily", ["v", "vmax", "vstar", "ex"]);
    });
    
    document.getElementById("filter-rares").addEventListener("click", e => {
      e.preventDefault();
      filterTabelle("rares", ["shiny", "rare", "amazing", "secret", "hyper"]);
    });
    
    // "Alle" zeigt wieder alle Zeilen an
    document.getElementById("filter-alle").addEventListener("click", e => {
      e.preventDefault();
      Object.keys(filterZustand).forEach(k => filterZustand[k] = false);
      const rows = document.querySelectorAll("#kartentabelle tbody tr");
      rows.forEach(row => row.style.display = "");

      // Farben zurücksetzen
      document.querySelectorAll("nav a").forEach(a => {
        a.classList.remove("active-positive", "active-negative");
      });

      updateEintragsAnzahl();

    });

  })();
});