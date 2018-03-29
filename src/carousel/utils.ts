/*
 * Copyright 2018 lotteryjs.com Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

/**
 * 检测浏览器是否支持transform
 */
export function getTransform() {
    const prefixes: any[] = "transform WebkitTransform MozTransform OTransform msTransform".split(" ");
    const div = document.createElement("div");
    for (let i = 0, len = prefixes.length; i < len; i++) {
        if (div && div.style[prefixes[i]] !== undefined) {
            return prefixes[i];
        }
    }
    return "";
}

/**
 * 判断是否是ie8以下版本
 */
export function ie8() {
    const ua = navigator.userAgent.toLowerCase();
    const isIE = ua.indexOf("msie") > -1;
    if (isIE) {
        const safariVersion = ua.match(/msie ([\d.]+)/)[1];
        return +safariVersion <= 8;
    }
    return false;
}
