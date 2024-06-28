'use strict';

const path = require('path');

function AutoCssModule(options) {
  const {
    cssSuffix = [".css", ".less", ".scss", ".sass"],
    fileSuffix = "css_modules"
  } = options;
  let cssSuffixList = [];
  if (typeof cssSuffix === "string") {
    cssSuffixList = [cssSuffix];
  } else {
    cssSuffixList = cssSuffix;
  }
  return {
    visitor: {
      ImportDeclaration(path$1) {
        const { specifiers, source } = path$1.node;
        const { value } = source;
        if (specifiers.length !== 0 && cssSuffixList.includes(path.extname(value))) {
          source.value = `${value}?${fileSuffix}`;
        }
      }
    }
  };
}

module.exports = AutoCssModule;
