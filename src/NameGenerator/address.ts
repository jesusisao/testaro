import kenData from './kenAll.json';
const kenList = kenData as Array<KenAddress>
const kenLength = kenList.length

export type Address = {
  "postalCode": string,
  "prefectureKana": string,
  "cityKana": string,
  "townAreaKana": string,
  "prefecture": string,
  "city": string,
  "townArea": string,
  "houseNumber": string
}

export type KenAddress = {
  "postalCode": string,
  "prefectureKana": string,
  "cityKana": string,
  "townAreaKana": string,
  "prefecture": string,
  "city": string,
  "townArea": string
}

export const generateRandomAddress = (): Address => {
  const index = Math.floor(Math.random() * kenLength);
  const result = kenList[index]
  if (result.townArea === '') {
    // 町域が空のデータにあたってしまったらもう一回ガチャを回す
    return generateRandomAddress();
  }
  return { ...kenList[index], "houseNumber": generateRandomHouseNumber() };
}

const generateRandomHouseNumber = (): string => {
  const branchNum = Math.floor(Math.random() * 2) + 1;
  const li: string[] = []
  for (let i = 0; i < branchNum + 1; i++) {
    li.push(toFullWidth(Math.floor(Math.random() * 19) + 1))
  }
  return li.join('ー')
}

// 半角数字を全角数字へ変換
const toFullWidth = (num: number) => {
  const str = num.toString();
  return str.replace(/./g, s => {
    return String.fromCharCode(s.charCodeAt(0) + 0xfee0)
  })
}
