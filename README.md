# react-intersect

react-intersect は IntersectionObserver を React で使いやすくしたものです

- 以下のどれかの用法で使用してください
  - A. `Intersection`に`.intersect`及び`.intersected`が付くので、子要素でスタイルを充てる
  - B. 子要素に ReactNode を返す関数を渡して`isIntersected`を引数として受け取る
  - C. `animationOption`でアニメーションを指定する
- IntersectionObserver の polyfill が含まれます
