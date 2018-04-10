/*
 * Copyright 2018 lotteryjs.com Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

import * as React from "react";
import * as classnames from "classnames";
import { Carousel, detectIE8 } from "../../src/carousel";
import * as styles from "./Flexible3DCarousel.scss";
import { ICarousel } from "../../src/carousel/props";

export interface IFlexible3DCarouselProps {
    className?: string;
    items: any[];
    haloImg: string;
    config: any;
}

export class Flexible3DCarousel extends React.PureComponent<IFlexible3DCarouselProps, any> {
    public carousel: ICarousel;

    constructor(props: any) {
        super(props);
        this.state = {
            itemWrapStyle: {},
            haloStyle: {},
            itemsStyle: [],
            haloImg: props.haloImg,
            items: props.items,
        };
    }

    public componentDidMount() {
        const {
            width,
            height,
            autoSlide,
            slideDelay,
            radiusX,
            radiusY,
            easing,
            percentW,
            farScale,
        } = this.props.config;
        this.carousel = new Carousel({
            count: this.state.items.length,
            width,
            height,
            autoSlide,
            slideDelay,
            radiusX,
            radiusY,
            easing,
            percentW,
            farScale,
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

    public renderHalo() {
        const { haloStyle } = this.state;
        const ie678Filter = `progid:DXImageTransform.Microsoft.AlphaImageLoader(src=${
            this.state.haloImg
        }, enabled='true',sizingMethod='scale')`;
        return detectIE8() ? (
            <div className={styles["item-halo"]} style={haloStyle}>
                <div className={styles["ie-678"]} style={{ filter: ie678Filter }} />
            </div>
        ) : (
            <div className={styles["item-halo"]} style={haloStyle}>
                <img src={this.state.haloImg} className={styles.glass} />
            </div>
        );
    }

    public renderItem(style: any, index: number) {
        const { top, left, width, height, zIndex } = style;
        const { img, title } = this.state.items[index];
        delete style.height;
        const cssStyle = top ? { top, left, width, zIndex } : style;
        const { haloStyle } = this.state;
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
                        {index === haloStyle.index && this.renderHalo()}
                    </div>
                </div>
            </div>
        );
    }

    public renderItemWrap() {
        const { itemWrapStyle, itemsStyle } = this.state;
        const { top, left, width, height } = itemWrapStyle;
        return (
            <div className={styles["item-wrap"]} style={{ top, left, width }}>
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
        const { className } = this.props;
        const classNameSec = classnames(styles.canvas, className, "f-usn");
        return (
            <div className={classNameSec}>
                <h3 className={styles.header}>
                    <a href="javascript:;" onClick={this.onLottery(7)}>
                        I AM A KING
                    </a>
                    <a href="javascript:;" onClick={this.onLottery(6)}>
                        I AM A QUEEN
                    </a>
                </h3>
                <div className={styles["canvas-height"]}>{itemsStyle.length && this.renderItemWrap()}</div>
            </div>
        );
    }

    private onLottery = (index: number) => () => {
        this.carousel.animation.lottery(index);
    };

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
