# TRAE_AGENT_PROMPT

Дата: 2026-02-07

## Задача
Реализовать MVP Telegram Mini App для недвижимости.
**Стек:** React (Vite), Node (Express), Prisma, Supabase.

## Критические требования
1. **TWA First**: Используй `window.Telegram.WebApp`. Проверяй `initData`.
2. **i18n & Currency**: Закладывай структуру данных `{ en: string, ru: string }` сразу.
3. **Roles**: Реализуй middleware для Admin и SuperAdmin.

## Шаги (Sprint 1)
1. **Backend**: Init Prisma with Multi-lang schema. Auth (JWT + InitData).
2. **Admin Panel**: Форма создания объекта с табами EN/RU.
3. **TWA**: Главная + Карточка (AX-style) с переключением валют.
4. **Bot**: Обработка лидов → уведомление SuperAdmin.

См. `OBJECT_CARD_SPEC.md` для деталей UI.
