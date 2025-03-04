# babel-plugin-auto-css-module

> 自动为使用 import ss from './index.css'这样引入方式的 css 文件添加特定后缀
> 方便 css 模块化
> 不需要在创建文件时添加后缀，例如 index.module.css

## 安装

```bash
pnpm add babel-plugin-auto-css-module -D
# or
yarn add babel-plugin-auto-css-module -D
# or
npm install babel-plugin-auto-css-module -D
```

## 参数

| 参数名     | 类型     | 默认值                              | 说明                          |
| ---------- | -------- | ----------------------------------- | ----------------------------- |
| cssSuffix  | string[] | ['.css', '.less', '.scss', '.sass'] | 需要添加后缀的 css 文件后缀名 |
| fileSuffix | string   | 'css_modules'                       | 添加后缀的文件名后缀          |

## 使用

```js
// .babelrc or babel-loader option
{
  "plugins": [
    [
      "babel-plugin-auto-css-module",
      {
        "cssSuffix": ['.css', '.scss']
        "fileSuffix": "css_modules"
      }
    ]
  ]
}
```

```js
// webpack.config.js
module.export = {
  ...
  module: {
    rules: [
      ...
      {
        test: /\.scss/,
        oneOf: [
          {
            // your fileSuffix
            // default css_modules
            resourceQuery: /css_modules/
            use: [
              ...
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    localIdentName: '[name]__[local]-[hash:base64:5]',
                  }
                }
              }
            ]
          },
          {
            use: [..., 'css-loader']
          }
        ]
      }
    ]
  }
}
```
