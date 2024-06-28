import { PluginObj } from '@babel/core';

interface Options {
    cssSuffix: string[] | string;
    fileSuffix: string;
}
declare function AutoCssModule(options: Options): PluginObj;

export { AutoCssModule as default };
