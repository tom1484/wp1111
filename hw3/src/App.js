import { useReducer, useState } from 'react';
import './styles.css'

function App() {

  // Reducer for view state
  const initialViewState = {
    mode: 0, 
    buttonState: [ true, false, false ], 
  };

  const viewStateReducer = ( state, newMode ) => {
    if (state.mode != newMode) {
      let newButtonState = [ false, false, false ];
      newButtonState[newMode] = true;

      return {
        mode: newMode, 
        buttonState: newButtonState
      };
    }
    return state;
  }

  const [ viewState, viewStateChanger ] = useReducer(viewStateReducer, initialViewState);

  // Changer for TODO number
  const [ TODOLeft, setTODOLeft ] = useState(0);

  // Reducer for TODO list
  const TODOListReducer = ( state, action ) => {
    if (action.type == "CHANGE") {
      let newTODOList = [...state];
      let index = action.value;

      newTODOList[index].completed = !newTODOList[index].completed;
      if (newTODOList[index].completed) {
        setTODOLeft(TODOLeft - 1);
      }
      else {
        setTODOLeft(TODOLeft + 1);
      }
      
      return newTODOList;
    }

    if (action.type == "DELETE") {
      let newTODOList = [...state];
      let index = action.value;

      newTODOList.splice(index, 1);
      if (!state[index].completed) {
        setTODOLeft(TODOLeft - 1);
      }
      
      return newTODOList;
    }

    if (action.type == "ADD") {
      let newTODOList = [...state];
      let target = action.value;
      let index = Date.now();
      let content = target.value;
      target.value = "";
      
      newTODOList.push({
        index: index, completed: false, content: content, 
      });
      setTODOLeft(TODOLeft + 1);
      
      return newTODOList;
    }

    if (action.type == "CLEAR") {
      let newTODOList = [];
      
      let count = 0;
      for (let todo of state) {
        if (!todo.completed) {
          newTODOList.push(todo);
          count += 1;
        }
      }
      setTODOLeft(count);

      return newTODOList;
    }
  };

  const [ TODOList, TODOListChanger ] = useReducer(TODOListReducer, []);

  return (
    <div className="todo-app__root">
      <header className="todo-app__header">
        <h1 className="todo-app__title">TODO</h1>
      </header>

      <section className="todo-app__main">
        <input 
          onKeyDown={ (event) => {
            if (event.key == "Enter") {
              TODOListChanger({ type: "ADD", value: event.target });
            }
          } }
          className="todo-app__input" type="text" placeholder="What needs to be done?"/>
        <ul className="todo-app__list" id="todo-list">
          {
            TODOList.map((todo, key) => {
              let index = todo.index;
              let completed = todo.completed;
              let content = todo.content;

              if (viewState.mode == 1 && completed) {
                return;
              }
              if (viewState.mode == 2 && !completed) {
                return;
              }

              return (
                <li key={ index } className="todo-app__item" completed={ completed.toString() }>
                  <div className="todo-app__checkbox">
                    <input
                      onChange={ () => TODOListChanger({ type: "CHANGE", value: key }) }
                      id={ index } type="checkbox" defaultChecked={ completed }/>
                    <label htmlFor={ index }/>
                  </div>
                  <h1 className="todo-app__item-detail">
                    { content }
                  </h1>
                  <img 
                    onClick={ () => TODOListChanger({ type: "DELETE", value: key }) } 
                    src={ require("./img/x.png") } className="todo-app__item-x"/>
                </li>
              );
            })
          }
        </ul>
      </section>

      <footer className="todo-app__footer" id="todo-footer" enable={ (TODOList.length > 0).toString() }>
        <div className="todo-app__total">
          <p>{ TODOLeft + " left" }</p>
        </div>
        <ul className="todo-app__view-buttons">
          <button 
            onClick={ () => viewStateChanger(0) } 
            select={ viewState.buttonState[0].toString() }>All</button>
          <button 
            onClick={ () => viewStateChanger(1) } 
            select={ viewState.buttonState[1].toString() }>Active</button>
          <button 
            onClick={ () => viewStateChanger(2) } 
            select={ viewState.buttonState[2].toString() }>Completed</button>
        </ul>
        <div className="todo-app__clean">
          <button onClick={ () => TODOListChanger({ type: "CLEAR" }) }>Clear Completed</button>
        </div>
      </footer>
    </div>
  );
}

export default App;
