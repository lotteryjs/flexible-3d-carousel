/*
 * Copyright 2018 lotteryjs.com Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

export interface IItemStyle {
    /**
     * item距左边
     */
    left?: number | string;

    /**
     * item距顶部
     */
    top?: number | string;

    /**
     * item宽度
     */
    width?: number | string;

    /**
     * item高度
     */
    height?: number | string;

    /**
     * 缩放
     */
    scale?: number;

    /**
     * item层级
     */
    zIndex?: number;

    [key: string]: number | string;
}

export interface IOptions {
    /**
     * 是否自动播放
     * @default true
     */
    autoPlay?: boolean;

    /**
     * 是否自动播放
     * @default 2(两秒)
     */
    autoPlayDelay?: number;

    /**
     * 帧率，当不支持requestAnimationFrame时，这个值有用
     * @default 60
     */
    fps?: number;

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
     * itemWrap相对于画布宽的百分率
     * @default 0.25
     */
    itemWrapW?: number;

    /**
     * item相对于画布宽的百分率
     * @default 0.25
     */
    percentageW?: number;

    /**
     * Z轴最远处元素的缩放
     * @default 0.5
     */
    farScale?: number;

    /**
     * 速度
     * @default 0.03
     */
    speed?: 0.03;

    /**
     * 为UI组件提供的render方法
     */
    render(styles: IItemStyle[]): void;
}

export interface IAnimation {
    /**
     * 当前Core实例
     */
    core: ICore;

    /**
     * 当前roation值
     */
    rotation: number;

    init(): void;
}

export interface ICore {
    options: IOptions;
    rotation: number;
    spacing: number;
    render(rotation?: number): void;
}