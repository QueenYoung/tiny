const fs = require('fs');
const readFile = require('util').promisify(fs.readFile);

async function yourAnswer(path) {
  try {
    // 这个 data 就是读取到的文件的内容, 字符串
    let data = await readFile(path, 'utf8');
    // 在下面做你要做的事情.


    // 最后的返回值就是结果. 比如 return sum
  } catch (err) {
    console.log(err);
  }
}
const path = './exmaple.json';
// 最后的结果这样读取
yourAnswer().then(sum => console.log(sum));
