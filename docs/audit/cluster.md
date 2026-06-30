# Content Cluster Analysis — psicologakarentrujillo.com.mx

## Score: 52/100

**Breakdown:**
- Spoke → Pillar linking (all 11 articles link to at least one service page): 28/30
- Pillar → Spoke linking (zero service pages link to any blog article): 0/20
- Blog index taxonomy and navigation: 8/10
- Content gap coverage: 6/20
- Cannibalization risk management: 10/20

The architecture has a solid spoke-to-pillar foundation but a broken pillar-to-spoke layer, leaving all three service pages as dead ends that receive but never distribute PageRank back into the blog content.

---

## Current Cluster Map

### Pillar 1: `/evaluacion-tdah-ninos` — TDAH Infantil
Instruments: CONNERS-3, WISC-V, BRIEF-2, CPT-3 | Age: 5–17

Spokes:
- `/blog/senales-tdah-ninos` — Informational
- `/blog/tdah-en-ninas-sintomas` — Informational
- `/blog/tdah-inatento-sintomas` — Informational (dual-links Pillar 1 + 2)

### Pillar 2: `/evaluacion-tdah-adultos` — TDAH Adultos
Instruments: CAARS-2, WAIS-IV, BRIEF-2A, CPT-3 | Age: 18+

Spokes:
- `/blog/tdah-adultos-diagnostico-tardio` — Informational
- `/blog/tdah-vs-ansiedad-diferencias` — Informational
- `/blog/burnout-o-tdah-diferencias` — Informational
- `/blog/tdah-inatento-sintomas` — shared spoke

### Pillar 3: `/evaluacion-autismo-cancun` — Autismo / TEA
Instruments: ADOS-2 + batería neuropsicológica

Spokes:
- `/blog/que-es-ados-2-autismo` — Informational
- `/blog/autismo-nivel-1-sintomas-adultos` — Informational
- `/blog/cuanto-cuesta-evaluacion-autismo-mexico` — Commercial

### Standalone / Cross-Cluster
- `/blog/cuanto-cuesta-valoracion-tdah-cancun` — Commercial bridge (links all 3 pillars)
- `/blog/donde-evaluar-tdah-cancun` — Commercial/Local (links both TDAH pillars)

---

## Internal Linking Health

### Spoke → Pillar (PASS — all 11 articles link to at least one pillar)

| Article | Pillar linked | Pass? |
|---------|--------------|-------|
| senales-tdah-ninos | /evaluacion-tdah-ninos | ✅ |
| tdah-en-ninas-sintomas | /evaluacion-tdah-ninos | ✅ |
| tdah-inatento-sintomas | /evaluacion-tdah-ninos + /evaluacion-tdah-adultos | ✅ |
| tdah-adultos-diagnostico-tardio | /evaluacion-tdah-adultos | ✅ |
| tdah-vs-ansiedad-diferencias | /evaluacion-tdah-adultos | ✅ |
| burnout-o-tdah-diferencias | /evaluacion-tdah-adultos | ✅ |
| que-es-ados-2-autismo | /evaluacion-autismo-cancun | ✅ |
| autismo-nivel-1-sintomas-adultos | /evaluacion-autismo-cancun | ✅ |
| cuanto-cuesta-evaluacion-autismo-mexico | /evaluacion-autismo-cancun | ✅ |
| cuanto-cuesta-valoracion-tdah-cancun | All 3 pillars | ✅ |
| donde-evaluar-tdah-cancun | Both TDAH pillars | ✅ |

### Pillar → Spoke (CRITICAL FAIL — 0/3 pillars link to any blog article)

| Pillar | Blog links found |
|--------|-----------------|
| /evaluacion-tdah-ninos | ❌ NONE |
| /evaluacion-tdah-adultos | ❌ NONE |
| /evaluacion-autismo-cancun | ❌ NONE |

All three service pages are inbound-only nodes. They receive PageRank from 11 blog articles but return zero to the spoke layer.

### Critical within-cluster gap
`que-es-ados-2-autismo` — highest-authority TEA spoke — has NO links to `autismo-nivel-1-sintomas-adultos` or `cuanto-cuesta-evaluacion-autismo-mexico`.

---

## Content Gaps (articles to write)

