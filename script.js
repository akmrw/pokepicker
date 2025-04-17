fetch('http://localhost:3000/daten')
  .then(response => response.json())
  .then(data => {
    console.log('Daten von der MariaDB:', data);
    // Hier kannst du z. B. die Daten in die HTML-Seite einfügen
  })
  .catch(error => {
    console.error('Fehler beim Laden der Daten:', error);
  });