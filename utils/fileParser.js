import fs from 'fs';

function parseInputFile(filename) {
  const list1 = [];
  const list2 = [];
  
  const content = fs.readFileSync(filename, 'utf8');
  const lines = content.trim().split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line) {
      const parts = line.split(/\s+/);
      if (parts.length >= 2) {
        list1.push(parseInt(parts[0], 10));
        list2.push(parseInt(parts[1], 10));
      }
    }
  }
  
  return [list1, list2];
}

export { parseInputFile };