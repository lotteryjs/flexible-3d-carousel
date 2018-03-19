/*
 * Copyright 2018 lotteryjs.com Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */
import raf from "raf";
import { ICore } from "./props";

export class Animation {
    private carousel: ICore;
    private rotation: number;
    private destRotation: number;

    constructor(carousel: ICore) {
        this.carousel = carousel;
    }

    public init() {
        this.rotation = this.carousel.rotation;
        this.destRotation = this.rotation;
        let startTime: number;
        let endTime: number;
        const drawFrame = () => {
            endTime = new Date().getTime();
            if ((endTime - startTime) / 1000 >= 1 && this.carousel.options.autoPlay) {
                this.destRotation += this.carousel.spacing;
            }
            if (this.rotation <= this.destRotation) {
                this.rotation += this.carousel.options.speed;
                startTime = new Date().getTime();
            }
            this.carousel.render(this.rotation);
            if (this.rotation >= 2 * Math.PI + this.carousel.rotation) {
                this.rotation = this.carousel.rotation;
                this.destRotation = this.rotation;
                console.log(this.rotation, this.destRotation, this.carousel.rotation);
            }
            raf(drawFrame);
        };
        drawFrame();
    }
}
