---
title: Blog List
date: "2024-06-19"
description: "Blog List"
---

# title: 検索機能を搭載する

# 検索機能をブログに搭載しました
The Infinity'sです。つい最近
[次のブログ記事を表示する機能を追加](../update_and_add_blog_list/)
したばかりですが、
機能的には足りませんでした、と言うのもですね...
私のブログには**検索機能**が存在して居なかったんですよ...
それでこのままではまずいと思いまして、ブログに検索機能を足しました。
## 面倒だった作業
やり方としては、inputエレメントを改めて作り、そこに検索クエリを入れる方式にします。
### html
```html
<div id="list-head">
  # Blog List
  <div>
    <img
      onclick="search_articles()"
      src="../image/Infinity-search.svg"
      alt="" />
    <input id="search" type="text" onchange="search_articles()" />
  </div>
</div>
```
こんな感じです。
次に、CSSの適用...
### CSS
```css
#list-head {
  width: 100%;
  height: auto;
  display: flex;
  @media (max-aspect-ratio:1/1) {
    display: block;
  }
}

#list-head h1 {
  margin-right: auto;
  position: relative;
  font-size: 4vh;
}

#list-head div {
  width: 40vh;
  height: 4vh;
  background-color: var(--background);
  display: flex 1 auto;
}

#list-head div img {
  width: 10%;
  height: 100%;
  margin-right: auto;
}

#list-head div input {
  width: 85%;
  height: 100%;
  font-size: 4vh;
  background-color: var(--background);
  color: var(--text);
}
```

そしてjavascript...
### JavaScript
```javascript
//検索機能
const article_search_input = document.querySelector("#list-head div input");
const search_articles = () => {
  const search_query = article_search_input.value.replace("　", " ").toLowerCase();
  const blog_buttons = document.querySelector("#blog-button-section").children;
  if (search_query == "") {
    for (let i = 0; i < blog_buttons.length; i++) {
      blog_buttons[i].style.display = "";
    }
    return null;
  }
  const search_querys = search_query.split(" ");
  for (let i = 0; i < blog_buttons.length; i++) {
    const blog_button = blog_buttons[i];
    const button_inner = blog_button.innerHTML;
    const title = button_inner.substring(button_inner.indexOf("<div>") + 5, button_inner.indexOf("</div>")).toLowerCase();
    blog_button.style.display = "";
    for (let j = 0; j < search_querys.length; ++j) {
      if (-1 == title.indexOf(search_querys[j])) {
        blog_button.style.display = "none";
      }
    }
  }
  return search_query;
}
```

## 仕組みの解説
全体的な仕組みとしては、

1. searchクエリが入力される
2. 検索ボタンかenterが押される
3. 全てのボタンをチェック開始する
4. ブログボタンを初期化(一旦displayの値をnullにする)
5. 検索クエリを含まないブログのボタンのdisplayをnoneに設定する
6. (4-5の作業を)繰り返す

と言うふうになっています。

## 感想
かなり難しかったです。検索機能の実装自体が難しいのと、
アイコンを書いていくのが大変でした。検索アイコンはここにあります。
![search_icon](/image/Infinity-search.svg)

