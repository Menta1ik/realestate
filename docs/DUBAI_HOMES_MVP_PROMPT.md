# DUBAI HOMES SHOWCASE — MVP PROMPT

Дата: 2026-02-07

## 1. Тип приложения: Telegram Mini App (TWA)
Это SPA (React), работающее внутри Telegram.
- Используем `@twa-dev/sdk`.
- Навигация `BackButton`, цвета `themeParams`.
- Адаптив строго Mobile.

## 2. Ролевая модель (No Agents)
- **Admin**: Контент-менеджер. CRUD проектов, загрузка фото.
- **SuperAdmin**: Владелец. Всё что Admin + просмотр Лидов + управление Админами.

## 3. Глобальные фичи
- **Мультиязычность**: RU/EN. Хранение переводов в JSONB или отдельных колонках.
- **Мультивалютность**: AED base. Конвертация на фронте.
- **Единицы**: Sq.ft base. Конвертация в Sq.m.

## 4. Сущности и API
### Projects
- `GET /api/projects`: Public. Поддержка фильтров.
- `POST /api/projects`: Admin/SuperAdmin. Тело запроса включает `{ title: {en, ru}, ... }`.

### Leads
- `POST /api/leads`: Public (из бота).
- `GET /api/leads`: SuperAdmin only.

## 5. Стек
- **Backend**: Node.js, Express, Prisma, Supabase.
- **Frontend**: React, Vite, Tailwind/AntD, i18next.
- **Bot**: grammY.

