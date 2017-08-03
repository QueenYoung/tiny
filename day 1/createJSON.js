const fs = require('fs');
const writeFile = require('util').promisify(fs.writeFile);

let names = [
  'Zena',
  'Shania',
  'Effie',
  'Rosendo',
  'Ava',
  'Jerod_OKeefe',
  'Isom95',
  'Vicente_Barton'
];

let nums = Array(64).fill(0).map(() => ~~(Math.random() * (1 << 10)));
let emails = [
  'Llewellyn.Leannon15@example.com',
  'Clinton_Blick@example.com',
  'Audreanne96@example.net',
  'Raul2@example.net',
  'Bernardo11@example.net',
  'Norris.Kunze12@example.org'
];

let obj = {};
names.forEach(name => {
  obj[name] = {};
  obj[name].num = nums[~~(Math.random() * 64)];
  obj[name].emails = emails[~~(Math.random() * 6)];
});

writeFile('./exmaple.json', JSON.stringify(obj, null, 2))
  .then(() => console.log('success'))
  .catch(err => console.log(err));
