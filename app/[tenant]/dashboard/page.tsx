import { getTenantBySlug } from "@/lib/tenants";
import { notFound } from "next/navigation";
import React from "react";

export default function Page({ params }: { params: { tenant: string } }) {
  const tenant = getTenantBySlug(params.tenant);
  if (!tenant) return notFound();

  const bg = tenant.theme?.heroImage ?? "/backgrounds/agro-gaitan.jpg";

  // Ajustes rápidos
  const foregroundMode: "contain" | "cover" = "contain";  // nítida: ver todo
  const foregroundPos = "center 92%";                     // foco abajo (90–95%)
  const backdropPos = "center";                           // difuminado
  const backdropBlur = "12px";

  return (
    <>
      {/* Capa 1: fondo difuminado que SIEMPRE llena */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: backdropPos,
          backgroundRepeat: "no-repeat",
          transform: "scale(1.06)",
          filter: `blur(${backdropBlur}) brightness(.65)`,
          willChange: "transform",
        }}
      />

      {/* Capa 2: imagen nítida (contain o cover) */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          backgroundImage: `url(${bg})`,
          backgroundSize: foregroundMode,
          backgroundPosition: foregroundPos,
          backgroundRepeat: "no-repeat",
          backgroundColor: "#0b1320",
          pointerEvents: "none",
        }}
      />

      {/* Capa 3: overlay para legibilidad */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 2,
          background:
            "linear-gradient(180deg, rgba(0,0,0,.38) 0%, rgba(0,0,0,.32) 40%, rgba(0,0,0,.50) 100%)",
        }}
      />

      {/* Contenido */}
      <main
        style={{
          position: "relative",
          zIndex: 3,
          maxWidth: 980,
          margin: "24px auto",
          padding: "20px 24px",
          color: "#fff",
          background: "rgba(0,0,0,.28)",
          borderRadius: 12,
          boxShadow: "0 10px 30px rgba(0,0,0,.30)",
          minHeight: "100dvh",
        }}
      >
        <h1 style={{ fontSize: 36, margin: 0 }}>{tenant.name}</h1>
        <p style={{ marginTop: 8, opacity: 0.95 }}>slug: {tenant.slug}</p>
      </main>
    </>
  );
}
