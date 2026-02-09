import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import { regionsData } from './data/regions';

const prisma = new PrismaClient();

// regionsData imported from ./data/regions

const projects = [
  {
    id: 'celesto4',
    ref: 'CL-0041',
    areaId: 'businessbay',
    nameEn: 'Celesto 4',
    nameRu: 'Celesto 4',
    developer: 'Tarrad Developer',
    status: 'Off-plan',
    type: 'apartment',
    handoverEn: 'Q4 2028',
    handoverRu: '4 кв. 2028',
    priceFromAED: 790000,
    paymentPlanEn: '60/40',
    paymentPlanRu: '60/40',
    tags: ['Hot', 'New', 'Smart Home'],
    descriptionEn:
      'Modern tower with premium finishes, smart home package and fully furnished units. Strong investor appeal due to central location and flexible payment plan.',
    descriptionRu:
      'Современная башня с премиальной отделкой, smart home и полностью меблированными юнитами. Сильна для инвестора благодаря локации и гибкому плану оплаты.',
    specs: {
      bedrooms: 2,
      bathrooms: 2,
      sizeSqft: 980
    },
    amenities: ['shared_pool', 'shared_gym', 'concierge', 'security', 'balcony'],
    photos: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1000'
    ],
    unitTypes: [
      { kind: '1BR', priceFromAED: 790000, sizeFromSqFt: 690 },
      { kind: '2BR', priceFromAED: 1180000, sizeFromSqFt: 980 },
    ],
    documents: [
      { labelEn: 'Brochure (PDF)', labelRu: 'Брошюра (PDF)', type: 'brochure', url: 'https://example.com/brochure.pdf' },
      { labelEn: 'Floor Plans (PDF)', labelRu: 'Планировки (PDF)', type: 'floorplan', url: 'https://example.com/floorplans.pdf' },
      { labelEn: 'Payment Plan (PDF)', labelRu: 'План оплаты (PDF)', type: 'paymentplan', url: 'https://example.com/paymentplan.pdf' },
    ],
  },
  {
    id: 'marina-heights',
    ref: 'MH-9201',
    areaId: 'marina',
    nameEn: 'Marina Heights',
    nameRu: 'Marina Heights',
    developer: 'Emaar',
    status: 'Ready',
    type: 'apartment',
    handoverEn: 'Ready',
    handoverRu: 'Готово',
    priceFromAED: 1350000,
    paymentPlanEn: 'Cash / Mortgage',
    paymentPlanRu: 'Наличные / Ипотека',
    tags: ['Top', 'View', 'Ready'],
    descriptionEn:
      'Ready-to-move apartments with marina views. Great for end-users and short-term rentals.',
    descriptionRu:
      'Готовые квартиры с видом на марину. Подходит для проживания и краткосрочной аренды.',
    specs: {
      bedrooms: 3,
      bathrooms: 3,
      sizeSqft: 1450
    },
    amenities: ['shared_pool', 'shared_gym', 'beachfront', 'near_mall', 'pets_allowed'],
    photos: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1600596542815-e3287166183d?auto=format&fit=crop&q=80&w=1000'
    ],
    unitTypes: [
      { kind: 'Studio', priceFromAED: 980000, sizeFromSqFt: 430 },
      { kind: '1BR', priceFromAED: 1350000, sizeFromSqFt: 720 },
      { kind: '2BR', priceFromAED: 1980000, sizeFromSqFt: 1100 },
    ],
    documents: [
      { labelEn: 'Brochure (PDF)', labelRu: 'Брошюра (PDF)', type: 'brochure', url: 'https://example.com/brochure.pdf' },
      { labelEn: 'Floor Plans (PDF)', labelRu: 'Планировки (PDF)', type: 'floorplan', url: 'https://example.com/floorplans.pdf' },
    ],
  },
  {
    id: 'jvc-skyline',
    ref: 'JV-8823',
    areaId: 'jvc',
    nameEn: 'JVC Skyline',
    nameRu: 'JVC Skyline',
    developer: 'Damac',
    status: 'Off-plan',
    type: 'townhouse',
    handoverEn: 'Q2 2027',
    handoverRu: '2 кв. 2027',
    priceFromAED: 640000,
    paymentPlanEn: '50/50',
    paymentPlanRu: '50/50',
    tags: ['Best ROI', 'Affordable'],
    descriptionEn:
      'Affordable entry point with strong rental demand. Optimized layouts for investors.',
    descriptionRu:
      'Доступный вход с сильным спросом на аренду. Оптимальные планировки для инвесторов.',
    specs: {
      bedrooms: 4,
      bathrooms: 3,
      sizeSqft: 2100
    },
    amenities: ['shared_pool', 'shared_gym', 'covered_parking', 'maids_room', 'balcony'],
    photos: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000'
    ],
    unitTypes: [
      { kind: 'Studio', priceFromAED: 640000, sizeFromSqFt: 410 },
      { kind: '1BR', priceFromAED: 820000, sizeFromSqFt: 680 },
      { kind: 'Townhouse', priceFromAED: 1450000, sizeFromSqFt: 1650 },
    ],
    documents: [
      { labelEn: 'Brochure (PDF)', labelRu: 'Брошюра (PDF)', type: 'brochure', url: 'https://example.com/brochure.pdf' },
    ],
  },
];

