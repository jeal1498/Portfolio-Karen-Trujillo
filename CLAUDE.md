# CLAUDE.md — Portfolio Karen Trujillo

## Project Overview

Next.js portfolio site for Karen Trujillo, neuropsychologist based in Cancún.
SEO/GEO/AEO-focused with 22+ pages covering TDAH, autismo, and neuropsicología services.

## Key Files

- `src/pages/index.tsx` — homepage (most frequently changed file)
- `public/sitemap.xml` — updated on every new page/blog post
- `src/pages/blog/index.tsx` — blog index, updated with each new article
- `src/index.css` — global styles

## Dev Commands

```bash
npm run dev      # local dev server
npm run build    # production build (also runs tsc)
npm run lint     # eslint
```

## Known Patterns

- `tsconfig.tsbuildinfo` is auto-generated on every build — commit separately as `chore: update tsconfig build cache`
- `sitemap.xml` must be updated whenever a new page or blog post is added
- `src/pages/index.tsx` is the highest-churn file; always verify visually after changes

---

# Lessons Learned

## [1]. curl | bash falla con scripts interactivos — error-pattern
- **Fecha**: 2026-06-14
- **Clasificación**: error-pattern
- **Lección**: Al instalar herramientas con `curl -fsSL <url> | bash`, si el script necesita entrada interactiva (TTY), falla silenciosamente con exit code 1. `curl | bash` no tiene TTY.
- **Acción**: Descargar primero con `curl -o /tmp/script.sh`, luego ejecutar `bash /tmp/script.sh --flag` directamente.

## [2]. Claude Forge install.sh debe ejecutarse desde dentro del repo clonado — error-pattern
- **Fecha**: 2026-06-14
- **Clasificación**: error-pattern
- **Lección**: `install.sh` de Claude Forge crea symlinks desde `~/.claude/` hacia los directorios del repo local. Si no está el repo clonado, los symlinks se crean rotos y la verificación falla.
- **Acción**: Siempre clonar el repo primero (`git clone ... /tmp/claude-forge && cd /tmp/claude-forge`), luego ejecutar `./install.sh --upgrade`.

## [3]. index.tsx es el archivo de mayor rotación — performance-pattern
- **Fecha**: 2026-06-14
- **Clasificación**: performance-pattern
- **Lección**: `src/pages/index.tsx` ha cambiado 13 veces en los últimos 50 commits. Cambios frecuentes aquí tienen alto riesgo de regresión visual.
- **Acción**: Verificar visualmente el homepage tras cualquier cambio. Considerar snapshot tests o screenshot E2E.

## [4]. sitemap.xml y blog/index.tsx siempre cambian juntos — automation-pattern
- **Fecha**: 2026-06-14
- **Clasificación**: automation-pattern
- **Lección**: En los últimos 50 commits, `sitemap.xml` (7 cambios) y `src/pages/blog/index.tsx` (6 cambios) se modifican juntos en casi todos los sprints de blog.
- **Acción**: Al agregar un artículo de blog, siempre actualizar ambos en el mismo commit.
