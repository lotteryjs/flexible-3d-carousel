/*
 * Copyright 2018 lotteryjs.com Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

interface IWindow {
    cancelRequestAnimationFrame: any;
    [key: string]: any;
}

interface ICssModule {
    [className: string]: string;
}

declare module "*.scss" {
    const styles: ICssModule;
    export = styles;
}

declare module "*.css" {
    const styles: ICssModule;
    export = styles;
}


declare module "raf";
