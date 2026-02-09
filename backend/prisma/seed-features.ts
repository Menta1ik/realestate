import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const features = [
  // Water / Resort
  { nameEn: 'Swimming Pool', nameRu: 'Бассейн', icon: 'Waves' },
  { nameEn: 'Community Pools', nameRu: 'Общественные бассейны', icon: 'Waves' },
  { nameEn: 'Yacht Marina', nameRu: 'Пристань для яхт', icon: 'Waves' },
  { nameEn: 'Beaches', nameRu: 'Пляжи', icon: 'Waves' },
  { nameEn: 'Private Beaches', nameRu: 'Частные пляжи', icon: 'Waves' },
  { nameEn: 'Water Parks', nameRu: 'Аквапарки', icon: 'Waves' },
  { nameEn: 'Dubai Water Canal', nameRu: 'Канал Dubai Water Canal', icon: 'Waves' },
  { nameEn: 'Promenade', nameRu: 'Набережная', icon: 'Waves' },
  { nameEn: 'World-class Resorts', nameRu: 'Курорты мирового класса', icon: 'Waves' },
  { nameEn: 'Spas', nameRu: 'Spa-центры', icon: 'Waves' },
  { nameEn: 'Sea View', nameRu: 'Вид на море', icon: 'Waves' },
  { nameEn: 'Water View', nameRu: 'Вид на воду', icon: 'Waves' },
  { nameEn: 'Beachfront', nameRu: 'Первая линия пляжа', icon: 'Waves' },
  
  // Nature / Parks
  { nameEn: 'Parks', nameRu: 'Парки', icon: 'Trees' },
  { nameEn: 'Golf Course', nameRu: 'Поле для гольфа', icon: 'Trees' },
  { nameEn: 'Playgrounds', nameRu: 'Детские площадки', icon: 'Trees' },
  { nameEn: 'Kids Playground', nameRu: 'Детская площадка', icon: 'Trees' },
  { nameEn: 'Public Parks', nameRu: 'Общественные парки', icon: 'Trees' },
  { nameEn: 'Private Garden', nameRu: 'Частный сад', icon: 'Trees' },
  
  // Shopping
  { nameEn: 'Supermarkets', nameRu: 'Супермаркеты', icon: 'ShoppingBag' },
  { nameEn: 'Malls', nameRu: 'Торговые центры', icon: 'ShoppingBag' },
  { nameEn: 'Shopping Malls', nameRu: 'Торговые комплексы', icon: 'ShoppingBag' },
  { nameEn: 'Dubai Hills Mall', nameRu: 'Dubai Hills Mall', icon: 'ShoppingBag' },
  { nameEn: 'Shopping Center', nameRu: 'Торговый центр', icon: 'ShoppingBag' },
  { nameEn: 'Near Mall', nameRu: 'Рядом с ТЦ', icon: 'ShoppingBag' },

  // Food
  { nameEn: 'Restaurants', nameRu: 'Рестораны', icon: 'Utensils' },
  { nameEn: 'Restaurants & Cafes', nameRu: 'Рестораны и кафе', icon: 'Utensils' },
  { nameEn: 'World-class Restaurants', nameRu: 'Рестораны мирового класса', icon: 'Utensils' },
  
  // Sports
  { nameEn: 'Gym', nameRu: 'Тренажерный зал', icon: 'Dumbbell' },
  { nameEn: 'Fitness Centers', nameRu: 'Фитнес-центры', icon: 'Dumbbell' },
  { nameEn: 'Cycling Tracks', nameRu: 'Велосипедные дорожки', icon: 'Dumbbell' },
  
  // Education
  { nameEn: 'Schools', nameRu: 'Школы', icon: 'School' },
  
  // Transport
  { nameEn: 'Metro', nameRu: 'Метро', icon: 'TrainFront' },
  { nameEn: 'Near Transport', nameRu: 'Рядом с транспортом', icon: 'TrainFront' },

  // Business / Community
  { nameEn: 'Business Centers', nameRu: 'Бизнес-центры', icon: 'Briefcase' },
  { nameEn: 'Community Centers', nameRu: 'Общественные центры', icon: 'Briefcase' },
  
  // Landmarks
  { nameEn: 'Ain Dubai Observation Wheel', nameRu: 'Колесо обозрения Ain Dubai', icon: 'MapPin' },
  { nameEn: 'Landmark View', nameRu: 'Вид на достопримечательности', icon: 'MapPin' },
  
  // Project Amenities (from ProjectDetails mapping)
  { nameEn: 'Shared Pool', nameRu: 'Общий бассейн', icon: 'Waves' },
  { nameEn: 'Private Pool', nameRu: 'Частный бассейн', icon: 'Waves' },
  { nameEn: 'Kids Pool', nameRu: 'Детский бассейн', icon: 'Waves' },
  { nameEn: 'Shared Gym', nameRu: 'Общий зал', icon: 'Dumbbell' },
  { nameEn: 'Private Gym', nameRu: 'Частный зал', icon: 'Dumbbell' },
  { nameEn: 'Covered Parking', nameRu: 'Крытая парковка', icon: 'Car' },
  { nameEn: 'Security', nameRu: 'Охрана', icon: 'ShieldCheck' },
  { nameEn: 'Concierge', nameRu: 'Консьерж', icon: 'ConciergeBell' },
  { nameEn: 'Balcony', nameRu: 'Балкон', icon: 'Wind' },
  { nameEn: 'Maid Service', nameRu: 'Услуги горничной', icon: 'UserCheck' },
  { nameEn: 'Maids Room', nameRu: 'Комната прислуги', icon: 'UserCheck' },
  { nameEn: 'Pets Allowed', nameRu: 'Можно с животными', icon: 'PawPrint' },
  { nameEn: 'BBQ Area', nameRu: 'Зона барбекю', icon: 'Flame' },
  { nameEn: 'Central A/C', nameRu: 'Центральный кондиционер', icon: 'Fan' },
  { nameEn: 'Built-in Wardrobes', nameRu: 'Встроенные шкафы', icon: 'Warehouse' },
  { nameEn: 'Equipped Kitchen', nameRu: 'Оборудованная кухня', icon: 'ChefHat' },
  { nameEn: 'Built-in Appliances', nameRu: 'Встроенная техника', icon: 'Refrigerator' },
  { nameEn: 'Cable TV', nameRu: 'Кабельное ТВ', icon: 'Tv' },
  { nameEn: 'Shared Spa', nameRu: 'Общий спа', icon: 'Waves' },
  { nameEn: 'Private Jacuzzi', nameRu: 'Частное джакузи', icon: 'Waves' },
  { nameEn: 'Study', nameRu: 'Кабинет', icon: 'BookOpen' },
  { nameEn: 'Maintenance', nameRu: 'Обслуживание', icon: 'HardHat' },
]

async function main() {
  console.log('Start seeding features...')
  
  for (const f of features) {
    // Upsert by nameEn to avoid duplicates
    const existing = await prisma.feature.findFirst({
      where: { nameEn: f.nameEn }
    })

    if (!existing) {
      await prisma.feature.create({
        data: f
      })
      console.log(`Created feature: ${f.nameEn}`)
    } else {
      // Update icon if needed
      if (existing.icon !== f.icon || existing.nameRu !== f.nameRu) {
        await prisma.feature.update({
          where: { id: existing.id },
          data: { icon: f.icon, nameRu: f.nameRu }
        })
        console.log(`Updated feature: ${f.nameEn}`)
      }
    }
  }
  
  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
