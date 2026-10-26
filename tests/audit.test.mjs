// SEOptimum 2.0 — plan de acțiune ordonat după impact + comparare între două versiuni ale paginii.
import {createRequire} from "module";
import path from "path"; import {fileURLToPath} from "url"; import fs from "fs"; import os from "os";
const require = createRequire(process.env.PW_ROOT || import.meta.url);
const {chromium} = require("playwright");
const __dir = path.dirname(fileURLToPath(import.meta.url));
const URL_ = "file://" + path.resolve(__dir, "..", "index.html");
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; console.log("  FAIL:", m); } };
const eq = (a, b, m) => ok(JSON.stringify(a) === JSON.stringify(b), m + " (obținut " + JSON.stringify(a) + ", așteptat " + JSON.stringify(b) + ")");
const sect = s => console.log("\n## " + s);
const browser = await chromium.launch({executablePath: process.env.CHROMIUM_PATH || undefined});
async function newPage(lang) {
  const ctx = await browser.newContext({viewport: {width: 1280, height: 900}, acceptDownloads: true, bypassCSP: true});
  const reqs = []; await ctx.route(/^https?:/, r => { reqs.push(r.request().url()); r.abort(); });
  await ctx.addInitScript(l => { try { localStorage.setItem("seoFF.lang", JSON.stringify(l)); } catch (e) {} }, lang || "en");
  const p = await ctx.newPage(); p.__errs = []; p.on("pageerror", e => p.__errs.push(e.message)); p.__reqs = reqs; p.__ctx = ctx;
  await p.goto(URL_); await p.waitForFunction(() => typeof analyzePageHtml === "function" && document.querySelector('[data-tool="onpage"]'));
  return p;
}
const BAD = `<!doctype html><html><head><title>Hi</title><meta name="robots" content="noindex"></head><body><h2>Intro</h2><h4>x</h4><img src="a.png"><img src="b.png"><a href="/x"></a><p>short text</p></body></html>`;
const GOOD = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Running shoes guide for beginners</title><meta name="description" content="How to pick running shoes: fit, cushioning and budget explained for beginners."><link rel="canonical" href="https://example.com/shoes"><meta name="viewport" content="width=device-width, initial-scale=1"><meta property="og:title" content="t"><meta property="og:description" content="d"><meta property="og:image" content="i"><meta name="twitter:card" content="summary"></head><body><h1>Running shoes</h1><h2>Fit</h2><img src="a.png" alt="shoe"><a href="/x">more</a><p>${"running shoes words ".repeat(60)}</p><script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"x"}</script></body></html>`;

sect("Funcții pure");
let p = await newPage();
const ids = await p.evaluate(h => auditIssues(analyzePageHtml(h, null), "").map(i => [i.id, i.impact, i.effort, i.n]), BAD);
const idset = ids.map(x => x[0]);
for (const must of ["noindex", "noH1", "noViewport", "noDesc", "noCanonical", "noLang", "noCharset", "imgAlt", "emptyLink", "skipLevel", "thin", "og", "twitter", "noJsonLd", "titleLong"])
  if (must !== "titleLong") ok(idset.includes(must), "BAD conține problema " + must);
ok(!idset.includes("noTitle"), "BAD are titlu → fără noTitle");
ok(ids.every((x, i) => i === 0 || ids[i - 1][1] > x[1] || (ids[i - 1][1] === x[1] && ids[i - 1][2] <= x[2])), "ordonate după impact desc, apoi efort asc: " + JSON.stringify(ids.map(x => x[0] + ":" + x[1] + "/" + x[2])));
eq(ids.find(x => x[0] === "imgAlt")[3], 2, "număr imagini fără alt");
eq(ids[0][1], 5, "prima problemă are impact maxim");
const goodIds = await p.evaluate(h => auditIssues(analyzePageHtml(h, null), "running shoes").map(i => i.id), GOOD);
ok(!goodIds.some(i => ["noTitle", "noindex", "noH1", "noViewport", "noDesc", "imgAlt", "kwTitle", "kwH1", "kwFirst", "jsonLdBad", "thin"].includes(i)), "GOOD fără problemele grave: " + goodIds.join(","));
const kw = await p.evaluate(h => auditIssues(analyzePageHtml(h, null), "zzz qqq").map(i => i.id).filter(i => i.startsWith("kw")), GOOD);
eq(kw.sort(), ["kwDesc", "kwFirst", "kwH1", "kwTitle"], "cuvânt-cheie absent → 4 probleme kw");
const jl = await p.evaluate(() => auditIssues(analyzePageHtml('<html lang=en><head><title>a</title><script type="application/ld+json">{bad</script></head><body><h1>x</h1></body></html>', null), "").map(i => i.id));
ok(jl.includes("jsonLdBad") && !jl.includes("noJsonLd"), "JSON-LD invalid detectat");
// diff + snapshot valid
const df = await p.evaluate(() => { const a = {issues: [{id: "noH1", n: 0}, {id: "imgAlt", n: 3}, {id: "og", n: 2}]}, b = {issues: [{id: "imgAlt", n: 1}, {id: "thin", n: 9}]}; return auditDiff(a, b); });
eq(df, {fixed: ["noH1", "og"], added: ["thin"], same: [{id: "imgAlt", a: 3, b: 1}]}, "diferență între versiuni");
const vs = await p.evaluate(() => [validSnapshot(null), validSnapshot({}), validSnapshot({app: "seoptimum", kind: "audit", v: 1, issues: [{id: "evil"}], metrics: {}, score: {pass: 1, total: 2}}), validSnapshot({app: "seoptimum", kind: "audit", v: 1, issues: [{id: "noH1", n: 0}], metrics: {}, score: {pass: 1, total: 2}})]);
eq(vs, [false, false, false, true], "validarea instantaneului respinge id-uri necunoscute");
// fiecare problemă are text EN și RO
const tx = await p.evaluate(() => AUD_DEFS.every(d => EN_STRINGS["aud." + d[0] + ".l"] && EN_STRINGS["aud." + d[0] + ".f"] && RO_STRINGS["aud." + d[0] + ".l"] && RO_STRINGS["aud." + d[0] + ".f"]));
ok(tx, "toate problemele au etichetă și remediu în EN și RO");
await p.__ctx.close();

sect("Interfață: plan, referință, comparație");
p = await newPage();
await p.click('[data-tool="onpage"]');
await p.fill("#opHtml", BAD); await p.fill("#opKeyword", "running shoes"); await p.click("#opAnalyzeBtn");
ok(await p.isVisible("#auditPlan"), "cardul Plan de acțiune apare");
const first = await p.$$eval("#auditPlan li", l => l.map(x => x.dataset.aud));
ok(first.length > 8, "lista are mai multe puncte: " + first.length);
ok(["noindex", "kwTitle", "noH1", "noViewport"].includes(first[0]) || first[0] === "noindex", "primul punct are impact maxim: " + first[0]);
ok((await p.textContent("#auditPlan li")).includes("Critical"), "eticheta de impact afișată");
ok((await p.textContent("#audCompare")).includes("No baseline"), "fără referință: mesaj de îndrumare");
await p.click("#audSave"); await p.waitForSelector("#audCompare .small");
ok((await p.textContent("#audCompare")).includes("Fixed since the baseline (0)"), "imediat după salvare: nimic rezolvat");
// versiunea nouă
await p.fill("#opHtml", GOOD); await p.click("#opAnalyzeBtn"); await p.waitForSelector("#audCompare table");
const fixed = await p.$$eval('#audCompare [data-grp="fixed"] strong', e => e.map(x => x.textContent));
ok(/Fixed since the baseline \((\d+)\)/.test(fixed[0]) && +/\((\d+)\)/.exec(fixed[0])[1] >= 8, "multe probleme rezolvate: " + fixed[0]);
const added = await p.textContent('#audCompare [data-grp="added"]');
ok(/\(0\)|\(\d+\)/.test(added), "grupul 'apărute' există");
const wordsRow = await p.$$eval('#audCompare tr[data-m="words"] td', e => e.map(x => +x.textContent || x.textContent));
ok(wordsRow[2] > wordsRow[1], "indicator cuvinte: după > înainte " + JSON.stringify(wordsRow));
ok((await p.textContent("#audScoreCmp")).includes("→"), "scor comparat");
// persistență după reîncărcare
await p.reload(); await p.waitForFunction(() => typeof analyzePageHtml === "function");
const kept = await p.evaluate(() => store.get("auditBase", null));
ok(kept && kept.app === "seoptimum" && kept.issues.length > 8, "referința persistă în localStorage (prefix seoFF.)");
await p.click('[data-tool="onpage"]'); await p.fill("#opHtml", GOOD); await p.click("#opAnalyzeBtn"); await p.waitForSelector("#audCompare table");
ok(true, "comparația se reface după reîncărcare");
// descărcare + încărcare instantaneu
const [dl] = await Promise.all([p.waitForEvent("download"), p.click("#audDl")]);
const f = await dl.path(); const snap = JSON.parse(fs.readFileSync(f, "utf8"));
ok(snap.app === "seoptimum" && snap.v === 1 && Array.isArray(snap.issues), "instantaneu JSON valid descărcat");
await p.click("#audClear"); ok((await p.textContent("#audCompare")).includes("No baseline"), "ștergere referință");
await p.setInputFiles("#audFile", f); await p.waitForSelector("#audCompare table");
ok(true, "încărcare instantaneu ca referință");
const bad = path.join(os.tmpdir(), "seo-bad-" + process.pid + ".json"); fs.writeFileSync(bad, '{"x":1}');
await p.setInputFiles("#audFile", bad); await p.waitForTimeout(300);
ok(await p.evaluate(() => store.get("auditBase", null).app === "seoptimum"), "fișier invalid nu înlocuiește referința"); fs.unlinkSync(bad);
// XSS: titlul din pagină apare ca text
await p.fill("#opHtml", '<html><head><title><img src=x onerror=window.__pwn=1></title></head><body></body></html>'); await p.click("#opAnalyzeBtn"); await p.click("#audSave"); await p.waitForTimeout(200);
ok(!(await p.evaluate(() => window.__pwn)), "fără injecție prin titlul paginii");
await p.fill("#opHtml", GOOD); await p.click("#opAnalyzeBtn"); await p.waitForSelector("#audCompare table");
ok(!(await p.evaluate(() => window.__pwn)), "fără injecție în comparație");
// accesibilitate
if (process.env.FFF_AXE) {
  await p.addScriptTag({path: process.env.FFF_AXE});
  const v = await p.evaluate(async () => (await axe.run("#auditPlan", {runOnly: ["wcag2a", "wcag2aa"]})).violations.map(x => x.id + ":" + x.nodes.length));
  eq(v, [], "axe pe planul de acțiune");
}
ok(p.__errs.length === 0, "fără erori de pagină: " + p.__errs.join("|")); ok(p.__reqs.length === 0, "fără cereri de rețea: " + p.__reqs.join(","));
await p.__ctx.close();

sect("Română");
p = await newPage("ro");
await p.click('[data-tool="onpage"]'); await p.fill("#opHtml", BAD); await p.click("#opAnalyzeBtn");
const ro = await p.textContent("#auditPlan");
ok(ro.includes("Plan de acțiune") && ro.includes("Critic") && ro.includes("Salvează ca referință"), "plan în română");
ok(ro.includes("Pagina este setată noindex"), "problemele în română");
await p.__ctx.close();
await browser.close();
console.log(`\n==== ${pass} verificări reușite, ${fail} eșuate ====`);
process.exit(fail ? 1 : 0);
