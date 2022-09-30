import { useReducer } from 'react';
import './styles.css'

function App() {

  // Reducer for view state
  const initialViewState = {
    mode: 0, 
    buttonState: [ "true", "false", "false" ], 
  };

  const viewStateReducer = ( state, newMode ) => {
    if (state.mode != newMode) {
      let newButtonState = [ "false", "false", "false" ];
      newButtonState[newMode] = "true";

      return {
        mode: newMode, 
        buttonState: newButtonState
      }
    }
  }

  const [ viewState, viewStateChanger ] = useReducer(viewStateReducer, initialViewState);

  // Reducer for TODO list
  const initialTODOList = [
    { completed: false, content: "Eat" }, 
    { completed: false, content: "Sleep" }, 
    { completed: false, content: "Jump" }, 
  ];

  const TODOListReducer = ( state, action ) => {
    switch (action.type) {
      case "CHANGE":
        console.log("CHANGE");
        break;
      case "DELETE":
        console.log("DELETE");
        break;
      case "ADD":
        console.log("ADD");
        break;
    }
  }

  const [ TODOList, TODOListChanger ] = useReducer(TODOListReducer, initialTODOList);

  return (
    <div className="todo-app__root">
      <header className="todo-app__header">
        <h1 className="todo-app__title">TODO</h1>
      </header>

      <section className="todo-app__main">
        <input className="todo-app__input" type="text" placeholder="What needs to be done?"/>
        <ul className="todo-app__list" id="todo-list">
          {
            TODOList.map((todo, index) => {
              return (
                <li key={index} className="todo-app__item">
                  <div className="todo-app__checkbox">
                    <input id={ index } type="checkbox" checked="true"/>
                    <label htmlFor={ index }/>
                  </div>
                  <h1 className="todo-app__item-detail">
                    { todo.content }
                  </h1>
                  <img src={ require("./img/x.png") } className="todo-app__item-x"/>
                </li>
              );
            })
          }
          {/* <li className="todo-app__item">
            <div className="todo-app__checkbox">
              <input id="2" type="checkbox"/>
              <label htmlFor="2"/>
            </div>
            <h1 className="todo-app__item-detail">
              Item 1
            </h1>
            <img src={ require("./img/x.png") } className="todo-app__item-x"/>
          </li> */}
        </ul>
      </section>

      <footer className="todo-app__footer" id="todo-footer">
        <div className="todo-app__total"></div>
        <ul className="todo-app__view-buttons">
          <button onClick={ () => viewStateChanger(0) } select={ viewState.buttonState[0] }>All</button>
          <button onClick={ () => viewStateChanger(1) } select={ viewState.buttonState[1] }>Active</button>
          <button onClick={ () => viewStateChanger(2) } select={ viewState.buttonState[2] }>Completed</button>
        </ul>
        <div className="todo-app__clean">

        </div>
      </footer>
    </div>
  );
}

export default App;
