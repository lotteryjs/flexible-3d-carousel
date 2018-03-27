/*
 * Copyright 2018 lotteryjs.com Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */
import * as raf from "raf";
import { ICarousel, IAnimation } from "./props";

export class Animation implements IAnimation {
    public carousel: ICarousel;
    public rotation: number;
    public destRotation: number;
    public disRotation: number;
    public direction: boolean;
    public toFront: boolean;
    public raf: number;
    public speed: number;
    public ax: number;
    public slideStartTimestamp: number;
    public slideEndTimestamp: number;
    public mouseEnter: boolean = false;

    constructor(carousel: ICarousel) {
        const { rotation, options } = carousel;
        this.carousel = carousel;
        this.rotation = rotation;
        this.ax = options.speedAx;
        this.disRotation = 0;
        this.destRotation = 0;
        this.slideStartTimestamp = new Date().getTime();
        this.init();
    }

    public bringToFront(index: number) {
        if (this.toFront) {
            return;
        }
        const { rotation: center, itemsData, options } = this.carousel;
        // 表明现在要进行bringToFront操作了
        this.toFront = true;
        // 赋值初始速度
        this.speed = options.slideSpeed;
        const data = itemsData[index];
        // 顺时针方向处理
        if (data.rotation <= center) {
            // 确定方向
            this.direction = true;
            // 要运动的距离
            this.disRotation = center - data.rotation;
            // 目标边界值的处理
            this.destRotation = (this.rotation + this.disRotation) % (2 * Math.PI);
            return;
        }
        // 顺时针方向
        if (data.rotation >= 3 * Math.PI / 2) {
            this.direction = true;
            this.disRotation = 2 * Math.PI + center - data.rotation;
            // 目标边界值的处理
            this.destRotation = (this.rotation + this.disRotation) % (2 * Math.PI);
            return;
        }
        // 逆时针方向处理
        this.direction = false;
        this.disRotation = data.rotation - center;
        this.destRotation = this.rotation - this.disRotation;
        // 边界值的处理
        if (this.destRotation < 0) {
            this.destRotation = 2 * Math.PI + this.destRotation;
        }
    }

    private init() {
        const drawFrame = () => {
            if (this.toFront) {
                this.bringToFrontAnimation();
            }
            const { autoSlide } = this.carousel.options;
            // 鼠标没有移入，并且设置了自动播放
            // 没有执行让任意一个元素移到正前方
            // 执行slide动画
            if (!this.mouseEnter && autoSlide && !this.toFront) {
                this.autoSlideAnimation();
            }
            // 为了让鼠标移开时也能自动播放
            if (this.mouseEnter) {
                this.slideStartTimestamp = new Date().getTime();
            }
            // 统一边界值处理
            this.rotation %= 2 * Math.PI;
            // 渲染到DOM
            this.carousel.render(this.rotation);
            this.raf = raf(drawFrame);
        };
        drawFrame();
    }

    /**
     * 元素自动滑动动画
     */
    private autoSlideAnimation() {
        const { slideDelay, slideSpeed } = this.carousel.options;
        // 有开始时间戳，并且自动滑动为真
        if (this.slideStartTimestamp) {
            this.slideEndTimestamp = new Date().getTime();
            if ((this.slideEndTimestamp - this.slideStartTimestamp) / 1000 >= slideDelay) {
                this.destRotation = (this.rotation + this.carousel.spacing) % (2 * Math.PI);
                this.disRotation = this.carousel.spacing;
                this.slideStartTimestamp = null;
            }
        }
        if (this.disRotation === 0) {
            this.toFront = false;
            return;
        }
        this.disRotation -= slideSpeed;
        if (this.disRotation > 0) {
            this.rotation += slideSpeed;
        }
        if (this.disRotation < 0) {
            this.rotation = this.destRotation;
            this.disRotation = 0;
            this.slideStartTimestamp = new Date().getTime();
        }
    }

    /**
     * 元素运动到前方动画
     */
    private bringToFrontAnimation() {
        if (this.disRotation === 0) {
            this.toFront = false;
            return;
        }
        // 运动方向处理
        if (this.direction) {
            this.disRotation -= this.speed;
            if (this.disRotation > 0) {
                this.rotation += this.speed;
            }
        } else {
            this.disRotation -= this.speed;
            if (this.disRotation > 0) {
                this.rotation -= this.speed;
                // 边界值处理
                if (this.rotation < 0) {
                    this.rotation = 2 * Math.PI + this.rotation;
                }
            }
        }
        if (this.disRotation < 0) {
            this.rotation = this.destRotation;
            this.disRotation = 0;
        }
        this.speed += this.ax;
    }
}
