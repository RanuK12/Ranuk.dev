/**
 * Ranuk IT Solutions — WebMCP (Web Model Context Protocol) Integration
 * Exposes structured, agent-callable tools on https://ranuk.dev via Chrome's
 * document.modelContext (with navigator.modelContext preview fallback).
 * Progressive enhancement: completely safe and silent on browsers without WebMCP.
 */
(function initRanukWebMCP() {
  'use strict';

  const RANUK_SERVICES = [
    {
      id: 'ai-agents-api-automation',
      name: 'Custom Python AI Agents, Telegram Bots & API Workflow Automation',
      startingPriceUsd: 145,
      deliveryDays: '3-10',
      stack: ['Python', 'FastAPI', 'MCP', 'Playwright', 'PostgreSQL', 'Telegram'],
      channels: {
        upwork: 'https://www.upwork.com/freelancers/~0119f7eed1d5419c79',
        laborx: 'https://laborx.com/gigs/i-will-build-custom-ai-agents-mcp-servers-and-browser-automation-in-python-or-node-js-127024',
      },
    },
    {
      id: 'wcag-ada-accessibility-audit',
      name: 'WCAG 2.1 AA / ADA Web Accessibility Audit + Ready-to-Use Code Fixes',
      startingPriceUsd: 129,
      deliveryDays: '2-6',
      stack: ['WCAG 2.1 AA', 'ADA Title III', 'EAA', 'HTML/CSS/ARIA', 'axe-core'],
      channels: {
        upwork: 'https://www.upwork.com/freelancers/~0119f7eed1d5419c79',
        laborx: 'https://laborx.com/gigs/i-will-run-an-automated-wcag-2-1-aa-ada-web-accessibility-audit-with-code-fixes-127025',
      },
    },
    {
      id: 'webmcp-agent-readiness',
      name: 'WebMCP & MCP Website Integration (Make Your Site Agent-Ready)',
      startingPriceUsd: 250,
      deliveryDays: '3-5',
      stack: ['WebMCP', 'document.modelContext', 'Declarative HTML Tools', 'MCP Servers'],
      channels: {
        contact: 'https://ranuk.dev/#contact',
        calendly: 'https://calendly.com/emilio-ranuk/30min',
      },
    },
    {
      id: 'x402-verification-gateway',
      name: 'x402 Pay-Per-Call AST Syntax, PR Diff & Security Verification API (Base USDC)',
      startingPriceUsd: 0.05,
      deliveryDays: 'instant',
      stack: ['x402', 'Base USDC', 'AST', 'MCP'],
      channels: {
        pricingApi: 'https://data.ranuk.dev/api/v1/pricing',
        mcpEndpoint: 'https://data.ranuk.dev/mcp',
      },
    },
  ];

  const RANUK_PROJECTS = [
    {
      name: 'Ranuk Browser Bridge',
      summary: 'Zero-focus-theft Chrome MV3 + CDP automation engine for autonomous agents.',
      stack: ['Chrome MV3', 'Python', 'WebSocket', 'CDP'],
      url: 'https://github.com/RanuK12',
    },
    {
      name: 'ADA Audits Engine',
      summary: 'Automated WCAG 2.1 AA / EAA / Web3 accessibility scanner with code-level fix recommendations.',
      stack: ['Python', 'Playwright', 'axe-core', 'WCAG 2.1 AA'],
      url: 'https://github.com/RanuK12/ADA-Audits',
    },
    {
      name: 'FlightAlert',
      summary: 'Real-time flight price monitor and Telegram alert SaaS engine.',
      stack: ['Python', 'FastAPI', 'Telegram Bot API'],
      url: 'https://github.com/RanuK12/flight-alert-public',
    },
    {
      name: 'The Reveal',
      summary: 'Web3 & AI agent pre-flight verification platform.',
      stack: ['Cloudflare Workers', 'TypeScript', 'Web3'],
      url: 'https://reveal.ranuk.dev',
    },
  ];

  const COMPANY_PROFILE = {
    company: 'Ranuk IT Solutions',
    founder: 'Emilio Ranucoli',
    role: 'Information Systems Engineer (UTN) · AI Agents, Backend & Data Engineer',
    languages: ['Spanish (Native)', 'Italian (Native)', 'English (Fluent)'],
    certifications: [
      'Microsoft Certified: Power BI Data Analyst Associate (PL-300)',
      'AWS Certified Cloud Practitioner',
      'Google Data Analytics Professional Certificate',
    ],
    website: 'https://ranuk.dev',
    email: 'emilio@ranuk.dev',
    bookingUrl: 'https://calendly.com/emilio-ranuk/30min',
    upwork: 'https://www.upwork.com/freelancers/~0119f7eed1d5419c79',
    github: 'https://github.com/RanuK12',
  };

  function prepareProjectInquiry(args) {
    const form = document.getElementById('contact-form');
    if (!form) {
      return { ok: false, error: 'Contact form not present in DOM.' };
    }
    const nameEl = document.getElementById('form-name');
    const emailEl = document.getElementById('form-email');
    const subjectEl = document.getElementById('form-subject');
    const msgEl = document.getElementById('form-message');

    const allowedSubjects = ['project', 'ranuk', 'ada', 'team', 'book', 'other'];
    const subject = allowedSubjects.includes(args && args.subject) ? args.subject : 'project';

    if (nameEl && args && args.name) nameEl.value = String(args.name).trim();
    if (emailEl && args && args.email) emailEl.value = String(args.email).trim();
    if (subjectEl) subjectEl.value = subject;
    if (msgEl && args && args.message) msgEl.value = String(args.message).trim();

    [nameEl, emailEl, subjectEl, msgEl].forEach(function (el) {
      if (!el) return;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    });

    form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.focus();

    return {
      ok: true,
      submitted: false,
      note: 'Form populated and scrolled into view for human confirmation before sending.',
      fields: {
        name: nameEl ? nameEl.value : '',
        email: emailEl ? emailEl.value : '',
        subject: subjectEl ? subjectEl.value : subject,
        messageLength: msgEl ? msgEl.value.length : 0,
      },
    };
  }

  const TOOLS = [
    {
      name: 'list_ranuk_services',
      description: 'List Ranuk IT Solutions services (AI agents, APIs, WCAG accessibility audits, WebMCP integration, x402 APIs) with starting prices and booking links.',
      inputSchema: {
        type: 'object',
        properties: {
          category: {
            type: 'string',
            description: 'Optional keyword filter (e.g. "ai", "wcag", "webmcp", "x402").',
          },
        },
      },
      execute: async function (args) {
        const q = (args && args.category ? String(args.category) : '').trim().toLowerCase();
        const items = q
          ? RANUK_SERVICES.filter(function (s) {
              return (
                s.id.toLowerCase().includes(q) ||
                s.name.toLowerCase().includes(q) ||
                s.stack.join(' ').toLowerCase().includes(q)
              );
            })
          : RANUK_SERVICES;
        return { services: items, count: items.length };
      },
    },
    {
      name: 'list_ranuk_projects',
      description: 'List public software products and open-source tools built by Ranuk IT Solutions.',
      inputSchema: { type: 'object', properties: {} },
      execute: async function () {
        return { projects: RANUK_PROJECTS, count: RANUK_PROJECTS.length };
      },
    },
    {
      name: 'get_company_profile',
      description: 'Get verified company details for Ranuk IT Solutions and founder Emilio Ranucoli, including certifications, languages, and direct booking links.',
      inputSchema: { type: 'object', properties: {} },
      execute: async function () {
        return COMPANY_PROFILE;
      },
    },
    {
      name: 'prepare_project_inquiry',
      description: 'Pre-fill the contact form on ranuk.dev with a client project brief and bring it into focus for human review before submitting.',
      inputSchema: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'Client full name.' },
          email: { type: 'string', description: 'Client reply email address.' },
          subject: {
            type: 'string',
            enum: ['project', 'ranuk', 'ada', 'team', 'book', 'other'],
            description: 'Inquiry category.',
          },
          message: { type: 'string', description: 'Project scope, timeline, or question.' },
        },
        required: ['name', 'email', 'message'],
      },
      execute: async function (args) {
        return prepareProjectInquiry(args || {});
      },
    },
  ];

  function getModelContext() {
    if (typeof document !== 'undefined' && document.modelContext && typeof document.modelContext.registerTool === 'function') {
      return { api: 'document.modelContext', ctx: document.modelContext };
    }
    if (typeof navigator !== 'undefined' && navigator.modelContext && typeof navigator.modelContext.registerTool === 'function') {
      return { api: 'navigator.modelContext', ctx: navigator.modelContext };
    }
    return { api: 'none', ctx: null };
  }

  function registerAll() {
    const mc = getModelContext();
    const registered = [];

    if (mc.ctx) {
      TOOLS.forEach(function (tool) {
        try {
          mc.ctx.registerTool(tool);
          registered.push(tool.name);
        } catch (err) {
          if (typeof console !== 'undefined' && console.debug) {
            console.debug('[Ranuk WebMCP] registerTool skipped:', tool.name, err);
          }
        }
      });
    }

    // Expose read-only diagnostic registry for agent verification & tooling
    window.__RANUK_WEBMCP__ = {
      protocol: 'WebMCP',
      apiDetected: mc.api,
      registeredTools: registered,
      tools: TOOLS.map(function (t) {
        return { name: t.name, description: t.description, inputSchema: t.inputSchema };
      }),
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', registerAll, { once: true });
  } else {
    registerAll();
  }
})();
