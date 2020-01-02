var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import * as React from 'react';
import 'intersection-observer';
import styled, { css } from 'styled-components';
export var IntersectClassName;
(function (IntersectClassName) {
    IntersectClassName["BEFORE"] = "intersect";
    IntersectClassName["AFTER"] = "intersected";
})(IntersectClassName || (IntersectClassName = {}));
export var IntersectAnimation;
(function (IntersectAnimation) {
    IntersectAnimation["FadeIn"] = "fadeIn";
    IntersectAnimation["SlideInFromRight"] = "slideInFromRight";
    IntersectAnimation["SlideInFromLeft"] = "slideInFromLeft";
    IntersectAnimation["SlideInFromBottom"] = "slideInFromBottom";
})(IntersectAnimation || (IntersectAnimation = {}));
/**
 * Intersection ObserverのWrapper
 *
 * A. このdivに.intersectedが付くので子要素でスタイルを充てる
 * B. 子要素に関数を渡してisIntersectedを受け取る
 * C. アニメーションを指定する
 */
export default function Intersection(_a) {
    var children = _a.children, animationOption = _a.animationOption;
    var _b = React.useState(false), isIntersected = _b[0], setIntersected = _b[1];
    var ref = React.useRef(null);
    var callback = React.useCallback(function (changes) {
        changes.forEach(function (e) {
            if (e.isIntersecting) {
                setIntersected(true);
                observer.disconnect();
            }
        });
    }, [isIntersected, setIntersected]);
    var observer = new IntersectionObserver(callback, {
        root: null,
        rootMargin: '-200px',
        threshold: [0, 0.25, 0.5, 0.75, 1]
    });
    React.useEffect(function () {
        if (ref.current) {
            observer.observe(ref.current);
        }
        return function () { return observer.disconnect(); };
    }, [callback]);
    return (React.createElement(Wrapper, { opt: animationOption, isIntersected: isIntersected, ref: ref, className: isIntersected
            ? IntersectClassName.AFTER
            : IntersectClassName.BEFORE }, typeof children == 'function'
        ? children(isIntersected)
        : children));
}
var Wrapper = styled.div(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  transition: all 0.5s ease;\n\n  ", "\n"], ["\n  transition: all 0.5s ease;\n\n  ",
    "\n"])), function (_a) {
    var opt = _a.opt;
    if (!opt) {
        return null;
    }
    switch (opt.type) {
        case IntersectAnimation.FadeIn:
            return css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n          opacity: 0;\n          will-change: opacity;\n\n          ", "\n        "], ["\n          opacity: 0;\n          will-change: opacity;\n\n          ",
                "\n        "])), function (_a) {
                var isIntersected = _a.isIntersected;
                return isIntersected && css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n              opacity: 1;\n            "], ["\n              opacity: 1;\n            "])));
            });
        case IntersectAnimation.SlideInFromRight:
            return css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n          opacity: 0;\n          will-change: opacity, transform;\n          transform: translate3D(200px, 0, 0);\n          ", ";\n        "], ["\n          opacity: 0;\n          will-change: opacity, transform;\n          transform: translate3D(200px, 0, 0);\n          ",
                ";\n        "])), function (_a) {
                var isIntersected = _a.isIntersected;
                return isIntersected && css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n              opacity: 1;\n              transform: translate3D(0, 0, 0);\n            "], ["\n              opacity: 1;\n              transform: translate3D(0, 0, 0);\n            "])));
            });
        case IntersectAnimation.SlideInFromLeft:
            return css(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n          opacity: 0;\n          will-change: opacity, transform;\n          transform: translate3D(-200px, 0, 0);\n          ", ";\n        "], ["\n          opacity: 0;\n          will-change: opacity, transform;\n          transform: translate3D(-200px, 0, 0);\n          ",
                ";\n        "])), function (_a) {
                var isIntersected = _a.isIntersected;
                return isIntersected && css(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n              opacity: 1;\n              transform: translate3D(0, 0, 0);\n            "], ["\n              opacity: 1;\n              transform: translate3D(0, 0, 0);\n            "])));
            });
        case IntersectAnimation.SlideInFromBottom:
            return css(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n          opacity: 0;\n          will-change: opacity, transform;\n          transform: translate3D(0, 200px, 0);\n          ", ";\n        "], ["\n          opacity: 0;\n          will-change: opacity, transform;\n          transform: translate3D(0, 200px, 0);\n          ",
                ";\n        "])), function (_a) {
                var isIntersected = _a.isIntersected;
                return isIntersected && css(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n              opacity: 1;\n              transform: translate3D(0, 0, 0);\n            "], ["\n              opacity: 1;\n              transform: translate3D(0, 0, 0);\n            "])));
            });
        default:
            return null;
    }
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
