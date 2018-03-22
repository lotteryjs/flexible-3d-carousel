/*
 * Copyright 2018 lotteryjs.com Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */
// import * as raf from "raf";
import { ICore } from "./props";

export default class Animation {
    public core: ICore;
    public rotation: number;
    public destRotation: number;

    constructor(core: ICore) {
        this.core = core;
        this.rotation = this.core.rotation;
        this.destRotation = this.rotation + this.core.spacing;
    }

    public init() {
        // let startTime: number;
        // let endTime: number;
        const drawFrame = () => {
            /*
            if (startTime) {
                endTime = new Date().getTime();
                if ((endTime - startTime) / 1000 >= this.core.options.autoPlayDelay) {
                    this.destRotation += this.core.spacing;
                    startTime = null;
                }
            }
            if (this.rotation < this.destRotation) {
                const tmpRotation = this.rotation + this.core.options.speed;
                if (tmpRotation >= this.destRotation) {
                    this.rotation = this.destRotation;
                    startTime = new Date().getTime();
                } else {
                    this.rotation = tmpRotation;
                }
            }
            this.core.render(this.rotation);
            raf(drawFrame);
            */
        };
        drawFrame();
    }
}
