/*
 * Copyright 2018 lotteryjs.com Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

import * as React from "react";
import { hot } from "react-hot-loader";
import ReactUI from "../../src/react-ui/ReactUI";

declare var module: any;
export class Root extends React.PureComponent<any, any> {
    public render() {
        return (
            <div>
                <h1 style={{ textAlign: "center" }}>flexible</h1>
                <ReactUI />
            </div>
        );
    }
}
let App = Root;
if (module.hot) {
    App = hot(module)(Root);
}

export default App;
