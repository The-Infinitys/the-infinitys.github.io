# 自作フォント作ってみた！

どうも！The Infinity'sです！
フォントが作りたいなぁと唐突に思ったので作ってみることにしました！
対象となるのは、私のWebサイトの左上にある、「The Infinity's」の文字列です

## 作る過程

### 1. 文字列分解

先ずは、文字列をそれぞれ分解します！

`The Infinity's`

=>

`T`
`h`
`e`
` `
`I`
`n`
`f`
`i`
`n`
`i`
`t`
`y`
`'`
`s`

となります！
そしてこれらの文字のうち、重複しているもの(と空白)を除くと...

`T`
`h`
`e`
`I`
`n`
`f`
`i`
`t`
`y`
`'`
`s`
となります！
それぞれを制作します！

### 2. 文字を作成

使用ソフトはVSCodeです！
```html
<svg
  viewBox="0 0 50 100"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  class="The-Infinity-font Spirit T"
>
  <path
    d="
  M0,0
  h50
  l-5,10
  h-15
  v90
  h-10
  v-90
  h-15
  z
  "
    fill="#888"
    stroke="none"
  />
</svg>
<svg
  viewBox="0 0 50 100"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  class="The-Infinity-font Spirit h"
>
  <path
    fill-rule="nonzero"
    d="
  M0,0
  v100
  l10,-5
  v-30
  a 15,15,0,0,1,30,0
  v 30
  l10,5
  v-35
  a 20,20,0,0,0,-50,0
  h10
  v-55
  z
  "
    fill="#888"
    stroke="none"
  />
</svg>
<svg
  viewBox="0 0 49.573 58.754"
  xmlns="http://www.w3.org/2000/svg"
  class="The-Infinity-font Spirit e"
>
  <g
    id="svgGroup"
    stroke-linecap="round"
    fill-rule="evenodd"
    font-size="9pt"
    stroke="#888"
    stroke-width="0"
    fill="#888"
    style="stroke: #888; stroke-width: 0; fill: #888"
  >
    <path
      d="M 49.249 33.373 L 9.937 33.373 Q 10.842 40.718 14.841 45.063 A 16.179 16.179 0 0 0 15.445 45.685 A 15.275 15.275 0 0 0 23.679 49.8 A 21.623 21.623 0 0 0 27.433 50.113 Q 32.293 50.113 36.181 49.087 Q 40.069 48.061 43.633 46.441 L 45.901 54.757 A 44.031 44.031 0 0 1 41.219 56.513 A 56.012 56.012 0 0 1 37.153 57.619 A 42.027 42.027 0 0 1 31.654 58.503 A 56.187 56.187 0 0 1 26.245 58.753 A 30.583 30.583 0 0 1 17.879 57.667 A 22.797 22.797 0 0 1 7.075 51.031 Q 0.802 44.183 0.091 32.453 A 50.895 50.895 0 0 1 0.001 29.377 A 38.187 38.187 0 0 1 0.9 20.929 A 31.147 31.147 0 0 1 3.187 14.311 A 26.613 26.613 0 0 1 8.604 6.662 A 24.718 24.718 0 0 1 12.097 3.835 A 22.732 22.732 0 0 1 23.177 0.085 A 28.302 28.302 0 0 1 25.381 0.001 A 30.838 30.838 0 0 1 31.288 0.536 Q 35.569 1.372 38.827 3.511 Q 44.173 7.021 46.873 12.961 A 30.44 30.44 0 0 1 49.493 23.613 A 36.109 36.109 0 0 1 49.573 26.029 A 81.22 81.22 0 0 1 49.259 33.261 A 74.844 74.844 0 0 1 49.249 33.373 Z M 9.829 25.489 L 40.609 25.489 A 26.304 26.304 0 0 0 40.172 20.536 Q 39.27 15.836 36.505 12.853 A 13.487 13.487 0 0 0 28.987 8.775 A 19.867 19.867 0 0 0 25.165 8.425 A 14.667 14.667 0 0 0 19.644 9.434 A 13.526 13.526 0 0 0 14.797 12.799 A 16.378 16.378 0 0 0 11.621 17.863 Q 10.71 20.087 10.209 22.811 A 34.583 34.583 0 0 0 9.829 25.489 Z"
      vector-effect="non-scaling-stroke"
    />
  </g>
</svg>

<svg
  viewBox="0 0 50 100"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  class="The-Infinity-font Spirit I"
>
  <path
    fill-rule="nonzero"
    d="
    M0,0
    h50
    l-20,10
    v80
    l20,10
    h-50
    l20,-10
    v-80
    z
    "
    fill="#888"
    stroke="none"
  />
</svg>
<svg
  viewBox="0 0 50 100"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  class="The-Infinity-font Spirit n"
>
  <path
    fill-rule="nonzero"
    d="
  M0,40
  v60
  l10,-5
  v-30
  a 15,15,0,0,1,30,0
  v 30
  l10,5
  v-35
  a 20,20,0,0,0,-50,0
  h10
  v-20
  z
  "
    fill="#888"
    stroke="none"
  />
</svg>
<svg
  viewBox="0 0 50 100"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  class="The-Infinity-font Spirit f"
>
  <path
    fill-rule="nonzero"
    d="
    M 0,50
    l 20,10
    v40
    h10
    v-40
    l20,-10
    h-20
    v-20
    l10,-10
    h-10
    l-10,10
    v20
    z
    "
    fill="#888"
    stroke="none"
  />
</svg>
<svg
  viewBox="0 0 50 100"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  class="The-Infinity-font Spirit i"
>
  <path
    fill-rule="nonzero"
    d="
    M 20,50
    v50
    h10
    v-50
    z
    "
    fill="#888"
    stroke="none"
  />
  <ellipse
    cx="25"
    cy="40"
    rx="2.5"
    ry="5"
    fill="none"
    stroke="#888"
    stroke-width="2"
  />
  <ellipse
    cx="25"
    cy="30"
    rx="2.5"
    ry="5"
    fill="none"
    stroke="#888"
    stroke-width="2"
  />
</svg>

<svg
  viewBox="0 0 50 100"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  class="The-Infinity-font Spirit t"
>
  <path
    fill-rule="nonzero"
    d="
    M 0,50
    l 20,10
    v40
    h10
    v-40
    l20,-10
    h-20
    v-10
    h-10
    v10
    z
    "
    fill="#888"
    stroke="none"
  />
</svg>

<svg
  viewBox="0 0 50 100"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  class="The-Infinity-font Spirit y"
>
  <path
    fill-rule="nonzero"
    d="
    M 0,20
    l 10,5
    l 15,20
    l 15,-20
    l 10,-5
    l -45,80
    h-5
    l20,-45
    z
    "
    fill="#888"
    stroke="none"
  />
</svg>

<svg
  viewBox="0 0 50 100"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  class="The-Infinity-font Spirit apos"
>
  <ellipse
    cx="25"
    cy="40"
    rx="2.5"
    ry="5"
    fill="none"
    stroke="#888"
    stroke-width="2"
  />
  <ellipse
    cx="25"
    cy="30"
    rx="2.5"
    ry="5"
    fill="none"
    stroke="#888"
    stroke-width="2"
  />
</svg>
<svg
  width="49.913"
  height="69.089"
  viewBox="0 0 49.913 69.089"
  xmlns="http://www.w3.org/2000/svg"
  class="The-Infinity-font Spirit s"
>
  <g
    id="svgGroup"
    stroke-linecap="round"
    fill-rule="evenodd"
    font-size="9pt"
    stroke="#888"
    stroke-width="0"
    fill="#888"
    style="stroke: #888; stroke-width: 0; fill: #888"
  >
    <path
      d="M 0 62.23 L 4.826 52.705 A 23.567 23.567 0 0 0 8.818 55.405 Q 10.793 56.477 13.145 57.341 A 30.573 30.573 0 0 0 22.811 59.166 A 34.88 34.88 0 0 0 23.876 59.182 Q 30.988 59.182 34.608 56.833 A 9.46 9.46 0 0 0 36.555 55.191 A 6.416 6.416 0 0 0 38.227 50.8 A 9.046 9.046 0 0 0 37.828 48.073 A 7.889 7.889 0 0 0 36.894 46.101 A 8.108 8.108 0 0 0 35.714 44.712 Q 34.426 43.478 32.301 42.267 A 28.325 28.325 0 0 0 32.004 42.101 Q 28.792 40.323 22.989 38.285 A 131.572 131.572 0 0 0 21.717 37.846 Q 12.446 34.671 7.811 30.29 A 14.382 14.382 0 0 1 3.628 22.674 A 21.328 21.328 0 0 1 3.175 18.161 A 15.393 15.393 0 0 1 8.189 6.712 A 22.178 22.178 0 0 1 9.843 5.271 A 22.562 22.562 0 0 1 17.508 1.401 Q 20.755 0.438 24.648 0.137 A 47.66 47.66 0 0 1 28.321 0 Q 34.566 0 39.459 1.29 A 32.023 32.023 0 0 1 39.624 1.334 A 49.237 49.237 0 0 1 44.875 3.055 A 39.51 39.51 0 0 1 48.514 4.699 L 45.339 14.097 A 31.151 31.151 0 0 0 40.681 11.855 A 38.343 38.343 0 0 0 37.529 10.795 Q 33.147 9.525 27.813 9.525 A 26.202 26.202 0 0 0 24.083 9.773 Q 22.185 10.046 20.647 10.623 A 10.807 10.807 0 0 0 17.78 12.192 A 11.839 11.839 0 0 0 16.056 13.809 Q 15.163 14.849 14.738 15.958 A 5.752 5.752 0 0 0 14.351 18.034 A 6.249 6.249 0 0 0 16.25 22.545 A 8.994 8.994 0 0 0 17.018 23.241 A 12.547 12.547 0 0 0 18.669 24.345 Q 21.622 26.035 27.432 27.94 Q 40.005 32.131 44.958 37.211 Q 49.911 42.291 49.911 49.911 Q 49.911 58.482 43.242 63.57 A 21.105 21.105 0 0 1 42.736 63.945 A 25.466 25.466 0 0 1 34.637 67.721 Q 29.716 69.088 23.495 69.088 A 50.787 50.787 0 0 1 16.051 68.566 A 39.304 39.304 0 0 1 9.97 67.183 Q 4.364 65.413 0.568 62.656 A 23.15 23.15 0 0 1 0 62.23 Z"
      vector-effect="non-scaling-stroke"
    />
  </g>
</svg>
```

