declare module "ethiopic-js"{
  declare const toEthiopic: (jy: number, jm: number, jd: number) => [number, number, number]
  declare const toGregorian: (jy: number, jm: number, jd: number) => [number, number, number]
  declare const isValidEthiopicDate: (jy: number, jm: number, jd: number) => boolean
  declare const isLeapEthiopicYear: (jy: number) => boolean

  export { toEthiopic, toGregorian, isValidEthiopicDate, isLeapEthiopicYear }
}
