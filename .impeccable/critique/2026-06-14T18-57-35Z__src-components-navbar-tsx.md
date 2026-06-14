---
target: src/components/Navbar.tsx — mobile menu
total_score: 21
p0_count: 2
p1_count: 2
timestamp: 2026-06-14T18-57-35Z
slug: src-components-navbar-tsx
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | No "you are here" — open menu gives no context about current page/section |
| 2 | Match System / Real World | 2 | Service labels correct, but zero credential signal — parent's real question ("¿es confiable?") goes unanswered |
| 3 | User Control and Freedom | 3 | Close button present, menu resets on route change — minor friction on repeat visits |
| 4 | Consistency and Standards | 3 | Internal patterns mostly coherent; minor gap between desktop pill nav and mobile glassmorphism |
| 5 | Error Prevention | 2 | Two CTAs with near-identical visual weight — "Llamar" and "Agendar" look like sibling buttons, not primary/secondary |
| 6 | Recognition Rather Than Recall | 2 | Services visible; but credentials, license and years of experience are NOT in menu — parent must scroll home page |
| 7 | Flexibility and Efficiency | 2 | Direct service links work; no shortcut for return visitor who already knows what they want |
| 8 | Aesthetic and Minimalist Design | 1 | 8 visual zones stacked vertically, decorative blobs, badge header, icon grid, 3 nav links, 2 CTA buttons — cognitive overload |
| 9 | Error Recovery | 3 | Minimal errors possible in a navigation menu; close button is accessible |
| 10 | Help and Documentation | 1 | No contextual help, no credential callout, no "how does this work?" signal to reduce pre-contact anxiety |
| **Total** | | **21/40** | **Acceptable — significant improvements needed** |

---

## Anti-Patterns Verdict

**LLM assessment — AI slop: MODERATE-HIGH contamination.**

Three tells appear together: (1) heavy glassmorphism with `blur(28px)` + violet gradient, a 2022-2024 aesthetic that flooded SaaS templates; (2) decorative ambient blobs with no information function (`radial-gradient` circles in the corners); (3) a generic 3-card icon grid with identical visual treatment for all three services. Individually forgivable; together they read as a design pattern library assembled without a clinical register.

The critical mismatch: glassmorphism belongs in consumer-tech products (crypto, fitness, streaming). A neuropsychology practice on mobile should signal the same register as a doctor's waiting room — clean, calm, orderly — not a fintech onboarding screen.

**Deterministic scan — exit code 0, 0 findings.** The automated detector found no antipatterns at the code level. This is an accurate negative: the violations here are register-level and compositional, not syntactic — blobs are valid CSS, the monogram is valid JSX. The detector correctly reports nothing, while the design-level issues remain significant.

---

## Overall Impression

The menu is technically functional but emotionally wrong. It presents three services, two CTAs, and a name — which is the right information — wrapped in an aesthetic that communicates "app" instead of "clinic." An anxious parent who opens this menu on their phone gets visual flourish when they need reassurance. The single biggest opportunity: **replace the ambient decoration with one credential signal (cédula + years) and create a clear primary CTA hierarchy.** That alone would raise conversion intent substantially.

---

## What's Working

1. **Service taxonomy is correct and complete.** The three evaluations (TDAH Infantil 5-17, TDAH Adultos, Autismo TEA) are separated with age ranges. This prevents the most expensive error: a parent booking the wrong service type.

2. **Two contact methods cover real behavior.** `tel:` + WhatsApp links match how Cancún families actually reach providers. Both are present and functional on mobile.

3. **Menu animation is smooth and non-intrusive.** The 250ms `ease-out` entry is fast enough to not feel sluggish. `active:scale-95` on the cards gives tactile feedback. This is done well.

---

## Priority Issues

**[P0] No credential signal in the menu — trust gap at the conversion moment**
- **What**: The menu header shows "K" monogram + name + specialty subtitle. No license number, no years of experience, no instrument mentions. The desktop navbar also omits this.
- **Why it matters**: The parent opening this menu is a split-second away from calling or booking. Their blocker is not finding the phone number — it's not yet trusting the specialist. The credential signal needs to appear *before* the CTAs, not only on the About section scroll.
- **Fix**: Replace "K" monogram with Karen's 36px circular photo (already used in BlogLayout author card). Add one line: `Cédula 11009616 · 7+ años` beneath the name. This converts the header from brand identity into proof of qualification.
- **Suggested command**: `/i-bolder` (strengthen identity and credibility signals)

**[P0] Cognitive overload — 8 visual zones in a navigation tray**
- **What**: Header (4 elements) + section label + 3 icon cards + 3 navigation links + 2 CTA buttons = 13 distinct tap/read targets in one screen.
- **Why it matters**: The parent on mobile has ~2 seconds of attention for this menu. When everything is visually equal, nothing stands out. The cognitive cost of parsing 13 options causes users to close the menu and scroll the page instead — or leave.
- **Fix**: Apply strict hierarchy. Tier 1 (high prominence): CTA "Agendar Valoración" as a full-width gradient button at bottom. Tier 2 (medium): 3 service links as simple labeled rows (no grid, no icons). Tier 3 (low): Sobre mí / Testimonios / FAQ as small text links. Remove the ambient blobs entirely.
- **Suggested command**: `/i-layout` (restructure hierarchy and visual weight)

