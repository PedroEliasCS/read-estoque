export default async function delay(s: number) {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve({});
    }, s * 1000);
  });
}
