const controller = document.querySelector("div.control");
const audio = document.querySelector("#audio");
const get_audio_url = () => {
  const default_audio =
    "https://develop.the-infinitys.f5.si/article-2024/09/through-infinity/Through-Infinity.mp3";
  const param_audio = new URLSearchParams(document.location.search).get("audio");
  return param_audio == null ? default_audio : param_audio;
};
audio.src = get_audio_url();
const add_bg = () => {
  const get_image_url = () => {
    const default_img = "https://develop.the-infinitys.f5.si/image/The-Infinitys.webp";
    const param_img = new URLSearchParams(document.location.search).get("img");
    return param_img == null ? default_img : param_img;
  };
  const jacket = document.createElement("img");
  jacket.src = get_image_url();
  jacket.className = "jacket";
  jacket.setAttribute("crossorigin", "anonymous");
  controller.prepend(jacket);
  const bg = document.createElement("img");
  bg.src = get_image_url();
  bg.className = "bg";
  bg.setAttribute("crossorigin", "anonymous");
  document.body.prepend(bg);
};
add_bg();
const set_title = () => {
  const default_title = "Though Infinity (The Infinity's) ";
  const param_title = new URLSearchParams(document.location.search).get("title");
  document.querySelector("h1.music-title").innerHTML =
    param_title == null ? default_title : param_title;
};
set_title();
let already_inited = false;
const containerElement = document.querySelector(".container");
const FFT_SIZE = 64;
function init_container() {
  containerElement.innerHTML = "";
  for (let i = 0; i < FFT_SIZE / 2; i++) {
    const div = document.createElement("div");
    div.classList.add("box");
    containerElement.append(div);
  }
}
init_container();
function init() {
  if (already_inited) {
    return;
  }
  already_inited = true;
  const boxes = containerElement.children;
  const context = new AudioContext();
  // アナライザーを生成
  const nodeAnalyser = context.createAnalyser();
  // フーリエ変換を行う分割数。2の乗数でなくてはならない
  nodeAnalyser.fftSize = FFT_SIZE;
  // 0～1の範囲でデータの動きの速さ 0だともっとも速く、1に近づくほど遅くなる
  nodeAnalyser.smoothingTimeConstant = 0.8;
  // オーディオの出力先を設定
  nodeAnalyser.connect(context.destination);
  // audio 要素と紐付ける
  const nodeSource = context.createMediaElementSource(audio);
  nodeSource.connect(nodeAnalyser);
  function loop() {
    const freqByteData = new Uint8Array(FFT_SIZE / 2);
    nodeAnalyser.getByteFrequencyData(freqByteData);
    for (let i = 0; i < freqByteData.length; i++) {
      const freqSum = freqByteData[i];
      const scale = freqSum / 256;
      const div = boxes[i];
      div.style.scale = `1 ${scale * 0.99 + 0.01}`;
    }
    requestAnimationFrame(loop);
  }
  loop();
}
audio.addEventListener("play", init);
