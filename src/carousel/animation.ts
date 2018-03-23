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
    public raf: number;
    public slideStartTimestamp: number;
    public slideEndTimestamp: number;
    public slideToggle: boolean = true;

    constructor(carousel: ICarousel) {
        const { rotation } = carousel;
        this.carousel = carousel;
        this.rotation = rotation;
        this.destRotation = this.rotation;
    }

    public init() {
        // 是否已经初始化
        if (this.raf) {
            return;
        }
        this.slideStartTimestamp = new Date().getTime();
        const drawFrame = () => {
            if (this.slideToggle) {
                this.slide();
            }
            /** 归位 */
            if (this.rotation >= 2 * Math.PI + this.carousel.rotation) {
                this.rotation = this.carousel.rotation;
                this.destRotation = this.rotation;
            }
            this.carousel.render(this.rotation);
            this.raf = raf(drawFrame);
        };
        drawFrame();
    }

    /**
     * 元素滑动到中间
     */
    public slideItemToFront() {
        this.carousel.options.autoSlide = false;
        this.destRotation = 2 * Math.PI + this.carousel.rotation;
    }

    /**
     * 滑动动画
     */
    private slide() {
        const { slideDelay, slideSpeed, autoSlide } = this.carousel.options;
        // 有开始时间戳，并且自动滑动为真
        if (this.slideStartTimestamp && autoSlide) {
            this.slideEndTimestamp = new Date().getTime();
            if ((this.slideEndTimestamp - this.slideStartTimestamp) / 1000 >= slideDelay) {
                this.destRotation += this.carousel.spacing;
                this.slideStartTimestamp = null;
            }
        }
        if (this.rotation < this.destRotation) {
            const tmpRotation = this.rotation + slideSpeed;
            if (tmpRotation >= this.destRotation) {
                this.rotation = this.destRotation;
                this.slideStartTimestamp = new Date().getTime();
            } else {
                this.rotation = tmpRotation;
            }
        }
    }
}
