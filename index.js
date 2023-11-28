import { inquiererMenu, leerIntput, listarLugares, pause } from './helpers/inquirer.js'
import Busquedas from './models/busquedas.js'
const main = async () => {
  const busquedas = new Busquedas
  var opt = 0
  do {
    console.clear()
    opt = await inquiererMenu()
    switch (opt) {
      case 1:
        var term = await leerIntput('Que lugar deseas buscar?: ')
        //Seleccionar el lugar
        const lugares = await busquedas.ciudad(term)
        const id = await listarLugares(lugares)
        if (id === 0) continue
        const { nombre, lng, lat } = lugares.find(lugar => id == lugar.id)
        busquedas.agregarHistorial(nombre)
        //Clima
        const { description, min, max, temp } = await busquedas.getClima(lat, lng)
        //Mostrat resultados
        console.clear()
        console.log('\nInformacion de la ciudad'.magenta)
        console.log('Ciudad: ', nombre.yellow)
        console.log('Longitud', lng)
        console.log('Latitud', lat)
        console.log('Informacion de la temperatura'.blue)
        console.log('Actual: ', temp)
        console.log('Descripcion del clima: ', description)
        console.log('Minimas: ', min)
        console.log('Max', max)
        //Agregar al historial
        break
      case 2:
        busquedas.capitilize.forEach((lugar, idx) => console.log(`${idx + 1}. `.green + `${lugar}`))
        break
    }
    await pause()
  } while (opt != 0)
}
main()
