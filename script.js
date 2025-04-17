fetch('http://localhost:3000/daten')
  .then(response => response.json())
  .then(data => {
    console.log('Daten von der MariaDB:', data);

    const tbody = document.querySelector('#kartentabelle tbody');

    data.forEach(eintrag => {
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
            <input type="input" id="reverse_${eintrag.dex}" name="reverse_${eintrag.dex}" value="${eintrag.reverse}">
            <label for="reverse_${eintrag.dex}">Reverse Holo</label><br>
            <input type="input" id="holo_${eintrag.dex}" name="holo_${eintrag.dex}" value="${eintrag.holo}">
            <label for="holo_${eintrag.dex}">Holo</label><br>
            <input type="input" id="v_${eintrag.dex}" name="v_${eintrag.dex}" value="${eintrag.v}">
            <label for="v_${eintrag.dex}">V</label><br>
            <input type="input" id="vmax_${eintrag.dex}" name="vmax_${eintrag.dex}" value="${eintrag.vmax}">
            <label for="vmax_${eintrag.dex}">VMAX</label><br>
            <input type="input" id="vstar_${eintrag.dex}" name="vstar_${eintrag.dex}" value="${eintrag.vstar}">
            <label for="vmax_${eintrag.dex}">VSTAR</label><br>
            <input type="input" id="ex_${eintrag.dex}" name="ex_${eintrag.dex}" value="${eintrag.ex}">
            <label for="ex_${eintrag.dex}">ex</label><br>
            <input type="input" id="shiny_${eintrag.dex}" name="shiny_${eintrag.dex}" value="${eintrag.shiny}">
            <label for="shiny_${eintrag.dex}">Shiny</label><br>
            <input type="input" id="fullart_${eintrag.dex}" name="fullart_${eintrag.dex}" value="${eintrag.fullart}">
            <label for="fullart_${eintrag.dex}">Full-Art</label><br>
            <input type="input" id="rare_${eintrag.dex}" name="rare_${eintrag.dex}" value="${eintrag.rare}">
            <label for="rare_${eintrag.dex}">Rare</label><br>
            <input type="input" id="amazing_${eintrag.dex}" name="amazing_${eintrag.dex}" value="${eintrag.amazing}">
            <label for="amazing_${eintrag.dex}">Amazing</label><br>
            <input type="input" id="rainbow_${eintrag.dex}" name="rainbow_${eintrag.dex}" value="${eintrag.rainbow}">
            <label for="rainbow_${eintrag.dex}">Rainbow</label><br>
            <input type="input" id="gold_${eintrag.dex}" name="gold_${eintrag.dex}" value="${eintrag.gold}">
            <label for="gold_${eintrag.dex}">Gold</label><br>
            <input type="input" id="custom_${eintrag.dex}" name="custom_${eintrag.dex}" value="${eintrag.custom}">
            <label for="custom_${eintrag.dex}">Custom</label><br>
          </form>
        </td>
      `;

      tbody.appendChild(tr);
    });
  })
  .catch(error => {
    console.error('Fehler beim Laden der Daten:', error);
  });