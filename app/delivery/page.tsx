import type { Metadata } from "next";
import DeliveryContent from "./DeliveryContent";

export const metadata: Metadata = {
  title: "Delivery Coming Soon — Green Deal Cannabis | York",
  description: "Get notified when Green Deal Cannabis launches same-day weed delivery across York and surrounding areas.",
  alternates: {
    canonical: "https://greendealcannabis.com/delivery",
  },
};

export default function DeliveryPage() {
  return <DeliveryContent />;
}
