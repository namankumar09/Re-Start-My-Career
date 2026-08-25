const fs = require('fs');
let content = fs.readFileSync('src/data/careerDatabase.ts', 'utf8');
content = content.replace(/transition',\s*}\s*\/\//g, "transition',\n  },\n  //");
fs.writeFileSync('src/data/careerDatabase.ts', content);
