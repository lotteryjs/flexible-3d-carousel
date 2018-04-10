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
    public toFront: boolean = false;
    public toLottery: boolean = false;
    public speed: number;
    public easing: number;
    public easingMin: number = 0.0001;
    public slideStartTimestamp: number;
    public slideEndTimestamp: number;
    public mouseEnter: boolean = false;
    public halo: number = 0;
    public haloOpacity: number = 0;

    constructor(carousel: ICarousel) {
        const { rotation, options } = carousel;
        this.carousel = carousel;
        this.rotation = rotation;
        this.easing = options.easing;
        this.disRotation = 0;
        this.destRotation = 0;
        this.slideStartTimestamp = new Date().getTime();
        this.init();
    }

    public lottery(index: number) {
        if (this.toLottery || this.toFront) {
            return;
        }
        const { rotation: center, spacing } = this.carousel;
        this.toLottery = true;
        const itemRotation = (this.rotation + index * spacing) % (2 * Math.PI);
        const around = 2 * Math.PI * 4;
        if (itemRotation <= center) {
            this.disRotation = center - itemRotation + around;
        }

        if (itemRotation > center) {
            this.disRotation = 2 * Math.PI + center - itemRotation + around;
        }
        this.destRotation = (this.rotation + this.disRotation) % (2 * Math.PI);
    }

    public bringToFront(index: number) {
        if (this.toFront || this.toLottery) {
            return;
        }
        const { rotation: center, spacing } = this.carousel;
        // 表明现在要进行bringToFront操作了
        this.toFront = true;
        // 得到当前item的rotation，会存在
        const itemRotation = (this.rotation + index * spacing) % (2 * Math.PI);
        // 接下来就是计算它到center的最短距离了
        // 顺时针方向处理
        if (itemRotation <= center) {
            // 确定方向
            this.direction = true;
            // 要运动的距离
            this.disRotation = center - itemRotation;
            // 目标边界值的处理
            this.destRotation = (this.rotation + this.disRotation) % (2 * Math.PI);
            return;
        }
        // 顺时针方向
        // 因为javascript精度问题，这里稍稍修正下
        const wc = 1 * Math.PI / 180;
        if (itemRotation >= 3 * Math.PI / 2 - wc) {
            this.direction = true;
            this.disRotation = 2 * Math.PI + center - itemRotation;
            // 目标边界值的处理
            this.destRotation = (this.rotation + this.disRotation) % (2 * Math.PI);
            return;
        }
        // 逆时针方向处理
        this.direction = false;
        this.disRotation = itemRotation - center;
        this.destRotation = this.rotation - this.disRotation;
        // 边界值的处理
        if (this.destRotation < 0) {
            this.destRotation = 2 * Math.PI + this.destRotation;
        }
    }

    private init() {
        const drawFrame = () => {
            if (this.toFront && !this.toLottery) {
                this.bringToFrontAnimation();
            }
            const { autoSlide } = this.carousel.options;
            // 鼠标没有移入，并且设置了自动播放
            // 没有正在执行让任意一个元素移到正前方
            // 没有正在执行抽奖动画
            // 执行slide动画
            if (!this.mouseEnter && autoSlide && !this.toFront && !this.toLottery) {
                this.autoSlideAnimation();
            }

            if (this.toLottery) {
                this.lotteryAnimation();
            }

            // 呼吸光晕动画
            this.haloAnimation();
            // 统一边界值处理
            this.rotation %= 2 * Math.PI;
            // 渲染到DOM
            this.carousel.render(this.rotation, this.haloOpacity);
            raf(drawFrame);
        };
        drawFrame();
    }

    /**
     * 元素自动滑动动画
     */
    private autoSlideAnimation() {
        const { slideDelay } = this.carousel.options;
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
            return;
        }
        this.speed = this.disRotation * this.easing;
        this.disRotation -= this.speed;
        if (this.disRotation > 0) {
            this.halo = 0;
            this.rotation += this.speed;
        }
        if (this.disRotation < this.easingMin) {
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
            this.slideStartTimestamp = new Date().getTime();
            return;
        }
        // 运动方向处理
        if (this.direction) {
            this.speed = this.disRotation * this.easing;
            this.disRotation -= this.speed;
            if (this.disRotation > 0) {
                this.halo = 0;
                this.rotation += this.speed;
            }
        } else {
            this.speed = this.disRotation * this.easing;
            this.disRotation -= this.speed;
            if (this.disRotation > 0) {
                this.halo = 0;
                this.rotation -= this.speed;
                // 边界值处理
                if (this.rotation < 0) {
                    this.rotation = 2 * Math.PI + this.rotation;
                }
            }
        }
        if (this.disRotation < this.easingMin) {
            this.rotation = this.destRotation;
            this.disRotation = 0;
        }
    }

    /**
     * 光晕动画
     */
    private haloAnimation() {
        this.halo = (this.halo + 1) % 180;
        const opacity = Math.sin(this.halo * Math.PI / 180);
        this.haloOpacity = +opacity.toFixed(2);
    }

    /**
     * 抽奖动画
     */
    private lotteryAnimation() {
        if (this.disRotation === 0) {
            this.toLottery = false;
            this.slideStartTimestamp = new Date().getTime();
            return;
        }
        this.speed = this.disRotation * this.easing;
        if (this.speed > 0.2) {
            this.speed = 0.2;
        }
        if (this.speed < 0.01) {
            this.speed = 0.01;
        }
        this.disRotation -= this.speed;
        if (this.disRotation > 0) {
            this.halo = 0;
            this.rotation += this.speed;
        }
        if (this.disRotation < this.easingMin) {
            this.rotation = this.destRotation;
            this.disRotation = 0;
            this.slideStartTimestamp = new Date().getTime();
        }
    }
}