**[P1] Dark violet glassmorphism reads as tech product, not clinical practice**
- **What**: `background: linear-gradient(135deg, rgba(91,83,160,0.72)...)` + `backdropFilter: blur(28px)` + radial gradient blobs. This is 2023 fintech/wellness aesthetic.
- **Why it matters**: The target user (anxious parent) pattern-matches "dark purple blur" to apps — not to medical specialists. Clinical practices signal trust through light backgrounds, clear typography, and restraint. The DESIGN.md palette already has plum-ink `#382f51` as the primary color — it doesn't need blur and blobs to be distinctive.
- **Fix**: Replace the translucent panel with a solid `bg-card` (white) panel or a light `bg-secondary` panel — matching the desktop dropdown style. The plum color can still appear as an accent (header background, CTA button) without full-panel saturation.
- **Suggested command**: `/i-colorize` (correct register, eliminate wrong-toned decoration)

**[P1] Icon cards don't reduce decision friction**
- **What**: Three identical glass cards — same size, same visual weight, same layout (icon + label + subtitle). Only the subtitle text differs.
- **Why it matters**: A parent's first question is not "what are my three options?" — it's "which one is for my situation?" The current design forces them to read all three subtitles. Clinical site rule: the user should recognize their path within 1 second.
- **Fix**: Make the age-range the PRIMARY label (bigger, prominent). Make the service name secondary. Consider replacing the icon grid with a simple two-option split: "Es para mi hijo/a" → lists Infantil + Autismo; "Es para mí" → TDAH Adultos. Or: add a colored accent per service (blue/sand/pink already defined in the design system) so cards are visually distinct at a glance.
- **Suggested command**: `/i-clarify` (reduce decision friction, strengthen differentiation)

**[P2] Primary and secondary CTAs have near-identical visual weight**
- **What**: "Llamar" (`rgba(255,255,255,0.15)`) and "Agendar Valoración" (`rgba(60,55,120,0.85)`) differ in background darkness but not in size, shape, or prominence.
- **Why it matters**: "Agendar Valoración" is the primary conversion action — a committed step (booking appointment). "Llamar" is impulse contact. When both look equally important, the parent hesitates or taps the wrong one.
- **Fix**: "Agendar Valoración" → full-width `bg-gradient-primary` button (already used site-wide). "Llamar" → text link with phone icon, no button shape. The visual contrast between a full button and a text link communicates primary vs. secondary instantly.
- **Suggested command**: `/i-layout` (CTA hierarchy)

---

## Persona Red Flags

**Gabriela (Project-specific persona — anxious mother, 38, second opinion seeker)**
Profile: Has been told by the school and one psychiatrist that her son "might have ADHD." She's on her phone, at night, while the kids are asleep. Opens Karen's site, taps the menu. Her actual question: "Is this person real, qualified, and worth the money?"

Red flags:
- Menu opens → sees purple blur and a "K" letter. Thinks: "Is this a real website or an app?"
- Looks for a license number, a certification, something concrete. Finds nothing in the menu.
- Sees three service cards. Reads all three to find "Niños 5-17 años." Recognizes her situation.
- Sees "Agendar Valoración" button. Is not yet ready to book — she wanted to read about Karen first.
- Taps "SOBRE MÍ." Menu closes, page scrolls. She's now lost her place in the navigation.
- **Exit behavior**: High likelihood (65%) she reads the About section instead of booking. Menu didn't reduce her anxiety.

**Casey (Distracted mobile user)**
Red flags:
- Glassmorphism blur is GPU-intensive. On mid-range Android (Motorola, Samsung A-series — typical in Cancún), this may cause visible stutter on open/close animation.
- 13 tap targets in the tray → scrolls with thumb to find the right button.
- Taps "Llamar" (larger target, first button) instead of "Agendar Valoración" (intended action). Accidental call.
- Menu action targets (3 cards) are 64px tall. Minimum WCAG mobile touch target is 44px — passing — but the grid arrangement means horizontal targets are ~100px wide ÷ 3 gaps = ~90px each. Tight for one-handed navigation.

---

## Minor Observations

- Service card subtitles use `text-[9px]` — at small sizes on blur backgrounds, legibility fails WCAG AA on contrast (white text at 9px on `rgba(255,255,255,0.12)` background is near-invisible).
- `rounded-3xl` on the entire menu panel violates the DESIGN.md limit of `rounded-2xl` for content containers.
- Section links have `gap-0.5` between them — tighter than the `gap-3` between service cards. The sections visually feel like they're compressed into leftover space below the "real" menu.
- The footer sticky bar ("AGENDAR VALORACIÓN") duplicates the menu CTA — if the menu is open, both are visible. Consider hiding the footer bar while the menu is open.
- No `aria-label` on the service icon cards. Screen readers will read the icon component name, not the service description.
