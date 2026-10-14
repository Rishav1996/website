import { useEffect } from 'react';

/**
 * useWatchHead
 * Dynamically synchronizes document.title, meta tags, canonical link,
 * and Open Graph social tags with current watch route state.
 * Restores original portfolio head tags upon unmount.
 */
export function useWatchHead(selectedWatch = null) {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    // Helper to safely set or create meta tags
    const setMetaTag = (attrName, attrValue, content) => {
      let tag = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attrName, attrValue);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // Helper to set or create link tags
    const setLinkTag = (rel, href) => {
      let link = document.querySelector(`link[rel="${rel}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    const DOMAIN = 'https://rishavsaigal.web.app';

    if (selectedWatch) {
      // Individual Timepiece Atelier Route (/watches/:watchId)
      const title = `${selectedWatch.brand} ${selectedWatch.model} (${selectedWatch.sku}) | Atelier Saigal`;
      const description = `${selectedWatch.brand} ${selectedWatch.model} [${selectedWatch.sku}]: ${selectedWatch.tagline}. Caliber: ${selectedWatch.movement?.type || 'Precision Caliber'}, ${selectedWatch.dimensions?.caseDiameter || ''} case, ${selectedWatch.materials?.waterResistance || ''}.`;
      const canonicalUrl = `${DOMAIN}/watches/${selectedWatch.id}`;
      const imageUrl = `${DOMAIN}/${selectedWatch.masterImage || selectedWatch.image}`;

      document.title = title;
      setMetaTag('name', 'description', description);
      setMetaTag('name', 'title', title);
      setLinkTag('canonical', canonicalUrl);

      // Open Graph & Twitter Cards
      setMetaTag('property', 'og:title', title);
      setMetaTag('property', 'og:description', description);
      setMetaTag('property', 'og:url', canonicalUrl);
      setMetaTag('property', 'og:image', imageUrl);
      setMetaTag('property', 'og:type', 'article');
      setMetaTag('property', 'twitter:title', title);
      setMetaTag('property', 'twitter:description', description);
      setMetaTag('property', 'twitter:url', canonicalUrl);
      setMetaTag('property', 'twitter:image', imageUrl);
    } else {
      // Collection Vault Route (/watches)
      const title = 'The Timepiece Archive | Horological Vault & Mechanical Atelier — Rishav Saigal';
      const description = 'A curated archive of 6 personal mechanical, solar, and high-frequency timepieces cataloged by Rishav Saigal. Featuring macro loupe studies, caliber physics, and deterministic horology.';
      const canonicalUrl = `${DOMAIN}/watches`;
      const imageUrl = `${DOMAIN}/assets/watches/cuts/cut_kc_escapement.jpg`;

      document.title = title;
      setMetaTag('name', 'description', description);
      setMetaTag('name', 'title', title);
      setLinkTag('canonical', canonicalUrl);

      // Open Graph & Twitter Cards
      setMetaTag('property', 'og:title', title);
      setMetaTag('property', 'og:description', description);
      setMetaTag('property', 'og:url', canonicalUrl);
      setMetaTag('property', 'og:image', imageUrl);
      setMetaTag('property', 'og:type', 'website');
      setMetaTag('property', 'twitter:title', title);
      setMetaTag('property', 'twitter:description', description);
      setMetaTag('property', 'twitter:url', canonicalUrl);
      setMetaTag('property', 'twitter:image', imageUrl);
    }

    // Restore Home Portfolio Head when leaving watches section
    return () => {
      const defaultTitle = 'Rishav Saigal | Agentic AI Architect & ML Researcher';
      const defaultDesc = 'Rishav Saigal — Agentic AI Architect & ML Researcher building GenAI, RAG, and LLM orchestration systems on GCP Vertex AI, LangGraph, and CrewAI.';
      const defaultUrl = `${DOMAIN}/`;
      const defaultImage = `${DOMAIN}/assets/hero-poster.png`;

      document.title = defaultTitle;
      setMetaTag('name', 'description', defaultDesc);
      setMetaTag('name', 'title', defaultTitle);
      setLinkTag('canonical', defaultUrl);
      setMetaTag('property', 'og:title', defaultTitle);
      setMetaTag('property', 'og:description', defaultDesc);
      setMetaTag('property', 'og:url', defaultUrl);
      setMetaTag('property', 'og:image', defaultImage);
      setMetaTag('property', 'og:type', 'profile');
      setMetaTag('property', 'twitter:title', defaultTitle);
      setMetaTag('property', 'twitter:description', defaultDesc);
      setMetaTag('property', 'twitter:url', defaultUrl);
      setMetaTag('property', 'twitter:image', defaultImage);
    };
  }, [selectedWatch]);
}

export default useWatchHead;
