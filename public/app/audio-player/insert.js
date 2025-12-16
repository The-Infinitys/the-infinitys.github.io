// 楽曲投稿に使うやつです。
const generate_audio_player = () => {
  const inf_audio_elem = document.querySelector("inf-audio");
  if (inf_audio_elem == null) {
    return;
  }
  const audio_player = document.createElement("iframe");
  const result_url = `/app/audio-player/index.html?audio=${encodeURI(
    inf_audio_elem.getAttribute("data-audio"),
  )}&img=${encodeURI(
    inf_audio_elem.getAttribute("data-img"),
  )}&title=${encodeURI(inf_audio_elem.getAttribute("data-title"))}`;
  audio_player.src = result_url;
  inf_audio_elem.append(audio_player);
};
generate_audio_player();
