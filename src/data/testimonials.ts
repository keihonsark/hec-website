export interface Testimonial {
  text: string;
  name: string;
  city: string;
  service?: string;
  rating?: number;
}

export const testimonials: Testimonial[] = [
  {
    text: "They replaced our entire roof in two days. The crew was professional, cleaned up everything, and our energy bill dropped immediately. Best contractor experience we've ever had.",
    name: "Maria G.",
    city: "Fresno",
    service: "Roofing",
    rating: 5,
  },
  {
    text: "Our HVAC was struggling with the valley heat. Home Energy installed a new system with $0 down. The difference is incredible — our house actually stays cool now.",
    name: "James T.",
    city: "Clovis",
    service: "HVAC",
    rating: 5,
  },
  {
    text: "We got new Anlin windows throughout the house. The noise reduction alone was worth it. Professional installation and the financing made it painless.",
    name: "Sarah L.",
    city: "Fresno",
    service: "Windows",
    rating: 5,
  },
  {
    text: "Built us a beautiful patio cover that completely transformed our backyard. From design to completion they were communicative, on time, and the quality is outstanding.",
    name: "Robert & Linda K.",
    city: "Madera",
    service: "Outdoor Living",
    rating: 5,
  },
  {
    text: "Home Energy replaced all our windows and the difference in our energy bill was immediate. From the estimate to install, everything was smooth and professional.",
    name: "David R.",
    city: "Madera",
    service: "Windows",
    rating: 5,
  },
  {
    text: "Hired HEC for a full reroof after a storm did a number on our old shingles. They handled the insurance claim, did the work in two days, and the cleanup was spotless. Highly recommend.",
    name: "Angela M.",
    city: "Visalia",
    service: "Roofing",
    rating: 5,
  },
  {
    text: "Our attic insulation was basically nonexistent. After HEC topped it off, our upstairs rooms finally stay cool in summer. PG&E bill dropped about 25% the first month.",
    name: "Tom B.",
    city: "Sanger",
    service: "Insulation",
    rating: 5,
  },
  {
    text: "Got the exterior painted with their Lifetime Plus coating. Two years in and it still looks like the day it was finished. Prep work was meticulous — that's where most painters cut corners.",
    name: "Jennifer K.",
    city: "Hanford",
    service: "Paint",
    rating: 5,
  },
  {
    text: "Replaced our 25-year-old AC and added a new ductwork run for the back bedrooms. House finally cools evenly. Their tech walked me through every option without any pressure.",
    name: "Marcus W.",
    city: "Tulare",
    service: "HVAC",
    rating: 5,
  },
  {
    text: "Anlin sliding glass door + 8 windows. Crew was on time every day, cleaned up nightly, and finished a day ahead of schedule. The transferable warranty is the cherry on top.",
    name: "Priya S.",
    city: "Sacramento",
    service: "Windows",
    rating: 5,
  },
  {
    text: "We had three quotes for a patio cover. HEC wasn't the cheapest but they were the only ones who walked us through every detail and showed real 3D renderings. Worth every penny.",
    name: "Chris D.",
    city: "Reedley",
    service: "Outdoor Living",
    rating: 5,
  },
  {
    text: "From the first phone call to final walk-through, this team was honest and easy to work with. Did a full roof + gutter replacement and the house looks brand new. Couldn't be happier.",
    name: "Rebecca H.",
    city: "Selma",
    service: "Roofing",
    rating: 5,
  },
];
