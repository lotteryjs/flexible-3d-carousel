/*
 * Copyright 2018 lotteryjs.com Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

import * as React from "react";
import { Carousel, detectIE8 } from "../../src/carousel";
import * as styles from "./Flexible3DCarousel.scss";
import { ICarousel } from "../../src/carousel/props";

export class Flexible3DCarousel extends React.PureComponent<any, any> {
    public carousel: ICarousel;

    constructor(props: any) {
        super(props);
        this.state = {
            itemWrapStyle: {},
            haloStyle: {},
            itemsStyle: [],
            haloImg: "/images/halo.png",
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
        this.carousel = new Carousel({
            count: this.state.awards.length,
            width: 222,
            height: 323,
            autoSlide: true,
            slideDelay: 3,
            render: (itemsStyle: any) => {
                const itemWrapStyle = itemsStyle.shift();
                const haloStyle = itemsStyle.shift();
                this.setState({
                    itemsStyle,
                    itemWrapStyle,
                    haloStyle,
                });
            },
        });
    }

    public renderItem(style: any, index: number) {
        const { top, left, width, height, zIndex } = style;
        const { img, title } = this.state.awards[index];
        delete style.height;
        const cssStyle = top ? { top, left, width, zIndex } : style;
        return (
            <div key={index} className={styles.item} style={cssStyle}>
                <div style={{ paddingTop: height }}>
                    <div
                        className={styles["item-content"]}
                        onMouseEnter={this.onMouseEnter}
                        onMouseLeave={this.onMouseLeave}
                        onClick={this.onClick(index)}
                    >
                        <img src={img} alt={title} />
                    </div>
                </div>
            </div>
        );
    }

    public renderItemWrap() {
        const { itemWrapStyle, itemsStyle, haloStyle } = this.state;
        const { top, left, width, height } = itemWrapStyle;
        const ie678Filter = `progid:DXImageTransform.Microsoft.AlphaImageLoader(src=${
            this.state.haloImg
        }, sizingMethod='scale')`;
        return (
            <div className={styles["item-wrap"]} style={{ top, left, width }}>
                <div style={{ paddingTop: height }}>
                    <div className={styles["item-wrap-content"]}>
                        {itemsStyle.length &&
                            itemsStyle.map((style: any, index: number) => this.renderItem(style, index))}
                        {detectIE8() ? (
                            <div className={styles["item-halo"]} style={haloStyle}>
                                <span style={{ filter: ie678Filter }} />
                            </div>
                        ) : (
                            <div className={styles["item-halo"]} style={haloStyle}>
                                <img src={this.state.haloImg} />
                            </div>
                        )}
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

    private onMouseEnter = () => {
        this.carousel.animation.mouseEnter = true;
    };

    private onMouseLeave = () => {
        this.carousel.animation.mouseEnter = false;
    };

    private onClick = (index: number) => () => {
        this.carousel.animation.bringToFront(index);
    };
}
