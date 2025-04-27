// X Editor
const parseHTML = (html) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  let formattedHTML = "";

  function formatNode(node, indent = 0) {
    const indentStr = " ".repeat(indent * 2);
    if (node.nodeType === Node.ELEMENT_NODE) {
      formattedHTML += `${indentStr}<${node.tagName.toLowerCase()}`;
      // 属性の追加
      for (const attr of node.attributes) {
        formattedHTML += ` ${attr.name}="${attr.value}"`;
      }
      formattedHTML += ">\n";
      for (const child of node.childNodes) {
        formatNode(child, indent + 1);
      }
      formattedHTML += `${indentStr}</${node.tagName.toLowerCase()}>\n`;
    } else if (node.nodeType === Node.TEXT_NODE) {
      if (node.parentNode.tagName.toLowerCase() === "pre") {
        // preタグ内のテキストは空白を保持
        formattedHTML += node.textContent;
      } else {
        // それ以外のテキストは空白をトリム
        formattedHTML += `${indentStr}${node.textContent.trim()}\n`;
      }
    }
  }

  formatNode(doc.body);
  return formattedHTML;
};
function compressHTML(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  let compressedHTML = "";
  function compressNode(node) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      compressedHTML += `<${node.tagName.toLowerCase()}`;
      for (const attr of node.attributes) {
        compressedHTML += ` ${attr.name}="${attr.value}"`;
      }
      compressedHTML += ">";
      for (const child of node.childNodes) {
        compressNode(child);
      }
      compressedHTML += `</${node.tagName.toLowerCase()}>`;
    } else if (node.nodeType === Node.TEXT_NODE) {
      if (node.parentNode.tagName.toLowerCase() === "pre") {
        // preタグ内のテキストは空白を保持
        compressedHTML += node.textContent;
      } else {
        // それ以外のテキストは空白を1つに圧縮
        compressedHTML += node.textContent.replace(/\s+/g, " ");
      }
    }
  }

  compressNode(doc.body);
  return compressedHTML.trim();
}

const timeline_div = document.querySelector(
  "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-kemksi.r-1kqtdi0.r-1ua6aaf.r-th6na.r-1phboty.r-16y2uox.r-184en5c.r-1c4cdxw.r-1t251xo.r-f8sm7e.r-13qz1uu.r-1ye8kvj > div > div:nth-child(3) > div > div > section > div > div"
);
const x_editor = {
  max: () => {
    const editor = document.querySelector("#x-editor");
    if (editor.style.width == "98%") {
      editor.style.width = "auto";
    } else {
      editor.style.width = "98%";
    }
  },
  hide: () => {
    const hide_button = document.querySelector("#x-editor-hide");
    const editor = document.querySelector("#x-editor");
    if (editor.style.display == "none") {
      editor.style.display = "";
      hide_button.style.opacity = "1";
    } else {
      editor.style.display = "none";
      hide_button.style.opacity = "0";
    }
  },
  copy_post_content: () => {
    const index = parseInt(
      document.querySelector('#x-editor>input[data-type="target_position"]')
        .value
    );
    timeline_div.prepend(timeline_div.children[index].importNode());
  },
  remove_post_content: () => {
    const index = parseInt(
      document.querySelector('#x-editor>input[data-type="target_position"]')
        .value
    );
    timeline_div.children[index].remove();
  },
  get_post_content: () => {
    const index = parseInt(
      document.querySelector('#x-editor>input[data-type="target_position"]')
        .value
    );
    const content = document.querySelector(
      '#x-editor>textarea[data-type="content"]'
    );
    content.value = timeline_div.children[index].innerHTML;
  },
  edit_post_content: () => {
    const index = parseInt(
      document.querySelector('#x-editor>input[data-type="target_position"]')
        .value
    );
    const content = document.querySelector(
      '#x-editor>textarea[data-type="content"]'
    );
    timeline_div.children[index].innerHTML = content.value
      .replace("&amp;", "&")
      .replace("&lt;", "<")
      .replace("&gt;", ">");
  },
};
const x_editor_source = {
  html: `
  <button id="x-editor-max">□</button>
  <h1>X Post Editor</h1>
  <p>target position</p>
  <input data-type="target_position" type="text" />
  <button data-type="target_position">get content</button>
  <p>content</p>
  <textarea data-type="content"></textarea><br />
  <button data-type="edit">edit</button><br />
  <button data-type="remove">remove</button><br />
  <button data-type="copy">copy</button>
  `,
  css: `
  #x-editor{
    padding:0;
    position:fixed;
    z-index:1000000;
    width:auto;
    height:100%;
    top:0;
    right:0;
    background-color:black;
    color:white;
    border:2px solid aqua;
    border-radius:10px 0 0 10px;
  }
  #x-editor-hide{
    text-align:center;
    padding:0;
    position:fixed;
    z-index:10000000;
    width:40px;
    height:24px;
    top:0;
    right:0;
    background-color:black;
    color:white;
    border:2px solid aqua;
  }
  #x-editor-max{
    text-align:center;
    font-weight:600;
    padding:0;
    position:fixed;
    z-index:10000000;
    width:40px;
    height:24px;
    top:0;
    right:40px;
    background-color:black;
    color:white;
    border:2px solid aqua;
    border-radius:0 0 0 10px;
  }
  #x-editor>input,
  #x-editor>button{
    background-color:black;
    color:white;
    border:2px solid aqua;
    border-radius:10px;
  }
  #x-editor>textarea{
    background-color:black;
    color:white;
    width:100%;
    height:50%;
    border:2px solid aqua;
  }
  `,
};
const init = () => {
  const main_css = document.createElement("style");
  main_css.innerHTML = x_editor_source.css;
  document.body.append(main_css);
  const main_html = document.createElement("div");
  main_html.innerHTML = x_editor_source.html;
  main_html.id = "x-editor";
  document.body.append(main_html);
  document
    .querySelector('#x-editor>button[data-type="target_position"]')
    .addEventListener("click", x_editor.get_post_content);
  document
    .querySelector('#x-editor>button[data-type="edit"]')
    .addEventListener("click", x_editor.edit_post_content);
  document
    .querySelector('#x-editor>button[data-type="remove"]')
    .addEventListener("click", x_editor.remove_post_content);
  document
    .querySelector('#x-editor>button[data-type="copy"]')
    .addEventListener("click", x_editor.copy_post_content);
  const hide_button = document.createElement("button");
  hide_button.innerHTML = "x";
  hide_button.id = "x-editor-hide";
  hide_button.addEventListener("click", x_editor.hide);
  document
    .querySelector("#x-editor-max")
    .addEventListener("click", x_editor.max);
  document.body.append(hide_button);
};
init();
