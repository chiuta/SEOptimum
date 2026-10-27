# Jurnal de modificări — SEOptimum

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
