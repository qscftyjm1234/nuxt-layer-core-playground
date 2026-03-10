const fs = require('fs');
const path = require('path');
const corePath = 'packages/nuxt-core/components';

function auditFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const name = path.basename(filePath, '.vue');

  const propsMatch = raw.match(/interface Props \{([\s\S]*?)\}/);
  if (!propsMatch) return;
  
  const definedProps = [];
  propsMatch[1].split('\n').forEach(function(line) {
    const t = line.trim();
    if (t && t.indexOf('//') !== 0 && t.indexOf('*') !== 0 && t.includes(':')) {
      const p = t.split(':')[0].replace('?','').trim();
      if (p && p.length > 0) definedProps.push(p);
    }
  });

  const templateMatch = raw.match(/<template>([\s\S]*)<\/template>/);
  if (!templateMatch) return;
  const tpl = templateMatch[1];

  // Script body without the Props interface
  const withoutInterface = raw.replace(propsMatch[0], '');

  const issues = [];
  definedProps.forEach(function(prop) {
    // Convert camelCase to kebab-case
    const kebab = prop.replace(/([A-Z])/g, function(m) { return '-' + m.toLowerCase(); }).replace(/^-/, '');
    const usedInTpl = tpl.includes(prop) || tpl.includes(kebab);
    const usedInScript = withoutInterface.includes(prop);
    
    if (!usedInTpl && !usedInScript) {
      issues.push(prop);
    }
  });
  
  if (issues.length > 0) {
    console.log('[UNUSED] ' + name + ': ' + issues.join(', '));
  } else {
    console.log('[OK] ' + name);
  }
}

function scan(dir) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(function(f) {
    const fp = path.join(dir, f);
    if (fs.statSync(fp).isDirectory()) scan(fp);
    else if (f.endsWith('.vue')) auditFile(fp);
  });
}

['uiInterface','uiBusiness'].forEach(function(d) { scan(path.join(corePath,d)); });
console.log('--- AUDIT DONE ---');
