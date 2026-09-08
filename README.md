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

## Mielőtt élesíted

Ugyanazok a placeholderek, mint eddig, csak most a `public/` mappában:
- `public/about.html`, `public/privacy.html`: `[ide kerül a saját email címed]`
- `public/robots.txt`, `public/sitemap.xml`: `TE-DOMANED.hu` → a valódi domained

## Telepítés

Ha a GitHub repód már össze van kötve a Cloudflare Workers projekttel, elég
lecserélni a repó tartalmát erre a szerkezetre (régi `functions/` mappa és a
gyökérben lévő `index.html` stb. törlése, ezek helyett ez a csomag), és a
commit után a Cloudflare automatikusan újra telepíti.
