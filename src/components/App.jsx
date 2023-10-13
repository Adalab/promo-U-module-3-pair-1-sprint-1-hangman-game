//imports dependencias, imagenes, componentes, estilos


import '../styles/App.scss';
import { useState, useEffect } from 'react';
// import nombreVariable from '../images/nombre-imagen';



function App() {

  //funciones, variables, handles
  const [numberOfErrors, setNumberOfErrors] = useState(0);
  const [lastLetter, setLastLetter] = useState("");
  const [word, setWord] = useState("");
  const [userLetters, setUserLetters] = useState ([]);

  useEffect (()=> {
    fetch('https://dev.adalab.es/api/random/word')
    .then(response => response.json())
    .then ((data)=> {

      setWord (data.word);


    });   

  }, []);    



  const handleClick = (event) => {
    event.preventDefault();
    setNumberOfErrors(numberOfErrors + 1);
    console.log(numberOfErrors);
  };



  const handleChange = (event) => {

    const inputLetter = event.target.value;

    const isValidLetter = /^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ]+$/.test(inputLetter);

    //test.() es un método que se utiliza para realizar la validación del event.target.value. Se está utilizando un regex (o expresion regular) que contiene solo caracteres del alfabeto español (minusculas, mayusculas, acentos)

    if (isValidLetter || inputLetter === "") {
      setLastLetter(inputLetter);
      setUserLetters([...userLetters, inputLetter]);
    } else {
      // La letra no es válida, hacer algo en consecuencia (puede mostrar un mensaje o ignorar)
      console.log('La letra ingresada no es válida.');
    }
  };


    const renderSolutionLetters = () => {
      const wordLetters = word.split('');
      return (
        wordLetters.map((letter, index) => (
          <li key={index} className="letter">
            {userLetters.includes(letter) ? letter : ""}
          </li>
        ))
      );
    };

    const renderErrorLetters = () => {
      const errorLetters = userLetters.filter((letter) => !word.includes(letter) )
      return (
        errorLetters.map((letter, index) => (
          <li key={index} className="letter">
            {letter}
          </li>
        ))
      );
    }

    const calculateErrors = () => {

      const countErrors = userLetters.filter((letter) => !word.includes(letter))

      return countErrors.length;

    };

  return (
  //html
    /* <> </> etiqueta vacia = fragments */
  <>
   <div className="page">
      <header>
        <h1 className="header__title">Juego del ahorcado</h1>
      </header>
      <main className="main">
        <section>
          <div className="solution">
            <h2 className="title">Solución:</h2>
            <ul className="letters">
              {renderSolutionLetters()}
            </ul>
          </div>
          <div className="error">
            <h2 className="title">Letras falladas:</h2>
            <ul className="letters">
            {renderErrorLetters()}
            </ul>
          </div>
          <form className="form">
            <label className="title" htmlFor="last-letter">Escribe una letra:</label>
            <input
              autoComplete="off"
              className="form__input"
              maxLength="1"
              type="text"
              name="last-letter"
              id="last-letter"
              value={lastLetter}
              onChange={handleChange}
            />
          </form>
        </section>
          <section className={"dummy error-" + calculateErrors()}> 
          {/* {`dummy error- ${numberOfErrors}`} */}
          <span className="error-13 eye"></span>
          <span className="error-12 eye"></span>
          <span className="error-11 line"></span>
          <span className="error-10 line"></span>
          <span className="error-9 line"></span>
          <span className="error-8 line"></span>
          <span className="error-7 line"></span>
          <span className="error-6 head"></span>
          <span className="error-5 line"></span>
          <span className="error-4 line"></span>
          <span className="error-3 line"></span>
          <span className="error-2 line"></span>
          <span className="error-1 line"></span>
        </section>
        <button onClick={handleClick}>Incrementar</button>
      </main>
    </div>

  </>
    
  );
}

export default App;