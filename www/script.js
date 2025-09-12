// www/script.js — TCGdex SDK Migration
// Erwartet: <script src="https://cdn.jsdelivr.net/npm/@tcgdex/sdk"></script> in index.html

;(async () => {
    // ------- Basiskonfiguration -------
    // Sprache & (optional) Default-Serie setzen. Du kannst 'en' → 'de' ändern.
    const LANGUAGE = 'en'
    const tcgdex = new TCGdex.default(LANGUAGE)

    // Wenn du ein Eingabefeld/Buttons im HTML hast, passe die Selektoren hier an:
    const $searchInput = document.querySelector('#search')
    const $searchBtn   = document.querySelector('#searchBtn')
    const $results     = document.querySelector('#results')   // Grid/List Container
    const $detail      = document.querySelector('#detail')    // Detailbereich (optional)
    const $status      = document.querySelector('#status')    // kleine Status/Fehlerzeile (optional)

    // ------- Utilities -------
    // Kartenbild-URL konstruieren
    // assets.tcgdex.net/<lang>/<serie>/<set>/<localId>/{quality}.{ext}
    // Viele Card-Objekte liefern bereits eine Image-URL; falls nicht, bauen wir sie sicher selbst.
    function imageUrlFromCard(card, { quality = 'high', ext = 'png' } = {}) {
        // card.id sieht oft aus wie "swsh3-136" → setId = "swsh3", localId = "136"
        // einige Objekte enthalten zusätzlich card.set.id und card.localId
        const setId   = card?.set?.id || (card?.id?.split('-')[0])
        const localId = card?.localId || (card?.id?.split('-')[1])
        if (!setId || !localId) return ''
        return `https://assets.tcgdex.net/${LANGUAGE}/${setId}/${localId}/${quality}.${ext}`
    }

    // Mini-Helper für Statuszeile:
    function setStatus(text) {
        if ($status) $status.textContent = text || ''
    }

    // ------- Suche / Daten holen -------
    // TCGdex stellt Listenabfragen + Query-Filter bereit.
    // Beispiel-Doku: tcgdex.card.list(new Query().equal('name','furret'))
    // Wir nutzen "equal" für exakte Treffer und versuchen bei 0 Treffern zusätzlich eine einfache
    // "contains"-Suche über den Namen clientseitig.
    async function fetchCardsByName(term) {
        const { Query } = TCGdex
        // 1) Exakte Übereinstimmung (performant, serverseitig)
        let cards = await tcgdex.card.list(new Query().equal('name', term))

        // 2) Falls leer: Grobe Suche – wir holen eine überschaubare Menge
        //    und filtern clientseitig auf "name includes term" (case-insensitive).
        if (!cards || cards.length === 0) {
            // Optional: Du kannst hier zusätzliche Filter setzen (Serie/Set), um die Menge zu verringern.
            const all = await tcgdex.card.list()
            const t = term.trim().toLowerCase()
            cards = (all || []).filter(c => (c.name || '').toLowerCase().includes(t)).slice(0, 60)
        }

        return cards || []
    }

    // ------- Rendering -------
    function renderCards(cards) {
        if (!$results) return
        $results.innerHTML = ''

        if (!cards.length) {
            $results.innerHTML = '<p>Keine Karten gefunden.</p>'
            return
        }

        const frag = document.createDocumentFragment()

        cards.forEach(card => {
            const cardEl = document.createElement('div')
            cardEl.className = 'card-item' // style das in deiner CSS

            const img = document.createElement('img')
            img.alt = card.name || ''
            img.loading = 'lazy'
            img.src = imageUrlFromCard(card, { quality: 'high', ext: 'png' }) // oder 'low'/'medium'/'high'
            // Fallback, falls Bild-Pfad leer ist:
            if (!img.src) img.style.display = 'none'

            const title = document.createElement('div')
            const setName = card?.set?.name || card?.setName || ''
            const number  = card?.localId || card?.number || ''
            title.className = 'card-title'
            title.textContent = `${card.name || '—'} ${number ? `(#${number})` : ''}`

            const meta = document.createElement('div')
            meta.className = 'card-meta'
            meta.textContent = [setName, card?.rarity].filter(Boolean).join(' · ')

            // Optional: Grobe Preis-Anzeige, falls im Objekt vorhanden (abhängig von Datenlage)
            // Manche Datensätze beinhalten z. B. tcgplayer/price-Metadaten. Wenn nicht, ausblenden.
            const priceWrap = document.createElement('div')
            priceWrap.className = 'card-price'
            const price = card?.prices?.market || card?.tcgplayer?.prices?.normal?.market
            priceWrap.textContent = (price != null) ? `~ ${price.toFixed ? price.toFixed(2) : price} $` : ''

            // Klick → Details
            cardEl.addEventListener('click', () => renderDetail(card))

            cardEl.appendChild(img)
            cardEl.appendChild(title)
            cardEl.appendChild(meta)
            if (priceWrap.textContent) cardEl.appendChild(priceWrap)

            frag.appendChild(cardEl)
        })

        $results.appendChild(frag)
    }

    function renderDetail(card) {
        if (!$detail) return
        $detail.innerHTML = ''

        const h = document.createElement('h2')
        const setName = card?.set?.name || ''
        h.textContent = `${card.name || '—'} ${card?.localId ? `(#${card.localId})` : ''}`

        const img = document.createElement('img')
        img.alt = card.name || ''
        img.loading = 'lazy'
        img.src = imageUrlFromCard(card, { quality: 'high', ext: 'png' })

        const info = document.createElement('div')
        info.className = 'card-detail'
        const fields = [
            ['Set', setName],
            ['Rarity', card?.rarity],
            ['Type(s)', (card?.types || []).join(', ')],
            ['HP', card?.hp],
            ['Illustrator', card?.illustrator],
        ].filter(([, v]) => v && ((Array.isArray(v) && v.length) || (!Array.isArray(v))))

        info.innerHTML = `
      <ul>
        ${fields.map(([k, v]) => `<li><strong>${k}:</strong> ${Array.isArray(v) ? v.join(', ') : v}</li>`).join('')}
      </ul>
    `

        $detail.appendChild(h)
        $detail.appendChild(img)
        $detail.appendChild(info)
        $detail.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    // ------- Event-Wireup -------
    async function onSearch() {
        const term = ($searchInput?.value || '').trim()
        if (!term) {
            setStatus('Bitte einen Suchbegriff eingeben.')
            return
        }
        setStatus('Suche läuft …')
        try {
            const cards = await fetchCardsByName(term)
            renderCards(cards)
            setStatus(cards.length ? `${cards.length} Karten gefunden.` : 'Nichts gefunden.')
        } catch (err) {
            console.error(err)
            setStatus('Fehler beim Laden der Karten.')
        }
    }

    if ($searchBtn) $searchBtn.addEventListener('click', onSearch)
    if ($searchInput) {
        $searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') onSearch()
        })
    }

    // Optional: Initiale Ansicht
    // setStatus('Gib einen Namen ein (z. B. "Squirtle") und drücke Enter.')
})()