async function main() {
  console.log('Start seeding ...');

  // 1. Seed Areas
  console.log('Seeding Areas...');
  for (const a of regionsData) {
    await prisma.area.upsert({
      where: { id: a.id },
      update: {
        slug: a.slug,
        nameEn: a.nameEn,
        nameRu: a.nameRu,
        propertyTypeEn: a.propertyTypeEn,
        propertyTypeRu: a.propertyTypeRu,
        featuresEn: a.featuresEn,
        featuresRu: a.featuresRu,
        locationEn: a.locationEn,
        locationRu: a.locationRu,
        schoolsEn: a.schoolsEn as any, // Cast to any for Json
        schoolsRu: a.schoolsRu as any,
        descriptionEn: a.descriptionEn,
        descriptionRu: a.descriptionRu,
        developer: a.developer,
        avgPricesEn: a.avgPricesEn as any,
        avgPricesRu: a.avgPricesRu as any,
        nearbyAreasEn: a.nearbyAreasEn,
        nearbyAreasRu: a.nearbyAreasRu,
        // Preserve legacy fields if needed or set to null/default if missing
        // Since regionsData doesn't have them, we skip updating them or set to null
        // teaserEn: a.teaserEn,
        // teaserRu: a.teaserRu,
        // priceFromAED: a.priceFromAED,
        // roi: a.roi
      },
      create: {
        id: a.id,
        slug: a.slug,
        nameEn: a.nameEn,
        nameRu: a.nameRu,
        propertyTypeEn: a.propertyTypeEn,
        propertyTypeRu: a.propertyTypeRu,
        featuresEn: a.featuresEn,
        featuresRu: a.featuresRu,
        locationEn: a.locationEn,
        locationRu: a.locationRu,
        schoolsEn: a.schoolsEn as any,
        schoolsRu: a.schoolsRu as any,
        descriptionEn: a.descriptionEn,
        descriptionRu: a.descriptionRu,
        developer: a.developer,
        avgPricesEn: a.avgPricesEn as any,
        avgPricesRu: a.avgPricesRu as any,
        nearbyAreasEn: a.nearbyAreasEn,
        nearbyAreasRu: a.nearbyAreasRu,
        // teaserEn: a.teaserEn,
        // teaserRu: a.teaserRu,
        // priceFromAED: a.priceFromAED,
        // roi: a.roi
      },
    });
  }

  // 2. Seed Developers from Markdown
  console.log('Seeding Developers from Markdown...');
  let developersCount = 0;
  try {
    const devFilePath = path.join(__dirname, '../../docs/developers full test.md');
    if (fs.existsSync(devFilePath)) {
      const devContent = fs.readFileSync(devFilePath, 'utf-8');
      const devLines = devContent.split('\n').filter(l => l.trim().startsWith('|'));
      
      for (const line of devLines) {
        const cols = line.split('|').map(c => c.trim());
        // Expected format: | ID | Name | Slug | Year | Office | DescriptionRu | DescriptionEn |
        // cols indices: 0="", 1=ID, 2=Name, 3=Slug, 4=Year, 5=Office, 6=DescriptionRu, 7=DescriptionEn, 8=""
        
        if (cols.length < 7) continue;
        
        const idCol = cols[1];
        if (idCol.toLowerCase() === 'id' || idCol.includes('---')) continue;
        
        const name = cols[2];
        const slug = cols[3];
        const yearStr = cols[4];
        const office = cols[5] === '-' ? null : cols[5];
        const descriptionRu = cols[6] === '-' ? null : cols[6];
        const descriptionEn = (cols[7] && cols[7] !== '-') ? cols[7] : descriptionRu; // Fallback to Ru if En missing
        
        const year = (yearStr && yearStr !== '-' && !isNaN(Number(yearStr))) ? parseInt(yearStr, 10) : null;
        
        if (slug && name) {
          const nameEn = name;
          const nameRu = name; // TODO: Translate or separate in source

          await prisma.developer.upsert({
            where: { slug },
            update: {
              name,
              // @ts-ignore
              nameEn,
              // @ts-ignore
              nameRu,
              year,
              office,
              // @ts-ignore
              descriptionEn,
              // @ts-ignore
              descriptionRu,
            },
            create: {
              name,
              // @ts-ignore
              nameEn,
              // @ts-ignore
              nameRu,
              slug,
              year,
              office,
              // @ts-ignore
              descriptionEn,
              // @ts-ignore
              descriptionRu,
            },
          });
          developersCount++;
        }
      }
      console.log(`Seeded ${developersCount} developers.`);
    } else {
      console.warn(`Developer file not found at ${devFilePath}`);
    }
  } catch (error) {
    console.error('Error seeding developers:', error);
  }

  // 3. Seed Projects
  console.log('Seeding Projects...');

  // Fetch all developers to assign random ones if needed
  const allDevelopers = await prisma.developer.findMany();
  
  for (const p of projects) {
    const { tags, amenities, photos, unitTypes, documents, specs, ...rest } = p;
    
    // Try to find developer by name match
    let devId = null;
    let devName = p.developer;

    if (allDevelopers.length > 0) {
      // 1. Try to find exact or fuzzy match in existing developers
      const matchedDev = allDevelopers.find(d => 
        d.name.toLowerCase() === p.developer.toLowerCase() ||
        d.name.toLowerCase().includes(p.developer.toLowerCase()) ||
        p.developer.toLowerCase().includes(d.name.toLowerCase())
      );

      if (matchedDev) {
        devId = matchedDev.id;
        devName = matchedDev.name; // Ensure consistent naming
      } else {
        // 2. If no match found, pick a random developer
        const randomDev = allDevelopers[Math.floor(Math.random() * allDevelopers.length)];
        devId = randomDev.id;
        devName = randomDev.name;
        console.log(`Assigned random developer ${devName} to project ${p.nameEn}`);
      }
    }

    await prisma.project.upsert({
      where: { id: p.id },
      update: {
        developerId: devId,
        developer: devName,
      },
      create: {
        ...rest,
        developer: devName,
        developerId: devId,
        bedrooms: specs.bedrooms.toString(),
        bathrooms: specs.bathrooms.toString(),
        size: `${specs.sizeSqft} sq.ft`,
        
        tags: {
          create: tags.map(t => ({ name: t })),
        },
        amenities: {
          create: amenities.map(c => ({ code: c })),
        },
        photos: {
          create: photos.map(url => ({ url })),
        },
        unitTypes: {
          create: unitTypes.map(u => ({
            kind: u.kind,
            priceFromAED: u.priceFromAED,
            sizeFromSqFt: u.sizeFromSqFt,
          })),
        },
        documents: {
          create: documents.map(d => ({
            labelEn: d.labelEn,
            labelRu: d.labelRu,
            type: d.type,
            url: d.url,
          })),
        },
      },
    });
  }

  // 4. Seed Properties
  console.log('Seeding Properties...');
  
  // Clean up properties to ensure fresh seed
  // await prisma.property.deleteMany({}); // Optional: depends if we want to clear old data
  
  for (const p of projects) {
    const { tags, amenities, photos, unitTypes, documents, specs, ...rest } = p;
    
    // Re-resolve developer for properties (same logic as projects to keep consistency)
    // In a real scenario, we should probably query the project we just updated, 
    // but for this seed script, we can just re-apply the logic or fetch the project.
    
    // Better: Fetch the updated project to get the assigned developer
    const updatedProject = await prisma.project.findUnique({ where: { id: p.id } });
    const devId = updatedProject?.developerId;
    const devName = updatedProject?.developer || p.developer;

    for (const u of unitTypes) {
      // Create a unique suffix for ID and Ref
      const kindSanitized = u.kind.replace(/\s+/g, '').toLowerCase();
      const propId = `prop-${p.id}-${kindSanitized}`;
      const propRef = `PROP-${p.ref}-${u.kind.toUpperCase()}`;
      
      // Determine bedrooms string based on unit kind
      let bedroomsStr = specs.bedrooms.toString();
      if (u.kind === 'Studio') bedroomsStr = 'Studio';
      else if (u.kind.includes('BR')) bedroomsStr = u.kind.replace('BR', '');
      
      // Name with suffix for clarity
      const nameSuffix = ` (${u.kind})`;
      
      await prisma.property.upsert({
        where: { id: propId },
        update: {
          developerId: devId,
          developer: devName,
        },
        create: {
          ...rest,
          id: propId,
          ref: propRef,
          nameEn: `${p.nameEn}${nameSuffix}`,
          nameRu: `${p.nameRu}${nameSuffix}`,
          priceFromAED: u.priceFromAED,
          bedrooms: bedroomsStr,
          bathrooms: specs.bathrooms.toString(),
          size: `${u.sizeFromSqFt} sq.ft`,
          developerId: devId,
          developer: devName,
          
          tags: {
            create: tags.map(t => ({ name: t })),
          },
          amenities: {
            create: amenities.map(c => ({ code: c })),
          },
          photos: {
            create: photos.map(url => ({ url })),
          },
          unitTypes: {
            create: [{
              kind: u.kind,
              priceFromAED: u.priceFromAED,
              sizeFromSqFt: u.sizeFromSqFt,
            }],
          },
          documents: {
            create: documents.map(d => ({
              labelEn: d.labelEn,
              labelRu: d.labelRu,
              type: d.type,
              url: d.url,
            })),
          },
        },
      });
    }
  }

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
