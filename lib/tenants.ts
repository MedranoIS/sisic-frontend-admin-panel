export type Tenant = {
  slug: string;
  name: string;
  themeColor?: string;
};

export const TENANTS: Tenant[] = [
  { slug: 'acme',   name: 'Acme Inc.',   themeColor: '#0891b2' },
  { slug: 'globex', name: 'Globex Corp.', themeColor: '#f59e0b' },
];

export function getTenantBySlug(slug: string): Tenant | null {
  return TENANTS.find((t) => t.slug === slug) ?? null;
}
