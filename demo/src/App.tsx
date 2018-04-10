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
        img: "/images/6_of_hearts.png",
        title: "6",
    },
    {
        img: "/images/7_of_hearts.png",
        title: "7",
    },
    {
        img: "/images/8_of_hearts.png",
        title: "8",
    },
    {
        img: "/images/9_of_hearts.png",
        title: "9",
    },
    {
        img: "/images/10_of_hearts.png",
        title: "10",
    },
    {
        img: "/images/jack_of_hearts.png",
        title: "jack",
    },
    {
        img: "/images/queen_of_hearts.png",
        title: "queen",
    },
    {
        img: "/images/king_of_hearts.png",
        title: "king",
    },
    {
        img: "/images/ace_of_hearts.png",
        title: "ace",
    },
    {
        img: "/images/black_joker.png",
        title: "joker",
    },
];

const haloImg = "/images/halo.png";

const config = {
    width: 222,
    height: 323,
    autoSlide: true,
    slideDelay: 4,
    radiusX: 1.6,
    radiusY: 0.22,
    easing: 12,
    percentW: 0.22,
    farScale: 0.55,
};

export class Root extends React.PureComponent<any, any> {
    public render() {
        return (
            <div>
                <h1 style={{ textAlign: "center" }}>Flexible-3D-Carousel</h1>
                <Flexible3DCarousel items={items} haloImg={haloImg} config={config} />
            </div>
        );
    }
}

export const App = module.hot ? hot(module)(Root) : Root;
