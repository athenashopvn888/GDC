import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DELIVERY_GUIDE_REGISTRY, DELIVERY_GUIDE_STORE, getDeliveryGuide } from "../../lib/deliveryGuideRegistry";
import { STRAIN_GUIDES, STRAIN_GUIDE_STORE, getStrainGuide } from "../../lib/strainGuides";
import DeliveryGuidePage from "./DeliveryGuidePage";
import StrainGuidePage from "./StrainGuidePage";

const BASE = `https://${DELIVERY_GUIDE_STORE.domain}`;
const STRAIN_BASE = `https://${STRAIN_GUIDE_STORE.domain}`;
type GuidePageProps = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return [...DELIVERY_GUIDE_REGISTRY.map((guide) => ({ slug: guide.slug })), ...STRAIN_GUIDES.filter((guide) => !getDeliveryGuide(guide.slug)).map((guide) => ({ slug: guide.slug }))]; }
export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const slug = (await params).slug;
  const guide = getDeliveryGuide(slug);
  if (guide) return { title: { absolute: guide.title }, description: guide.description, alternates: { canonical: `${BASE}/guides/${guide.slug}` }, robots: { index: true, follow: true }, openGraph: { title: guide.title, description: guide.description, url: `${BASE}/guides/${guide.slug}`, type: "website" } };
  const strain = getStrainGuide(slug);
  if (!strain) return {};
  return { title: { absolute: strain.title }, description: strain.description, alternates: { canonical: `${STRAIN_BASE}/guides/${strain.slug}` }, robots: { index: true, follow: true }, openGraph: { title: strain.title, description: strain.description, url: `${STRAIN_BASE}/guides/${strain.slug}`, type: "article" } };
}
export default async function GuidePage({ params }: GuidePageProps) {
  const slug = (await params).slug;
  const guide = getDeliveryGuide(slug);
  if (guide) return <DeliveryGuidePage guide={guide} />;
  const strain = getStrainGuide(slug);
  if (!strain) notFound();
  return <StrainGuidePage guide={strain} />;
}
