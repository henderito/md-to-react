const css = `
/* ==========================================
   GLOBAL VARIABLES & BASICS (THEME SPECIFIC)
   ========================================== */

/* --- ANTIGRAVITY THEME --- */
.mdr-theme--antigravity {
  --mdr-bg: #0b0f19;
  --mdr-text: #c9d2e3;
  --mdr-text-highlight: #ffffff;
  --mdr-subtext: #8b9bb4;
  --mdr-border: rgba(255, 255, 255, 0.08);
  --mdr-primary: #38bdf8;
  --mdr-primary-glow: rgba(56, 189, 248, 0.15);
  --mdr-code-bg: #0f1422;
  --mdr-code-border: rgba(255, 255, 255, 0.08);
  --mdr-font: Inter, ui-sans-serif, system-ui, sans-serif;
  --mdr-card-bg: rgba(255, 255, 255, 0.02);

  background-color: var(--mdr-bg);
}

/* --- CLASSIC THEME --- */
.mdr-theme--classic {
  --mdr-bg: #ffffff;
  --mdr-text: #24292f;
  --mdr-text-highlight: #091e42;
  --mdr-subtext: #57606a;
  --mdr-border: #d0d7de;
  --mdr-primary: #0969da;
  --mdr-primary-glow: rgba(9, 105, 218, 0.1);
  --mdr-code-bg: #f6f8fa;
  --mdr-code-border: #d0d7de;
  --mdr-font: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  --mdr-card-bg: #ffffff;

  background-color: var(--mdr-bg);
}

/* ==========================================
   SHARED TYPOGRAPHY & LAYOUTS
   ========================================== */
.mdr-page,
.mdr-component {
  color: var(--mdr-text);
  font-family: var(--mdr-font);
  line-height: 1.65;
  transition: background-color 0.25s ease, color 0.25s ease;
}

.mdr-page {
  max-width: 860px;
  margin: 0 auto;
  padding: 48px 24px;
}

.mdr-component {
  background: var(--mdr-card-bg);
  border: 1px solid var(--mdr-border);
  border-radius: 8px;
  padding: 24px;
}

.mdr-heading {
  color: var(--mdr-text-highlight);
  line-height: 1.2;
  letter-spacing: -0.02em;
  font-weight: 700;
}

.mdr-heading--1 {
  font-size: 42px;
  margin: 0 0 24px;
}

.mdr-heading--2 {
  font-size: 28px;
  margin: 44px 0 16px;
  border-bottom: 1px solid var(--mdr-border);
  padding-bottom: 8px;
}

.mdr-heading--3 {
  font-size: 20px;
  margin: 32px 0 12px;
}

.mdr-paragraph,
.mdr-list {
  font-size: 16px;
}

.mdr-paragraph {
  margin: 0 0 20px;
}

.mdr-list {
  display: grid;
  gap: 10px;
  margin: 0 0 24px;
  padding-left: 22px;
}

.mdr-paragraph a,
.mdr-list a {
  color: var(--mdr-primary);
  text-decoration: none;
  border-bottom: 1px solid var(--mdr-primary-glow);
  font-weight: 500;
}

.mdr-paragraph a:hover,
.mdr-list a:hover {
  border-bottom-color: var(--mdr-primary);
}

.mdr-paragraph code,
.mdr-list code {
  background: var(--mdr-code-bg);
  border: 1px solid var(--mdr-code-border);
  border-radius: 4px;
  color: var(--mdr-text-highlight);
  font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Monaco, Consolas, monospace;
  font-size: 0.9em;
  padding: 0.15em 0.35em;
}

.mdr-code {
  background: var(--mdr-code-bg);
  border: 1px solid var(--mdr-code-border);
  border-radius: 8px;
  color: var(--mdr-text-highlight);
  overflow: auto;
  padding: 18px;
  font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Monaco, Consolas, monospace;
  font-size: 14px;
  margin: 0 0 24px;
}

/* ==========================================
   COMPONENT STYLES (THEME-SENSITIVE)
   ========================================== */

/* --- CALLOUT & ALERTS --- */
.mdr-callout,
.mdr-alert {
  border-radius: 6px;
  margin: 28px 0;
  padding: 16px 20px;
  display: flex;
  gap: 12px;
  font-size: 15px;
}

/* Antigravity alerts (Glowing border and dark tinted container) */
.mdr-theme--antigravity .mdr-callout,
.mdr-theme--antigravity .mdr-alert--info {
  background: rgba(56, 189, 248, 0.08);
  border: 1px solid rgba(56, 189, 248, 0.25);
  box-shadow: 0 0 10px rgba(56, 189, 248, 0.05);
}

.mdr-theme--antigravity .mdr-alert--warning {
  background: rgba(240, 136, 62, 0.08);
  border: 1px solid rgba(240, 136, 62, 0.25);
  box-shadow: 0 0 10px rgba(240, 136, 62, 0.05);
}

.mdr-theme--antigravity .mdr-alert--error {
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.25);
  box-shadow: 0 0 10px rgba(239, 68, 68, 0.05);
}

.mdr-theme--antigravity .mdr-alert--success {
  background: rgba(34, 197, 94, 0.08);
  border: 1px solid rgba(34, 197, 94, 0.25);
  box-shadow: 0 0 10px rgba(34, 197, 94, 0.05);
}

/* Classic alerts (Flat background, strong border left) */
.mdr-theme--classic .mdr-callout,
.mdr-theme--classic .mdr-alert--info {
  background: #f0f7ff;
  border-left: 4px solid #0969da;
  border-top: 1px solid rgba(9, 105, 218, 0.1);
  border-right: 1px solid rgba(9, 105, 218, 0.1);
  border-bottom: 1px solid rgba(9, 105, 218, 0.1);
  color: #091e42;
}

.mdr-theme--classic .mdr-alert--warning {
  background: #fff8eb;
  border-left: 4px solid #bf8700;
  border-top: 1px solid rgba(191, 135, 0, 0.1);
  border-right: 1px solid rgba(191, 135, 0, 0.1);
  border-bottom: 1px solid rgba(191, 135, 0, 0.1);
  color: #bf8700;
}

.mdr-theme--classic .mdr-alert--error {
  background: #ffebe9;
  border-left: 4px solid #cf222e;
  border-top: 1px solid rgba(207, 34, 46, 0.1);
  border-right: 1px solid rgba(207, 34, 46, 0.1);
  border-bottom: 1px solid rgba(207, 34, 46, 0.1);
  color: #cf222e;
}

.mdr-theme--classic .mdr-alert--success {
  background: #dafbe1;
  border-left: 4px solid #1a7f37;
  border-top: 1px solid rgba(26, 127, 55, 0.1);
  border-right: 1px solid rgba(26, 127, 55, 0.1);
  border-bottom: 1px solid rgba(26, 127, 55, 0.1);
  color: #1a7f37;
}

.mdr-alert__icon {
  font-size: 16px;
  flex-shrink: 0;
}

.mdr-alert__content {
  flex-grow: 1;
}


/* --- TERMINAL COMPONENT --- */
.mdr-terminal {
  border-radius: 8px;
  overflow: hidden;
  margin: 28px 0;
  font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Monaco, Consolas, monospace;
}

/* Antigravity Terminal (Sleek dark code editor layout) */
.mdr-theme--antigravity .mdr-terminal {
  background: #0d1117;
  border: 1px solid #30363d;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.mdr-theme--antigravity .mdr-terminal__header {
  background: #161b22;
  border-bottom: 1px solid #30363d;
  display: flex;
  align-items: center;
  padding: 10px 16px;
}

.mdr-theme--antigravity .mdr-terminal__button {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 8px;
}

.mdr-theme--antigravity .mdr-terminal__button--close { background: #f85149; }
.mdr-theme--antigravity .mdr-terminal__button--minimize { background: #f0883e; }
.mdr-theme--antigravity .mdr-terminal__button--maximize { background: #56d364; }

.mdr-theme--antigravity .mdr-terminal__title {
  color: #8b9bb4;
  font-size: 12px;
  margin-left: 8px;
}

.mdr-theme--antigravity .mdr-terminal__body {
  padding: 18px;
  font-size: 14px;
}

.mdr-theme--antigravity .mdr-terminal__line {
  margin-bottom: 6px;
  line-height: 1.5;
}

.mdr-theme--antigravity .mdr-terminal__line--command {
  color: #58a6ff;
}

.mdr-theme--antigravity .mdr-terminal__line--output {
  color: #c9d2e3;
}

.mdr-theme--antigravity .mdr-terminal__prompt {
  color: #3fb950;
  font-weight: bold;
  margin-right: 8px;
}

/* Classic Terminal (Light Github-like CLI) */
.mdr-theme--classic .mdr-terminal {
  background: #f6f8fa;
  border: 1px solid #d0d7de;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.mdr-theme--classic .mdr-terminal__header {
  background: #eaeef2;
  border-bottom: 1px solid #d0d7de;
  display: flex;
  align-items: center;
  padding: 10px 16px;
}

.mdr-theme--classic .mdr-terminal__button {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 8px;
  background: #d0d7de;
}

.mdr-theme--classic .mdr-terminal__title {
  color: #57606a;
  font-size: 12px;
  margin-left: 8px;
}

.mdr-theme--classic .mdr-terminal__body {
  padding: 18px;
  font-size: 14px;
}

.mdr-theme--classic .mdr-terminal__line {
  margin-bottom: 6px;
  line-height: 1.5;
}

.mdr-theme--classic .mdr-terminal__line--command {
  color: #0969da;
}

.mdr-theme--classic .mdr-terminal__line--output {
  color: #24292f;
}

.mdr-theme--classic .mdr-terminal__prompt {
  color: #1a7f37;
  font-weight: bold;
  margin-right: 8px;
}


/* --- FILE COMPONENT --- */
.mdr-file {
  border-radius: 8px;
  overflow: hidden;
  margin: 28px 0;
}

/* Antigravity File Editor mockup */
.mdr-theme--antigravity .mdr-file {
  background: #0d1117;
  border: 1px solid #30363d;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
}

.mdr-theme--antigravity .mdr-file__header {
  background: #161b22;
  border-bottom: 1px solid #30363d;
  display: flex;
  padding: 0 8px;
}

.mdr-theme--antigravity .mdr-file__tab {
  background: #0d1117;
  border-right: 1px solid #30363d;
  border-top: 2px solid #f0883e;
  padding: 8px 16px;
  font-size: 13px;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 6px;
}

.mdr-theme--antigravity .mdr-file__pre {
  margin: 0;
  padding: 18px;
  background: #0d1117;
  overflow: auto;
}

.mdr-theme--antigravity .mdr-file__code {
  color: #c9d2e3;
  font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Monaco, Consolas, monospace;
  font-size: 13.5px;
  line-height: 1.5;
}

/* Classic File Editor Mockup */
.mdr-theme--classic .mdr-file {
  background: #ffffff;
  border: 1px solid #d0d7de;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.mdr-theme--classic .mdr-file__header {
  background: #f6f8fa;
  border-bottom: 1px solid #d0d7de;
  display: flex;
  padding: 0;
}

.mdr-theme--classic .mdr-file__tab {
  background: #ffffff;
  border-right: 1px solid #d0d7de;
  border-top: 2px solid #0969da;
  padding: 8px 16px;
  font-size: 13px;
  color: #24292f;
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
}

.mdr-theme--classic .mdr-file__pre {
  margin: 0;
  padding: 18px;
  background: #ffffff;
  overflow: auto;
}

.mdr-theme--classic .mdr-file__code {
  color: #24292f;
  font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Monaco, Consolas, monospace;
  font-size: 13.5px;
  line-height: 1.5;
}


/* --- METRICS BLOCK --- */
.mdr-metrics {
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  margin: 28px 0;
}

.mdr-metric {
  background: var(--mdr-card-bg);
  border: 1px solid var(--mdr-border);
  border-radius: 8px;
  padding: 18px;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.mdr-theme--antigravity .mdr-metric:hover {
  border-color: var(--mdr-primary);
  transform: translateY(-2px);
}

.mdr-metric__value {
  color: var(--mdr-text-highlight);
  display: block;
  font-size: 30px;
  font-weight: 800;
  line-height: 1;
}

.mdr-metric__label {
  color: var(--mdr-subtext);
  display: block;
  font-size: 14px;
  margin-top: 8px;
}


/* --- GALLERY BLOCK --- */
.mdr-gallery {
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  margin: 28px 0;
}

.mdr-gallery__image {
  aspect-ratio: 16 / 10;
  border-radius: 8px;
  object-fit: cover;
  width: 100%;
  border: 1px solid var(--mdr-border);
}


/* --- TIMELINE BLOCK --- */
.mdr-timeline {
  border-left: 1px solid var(--mdr-border);
  display: grid;
  gap: 18px;
  list-style: none;
  margin: 28px 0;
  padding: 0 0 0 20px;
}

.mdr-timeline__item {
  color: var(--mdr-text);
  position: relative;
}

.mdr-timeline__item::before {
  background: var(--mdr-primary);
  border-radius: 50%;
  content: "";
  height: 8px;
  left: -25px;
  position: absolute;
  top: 9px;
  width: 8px;
}


/* --- BADGE BLOCK --- */
.mdr-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 20px 0;
}

.mdr-badge {
  font-size: 13px;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: 12px;
  font-family: var(--mdr-font);
}

.mdr-theme--antigravity .mdr-badge {
  background: rgba(56, 189, 248, 0.1);
  color: #38bdf8;
  border: 1px solid rgba(56, 189, 248, 0.2);
}

.mdr-theme--classic .mdr-badge {
  background: #eaeef2;
  color: #24292f;
  border: 1px solid #d0d7de;
}

/* --- PROFILE HEADER BLOCK --- */
.mdr-profile-header {
  margin: 40px 0 60px;
  border-bottom: 2px solid var(--mdr-border);
  padding-bottom: 24px;
}

.mdr-profile-header__name {
  font-size: 48px;
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.1;
  margin: 0 0 16px 0;
  color: var(--mdr-text-highlight);
  text-transform: uppercase;
}

.mdr-profile-header__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Monaco, Consolas, monospace;
  font-size: 14px;
}

.mdr-profile-header__meta-item {
  color: var(--mdr-text);
  border-right: 1px solid var(--mdr-border);
  padding-right: 16px;
}

.mdr-profile-header__meta-item:last-child {
  border-right: none;
  padding-right: 0;
}

.mdr-profile-header__meta-item a {
  color: var(--mdr-primary);
  text-decoration: none;
}

.mdr-profile-header__meta-item a:hover {
  text-decoration: underline;
}

/* --- EXPERIENCE BLOCK --- */
.mdr-experience {
  border-top: 1px solid var(--mdr-border);
  padding: 24px 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 600px) {
  .mdr-experience {
    grid-template-columns: 250px 1fr;
    gap: 32px;
  }
}

.mdr-experience__header {
  margin-bottom: 12px;
}

.mdr-experience__role {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 4px 0;
  color: var(--mdr-text-highlight);
  line-height: 1.3;
}

.mdr-experience__company {
  font-size: 14px;
  font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Monaco, Consolas, monospace;
  color: var(--mdr-primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.mdr-experience__list {
  margin: 0;
  padding-left: 20px;
  list-style-type: square;
}

.mdr-experience__item {
  margin-bottom: 8px;
  color: var(--mdr-text);
  line-height: 1.6;
}

/* --- SKILL MATRIX BLOCK --- */
.mdr-skill-matrix {
  border: 1px solid var(--mdr-border);
  margin: 32px 0;
  background: var(--mdr-card-bg);
}

.mdr-skill-matrix__category {
  background: var(--mdr-code-bg);
  padding: 12px 16px;
  font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Monaco, Consolas, monospace;
  font-weight: 600;
  font-size: 13px;
  text-transform: uppercase;
  border-bottom: 1px solid var(--mdr-border);
  color: var(--mdr-text-highlight);
}

.mdr-skill-matrix__items {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mdr-skill-matrix__item {
  display: flex;
  flex-direction: column;
}

@media (min-width: 600px) {
  .mdr-skill-matrix__item {
    flex-direction: row;
    align-items: baseline;
  }
}

.mdr-skill-matrix__item-name {
  font-weight: 700;
  color: var(--mdr-text-highlight);
  min-width: 180px;
  margin-bottom: 4px;
}

.mdr-skill-matrix__item-value {
  color: var(--mdr-text);
  line-height: 1.5;
}

/* --- PROJECT CARD BLOCK --- */
.mdr-project-card {
  border: 2px solid var(--mdr-border);
  margin: 32px 0;
  background: var(--mdr-card-bg);
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.mdr-theme--antigravity .mdr-project-card:hover {
  border-color: var(--mdr-primary);
  transform: translate(-4px, -4px);
  box-shadow: 4px 4px 0 var(--mdr-primary);
}

.mdr-theme--classic .mdr-project-card:hover {
  border-color: var(--mdr-text-highlight);
  transform: translate(-4px, -4px);
  box-shadow: 4px 4px 0 var(--mdr-text-highlight);
}

.mdr-project-card__header {
  border-bottom: 2px solid var(--mdr-border);
  padding: 16px 20px;
  background: var(--mdr-code-bg);
}

.mdr-project-card__title {
  margin: 0;
  font-size: 22px;
  font-weight: 800;
  color: var(--mdr-text-highlight);
  letter-spacing: -0.02em;
}

.mdr-project-card__body {
  padding: 20px;
}

.mdr-project-card__details {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mdr-project-card__detail {
  color: var(--mdr-text);
  line-height: 1.6;
}

.mdr-project-card__detail a {
  display: inline-block;
  margin-top: 8px;
  font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Monaco, Consolas, monospace;
  font-size: 13px;
  font-weight: 600;
  color: var(--mdr-bg);
  background: var(--mdr-text-highlight);
  padding: 6px 12px;
  text-decoration: none;
  text-transform: uppercase;
  transition: background 0.2s ease;
}

.mdr-project-card__detail a:hover {
  background: var(--mdr-primary);
}
`;

let injected = false;

export function injectStyles() {
  if (typeof document === 'undefined' || injected) return;
  const style = document.createElement('style');
  style.id = 'md-to-react-styles';
  style.textContent = css;
  document.head.appendChild(style);
  injected = true;
}
