---
title: 
date: ""
description: ""
---

# title: Scratch Comment emulatorを作ってみた！

Scratchでコメントをした際にどのように表示されるのかをエミュレートするプログラムを作りました。ご自由にお使いください。

### for users
```javascript
alert("Scratch comment emulator");
if (window.location.href.startsWith("https://scratch.mit.edu/users/")) {
  var comment_box = document.createElement("div");
  comment_box.id = Math.floor(Math.random() * 10 ** 10);
  comment_box.className = "comment";
  var actions_warp = document.createElement("div");
  actions_warp.className = "actions-wrap";
  actions_warp.innerHTML = '<span data-control="delete" class="actions report">Delete</span>\n<span data-control="report" class="actions report"> 報告 </span>';
  comment_box.append(actions_warp);
  const comment_user_a = document.createElement("a");
  const comment_username = prompt("user: ");
  comment_user_a.href = "/users/" + comment_username;
  const comment_image = document.createElement("img");
  comment_image.className = "avatar";
  fetch("https://api.scratch.mit.edu/users/" + comment_username)
    .then(res => res.json())
    .then(data => {
      comment_image.src = data.profile.images["60x60"];
      comment_image.alt = comment_username;
    })
    .catch(err => alert("error: " + err));
  comment_image.width = 45;
  comment_image.height = 45;
  comment_user_a.append(comment_image);
  comment_box.append(comment_user_a);
  const comment_info = document.createElement("div");
  comment_info.className = "info";
  comment_info.innerHTML = '<div class="name">\n<a href="/users/' + comment_username + '">' + comment_username + '</a>\n</div>';
  comment_content = document.createElement("div");
  comment_content.className = "content";
  comment_content.innerHTML = prompt("text: ");
  comment_info.append(comment_content);
  const comment_info_other = document.createElement("div");
  comment_info_other.innerHTML = `
<div>
<span class="time" title="made by The Infinity's">1 minute ago</span>
<a
  class="reply"
  style="display: inline;"
  data-comment-id="1234567890"
  data-parent-thread="1234567890"
  data-commentee-id="1234567890"
  data-control="reply-to">
  <span>Reply</span>
</a>
</div>
<div data-content="reply-form"></div>
`;
  comment_info.append(comment_info_other);
  comment_box.append(comment_info);
  const comment_li = document.createElement("li");
  comment_li.className = "top-level-reply";
  comment_li.append(comment_box);
  const comment_ul = document.createElement("ul");
  comment_ul.className = "replies";
  comment_li.append(comment_ul);
  document.querySelector("ul.comments").prepend(comment_li);
  /*
  <div id="comments-1234567890" class="comment" data-comment-id="335898053">
    <div class="actions-wrap">
      <span data-control="delete" class="actions report">Delete</span>
      <span data-control="report" class="actions report"> 報告 </span>
    </div>
    <a href="/users/michinsk" id="comment-user" data-comment-user="michinsk"
      ><img
        class="avatar"
        src="//cdn2.scratch.mit.edu/get_image/user/89663687_60x60.png"
        width="45"
        height="45"
    /></a>
    <div class="info">
      <div class="name">
        <a href="/users/michinsk">michinsk</a>
      </div>
      <div class="content">icon変わりましたね。このアイコン不思議です</div>
      <div>
        <span class="time" title="June 23, 2024">about 5 hours ago</span>
  
        <a
          class="reply"
          style="display: inline;"
          data-comment-id="335898053"
          data-parent-thread="335898053"
          data-commentee-id="89663687"
          data-control="reply-to">
          <span>Reply</span>
        </a>
      </div>
      <div data-content="reply-form"></div>
    </div>
  </div>
  */
} else if (
  window.location.href.startsWith("https://scratch.mit.edu/projects/")
) {
  var comment_box = document.createElement("div");
  comment_box.id = Math.floor(Math.random() * 10 ** 10);
  comment_box.className = "flex-row comment";
  const comment_user_a = document.createElement("a");
  const comment_username = prompt("user: ");
  comment_user_a.href = "/users/" + comment_username;
  const comment_image = document.createElement("img");
  comment_image.className = "avatar";
  fetch("https://api.scratch.mit.edu/users/" + comment_username)
    .then(res => res.json())
    .then(data => {
      comment_image.src = data.profile.images["60x60"];
      comment_image.alt = comment_username;
    })
    .catch(err => alert("error: " + err));
  comment_image.width = 45;
  comment_image.height = 45;
  comment_user_a.append(comment_image);
  comment_box.append(comment_user_a);
  const comment_bubble = document.createElement("div");
  comment_bubble.className = "comment-bubble";
  const comment_content = document.createElement("span");
  comment_content.innerHTML = '<span class="emoji-text">' + prompt("text") + '</span>';
  const comment_bottom = document.createElement("div");
  comment_bottom.className="flex-row comment-bottom-row";
  comment_bottom.innerHTML = '<span class="comment-time"><span>' + prompt("date(examples 「4 時間前」、「1 分前」...): ") + '</span></span><span class="comment-reply"><span>返信</span></span>';
  comment_bubble.append(comment_content);
  comment_bubble.append(comment_bottom);
  const comment_body = document.createElement("div");
  comment_body.className = "flex-row comment-body column";
  comment_body.innerHTML = '<div class="flex-row comment-top-row"><a class="username" href="/users/' + comment_username + '">' + comment_username + '</a><div class="action-list"></div></div>';
  comment_body.append(comment_bubble);
  comment_box.append(comment_body);
  const comment_container = document.createElement("div");
  comment_container.className = "flex-row comment-container";
  comment_container.append(comment_box);
  document.querySelector(".comments-list").prepend(comment_container);

  /*
  <div class="flex-row comment-container">
    <div class="flex-row comment" id="comments-411231997">
      <a href="/users/Nhienzcute"
        ><img
          class="avatar"
          src="https://cdn2.scratch.mit.edu/get_image/user/133904533_60x60.png"
      /></a>
      <div class="flex-row comment-body column">
        <div class="flex-row comment-top-row">
          <a class="username" href="/users/Nhienzcute"
            >Nhienzcute</a
          >
          <div class="action-list"></div>
        </div>
        <div class="comment-bubble">
          <span class="comment-content"
            ><span class="emoji-text"
              >dare you search "nhienzcute" on google</span
            ></span
          >
          <div class="flex-row comment-bottom-row">
            <span class="comment-time"
              ><span>4 時間前</span></span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
  */
} else {
  alert("対応していません")
}
```

# date: 2024/07/02