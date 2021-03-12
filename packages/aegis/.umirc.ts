import { defineConfig } from 'umi';
import fs from 'fs'
import path from 'path'

const cwd = process.cwd();
const pages_dir = path.join(cwd, 'src/pages');

const getRoute =async () => {
  const files = await fs.readdirSync(pages_dir)
  return files.map(file=>{
    if(file==='home'){
      return {
        path: '/',
        component: '@/pages/'+file
      }
    }
    return {
      path: file,
      component: '@/pages/'+file
    }
  })
}


export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: getRoute(),
  fastRefresh: {},
  esbuild: {},
});
