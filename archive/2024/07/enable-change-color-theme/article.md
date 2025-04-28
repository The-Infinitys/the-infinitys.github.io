# カラーテーマを変更できるようにしました!

どうも！The Infinity'sです！
最近ブログのネタが全く思いつかなくてですね...
なんとか絞り出したのがこのネタです。
Webサイトでローカルストレージについて勉強してみようと思った次第です。
仕組みとしては...次のコードを見れば解ると思います。

## コードの全体図
```javascript
// init color theme
let color_theme = "auto";
const init_color_theme = () => {
  const ls_color_theme = localStorage.getItem("color-theme");
  if (ls_color_theme == null) {
    color_theme = "auto";
    localStorage.setItem("color-theme", "auto");
  } else {
    color_theme = ls_color_theme;
  }
  auto_color_theme();
};
const renew_color_theme = () => {
  const change_button = document.querySelector("#color-theme-change");
  localStorage.setItem("color-theme", color_theme);
  switch (color_theme) {
    case "light":
      document.documentElement.setAttribute("theme", "light");
      change_button.style.backgroundColor = "white";
      break;
    case "dark":
      document.documentElement.setAttribute("theme", "dark");
      change_button.style.backgroundColor = "black";
      break;
    case "auto":
      change_button.style.backgroundColor = "gray";
      if (window.matchMedia("(prefers-color-scheme: dark)").matches == true) {
        document.documentElement.setAttribute("theme", "dark");
      } else {
        document.documentElement.setAttribute("theme", "light");
      }
      break;
    default:
      alert("error happend on change color theme");
      break;
  }
};
const change_color_theme = (mode = null) => {
  color_theme = mode;
  renew_color_theme();
};
```

まずは１つ目です。

```javascript
let color_theme = "auto";
```
この変数にどのカラーテーマが選択されているのかの状況を文字列で格納します。

次

```javascript
const init_color_theme = () => {
  const ls_color_theme = localStorage.getItem("color-theme");
  if (ls_color_theme == null) {
    color_theme = "auto";
    localStorage.setItem("color-theme", "auto");
  } else {
    color_theme = ls_color_theme;
  }
  auto_color_theme();
};
```
この関数で初期化を実行します。
ここで人生で初めてlocalStorageを使いました。
いくつか紹介していない関数があるので紹介
```javascript
const renew_color_theme = () => {
  const change_button = document.querySelector("#color-theme-change");
  localStorage.setItem("color-theme", color_theme);
  switch (color_theme) {
    case "light":
      document.documentElement.setAttribute("theme", "light");
      change_button.style.backgroundColor = "white";
      break;
    case "dark":
      document.documentElement.setAttribute("theme", "dark");
      change_button.style.backgroundColor = "black";
      break;
    case "auto":
      change_button.style.backgroundColor = "gray";
      if (window.matchMedia("(prefers-color-scheme: dark)").matches == true) {
        document.documentElement.setAttribute("theme", "dark");
      } else {
        document.documentElement.setAttribute("theme", "light");
      }
      break;
    default:
      alert("error happend on change color theme");
      break;
  }
};
```
この関数でcssの変数を更新して、テーマを更新します。
```javascript
const change_color_theme = (mode = null) => {
  color_theme = mode;
  renew_color_theme();
};
```
この関数をカラーテーマを変えるボタンに適用することで、ボタンが押されたときに引数に応じてカラーテーマを更新できるようにします。
```javascript
const auto_color_theme = () => {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", renew_color_theme);
};
```
これは、最初にページを訪れた際や、カラーテーマでautoが選択されたときに使用される関数です。

以上のプログラムを、The_Infinitys_main関数の中に入れ込んで、
一気に実行します。
そして完成です。
## 感想

**ブログ書くのは~~思った以上に~~大変**

# date: 2024/07/29