/*
 * Copyright 2018 lotteryjs.com Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

import * as React from "react";
import { hot } from "react-hot-loader";
import { Flexible3DCarousel } from "../../src/ReactUI/Flexible3DCarousel";

declare var module: any;
export class Root extends React.PureComponent<any, any> {
    public render() {
        return (
            <div>
                <h1 style={{ textAlign: "center" }}>flexible</h1>
                <Flexible3DCarousel />
            </div>
        );
    }
}

export const App = module.hot ? hot(module)(Root) : Root;
