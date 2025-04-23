# Pokémon TCGdex

## An iOS app designed to organize your Pokémon TCG cards which reminds you of the Pokédex.

### Features from top of app to bottom

#### 1. Filter

The buttons in the top section of the app can be used to filter the Pokédex based on your needs:

- **Alle**:             disables all filters and shows all Pokémon regardless of amount of cards
- **(Reverse) Holo**:   shows/hides all Pokémon which have at least one Reverse Holo oder Holo card
- **Full-Art**:         shows/hides all Pokémon which have at least one Full-Art card
- **V / VMAX / ex**:    shows/hides all Pokémon which have at least one V, VMAX, VSTAR or ex card 
- **Rares**:            shows/hides all Pokémon which have at least one Rare, Amazing Rare, Rainbow Rare, Gold Rare or Shiny card

With the first click on the a filter you activate the positive logic of that exact filter, meaning e.g. that clicking "Full-Art" once will trigger the logic to show you all Pokémon which DO have at least one Full-Art card. The green color of that filter indicates the positive logic beeing used to filter the Pokédex.<br/>
With another click on the exact same filter you can reverse that logic, meaning e.g. that clicking "Full-Art" again will trigger the logic to show you all Pokémon which DO NOT have any Full-Art card. The red color of that filter indicates the reverse logic beeing used to filter the Pokédex.

#### 2. Search

When you're looking for a specific Pokémon within the Pokédex you can use the search bar to lookup that Pokémon either by entering the Pokédex-No. or the name of the Pokémon you're looking for. For example you can either enter "Schiggy" or "0007" to get the same result.<br/>
When searching by Pokédex-No. it is recommended to enter the Pokédex-No. with leading zeros (e.g. "0007"), otherwise the search results can be a little unexpected since the logic will show every Pokémon with a Pokédex-No. containing e.g. a "7" (0007, 0017, 0027, 0037, 0047 and so on).

#### 3. Link to Pokéwiki.de

A click onto any Pokémon-name in the Pokédex will open a corresponding Pokéwiki-Page of that Pokémon.

#### 4. Organizing your TCG cards

In the third column of the Pokédex you can add your cards to any Pokémon by clicking the button "+ Neue Karte".<br/>
The following input fields will appear: REVERSE, HOLO, V, VMAX, VSTAR, EX, SHINY, FULLART, RARE, AMAZING, RAINBOW, GOLD and CUSTOM.<br/>
You then can enter any number of cards into the corresponding fields. After entering a number the label of that field will switch places with a "Speichern!"-Button to save your input. After clicking "Speichern!" a green check mark will appear for 3 seconds, to tell you that your input has been successfully saved to the database and the label of the field will be seen again.<br/>
After entering all of your cards for that Pokémon you can click on the "Schließen"-Button to hide all empty fields again and continue with the next Pokémon.

### Used Technology

The whole app is based on HTML, CSS and JavaScript for frontend.<br/>
Node.js and SQLite is used for backend and database functionality.<br/>
Capacitor and ESbuild is used for building the iOS app.

### How to build and simulate app:

1. download this repository
2. ```npm install``` (optional)
3. ```npm run build```
4. ```npx cap sync```
5. ```npx cap open ios```

This builds the app and opens Xcode. From there you can simulate the app using the Xcode simualator.<br/>
You can also enable developer mode on your iPhone to build the app on you phone. WARNING: enabling developer mode reduces security measures on your device.