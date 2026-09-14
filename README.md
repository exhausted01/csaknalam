# Csak Nálam? – v2 (Cloudflare Workers + static assets)

A Cloudflare időközben átalakította a rendszerét: a régi, külön "Pages
Functions" (`functions/` mappa) módszert az új projekteknél már nem ismeri fel
automatikusan a Git-alapú telepítés. Emiatt ez a verzió egyetlen Worker
szkriptre épül, ami mindent egy helyen kezel:

- `wrangler.jsonc` – megmondja a Cloudflare-nek, hogy a `src/worker.js` a fő
  szkript, és a `public/` mappa tartalmazza a statikus fájlokat.
- `src/worker.js` – ha a kérés `/api/check`-re érkezik, ő válaszol; minden
  más esetben egyszerűen kiszolgálja a `public/` mappában lévő fájlt.
- `public/` – a korábbi `index.html`, `about.html`, `privacy.html`,
  `robots.txt`, `sitemap.xml`, változatlan tartalommal.

## Állapot (2026-09-14)

A placeholderek ki vannak töltve: email (`czimbi.adam@gmail.com`) az `about.html`-ben
és a `privacy.html`-ben, domain (`csaknalam.com`) a `robots.txt`-ben, a
`sitemap.xml`-ben és a `worker.js` User-Agent stringjében. A `privacy.html`
sütis bekezdése is frissült, mert az AdSense fejléc-szkript már be van kötve
(a `ca-pub-2275464791427614` kliens-azonosítóval minden oldal `<head>`-jében).

**Ami még hátra van:** az AdSense fejléc-szkript önmagában még nem jelenít meg
hirdetést. Az AdSense fiókban létre kell hozni egy hirdetési egységet (vagy be
kell kapcsolni az Auto ads-ot), és az onnan kapott `<ins class="adsbygoogle">`
kódot be kell illeszteni az `index.html` `#ad-slot-1` divjébe (Auto ads esetén
erre nincs is szükség, a szkript magától elhelyezi a hirdetéseket).

## Telepítés

Ha a GitHub repód már össze van kötve a Cloudflare Workers projekttel, elég
lecserélni a repó tartalmát erre a szerkezetre (régi `functions/` mappa és a
gyökérben lévő `index.html` stb. törlése, ezek helyett ez a csomag), és a
commit után a Cloudflare automatikusan újra telepíti.
