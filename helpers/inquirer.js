import inquirer from 'inquirer'
import colors from 'colors'

//* Lista de opciones
const questions = [
  {
    type: 'list',
    name: 'option',
    message: 'Qué desea hacer?',
    choices: [
      { value: 1, name: `${'1.'.green} Buscar ciudad` },
      { value: 2, name: `${'2.'.green} Historial` },
      { value: 0, name: `${'0.'.green} Salir` },
    ]
  }
]

//* Usar inquirer 
export const inquiererMenu = async () => {
  console.log("=======================".green)
  console.log('Selecciona una opcion'.green)
  console.log("=======================\n".green)
  const { option } = await inquirer.prompt(questions)
  return option
}

//Hace ina pausea y se reanuda al presionar enter
export const pause = async () => {
  await inquirer.prompt([{ type: 'input', name: 'espera', message: `\nPresiona ${'Enter'.blue} para continuar` }])
}

//* Inquirer personalizabe [input]
export const leerIntput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate (value) {
        return value.length === 0 ? 'Por favor ingrese un valor' : true
      }
    }
  ]
  const { desc } = await inquirer.prompt(question)
  return desc
}

export const listarLugares = async (lugares = []) => {
  const choices = lugares.map(({ id, nombre }, idx) => {
    return {
      value: id,
      name: `${idx + 1}. `.green + `${nombre}`
    }
  })
  choices.unshift({
    value: 0,
    name: `0. Cancelar`.yellow
  })
  const preguntas = [
    {
      type: 'list',
      name: 'id',
      message: 'Selecciona la ciudad',
      choices
    }
  ]
  const { id } = await inquirer.prompt(preguntas)
  return id
}
