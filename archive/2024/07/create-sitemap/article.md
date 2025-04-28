# サイトマップを自動で作成する
## ブログ記事の問題
どうも！ The Infinity'sです！最近ドメイン[the-infinitys.f5.si](the-infinitys.f5.si)をGoogleに登録してから、いくつかサイトは登録されたのですが...

**ブログ記事が登録されない**
と言う問題を迎えています。
そう言うことで早速自動的に記事をインデックスに登録してもらうために、
sitemap.xmlを用意したいと思います。それも自動です。

## 自動スクリプト

```python
import sys
import os

repos = ["article-2024", "InfinitySpirit", "Scratch"]
for repo in repos:
    os.system("git clone https://github.com/The-Infinitys/" + repo + ".git")


def folders(dir_path) -> list:
    result = [
        f for f in os.listdir(dir_path) if os.path.isdir(os.path.join(dir_path, f))
    ]
    return result


def files(dir_path) -> list:
    result = [
        f for f in os.listdir(dir_path) if os.path.isfile(os.path.join(dir_path, f))
    ]
    return result


def all_files(dir_path, hide_file=False) -> list:
    result = []
    for file in files(dir_path):
        if not file.startswith(".") or hide_file:
            result.append(dir_path + "/" + file)
    for folder in folders(dir_path):
        if not folder.startswith(".") or hide_file:
            for all_file in all_files(dir_path + "/" + folder):
                result.append(all_file)
    return result


def git_renew():
    os.system("git config user.name github-actions")
    os.system("git config user.email github-actions@github.com")
    os.system("git add .")
    os.system('git commit -m "Create Sitemap"')
    os.system("git push")


indexes = []
for file in all_files("."):
    if file.endswith(".html"):
        indexes.append("https://the-infinitys.f5.si" + file[1:])
# as txt
sitemap_content = ""
for index in indexes:
    sitemap_content += index + "\n"
print("SITE MAP")
print("-" * 40)
print(sitemap_content)
print("-" * 40)
# as xml
sitemap_content = """<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
"""
for index in indexes:
    index = (
        index.replace("&", "&amp;")
        .replace("'", "&apos;")
        .replace('"', "&quot;")
        .replace(">", "&gt;")
        .replace("<", "&lt;")
    )  # escaper
    sitemap_content += 4 * " " + "<url>\n"+8 * " " + "<loc>" + index + "</loc>\n" + 4 * " " + "</url>\n"
sitemap_content += "</urlset>"
with open("./sitemap.xml", mode="w") as f:
    f.write(sitemap_content)

git_renew()
```


仕組みとしては、まず、

1. 必要なリポジトリを全てクローン
2. ファイルを全て探索する。
3. 拡張子がhtmlで終わるものだけを集める
4. URLに変換
5. XMLに変換
6. 保存

と言ったステップになっています。

これで楽にインデックス登録ができますね！

# date: 2024/07/16