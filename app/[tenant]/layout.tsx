import { getTenantBySlug } from '@/lib/tenants';

export default function TenantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { tenant: string };
}) {
  const tenant = getTenantBySlug(params.tenant);

  if (!tenant) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Tenant no encontrado</h1>
        <p>El tenant "{params.tenant}" no está registrado.</p>
      </main>
    );
  }

  return (
    <section
      style={{
        minHeight: '100vh',
        background: `linear-gradient(90deg, ${tenant.themeColor ?? '#111'}22, transparent)`,
      }}
    >
      <header style={{ padding: 16, borderBottom: '1px solid #ddd' }}>
        <strong>{tenant.name}</strong> — <code>{tenant.slug}</code>
      </header>
      <div style={{ padding: 24 }}>{children}</div>
    </section>
  );
}
