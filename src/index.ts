import { extname } from 'path';
import { PluginObj } from '@babel/core';

interface Options {
  cssSuffix: string[] | string;
  fileSuffix: string;
}

export default function AutoCssModule(options: Options): PluginObj {
  const {
    cssSuffix = ['.css', '.less', '.scss', '.sass'],
    fileSuffix = 'css_modules',
  } = options;
  let cssSuffixList: string[] = [];
  if (typeof cssSuffix === 'string') {
    cssSuffixList = [cssSuffix];
  } else {
    cssSuffixList = cssSuffix;
  }
  return {
    visitor: {
      ImportDeclaration(path) {
        // 如果import ss from './index.css';
        // 则 specifiers 为 [{ type: 'ImportDefaultSpecifier', local: { type: 'Identifier', name: 'ss' } }]
        // 如果import './index.css';
        // 则 specifiers 为 []
        const { specifiers, source } = path.node;
        const { value } = source;
        if (specifiers.length !== 0 && cssSuffixList.includes(extname(value))) {
          // 使用对象引入方式，为文件后缀增加特定标志
          source.value = `${value}?${fileSuffix}`;
        }
      },
    },
  };
}
