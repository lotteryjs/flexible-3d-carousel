/*
 * Copyright 2018 lotteryjs.com Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

 interface Window {
    cancelRequestAnimationFrame: any;
    [key: string]: any;
 }

 interface CssModule {
    [className: string]: string
  }

  declare module "*.scss" {
    const styles: CssModule
    export = styles;
  }

  declare module "*.css" {
    const styles: CssModule
    export = styles;
  }


 declare module "raf"
