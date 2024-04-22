const { createFilter } = require('@rollup/pluginutils');
const { walk } = require('estree-walker');
const MagicString = require('magic-string');
const {
  isProgram,
  isImportDeclaration,
  isImportSpecifierArray,
  lodashSpecifiersToEs,
  lodashSpecifiersToCjs,
} = require('./utils');

function rollupImportPlugins({ library = [], useEs } = {}) {
  const filter = createFilter();
  if (!library.length) {
    return {};
  }
  return {
    name: 'import-plugin',
    transform(code, id) {
      if (!filter(id)) return;
      if (library.every((lib) => !code.includes(lib.libraryName))) {
        return null;
      }
      const warn = this.warn.bind(this);
      const parse = this.parse.bind(this);

      let ast;
      try {
        ast = parse(code);
      } catch (error) {
        error.message += ` in ${id}`;
        throw error;
      }
      let magicString;
      walk(ast, {
        enter(node) {
          // top-level node; we need to walk its children to find imports
          if (isProgram(node)) {
            return;
          }
          // skip any nodes that aren't imports (this skips most everything)
          if (!isImportDeclaration(node)) {
            this.skip();
            return;
          }
          const currLib = library.find((lib) => node.source.value === lib.libraryName);
          if (!currLib) {
            this.skip();
            return;
          }
          if (isImportSpecifierArray(node.specifiers)) {
            magicString = magicString ?? new MagicString(code);
            const libraryDirectory = currLib.libraryDirectory || '';
            const imports = useEs
              ? lodashSpecifiersToEs(node.source.value, node.specifiers, libraryDirectory)
              : lodashSpecifiersToCjs(node.source.value, node.specifiers, libraryDirectory);

            // write
            magicString.overwrite(node.start, node.end, imports.join('\n'));

            this.skip();
          } else if (warn !== undefined) {
            warn(
              `Detected a default lodash or lodash/fp import within ${id} on line ${
                node.loc?.start?.line ?? 'unknown'
              }.\nThis import cannot be optimized by optimize-lodash-imports.`,
            );
          }
        },
      });
      if (!magicString) {
        return null;
      }
      return {
        code: magicString.toString(),
        map: magicString.generateMap({
          file: id,
          includeContent: true,
          hires: true,
        }),
      };
    },
  };
}

module.exports = rollupImportPlugins;
