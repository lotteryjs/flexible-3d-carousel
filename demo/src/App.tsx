/*
 * Copyright 2018 lotteryjs.com Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

import * as React from "react";
import { hot } from "react-hot-loader";
import { Flexible3DCarousel } from "../../src/ReactUI/Flexible3DCarousel";

declare var module: any;
const items = [
    {
        img: "/images/1.jpg",
        title: "1",
    },
    {
        img: "/images/2.jpg",
        title: "2",
    },
    {
        img: "/images/3.jpg",
        title: "3",
    },
    {
        img: "/images/4.jpg",
        title: "4",
    },
    {
        img: "/images/5.jpg",
        title: "5",
    },
    {
        img: "/images/2.jpg",
        title: "2",
    },
];

const haloImg = "/images/halo.png";

const config1 = {
    width: 384,
    height: 466,
    autoSlide: true,
    slideDelay: 4,
    radiusX: 1.3,
    radiusY: 0.28,
    easing: 15,
    percentW: 0.25,
    farScale: 0.4,
};

const config2 = {
    width: 384,
    height: 466,
    autoSlide: true,
    slideDelay: 4,
    radiusX: 0.7,
    radiusY: 0.0000001,
    easing: 20,
    percentW: 0.3,
    farScale: 0.3,
};

export class Root extends React.PureComponent<any, any> {
    public render() {
        return (
            <div>
                <h2 style={{ textAlign: "center", fontSize: "1rem" }}>
                    typescript+react编写<br />
                    自适应多端(mobile，pad，pc)<br />
                    兼容性极好(ie7+，android2.3+，ios 6+)<br />
                    高性能的(raf，transform)<br />
                    <span style={{ color: "#047ec5", fontSize: "1.5rem" }}>3D-Carousel</span>
                </h2>
                <Flexible3DCarousel items={items} haloImg={haloImg} config={config1} />
                <Flexible3DCarousel items={items} haloImg={haloImg} config={config2} />
            </div>
        );
    }
}

export const App = module.hot ? hot(module)(Root) : Root;
