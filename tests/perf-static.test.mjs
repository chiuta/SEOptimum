// SEOptimum 2.2 — euristici statice CLS/LCP în „On-page”: imagini fără dimensiuni, prima imagine lazy, indiciu pentru imaginea principală.
// Rulare: node tests/perf-static.test.mjs. Nu măsoară Core Web Vitals; verifică doar logica de detecție pe markup.
import {createRequire} from "module"; import path from "path"; import {fileURLToPath} from "url";
const require = createRequire(process.env.PW_ROOT || import.meta.url); const {chromium} = require("playwright");
const URL_ = "file://" + path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "index.html");
let pass = 0, fail = 0; const eq = (a, b, m) => { if (JSON.stringify(a) === JSON.stringify(b)) pass++; else { fail++; console.log("  FAIL", m, JSON.stringify(a), "!=", JSON.stringify(b)); } };
const browser = await chromium.launch({executablePath: process.env.CHROMIUM_PATH || undefined});
const ctx = await browser.newContext({bypassCSP: true}); await ctx.route(/^https?:/, r => r.abort());
const p = await ctx.newPage(); const errs = []; p.on("pageerror", e => errs.push(e.message));
await p.goto(URL_); await p.waitForFunction(() => typeof analyzePageHtml === "function");
const A = h => p.evaluate(h => { const r = analyzePageHtml(h, null); return [r.imgNoDims, r.firstImgLazy, r.lcpHint, r.imgCount]; }, h);
const wrap = (head, body) => `<!doctype html><html><head><title>t</title>${head}</head><body>${body}</body></html>`;
eq(await A(wrap("", "<p>x</p>")), [0, false, false, 0], "fără imagini");
eq(await A(wrap("", '<img src="a.png" width="10" height="10">')), [0, false, false, 1], "cu dimensiuni");
eq(await A(wrap("", '<img src="a.png" width="10"><img src="b.png" height="5"><img src="c.png">')), [3, false, false, 3], "dimensiuni lipsă/parțiale");
eq(await A(wrap("", '<img src="a.png" style="aspect-ratio: 16/9"><img src="b.png" style="width:10px;height:5px">')), [0, false, false, 2], "aspect-ratio / width+height în style");
eq((await A(wrap("", '<img src="a.png" width="1" height="1" loading="lazy"><img src="b.png" width="1" height="1">')))[1], true, "prima imagine lazy");
eq((await A(wrap("", '<img src="a.png" width="1" height="1"><img src="b.png" width="1" height="1" loading="lazy">')))[1], false, "doar a doua lazy: nu se semnalează");
eq((await A(wrap("", '<img src="a.png" width="1" height="1" fetchpriority="HIGH">')))[2], true, "fetchpriority=high");
eq((await A(wrap('<link rel="preload" as="image" href="a.png">', '<img src="a.png" width="1" height="1">')))[2], true, "preload imagine");
eq((await A(wrap('<link rel="preload" as="style" href="a.css">', '<img src="a.png" width="1" height="1">')))[2], false, "preload de alt tip nu contează");
eq((await A(wrap("", '<noscript><img src="a.png"></noscript><img src="b.png" width="1" height="1">'))), [0, false, false, 1], "<noscript> ignorat");
// randare în interfață: rândurile apar în cardul de euristici (EN)
const ui = await p.evaluate(() => { renderOnPage(analyzePageHtml('<!doctype html><html><head><title>t</title></head><body><img src="a.png" loading="lazy"></body></html>', null), ''); const t = document.getElementById('opResults').textContent; return [/1 <img> without width and height/.test(t), /first <img> uses loading="lazy"/.test(t), /No fetchpriority="high"/.test(t)]; });
eq(ui, [true, true, true], "randare în interfață (EN)");
// chei i18n prezente în toate cele 8 limbi (paritate)
const keys = ["onpage.imgNoDims", "onpage.firstImgLazy", "onpage.lcpHint"];
const html = (await import("fs")).readFileSync(path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "index.html"), "utf8");
for (const k of keys) eq((html.match(new RegExp("['\"]" + k.replace(".", "\\.") + "['\"]\\s*:", "g")) || []).length, 8, "cheia " + k + " în 8 limbi");
eq(errs, [], "fără erori JS");
await browser.close(); console.log(`\n${pass} reușite, ${fail} eșuate`); process.exit(fail ? 1 : 0);
