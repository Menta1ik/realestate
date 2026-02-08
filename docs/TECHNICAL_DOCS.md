# TECHNICAL DOCS

## Database Schema (Prisma Snippet)

```prisma
model Project {
  idString    String   @id @default(uuid())
  priceAed    Decimal
  title       Json     // { en: "...", ru: "..." }
  description Json
  areaId      String
  specs       Json     // { bed: 2, bath: 3, sqft: 1200 }
  photos      Photo[]
  createdAt   DateTime @default(now())
}

model User {
  idString  String @id @default(uuid())
  email     String @unique
  role      Role   @default(ADMIN) // ADMIN, SUPERADMIN
}

enum Role {
  ADMIN
  SUPERADMIN
}
```

## i18n Strategy
На фронте используем `i18next`.
Загружаем переводы интерфейса (кнопки, лейблы) из json файлов.
Контент (названия объектов) берем из БД в нужном языке.

