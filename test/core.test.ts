/*
 * Copyright 2018 lotteryjs.com Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

import { Animation } from "../src/carousel/animation";
import { Carousel } from "../src/carousel";
import { ICarousel, IItemsStyle, IOptions } from "../src/carousel/props";

describe("Carousel", () => {
    let options: IOptions;
    beforeEach(() => {
        options = {
            fps: 60,
            count: 3,
            width: 222,
            height: 323,
            percentW: 0.25,
            farScale: 0.5,
            slideSpeed: 0.03,
            autoSlide: false,
            slideDelay: 2000,
            render(styles: IItemsStyle[]) {
                return styles;
            },
        };
    });
    it("测试配置项[options]", () => {
        Carousel.defaultOptions.render([]);
        const carousel = new Carousel(options);
        // expect(carousel.options).toEqual(options);
    });
    // it("测试动画开始[autoPlay:true]", () => {
    //     const carousel = new Carousel(options);
    //     carousel.play();
    //     expect(carousel.options.autoPlay).toBe(true);
    // });
    // it("测试动画停止[autoPlay:false]", () => {
    //     const carousel = new Carousel(options);
    //     carousel.stop();
    //     expect(carousel.options.autoPlay).toBe(false);
    // });
    // it("测试动画播放延迟autoPlayDelay", () => {
    //     mock 一个Core实例
    //     const carousel: ICarousel = {
    //         options: {
    //             count: 3,
    //             width: 222,
    //             height: 323,
    //             autoPlay: true,
    //             autoPlayDelay: 0,
    //             render(styles: IItemStyle[]) {
    //                 return styles;
    //             },
    //         },
    //         rotation: Math.PI,
    //         spacing: Math.PI / 4,
    //         render: () => void 0,
    //     };
    //     const animation = new Animation(carousel);
    //     animation.rotation = 2 * Math.PI + carousel.rotation;
    //     animation.init();
    //     expect(carousel.options.autoPlay).toBe(true);
    //     expect(carousel.options.autoPlayDelay).toBe(0);
    // });
});