### Cluster 1 — TDAH Infantil (currently 3 spokes)
1. "TDAH en niños con ansiedad: cómo diferenciarlos"
2. "Cómo hablarle a la escuela sobre el TDAH de tu hijo"
3. "TDAH y trastornos del aprendizaje: ¿pueden coexistir?"
4. "TDAH tipo combinado vs inatento en niños: diferencias prácticas"

### Cluster 2 — TDAH Adultos (currently 3+1 shared)
1. "TDAH en adultos y relaciones de pareja"
2. "TDAH adulto y trabajo: estrategias de productividad"
3. "TDAH adultos en mujeres: síntomas que se confunden con ansiedad"
4. "TDAH e hiperfoco: ¿qué es y cómo se maneja?"

### Cluster 3 — Autismo / TEA (currently 3 spokes)
1. "Señales de autismo en niños pequeños (2–5 años)"
2. "ADOS-2 vs otros tests de autismo: comparativa"
3. "Autismo en mujeres adultas: síntomas que se ocultan"
4. "Cómo preparar a tu hijo para la evaluación de autismo"

### Cross-cluster (máximo impacto)
1. "Neuropsicólogo vs psicólogo vs psiquiatra: diferencias para diagnóstico TDAH"
2. "Qué pasa después del diagnóstico de TDAH: guía de pasos"

---

## Cannibalization Risks

| Risk | Articles | Severity |
|------|----------|----------|
| Diferencial TDAH adultos | burnout-o-tdah-diferencias vs tdah-vs-ansiedad-diferencias | HIGH |
| Síntomas adultos | tdah-adultos-diagnostico-tardio vs tdah-inatento-sintomas (adult section) | MEDIUM |
| Precios | cuanto-cuesta-valoracion-tdah-cancun vs FAQ en pillar pages | MEDIUM |
| Género infantil | tdah-en-ninas-sintomas vs senales-tdah-ninos | LOW |

---

## Recommendations

**P1 — Critical:** Añadir sección "Recursos relacionados del blog" al final de las 3 páginas de servicio, antes del widget de cita. Cada una con links a sus 3–4 spokes más relevantes. Este cambio único completa el circuito bidireccional.

Links recomendados:
- `/evaluacion-tdah-ninos` → senales-tdah-ninos, tdah-en-ninas-sintomas, tdah-inatento-sintomas, cuanto-cuesta-valoracion-tdah-cancun
- `/evaluacion-tdah-adultos` → tdah-adultos-diagnostico-tardio, tdah-vs-ansiedad-diferencias, burnout-o-tdah-diferencias, cuanto-cuesta-valoracion-tdah-cancun
- `/evaluacion-autismo-cancun` → que-es-ados-2-autismo, autismo-nivel-1-sintomas-adultos, cuanto-cuesta-evaluacion-autismo-mexico

**P2 — High:** Fix image src bug en `senales-tdah-ninos.tsx` y `tdah-adultos-diagnostico-tardio.tsx` — ruta tiene `)` extra al final: `'/blog/blush-autismo-tea-640x400.svg)'` → `'/blog/blush-autismo-tea-640x400.svg'`

**P3 — High:** Añadir link de `que-es-ados-2-autismo` → `autismo-nivel-1-sintomas-adultos` + `cuanto-cuesta-evaluacion-autismo-mexico` en relatedResources.

**P4 — Medium:** Reclasificar `tdah-inatento-sintomas` en blog index — actualmente en "TDAH Infantil" pero cubre ambos grupos de edad; debería estar bajo un bucket compartido.

**P5 — Medium:** Escribir artículos en este orden:
1. "Neuropsicólogo vs psicólogo vs psiquiatra: TDAH" (cross-cluster, mayor alcance)
2. "Señales de autismo en niños pequeños (2–5 años)"
3. "TDAH adultos en mujeres"
4. "Cómo hablarle a la escuela sobre el TDAH de tu hijo"
5. "TDAH adulto y trabajo: estrategias de productividad"

---

## Hub-and-Spoke Summary

```
Homepage (/)
  └── Navbar → /blog (index) → all 11 articles
  └── ServicesSection → /evaluacion-tdah-ninos      ← 0 blog outbound links ❌
  └── ServicesSection → /evaluacion-tdah-adultos     ← 0 blog outbound links ❌
  └── ServicesSection → /evaluacion-autismo-cancun   ← 0 blog outbound links ❌

Blog articles → all link to pillar ✅
Blog articles → partial within-cluster linking ⚠️
Pillar pages → NO links to blog ❌ CRITICAL
```
