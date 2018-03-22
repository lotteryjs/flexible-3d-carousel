/*
 * Copyright 2018 lotteryjs.com Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

interface IWindow {
    cancelRequestAnimationFrame: any;
    [key: string]: any;
}

declare module "raf";
