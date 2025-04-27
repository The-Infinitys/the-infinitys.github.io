<h1>Language Support</h1>
<p>つい最近contactページを作成しました。</p>
<img src="./img/contact.png" alt="CONTACT PAGE" style="width: 100%" />
<p>Google Formを埋め込んで、データを楽に受け取れるようにしてます。</p>
<p>でこれを運用し始めて早一日...</p>
<h4>
"I have a question about the operation of the site, do you plan to
implement an English version?"
</h4>
<h4>
「サイトの運営について質問があるのですが、英語版を導入する予定はありますか？」
</h4>
<p>と来ました。ビックリです。英語で来るとは...驚いた...</p>
<p>(写真)</p>
<img src="./thumbnail.png" alt="写真だよ" style="width: 100%" />
<p>そういうわけでさっそくつくることにしました。</p>
<p>といっても多言語対応なんてやったことがなかったので、調べます</p>
<p>...</p>
<p>...</p>
<p>...</p>
<p>方法は結構あるみたいですね</p>
<h2>多言語対応の方法</h2>
<h3>1.ドメインを分けてそれぞれで作る</h3>
<p>ドメインの入手が金をかけないと困難だったので却下</p>
<h3>2.ディレクトリを分けてそれぞれで作る</h3>
<p>複数同じページを書くことや更新が面倒臭いので、却下</p>
<h3>3.GOOGLE翻訳</h3>
<p>SEO対策的に却下</p>
<h2>結果</h2>
<h3>「自作すること」</h3>
<p>にしました。というわけでプログラムを組んでいきましょう。</p>
<p>主なコンセプトとしては、</p>
<p>・保守/更新が簡単</p>
<p>・軽い</p>
<p>
といった点を重視したので、コードは共通で、データはjsonでそれぞれのディレクトリに入れることにします。
</p>
<img
src="./img/language-support.jpeg"
alt="language-support.js"
style="width: 100%" />
<a
target="_parent"
href="https://github.com/The-Infinitys/the-infinitys.github.io/blob/main/layout/language-support.js"
>view language-support.js</a
>
<p>まずはプログラム、language-support.jsです。</p>
<p>仕組みとしては...</p>
<p>1.翻訳を実行する関数を定義(translate_Infinitys)</p>
<p>2.main関数を定義</p>
<p>3.実行</p>
<p>というステップになっています。</p>
<p>というわけで2について詳しく説明します。</p>
<p>まずは、navigator.languageから言語を取得します。</p>
<p>
その上で、もしlangパラメータが存在していれば、それでlanguageを上書きをします。
</p>
<p>次に、現在地のURLから、language.jsonファイルの場所を計算し、</p>
<p>
fetch()。で成功したら、jsonファイルとして読み込み、それも成功したら、translate_Infinitys()を実行します。
</p>
<p>この時にエラーが出た際はalertで再読み込みを促します。</p>
<p>そして、データ、language.jsonです。</p>
<img src="./img/language.jpeg" alt="" style="width: 100%" />
<a
target="_parent"
href="https://github.com/The-Infinitys/the-infinitys.github.io/blob/main/language.json"
>view language.json</a
>
<p>
構造としては、普通にオブジェクト内に、対応している言語のキー(en,en-USとか)をいれて、
</p>
<p>それぞれに配列をセット。でその配列内には、</p>
<code>
<pre>{</pre>
<pre>"elem":"エレメントのセレクタ"</pre>
<pre>"text":"置き換えるテキスト"</pre>
<pre>}</pre>
</code>
<p>というふうな構造の変換データを入れておきます。これで完成です。</p>
<p>
プログラムは変えなくてもどこでも融通が効くし、なんなら別ドメインでも行けちゃう。
</p>
<p>
さらに更新する必要があるのはjsonファイル一つだけなので、そこも便利。
</p>
<p>個人的には超満足な出来です。</p>
<p>というわけでUnknownさん。ありがとうございました!</p>
<p>以上!2024年5月最後のThe Infinity'sのブログでした!</p>
<date>2024/05/31</date>