/*
 * Copyright 2018 lotteryjs.com Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */
import * as raf from "raf";
import { ICore } from "./props";

export default class Animation {
    public core: ICore;
    public rotation: number;
    public destRotation: number;

    constructor(core: ICore) {
        this.core = core;
        this.rotation = this.core.rotation;
        this.destRotation = this.rotation;
    }

    public init() {
        let startTime: number = new Date().getTime();
        let endTime: number;
        const drawFrame = () => {
            endTime = new Date().getTime();
            if ((endTime - startTime) / 1000 >= this.core.options.autoPlayDelay && this.core.options.autoPlay) {
                this.destRotation += this.core.spacing;
            }
            if (this.rotation <= this.destRotation) {
                this.rotation += this.core.options.speed;
                startTime = new Date().getTime();
            }
            this.core.render(this.rotation);
            if (this.rotation >= 2 * Math.PI + this.core.rotation) {
                this.rotation = this.core.rotation;
                this.destRotation = this.rotation;
            }
            raf(drawFrame);
        };
        drawFrame();
    }
}
