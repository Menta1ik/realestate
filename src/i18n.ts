import { Lang } from './components/AppContext'

type Dict = Record<string, { en: string; ru: string }>

const dict: Dict = {
  'nav.home': { en: 'Home', ru: 'Главная' },
  'nav.areas': { en: 'Areas', ru: 'Районы' },
  'nav.developers': { en: 'Developers', ru: 'Застройщики' },
  'nav.projects': { en: 'Projects', ru: 'Проекты' },
  'nav.objects': { en: 'Objects', ru: 'Объекты' },

  'top.contacts': { en: 'Contacts', ru: 'Контакты' },

  'home.title': { en: 'UAE Property Showcase', ru: 'Витрина недвижимости ОАЭ' },
  'home.subtitle': { en: 'Browse projects, filter fast, request PDF and contact in 1 click — built for Telegram.',
                     ru: 'Смотри проекты, фильтруй быстро, запрашивай PDF и пиши агенту в 1 клик — идеально для Telegram.' },
  'home.browse': { en: 'Browse projects', ru: 'Смотреть проекты' },
  'home.explore': { en: 'Explore areas', ru: 'Смотреть районы' },
  'home.recommended': { en: 'Recommended', ru: 'Рекомендуем' },
  'home.seeAll': { en: 'See all', ru: 'Смотреть все' },

  'areas.title': { en: 'Areas', ru: 'Районы' },
  'areas.subtitle': { en: 'Pick a district to see projects', ru: 'Выбери район, чтобы увидеть проекты' },
  'areas.search': { en: 'Search area...', ru: 'Поиск района...' },
  'areas.viewProjects': { en: 'View projects', ru: 'Смотреть проекты' },

  'dev.title': { en: 'Developers', ru: 'Застройщики' },
  'dev.subtitle': { en: 'People often search by developer (Emaar, Damac, etc.)', ru: 'Часто ищут по застройщику (Emaar, Damac и т.д.)' },
  'dev.search': { en: 'Search developer...', ru: 'Поиск застройщика...' },
  'dev.viewProjects': { en: 'View projects', ru: 'Смотреть проекты' },

  'projects.title': { en: 'Projects', ru: 'Проекты' },
  'projects.results': { en: 'results', ru: 'результатов' },
  'projects.filters': { en: 'Filters', ru: 'Фильтры' },

  'filter.label.status': { en: 'Status', ru: 'Статус' },
  'filter.label.propertyType': { en: 'Property Type', ru: 'Тип недвижимости' },
  'filter.label.bedrooms': { en: 'Bedrooms', ru: 'Спальни' },
  'filter.label.budget': { en: 'Budget', ru: 'Бюджет' },
  'filter.label.size': { en: 'Size', ru: 'Площадь' },

  'filter.currency.aed': { en: 'AED', ru: 'AED' },
  'filter.currency.usd': { en: 'USD', ru: 'USD' },
  'filter.currency.eur': { en: 'EUR', ru: 'EUR' },

  'filter.unit.sqft': { en: 'sq.ft', ru: 'кв.фут' },
  'filter.unit.sqm': { en: 'm²', ru: 'м²' },

  'filter.status.all': { en: 'All', ru: 'Все' },
  'filter.status.offplan': { en: 'Off-plan', ru: 'Стройка' },
  'filter.status.ready': { en: 'Ready', ru: 'Готово' },

  'filter.type.any': { en: 'Any', ru: 'Любой' },
  'filter.type.studio': { en: 'Studio', ru: 'Студия' },
  'filter.type.1br': { en: '1BR', ru: '1 спальня' },
  'filter.type.2br': { en: '2BR', ru: '2 спальни' },
  'filter.type.3br': { en: '3BR', ru: '3 спальни' },
  'filter.type.villa': { en: 'Villa', ru: 'Вилла' },
  'filter.type.townhouse': { en: 'Townhouse', ru: 'Таунхаус' },

  'filter.budget.any': { en: 'Any', ru: 'Любой' },
  'filter.budget.lt800': { en: '≤ 800k', ru: '≤ 800к' },
  'filter.budget.800-1500': { en: '800k–1.5M', ru: '800к–1.5М' },
  'filter.budget.1500-3000': { en: '1.5M–3M', ru: '1.5М–3М' },
  'filter.budget.gt3000': { en: '3M+', ru: '3М+' },

  // USD
  'filter.budget.usd.lt200': { en: '< 200k', ru: '< 200к' },
  'filter.budget.usd.200-400': { en: '200k–400k', ru: '200к–400к' },
  'filter.budget.usd.400-800': { en: '400k–800k', ru: '400к–800к' },
  'filter.budget.usd.gt800': { en: '800k+', ru: '800к+' },

  // EUR
  'filter.budget.eur.lt200': { en: '< 200k', ru: '< 200к' },
  'filter.budget.eur.200-400': { en: '200k–400k', ru: '200к–400к' },
  'filter.budget.eur.400-750': { en: '400k–750k', ru: '400к–750к' },
  'filter.budget.eur.gt750': { en: '750k+', ru: '750к+' },

  'filter.size.any': { en: 'Any', ru: 'Любая' },
  'filter.size.lt1000': { en: '< 1000', ru: '< 1000' },
  'filter.size.1000-2000': { en: '1000–2000', ru: '1000–2000' },
  'filter.size.gt2000': { en: '2000+', ru: '2000+' },

  // SQM
  'filter.size.sqm.lt100': { en: '< 100', ru: '< 100' },
  'filter.size.sqm.100-200': { en: '100–200', ru: '100–200' },
  'filter.size.sqm.gt200': { en: '200+', ru: '200+' },

  'project.notFound': { en: 'Project not found', ru: 'Проект не найден' },
  'project.goBack': { en: 'Go back to projects.', ru: 'Вернуться к списку проектов.' },
  'project.back': { en: 'Back', ru: 'Назад' },
  'project.priceFrom': { en: 'Price from', ru: 'Цена от' },
  'project.paymentPlan': { en: 'Payment Plan', ru: 'План оплаты' },
  'project.ref': { en: 'Ref', ru: 'Арт.' },
  'project.handover': { en: 'Handover', ru: 'Сдача' },
  'project.unitTypes': { en: 'Unit Types', ru: 'Планировки' },
  'project.about': { en: 'About Project', ru: 'О проекте' },
  'project.documents': { en: 'Documents', ru: 'Документы' },
  'project.request': { en: 'Request PDF / Details', ru: 'Запросить PDF / детали' },
  'project.leadTracking': { en: 'Lead tracking', ru: 'Трекинг лида' },
  'project.amenities': { en: 'Amenities', ru: 'Удобства' },
  'project.enquire': { en: 'Enquire Now', ru: 'Связаться' },
  'project.starting': { en: 'starting', ru: 'от' },
  'project.specs.beds': { en: 'Beds', ru: 'Спальни' },
  'project.specs.baths': { en: 'Baths', ru: 'Ванные' },
  'project.specs.area': { en: 'Area', ru: 'Площадь' },
  'project.specs.developer': { en: 'Developer', ru: 'Застройщик' },

  'lead.title': { en: 'Request details', ru: 'Запросить детали' },
  'lead.general': { en: 'General request', ru: 'Общий запрос' },
  'lead.name': { en: 'Name (optional)', ru: 'Имя (необязательно)' },
  'lead.phone': { en: 'Phone (required)', ru: 'Телефон (обязательно)' },
  'lead.pref': { en: 'Preferred contact', ru: 'Способ связи' },
  'lead.msg': { en: 'Message (optional)', ru: 'Сообщение (необязательно)' },
  'lead.placeholder': { en: 'Budget, move-in date, purpose, etc.', ru: 'Бюджет, сроки, цель покупки и т.д.' },
  'lead.consent': { en: 'I agree to be contacted and to the processing of my data.',
                    ru: 'Согласен(на) на связь со мной и обработку данных.' },
  'lead.cancel': { en: 'Cancel', ru: 'Отмена' },
  'lead.send': { en: 'Send request', ru: 'Отправить' },

  'agent.disclaimer': { en: 'Disclaimer: Prices and availability may change. This showcase is not a public offer.',
                        ru: 'Дисклеймер: Цены и наличие могут меняться. Витрина не является публичной офертой.' },

  'ui.language': { en: 'Language', ru: 'Язык' },
  'ui.currency': { en: 'Currency', ru: 'Валюта' },
  'ui.developer': { en: 'Developer', ru: 'Застройщик' },
  'ui.show': { en: 'Show', ru: 'Показать' },

  // Property Categories
  'cat.all': { en: 'All', ru: 'Все' },
  'cat.primary': { en: 'Primary', ru: 'Первичная' },
  'cat.secondary': { en: 'Secondary', ru: 'Вторичная' },

  // Property Types
  'type.apartment': { en: 'Apartments', ru: 'Квартиры' },
  'type.villa': { en: 'Villas', ru: 'Виллы' },
  'type.penthouse': { en: 'Penthouses', ru: 'Пентхаусы' },
  'type.townhouse': { en: 'Townhouses', ru: 'Таунхаусы' },
  'type.duplex': { en: 'Duplexes', ru: 'Дуплексы' },
  'type.hotel_apartment': { en: 'Hotel Apartments', ru: 'Квартиры В Отелях' },
  'type.whole_building': { en: 'Whole Buildings', ru: 'Целые Здания' },
  'type.shortterm_property': { en: 'Short-term Property', ru: 'Краткосрочная Недвижимость' },
  'type.whole_floor': { en: 'Whole Floors', ru: 'Целые Этажи' },
  'type.half_floor': { en: 'Half Floors', ru: 'Пол-Этажи' },
  'type.commercial_property': { en: 'Commercial Properties', ru: 'Коммерческие Помещения' },
  'type.commercial_showroom': { en: 'Commercial Showrooms', ru: 'Коммерческие Шоу-Румы' },
  'type.land_plot': { en: 'Land Plots', ru: 'Земельные Участки' },

  // Amenities
  'amenity.builtin_wardrobes': { en: 'Built-in Wardrobes', ru: 'Встроенные Шкафы' },
  'amenity.central_ac': { en: 'Central Air Conditioner', ru: 'Центральный Кондиционер' },
  'amenity.covered_parking': { en: 'Covered Parking', ru: 'Крытая Парковка' },
  'amenity.shared_pool': { en: 'Shared Pool', ru: 'Общий Бассейн' },
  'amenity.sea_view': { en: 'Sea/Water View', ru: 'Вид На Море/Воду' },
  'amenity.maintenance': { en: 'Maintenance', ru: 'Содержание' },
  'amenity.supermarket': { en: 'Supermarket', ru: 'Супермаркет' },
  'amenity.beachfront': { en: 'Beach Access', ru: 'Пляжный' },
  'amenity.public_parks': { en: 'Public Parks', ru: 'Общественные Парки' },
  'amenity.restaurant': { en: 'Restaurant', ru: 'Ресторан' },
  'amenity.shared_gym': { en: 'Shared Gym', ru: 'Общий Тренажерный Зал' },
  'amenity.balcony': { en: 'Balcony', ru: 'Балкон' },
  'amenity.near_transport': { en: 'Near Public Transport', ru: 'Рядом С Общественным Транспортом' },
  'amenity.maids_room': { en: 'Maid\'s Room', ru: 'Комната Горничных' },
  'amenity.concierge': { en: 'Concierge Service', ru: 'Консьерж-Сервис' },
  'amenity.near_mall': { en: 'Near Shopping Mall', ru: 'Рядом С Торговым Центром' },
  'amenity.equipped_kitchen': { en: 'Fully Equipped Kitchen', ru: 'Полностью Оборудованная Кухня' },
  'amenity.high_floor': { en: 'High Floor', ru: 'Верхний Этаж' },
  'amenity.water_view': { en: 'Water View', ru: 'Вид На Воду' },
  'amenity.low_floor': { en: 'Low Floor', ru: 'Нижний Этаж' },
  'amenity.pets_allowed': { en: 'Pets Allowed', ru: 'Домашние Животные Разрешены' },
  'amenity.gym': { en: 'Gym', ru: 'Спортзал' },
  'amenity.shared_spa': { en: 'Shared Spa', ru: 'Общий Спа-Центр' },
  'amenity.landmark_view': { en: 'Landmark View', ru: 'Вид На Достопримечательности' },
  'amenity.study': { en: 'Study', ru: 'Изучать' },
  'amenity.private_garden': { en: 'Private Garden', ru: 'Частный Сад' },
  'amenity.private_pool': { en: 'Private Pool', ru: 'Частный Бассейн' },
  'amenity.private_gym': { en: 'Private Gym', ru: 'Частный Тренажерный Зал' },
  'amenity.private_jacuzzi': { en: 'Private Jacuzzi', ru: 'Частное Джакузи' },
  'amenity.builtin_wardrobe': { en: 'Built-in Wardrobe', ru: 'Встроенный Гардероб' },
  'amenity.builtin_appliances': { en: 'Built-in Kitchen Appliances', ru: 'Встроенная Кухонная Техника' },
  'amenity.maid_service': { en: 'Maid Service', ru: 'Услуги Горничной' },
  'amenity.kids_playground': { en: 'Children\'s Playground', ru: 'Детская Игровая Площадка' },
  'amenity.kids_pool': { en: 'Children\'s Pool', ru: 'Детский Бассейн' },
  'amenity.bbq_area': { en: 'BBQ Area', ru: 'Площадка Для Барбекю' },
  'amenity.cable_tv': { en: 'Cable TV', ru: 'Кабельное ТВ' },
  'amenity.security': { en: 'Security', ru: 'Охрана' },
  'amenity.bbq_facility': { en: 'BBQ Facility', ru: 'Место Для Барбекю' },

  // Units
  'unit.Studio': { en: 'Studio', ru: 'Студия' },
  'unit.1BR': { en: '1 Bedroom', ru: '1 спальня' },
  'unit.2BR': { en: '2 Bedrooms', ru: '2 спальни' },
  'unit.3BR': { en: '3 Bedrooms', ru: '3 спальни' },
  'unit.Villa': { en: 'Villa', ru: 'Вилла' },
  'unit.Townhouse': { en: 'Townhouse', ru: 'Таунхаус' },
}

export function t(lang: Lang, key: string) {
  const v = dict[key]
  if (!v) return key
  return v[lang]
}
