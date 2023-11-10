const fs = require('fs');
const path = require('path');

// Obtém o diretório raiz do projeto
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

// Obtém todos os arquivos (componentes) de entrada
const entryFiles = fs
  .readdirSync(resolveApp('src/entries'))
  .filter((fileName) => /\.js$/.test(fileName));
const entries = entryFiles.reduce((result, fileName) => {
  const key = fileName.replace('.js', '');
  return {
    ...result,
    [key]: resolveApp(`src/entries/${fileName}`),
  };
}, {});

// Exporta o array contendo o caminho para os arquivos, bem como os nomes dos componentes
module.exports = {
  entries,
  entriesNames: Object.keys(entries),
};
