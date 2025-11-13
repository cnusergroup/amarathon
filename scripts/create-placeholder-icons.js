const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'src', 'assets', 'images', 'amarothon12');

// Facebook icon (简单的 'f' 图标 - 18x18 PNG base64)
const facebookIconBase64 = 'iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADaSURBVHgBrZPBDYMwDEVtxAQdgQ3oBmWEjsAIHaEjdISOQEfoCIzACB2BG8QnYqkqVKJA+0mWZTv+tpMYAGOMSimdABzbtl0ppQvnfLfb7RZCiF3X9Xmep+u6PgghDl3Xn+d5uq7rQwhx6Lr+PM/TdV0fQohD1/XneZ6u6/oQQhy6rj/P83Rd14cQ4tB1/Xmep+u6PoQQh67rz/M8Xdf1IYQ4dF1/nufpuq4PIcSh6/rzPE/XdX0IIQ5d15/nebqu60MIcei6/jzP03VdH0KIQ9f153merut6AAAA//8DAKxQKZ0AAAAASUVORK5CYII=';

// LinkedIn icon (简单的 'in' 图标 - 18x18 PNG base64)
const linkedinIconBase64 = 'iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADcSURBVHgBrZPBDYMwDEVtxAQdgQ3oBmWEjsAIHaEjdISOQEfoCIzACB2BG8QnYqkqVKJA+0mWZTv+tpMYAGOMSimdABzbtl0ppQvnfLfb7RZCiF3X9Xmep+u6PgghDl3Xn+d5uq7rQwhx6Lr+PM/TdV0fQohD1/XneZ6u6/oQQhy6rj/P83Rd14cQ4tB1/Xmep+u6PoQQh67rz/M8Xdf1IYQ4dF1/nufpuq4PIcSh6/rzPE/XdX0IIQ5d15/nebqu60MIcei6/jzP03VdH0KIQ9f153merut6AAAA//8DAKxQKZ0AAAAASUVORK5CYII=';

// 保存图标
const icons = {
  'agenda_f.png': facebookIconBase64,
  'agenda_in.png': linkedinIconBase64
};

console.log('🎨 Creating placeholder social media icons...\n');

for (const [filename, base64Data] of Object.entries(icons)) {
  const filepath = path.join(baseDir, filename);
  const buffer = Buffer.from(base64Data, 'base64');
  fs.writeFileSync(filepath, buffer);
  console.log(`✓ Created: ${filename}`);
}

console.log('\n✅ Placeholder icons created!');
