/*
 * Copyright 2018 lotteryjs.com Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

import * as React from "react";
import Core from "../core";
import * as styles from "./ReactUI.scss";

export default class ReactUI extends React.PureComponent<any, any> {
    private core: any;

    constructor(props: any) {
        super(props);
        this.state = {
            itemWrapStyle: {},
            itemsStyle: [],
            awards: [
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
            ],
        };
    }

    public componentDidMount() {
        this.core = new Core({
            count: this.state.awards.length,
            width: 222,
            height: 323,
            render: (itemsStyle: any) => {
                const itemWrapStyle = itemsStyle.shift();
                this.setState({
                    itemsStyle,
                    itemWrapStyle,
                });
            },
        });
    }

    public renderItem(style: any, index: number) {
        const { top, left, width, height, zIndex } = style;
        const { img, title } = this.state.awards[index];
        return (
            <div
                key={index}
                className={styles.item}
                style={{ top, left, width, zIndex }}
                onMouseMove={this.onMouseMove}
                onMouseLeave={this.onMouseLeave}
            >
                <div style={{ paddingTop: height }}>
                    <div className={styles["item-content"]}>
                        <img src={img} alt={title} />
                    </div>
                </div>
            </div>
        );
    }

    public renderItemWrap() {
        const { itemWrapStyle, itemsStyle } = this.state;
        const { top, left, width, height, zIndex } = itemWrapStyle;
        return (
            <div className={styles["item-wrap"]} style={{ top, left, width, zIndex }}>
                <div style={{ paddingTop: height }}>
                    <div className={styles["item-wrap-content"]}>
                        {itemsStyle.length &&
                            itemsStyle.map((style: any, index: number) => this.renderItem(style, index))}
                    </div>
                </div>
            </div>
        );
    }

    public render() {
        const { itemsStyle } = this.state;
        return (
            <div className={styles.canvas}>
                <div className={styles["canvas-height"]}>{itemsStyle.length && this.renderItemWrap()}</div>
            </div>
        );
    }

    private onMouseMove = () => {
        this.core.stop();
    };

    private onMouseLeave = () => {
        this.core.play();
    };
}
