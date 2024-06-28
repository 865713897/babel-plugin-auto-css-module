// const babel = require('@babel/core');
// const AutoCssModule = require('./lib/index.cjs');
import * as babel from '@babel/core';
import AutoCssModule from './src/index.ts';

describe('AutoCssModule', () => {
  test('需要在最后添加css_modules', () => {
    const inputCode = `import ss from './index.css';`;
    const { code }: any = babel.transform(inputCode, {
      plugins: [
        [AutoCssModule, { cssSuffix: '.css', fileSuffix: 'css_modules' }],
      ],
      filename: 'file.js',
    });
    expect(code).toMatch(`import ss from \"./index.css?css_modules\";`);
  });

  test('不需要在文件末尾添加css_modules', () => {
    const inputCode = `import "./index.css"`;
    const { code }: any = babel.transform(inputCode, {
      plugins: [
        [AutoCssModule, { cssSuffix: '.css', fileSuffix: 'css_modules' }],
      ],
      filename: 'file.js',
    });
    expect(code).toMatch(`import \"./index.css\";`);
  });
});
