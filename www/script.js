document.addEventListener("DOMContentLoaded", () => {
  (async () => {
    const { initDatabase, getDaten, updateFeld } = await import('./db-init.js');

    const db = await initDatabase();
    const data = await getDaten();

    const tbody = document.querySelector('#kartentabelle tbody');

    for (const eintrag of data.values) {
      const tr = document.createElement('tr');

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

      let html = `
        <td class="dexnr">${eintrag.dex}</td>
        <td class="pokemon">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dexNr}.png" alt="${eintrag.name}"><br>
          <a href="https://www.pokewiki.de/${eintrag.name}" target="_blank">${eintrag.name}</a>
        </td>
        <td id="td_${eintrag.dex}">
      `;

      const typen = ['reverse', 'holo', 'v', 'vmax', 'vstar', 'ex', 'shiny', 'fullart', 'rare', 'amazing', 'rainbow', 'gold', 'custom'];
      let hatLeereFelder = false;

      typen.forEach(type => {
        const value = eintrag[type];
        const istLeer = (value === "" || value === null || value === undefined);
        if (istLeer) hatLeereFelder = true;

        html += `
          <div class="kartenContainer ${istLeer ? 'versteckt' : ''}" id="container_${type}_${eintrag.dex}">
            <input class="kartenAnzahl" type="number" min="0" max="999"
                  id="${type}_${eintrag.dex}"
                  name="${type}_${eintrag.dex}"
                  value="${value || ''}"
                  oninput="toggleSaveButton('${type}', '${eintrag.dex}')">

            <span id="labelOrButton_${type}_${eintrag.dex}">
              <label for="${type}_${eintrag.dex}">${type.toUpperCase()}</label>
            </span>

            <div class="checkmark" id="checkmark_${type}_${eintrag.dex}">&#10003;</div>
            <br>
          </div>
        `;
      });

      if (hatLeereFelder) {
        html += `
          <button id="neueKarteBtn_${eintrag.dex}" onclick="zeigeAlleFelder('${eintrag.dex}')">+ Neue Karte</button>
          <button id="abbrechenBtn_${eintrag.dex}" onclick="versteckeLeereFelder('${eintrag.dex}')" class="versteckt">Schließen</button>
        `;
      }

      html += `</td>`;
      tr.innerHTML = html;

      tbody.appendChild(tr);
      updateEintragsAnzahl();

      function updateEintragsAnzahl() {
        const rows = document.querySelectorAll('#kartentabelle tbody tr');
        let sichtbareZeilen = 0;
        rows.forEach(row => {
          if (row.style.display !== "none") sichtbareZeilen++;
        });
        document.getElementById('eintragsAnzahl').textContent = `(${sichtbareZeilen})`;
      }

      // Zeigt alle (auch leere) Felder an und wechselt Button
      window.zeigeAlleFelder = function (dex) {
        typen.forEach(type => {
          const el = document.getElementById(`container_${type}_${dex}`);
          if (el) el.classList.remove('versteckt');
        });

        document.getElementById(`neueKarteBtn_${dex}`)?.classList.add('versteckt');
        document.getElementById(`abbrechenBtn_${dex}`)?.classList.remove('versteckt');
      };

      // Blendet leere Felder wieder aus und wechselt Button zurück
      window.versteckeLeereFelder = function (dex) {
        typen.forEach(type => {
          const input = document.getElementById(`${type}_${dex}`);
          const container = document.getElementById(`container_${type}_${dex}`);
          if (input && container && !input.value.trim()) {
            container.classList.add('versteckt');
          }
        });

        document.getElementById(`neueKarteBtn_${dex}`)?.classList.remove('versteckt');
        document.getElementById(`abbrechenBtn_${dex}`)?.classList.add('versteckt');
      };

      // Zeigt entweder Label oder Speichern-Button je nach Eingabe
      window.toggleSaveButton = function(type, dex) {
        const inputId = `${type}_${dex}`;
        const spanId = `labelOrButton_${type}_${dex}`;
        const input = document.getElementById(inputId);
        const span = document.getElementById(spanId);

        if (!input || !span) return;

        if (input.value.trim() !== "") {
          span.innerHTML = `
            <input class="saveButton" type="button"
                  onclick="saveUndReset('${type}', '${dex}')"
                  value="Speichern!">
          `;
        } else {
          span.innerHTML = `<label for="${inputId}">${type.toUpperCase()}</label>`;
        }
      };

      // Speichert den Wert und setzt das Label zurück
      window.saveUndReset = function(type, dex) {
        const inputId = `${type}_${dex}`;
        const input = document.getElementById(inputId);
        const checkmark = document.getElementById(`checkmark_${inputId}`);
      
        if (input) {
          save(input, checkmark); // Bestehende Speicherfunktion
        }
      
        // Nach dem Speichern zurück zum Label
        const span = document.getElementById(`labelOrButton_${type}_${dex}`);
        if (span) {
          span.innerHTML = `<label for="${inputId}">${type.toUpperCase()}</label>`;
        }
      };

    }

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

    window.showSaveButton = function (buttonToShow) {
      buttonToShow.style.display = "inline";
    };

    window.save = async function (inputToSave, checkmarkToShow) {
      let wert = inputToSave.value;
      const zielArray = inputToSave.name.split("_");
      const feld = zielArray[0];
      const dex = zielArray[1];

      if (wert === "" || parseInt(wert) === 0) {
        wert = null;
      }

      try {
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

    const filterZustand = {
      holo: false,
      fullart: false,
      vfamily: false,
      rares: false
    };
    
    function filterTabelle(filterName, felder) {

      const link = document.getElementById(`filter-${filterName}`);
      const isActive = filterZustand[filterName];
    
      // Toggle Zustand
      filterZustand[filterName] = !isActive;
    
      const rows = document.querySelectorAll('#kartentabelle tbody tr');
    
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
          // Erster Klick = positive Filterung → zeigen wenn etwas da ist
          row.style.display = hasMatch ? "" : "none";
        } else {
          // Zweiter Klick = negative Filterung → zeigen wenn NICHTS da ist
          row.style.display = hasMatch ? "none" : "";
        }
      });
    
      // Visuelles Feedback
      // Entferne zuerst alle anderen farbigen Klassen
      document.querySelectorAll('nav a').forEach(a => {
        a.classList.remove('active-positive', 'active-negative');
      });
    
      if (!isActive) {
        link.classList.add('active-positive');
      } else {
        link.classList.add('active-negative');
      }

      updateEintragsAnzahl();

    }    
    
    // Klick-Handler
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
      const rows = document.querySelectorAll('#kartentabelle tbody tr');
      rows.forEach(row => row.style.display = "");

      // Farben zurücksetzen
      document.querySelectorAll('nav a').forEach(a => {
        a.classList.remove('active-positive', 'active-negative');
      });

      updateEintragsAnzahl();

    });

  })();
});