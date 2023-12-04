export const countCorrectCharacters = (text: string, input: string) => {
  const tc = text.replace(" ", "")
  const ic = input.replace(" ", "")
  return ic.split("").filter((c, i) => c !== tc[i]).length
}
