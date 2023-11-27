import { inquiererMenu, leerIntput } from './helpers/inquirer.js'
const main = async () => {
  const text = await leerIntput('Lo que sea')
  console.log(text)
}
main()
