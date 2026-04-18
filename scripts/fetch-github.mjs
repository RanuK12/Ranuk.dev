#!/usr/bin/env node
/* =========================================================
   fetch-github.mjs — Snapshot público del perfil GitHub
   Se ejecuta vía GitHub Action (nightly) y escribe data/github.json
   con repos, lenguajes agregados y estadísticas, listo para render
   client-side sin exponer tokens.
   Uso: GITHUB_USER=RanuK12 node scripts/fetch-github.mjs
   ========================================================= */

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const USER = process.env.GITHUB_USER || 'RanuK12';
const TOKEN = process.env.GITHUB_TOKEN; // opcional, evita rate-limits en Actions
const OUT = new URL('../data/github.json', import.meta.url);

const headers = {
    'User-Agent': 'ranuk-dev-sync',
    Accept: 'application/vnd.github+json',
    ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {})
};

async function ghFetch(path) {
    const res = await fetch(`https://api.github.com${path}`, { headers });
    if (!res.ok) throw new Error(`GH ${path} → ${res.status}`);
    return res.json();
}

async function fetchAllRepos() {
    const repos = [];
    for (let page = 1; page <= 5; page++) {
        const batch = await ghFetch(`/users/${USER}/repos?per_page=100&page=${page}&sort=updated`);
        repos.push(...batch);
        if (batch.length < 100) break;
    }
    return repos.filter(r => !r.fork && !r.archived);
}

async function fetchLanguagesFor(repo) {
    try { return await ghFetch(`/repos/${USER}/${repo.name}/languages`); }
    catch { return {}; }
}

function aggregateLanguages(byRepoLangs) {
    const totals = {};
    for (const langs of byRepoLangs) {
        for (const [name, bytes] of Object.entries(langs)) {
            totals[name] = (totals[name] || 0) + bytes;
        }
    }
    const total = Object.values(totals).reduce((a, b) => a + b, 0) || 1;
    return Object.entries(totals)
        .map(([name, bytes]) => ({
            name,
            bytes,
            pct: +(bytes / total * 100).toFixed(1)
        }))
        .sort((a, b) => b.bytes - a.bytes);
}

function pickFeatured(repos, n = 6) {
    // Score: stars + reciente + tiene description.
    const now = Date.now();
    return repos
        .map(r => {
            const ageDays = (now - new Date(r.pushed_at).getTime()) / 86400000;
            const recency = Math.max(0, 1 - ageDays / 365); // 1 si <hoy, 0 si >1 año
            const score = (r.stargazers_count * 5) + recency * 3 + (r.description ? 0.5 : 0);
            return { ...r, _score: score };
        })
        .sort((a, b) => b._score - a._score)
        .slice(0, n)
        .map(r => ({
            name: r.name,
            full_name: r.full_name,
            description: r.description,
            url: r.html_url,
            homepage: r.homepage || null,
            language: r.language,
            stars: r.stargazers_count,
            forks: r.forks_count,
            topics: r.topics || [],
            updated: r.pushed_at
        }));
}

async function main() {
    console.log(`→ Sync GitHub para @${USER}`);
    const repos = await fetchAllRepos();
    console.log(`  ${repos.length} repos públicos no archivados`);

    const allLangs = await Promise.all(repos.map(fetchLanguagesFor));
    const languages = aggregateLanguages(allLangs);

    const featured = pickFeatured(repos);

    const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);

    const data = {
        user: USER,
        generated_at: new Date().toISOString(),
        stats: {
            public_repos: repos.length,
            total_stars: totalStars,
            languages_count: languages.length,
            last_push: repos[0]?.pushed_at || null
        },
        languages: languages.slice(0, 12),
        featured
    };

    mkdirSync(dirname(fileURLToPath(OUT)), { recursive: true });
    writeFileSync(OUT, JSON.stringify(data, null, 2) + '\n');
    console.log(`✓ data/github.json escrito (${repos.length} repos, ${languages.length} lenguajes)`);
}

main().catch(err => { console.error(err); process.exit(1); });
