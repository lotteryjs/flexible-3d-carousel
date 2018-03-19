/*
 * Copyright 2018 lotteryjs.com Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

import * as React from "react";
import { hot } from "react-hot-loader";

import { ReactUI } from "../../src/react-ui/ReactUI";

export class Root extends React.PureComponent<any, any> {
    public render() {
        return (
            <div>
                <h1 style={{ textAlign: "center" }}>flexible-3d-carousel Demo</h1>
                <ReactUI />
            </div>
        );
    }
}

export const App = hot(module)(Root);
