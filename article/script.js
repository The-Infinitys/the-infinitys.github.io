const recommendArticles = async () => {
  const article_list = document.querySelector(".article-list-main");
  article_list.innerHTML = "";
  article_info_datas = [];
  const loading_img_src="../image/loading-next.svg";
  const add_article_button = (article_info) => {
    const article_button = document.createElement("button");
    const article_root_path =
      "../article-" +
      article_info.year.toString() +
      "/" +
      (article_info.month + 1).toString().padStart(2, "0") +
      "/" +
      article_info.id +
      "/";
    article_button.onclick = () => {
      window.location.href = article_root_path;
    };
    const thumbnail = new Image();
    thumbnail.alt = article_info.id;
    if (article_info.thumbnail == "") {
      thumbnail.src = loading_img_src;
    } else {
      thumbnail.src = article_root_path + article_info.thumbnail;
    }
    const loading = new Image();
    loading.src = loading_img_src;
    loading.alt = "";
    const title = document.createElement("div");
    title.innerHTML =
      "<h1>" + article_info.title + "</h1><p>date: " + article_info.date;
    article_button.append(loading);
    article_button.append(thumbnail);
    article_button.append(title);
    article_list.append(article_button);
  };
  for (
    let year_count = new Date().getFullYear();
    year_count >= 2024;
    year_count--
  ) {
    for (let month_count = 0; month_count < 12; month_count++) {
      const list_path =
        "../article-" +
        year_count.toString() +
        "/" +
        (1 + ((12 - month_count) % 12)).toString().padStart(2, "0") +
        "/articles.json";
      await fetch(list_path)
        .then((res) => res.json())
        .then((article_data) => {
          const datas = article_data.articles;
          datas.forEach((article_info) => {
            article_info.month = (12 - month_count) % 12;
            article_info.year = year_count;
            add_article_button(article_info);
          });
        });
    }
  }
};
recommendArticles();

const searchArticles = (query) => {
  const article_list = document.querySelector(".article-list-main");
  const word_search = () => {
    const words = query.toLowerCase().replace("　", " ").split(" ");
    for (let i = 0; i < article_list.children.length; i++) {
      const button = article_list.children[i];
      const title = button.children[2].children[0].innerHTML.toLowerCase();
      let contains = true;
      words.forEach((word) => {
        if (!title.includes(word)) {
          contains = false;
        }
      });
      if (contains) {
        button.style.display = "";
      } else {
        button.style.display = "none";
      }
    }
  };
  const date_search = () => {
    const date = query;
    for (let i = 0; i < article_list.children.length; i++) {
      const button = article_list.children[i];
      const button_date = button.children[2].children[1].innerHTML;
      if (button_date.startsWith(date)) {
        button.style.display = "";
      } else {
        button.style.display = "none";
      }
    }
  };
  if (query.startsWith("date: ")) {
    date_search();
  } else {
    word_search();
  }
};
