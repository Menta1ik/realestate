import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const layoutTypes = [
  { code: 'Studio', nameEn: 'Studio', nameRu: 'Студия', sortOrder: 1 },
  { code: '1BR', nameEn: '1 Bedroom', nameRu: '1 Спальня', sortOrder: 2 },
  { code: '2BR', nameEn: '2 Bedrooms', nameRu: '2 Спальни', sortOrder: 3 },
  { code: '3BR', nameEn: '3 Bedrooms', nameRu: '3 Спальни', sortOrder: 4 },
  { code: '4BR', nameEn: '4 Bedrooms', nameRu: '4 Спальни', sortOrder: 5 },
  { code: '5BR', nameEn: '5 Bedrooms', nameRu: '5 Спален', sortOrder: 6 },
  { code: '6BR', nameEn: '6 Bedrooms', nameRu: '6 Спален', sortOrder: 7 },
  { code: '7BR+', nameEn: '7+ Bedrooms', nameRu: '7+ Спален', sortOrder: 8 },
  { code: 'Penthouse', nameEn: 'Penthouse', nameRu: 'Пентхаус', sortOrder: 9 },
  { code: 'Duplex', nameEn: 'Duplex', nameRu: 'Дуплекс', sortOrder: 10 },
  { code: 'Townhouse', nameEn: 'Townhouse', nameRu: 'Таунхаус', sortOrder: 11 },
  { code: 'Villa', nameEn: 'Villa', nameRu: 'Вилла', sortOrder: 12 },
  { code: 'HalfFloor', nameEn: 'Half Floor', nameRu: 'Половина этажа', sortOrder: 13 },
  { code: 'FullFloor', nameEn: 'Full Floor', nameRu: 'Весь этаж', sortOrder: 14 },
  { code: 'Retail', nameEn: 'Retail', nameRu: 'Ритейл', sortOrder: 15 },
  { code: 'Office', nameEn: 'Office', nameRu: 'Офис', sortOrder: 16 },
  { code: 'Plot', nameEn: 'Plot', nameRu: 'Участок', sortOrder: 17 },
];

async function main() {
  console.log('Seeding layout types...');
  for (const type of layoutTypes) {
    await prisma.layoutType.upsert({
      where: { code: type.code },
      update: type,
      create: type,
    });
  }
  // Also delete the lowercase ones if they exist and are different
  await prisma.layoutType.deleteMany({
      where: {
          code: {
              in: ['studio', '1br', '2br', '3br', '4br', '5br', '6br', '7br_plus', 'penthouse', 'duplex', 'townhouse', 'villa', 'half_floor', 'full_floor', 'retail', 'office', 'plot']
          }
      }
  });
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
