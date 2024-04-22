const fs = require('fs');
const path = require('path');
const { createExportableManifest } = require('@pnpm/exportable-manifest');
const { readProjectManifestOnly } = require('@pnpm/read-project-manifest');

exports.replaceWorkspace = async () => {
  const projectDir = process.cwd();
  const outputDir = path.resolve(projectDir, 'opts');
  const manifest = await readProjectManifestOnly(projectDir);
  const exportable = await createExportableManifest(projectDir, manifest);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  fs.writeFileSync(path.resolve(outputDir, 'package.json'), JSON.stringify(exportable, undefined, 2));
};
