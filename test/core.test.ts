/*
 * Copyright 2018 lotteryjs.com Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

import { Animation } from "../src/core/animation";
import { Core } from "../src/core/index";
import { ICore, IItemStyle, IOptions } from "../src/core/props";

describe("Core", () => {
    let options: IOptions;
    beforeEach(() => {
        options = {
            fps: 60,
            count: 3,
            width: 222,
            height: 323,
            percentageW: 0.25,
            farScale: 0.5,
            speed: 0.03,
            autoPlay: false,
            autoPlayDelay: 2000,
            render(styles: IItemStyle[]) {
                return styles;
            },
        };
    });
    it("测试配置项[options]", () => {
        Core.defaultOptions.render([]);
        const core = new Core(options);
        expect(core.options).toEqual(options);
    });
    it("测试动画开始[autoPlay:true]", () => {
        const core = new Core(options);
        core.play();
        expect(core.options.autoPlay).toBe(true);
    });
    it("测试动画停止[autoPlay:false]", () => {
        const core = new Core(options);
        core.stop();
        expect(core.options.autoPlay).toBe(false);
    });
    it("测试动画播放延迟autoPlayDelay", () => {
        // mock 一个Core实例
        const core: ICore = {
            options: {
                count: 3,
                width: 222,
                height: 323,
                autoPlay: true,
                autoPlayDelay: 0,
                render(styles: IItemStyle[]) {
                    return styles;
                },
            },
            rotation: Math.PI,
            spacing: Math.PI / 4,
            render: (rotation?: number) => void 0,
        };
        const animation = new Animation(core);
        animation.rotation = 2 * Math.PI + core.rotation;
        animation.init();
        expect(core.options.autoPlay).toBe(true);
        expect(core.options.autoPlayDelay).toBe(0);
    });
});
