import styles from './Componentes/Menu.module.css'
import { useState, useRef, useEffect } from 'react'
import { Card } from './Componentes/Card'

const App = () => {
  const [item, setItem] = useState('')  
  const [name, setName] = useState('')
  const [error, setError] = useState(null)
  const inputRef = useRef(true)
  const inputRefName = useRef(true)

const [nombre, setNombre] = useState('')
const [color, setColor] = useState('')

const getNombre = (name) => {
  if (name) {
    setNombre(name)
  } 
  console.log(name);
}
const getColor = (item) => {
  if (item) {
    setColor(item)
  } 
  console.log(item);
}

const handleSubmit = (event) => {
    event.preventDefault();
      getNombre(name)
      getColor(item)
    // console.log(`el dato es  ${item}`);
    // //primer input Nombre (forma nativa JS)
    // const field = new window.FormData(event.target)
    // const query = field.get('name')
    // console.log(query);

    // // para varios input mejor usar asi de forma natica
    // const fields = Object.fromEntries(new window.FormData(event.target))
    // console.log(fields);

    // const { dato } = Object.fromEntries(new window.FormData(event.target))
    // console.log(dato);
    //segundo input color (usando useRef) hay que usar uno para cada input
    // const color = inputRef.current.value
    // const nombre = inputRefName.current.value
    // console.log(fields.name)
    // console.log(fields.query);
    // return fields;
}

  const handleChange = (event) => {
    // se crea newItem porque si lo pasamos al setItem de una, 
    // aveces tarda en llega la info y no da los resultados 
    // deseados en la validación
    const newItem = event.target.value 
    setItem(newItem.toUpperCase().trim())
  }

  // Usamos la const inputRef proveniente de useRef para que al 
  // principio de la validacion no nos de los errores de 
  // validacion
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current = item === ''
      return
    }
    if (item.slice(0, 1) !== '#') {
      setError('Debe comenzar con formato HEX')
      return
    }
    if (item.length > 7){
      setError('El formato HEX debe ser menor de 8 caracteres')
      return
    } setError(null)
  }, [item])

  const handleChangeName = (event) => {
    const newName = event.target.value
    setName(newName.trim())
  }
  useEffect(() => {
    if (inputRefName.current) {
      inputRefName.current = name === ''
      return
    }
    if (name.length < 4){
      setError('Escribe mas de 3 caracteres')
      return
    } setError(null)
  }, [name])

  return (
    <>
      <section className={styles.menu}>
        <h3>Elige un color</h3>
        <form className='flex' onSubmit={handleSubmit}>
          <input 
            style={{ border: '1px solid transparent', borderColor: error ? 'red' : 'transparent'}}
            ref={inputRefName}
            name='name'
            value={name}
            onChange={handleChangeName}
            placeholder='Ingresa tu nombe'/>
          <br />
          <input 
            style={{ border: '1px solid transparent', borderColor: error ? 'red' : 'transparent'}}
            ref={inputRef}
            name='query'
            onChange={handleChange}
            value={item}
            placeholder='Ingresa tu color favorito (formato HEX)'/>
          <br />
          <button type='submit'>Enviar</button>
        </form>
        {error && <p style={{ color: 'red'}}>{error}</p>}
      </section>
      
      {(nombre.length > 3 && color.length > 6) 
          ? (<Card 
              nombre={nombre}
              color={color}
            />) 
          : null}
    </>
  )
}


export default App
