<img href="www/pokepicker_logo_transparent.png">

# Poképicker

## Eine iOS-App, mit der du deine PokémonTCG-Karten organisieren kannst.

### Features der App (von oben nach unten)

#### 1. Filter

Die Buttons im oberen Teil der App können genutzt werden, um die Kartentabelle nach deinen Wünschen zu filtern:

- **Alle**:             deaktiviert alle Filter und zeigt alle Pokémon und Karten
- **Reverse**:          zeigt/versteckt alle Pokémon mit mindestens einer Reverse Holo Karte
- **Holo**:             zeigt/versteckt alle Pokémon mit mindestens einer Holo Karte
- **Shiny**:            zeigt/versteckt alle Pokémon mit mindestens einer Shiny Karte
- **V**:                zeigt/versteckt alle Pokémon mit mindestens einer V Karte
- **VMAX/VSTAR**:       zeigt/versteckt alle Pokémon mit mindestens einer VMAX oder VSTAR Karte
- **EX**:               zeigt/versteckt alle Pokémon mit mindestens einer ex Karte

Jeder dieser Filter hat drei Regelstufen (mit Ausnahme von "Alle"):


1. Mit dem ersten Klick auf den Filter wird die aktive Logik des Filters angewendet. Das bedeutet, dass beim ersten Klick auf bspw. den Filter "V" alle Pokémon angezeigt werden, bei denen mindestens eine V-Karte hinterlegt ist. Der Filter wird bei Klick grün und zeigt somit die aktive Logik des Filters an.<br/>
2. Mit einem weiteren Klick auf denselben Filter wird die Logik umgekehrt. Das bedeutet, dass beim zweiten Klick auf denselben Filter alle Pokémon angezeigt werden, bei denen KEINE V-Karte hinterlegt ist. Der Filter wird beim zweiten Klick rot und zeigt somit die umgekehrte Logik des Filters an.<br/>
3. Ein weiterer Klick auf denselben Filter deaktiviert jegliche Filterfunktionen. Der Filter ist nun wieder Blau.


Diese Filter lassen sich beliebig kombinieren. So lassen sich Filter einstellen, die einem bspw. alle Pokémon zeigen, bei denen noch keine Reverse- und Holo-Karten, dafür jedoch ex-Karten hinterlegt sind.

#### 2. Suche

Wenn du ein spezielles Pokémon aus der Tabelle heraussuchen möchtest, kannst du dafür die Suchleiste nutzen. Trage hierfür in der Suchleiste einfach den Namen des Pokémons oder seine entsprechende Pokédex-Nummer ein. Zum Beispiel bringen die Suchanfragen für "Schiggy" und "0007" dasselbe Ergebnis.<br/>
Wenn du die Pokédex-Nummer für die Suche verwendest empfehle ich dir, wie im Beispiel zu sehen, die führenden Nullen anzugeben. Andernfalls könnten die Ergebnisse etwas unerwartet sein, da die Logik alle Pokémon zeigt, in dessen Pokédex-Nummer eine 7 vorkommt (0007, 0017, 0027, 0037, 0047 usw.).

#### 3. Kartenwert (powered by Cardmarket.com)

Unter der Suchleiste wird der Gesamtwert der Sammlung angezeigt. Dieser ergibt sich aus dem tagesaktuellen 30-Tage-Durchschnittswert einer Karte, welcher beim Hinzufügen der Karte in deine Sammlung von Cardmarket.com ermittelt wird (zu sehen unter der Karte, wenn man diese hinzufügt bzw. wenn man sich diese in der Tabelle anschaut).<br/>
Da sich die Werte im Laufe der Zeit verändern, gibt es einen Button oben rechts in der App (📈), welcher alle vorhandenen Karten durchläuft und die tagesaktuellen Kartenpreise von Cardmarket.com zieht und in der Datenbank hinterlegt.

#### 4. Link zu Pokéwiki.de

Ein Klick auf den Namen eines Pokémon in der Tabelle öffnet die Pokéwiki.de-Seite des ausgewählten Pokémons im Browser.

#### 5. Karten zu deiner Pokémon TCG-Sammlung hinzufügen



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