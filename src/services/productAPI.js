const token = "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";
export const productRequest = async () => await fetch(`https://teknasyon.netlify.app/.netlify/functions/products`, {
  headers: {
    "X-Access-Token": `${token}`,
  },
}).then(val => val.json())