![PokéPicker Logo.](/www/pokepicker_logo_transparent.png)

# PokéPicker

## Eine iOS-App, mit der du deine PokémonTCG-Karten organisieren kannst.

### Features der App (von oben nach unten)

#### 1. Filter (nur in Pokémon-Tabelle)

Die Buttons im oberen Teil der App können genutzt werden, um die Kartentabelle nach deinen Wünschen zu filtern:

- **Alle**:             deaktiviert alle Filter und zeigt alle Pokémon und Karten
- **Reverse**:          zeigt/versteckt alle Pokémon mit mindestens einer Reverse Holo Karte
- **Holo**:             zeigt/versteckt alle Pokémon mit mindestens einer Holo Karte
- **Shiny**:            zeigt/versteckt alle Pokémon mit mindestens einer Shiny Karte
- **V**:                zeigt/versteckt alle Pokémon mit mindestens einer V Karte
- **VMAX/VSTAR**:       zeigt/versteckt alle Pokémon mit mindestens einer VMAX oder VSTAR Karte
- **EX**:               zeigt/versteckt alle Pokémon mit mindestens einer ex Karte

Jeder dieser Filter hat drei Regelstufen (mit Ausnahme von "Alle"):


1. Mit dem ersten Klick auf den Filter wird die aktive Logik des Filters angewendet. Das bedeutet, dass beim ersten Klick auf bspw. den Filter "V" alle Pokémon angezeigt werden, bei denen mindestens eine V-Karte hinterlegt ist. Der Filter wird bei Klick Blau und zeigt somit die aktive Logik des Filters an.<br/>
2. Mit einem weiteren Klick auf denselben Filter wird die Logik umgekehrt. Das bedeutet, dass beim zweiten Klick auf denselben Filter alle Pokémon angezeigt werden, bei denen KEINE V-Karte hinterlegt ist. Der Filter wird beim zweiten Klick Rot und zeigt somit die umgekehrte Logik des Filters an.<br/>
3. Ein weiterer Klick auf denselben Filter deaktiviert jegliche Filterfunktionen. Der Filter ist nun wieder Grau.


Diese Filter lassen sich beliebig kombinieren. So lassen sich Filter einstellen, die einem bspw. alle Pokémon zeigen, bei denen noch keine Reverse- und Holo-Karten, dafür jedoch ex-Karten hinterlegt sind.

#### 2. Suche (nur in Pokémon-Tabelle)

Wenn du ein spezielles Pokémon aus der Tabelle heraussuchen möchtest, kannst du dafür die Suchleiste nutzen. Trage hierfür in der Suchleiste einfach den Namen des Pokémons oder seine entsprechende Pokédex-Nummer ein. Zum Beispiel bringen die Suchanfragen für "Schiggy" und "0007" dasselbe Ergebnis.<br/>
Wenn du die Pokédex-Nummer für die Suche verwendest empfehle ich dir, wie im Beispiel zu sehen, die führenden Nullen anzugeben. Andernfalls könnten die Ergebnisse etwas unerwartet sein, da die Logik alle Pokémon zeigt, in dessen Pokédex-Nummer eine 7 vorkommt (0007, 0017, 0027, 0037, 0047 usw.).

#### 3. Auswahl der verschiedenen Karten-Tabellen

Du kannst in der App nicht nur die Karten der Pokémon hinzufügen, sondern auch Trainer- und Energie-Karten.<br/>
Dafür gibt es in der App eine Unterteilung in drei verschiedene Tabellen:


1. Pokémon: Hier kannst du für jedes einzelne Pokémon separat Karten hinzufügen.<br/>
2. Trainer: Hier kannst du Unterstützer-, Item-, Stadion- und Pokémon-Ausrüstungskarten hinzufügen.<br/>
3. Energie: Hier kannst du Basis- und Spezial-Energiekarten hinzufügen.


#### 4. Link zu Pokéwiki.de (nur in Pokémon-Tabelle)

Ein Klick auf den Namen eines Pokémon in der Tabelle öffnet die Pokéwiki.de-Seite des ausgewählten Pokémons im Browser.

#### 5. Karten zu deiner Pokémon TCG-Sammlung hinzufügen

