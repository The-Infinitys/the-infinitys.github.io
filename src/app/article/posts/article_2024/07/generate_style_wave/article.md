---
title: 
date: ""
description: ""
---

# 新しい背景

## 最近ブログの更新が滞っていた理由

どうも、The Infinity'sです。
最後にブログを投稿してから、10日も経ってしまいました。
と言いますのも、**ネタが無い**のです。
ネタが無い...これだけのせいでブログ記事を書く気が完全に失せていました。

## やっとの思いで作り上げたネタ

そう言うことで念願のネタは、
**新しい背景を作ろう！**
です。

~~チピチピチャパチャパ~~雨の降るなか、雨雫が滴りおち、波紋を広げる...
そう言うふうな背景を作ろうと思いました。

## 簡単な説明
先ずは、svgから作り上げます。
次に、htmlに仕上げて、styleから色や大きさを変えられるように。
最後にJavaScriptを使って、水滴のアニメがループする様にしました。

### コード
```javascript
const generate_style = (mode = "monochrome") => {
  switch (mode) {
    case "monochrome":
      const dark_back = document.createElement("img");
      dark_back.src =
        "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIzNjAiIGhlaWdodD0iMzYwIiB2aWV3Qm94PSIwLDAsMzYwLDM2MCI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTYwLDApIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNNjAsMzYwdi0zNjBoMzYwdjM2MHoiIGZpbGw9IiMwMDAwMDAiLz48cGF0aCBkPSJNNjAsMTgwdi0xODBoMTgweiIgZmlsbD0iIzI3MjcyNyIvPjxwYXRoIGQ9Ik02MCw5MHYtOTBoMTgweiIgZmlsbD0iIzg4ODg4OCIvPjxwYXRoIGQ9Ik00MjAsMTgwdjE4MGgtMTgweiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iIGZpbGw9IiMyNzI3MjciLz48cGF0aCBkPSJNNDIwLDI3MHY5MGgtMTgweiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iIGZpbGw9IiM4ODg4ODgiLz48cGF0aCBkPSJNMjQwLDBsMTgwLDB2MTgweiIgZmlsbD0iIzI3MjcyNyIvPjxwYXRoIGQ9Ik0zMzAsMGw5MCwwdjE4MHoiIGZpbGw9IiM4ODg4ODgiLz48cGF0aCBkPSJNMjQwLDM2MGwtMTgwLDBsMCwtMTgweiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iIGZpbGw9IiMyNzI3MjciLz48cGF0aCBkPSJNMTUwLDM2MGgtOTBsMCwtMTgweiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iIGZpbGw9IiM4ODg4ODgiLz48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjoxODA6MTgwLS0+";
      dark_back.id = "dark-mobile";
      dark_back.alt = "";
      dark_back.style = `
        position:fixed;
        width:100vw;
        height:100vh;
        top:0;
        left:0;
        z-index:-1000;
      `;
      document.body.append(dark_back);
      const light_back = document.createElement("img");
      light_back.src =
        "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzYwIiBoZWlnaHQ9IjM2MCIgdmlld0JveD0iMCwwLDM2MCwzNjAiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC02MCwwKSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTYwLDM2MHYtMzYwaDM2MHYzNjB6IiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIgZmlsbD0iI2ZmZmZmZiIvPjxwYXRoIGQ9Ik0yNDAsMGgxODB2MTgweiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iIGZpbGw9IiNjM2MzYzMiLz48cGF0aCBkPSJNMjQwLDBoMTgwdjkweiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iIGZpbGw9IiM4ODg4ODgiLz48cGF0aCBkPSJNMjQwLDM2MGgtMTgwdi0xODB6IiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIgZmlsbD0iI2MzYzNjMyIvPjxwYXRoIGQ9Ik0yNDAsMzYwaC0xODB2LTkweiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iIGZpbGw9IiM4ODg4ODgiLz48cGF0aCBkPSJNNjAsMTgwdi0xODBoMTgweiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iIGZpbGw9IiNjM2MzYzMiLz48cGF0aCBkPSJNNjAsMTgwdi0xODBoOTB6IiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIgZmlsbD0iIzg4ODg4OCIvPjxwYXRoIGQ9Ik00MjAsMTgwdjE4MGgtMTgweiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iIGZpbGw9IiNjM2MzYzMiLz48cGF0aCBkPSJNNDIwLDE4MHYxODBoLTkweiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iIGZpbGw9IiM4ODg4ODgiLz48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjoxODA6MTgwLS0+";
      light_back.id = "light-mobile";
      light_back.alt = "";
      light_back.style = `
        position:fixed;
        width:100vw;
        height:100vh;
        top:0;
        left:0;
        z-index:-999;
      `;
      document.body.append(light_back);
      const center_inf = document.createElement("img");
      center_inf.src =
        "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxNzQiIGhlaWdodD0iMTc0IiB2aWV3Qm94PSIwLDAsMTc0LDE3NCI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE1MywtOTMpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSIjNzc3Nzc3IiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTE1NSwxODBjMCwtMTguNzc3NjggMTkuMDI3OSwtMzQgNDIuNSwtMzRjMjMuNDcyMTEsMCA0Mi41LDE1LjIyMjMyIDQyLjUsMzRjMCwxOC43Nzc2OCAtMTkuMDI3ODksMzQgLTQyLjUsMzRjLTIzLjQ3MjEsMCAtNDIuNSwtMTUuMjIyMzIgLTQyLjUsLTM0eiIgc3Ryb2tlLXdpZHRoPSIyIi8+PHBhdGggZD0iTTI0MCwxODBjMCwtMTguNzc3NjggMTkuMDI3OSwtMzQgNDIuNSwtMzRjMjMuNDcyMTEsMCA0Mi41LDE1LjIyMjMyIDQyLjUsMzRjMCwxOC43Nzc2OCAtMTkuMDI3ODksMzQgLTQyLjUsMzRjLTIzLjQ3MjEsMCAtNDIuNSwtMTUuMjIyMzIgLTQyLjUsLTM0eiIgc3Ryb2tlLXdpZHRoPSIyIi8+PHBhdGggZD0iTTE1NSwxODBjMCwtNDYuOTQ0MiAzOC4wNTU4LC04NSA4NSwtODVjNDYuOTQ0MiwwIDg1LDM4LjA1NTggODUsODVjMCw0Ni45NDQyIC0zOC4wNTU4LDg1IC04NSw4NWMtNDYuOTQ0MiwwIC04NSwtMzguMDU1OCAtODUsLTg1eiIgc3Ryb2tlLXdpZHRoPSI0Ii8+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6ODc6ODctLT4=";
      center_inf.alt = "";
      center_inf.style = `
        position:fixed;
        width:50vw;
        height:50vw;
        transform: translate(-50%,-50%);
        top:50vh;
        left:50vw;
        z-index:-100;
        animation-name: show;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-iteration-count: initial;
      `;
      document.body.append(center_inf);
      break;
    case "wave":
      const drop = () => {
        const wave = document.createElement("div");
        wave.innerHTML = `
          <svg
            viewBox="0 0 100 100"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <defs>
              <style>
                .drop{
                  fill:var(--color);
                  stroke:none;
                  fill-opacity: 0;
                }
                .wave{
                  stroke:var(--color);
                  stroke-width: 0;
                }
              </style>
            </defs>
            <g>
              <circle cx="50" cy="50" r="40" class="drop">
                <animate
                  attributeType="XML"
                  attributeName="r"
                  calcMode="spline"
                  values="40; 0; 0"
                  keyTimes="0.0; 0.5; 1.0"
                  keySplines="0.5 0 0.5 1; 0.5 0 0.5 1"
                  dur="2s"
                  repeatCount="1"
                />
                <animate
                  attributeType="XML"
                  attributeName="fill-opacity"
                  calcMode="spline"
                  values="0; 1; 0"
                  keyTimes="0.0; 0.5; 1.0"
                  keySplines="0.5 0 0.5 1; 0.5 0 0.5 1"
                  dur="2s"
                  repeatCount="1"
                />
              </circle>
              <circle cx="50" cy="50" r="40" class="wave">
                <animate
                  attributeType="XML"
                  attributeName="r"
                  calcMode="spline"
                  values="0; 0; 40"
                  keyTimes="0.0; 0.5; 1.0"
                  keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
                  dur="2s"
                  repeatCount="1"
                />
                <animate
                  attributeType="XML"
                  attributeName="stroke-width"
                  calcMode="spline"
                  values="0; 5; 0"
                  keyTimes="0.0; 0.5; 1.0"
                  keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
                  dur="2s"
                  repeatCount="1"
                />
              </circle>
            </g>
          </svg>
        `;
        wave.style =
          `
          position:fixed;
          width:var(--size);
          height:var(--size);
          z-index:-1000;
          transform:translate(-50%,-50%);
          --color:` +
          "hsl(" +
          Math.random().toString() +
          `turn 100% 50%);
          --size:` +
          (40 * (1 - 0.9 * Math.random())).toString() +
          `vmin;
        `;
        wave.style.top = (100 * Math.random()).toString() + "vh";
        wave.style.left = (100 * Math.random()).toString() + "vw";
        document.body.append(wave);
        setTimeout(() => {
          wave.remove();
          drop();
        }, 2000);
      };
      for (let drop_count = 0; drop_count < 10; drop_count++) {
        drop();
      }
      break;
    default:
      break;
  }
};
```

## やってみた感想

かなり作るのが難しかったです。
と言いますのも、最初は全てJavaScriptでやろうと思っていたのですが、
余りにも面倒臭いのと、処理が重過ぎるのとで、画像をペチペチ貼りながらやろうと思った次第です。

# date: 2024/07/23