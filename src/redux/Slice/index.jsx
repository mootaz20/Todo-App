import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos : [
        { id: 1, title: 'Todo 1', completed: false },
        { id: 2, title: 'Todo 2', completed: false },
        { id: 3, title: 'Todo 3', completed: true },
    ]
}

const todosSlice = createSlice({
    name : 'todos',
    initialState,
    reducers : {
        addTodo(state, action) {
            const newTask = {
              id: state.todos[state.todos.length - 1].id + 1,
              title: action.payload,
              completed: false
            };
            state.todos.push(newTask);
            },
            editStatus(state,action) {
                state.todos = state.todos.map((element)=>{
                    if(element.id == action.payload){
                        if(element.completed === false){
                            element.completed = true;
                        }else{
                            element.completed = false;
                        }
                    }
                    return element
                })
            },
            deleteTodo(state, action) {
                state.todos = state.todos.filter((todo) => todo.id !== action.payload);
            },
            editTitle(state,action){
               state.todos = state.todos.map((element)=>{
                    if(element.id == action.payload.id){
                        element.title = action.payload.EditText;
                    }
                    return element
                })
            }
        }

})

export const { addTodo , editStatus , deleteTodo , editTitle } = todosSlice.actions;
export default todosSlice.reducer;
