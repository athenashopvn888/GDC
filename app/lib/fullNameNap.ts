/**
 * GDC01 exact full name + NAP. Name = the store's full name as used on its Google Business Profile.
 * Public GBP primary phone only. Map link = this store's own Google place ID.
 */
export const FULL_NAME_NAP = {
  "code": "GDC01",
  "fullName": "Green Deal Cannabis Dispensary Weed Delivery",
  "street": "1820 Jane St",
  "city": "Etobicoke",
  "region": "ON",
  "postal": "M9N 2T3",
  "phoneDisplay": "(437) 292-0413",
  "phoneTel": "tel:+14372920413",
  "hours": "Open 24 hours, 7 days a week",
  "mapsUrl": "https://www.google.com/maps/place/?q=place_id:ChIJt3tL4iExK4gRHaQRHYamT_g",
  "placeId": "ChIJt3tL4iExK4gRHaQRHYamT_g",
  "neighbourhood": "York / Weston",
  "intersection": "",
  "transit": "Accessible by local TTC bus routes around Jane Street and Eglinton Avenue.",
  "visitPath": "/visit"
} as const;

export const FULL_NAME_NAP_ADDRESS = `${FULL_NAME_NAP.street}, ${FULL_NAME_NAP.city}, ${FULL_NAME_NAP.region} ${FULL_NAME_NAP.postal}`;
