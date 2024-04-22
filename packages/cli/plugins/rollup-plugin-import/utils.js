const path = require('path');
function isImportDeclaration(node) {
  return node.type === 'ImportDeclaration';
}

function isProgram(node) {
  return node.type === 'Program';
}

function isImportSpecifierArray(items) {
  return items.every((item) => item.type === 'ImportSpecifier');
}

function lodashSpecifiersToCjs(base, specifiers, dir) {
  return specifiers.map(
    ({ imported, local }) =>
      `import ${imported.name !== local.name ? local.name : imported.name} from "${path.join(
        base,
        dir,
        imported.name,
      )}";`,
  );
}

function lodashSpecifiersToEs(base, specifiers, dir) {
  const isFp = base.endsWith('fp');
  return specifiers.map(
    ({ imported, local }) =>
      `import { ${imported.name !== local.name ? imported.name + ' as ' + local.name : local.name} } from "${path.join(
        base,
        dir,
        imported.name,
      )}";`,
  );
}

exports.isImportDeclaration = isImportDeclaration;
exports.isProgram = isProgram;
exports.isImportSpecifierArray = isImportSpecifierArray;
exports.lodashSpecifiersToCjs = lodashSpecifiersToCjs;
exports.lodashSpecifiersToEs = lodashSpecifiersToEs;
