export default defineEventHandler(() => {
  const masters = [
    {
      id: 1,
      name: "Carlos Soto",
      profession: "Carpintero",
      rating: 4.8,
      pricePerHour: 15000,
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      name: "María López",
      profession: "Jardinera",
      rating: 4.6,
      pricePerHour: 12000,
      image: "https://randomuser.me/api/portraits/women/45.jpg",
    },
    {
      id: 3,
      name: "José Rivas",
      profession: "Mecánico",
      rating: 4.9,
      pricePerHour: 18000,
      image: "https://randomuser.me/api/portraits/men/12.jpg",
    },
    {
      id: 4,
      name: "Ana Torres",
      profession: "Electricista",
      rating: 4.7,
      pricePerHour: 16000,
      image: "https://randomuser.me/api/portraits/women/56.jpg",
    },
  ];

  return masters;
});
