import { Theme } from "./themes";
import os from 'os'
import fs from 'fs-extra'
import { execa } from 'execa'
import path from "path";
import UUID from 'pure-uuid'

const __dirname = path.resolve();

function tmpDir () {
  return os.tmpdir() + path.sep + new UUID(4)
}

export async function generate(theme: Theme) {
  try {
    const dir = tmpDir()
    console.log(`Creating tmp dir ${dir}`)
    await fs.mkdirp(dir)
    await fs.copy(path.join(__dirname, "..", `template-${theme}`), dir)

    console.log("Building site");
    await execa("yarn vite build", {
      stdio: 'inherit',
      cwd: dir,
      shell: true
    });
  } catch (e) {
    console.error(e)
  }
}

const tags = {
  __SCRIPT__: '__SCRIPT__',
  __VENDOR__: '__VENDOR__',
  __STYLE__: '__STYLE__',
}

  const template = `
  <!DOCTYPE html>
  <html lang="en" class="bg-green-400">
    <head>
      <meta charset="UTF-8" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script data-links></script>
      <title>Vite App</title>
      ${tags.__VENDOR__}
      ${tags.__SCRIPT__}
      ${tags.__STYLE__}
    </head>
    <body>
      <div id="app"></div>   
    </body>
  </html>
`
export async function mergeAssets (dir: string) {
  function readAsset (file: string) {
    const abs = path.resolve(dir, "assets", file)
    return fs.readFileSync(abs, "utf-8")
  }

  let html = template

  const assets = fs.readdirSync(path.join(dir, 'assets'))
  for (const file of assets) {
    console.log(file)
    const content = readAsset(file)

    if (file.startsWith('index') && file.endsWith('.js')) {
      html = html.replace(
        tags.__SCRIPT__, 
        `<script>${content}</script>`
      )
    } else if (file.startsWith('index') && file.endsWith('.css')) {
      html = html.replace(
        tags.__STYLE__, 
        `<style>${content}</style>`
      )
    } else if (file.startsWith('vendor')) {
      html = html.replace(
        tags.__VENDOR__, 
        `<script>${content}</script>`
      )
    }
  }

  console.log('generated html:\n\n')

  return html
}

mergeAssets('/var/folders/y5/pxtkrbvj6m12cmv789rwl8pm0000gn/T/4b67798c-9d09-4041-91fa-f6180f50384c/dist')
.then(res => {
  fs.writeFile('site.html', res)
})
// generate('forest')