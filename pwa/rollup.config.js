import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonsjs from 'rollup-plugin-commonjs';

export default {
  entry: './src/js/main.js',
  plugins: [
    babel({exclude: '../node_modules/**'}),
    uglify(),
    nodeResolve(),
    commonsjs()
  ],
  // Quiet warning: https://github.com/rollup/rollup/wiki/Troubleshooting#this-is-undefined
  context: 'window',
  targets: [
    {
      dest: '../dist/pwa/js/app.js',
      // Fixes 'navigator' not defined when using Firebase and strict mode:
      // http://stackoverflow.com/questions/31221357/webpack-firebase-disable-parsing-of-firebase
      useStrict: false,
      format: 'iife',
      sourceMap: true
    }
  ]
};
