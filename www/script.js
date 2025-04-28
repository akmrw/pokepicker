import { Http } from '@capacitor-community/http';

document.addEventListener("DOMContentLoaded", () => {
  (async () => {

    //Overlays definieren
    const overlay = document.getElementById("overlay");
    
    //SQLite-Datenbank-Initialisierung
    const { initDatabase, getDaten, updateFeld, getName } = await import("./db-init.js");
    const db = await initDatabase();
    const data = await getDaten();

    //Tabelle definieren
    const tbody = document.querySelector("#kartentabelle tbody");

    //Tabelle aus Datenbank füllen
    for (const eintrag of data.values) {
      const tr = document.createElement("tr");

      let dexNr = parseInt(eintrag.dex);

      if (!eintrag.reverse) { eintrag.reverse = "" }
      if (!eintrag.holo) { eintrag.holo = "" }
      if (!eintrag.v) { eintrag.v = "" }
      if (!eintrag.vmax) { eintrag.vmax = "" }
      if (!eintrag.vstar) { eintrag.vstar = "" }
      if (!eintrag.ex) { eintrag.ex = "" }
      if (!eintrag.shiny) { eintrag.shiny = "" }
      if (!eintrag.fullart) { eintrag.fullart = "" }
      if (!eintrag.rare) { eintrag.rare = "" }
      if (!eintrag.amazing) { eintrag.amazing = "" }
      if (!eintrag.secret) { eintrag.secret = "" }
      if (!eintrag.hyper) { eintrag.hyper = "" }
      if (!eintrag.custom) { eintrag.custom = "" }

      //Tabellenspalten mit Dex-Nr., Pokémon-Name und -Bild füllen
      let html = `
        <td class="dexnr">${eintrag.dex}</td>
        <td class="pokemon">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dexNr}.png" alt="${eintrag.name}"><br>
          <a href="https://www.pokewiki.de/${eintrag.name}" target="_blank">${eintrag.name}</a>
        </td>
        <td id="td_${eintrag.dex}">
      `;

      const typen = ["reverse", "holo", "v", "vmax", "vstar", "ex", "shiny", "fullart", "rare", "amazing", "secret", "hyper", "custom"];
      let hatLeereFelder = false;

      //Tabellenzeile mit vorhandenen Karten aus Datenbank füllen
      typen.forEach(type => {
        const value = eintrag[type];
        const istLeer = (value === "" || value === null || value === undefined);
        if (istLeer) hatLeereFelder = true;

        html += `
            <div class="kartenContainer ${istLeer ? "hidden" : ""}" id="container_${type}_${eintrag.dex}">
              <input class="kartenAnzahl" type="number" readonly
                    id="${type}_${eintrag.dex}"
                    name="${type}_${eintrag.dex}"
                    value="${value || ''}">

              <div class="checkmark" id="checkmark_${type}_${eintrag.dex}">&#10003;</div>
              <br>
            </div>
        `;
      });

      html += `
          <button id="neueKarteBtn_${eintrag.dex}" onclick="openOverlay('${eintrag.dex}')">+ Neue Karte</button>
        </td>
      `

      tr.innerHTML = html;
      tbody.appendChild(tr);
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

    //Öffnet das Overlay zum Aussuchen des neuen Kartentyps nach Klick auf Button "+ Neue Karte"
    window.openOverlay = function (dex) {

      const overlayElement = document.querySelector("#overlay");
      
      // Vorherigen Inhalt löschen
      overlayElement.innerHTML = "";
    
      // HTML für Overlaycontent
      let html = `
        <div id="overlayContent">
          <h2>Art der Karte</h2>
          <p>Um was für eine Art von Karte handelt es sich?</p>
          <button class="overlayTypBtn" id="btnReverse_${dex}">Reverse</button>
          <button class="overlayTypBtn" id="btnHolo_${dex}">Holo</button>
          <br>
          <button class="overlayTypBtn" id="btnV_${dex}">V</button>
          <button class="overlayTypBtn" id="btnVMAX_${dex}">VMAX</button>
          <button class="overlayTypBtn" id="btnVSTAR_${dex}">VSTAR</button>
          <button class="overlayTypBtn" id="btnEx_${dex}">ex</button>
          <br>
          <button class="overlayTypBtn" id="btnShiny_${dex}">Shiny</button>
          <button class="overlayTypBtn" id="btnFullart_${dex}">Full-Art</button>
          <br>
          <button class="overlayTypBtn" id="btnRare_${dex}">Rare</button>
          <button class="overlayTypBtn" id="btnAmazing_${dex}">Amazing</button>
          <button class="overlayTypBtn" id="btnSecret_${dex}">Rainbow</button>
          <button class="overlayTypBtn" id="btnHyper_${dex}">Gold</button>
          <br>
          <button class="overlayTypBtn" id="btnCustom_${dex}">Custom</button>
          <br><br>
          <button class="overlayMenuBtn" id="closeOverlay">Abbrechen</button>
        </div>
      `;

      //Content in Overlay einfügen
      overlayElement.innerHTML = html;
    
      document.getElementById("closeOverlay").addEventListener("click", e => {

        e.preventDefault();
        overlayElement.classList.add("hidden");
        overlayElement.classList.remove("shown");
        overlayElement.innerHTML = ""; // optional: aufräumen

      });

      window.zeigeKartenAuswahl = async function(dex, typ) {
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
          const cards = await fetchCards(name, typ);
      
          if (!cards || cards.length === 0) {
            overlayElement.innerHTML = "<div id='overlayContent'><h2>Keine Karten gefunden.</h2></div>";
            return;
          }
      
          let html = `
            <div id="overlayContent">
              <h2>Kartenauswahl für ${typ}:</h2>
              <p>Welche Karte möchtest du hinzufügen?</p>
              <div class="kartenGrid">
          `;
      
          cards.forEach(card => {
            html += `
              <div class="kartenItem" onclick="karteAuswählen('${card.id}', '${dex}', '${card.name}', '${typ}')">
                <img src="${card.image + '/low.webp'}" alt="${card.name}">
              </div>
            `;
          });
      
          html += `
              </div>
              <br><br>
              <button class="overlayMenuBtn" id="btnMissing_${dex}">Ohne Karte fortfahren</button>
              <button class="overlayMenuBtn" id="closeOverlay">Abbrechen</button>
            </div>
          `;
      
          overlayElement.innerHTML = html;
      
          document.getElementById("closeOverlay").addEventListener("click", e => {
            e.preventDefault();
            const overlayElement = document.querySelector("#overlay");
            overlayElement.classList.add("hidden");
            overlayElement.classList.remove("shown");
            overlayElement.innerHTML = "";
          });
      
        } catch (error) {
          console.error(error);
          overlayElement.innerHTML = "<div id='overlayContent'><h2>Fehler beim Laden.</h2></div>";
        }
      };
      
      document.getElementById(`btnReverse_${dex}`).addEventListener("click", e => {
        e.preventDefault();
        zeigeKartenAuswahl(dex, "Reverse");
      });
      
      document.getElementById(`btnHolo_${dex}`).addEventListener("click", e => {
        e.preventDefault();
        zeigeKartenAuswahl(dex, "Holo");
      });
      
      document.getElementById(`btnV_${dex}`).addEventListener("click", e => {
        e.preventDefault();
        zeigeKartenAuswahl(dex, "V");
      });
      
      document.getElementById(`btnVMAX_${dex}`).addEventListener("click", e => {
        e.preventDefault();
        zeigeKartenAuswahl(dex, "VMAX");
      });
      
      document.getElementById(`btnVSTAR_${dex}`).addEventListener("click", e => {
        e.preventDefault();
        zeigeKartenAuswahl(dex, "VSTAR");
      });
      
      document.getElementById(`btnEx_${dex}`).addEventListener("click", e => {
        e.preventDefault();
        zeigeKartenAuswahl(dex, "ex");
      });
      
      document.getElementById(`btnShiny_${dex}`).addEventListener("click", e => {
        e.preventDefault();
        zeigeKartenAuswahl(dex, "Shiny");
      });
      
      document.getElementById(`btnFullart_${dex}`).addEventListener("click", e => {
        e.preventDefault();
        zeigeKartenAuswahl(dex, "Fullart");
      });

      document.getElementById(`btnRare_${dex}`).addEventListener("click", e => {
        e.preventDefault();
        zeigeKartenAuswahl(dex, "Rare");
      });

      document.getElementById(`btnAmazing_${dex}`).addEventListener("click", e => {
        e.preventDefault();
        zeigeKartenAuswahl(dex, "Amazing");
      });

      document.getElementById(`btnSecret_${dex}`).addEventListener("click", e => {
        e.preventDefault();
        zeigeKartenAuswahl(dex, "Secret");
      });

      document.getElementById(`btnHyper_${dex}`).addEventListener("click", e => {
        e.preventDefault();
        zeigeKartenAuswahl(dex, "Hyper");
      });

      document.getElementById(`btnCustom_${dex}`).addEventListener("click", e => {
        e.preventDefault();
        //GLEICH BESTÄTIGUNG ZEIGEN
      });

      //Overlay sichtbar machen
      overlayElement.classList.remove("hidden");
      overlayElement.classList.add("shown");

    }
  
    async function fetchCards(name, typ) {
      try {
        console.log("Starte HTTP-Anfrage für:", name);
        
        if (typ == "Reverse") { const url = `https://api.tcgdex.net/v2/de/cards?name=${name}&variants.reverse=true&image`; }
        else if (typ == "Holo") { const url = `https://api.tcgdex.net/v2/de/cards?name=${name}&variants.holo=true&image&rarity=not:Selten,%20Illustration`; }
        else if (typ == "V") { const url = `https://api.tcgdex.net/v2/de/cards?name=eq:${name}%20V&image`; }
        else if (typ == "VMAX") { const url = `https://api.tcgdex.net/v2/de/cards?name=${name}%20VMAX&image`; }
        else if (typ == "VSTAR") { const url = `https://api.tcgdex.net/v2/de/cards?name=${name}%20VSTAR&image`; }
        else if (typ == "ex") { const url = `https://api.tcgdex.net/v2/de/cards?name=${name}%20EX&image`; }
        else if (typ == "Shiny") { const url = `https://api.tcgdex.net/v2/de/cards?name=${name}&image&rarity=Strahlend|schillernd|ultraselten`; }
        else if (typ == "Fullart") { const url = `https://api.tcgdex.net/v2/de/cards?name=eq:${name}&image&rarity=Illustration`; }
        else if (typ == "Rare") { const url = `https://api.tcgdex.net/v2/de/cards?name=eq:${name}&image&rarity=Selten&rarity=not:Illustration`; }
        else if (typ == "Amazing") { const url = `https://api.tcgdex.net/v2/de/cards?name=${name}&image&rarity=Atemberaubend`; }
        else if (typ == "Secret") { const url = `https://api.tcgdex.net/v2/de/cards?name=${name}&image&rarity=Versteckt%20Selten`; }
        else if (typ == "Hyper") { const url = `https://api.tcgdex.net/v2/de/cards?name=${name}&image&rarity=Hyperselten`; }
        
        const response = await Http.get({
          url: url,
          headers: {
            'Accept': 'application/json',
            'Connection': 'close'
          }
        });
    
        console.log("HTTP-Antwort erhalten!");
    
        if (response.status !== 200) {
          throw new Error(`Fehlerstatus: ${response.status}`);
        }
    
        const data = response.data; // Das fertige JSON
        console.log("Erfolg!");
        return data;
        
      } catch (error) {
        console.error('Fehler beim Abrufen über HTTP:', error.message);
        return null;
      }
    }   

    window.karteAuswählen = function (cardId, dex, cardName, typ) {
      const overlayElement = document.querySelector("#overlay");
    
      overlayElement.innerHTML = `
        <div id="overlayContent">
          <h2>Karte hinzugefügt!</h2>
          <p>Du hast <strong>${cardId}</strong> als <strong>${typ}</strong> ausgewählt.</p>
          <br>
          <button class="overlayMenuBtn" id="closeOverlayConfirm">OK</button>
        </div>
      `;
    
      document.getElementById("closeOverlayConfirm").addEventListener("click", e => {
        e.preventDefault();
        const overlayElement = document.querySelector("#overlay");
        overlayElement.classList.add("hidden");
        overlayElement.classList.remove("shown");
        overlayElement.innerHTML = "";
      });
    
      console.log(`Karte ${cardId} für Dex ${dex} als Typ ${typ} bestätigt.`);
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

    //Speichert Wert in Datenbank und zeigt Checkmark als Bestätigung
    window.save = async function (inputToSave, checkmarkToShow) {
      let wert = inputToSave.value;
      const zielArray = inputToSave.name.split("_");
      const feld = zielArray[0];
      const dex = zielArray[1];

      if (wert === "" || parseInt(wert) === 0) {
        wert = null;
      }

      try {
        //Datenbank-Update
        await updateFeld(dex, feld, wert);
        checkmarkToShow.style.display = "inline";
        setTimeout(() => {
          checkmarkToShow.style.display = "none";
        }, 3000);
      } catch (error) {
        console.error("Fehler beim Speichern:", error);
        alert("Speichern fehlgeschlagen.");
      }
    };

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