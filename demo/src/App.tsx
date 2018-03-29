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
        img: "/images/2_of_hearts.png",
        title: "2_of_hearts",
    },
    {
        img: "/images/ace_of_hearts.png",
        title: "ace_of_hearts",
    },
    {
        img: "/images/king_of_hearts.png",
        title: "king_of_hearts",
    },
    {
        img: "/images/queen_of_hearts.png",
        title: "queen_of_hearts",
    },
    {
        img: "/images/jack_of_hearts.png",
        title: "jack_of_hearts",
    },
    {
        img: "/images/10_of_hearts.png",
        title: "10_of_hearts",
    },
    {
        img: "/images/9_of_hearts.png",
        title: "9_of_hearts",
    },
    {
        img: "/images/8_of_hearts.png",
        title: "8_of_hearts",
    },
    {
        img: "/images/queen_of_hearts.png",
        title: "queen_of_hearts",
    },
];

const haloImg = "/images/halo.png";

export class Root extends React.PureComponent<any, any> {
    public render() {
        return (
            <div>
                <h1 style={{ textAlign: "center" }}>flexible</h1>
                {/* <Flexible3DCarousel items={items} haloImg={haloImg} /> */}
            </div>
        );
    }
}

export const App = module.hot ? hot(module)(Root) : Root;
