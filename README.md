# Csak Nálam? – gyakorló weboldal

Egyszerű "működik ez az oldal, vagy csak nálam nem?" ellenőrző. Statikus
frontend (`index.html`, `about.html`, `privacy.html`) + egy szerver oldali
függvény (`functions/api/check.js`), ami Cloudflare Pages Function-ként fut.

## Mielőtt élesíted

1. Válassz domaint (pl. `csaknalam.hu` vagy hasonló, lásd az átadott
   útmutatót), és írd át rá a placeholdereket:
   - `robots.txt` és `sitemap.xml`: `TE-DOMANED.hu` → a valódi domained
   - `about.html` és `privacy.html`: `[ide kerül a saját email címed]` → a
     saját email címed
2. Ne módosíts mást, ha nem vagy biztos benne — a `functions/api/check.js`
   fájl a működés szíve.

## Hogyan fut ez élesben?

Nincs szükség build lépésre. A Cloudflare Pages a repó gyökeréből szolgálja
ki a statikus fájlokat, a `functions/` mappát pedig automatikusan
szerver oldali végpontokká alakítja (`functions/api/check.js` →
`/api/check`). A telepítés lépéseit külön kapod meg.
