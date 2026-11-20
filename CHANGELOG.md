# Jurnal de modificări — SEOptimum

## 2.3.3 — 2026-11-19

- Memoria locală (`localStorage`) cu valoarea coruptă `null` la una dintre cheile aplicației (de ex. lista de bifat) ocolea valoarea implicită, iar pagina „Checklist audit SEO” cădea cu `Cannot read properties of null`; citirea validează acum tipul (`null` sau un tip diferit de cel așteptat → valoarea implicită), deci o stocare coruptă nu mai poate bloca fila (constatat de bateria adversarială din 19 noiembrie 2026)

## 2.3.2 — 2026-11-17

- Compatibilitate cu browsere mai vechi (Chrome/Edge 55+, Firefox 52+, Safari 10.1+/iOS 10.3+): kitul 1.8.0 aduce stratul de compatibilitate (rezerve pentru API-urile care lipsesc în motoarele vechi), iar sintaxa JavaScript mai nouă decât ES2017 a fost înlocuită cu forme echivalente acolo unde exista; expresiile regulate noi și `import()` trec prin rezerve. Fără modificări de funcționalitate intenționate. Verificat cu parser ES2017 și într-un motor vechi simulat, nu pe dispozitive reale.

## 2.3.1 — 2026-11-15

- Nou: butoane de distribuire pe rețele sociale (vertical, pe marginea din stânga; fără scripturi externe, doar linkuri deschise la clic); bara de zoom cu lupă și „potrivire ecran” revine pe marginea din dreapta, centrată pe verticală; corectat afișarea suprapusă la zoom mare (panourile cu înălțimi în vh/vw nu mai ies din ecran).

## 2.3.0 — 2026-11-15

- Nou: accesibilitate pe toate ecranele — butonul „Aa” (mărimea textului, contrast ridicat, fără animații, text lizibil, linkuri subliniate, citire cu voce), săgeata „Înapoi sus” și „Sari la conținut”; fereastra se potrivește mereu ecranului; zoom-ul cu lupă și „potrivire ecran” stau acum pe marginea din stânga (fff-kit 1.6.0).

## 2.2.11 — 2026-11-15

- Nou: texturi fractale hiper-detaliate (fff-texturi 1.1.2) — fundalul și suprafețele mari (carduri, panouri, antete, butoane; filele și dialogurile ascunse la încărcare, când se deschid) primesc un material generat local (WebGL2, fără rețea și fără imagini), care se repetă fără cusătură; culorile aplicației rămân ale ei. Se oprește din dialogul „Transparență” sau cu `?notex=1`.

## 2.2.6 — 2026-11-08
Doar documentare: README în de/es/fr/hu/it/pt spune 21 de instrumente (în loc de 20), ca în EN/RO și în aplicație.

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
