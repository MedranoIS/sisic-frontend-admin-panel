// lib/tenants.ts

export type Tenant = {
  slug: string;                  // usado en la URL: /[tenant]/...
  name: string;                  // nombre visible
  theme?: {
    heroImage?: string;          // imagen de portada
    logo?: string;               // logo opcional
    colors?: {                   // paleta opcional
      primary?: string;
      secondary?: string;
    };
  };
};

export const tenants: Tenant[] = [
  {
    slug: 'agro-gaitan',
    name: 'Agro Gaitán',
    theme: {
      heroImage: '/backgrounds/agro-gaitan.jpg',
      colors: { primary: '#0ea5e9', secondary: '#22c55e' },
    },
  },
  // aquí puedes registrar más tenants
];

export function getTenantBySlug(slug: string): Tenant | null {
  return tenants.find((t) => t.slug === slug) ?? null;
}
