document.addEventListener("DOMContentLoaded", () => {
  (async () => {
    const { initDatabase, getDaten, updateFeld } = await import('./db-init.js');

    const db = await initDatabase();
    const data = await getDaten();

    const tbody = document.querySelector('#kartentabelle tbody');
    console.log("Tabelle gefunden:", tbody);
    console.log("Daten geladen:", data);

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

      tr.innerHTML = `
        <td class="dexnr">${eintrag.dex}</td>
        <td class="monimage"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dexNr}.png" alt="${eintrag.name}"></td>
        <td class="monname"><a href="https://www.pokewiki.de/${eintrag.name}" target="_blank">${eintrag.name}</a></td>
        <td>
          <input class="cardIndex" type="input" id="reverse_${eintrag.dex}" name="reverse_${eintrag.dex}" value="${eintrag.reverse}" onkeyup="showSaveButton(save_reverse_${eintrag.dex})">
          <label for="reverse_${eintrag.dex}">Reverse Holo</label>
          <input class="saveButton" type="button" id="save_reverse_${eintrag.dex}" onclick="save(reverse_${eintrag.dex}, save_reverse_${eintrag.dex}, checkmark_reverse_${eintrag.dex})" value="Speichern!">
          <div class="checkmark" id="checkmark_reverse_${eintrag.dex}">&#10003;</div>
          <br>
          <input class="cardIndex" type="input" id="holo_${eintrag.dex}" name="holo_${eintrag.dex}" value="${eintrag.holo}" onkeyup="showSaveButton(save_holo_${eintrag.dex})">
          <label for="holo_${eintrag.dex}">Holo</label>
          <input class="saveButton" type="button" id="save_holo_${eintrag.dex}" onclick="save(holo_${eintrag.dex}, save_holo_${eintrag.dex}, checkmark_holo_${eintrag.dex})" value="Speichern!">
          <div class="checkmark" id="checkmark_holo_${eintrag.dex}">&#10003;</div>
          <br>
          <input class="cardIndex" type="input" id="v_${eintrag.dex}" name="v_${eintrag.dex}" value="${eintrag.v}" onkeyup="showSaveButton(save_v_${eintrag.dex})">
          <label for="v_${eintrag.dex}">V</label>
          <input class="saveButton" type="button" id="save_v_${eintrag.dex}" onclick="save(v_${eintrag.dex}, save_v_${eintrag.dex}, checkmark_v_${eintrag.dex})" value="Speichern!">
          <div class="checkmark" id="checkmark_v_${eintrag.dex}">&#10003;</div>
          <br>
          <input class="cardIndex" type="input" id="vmax_${eintrag.dex}" name="vmax_${eintrag.dex}" value="${eintrag.vmax}" onkeyup="showSaveButton(save_vmax_${eintrag.dex})">
          <label for="vmax_${eintrag.dex}">VMAX</label>
          <input class="saveButton" type="button" id="save_vmax_${eintrag.dex}" onclick="save(vmax_${eintrag.dex}, save_vmax_${eintrag.dex}, checkmark_vmax_${eintrag.dex})" value="Speichern!">
          <div class="checkmark" id="checkmark_vmax_${eintrag.dex}">&#10003;</div>
          <br>
          <input class="cardIndex" type="input" id="vstar_${eintrag.dex}" name="vstar_${eintrag.dex}" value="${eintrag.vstar}" onkeyup="showSaveButton(save_vstar_${eintrag.dex})">
          <label for="vstar_${eintrag.dex}">VSTAR</label>
          <input class="saveButton" type="button" id="save_vstar_${eintrag.dex}" onclick="save(vstar_${eintrag.dex}, save_vstar_${eintrag.dex}, checkmark_vstar_${eintrag.dex})" value="Speichern!">
          <div class="checkmark" id="checkmark_vstar_${eintrag.dex}">&#10003;</div>
          <br>
          <input class="cardIndex" type="input" id="ex_${eintrag.dex}" name="ex_${eintrag.dex}" value="${eintrag.ex}" onkeyup="showSaveButton(save_ex_${eintrag.dex})">
          <label for="ex_${eintrag.dex}">ex</label>
          <input class="saveButton" type="button" id="save_ex_${eintrag.dex}" onclick="save(ex_${eintrag.dex}, save_ex_${eintrag.dex}, checkmark_ex_${eintrag.dex})" value="Speichern!">
          <div class="checkmark" id="checkmark_ex_${eintrag.dex}">&#10003;</div>
          <br>
          <input class="cardIndex" type="input" id="shiny_${eintrag.dex}" name="shiny_${eintrag.dex}" value="${eintrag.shiny}" onkeyup="showSaveButton(save_shiny_${eintrag.dex})">
          <label for="shiny_${eintrag.dex}">Shiny</label>
          <input class="saveButton" type="button" id="save_shiny_${eintrag.dex}" onclick="save(shiny_${eintrag.dex}, save_shiny_${eintrag.dex}, checkmark_shiny_${eintrag.dex})" value="Speichern!">
          <div class="checkmark" id="checkmark_shiny_${eintrag.dex}">&#10003;</div>
          <br>
          <input class="cardIndex" type="input" id="fullart_${eintrag.dex}" name="fullart_${eintrag.dex}" value="${eintrag.fullart}" onkeyup="showSaveButton(save_fullart_${eintrag.dex})">
          <label for="fullart_${eintrag.dex}">Full-Art</label>
          <input class="saveButton" type="button" id="save_fullart_${eintrag.dex}" onclick="save(fullart_${eintrag.dex}, save_fullart_${eintrag.dex}, checkmark_fullart_${eintrag.dex})" value="Speichern!">
          <div class="checkmark" id="checkmark_fullart_${eintrag.dex}">&#10003;</div>
          <br>
          <input class="cardIndex" type="input" id="rare_${eintrag.dex}" name="rare_${eintrag.dex}" value="${eintrag.rare}" onkeyup="showSaveButton(save_rare_${eintrag.dex})">
          <label for="rare_${eintrag.dex}">Rare</label>
          <input class="saveButton" type="button" id="save_rare_${eintrag.dex}" onclick="save(rare_${eintrag.dex}, save_rare_${eintrag.dex}, checkmark_rare_${eintrag.dex})" value="Speichern!">
          <div class="checkmark" id="checkmark_rare_${eintrag.dex}">&#10003;</div>
          <br>
          <input class="cardIndex" type="input" id="amazing_${eintrag.dex}" name="amazing_${eintrag.dex}" value="${eintrag.amazing}" onkeyup="showSaveButton(save_amazing_${eintrag.dex})">
          <label for="amazing_${eintrag.dex}">Amazing</label>
          <input class="saveButton" type="button" id="save_amazing_${eintrag.dex}" onclick="save(amazing_${eintrag.dex}, save_amazing_${eintrag.dex}, checkmark_amazing_${eintrag.dex})" value="Speichern!">
          <div class="checkmark" id="checkmark_amazing_${eintrag.dex}">&#10003;</div>
          <br>
          <input class="cardIndex" type="input" id="rainbow_${eintrag.dex}" name="rainbow_${eintrag.dex}" value="${eintrag.rainbow}" onkeyup="showSaveButton(save_rainbow_${eintrag.dex})">
          <label for="rainbow_${eintrag.dex}">Rainbow</label>
          <input class="saveButton" type="button" id="save_rainbow_${eintrag.dex}" onclick="save(rainbow_${eintrag.dex}, save_rainbow_${eintrag.dex}, checkmark_rainbow_${eintrag.dex})" value="Speichern!">
          <div class="checkmark" id="checkmark_rainbow_${eintrag.dex}">&#10003;</div>
          <br>
          <input class="cardIndex" type="input" id="gold_${eintrag.dex}" name="gold_${eintrag.dex}" value="${eintrag.gold}" onkeyup="showSaveButton(save_gold_${eintrag.dex})">
          <label for="gold_${eintrag.dex}">Gold</label>
          <input class="saveButton" type="button" id="save_gold_${eintrag.dex}" onclick="save(gold_${eintrag.dex}, save_gold_${eintrag.dex}, checkmark_gold_${eintrag.dex})" value="Speichern!">
          <div class="checkmark" id="checkmark_gold_${eintrag.dex}">&#10003;</div>
          <br>
          <input class="cardIndex" type="input" id="custom_${eintrag.dex}" name="custom_${eintrag.dex}" value="${eintrag.custom}" onkeyup="showSaveButton(save_custom_${eintrag.dex})">
          <label for="custom_${eintrag.dex}">Custom</label>
          <input class="saveButton" type="button" id="save_custom_${eintrag.dex}" onclick="save(custom_${eintrag.dex}, save_custom_${eintrag.dex}, checkmark_custom_${eintrag.dex})" value="Speichern!">
          <div class="checkmark" id="checkmark_custom_${eintrag.dex}">&#10003;</div>
          <br>
        </td>
      `;

      tbody.appendChild(tr);
      console.log("Zeile eingefügt für:", eintrag.name);

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
    }

    window.search = search; // wichtig, sonst geht onkeyup="search()" im HTML nicht!

    window.showSaveButton = function (buttonToShow) {
      buttonToShow.style.display = "inline";
    };

    window.save = async function (inputToSave, buttonToHide, checkmarkToShow) {
      let wert = inputToSave.value;
      const zielArray = inputToSave.name.split("_");
      const feld = zielArray[0];
      const dex = zielArray[1];

      if (wert === "" || parseInt(wert) === 0) {
        wert = null;
      }

      try {
        await updateFeld(dex, feld, wert);
        buttonToHide.style.display = "none";
        checkmarkToShow.style.display = "inline";
        setTimeout(() => {
          checkmarkToShow.style.display = "none";
        }, 3000);
      } catch (error) {
        console.error("Fehler beim Speichern:", error);
        alert("Speichern fehlgeschlagen.");
      }
    };
  })();
});