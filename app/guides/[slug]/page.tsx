import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DELIVERY_GUIDE_REGISTRY, DELIVERY_GUIDE_STORE, getDeliveryGuide } from "../../lib/deliveryGuideRegistry";
import DeliveryGuidePage from "./DeliveryGuidePage";

const BASE = `https://${DELIVERY_GUIDE_STORE.domain}`;
type GuidePageProps = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return DELIVERY_GUIDE_REGISTRY.map((guide) => ({ slug: guide.slug })); }
export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> { const guide = getDeliveryGuide((await params).slug); if (!guide) return {}; return { title: { absolute: guide.title }, description: guide.description, alternates: { canonical: `${BASE}/guides/${guide.slug}` }, robots: { index: true, follow: true }, openGraph: { title: guide.title, description: guide.description, url: `${BASE}/guides/${guide.slug}`, type: "website" } }; }
export default async function GuidePage({ params }: GuidePageProps) { const guide = getDeliveryGuide((await params).slug); if (!guide) notFound(); return <DeliveryGuidePage guide={guide} />; }
