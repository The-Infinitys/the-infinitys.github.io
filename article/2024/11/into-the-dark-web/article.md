# ダークウェブの中に入ってみた！

どうも！ The Infinity'sです！

暇なので**ダークウェブ**に入ってみたいと思います！

## ダークウェブとは

日本語でいう「闇サイト」というもので、
[Tor](https://www.google.com/search?q=Tor) という技術を活用したりした
非常に匿名性の高い[www](https://www.google.com/search?q=World+Wide+Web)のことです。

政治的な理由で抑圧されていたり、
検閲を受けたりしているところからでも、
自由にネットワークにアクセスすることができます。

また、匿名性の高さを利用して、個人情報や違法薬物の売買等にも使用されています。

## 実際に繋げてみた

⚠︎⚠︎⚠︎⚠︎⚠︎⚠︎⚠︎⚠︎⚠︎⚠︎⚠︎⚠︎⚠︎⚠︎⚠︎⚠︎

以後の手順に従って何かしらの不利益を被った如何なる場合でも
私は責任を負いません。
自己責任でお願いします。

⚠︎⚠︎⚠︎⚠︎⚠︎⚠︎⚠︎⚠︎⚠︎⚠︎⚠︎⚠︎⚠︎⚠︎⚠︎⚠︎

### 1. VPNやプロキシを接続する(推奨)

これをすることでTor側に対してIPアドレスを隠すことが出来ます。
(VPNやプロキシ側には隠せないので注意)

### 2. Infinity Docker Desktopを準備する(任意)

[Infinity Docker Desktop](https://github.com/The-Infinitys/inf-docker-desktop) 
は、Dockerコンテナ内に
独立したデスクトップ環境を作成できます。
これによってお手元の環境とダークウェブに接続する環境を隔離して、
安全性を上げられます。
(出来れば仮想マシンを用意できると尚良い)

<img src="./img/open-inf-docker.jpeg" style="width:100%;height:auto;" />

### 3. Torブラウザをインストールする

(以後の操作はInfinity Docker Desktopで動かした際を想定しています。)

先ず、ブラウザを開いて...

<img src="./img/open-firefox.png" style="width:100%;height:auto;" />

[Tor Browser](https://www.torproject.org)をダウンロードします。

<img src="./img/download-tor-1.png" style="width:100%;height:auto;" />
<img src="./img/download-tor-2.png" style="width:100%;height:auto;" />

そしてインストールします。

<img src="./img/install-tor.jpeg" style="width:100%;height:auto;" />

参考までにInfinity Docker Desktopでインストールする際のコマンドをお見せします。

### 4. Torブラウザを使う

<img src="./img/open-tor.jpeg" style="width:100%;height:auto;" />
<img src="./img/loading-tor.png" style="width:100%;height:auto;" />
<img src="./img/opened-tor.jpeg" style="width:100%;height:auto;" />

こんな感じで起動することができます！

実際にオニオンルーティングが機能しているか確認してみましょう！

<img src="./img/ip-address.png" style="width:100%;height:auto;" />

これを見れば分かると思いますが...IPアドレスが変わっています

実際にダークウェブのサイトを覗いてみましょう！

## ダークウェブの検索エンジン

<img src="./img/search-infinity.png" style="width:100%;height:auto;" />

これはDuckDuckGoですね

<img src="./img/ahima.png" style="width:100%;height:auto;" />

そしてこれはAhimaというものです。

<details>

#### ダークウェブのお約束()

<summary>⚠閲覧注意⚠</summary>

<img src="./img/drug-store_1.png" style="width:100%;height:auto;" />
<img src="./img/drug-store_2.png" style="width:100%;height:auto;" />

~~こういう風に(色んな意味で)ヤバイサイトも見れます~~

</details>

## 感想

はい、滅茶苦茶楽しかったです()

一応気をつけないと行けない点として、
法律の遵守等があります。
(まぁ見てるだけでしたら引っかかることは殆どないので安心してください)
それとウイルス対策をしっかり()

# date: 2024/11/22
