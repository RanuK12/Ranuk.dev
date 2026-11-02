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

const sleep = ms => new Promise(r => setTimeout(r, ms));

const headers = {
    'User-Agent': 'ranuk-dev-sync',
    Accept: 'application/vnd.github+json',
    ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {})
};

async function ghFetch(path, retries = 3) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const res = await fetch(`https://api.github.com${path}`, { headers });
            if (!res.ok) throw new Error(`GH ${path} → ${res.status}`);
            return res.json();
        } catch (err) {
            if (attempt === retries) throw err;
            console.warn(`⚠️  ghFetch attempt ${attempt} failed for ${path}, retrying...`);
            await sleep(1000);
        }
    }
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
    if (!byRepoLangs || byRepoLangs.length === 0) return [];
    const totals = {};
    for (const langs of byRepoLangs) {
        if (!langs || Object.keys(langs).length === 0) continue;
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

const FLAGSHIP_REPOS = [
    'flight-alert-public',
    'ranuk-browser-bridge',
    'ranuk-voice-closer',
    'ranuk-pitch-arena',
    'ADA-Audits',
    'ranuk-ai-debate-studio',
    'rk-mcp-datacanvas',
    'Ranuk.dev',
    'api',
    'fc27-gallery-bot',
    'crypto-price-notifier'
];

function pickFeatured(repos, n = 8) {
    // Score: Flagship status + description presence + recency + stars
    const now = Date.now();
    return repos
        .filter(r => r.name !== 'RanuK12') // Exclude profile readme repo
        .map(r => {
            const isFlagship = FLAGSHIP_REPOS.includes(r.name);
            const flagshipIndex = FLAGSHIP_REPOS.indexOf(r.name);
            const ageDays = (now - new Date(r.pushed_at).getTime()) / 86400000;
            const recency = Math.max(0, 1 - ageDays / 180); // higher weight for recent work
            const hasDesc = (r.description && r.description.trim().length > 5) ? 1 : 0;
            
            // Prioritize flagships and well-documented recent projects over abandoned 1-star repos
            let score = 0;
            if (isFlagship) {
                score += 50 - flagshipIndex * 2;
            }
            score += hasDesc * 10;
            score += (r.stargazers_count || 0) * 4;
            score += recency * 8;
            if (!hasDesc && !isFlagship) {
                score -= 20; // penalize empty undocumented repos
            }
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
    if (!TOKEN) {
        console.warn('⚠️  GITHUB_TOKEN not set – unauthenticated requests are rate-limited to 60/hour. Consider setting the token for reliable sync.');
    }
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
