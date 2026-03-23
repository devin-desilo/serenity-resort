// Room types
export interface RoomAmenity {
  icon: string;
  label: string;
}

export interface Room {
  id: string;
  slug: string;
  name: string;
  type: "Deluxe" | "Suite" | "Villa" | "Bungalow";
  shortDescription: string;
  description: string;
  price: number;
  maxGuests: number;
  size: number; // sq ft
  bedType: string;
  images: string[];
  amenities: RoomAmenity[];
  featured: boolean;
  houseRules: string[];
}

// Booking types
export interface BookingFormData {
  roomSlug: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  guestName: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

// Contact types
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// Testimonial
export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
}

// Amenity (for amenities page)
export interface Amenity {
  id: string;
  label: string;
  description: string;
  icon: string;
  category: string;
}
