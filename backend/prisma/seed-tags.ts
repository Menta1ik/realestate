import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const tags = [
  {
    name: 'Top',
    nameEn: 'Top',
    nameRu: 'Топ',
    color: '#10B981',
    bgColor: 'rgba(16, 185, 129, 0.1)',
  },
  {
    name: 'Hot',
    nameEn: 'Hot',
    nameRu: 'Хит',
    color: '#10B981',
    bgColor: 'rgba(16, 185, 129, 0.1)',
  },
  {
    name: 'New',
    nameEn: 'New',
    nameRu: 'Новинка',
    color: '#10B981',
    bgColor: 'rgba(16, 185, 129, 0.1)',
  },
  {
    name: 'View',
    nameEn: 'View',
    nameRu: 'Вид',
    color: '#3B82F6',
    bgColor: 'rgba(59, 130, 246, 0.1)',
  },
  {
    name: 'Ready',
    nameEn: 'Ready',
    nameRu: 'Готово',
    color: '#F59E0B',
    bgColor: 'rgba(245, 158, 11, 0.1)',
  },
  {
    name: 'Best ROI',
    nameEn: 'High ROI',
    nameRu: 'Высокая доходность',
    color: '#10B981',
    bgColor: 'rgba(16, 185, 129, 0.1)',
  },
  {
    name: 'Affordable',
    nameEn: 'Best Price',
    nameRu: 'Выгодная цена',
    color: '#3B82F6',
    bgColor: 'rgba(59, 130, 246, 0.1)',
  },
];

async function main() {
  console.log('Seeding tags...');
  
  for (const tag of tags) {
    await prisma.tagCategory.upsert({
      where: { name: tag.name },
      update: tag,
      create: tag,
    });
    console.log(`Upserted tag: ${tag.name}`);
  }
  
  console.log('Tags seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
