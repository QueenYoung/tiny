const urls = [1, 2, 3, 4, 5, 6];
function logInOrder(urls) {
  const textPromises = urls.map(url => Promise.resolve(url));

  textPromises.reduce((chain, textPromises) => (
    chain.then(() => textPromises).then(text => console.log(text))
  ), Promise.resolve());
}

async function alogInOrder(urls) {
  const textPromises = urls.map(async url => {
    const res = await Promise.resolve(url);
    return res;
  });
  for (const textPromise of textPromises) {
    console.log(await textPromise);
  }
}
alogInOrder(urls);