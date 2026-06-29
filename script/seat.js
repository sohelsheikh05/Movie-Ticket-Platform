import prisma from "../config/prisma.js";

async function seedSeats() {
  const screenId = "cmqt6i3rh0001f8u4mvbdrrk3";

  const seats = [];

  // Premium: Rows A-C
  for (const row of ["A", "B", "C"]) {
    for (let i = 1; i <= 10; i++) {
      seats.push({
        screenId,
        seatNumber: `${row}${i}`,
        seatType: "PREMIUM",
      });
    }
  }

  // Standard: Rows D-G
  for (const row of ["D", "E", "F", "G"]) {
    for (let i = 1; i <= 10; i++) {
      seats.push({
        screenId,
        seatNumber: `${row}${i}`,
        seatType: "STANDARD",
      });
    }
  }

  // Balcony: Rows H-J
  for (const row of ["H", "I", "J"]) {
    for (let i = 1; i <= 10; i++) {
      seats.push({
        screenId,
        seatNumber: `${row}${i}`,
        seatType: "BALCONY",
      });
    }
  }

  await prisma.seat.createMany({
    data: seats,
    skipDuplicates: true,
  });

  console.log(`${seats.length} seats created successfully.`);
}

seedSeats()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });