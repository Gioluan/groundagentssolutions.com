// Generates the Ground Agents blog: one ecosystem-positioning post per product,
// plus the blog index. Run: node build-posts.mjs
import fs from "node:fs";
import path from "node:path";

const SITE = "https://groundagentssolutions.com";
const DATE = "2026-07-03";
const OUT = path.resolve("blog");

const FOUNDER = {
  slug: "juan-sanchez-founder",
  category: "Founder",
  title: "From tour guide to travel-tech founder",
  description: "How Juan Sánchez, a group-travel specialist since 2005, became the builder behind an ecosystem of sports and travel software.",
};

// Each product post positions the product inside the ecosystem and links out.
const POSTS = [
  {
    slug: "what-is-odisea-tours",
    category: "Travel",
    title: "What Is Odisea Tours? Group Sport and Cultural Travel in Spain",
    description: "Odisea Tours has designed and run youth soccer tours, school trips, cultural journeys and corporate retreats across Spain since 2005. Here is what it does and who it is for.",
    lede: "The original Ground Agents business, and the operator's-eye view that shapes everything else we build.",
    sections: [
      { h2: "What Odisea Tours does", html:
        "<p><strong>Odisea Tours</strong> is a group-travel specialist that designs and runs sport and cultural tours across Spain. Since 2005 it has served more than 200 groups: youth soccer tours, school trips, veterans tours, softball trips, cultural journeys and corporate retreats.</p>" +
        "<p>A typical soccer tour blends training sessions with professional academy coaches, friendly matches against Spanish sides, stadium visits and the culture around the game, with every logistic handled by a Spanish team on the ground in Madrid, Barcelona and Valencia.</p>" },
      { h2: "Who it is for", html:
        "<p>Mostly US and international youth clubs, schools and coaches who want a first trip to Spain that is organised, safe and genuinely about the football, not a package tour with a match bolted on. Odisea also runs cultural and corporate travel for groups who want Spain done properly.</p>" },
      { h2: "Where it fits in the ecosystem", html:
        "<p>Odisea is the founding business of <a class=\"inline\" href=\"/\">Ground Agents Solutions</a> and the reason the software exists. Twenty years of running tours is where the product ideas come from, and Odisea is often the first real-world proving ground for them, from <a class=\"inline\" href=\"https://mycantera.com\" target=\"_blank\" rel=\"noopener\">MyCantera</a> to <a class=\"inline\" href=\"https://spanishfootballdesk.com\" target=\"_blank\" rel=\"noopener\">The Spanish Football Desk</a>.</p>" },
    ],
    product: { name: "Odisea Tours", tagline: "Group sport and cultural travel in Spain since 2005", url: "https://odisea-tours.com", cta: "Plan a tour →" },
    faqs: [
      { q: "What is Odisea Tours?", a: "Odisea Tours is a Spain-based group-travel company that has designed and run youth soccer tours, school trips, cultural journeys and corporate retreats since 2005, part of Ground Agents Solutions." },
      { q: "Does Odisea Tours organise youth soccer tours to Spain?", a: "Yes. Odisea arranges training with professional academies, friendly matches against Spanish sides, stadium visits and full logistics for US and international youth clubs and schools." },
    ],
  },
  {
    slug: "what-is-mycantera",
    category: "Sports tech",
    title: "What Is MyCantera? Free Club Management for Youth Soccer",
    description: "MyCantera is free youth-soccer club-management software: training plans, match reports, rosters, attendance and an AI coach. Here is what it does and who it is for.",
    lede: "The tool a twenty-year tour operator wished coaches already had.",
    sections: [
      { h2: "What MyCantera does", html:
        "<p><strong>MyCantera</strong> is free club-management software for youth soccer. In one place, coaches and parents can build and save training plans, run match reports, manage rosters and attendance, and organise tours. Its <a class=\"inline\" href=\"https://mycantera.com/coach\" target=\"_blank\" rel=\"noopener\">AI coach</a> generates a full training session, warm-up, drills, tactical games and cool-down, in about thirty seconds, tailored to age group, playing style and focus.</p>" },
      { h2: "Who it is for", html:
        "<p>Youth soccer clubs and coaches in the US, UK, Spain and Australia who are tired of running a club out of spreadsheets and group chats. It is free for coaches, which is the point: the barrier to running a club well should not be software cost.</p>" },
      { h2: "Where it fits in the ecosystem", html:
        "<p>MyCantera is the club-operations product in the <a class=\"inline\" href=\"/\">Ground Agents</a> family. It shares an audience with <a class=\"inline\" href=\"https://spanishfootballdesk.com\" target=\"_blank\" rel=\"noopener\">The Spanish Football Desk</a> (US soccer coaches) and with <a class=\"inline\" href=\"https://odisea-tours.com\" target=\"_blank\" rel=\"noopener\">Odisea Tours</a> (clubs planning a trip to Spain), so the pieces reinforce each other.</p>" },
    ],
    product: { name: "MyCantera", tagline: "Free club management for youth soccer", url: "https://mycantera.com", cta: "Start free →" },
    faqs: [
      { q: "What is MyCantera?", a: "MyCantera is free youth-soccer club-management software with training plans, match reports, rosters, attendance, tour planning and an AI session generator, built by Ground Agents Solutions." },
      { q: "Is MyCantera really free?", a: "Yes, MyCantera is free for youth coaches to plan training, run match reports and manage their squad." },
    ],
  },
  {
    slug: "what-is-busvivo",
    category: "Operations",
    title: "What Is BusVivo? Fleet Software for Coach Companies",
    description: "BusVivo is fleet-management software for Spanish coach, school-transport and tour operators. It reduces fuel and wear and fills dead fleet hours. No hardware, no contracts, free up to 3 buses.",
    lede: "Operations software for the coach companies that move the groups.",
    sections: [
      { h2: "What BusVivo does", html:
        "<p><strong>BusVivo</strong> is an operating system for coach fleets. It helps Spanish bus, school-transport and tour operators track vehicles, reduce fuel and wear, and fill the dead hours in a fleet's schedule. There is no hardware to install and no long contract, and it is free up to three buses.</p>" },
      { h2: "Who it is for", html:
        "<p>Spanish autocar SMEs: family-run and mid-sized coach companies running scheduled routes, school transport and private tours, who need visibility and savings without an enterprise software project.</p>" },
      { h2: "Where it fits in the ecosystem", html:
        "<p>BusVivo is the ground-transport layer of the <a class=\"inline\" href=\"/\">Ground Agents</a> ecosystem. Tours need buses; a company that has spent two decades chartering coaches for <a class=\"inline\" href=\"https://odisea-tours.com\" target=\"_blank\" rel=\"noopener\">Odisea Tours</a> knows exactly where fleet operators lose time and money.</p>" },
    ],
    product: { name: "BusVivo", tagline: "The operating system for coach fleets", url: "https://busvivo.com", cta: "See BusVivo →" },
    faqs: [
      { q: "What is BusVivo?", a: "BusVivo is fleet-management software for Spanish coach, school-transport and tour operators that reduces fuel and wear and fills dead fleet hours, with no hardware and free up to three buses." },
    ],
  },
  {
    slug: "what-is-tripcite",
    category: "AI / GEO",
    title: "What Is Tripcite? Generative Engine Optimization for Brands",
    description: "Tripcite measures and improves how brands appear in AI answers from ChatGPT, Perplexity, Gemini and Google AI Overviews. Generative engine optimization for travel, hospitality and SaaS.",
    lede: "SEO told you where you ranked. Tripcite tells you what the AI actually says about you.",
    sections: [
      { h2: "What Tripcite does", html:
        "<p><strong>Tripcite</strong> is a generative engine optimization (GEO) platform. It tracks how a brand shows up when real people ask ChatGPT, Perplexity, Gemini and Google's AI Overviews for recommendations, then shows where you are cited, where a competitor is cited instead, and how to close the gap. It includes a self-serve audit.</p>" },
      { h2: "Who it is for", html:
        "<p>Travel, hospitality and SaaS brands watching buying decisions move from the search results page into AI answers, who need to measure and improve their visibility inside those answers.</p>" },
      { h2: "Where it fits in the ecosystem", html:
        "<p>Tripcite is the growth engine of <a class=\"inline\" href=\"/\">Ground Agents</a>, and it is dogfooded across the group: the same GEO discipline that helps clients get cited is used to grow <a class=\"inline\" href=\"https://spanishfootballdesk.com\" target=\"_blank\" rel=\"noopener\">The Spanish Football Desk</a>, <a class=\"inline\" href=\"https://mycantera.com\" target=\"_blank\" rel=\"noopener\">MyCantera</a> and <a class=\"inline\" href=\"https://odisea-tours.com\" target=\"_blank\" rel=\"noopener\">Odisea Tours</a>.</p>" },
    ],
    product: { name: "Tripcite", tagline: "Get your brand cited by AI", url: "https://tripcite.com", cta: "Run a free audit →" },
    faqs: [
      { q: "What is Tripcite?", a: "Tripcite is a generative engine optimization platform that measures and improves how a brand appears in AI answers from ChatGPT, Perplexity, Gemini and Google AI Overviews. It is built by Ground Agents Solutions." },
      { q: "What is generative engine optimization?", a: "Generative engine optimization (GEO) is the practice of improving how and how often a brand is cited by AI answer engines, the way SEO improves ranking in traditional search." },
    ],
  },
  {
    slug: "what-is-spanish-football-desk",
    category: "Media",
    title: "What Is The Spanish Football Desk? La Liga in English for US Coaches",
    description: "The Spanish Football Desk is a daily English-language publication covering Spanish football for US soccer coaches: La Liga news, transfers, fixtures with US kickoff times and coaching sessions.",
    lede: "Spain produces the most-studied football in the world. Most of it is reported in Spanish.",
    sections: [
      { h2: "What The Spanish Football Desk does", html:
        "<p><strong>The Spanish Football Desk</strong> reports Spanish football in English for a US coaching audience: daily La Liga news and transfers, fixtures and results with kickoff times converted to US time zones, a Training Ground of coaching sessions rooted in Spanish methodology, and guides for coaches planning a trip to Spain. It reports facts in its own words and links back to the original Spanish reporting.</p>" },
      { h2: "Who it is for", html:
        "<p>US youth soccer coaches and clubs who follow Spanish football and want it explained in English, in a coaching frame, without the Spanish-language barrier.</p>" },
      { h2: "Where it fits in the ecosystem", html:
        "<p>The Desk is published by <a class=\"inline\" href=\"https://odisea-tours.com\" target=\"_blank\" rel=\"noopener\">Odisea Tours</a> and sits at the top of the <a class=\"inline\" href=\"/\">Ground Agents</a> funnel: it builds an audience of US coaches, points them to Odisea for tours and to <a class=\"inline\" href=\"https://mycantera.com\" target=\"_blank\" rel=\"noopener\">MyCantera</a> for club software, and is grown using <a class=\"inline\" href=\"https://tripcite.com\" target=\"_blank\" rel=\"noopener\">Tripcite</a>.</p>" },
    ],
    product: { name: "The Spanish Football Desk", tagline: "La Liga in English for US coaches", url: "https://spanishfootballdesk.com", cta: "Read the Desk →" },
    faqs: [
      { q: "What is The Spanish Football Desk?", a: "The Spanish Football Desk is a daily English-language publication covering Spanish football (La Liga news, transfers, fixtures and coaching) for US soccer coaches, published by Odisea Tours." },
    ],
  },
  {
    slug: "what-is-i-wasnt-there",
    category: "Consumer app",
    title: "What Is I Wasn't There? The Bachelor-Party App That Deletes Everything",
    description: "I Wasn't There is the stag-do app that auto-deletes all photos and messages when the trip ends. Share everything during the party, then it disappears. No accounts, no evidence.",
    lede: "The consumer experiment in the Ground Agents family, born from a lot of group trips.",
    sections: [
      { h2: "What I Wasn't There does", html:
        "<p><strong>I Wasn't There</strong> is a bachelor-party app with one promise: everything disappears when the trip ends. The group shares photos and messages during the stag do, and when it is over, it all auto-deletes. No accounts, no evidence, nothing left behind.</p>" },
      { h2: "Who it is for", html:
        "<p>Groups on a bachelor or stag trip who want to capture the weekend together without any of it following them home.</p>" },
      { h2: "Where it fits in the ecosystem", html:
        "<p>It is the most playful corner of <a class=\"inline\" href=\"/\">Ground Agents</a>, and it comes from the same place as everything else: two decades of moving groups of people around and understanding how they actually behave on a trip.</p>" },
    ],
    product: { name: "I Wasn't There", tagline: "The bachelor-party app that deletes everything", url: "https://iwasntthere.com", cta: "See the app →" },
    faqs: [
      { q: "What is I Wasn't There?", a: "I Wasn't There is a bachelor-party app that auto-deletes all photos and messages when the trip ends, with no accounts, built by Ground Agents Solutions." },
    ],
  },
];

