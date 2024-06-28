import { extname } from 'path';

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
      ImportDeclaration(path) {
        const { specifiers, source } = path.node;
        const { value } = source;
        if (specifiers.length !== 0 && cssSuffixList.includes(extname(value))) {
          source.value = `${value}?${fileSuffix}`;
        }
      }
    }
  };
}

export { AutoCssModule as default };
