scratch_comment_emulator = {
  elem: {
    source: {
      html: `
    <h1>Scratch Comment Emulator()</h1>
    <label for="usersname">username<input id="sce-username" type="text" /></label>
    <label for="messages">messages <textarea id="sce-messages"></textarea></label>
    <label for="date">date <input id="sce-date" type="text" /></label>
    <label for="position">position <input id="sce-position" type="text"></label>
    <label for="is-reply">reply <input id="sce-is-reply" type="checkbox" /></label>
    <label for="reply-pos">reply pos <input type="text" id="sce-reply-pos" /></label>
    <button id="sce-send">send</button>
    `,
      css: `
    .sce-box {
      z-index:66666;
      font-family: Arial, Helvetica, sans-serif;
      position: fixed;
      width: 50vw;
      right: 0;
      top: 0;
      height: 100vh;
      background-color: #80f;
      color: #ff0;
      padding: 0%;
    }
    #sce-hide {
      z-index:6666666;
      position: fixed;
      width: 10vw;
      top:0;
      right:0;
      border-radius: 0;
      color: #ff0;
      font-size: 3vw;
      background-color: #80f;
      border: 1px solid #ff0;
    }
    .sce-box>h1 {
      margin: 0;
      margin-top:10vh;
      border: 1px solid #ff0;
      width: 100%;
      font-size: 3vw;
    }
    .sce-box input,
    .sce-box textarea {
      font-size: 2vh;
      width: 100%;
      border-radius: 0;
      background-color: black;
      color: white;
      border: 1px solid #ff0;
    }
    #sce-messages {
      height: 30vh;
    }
    #sce-send {
      font-size: 2vh;
      width: 100%;
      border-radius: 0;
      color: #ff0;
      background-color: #80f;
      border: 1px solid #ff0;
    }
    `,
    },
  },
  init: () => {
    const sce_div = document.createElement("div");
    sce_div.className = "sce-box";
    sce_div.innerHTML = scratch_comment_emulator.elem.source.html;
    const sce_style = document.createElement("style");
    sce_style.innerHTML = scratch_comment_emulator.elem.source.css;
    document.body.append(sce_div);
    document.body.append(sce_style);
    const sce_hide = document.createElement("button");
    sce_hide.innerHTML = "x";
    sce_hide.id = "sce-hide";
    document.body.append(sce_hide);
  },
  send_comment: (username, text, date, pos, is_reply, reply_pos) => {
    if (pos == "") {
      pos = "0";
    }
    if (window.location.href.startsWith("https://scratch.mit.edu/users/")) {
      var comment_box = document.createElement("div");
      comment_box.id = Math.floor(Math.random() * 10 ** 10);
      comment_box.className = "comment";
      var actions_warp = document.createElement("div");
      actions_warp.className = "actions-wrap";
      actions_warp.innerHTML =
        '<span data-control="delete" class="actions report">Delete</span>\n<span data-control="report" class="actions report"> 報告 </span>';
      comment_box.append(actions_warp);
      const comment_user_a = document.createElement("a");
      const comment_username = username;
      comment_user_a.href = "/users/" + comment_username;
      const comment_image = document.createElement("img");
      comment_image.className = "avatar";
      fetch("https://api.scratch.mit.edu/users/" + comment_username)
        .then((res) => res.json())
        .then((data) => {
          comment_image.src = data.profile.images["60x60"];
          comment_image.alt = comment_username;
        })
        .catch((err) => alert("error: " + err));
      comment_image.width = 45;
      comment_image.height = 45;
      comment_user_a.append(comment_image);
      comment_box.append(comment_user_a);
      const comment_info = document.createElement("div");
      comment_info.className = "info";
      comment_info.innerHTML =
        '<div class="name">\n<a href="/users/' +
        comment_username +
        '">' +
        comment_username +
        "</a>\n</div>";
      comment_content = document.createElement("div");
      comment_content.className = "content";
      comment_content.innerHTML = text;
      comment_info.append(comment_content);
      const comment_info_other = document.createElement("div");
      comment_info_other.innerHTML =
        `
      <div>
      <span class="time" title="made by The Infinity's">` +
        date +
        `</span>
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
      if (is_reply) {
        comment_li.className = "reply";
      } else {
        comment_li.className = "top-level-reply";
      }
      comment_li.append(comment_box);
      const comment_ul = document.createElement("ul");
      comment_ul.className = "replies";
      comment_li.append(comment_ul);
      if (is_reply) {
        const target =
          document.querySelector("ul.comments").children[pos].children[1];
        target.insertBefore(comment_li, target.children[reply_pos]);
      } else {
        document
          .querySelector("ul.comments")
          .insertBefore(
            comment_li,
            document.querySelector("ul.comments").children[pos]
          );
      }
    } else if (
      window.location.href.startsWith("https://scratch.mit.edu/projects/") ||
      window.location.href.startsWith("https://scratch.mit.edu/studios/")
    ) {
      var comment_box = document.createElement("div");
      comment_box.id = Math.floor(Math.random() * 10 ** 10);
      comment_box.className = "flex-row comment";
      const comment_user_a = document.createElement("a");
      const comment_username = username;
      comment_user_a.href = "/users/" + comment_username;
      const comment_image = document.createElement("img");
      comment_image.className = "avatar";
      fetch("https://api.scratch.mit.edu/users/" + comment_username)
        .then((res) => res.json())
        .then((data) => {
          comment_image.src = data.profile.images["60x60"];
          comment_image.alt = comment_username;
        })
        .catch((err) => alert("error: " + err));
      comment_image.width = 45;
      comment_image.height = 45;
      comment_user_a.append(comment_image);
      comment_box.append(comment_user_a);
      const comment_bubble = document.createElement("div");
      comment_bubble.className = "comment-bubble";
      const comment_content = document.createElement("span");
      comment_content.innerHTML =
        '<span class="emoji-text">' + text + "</span>";
      const comment_bottom = document.createElement("div");
      comment_bottom.className = "flex-row comment-bottom-row";
      comment_bottom.innerHTML =
        '<span class="comment-time"><span>' +
        date +
        '</span></span><span class="comment-reply"><span>返信</span></span>';
      comment_bubble.append(comment_content);
      comment_bubble.append(comment_bottom);
      const comment_body = document.createElement("div");
      comment_body.className = "flex-row comment-body column";
      comment_body.innerHTML =
        '<div class="flex-row comment-top-row"><a class="username" href="/users/' +
        comment_username +
        '">' +
        comment_username +
        '</a><div class="action-list"></div></div>';
      comment_body.append(comment_bubble);
      comment_box.append(comment_body);
      const comment_container = document.createElement("div");
      comment_container.className = "flex-row comment-container";
      comment_container.append(comment_box);
      let root = null;
      if (new URL(window.location.href).pathname.endsWith("comments")) {
        root = document.querySelector(".studio-compose-container").children[1];
      } else {
        root = document.querySelector(".comments-list");
      }
      if (is_reply) {
        if (root.children[pos].children.length == 1) {
          const reply_container = document.createElement("div");
          reply_container.className = "flex-row replies column";
          root.children[pos].append(reply_container);
        }
        const target = root.children[pos].children[1];
        target.insertBefore(comment_container, target.children[reply_pos]);
      } else {
        root.insertBefore(comment_container, root.children[pos]);
      }
    } else {
      alert("対応していません");
    }
  },
};
scratch_comment_emulator.init();
document.querySelector("#sce-send").onclick = () => {
  const username = document.querySelector("#sce-username").value;
  const message = document.querySelector("#sce-messages").value;
  const date = document.querySelector("#sce-date").value;
  const pos = document.querySelector("#sce-position").value;
  const is_reply = document.querySelector("#sce-is-reply").checked;
  const reply_pos = document.querySelector("#sce-reply-pos").value;
  scratch_comment_emulator.send_comment(
    username,
    message,
    date,
    pos,
    is_reply,
    reply_pos
  );
};
document.querySelector("#sce-hide").addEventListener("click", () => {
  const sce_hide = document.querySelector("#sce-hide");
  if (sce_hide.style.opacity == 1) {
    document.querySelector(".sce-box").style.display = "none";
    sce_hide.style.opacity = 0;
  } else {
    document.querySelector(".sce-box").style.display = "";
    sce_hide.style.opacity = 1;
  }
});
