const insert_musics = () => {
  const data = [];
  for (let i = 0; i < data.length; i++) {
    const elem = document.createaElement("inf-audio");
    elem.setAttribute("data-audio", data[i].audio);
    elem.setAttribute("data-img", data[i].img);
    elem.setAttribute("data-title", data[i].title);
    document.querySelector("section.music-list").append(elem);
  }
};
