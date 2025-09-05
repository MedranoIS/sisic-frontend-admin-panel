# SISIC — Frontend Admin Panel (Next.js, App Router)

Base inicial para un **SaaS multi-tenant** sobre **Next.js 15 (App Router) + TypeScript + ESLint**.

## 🎯 Objetivo
Proveer una base limpia y escalable para un panel de administración **multi-tenant**: una sola app que sirve a múltiples clientes (**tenants**), aislando configuración, branding y (en el futuro) datos.

## 🧰 Requisitos
- Node.js 18.18+ (recomendado 20 LTS)
- npm

## 🚀 Cómo ejecutar en local
```bash
npm install
npm run dev
# Abre http://localhost:3000
```

## 📁 Estructura inicial (App Router)
```
app/
  layout.tsx        # layout raíz
  page.tsx          # página de bienvenida
public/
  favicon.ico
.eslintrc.json
next.config.ts
package.json
tsconfig.json       # incluye alias de imports: "@/*"
```

> App Router usa la carpeta `app/` como sistema de rutas y layouts.

## 🧭 Convención de imports
Se configuró el alias `@/*`, por lo que puedes importar así:
```ts
import Header from "@/components/Header"
```

## 🏢 ¿Qué es multi-tenant aquí?
**Multi-tenant** = una sola app para varios clientes (**tenants**).
Cada tenant puede tener:
- **Branding/tema** propio (colores, logos)
- **Aislamiento lógico** de datos (p. ej. `tenant_id` + RLS en la BD)
- **Dominios o subdominios** dedicados (p. ej. `acme.midominio.com`)

En siguientes pasos se añadirá:
- Rutas por tenant (`/[tenant]/dashboard`)
- `lib/tenants.ts` con tenants de prueba
- `middleware.ts` para detectar tenant por subdominio y reescribir a rutas

## 🧪 Scripts útiles
```bash
npm run dev     # desarrollo
npm run build   # build producción
npm run start   # ejecutar build
npm run lint    # linting
```

## 📌 Próximos pasos
1) Añadir estructura mínima multi-tenant (rutas + middleware)
2) Integrar auth por tenant
3) Theming por tenant (Tailwind/MUI + CSS vars)
4) Dominio/subdominio por tenant y verificación DNS