const esc = (s) => s.replace(/&(?![a-z#])/g, "&amp;");

function faqSchema(faqs) {
  return JSON.stringify({
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  });
}
function articleSchema(p) {
  return JSON.stringify({
    "@context": "https://schema.org", "@type": "Article",
    headline: p.title, description: p.description, datePublished: DATE, dateModified: DATE,
    author: { "@type": "Person", name: "Juan B. Sánchez", "@id": `${SITE}/#juan-sanchez` },
    publisher: { "@type": "Organization", name: "Ground Agents Solutions S.L.", url: SITE },
    mainEntityOfPage: `${SITE}/blog/${p.slug}.html`,
  });
}

function render(p) {
  const url = `${SITE}/blog/${p.slug}.html`;
  const sections = p.sections.map((s) => `  <h2>${s.h2}</h2>\n  ${s.html}`).join("\n");
  const faqs = p.faqs.map((f) => `    <div class="q">${f.q}</div>\n    <p class="a">${f.a}</p>`).join("\n");
  const related = [`<a href="/blog/">← All posts</a>`, `<a href="/blog/${FOUNDER.slug}.html">The founder story</a>`]
    .concat(POSTS.filter((o) => o.slug !== p.slug).slice(0, 3).map((o) => `<a href="/blog/${o.slug}.html">${o.product.name}</a>`))
    .join("\n    ");
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.title)} | Ground Agents</title>
<meta name="description" content="${esc(p.description)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="article">
<meta property="og:title" content="${esc(p.title)}">
<meta property="og:description" content="${esc(p.description)}">
<meta property="og:url" content="${url}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@600;700;800&display=swap" rel="stylesheet">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>G</text></svg>">
<link rel="stylesheet" href="/blog.css">
<script type="application/ld+json">${articleSchema(p)}</script>
<script type="application/ld+json">${faqSchema(p.faqs)}</script>
</head>
<body>
<header class="topbar"><div class="wrap">
  <a class="brand" href="/"><span class="dot"></span>Ground Agents Solutions</a>
  <nav class="topnav"><a href="/blog/">Blog</a><a href="/#products">Products</a><a href="/#about">About</a></nav>
</div></header>

<article class="post"><div class="wrap">
  <div class="kicker">${p.category}</div>
  <h1>${esc(p.title)}</h1>
  <div class="byline">By <a href="/blog/${FOUNDER.slug}.html">Juan B. Sánchez</a> · Founder, Ground Agents Solutions · 3 July 2026</div>
  <p class="lede">${esc(p.lede)}</p>
${sections}

  <div class="callout">
    <div class="k">The product</div>
    <div class="n">${p.product.name}</div>
    <p style="color:#c9d4ec;margin:6px 0 10px">${esc(p.product.tagline)}.</p>
    <a href="${p.product.url}" target="_blank" rel="noopener">${p.product.cta}</a>
  </div>

  <div class="faq">
    <h2>Frequently asked questions</h2>
${faqs}
  </div>

  <div class="more">
    ${related}
  </div>
</div></article>

<footer class="site"><div class="wrap">
  <span>© 2026 Ground Agents Solutions S.L. · Benicàssim, Spain</span>
  <span><a href="/">groundagentssolutions.com</a></span>
</div></footer>
</body>
</html>
`;
}

// Hand-written posts (case studies etc.) that are not generated but must appear
// in the index. The full HTML for these lives as its own file in /blog.
const EXTRA = [
  { slug: "how-we-built-developpe-danza", category: "Case study", title: "Building and Positioning Développé Danza Online", description: "A real client project: a fast website, province-wide local SEO and generative engine optimization for a new dance school in Benicàssim." },
];

function renderIndex() {
  const all = [
    { slug: FOUNDER.slug, category: FOUNDER.category, title: FOUNDER.title, description: FOUNDER.description },
    ...EXTRA,
    ...POSTS.map((p) => ({ slug: p.slug, category: p.category, title: p.title, description: p.description })),
  ];
  const items = all.map((p) => `      <a class="postlink" href="/blog/${p.slug}.html">
        <div class="c">${p.category}</div>
        <h2>${esc(p.title)}</h2>
        <p>${esc(p.description)}</p>
      </a>`).join("\n");
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>The Ground Agents Journal — Sport & Travel Tech from Spain</title>
<meta name="description" content="Notes from Ground Agents Solutions: the founder story of Juan Sánchez and what each product in the ecosystem does, from Odisea Tours and MyCantera to Tripcite and The Spanish Football Desk.">
<link rel="canonical" href="${SITE}/blog/">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@600;700;800&display=swap" rel="stylesheet">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>G</text></svg>">
<link rel="stylesheet" href="/blog.css">
</head>
<body>
<header class="topbar"><div class="wrap">
  <a class="brand" href="/"><span class="dot"></span>Ground Agents Solutions</a>
  <nav class="topnav"><a href="/blog/">Blog</a><a href="/#products">Products</a><a href="/#about">About</a></nav>
</div></header>

<section class="hero"><div class="wrap">
  <h1>The Journal</h1>
  <p>Travel experts turned tech builders. The story behind Ground Agents Solutions and the products in the ecosystem, written by founder Juan Sánchez.</p>
</div></section>

<section class="postlist"><div class="wrap">
${items}
</div></section>

<footer class="site"><div class="wrap">
  <span>© 2026 Ground Agents Solutions S.L. · Benicàssim, Spain</span>
  <span><a href="/">groundagentssolutions.com</a></span>
</div></footer>
</body>
</html>
`;
}

fs.mkdirSync(OUT, { recursive: true });
for (const p of POSTS) {
  fs.writeFileSync(path.join(OUT, `${p.slug}.html`), render(p));
  console.log("wrote blog/" + p.slug + ".html");
}
fs.writeFileSync(path.join(OUT, "index.html"), renderIndex());
console.log("wrote blog/index.html");
