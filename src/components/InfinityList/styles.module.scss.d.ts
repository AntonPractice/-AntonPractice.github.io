declare namespace StylesModuleScssNamespace {
  export interface IStylesModuleScss {
    holder: string;
    item: string;
    root: string;
    shortProductCard: string;
  }
}

declare const StylesModuleScssModule: StylesModuleScssNamespace.IStylesModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StylesModuleScssNamespace.IStylesModuleScss;
};

export = StylesModuleScssModule;