実際に表示してみると、こうなります！

<details>
<summary>SVGで書かれた文字</summary>
<svg viewbox="0 0 50 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="The-Infinity-font Spirit T">
  <path d="
  M0,0
  h50
  l-5,10
  h-15
  v90
  h-10
  v-90
  h-15
  z
  " fill="#888" stroke="none">
  </path>
  
  <svg viewbox="0 0 50 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="The-Infinity-font Spirit h">
    <path fill-rule="nonzero" d="
  M0,0
  v100
  l10,-5
  v-30
  a 15,15,0,0,1,30,0
  v 30
  l10,5
  v-35
  a 20,20,0,0,0,-50,0
  h10
  v-55
  z
  " fill="#888" stroke="none">
    </path>
  </svg>
  <svg viewbox="0 0 49.573 58.754" xmlns="http://www.w3.org/2000/svg" class="The-Infinity-font Spirit e">
    <g id="svgGroup" stroke-linecap="round" fill-rule="evenodd" font-size="9pt" stroke="#888" stroke-width="0" fill="#888" style="stroke: #888; stroke-width: 0; fill: #888">
      <path d="M 49.249 33.373 L 9.937 33.373 Q 10.842 40.718 14.841 45.063 A 16.179 16.179 0 0 0 15.445 45.685 A 15.275 15.275 0 0 0 23.679 49.8 A 21.623 21.623 0 0 0 27.433 50.113 Q 32.293 50.113 36.181 49.087 Q 40.069 48.061 43.633 46.441 L 45.901 54.757 A 44.031 44.031 0 0 1 41.219 56.513 A 56.012 56.012 0 0 1 37.153 57.619 A 42.027 42.027 0 0 1 31.654 58.503 A 56.187 56.187 0 0 1 26.245 58.753 A 30.583 30.583 0 0 1 17.879 57.667 A 22.797 22.797 0 0 1 7.075 51.031 Q 0.802 44.183 0.091 32.453 A 50.895 50.895 0 0 1 0.001 29.377 A 38.187 38.187 0 0 1 0.9 20.929 A 31.147 31.147 0 0 1 3.187 14.311 A 26.613 26.613 0 0 1 8.604 6.662 A 24.718 24.718 0 0 1 12.097 3.835 A 22.732 22.732 0 0 1 23.177 0.085 A 28.302 28.302 0 0 1 25.381 0.001 A 30.838 30.838 0 0 1 31.288 0.536 Q 35.569 1.372 38.827 3.511 Q 44.173 7.021 46.873 12.961 A 30.44 30.44 0 0 1 49.493 23.613 A 36.109 36.109 0 0 1 49.573 26.029 A 81.22 81.22 0 0 1 49.259 33.261 A 74.844 74.844 0 0 1 49.249 33.373 Z M 9.829 25.489 L 40.609 25.489 A 26.304 26.304 0 0 0 40.172 20.536 Q 39.27 15.836 36.505 12.853 A 13.487 13.487 0 0 0 28.987 8.775 A 19.867 19.867 0 0 0 25.165 8.425 A 14.667 14.667 0 0 0 19.644 9.434 A 13.526 13.526 0 0 0 14.797 12.799 A 16.378 16.378 0 0 0 11.621 17.863 Q 10.71 20.087 10.209 22.811 A 34.583 34.583 0 0 0 9.829 25.489 Z" vector-effect="non-scaling-stroke">
      </path>
    </g>
  </svg>
  <svg viewbox="0 0 50 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="The-Infinity-font Spirit I">
    <path fill-rule="nonzero" d="
    M0,0
    h50
    l-20,10
    v80
    l20,10
    h-50
    l20,-10
    v-80
    z
    " fill="#888" stroke="none">
    </path>
  </svg>
  <svg viewbox="0 0 50 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="The-Infinity-font Spirit n">
    <path fill-rule="nonzero" d="
  M0,40
  v60
  l10,-5
  v-30
  a 15,15,0,0,1,30,0
  v 30
  l10,5
  v-35
  a 20,20,0,0,0,-50,0
  h10
  v-20
  z
  " fill="#888" stroke="none">
    </path>
  </svg>
  <svg viewbox="0 0 50 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="The-Infinity-font Spirit f">
    <path fill-rule="nonzero" d="
    M 0,50
    l 20,10
    v40
    h10
    v-40
    l20,-10
    h-20
    v-20
    l10,-10
    h-10
    l-10,10
    v20
    z
    " fill="#888" stroke="none">
    </path>
  </svg>
  <svg viewbox="0 0 50 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="The-Infinity-font Spirit i">
    <path fill-rule="nonzero" d="
    M 20,50
    v50
    h10
    v-50
    z
    " fill="#888" stroke="none">
    </path>
    <ellipse cx="25" cy="40" rx="2.5" ry="5" fill="none" stroke="#888" stroke-width="2">
    </ellipse>
    <ellipse cx="25" cy="30" rx="2.5" ry="5" fill="none" stroke="#888" stroke-width="2">
    </ellipse>
  </svg>
  <svg viewbox="0 0 50 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="The-Infinity-font Spirit t">
    <path fill-rule="nonzero" d="
    M 0,50
    l 20,10
    v40
    h10
    v-40
    l20,-10
    h-20
    v-10
    h-10
    v10
    z
    " fill="#888" stroke="none">
    </path>
  </svg>
  <svg viewbox="0 0 50 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="The-Infinity-font Spirit y">
    <path fill-rule="nonzero" d="
    M 0,20
    l 10,5
    l 15,20
    l 15,-20
    l 10,-5
    l -45,80
    h-5
    l20,-45
    z
    " fill="#888" stroke="none">
    </path>
  </svg>
  <svg viewbox="0 0 50 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="The-Infinity-font Spirit apos">
    <ellipse cx="25" cy="40" rx="2.5" ry="5" fill="none" stroke="#888" stroke-width="2">
    </ellipse>
    <ellipse cx="25" cy="30" rx="2.5" ry="5" fill="none" stroke="#888" stroke-width="2">
    </ellipse>
  </svg>
  <svg viewbox="0 0 49.913 69.089" xmlns="http://www.w3.org/2000/svg" class="The-Infinity-font Spirit s">
    <g id="svgGroup" stroke-linecap="round" fill-rule="evenodd" font-size="9pt" stroke="#888" stroke-width="0" fill="#888" style="stroke: #888; stroke-width: 0; fill: #888">
      <path d="M 0 62.23 L 4.826 52.705 A 23.567 23.567 0 0 0 8.818 55.405 Q 10.793 56.477 13.145 57.341 A 30.573 30.573 0 0 0 22.811 59.166 A 34.88 34.88 0 0 0 23.876 59.182 Q 30.988 59.182 34.608 56.833 A 9.46 9.46 0 0 0 36.555 55.191 A 6.416 6.416 0 0 0 38.227 50.8 A 9.046 9.046 0 0 0 37.828 48.073 A 7.889 7.889 0 0 0 36.894 46.101 A 8.108 8.108 0 0 0 35.714 44.712 Q 34.426 43.478 32.301 42.267 A 28.325 28.325 0 0 0 32.004 42.101 Q 28.792 40.323 22.989 38.285 A 131.572 131.572 0 0 0 21.717 37.846 Q 12.446 34.671 7.811 30.29 A 14.382 14.382 0 0 1 3.628 22.674 A 21.328 21.328 0 0 1 3.175 18.161 A 15.393 15.393 0 0 1 8.189 6.712 A 22.178 22.178 0 0 1 9.843 5.271 A 22.562 22.562 0 0 1 17.508 1.401 Q 20.755 0.438 24.648 0.137 A 47.66 47.66 0 0 1 28.321 0 Q 34.566 0 39.459 1.29 A 32.023 32.023 0 0 1 39.624 1.334 A 49.237 49.237 0 0 1 44.875 3.055 A 39.51 39.51 0 0 1 48.514 4.699 L 45.339 14.097 A 31.151 31.151 0 0 0 40.681 11.855 A 38.343 38.343 0 0 0 37.529 10.795 Q 33.147 9.525 27.813 9.525 A 26.202 26.202 0 0 0 24.083 9.773 Q 22.185 10.046 20.647 10.623 A 10.807 10.807 0 0 0 17.78 12.192 A 11.839 11.839 0 0 0 16.056 13.809 Q 15.163 14.849 14.738 15.958 A 5.752 5.752 0 0 0 14.351 18.034 A 6.249 6.249 0 0 0 16.25 22.545 A 8.994 8.994 0 0 0 17.018 23.241 A 12.547 12.547 0 0 0 18.669 24.345 Q 21.622 26.035 27.432 27.94 Q 40.005 32.131 44.958 37.211 Q 49.911 42.291 49.911 49.911 Q 49.911 58.482 43.242 63.57 A 21.105 21.105 0 0 1 42.736 63.945 A 25.466 25.466 0 0 1 34.637 67.721 Q 29.716 69.088 23.495 69.088 A 50.787 50.787 0 0 1 16.051 68.566 A 39.304 39.304 0 0 1 9.97 67.183 Q 4.364 65.413 0.568 62.656 A 23.15 23.15 0 0 1 0 62.23 Z" vector-effect="non-scaling-stroke">
      </path>
    </g>
  </svg>
</svg>
</details>

...結構良い感じですね！(単体で見ると)

### 3. "The Infinity's"に並び替え文字の形状の調整

をやったものがこちらです。

<img src="./thumbnail.svg" style="width:100%;height:auto;">

良きかな()

これで完成です！

## 作った感想

本当に大変でした...特に調整が...()
あと使ってみたところダサかったので没になりました()

# date: 2024/10/01