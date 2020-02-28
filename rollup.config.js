import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';

export default {
   input: './src/js/app/app.js',
   output: {
      file: './dist/js/app.js',
      format: 'umd',
      name: 'PLOTTO',
      sourcemap: true,
      plugins: [terser()],
      strict: true
   },
   plugins: [babel()],
};