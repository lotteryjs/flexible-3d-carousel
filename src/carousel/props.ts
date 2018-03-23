/*
 * Copyright 2018 lotteryjs.com Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

export interface IOptions {
    /**
     * item个数
     */
    count: number;

    /**
     * item宽度
     */
    width: number;

    /**
     * item高度
     */
    height: number;

    /**
     * carousel X方向的中心，相对于父元素宽度的比
     * @default 0.5
     */
    originX?: number;

    /**
     * carousel Y方向的中心，相对于父元素高度的比
     * @default 0.5
     */
    originY?: number;

    /**
     * carousel X方向的半径，相对于item本身宽度的比
     * @default 2
     */
    radiusX?: number;

    /**
     * carousel Y方向的半径，相对于item本身高度的比
     * @default 0.25
     */
    radiusY?: number;

    /**
     * 帧率，当不支持requestAnimationFrame时，这个值有用
     * @default 60
     */
    fps?: number;

    /**
     * item的宽度占画布（父元素）宽度的百分点
     * @default 0.2
     */
    percentW?: number;

    /**
     * Z轴最远处元素的缩放
     * @default 0.5
     */
    farScale?: number;

    /**
     * item是否自动滑动
     * @default true
     */
    autoSlide?: boolean;

    /**
     * item每一次滑动的延迟
     * @default 2(两秒)
     */
    slideDelay?: number;

    /**
     * item滑动的速度
     * @default 0.03
     */
    slideSpeed?: number;

    /**
     * 是否使用translate
     * @default true
     */
    translate?: boolean;

    /**
     * 为UI组件提供的render方法
     */
    render(styles: IItemsStyle[]): void;
}

export interface IItemsStyle {
    [key: string]: number | string;
}

export interface ICarousel {
    /**
     * 合并后的options
     */
    options: IOptions;

    /**
     * item高度与宽度的比(eg.padding-top: 144%)
     */
    itemPercentH: number;

    /**
     * 起始roation值
     */
    rotation: number;

    /**
     * 根据options.count计算的item间隔弧度
     */
    spacing: number;

    /**
     * 浏览器是否支持css transform
     */
    transform: string;

    /**
     * 动画实例
     */
    animation: IAnimation;

    /**
     * 初始化属性
     */
    initProps(): void;

    /**
     * 根据弧度计算item的style
     * @param {number} rotation 弧度
     * @default Math.PI / 2 默认正中间，90度
     */
    render(rotation: number): void;
}

export interface IAnimation {
    /**
     * 当前Core实例
     */
    carousel: ICarousel;

    /**
     * 当前roation值
     */
    rotation: number;

    /**
     * 目标roation值
     */
    destRotation: number;

    /**
     * 当前raf
     */
    raf: number;

    /**
     * 滑动动画开始时间戳
     */
    slideStartTimestamp: number;

    /**
     * 滑动动画结束时间戳
     */
    slideEndTimestamp: number;

    /**
     * 开启/停止slide
     */
    slideToggle: boolean;

    /**
     * 初始化FPS
     */
    init(): void;
}
