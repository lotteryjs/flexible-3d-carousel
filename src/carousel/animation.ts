/*
 * Copyright 2018 lotteryjs.com Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */
import * as raf from "raf";
import { ICarousel } from "./props";

export default class Animation {
    public carousel: ICarousel;
    public rotation: number;
    public destRotation: number;
    public raf: number;

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
        let startTime: number = new Date().getTime();
        let endTime: number;
        const { slideDelay, slideSpeed } = this.carousel.options;
        const drawFrame = () => {
            if (startTime) {
                endTime = new Date().getTime();
                if ((endTime - startTime) / 1000 >= slideDelay) {
                    this.destRotation += this.carousel.spacing;
                    startTime = null;
                }
            }
            if (this.rotation < this.destRotation) {
                const tmpRotation = this.rotation + slideSpeed;
                if (tmpRotation >= this.destRotation) {
                    this.rotation = this.destRotation;
                    startTime = new Date().getTime();
                } else {
                    this.rotation = tmpRotation;
                }
            }
            this.carousel.render(this.rotation);
            this.raf = raf(drawFrame);
        };
        drawFrame();
    }
}
