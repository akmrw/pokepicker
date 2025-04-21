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
          <form>
            <!-- deine Inputs -->
          </form>
        </td>
      `;

      tbody.appendChild(tr);
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