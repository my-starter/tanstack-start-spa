import { glob } from 'glob';
import { readFileSync, writeFileSync } from 'node:fs';

async function generateServiceWorker(outputDir = '.output/public') {
  // const manifest = JSON.parse(
  //   readFileSync(".output/public/.vite/manifest.json", "utf-8")
  // );

  const files = await glob(`${outputDir}/**/*`, { nodir: true });

  const ignoredRoutes = ['/robots.txt', '/nitro.json', '/sw.js', '/registerSW.js'];

  const assetsToCache = files
    .map((file) => {
      if (file.startsWith('/server') || file.startsWith('/.vite')) {
        return file;
      }
      return `/${file.replace(new RegExp(`^${outputDir}/`), '')}`;
    })
    .filter((file) => !ignoredRoutes.includes(file));

  const swFileContent = readFileSync('scripts/sw.js', 'utf-8')
    .toString()
    .replace(`''/*#replaceUrls*/`, JSON.stringify(assetsToCache, null, 2))
    .replace(`'cache-v0'/*#replaceCacheName*/`, `'cache-v${Date.now()}'`);

  writeFileSync(`${outputDir}/sw.js`, swFileContent);
  console.log('Service worker generated successfully!');
}

generateServiceWorker().catch(console.error);
