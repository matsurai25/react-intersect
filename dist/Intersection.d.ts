import * as React from 'react';
import 'intersection-observer';
export declare enum IntersectClassName {
    BEFORE = "intersect",
    AFTER = "intersected"
}
export declare enum IntersectAnimation {
    FadeIn = "fadeIn",
    SlideInFromRight = "slideInFromRight",
    SlideInFromLeft = "slideInFromLeft",
    SlideInFromBottom = "slideInFromBottom"
}
interface IntersectFunction {
    (isIntersected: boolean): React.ReactNode;
}
interface AnimationOption {
    type: IntersectAnimation;
}
declare type Props = {
    children: React.ReactNode | IntersectFunction;
    animationOption?: AnimationOption;
};
/**
 * Intersection ObserverのWrapper
 *
 * A. このdivに.intersectedが付くので子要素でスタイルを充てる
 * B. 子要素に関数を渡してisIntersectedを受け取る
 * C. アニメーションを指定する
 */
export default function Intersection({ children, animationOption }: Props): JSX.Element;
export {};
