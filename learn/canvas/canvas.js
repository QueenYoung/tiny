import pic from './pic.jpg';
let c = document.querySelector('canvas');
let ctx = c.getContext('2d');
let image = new Image();

const makePixelGray = ([r, g, b]) => {
  const y = 0.3 * r + 0.59 * g + 0.11 * b;
  return y;
};

image.onload = () => {
  console.log('Loaded Image.');
  ctx.drawImage(image, 0, 0, 300, 300);

  ctx.font = '36px Impact';
  ctx.strokeStyle = 'black';
  ctx.fillStyle = 'white';
  ctx.lineWidth = 2;
  const text = 'canvas memes';
  ctx.fillText(text.toUpperCase(), 100, 100);
  ctx.strokeText(text.toUpperCase(), 100, 100);

  const imgData = ctx.getImageData(0, 0, c.width, c.height);
  let length = imgData.data.length;

  length /= 4;
  const { data } = imgData.data;
  for (let i = 0; i < length; i++) {
    // imgData.data[i * 4] = 0;
    // imgData.data[i * 4 + 1] = 0xff;
    // imgData.data[i * 4 + 2] = 0;
    const gray = makePixelGray(
      imgData.data.subarray(i * 4, i * 4 + 3)
    );
    imgData.data[i * 4] = gray;
    imgData.data[i * 4 + 1] = gray;
    imgData.data[i * 4 + 2] = gray;
    imgData.data[i * 4 + 3] = gray;
  }
  ctx.putImageData(imgData, 0, 0);

};

image.src = pic;

ctx.strokeStyle = 'blue';
ctx.moveTo(10, 400);
let start;
function progress(x) {
  start = start || x;
  const diff = x - start;
  if (diff < 5000) {
    ctx.lineTo(400 * diff / 5000, 400);
    ctx.stroke();
    requestAnimationFrame(progress);
  } 
}

requestAnimationFrame(progress);