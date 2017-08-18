const audioCtx = new AudioContext();
let source = audioCtx.createBufferSource();
import audio from './01 Autumn.m4r';
function getData() {
  fetch(audio, {
    headers: new Headers({'Response-Type': 'arraybuffer'})
  })
    .then(res => res.arrayBuffer())
    .then(buffer => audioCtx.decodeAudioData(buffer))
    .then(decodedData => {
      source.buffer = decodedData;
      source.connect(audioCtx.destination);
    })
    .then(() => source.start())
    .catch(err => console.log(err));
}
getData();
// 使用这个方法能获得当前进度
let interval = setInterval(() => {
  let progress = source.context.currentTime / source.buffer.duration;
  console.log(progress);
  if (progress >= 1) clearInterval(interval);
}, 1000);
