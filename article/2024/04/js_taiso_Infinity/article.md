---
title: JavaScriptで頭の体操をしよう！
date: "2024-04-26"
description: "JavaScriptで頭の体操をしよう！"
---

# JavaScriptで頭の体操をしよう！
最近Scratchで色々探していると...こんなのを見つけました！

<img
  src="https://cdn2.scratch.mit.edu/get_image/project/1002443254_480x360.png"
  alt="JavaScriptで頭の体操をしよう！ by @abee のサムネイル"
  style="width: min(100%, 400px); height: auto" />
JavaScriptで頭の体操...?自分もやってみようかな...?

<p>
  <a href="https://hubspot.kayac.com/js-taiso-001" target="_parent"
    >https://hubspot.kayac.com/js-taiso-001</a
  >へ移動...
  <a herf="https://bit.ly/js_qz001" target="_parent">問題のzipファイル</a
  >を手に入れて...
</p>
ええと...readme...

<div style="font-size: 10px">
  # JS体操 No. 1 https://hubspot.kayac.com/js-taiso-001 ## 問題の解き方 -<br />
  黒い実線が赤い点線のガイドとぴったり重なるように`f.js`を編集してください♪<br />
  - `f.js`のみを（なるべく少ない文字数で）編集してください♪ -<br />
  その他のファイルは変更しないでください♪ ## ファイル構成 ``` js-taiso-001<br />
  ├── README.md └── public ├── f.js // このファイルのみを編集してください<br />
  ├── main.js // 【編集不可】テストや文字数のカウントを行うファイルです ├──<br />
  graph.js // 【編集不可】グラフ描画用のモジュールです ├── guide.bin //<br />
  【編集不可】グラフの赤いガイドを表示するためのバイナリデータです └──<br />
  index.html // 【編集不可】このファイルをローカルサーバ上で開いてください<br />
  ``` ## 提出方法<br />
  以下ページ内の提出フォームに必要事項を入力し送信してください♪<br />
  <a href="https://hubspot.kayac.com/js-taiso-001#apply" target="_parent"
    >https://hubspot.kayac.com/js-taiso-001#apply</a>
  ## 備考 -<br />
  `index.html`をローカルファイルとして開くと実行されません。ローカルHTTPサーバなどを介して実行してください♪<br />
  - 文字数は開発者コンソールに表示されます♪ -<br />
  JavaScriptの文字列の`length`プロパティを文字数とみなします♪（つまりUTF-16のコードユニットの数を文字数とみなします）<br />
</div>
ふむふむ...なるほど...よし！やってみよう！

<pre style="color: #00ff00">
      `/**`
      `* f(x) の黒い実線が赤い点線のガイドとぴったり重なるようにしてください♪`
      `*`
      `* @param  {number} x 0〜1の数値`
      `* @return {number}`
      `*/`
      `export default function f(x) {`
        `return 0;`
      `}`
    </pre>
これを...

<pre style="color: #00ff00">
      `export default x=>{return (~~(x*5+1)-(1-(5*x%1)**2)**0.5)/5}`
    </pre>
こう！

<a href="./js-taiso-001/public/index.html" target="_parent">ここ</a>から見ることができます！
それでそれで正解は...

<a
  href="https://techblog.kayac.com/js-taiso-001-commentary-vol1"
  target="_parent"
  >ここ！</a>
<code style="color: #00ff00">export default x=>x-(x%=.2)+.2-(.04-x*x)**.5</code>
うん...全然届かん。

やっぱりみんな頭良いんだな...

...って感じで実際にやってみたんですが、

結構面白かったです！

みなさんも挑戦する機会があったらぜひどうぞ！

では！


