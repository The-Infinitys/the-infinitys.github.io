const PADDING = 60;
const WIDTH = 480;
const HEIGHT = 480;
const RESOLUTION = 2;

const BLUE = '#0af';
const RED = '#f36';
const GRAY = '#eee';
const BLACK = '#333';

const iw = WIDTH * RESOLUTION;
const ih = HEIGHT * RESOLUTION;
const ow = PADDING * 2 + iw;
const oh = PADDING * 2 + ih;

const cvs = document.createElement('canvas');
const ctx = cvs.getContext('2d');
const sty = document.createElement('style');

cvs.style.cssText += `width:${WIDTH}px;height:${HEIGHT}px;`;
sty.textContent = `
html, body {
  height: 100%;
}
body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  background-color: #ccc;
}
canvas {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .1);
}
`;
document.head.append(sty);
document.body.append(cvs);

const promises = [];

//////////////////////////////////////////////

export default {
  clear,
  guide,
  draw,
};

/////////////////////////////////////////////////

function clear() {
  promises.length = 0;

  cvs.width = ow;
  cvs.height = oh;

  ctx.save();
  ctx.fillStyle = GRAY;
  ctx.fillRect(0, 0, ow, oh);
  ctx.fillStyle = BLUE;
  ctx.strokeStyle = BLUE;
  transform();
  drawAxes();
  drawNumbers();
  ctx.restore();
}

function guide(url) {
  promises.push(
    Promise.all([...promises]).then(() =>
      fetch(url)
        .then((res) => res.arrayBuffer())
        .then((bin) => {
          ctx.save();
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.lineWidth = 2;
          ctx.strokeStyle = RED;
          ctx.setLineDash([8, 4]);
          transform();
          drawArray(new Float32Array(bin));
          ctx.restore();
        }),
    ),
  );
}

function draw(f) {
  Promise.all([...promises]).then(() => {
    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 3;
    ctx.strokeStyle = BLACK;
    transform();
    drawArray(float32(f));
    ctx.restore();
  });
}

/////////////////////////////////////////////////

function transform() {
  ctx.transform(1, 0, 0, -1, PADDING, ih + PADDING);
}

function drawAxes() {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(0, ih);
  ctx.lineTo(0, 0);
  ctx.lineTo(iw, 0);
  ctx.stroke();
  ctx.globalAlpha = 0.4;
  ctx.beginPath();
  ctx.moveTo(iw / 2, 0);
  ctx.lineTo(iw / 2, ih);
  ctx.moveTo(0, ih / 2);
  ctx.lineTo(iw, ih / 2);
  ctx.stroke();
  ctx.globalAlpha = 0.3;
  ctx.beginPath();
  for (let x = iw / 10; x <= iw; x += iw / 10) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, ih);
  }
  for (let y = ih / 10; y <= ih; y += ih / 10) {
    ctx.moveTo(0, y);
    ctx.lineTo(iw, y);
  }
  ctx.stroke();
  ctx.globalAlpha = 0.1;
  ctx.beginPath();
  for (let x = iw / 20; x <= iw; x += iw / 10) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, ih);
  }
  for (let y = ih / 20; y <= ih; y += ih / 10) {
    ctx.moveTo(0, y);
    ctx.lineTo(iw, y);
  }
  ctx.stroke();
  ctx.restore();
}

function drawNumbers() {
  ctx.save();
  ctx.font = '16px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (let x = 0; x <= iw; x += iw / 10) {
    ctx.save();
    ctx.transform(1, 0, 0, -1, x, 0);
    ctx.fillText((x / iw).toFixed(1), 0, 18);
    ctx.restore();
  }
  ctx.textAlign = 'right';
  for (let y = ih / 10; y <= ih; y += ih / 10) {
    ctx.save();
    ctx.transform(1, 0, 0, -1, 0, y);
    ctx.fillText((y / ih).toFixed(1), -14, 0);
    ctx.restore();
  }
  ctx.restore();
}

function drawArray(arr) {
  const len = arr.length;

  let i = 0;

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(arr[i++] * iw, arr[i++] * ih);
  while (i < len) {
    ctx.lineTo(arr[i++] * iw, arr[i++] * ih);
  }
  ctx.stroke();
  ctx.restore();
}

/**
 *  @param {(x: number) => number} f
 *  @return {Float32Array}
 */
function float32(f) {
  const arr = [];
  const len = 1000000;

  for (let i = 0; i <= len; ++i) {
    const x = i / len;

    arr.push(x, f(x));
  }

  return new Float32Array(arr);
}
