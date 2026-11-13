import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/700.css";
import "@fontsource/nunito-sans/400.css";
import "@fontsource/comfortaa/700.css";
import "./globals.css";

import Script from "next/script";
import { Provider } from "@/context/Provider";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import ScrollToTop from "@/components/scrolltop/ScrollTop";
import MainWrapper from "@/components/MainWrapper";
import { getSettings, SITE_URL } from "@/lib/api";
import { buildSiteContext } from "@/lib/settings";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export async function generateMetadata() {
  const { company } = buildSiteContext(await getSettings());
  const name = company.name;
  const description = `${name}: soluciones de desarrollo web, software a medida y marketing digital. Transformamos tu negocio con tecnología.`;
  return {
    metadataBase: SITE_URL ? new URL(SITE_URL) : undefined,
    title: { default: `${name} | Soluciones Tecnológicas`, template: `%s | ${name}` },
    description,
    applicationName: name,
    authors: [{ name }],
    robots: { index: true, follow: true },
    icons: {
      icon: [{ url: "/favicon.ico" }, { url: "/favicon.svg", type: "image/svg+xml" }],
      apple: "/apple-touch-icon.png",
    },
    openGraph: {
      type: "website",
      locale: "es_AR",
      siteName: name,
      images: company.logo ? [{ url: company.logo }] : undefined,
    },
    twitter: { card: "summary_large_image" },
    other: {
      "geo.region": "AR-X",
      "geo.placename": "Córdoba",
      "geo.position": "-31.417;-64.183",
      ICBM: "-31.417, -64.183",
    },
  };
}

export const viewport = { width: "device-width", initialScale: 1, themeColor: "#faf7f2" };

export default async function RootLayout({ children }) {
  const settings = await getSettings();
  const { company, contact } = buildSiteContext(settings);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: company.name,
    image: company.logo || undefined,
    url: SITE_URL || undefined,
    "@id": SITE_URL || undefined,
    telephone: contact.phone || contact.whatsapp || undefined,
    email: contact.email || undefined,
    address: company.address
      ? {
          "@type": "PostalAddress",
          streetAddress: company.address,
          addressLocality: "Córdoba",
          addressRegion: "AR-X",
          addressCountry: "AR",
        }
      : undefined,
    areaServed: { "@type": "Country", name: "Argentina" },
    description:
      "Webs, posicionamiento en Google y marketing digital para negocios de toda Argentina.",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "19:00",
      },
    ],
  };

  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href={process.env.NEXT_PUBLIC_API_URL} crossOrigin="" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;700;900&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-cream">
        {GTM_ID && (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        )}
        <Provider settings={settings}>
          <ScrollToTop />
          <Header />
          <MainWrapper>{children}</MainWrapper>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
