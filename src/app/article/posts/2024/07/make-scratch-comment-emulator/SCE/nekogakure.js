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
    <label for="reply-id">Comment ID <input type="text" id="sce-reply-id" /></label>
    <button id="sce-send">send</button>
    `,
      css: `
#sce-hide {
z-index:1000000;
position:fixed;
top:0;
right:0;
width:20px;
height:20px;
font-family: Arial, sans-serif;
background-color: #f9f9f9;
color:#333;
}
    .sce-box {
z-index:100000;
position:fixed;
top:0;
right:0;
width: 300px;
height:100vh;
margin: 20px auto;
padding: 20px;
border: 1px solid #ccc;
border-radius: 8px;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
font-family: Arial, sans-serif;
background-color: #f9f9f9;
}

.sce-box h1 {
font-size: 1.5em;
margin-bottom: 20px;
text-align: center;
color: #333;
}

.sce-box label {
display: block;
margin-bottom: 10px;
font-weight: bold;
color: #555;
}

.sce-box input[type="text"],
.sce-box textarea {
width: calc(100% - 22px);
padding: 10px;
margin-top: 5px;
margin-bottom: 15px;
border: 1px solid #ccc;
border-radius: 4px;
box-sizing: border-box;
}

.sce-box input[type="checkbox"] {
margin-right: 5px;
}

.sce-box button {
width: 100%;
padding: 10px;
background-color: #007bff;
border: none;
border-radius: 4px;
color: #fff;
font-size: 1em;
cursor: pointer;
}

.sce-box button:hover {
background-color: #0056b3;
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
      comment_box.className = "comment";
      var actions_warp = document.createElement("div");
      actions_warp.className = "actions-wrap";
      actions_warp.innerHTML =
        '<span data-control="report" class="actions report"> 報告 </span>';
      comment_box.append(actions_warp);
      const comment_user_a = document.createElement("a");
      const comment_username = username;
      const comment_id = document.querySelector("#sce-reply-id").value;
      comment_user_a.href = "/users/" + comment_username;
      const comment_image = document.createElement("img");
      let commentee_id = "";
      comment_image.className = "avatar";
      fetch("https://api.scratch.mit.edu/users/" + comment_username)
        .then((res) => res.json())
        .then((data) => {
          comment_image.src = data.profile.images["60x60"];
          comment_image.alt = comment_username;
          commentee_id = data.id.toString();
        })
        .catch((err) => alert("error: " + err));
      comment_box.id = "comments-"+comment_id;
      comment_box.setAttribute("data-comment-id",comment_id);
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
        data-comment-id="${comment_id}"
        data-parent-thread="${comment_id}"
        data-commentee-id="${commentee_id}"
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
