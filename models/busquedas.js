import fs from 'fs'
import axios from 'axios'
export default class Busquedas {
  dbPath = './db/database.json'
  historial = []
  constructor() {
    //Todo: leer DB si existe
    this.leerDB()
  }
  get paramsMatbox () {
    return {
      'access_token': process.env.MAPBOX_KEY,
      'limit': 5,
      'language': 'es',
      'proximity': 'ip'
    }
  }
  async ciudad (lugar = '') {
    try {
      //peticion HTTP
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json?`,
        params: this.paramsMatbox
      })
      const { data } = await instance.get()
      return data.features.map(lugar => (
        {
          id: lugar.id,
          nombre: lugar.place_name,
          lng: lugar.center[0],
          lat: lugar.center[1],
        }
      ))
    } catch (err) {
      console.log(err)
      return [] // Retornar los lugares que coincidan
    }
  }
  async getClima (lat, lon) {
    try {
      const instance = axios.create({
        baseURL: 'http://api.openweathermap.org/data/2.5/weather',
        params: {
          lat,
          lon,
          "appid": process.env.OPEN_WEATHER_KEY,
          "units": "metric",
          "lang": "es"
        }
      })
      const { data } = await instance.get()
      return {
        description: data.weather[0].description,
        temp: Math.round(data.main.temp),
        min: Math.round(data.main.temp_min),
        max: Math.round(data.main.temp_max)
      }
    } catch (err) {
      console.log(err)
    }
  }
  agregarHistorial (lugar = '') {
    //Todo Prevenir duplicados
    if (this.historial.includes(lugar.toLocaleLowerCase())) {
      return
    }
    this.historial = this.historial.splice(0, 5)
    this.historial.unshift(lugar.toLocaleLowerCase())
    this.guardarBD()
    //Grabar en DB o Txt
  }
  guardarBD () {
    const payload = {
      historial: this.historial
    }
    fs.writeFileSync(this.dbPath, JSON.stringify(payload))

  }
  leerDB () {
    if (!fs.readFileSync(this.dbPath)) return
    const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' })
    const data = JSON.parse(info)
    this.historial = data.historial

  }
  get capitilize () {
    return this.historial.map(l => {
      let palabras = l.split(' ')
      palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1))
      return palabras.join(' ')
    })
  }
}
