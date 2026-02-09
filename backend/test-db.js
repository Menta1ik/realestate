
const { Client } = require('pg');

// Removed sslmode=require from the connection string to let the ssl object take precedence
const config6543 = {
  connectionString: 'postgresql://postgres.dvmumqnxicetaihjxijl:jKZV63oWuHVbgXyf@aws-1-eu-central-1.pooler.supabase.com:6543/postgres',
  ssl: {
    rejectUnauthorized: false
  }
};

const config5432 = {
  connectionString: 'postgresql://postgres.dvmumqnxicetaihjxijl:jKZV63oWuHVbgXyf@aws-1-eu-central-1.pooler.supabase.com:5432/postgres',
  ssl: {
    rejectUnauthorized: false
  }
};

async function testConnection(name, config) {
  console.log(`Testing ${name}...`);
  const client = new Client(config);
  try {
    await client.connect();
    console.log(`✅ ${name} Connected successfully!`);
    const res = await client.query('SELECT NOW()');
    console.log(`   Time: ${res.rows[0].now}`);
    await client.end();
  } catch (err) {
    console.error(`❌ ${name} Failed:`, err.message);
  }
}

async function main() {
  await testConnection('Transaction Pooler (6543)', config6543);
  await testConnection('Session Pooler (5432)', config5432);
}

main();
