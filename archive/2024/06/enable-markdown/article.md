# title: markdownでブログを書けるようにした

## 余りにも面倒だったhtml
どうもどうも! The Infinitysです!
最近blogを書いていて、思ったことがあるんですよね...

「いちいちhtmlで書くのは面倒臭いな...(´・ω・)」

と。それでも今日までずっとhtmlで書いてきて慣れていたので、まあいっかって思ったんです。ですが私の友人の人子がきっかけでその考えは変わりました。

「markdownでblogを書きたい」

その時私の何かがフツッと切れ、次の瞬間にはキーボードをばちばち叩く私の姿が٩( ᐛ )وやっぱりhtmlで書くのは面倒くさい！

そう言うわけで、私はhtmlで書くのをやめたいと思いました。これからはブログは全てmarkdown経由で書きます。
## どうやってやったのか
私も一プログラマですので、自分のやりたい事くらいは自分でできなければメンタルが持ちません。そう言うわけでググりながら調べまわりました。
markdownで書くうえで一切htmlを経由せずに書けるように、プログラムで自動化しました。まずは、pythonでスクリプトを書きます。

#### markdown-converter.pyのソースコード
```python
import datetime
import os
import markdown
from sys import exit
article_temp_head='''
<!DOCTYPE html>
<html lang="Ja">
  <head>
    <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" /><meta name="description" content="The Infinity's awesome blog article" />
    <title>HERE TO THE TITLE</title>
    <link rel="stylesheet" href="../../Infinity-style/style.css" />
    <script defer src="../../Infinity-style/script.js"></script>
  <script defer src="/layout/script.js"></script><link rel="stylesheet" href="/layout/style.css" />
    <script
    defer
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2045274771035552"
    crossorigin="anonymous"></script></head>
  <body><div id="article-body"><div id="article-content">
'''
article_temp_foot='''
  </div></div></body>
</html>
'''
def listfolders(dir_path):
  result = [
      f for f in os.listdir(dir_path) if os.path.isdir(os.path.join(dir_path, f))
  ]
  return result
def listfiles(dir_path):
  result = [
      f for f in os.listdir(dir_path) if os.path.isfile(os.path.join(dir_path, f))
  ]
  return result
now=datetime.datetime.now()
now=str(now.year)+"-"+str(now.month)
root_dir="./"+now
def renew():
  os.system("git config user.name github-actions")
  os.system("git config user.email github-actions@github.com")
  os.system("git add .")
  os.system("git commit -m \"convert markdown\"")
  os.system("git push")
if not os.path.isdir(root_dir):
  print("No datas")
  exit()
for article_dir in listfolders(root_dir):
  path = root_dir+"/"+article_dir
  file_names = listfiles(path)
  index_path = None
  article_path=None
  for file_name in file_names:
    if file_name.startswith("index"):
      index_path=file_name
    elif file_name==("article.md"):
      article_path=file_name
  if article_path!=None:
    markdown_text = ""
    markdown_title = ""
    with open(root_dir+"/"+article_dir+"/"+article_path,mode="r") as f:
      markdown_text = f.read()
      f.close()
    markdown_result = ""
    for markdown_line in markdown_text.split("\n"):
      if markdown_line.startswith("# title: "):
        markdown_title=markdown_line[8:]
      else:
        markdown_result+=markdown_line+"\n"
    html_text=markdown.markdown(markdown_result)
    html_result=""
    for html_line in html_text.split("\n"):
      html_result+=" "*4+html_line+"\n"
    if index_path!=None:
      os.system("rm "+root_dir+"/"+article_dir+"/"+index_path)
    with open(root_dir+"/"+article_dir+"/index.html",mode="w") as f:
      f.write(article_temp_head.replace("HERE TO THE TITLE",markdown_title)+html_result+article_temp_foot)
      f.close()
renew()

```
これだけのプログラムを自力で書きました...(´・ω・)ある程度(リポジトリの更新とファイル・フォルダ構造の解析)はapiのプログラムから流用が効いたのですが...こんなことをするのは恐らく私が初めてみたいで、参考になるような情報は一切合切手に入りませんでした。
そして次に、github actionsのyamlファイルを書きました。
#### yamlファイルの方
```github actions
name: The-Infinitys_Blog-markdown
run-name: converting markdown
on: push
jobs:
  markdown-convert:
    permissions:
      repository-projects: write
      contents: write
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: git pull
      - run: pip install markdown
      - run: python ./programs/markdown-converter.py
```
こっちのyamlファイルはがっつりapiから流用できたので苦でもありませんでした。

## やってみた感想
激ムズすぎて二度とやりたくないです(´・ω・)
<date>2024/06/13</date>