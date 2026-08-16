const fs = require('fs');

const html = fs.readFileSync('build/courses/ai-medical-coding-course/index.html', 'utf8');

const matches = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)];

console.log(`Found ${matches.length} JSON-LD script(s) on this page.\n`);

matches.forEach((m, i) => {
  console.log(`--- Script ${i + 1} ---`);
  try {
    const parsed = JSON.parse(m[1]);
    console.log(JSON.stringify(parsed, null, 2));
  } catch (err) {
    console.log('PARSE ERROR:', err.message);
    console.log('Raw content:', m[1]);
  }
  console.log('');
});