# Nuxt Motion Icon Studio

Landing page y CMS administrativo construidos con Nuxt 4 para presentar sistemas visuales completos: paletas, tipografías, iconos y animaciones.

## Stack

- Nuxt 4
- Vue 3
- TypeScript estricto
- Nuxt UI
- Nuxt Icon + Lucide
- Pinia
- VueUse
- Zod
- ESLint
- Vitest
- Generación estática
- GitHub Actions
- GitHub Pages

## Funcionalidades

- Landing responsive.
- Paletas y combinaciones tipográficas.
- Iconos de Nuxt Icon.
- Animaciones CSS con soporte `prefers-reduced-motion`.
- Filtros y búsqueda.
- CMS en `/admin`.
- Crear, editar, duplicar y eliminar sistemas.
- Editor visual de colores.
- Importación y exportación JSON.
- Validación con Zod.
- Persistencia local con Pinia y `localStorage`.
- Workflow automático para GitHub Pages.

## Desarrollo local

Requiere Node.js 22 y pnpm 10.

```bash
corepack enable
pnpm install
pnpm dev
```

Abre `http://localhost:3000`.

## Verificar antes de publicar

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm generate
```

La salida estática se genera en `.output/public`.

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub.
2. Sube este proyecto a la rama `main`.
3. En GitHub abre **Settings → Pages**.
4. En **Build and deployment → Source**, selecciona **GitHub Actions**.
5. Haz un nuevo push a `main` o ejecuta manualmente el workflow.
6. El workflow detecta automáticamente la ruta base del repositorio.

Comandos iniciales:

```bash
git init
git add .
git commit -m "feat: initial Nuxt Motion Icon Studio"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
git push -u origin main
```

## Limitación del CMS en GitHub Pages

GitHub Pages es alojamiento estático. El CMS guarda los cambios únicamente en el navegador del administrador mediante `localStorage`.

Esto significa:

- Los cambios no modifican el repositorio.
- Los visitantes no comparten los cambios del administrador.
- Puedes exportar un JSON desde el CMS y reemplazar `public/data/content.json` en el repositorio.
- Al hacer push del JSON actualizado, GitHub Actions vuelve a publicar el sitio.

Para un CMS multiusuario real se necesita un backend externo, por ejemplo Supabase, Appwrite, Firebase o una API propia.
