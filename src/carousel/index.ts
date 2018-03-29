/*
 * Copyright 2018 lotteryjs.com Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */
import { getTransform, ie8 } from "./utils";
import { ICarousel, IItemsStyle, IOptions, IAnimation } from "./props";
import { Animation } from "./animation";

export class Carousel implements ICarousel {
    /**
     * 定义默认options
     */
    public static readonly defaultOptions: IOptions = {
        count: 8,
        width: 222,
        height: 323,
        originX: 0.5,
        originY: 0.5,
        radiusX: 2,
        radiusY: 0.25,
        fps: 60,
        percentW: 0.2,
        farScale: 0.5,
        autoSlide: true,
        slideDelay: 3,
        easing: 8,
        translate: true,
        render: () => void 0,
    };

    public options: IOptions;

    public itemPercentH: number;

    public rotation: number = Math.PI / 2;

    public spacing: number;

    public transform: string;

    public animation: IAnimation;

    constructor(options: IOptions) {
        this.options = {
            ...Carousel.defaultOptions,
            ...options,
        };
        this.initProps();
        this.render();
        this.animation = new Animation(this);
    }

    public initProps() {
        const { width, height, count, easing } = this.options;
        // 高宽比
        this.itemPercentH = height / width;
        this.spacing = 2 * Math.PI / count;
        this.transform = getTransform();
        // 因为放大了一百倍，所以缩小一百倍
        this.options.easing = easing / 100;
    }

    public render(rotation: number = this.rotation, haloOpacity?: number) {
        const styles: IItemsStyle[] = [];
        const { count, farScale, originX, originY, percentW, radiusX, radiusY, translate, render } = this.options;
        const spacingScale = (1 - farScale) / 2;
        // item-wrap
        styles.push({
            left: `${(originX - percentW / 2) * 100}%`,
            top: `${originY * 100}%`,
            width: `${percentW * 100}%`,
            height: `${this.itemPercentH * 100}%`,
        });
        // halo
        styles.push({
            opacity: haloOpacity,
            filter: `alpha(opacity=${haloOpacity * 100})`,
            display: "none",
        });
        // 椭圆运动
        for (let i = 0; i < count; i++) {
            // 限制数值在2PI之内
            rotation = rotation % (2 * Math.PI);
            const x = Math.cos(rotation) * radiusX;
            const y = Math.sin(rotation) * radiusY;
            const scale = y / radiusY * spacingScale + 1 - spacingScale;
            const width = scale;
            const left = originX + x - width / 2;
            const top = originY + y;
            const height = this.itemPercentH;
            const zIndex = Math.abs(Math.ceil(scale * 100));
            if (+rotation.toFixed(2) === 1.57) {
                styles[1].display = "block";
                styles[1].index = i;
            }
            if (this.transform && translate) {
                styles.push({
                    [this.transform]: `translate(${left * 100}%, ${top * 100}%) translateZ(0) scale(${scale})`,
                    zIndex,
                    width: "100%",
                    height: `${height * 100}%`,
                });
            } else {
                styles.push({
                    left: `${left * 100}%`,
                    top: `${top * 100}%`,
                    width: `${width * 100}%`,
                    height: `${height * 100}%`,
                    zIndex,
                });
            }
            rotation += this.spacing;
        }
        render(styles);
    }
}

export const detectIE8 = ie8;
