# SEOptimum

[English](README.md) · [Română](README.ro.md) · [Français](README.fr.md) · **Italiano** · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

**Versione:** 1.3.7 · **Ultimo aggiornamento:** 2026-10-23

Lingue dell'interfaccia: **Română, English, Français, Italiano, Español, Português (PT), Deutsch, Magyar**

Laboratorio SEO in un unico file HTML: venti strumenti che funzionano nel browser.

**App online:** https://chiuta.github.io/SEOptimum/

![Schermata](screenshot.it.png)

## Che cos'è

SEOptimum («offline SEO workbench») riunisce strumenti per l'audit on-page, i dati strutturati, i file tecnici, i contenuti, la SEO off-page e locale. L'analisi avviene nella scheda del browser, sul testo o sull'HTML che incolli; l'app non ha account né analytics. L'interfaccia è disponibile in inglese e rumeno (pulsanti «EN» / «RO»).

## Funzioni

Il menu contiene 20 strumenti, raggruppati così:

- **Content & on-page:** analizzatore on-page (titolo, intestazioni, immagini, link, meta, dati strutturati, parola chiave target), anteprima SERP e social (Google desktop/mobile, Facebook/LinkedIn, X/Twitter), generatore di meta tag, Schema / JSON-LD (costruzione e validazione, anteprima del rich result), ricerca di parole chiave (densità e n-grammi, clustering, intento e long tail, cannibalizzazione), leggibilità (sei formule, verifica per il featured snippet), verifica dei contenuti duplicati, confronto tra concorrenti.
- **Technical:** file tecnici (robots.txt, sitemap.xml, redirect, hreflang, llms.txt e altri file generati nell'app), analizzatore di log, struttura interna e profondità di clic, audit del sito, ottimizzatore di slug.
- **Off-page & local:** analizzatore di anchor text, verifica della coerenza NAP.
- **Utilities:** costruttore UTM, verifica del contrasto WCAG 2.2, validatore GTIN / codici a barre (UPC-A, EAN-8, EAN-13, GTIN-14).
- **Reference:** checklist SEO (esportazione Markdown) e scheda di riferimento.
- **Verifica rapida dei dati strutturati:** nell'analizzatore on-page, ogni blocco JSON-LD trovato ha il pulsante «Verifica i campi obbligatori nello strumento Schema →», che lo invia alla scheda Validate ed esegue la validazione.
- **Scorciatoia da tastiera:** `Ctrl/Cmd+Invio` in un campo di testo preme il pulsante principale più vicino (Analyze, Generate, Check ecc.).
- Esportazione del report on-page (`on-page-report.md`) e stampa.

## Guida all'uso

1. Apri la pagina e scegli la lingua con «EN» / «RO»; il tema si può cambiare dall'intestazione.
2. Dal menu a sinistra scegli uno strumento (per esempio `<on-page/>`).
3. Nell'analizzatore on-page incolla il sorgente HTML della pagina (nel browser: Ctrl/Cmd+U, copia) in «Page HTML source», compila facoltativamente «Focus keyword» e premi «Analyze».
4. Facoltativamente, compila «Page URL» e premi «Try fetch» per tentare il download diretto; la maggior parte dei siti blocca la richiesta (CORS), nel qual caso si usa l'incollatura manuale.
5. Usa «Export report» per scaricare il report `.md` oppure «Print report».
6. Nei generatori (meta, schema, UTM ecc.) compila i campi e premi «Copy».
7. Nell'UTM builder, «Save to list» conserva i link salvati in questo browser.
8. Nella «SEO audit checklist» spunta le voci; lo stato viene conservato in locale e l'esportazione produce `seo-checklist.md`.

## Privacy e rete

- **Archiviazione locale:** `localStorage`, chiavi con prefisso `seoFF.` (lingua, tema, elenco UTM salvato, stato della checklist).
- **Rete:** l'app effettua richieste solo su azioni esplicite dell'utente: il pulsante «Try fetch» (`fetch` verso l'URL che inserisci, verso qualsiasi sito) e l'anteprima di un'immagine `og:image` indicata tramite URL (il browser carica l'immagine da quell'URL). La CSP della pagina consente queste connessioni (`connect-src *`, `img-src https: http:`). Per il resto l'analisi avviene in locale; non ci sono CDN, font esterni o analytics.
- I domini `example.com`, `schema.org` ecc. presenti nel codice compaiono come esempi o identificatori di vocabolario, non come risorse caricate.

- **CSP:** gli script sono consentiti solo tramite hash `sha256` (senza `'unsafe-inline'` per gli script); la finestra di stampa del report non usa più uno script inline (la stampa viene avviata dalla scheda principale). Gli stili inline restano consentiti.

## Esecuzione locale / offline

Scarica `index.html` e aprilo nel browser; funziona senza internet. Solo «Try fetch» e l'anteprima delle immagini remote richiedono una connessione.

## Licenza

MIT per il codice e la struttura dell'app — vedi il file `LICENSE`. Le eventuali librerie di terze parti incluse nel file mantengono le proprie licenze.

## Audit

Audit: 2026-10-10 — verificato con Playwright e axe-core (WCAG 2.1 AA); sono stati corretti il contrasto dei colori e l'overflow orizzontale su schermi stretti. La direttiva `frame-ancestors` è stata rimossa dal meta CSP (i browser la ignorano in `<meta>`; funziona solo come intestazione HTTP, che GitHub Pages non consente). `connect-src *` e `img-src https: http:` restano volutamente ampi, perché «Try fetch» e l'anteprima `og:image` caricano URL arbitrari inseriti dall'utente; non possono essere ristretti senza compromettere la funzione.

## Autore

Alexio — Alexandru-Ionuț Chiuță, contatto: alexio@trom.tf

## Riepilogo

SEOptimum è un laboratorio SEO in un unico file con 20 strumenti (analizzatore on-page, anteprima SERP/social, generatori di meta e JSON-LD, ricerca di parole chiave, leggibilità, robots/sitemap/hreflang/llms.txt, analizzatore di log, audit del sito, costruttore UTM, contrasto WCAG, validatore GTIN, checklist). Interfaccia in inglese/rumeno. L'analisi avviene in locale; la rete è usata solo per il pulsante facoltativo «Try fetch» e per le anteprime og:image remote. Le preferenze sono memorizzate in localStorage (chiavi `seoFF.`).

## Fonti verificate l'11.10.2026

- L'elenco dei bot di IA nella scheda di riferimento (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Google-Extended ecc.) è stato ricontrollato rispetto a guide pubbliche del 2026 (ad es. searchenginejournal.com/ai-crawler-user-agents-list, anagram.ai/blog/ai-crawler-user-agent-list-2026-14-bots-and-robotstxt-tokens-to-know); i nomi coincidono, ma il comportamento dei bot cambia — l'elenco resta contrassegnato come deperibile nell'app.

## Cronologia / Changelog

### 1.3.7 — 2026-10-23

- I dialoghi nativi `confirm()` sono sostituiti da `FFF.dialog` (accessibile, tradotto; kit 1.2.0); il comportamento non cambia.

### 1.3.5 — 2026-10-22

fff-kit 1.1.4: target touch e dimensione minima del testo.

### 1.3.4 — 2026-10-22
- fff-kit 1.1.2: PBKDF2 con 600.000 iterazioni, protezione anti-clickjacking

### 1.3.3 — 2026-10-22
- Accessibilità: la pagina espone esattamente un titolo di livello 1 per vista (i titoli degli strumenti sono elementi di livello 2 annunciati come livello 1, l'aspetto resta invariato).
- Mobile: tutto il testo piccolo arriva ad almeno 12 px; la demo della home non esce più da uno schermo di 360 px.

### 1.3.2 — 2026-10-22
- Il segnaposto di esempio della scheda llms.txt («Running shoes and gear, tested by trail runners.») è ora tradotto in tutte le lingue dell’interfaccia.

### 1.3.1 — 2026-10-22
- Correzioni di traduzione: il titolo della pagina e i meta tag seguono la lingua dell’interfaccia; etichette, segnaposto e testi demo dei moduli dei dati strutturati (schema) sono tradotti nelle 8 lingue.

- 1.2.0 — 2026-10-18: In «On-page», collegamento a ScryVeil con il dominio del campo URL (solo link, senza richiesta di rete; nascosto per IP/localhost).
- 1.1.0 — 2026-10-14: Copia di riserva ed etichettatura dei dati (fff-kit).

- 1.0.0 — 2026-10-12: la versione e la data dell'ultimo aggiornamento sono mostrate nell'app
- **11 ottobre 2026** (round 7) — l'analizzatore on-page riconosce anche la vecchia forma `<meta http-equiv="Content-Type" content="...; charset=...">` (prima segnalava erroneamente «Charset not set»); l'assenza totale del charset resta un avviso (WARN), verificato con due pagine di prova; 0 errori, axe 0 violazioni a 1280×800 e 360×740.
- **11 ottobre 2026** — CSP con hash per lo script (senza `'unsafe-inline'` in `script-src`) e `form-action 'none'`; pulsante per verificare i blocchi JSON-LD dell'analizzatore on-page nel validatore Schema; scorciatoia Ctrl/Cmd+Invio; rimosse due schermate smarrite (`s_1280.png`, `s_360.png`); testato con CSP attiva (0 errori, axe-core 0 violazioni a 1280×800 e 360×740).
- **11 ottobre 2026** — descrizione Schema / JSON-LD (EN e RO): indica esplicitamente la scheda «Validate / Validează» (reperibilità); la nota sui bot di IA menziona il ricontrollo dell'11.10.2026; verificato con Playwright e axe-core (0 violazioni a 1280×800 e 360×740, nessun overflow orizzontale). L'app non ha un numero di versione.
