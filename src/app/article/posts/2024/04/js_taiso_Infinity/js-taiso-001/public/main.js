//
// JS体操 No. 1
//
// 黒い実線が赤い点線のガイドとぴったり重なるように f.js を編集してください♪
// f.js のみを（なるべく少ない文字数で）編集してください♪
// その他のファイルは変更しないでください♪
//
import f from './f.js';
import graph from './graph.js';

graph.clear();
graph.guide('guide.bin');
graph.draw(f);

const { length } = await fetch('f.js')
  .then((res) => res.text())
  .then((str) => str.trim());

console.log(
  `%cJS体操 No. 1\n%c${length}%c文字\n%cpowered by 面白法人カヤック`,
  'font-weight:bold;font-size:200%;',
  'font-weight:bold;font-size:800%;color:#0af;',
  'font-size:100%;',
  'font-weight:bold;font-size:100%;color:#fc6;',
);
