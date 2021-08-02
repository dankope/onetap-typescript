import commonjs from '@rollup/plugin-commonjs';
import strip from '@rollup/plugin-strip';
import { babel } from '@rollup/plugin-babel';

export default {
    input: './dist/intermediates/main.js',
    output: {
        file: './dist/bundle.js',
        format: 'iife',
        sourcemap: false,
    },
    plugins: [
        strip({
            include: ['./dist/intermediates/**/*.js'],
            functions: [] // Strip debug logs and what not for production builds.
        }),
        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**',
            presets: [
                [
                    "@babel/env",
                    {
                        "useBuiltIns": "entry",
                        "targets": {
                            "browsers": ["IE 6"]
                        },
                        "corejs": 3
                    }
                ]
            ]
        }),
        commonjs({ transformMixedEsModules: true })
    ]
};