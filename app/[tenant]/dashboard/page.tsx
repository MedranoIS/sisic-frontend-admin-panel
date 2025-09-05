
import { headers } from 'next/headers';
import { getTenantBySlug } from '@/lib/tenants';

export default function DashboardPage({ params }: { params: { tenant: string } }) {
  const hdrs = headers();
  const tenantHeader = hdrs.get('x-tenant') ?? params.tenant;
  const tenant = getTenantBySlug(tenantHeader) ?? getTenantBySlug(params.tenant);

  if (!tenant) return <p>Tenant desconocido.</p>;

  return (
    <main>
      <h1>Dashboard — {tenant.name}</h1>
      <ul>
        <li>slug: <code>{tenant.slug}</code></li>
        <li>themeColor: <code>{tenant.themeColor ?? 'default'}</code></li>
      </ul>
      <p>Prueba: <code>/acme/dashboard</code> y <code>/globex/dashboard</code></p>
    </main>
  );
}
