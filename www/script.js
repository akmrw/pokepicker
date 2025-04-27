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
      if (!eintrag.rainbow) { eintrag.rainbow = "" }
      if (!eintrag.gold) { eintrag.gold = "" }
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

      const typen = ["reverse", "holo", "v", "vmax", "vstar", "ex", "shiny", "fullart", "rare", "amazing", "rainbow", "gold", "custom"];
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
          <button class="overlayTypBtn" id="btnReverse_${dex}">Reverse Holo</button>
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
          <button class="overlayTypBtn" id="btnRainbow_${dex}">Rainbow</button>
          <button class="overlayTypBtn" id="btnGold_${dex}">Gold</button>
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

      document.getElementById(`btnReverse_${dex}`).addEventListener("click", e => {

        e.preventDefault();
        overlayElement.innerHTML = ""; // optional: aufräumen

        getName(dex).then(result => {
          const name = result.values[0].name;
          console.log(name);
        });

        fetch(`https://api.tcgdex.net/v2/de/cards?name=${encodeURIComponent(name)}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log(data); // Hier hast du die Daten aus der API
        })
        .catch(error => {
          console.error('Fehler beim Abrufen der Daten:', error);
        });

        // neues HTML für das Overlay
        let html = `
          <div id="overlayContent">
            <h2>Kartenauswahl:</h2>
            <p>Welche Karte möchtest du hinzufügen?</p>
            <img src="https://assets.tcgdex.net/de/swsh/cel25/7/high.webp" alt="Fliegendes Pikachu VMAX">
            <br><br>
            <button class="overlayMenuBtn" id="btnMissing_${dex}" >Meine neue Karte ist nicht dabei.</button>
            <button class="overlayMenuBtn" id="closeOverlay">Abbrechen</button>
          </div>
        `;
      
        overlayElement.innerHTML = html;

        document.getElementById("closeOverlay").addEventListener("click", e => {

          e.preventDefault();
          overlayElement.classList.add("hidden");
          overlayElement.classList.remove("shown");
          overlayElement.innerHTML = ""; // optional: aufräumen

        });

      });

      //Overlay sichtbar machen
      overlayElement.classList.remove("hidden");
      overlayElement.classList.add("shown");

    }

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
      filterTabelle("rares", ["shiny", "rare", "amazing", "rainbow", "gold"]);
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