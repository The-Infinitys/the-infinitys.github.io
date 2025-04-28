<h1>自分でAPI(?)作ってみた！</h1>
<p>どもども！最近急激に暑くなってきましたね...The Infinitysです！</p>
<p>
こうやってブログ見ていてくれるみなさん(多分0人)のおかげでこうやってぼちぼち進められています！
</p>
<p>
前までは手動でブログのデータ(例えば、どこのリポジトリのどこにどのファイルがあって...)と言ったものを打ち込んでいたのですが、
</p>
<p>だんだん面倒くさくなってきてですね...</p>
<p>で目をつけたのがこれです</p>
<a target="_parent" href="https://github.com/features/actions">
<h2>GitHub Actions</h2>
<img src="./thumbnail.png" alt="GITHUB ACTIONS" style="width: 100%" />
</a>
<p>
GitHub
Actionsというのは、簡単に言ったら、手動で行なっていたようなテストなどの作業を<a
target="_parent"
href="https://google.com/search?q=.yaml"
>yamlファイル</a
>に記述して
</p>
<p>自動でやってくれるというものです</p>
<h2>GitHub Actionsの書き方</h2>
<p>GitHub Actionsとは、GitHub Actionsです。</p>
<div style="background-color: #888888">
<code>
<pre>name: 名前</pre>
<pre>run-name: actionの名前</pre>
<pre>on: 起動条件</pre>
<pre>jobs:</pre>
<pre>  steps:</pre>
<pre>    - run: command</pre>
<pre>    - run: command</pre>
</code>
</div>
<p>まあ、こんな風にして、プログラムとかを記述するのですが、</p>
<p>これが非常に難しい...</p>
<p>
これらは(GitHubとか自分とかが用意した)仮想マシン上で実行されるのですが
</p>
<p>はい、<b>コマンドライン</b>の知識が必須です</p>
<p>lsとかcdとかその他色々とか...</p>
<p>学習する必要があったんですよね...</p>
<h2>作業工程</h2>
<p>まず、リポジトリを作ります</p>
<img src="ﾃﾚｯﾃﾚｰﾚｰ" alt="写真なんかねぇよ" />
<p>次にルートディレクトリに、".github/workflows"フォルダを設置します</p>
<img src="写真なんかねぇよ" alt="うるせぇよ" />
<p>お次にプログラムを書きます</p>
<img src="うるせぇよ" alt="黙れよ" />
<p>失敗します()</p>
<img src="黙れよ" alt="写真なんかねぇよ" />
<p>ちなみにその写真がこちら</p>
<img src="./img/too_many_miss.png" alt="何で写真がないんだ" />
<p>
かれこれ滅茶苦茶時間かかって泣きそうになりました(´・ω・)ﾆﾄﾞﾄﾔﾘﾀｸﾅｲ
</p>
<p>一週間ほど調べ続けてついに完成したのがこちら</p>
<a
target="_parent"
href="https://github.com/The-Infinitys/api/blob/main/.github/workflows/blog.yaml"
>https://github.com/The-Infinitys/api/blob/main/.github/workflows/blog.yaml</a
>
<p>たったこれだけ？と思ったみなさん...</p>
<b>
<p>本体はこっちです</p>
</b>
<a
href="https://github.com/The-Infinitys/api/blob/main/programs/blog.py"
target="_parent">
<h2>
https://github.com/The-Infinitys/api/blob/main/programs/blog.py
</h2>
</a>
<p>ここに全てを凝縮しました。</p>
<p>仕組みとしては、</p>
<div>
1.リポジトリblog-data(ブログの中身がある場所)をクローンする<br />
2.探索する<br />
3.探索結果をもとにオブジェクトを作り上げる<br />
4.データを(Actions内で)保存する<br />
5.apiリポジトリにコミットしてプッシュする<br />
</div>
<p>
と言った風になってます。ちなみにクロールまで完全自動でやってくれるので滅茶苦茶便利です
</p>
<p>疲れた</p>
<h2>orz</h2>
<date>2024/05/12</date>