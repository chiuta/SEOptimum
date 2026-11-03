# Jurnal de modificări — SEOptimum

## 2.2.3 — 2026-11-03

Destinații «Trimite către…» pentru pașaportul de învățare: adăugate FENARIUM și MENSURA (registrul de aplicații-țintă reinjectat din hub).

## 2.2.2 — 2026-11-03

Pașaport de învățare comun (FFF): „Notează în pașaport”, repetări eșalonate, export/import passport/fff și certificat tipărabil auto-declarat; local, fără server.

## 2.2.1 — 2026-11-02 (reîmprospătare kit)

- Nou (kit): **Sincronizare între dispozitive** (`FFF.sync`) — în dialogul «Transparență» (clic pe versiune → Copie de siguranță): conectezi două dispozitive direct (WebRTC, cod/QR, fără server și fără cont) și își schimbă datele aplicației; cea mai recentă valoare câștigă, secretele (chei API, parole) nu se trimit, ștergerile nu se propagă. Aplicarea trece prin importul kitului (confirmare, chei permise, rollback).
- Nou (kit): **Istoric local — «mașina timpului»** (`FFF.history`) — instantanee automate ale datelor (IndexedDB, fără secrete), diferență față de starea curentă și restaurare reversibilă; «Șterge datele aplicației» șterge și istoricul.
- Module adăugate: `qr`, `p2p`, `sync`, `history` (+~140 KB). Versiunea aplicației nu se schimbă.

## 2.2.1 — 2026-11-02 (anterior: 2.2.0)

- Sursă actualizată (2026-11-02): nota Google pentru FAQPage — din 7 mai 2026 Google nu mai afișează rezultate îmbogățite FAQ pentru niciun site (în 8 limbi).

## 2.2.0 — 2026-10-27 (anterior: 2.1.0)

- Nou în „Euristici de performanță” (on-page): `<img>` fără width/height (risc CLS), prima imagine cu loading="lazy" (risc LCP), lipsa fetchpriority/preload pentru imaginea principală (informativ). Euristici statice de markup, nu măsurători. Texte în 8 limbi (fr/it/es/pt/hu/de: traducere automată).
- Teste noi: `tests/perf-static.test.mjs` (15 verificări).
- Nu implementat: măsurarea Core Web Vitals; analiza paginilor externe fără CORS. JSON-LD exista deja (nemodificat).

## 2.1.0 — 2026-10-27 (anterior: 2.0.0)

- Nou: instrument „Core Web Vitals” (al 21-lea): încadrează LCP/INP/CLS introduse de utilizator în bun / de îmbunătățit / slab, cu explicații (ce măsoară, cauze, remedii). Nu măsoară nimic. Logica de încadrare testată pe valorile-limită.
- Nou: notă pe ecranul Acasă despre limita CORS a „Try fetch” și despre ce nu poate face aplicația (română/engleză).
- Actualizat numărul de instrumente (20 -> 21) în descrierea Acasă, în toate cele 8 limbi.
- README: „Stare: stabil”, „Offline: complet (Try fetch cere internet și acord CORS)”.
- Existau deja (nemodificate): verificare date structurate (Schema / JSON-LD) și avertisment CORS lângă „Try fetch”.
- Nu implementat: măsurarea efectivă a Core Web Vitals; analiza paginilor externe fără CORS.