Mit einem Klick auf den "+ Neue Karte"-Button können Karten in dem gewünschten Bereich in der jeweiligen Tabelle hinzugefügt werden.<br/>
Es wird eine Abfrage an die Pokémon TCG API abgesetzt, die alle Kartenbilder zur entsprechenden Auswahl abholt (Internetverbindung auf dem Gerät erforderlich!). Die erste Abfrage nach dem Start der App kann pro Pokémon bzw. pro Kategorie einen Moment dauern. Die Ergebnisse werden dann inklusive Karten-ID, Bild und tagesaktuellem Wert (30-Tage-Durchschnitt von Cardmarket.com) angezeigt und im Hintergrund gecached. Damit wird sichergestellt, dass der erste Abruf immer dem aktuellen Datenstand der API entspricht, und dass die Ladezeit bei weiteren Abrufen auf demselben Pokémon oder derselben Kategorie immens verringert wird.<br/>
Mit einem Klick auf die gewünschte Karte in den angezeigten Ergebnissen wird diese zur lokalen Datenbank hinzugefügt. Du hast jetzt die Möglichkeit die Karte einer der folgenden Varianten zuzuweisen: "Basic", "Reverse" und "Holo". Diese sind vor allem für die o. g. Filterfunktionen relevant. Du kannst diesen Schritt aber auch mit einem Klick auf den entsprechenden Button überspringen<br/>
Nach dem Hinzufügen der Karte in die Datenbank, wird diese nun in der Tabelle angezeigt und der Wert der Karte auf den Gesamtwert addiert. Bei mehreren Karten pro Pokémon/Kategorie werden die Karten nach Wert sortiert dargestellt.<br/>
Mit einem Klick auf eine bereits hinzugefügte Karte in der Tabelle wird die Detailansicht der Karte geöffnet. Diese zeigt ein hochauflösendes Bild der Karte, die Karten-ID, die beim Hinzufügen der Karte gewählte Variante, der Wert der Karte und das Datum und die Uhrzeit des Zeitpunkts, an dem die Karte hinzugefügt wurde. Des Weiteren hast du hier die Möglichkeit die Karte wieder aus der Datenbank zu entfernen, indem du ganz unten auf den Button "X Karte löschen" drückst.

#### 6. Kartenwert (powered by Cardmarket.com)

Am unteren rechten Bildschirmrand wird der Gesamtwert deiner Sammlung angezeigt. Dieser ergibt sich aus dem tagesaktuellen 30-Tage-Durchschnittswert einer Karte, welcher beim Hinzufügen der Karte in deine Sammlung von Cardmarket.com ermittelt wird (zu sehen unter der Karte, wenn man diese hinzufügt bzw. wenn man sich diese in der Tabelle anschaut). Dabei werden alle Karten aus allen drei Tabellen berücksichtigt.<br/>
Da sich die Werte im Laufe der Zeit verändern, gibt es einen Button oben rechts in der App (📈), welcher alle vorhandenen Karten durchläuft und die tagesaktuellen Kartenpreise von Cardmarket.com zieht und in der Datenbank hinterlegt.

### Genutzte Technologien

Das Gesamte Frontend der App basiert auf HTML, CSS und JavaScript.<br/>
Für die Backend-Funktionalitäten wurde SQLite und Node.js genutzt.<br/>
Um daraus eine iOS-App zu bauen, wurde Capacitor und ESBuild genutzt.<br/>
Für das Laden der Pokémon-Sprites wird eine Schnittstelle zur PokeAPI genutzt.<br/>
Die Bilder der TCG-Karten und zum Abrufen der Cardmarket-Preise wird eine Schnittstelle zur Pokémon TCG API genutzt.

### How to:

1. Lade das Repo herunter
2. ```npm install```
3. ```npm run build```
4. ```npx cap sync```
5. ```npx cap open ios```

Das erstellt einen Build und öffnet die App in Xcode. Von dort aus kann man die App im Xcode Simulator testen.<br/>
Du kannst stattdessen auch dein iPhone in den Entwicklermodus versetzen, um die App direkt in iOS zu testen. Xcode hilft dir bei der Einrichtung deines iPhones.<br/>
> [!CAUTION]
> Das Aktivieren des Entwicklermodus kann das Sicherheitsniveau deines iPhones reduzieren.