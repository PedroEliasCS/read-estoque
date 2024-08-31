interface randomProps<T> {
  choises: T[];
}

export default function random<T>({ choises }: randomProps<T>): T {
  const choisesLength = choises.length;
  if (choisesLength === 0) throw new Error("choises is empty");

  const select = Math.floor(Math.random() * choisesLength);

  const selectChoise = choises[select];
  console.log({
    select,
    selectChoise,
  });
  return selectChoise;
}
