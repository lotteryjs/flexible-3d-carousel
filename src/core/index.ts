/*
 * Copyright 2018 lotteryjs.com Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

import { Animation } from "./animation";
import { IAnimation, ICore, IItemStyle, IOptions } from "./props";

export class Core implements ICore {
    /**
     * 默认属性
     */
    public static readonly defaultOptions: IOptions = {
        fps: 60,
        count: 8,
        width: 222,
        height: 323,
        percentageW: 0.25,
        farScale: 0.5,
        speed: 0.03,
        autoPlay: true,
        autoPlayDelay: 2,
        render: () => void 0,
    };

    /**
     * 用户传过来的选项
     */
    public options: IOptions;

    /**
     * item宽的percentage
     */
    public percentageW: number = 0;

    /**
     * item->padding-top高的percentage
     */
    public percentageTopH: number = 0;

    /**
     * 旋转木马X方向的中心
     */
    public originX: number;

    /**
     * 旋转木马Y方向的中心
     */
    public originY: number;

    /**
     * 旋转木马X方向的半径
     */
    public radiusX: number;

    /**
     * 旋转木马Y方向的半径
     */
    public radiusY: number;

    /**
     * 起始角度
     */
    public rotation: number;

    /**
     * item间隔弧度
     */
    public spacing: number;

    /**
     * 动画
     */
    public animation: IAnimation;

    constructor(options: IOptions) {
        this.options = {
            ...Core.defaultOptions,
            ...options,
        };
        this.initalProps();
        this.render();
        this.initalOperation();
    }

    /**
     * 播放动画
     */
    public play() {
        this.options.autoPlay = true;
    }

    /**
     * 停止动画
     */
    public stop() {
        this.options.autoPlay = false;
    }

    /**
     * 将css数据吐出去
     */
    public render(rotation?: number) {
        const styles: IItemStyle[] = this.calcStyles(rotation);
        for (let i = 0, count = styles.length; i < count; i++) {
            const style: IItemStyle = styles[i];
            styles[i] = {
                left: typeof style.left === "number" && `${style.left * 100}%`,
                top: typeof style.top === "number" && `${style.top * 100}%`,
                width: typeof style.width === "number" && `${style.width * 100}%`,
                height: typeof style.height === "number" && `${style.height * 100}%`,
                zIndex: styles[i].zIndex,
            };
        }
        this.options.render(styles);
    }

    /**
     * 初始化属性
     */
    private initalProps() {
        const { width, height, count, percentageW } = this.options;
        this.percentageW = percentageW;
        this.percentageTopH = height / width; // eg.padding-top: 144%
        this.originX = 0.5;
        this.originY = 0.5;
        this.radiusX = 0.5;
        this.radiusY = 0.5;
        this.rotation = Math.PI / 2;
        this.spacing = 2 * Math.PI / count;
        this.animation = new Animation(this);
    }

    /**
     * 初始化相关动作
     */
    private initalOperation() {
        // 初始化动画
        this.animation.init();
    }

    /**
     * 根据弧度计算item的style
     * @param rotation 弧度
     */
    private calcStyles(rotation?: number) {
        let rot = rotation || this.rotation;
        const styles: IItemStyle[] = [];
        const { count, farScale } = this.options;
        const spacingScale = (1 - farScale) / 2;
        for (let i = 0; i < count; i++) {
            const x = Math.cos(rot) * this.radiusX;
            const y = Math.sin(rot) * this.radiusY;
            const scale = y / this.radiusY * spacingScale + 1 - spacingScale;
            const width = this.percentageW * scale;
            styles.push({
                left: this.originX + x - width / 2,
                top: this.originY + y,
                width,
                height: this.percentageTopH,
                zIndex: Math.abs(Math.ceil(width * 100)),
            });
            rot += this.spacing;
        }
        return styles;
    }
}
