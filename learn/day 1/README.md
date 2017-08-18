## 题目要求
题目就是从我的 JSON 文件, `example.json` 中读取出需要的数据, 然后求和.
但是我不希望你写这一题的方式还是用那么多 `for` 循环写的, 可以的话, 尽量越少越好. 
但是我知道有些函数你可能不知道很难做到一行解决, 但是尽量吧.

答案我已经写好了, 但是加密了. 你只要把下面的代码运行就能获得我的答案
```js
const fs = require('fs');
const crypto = require('crypto');
const decipher = crypto.createDecipher('aes192', key);
const input = fs.createReadStream('answer.key');
const output = fs.createWriteStream('answer.js');
input.pipe(decipher).pipe(output);
``
其中 第三行的 key 是密钥, 这里我设置为 `qyy da sha bi!`
