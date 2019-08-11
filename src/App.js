import React, { Component } from 'react';
import List from './components/TodoList';
import Form from './components/TodoForm';
import Header from './components/Header';
import Axios from 'axios';
import './index.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [
                // task: '',
                // id: '',
                //completed: false,
                // all of our to-dos
            ],
            todo: '',
            // an empty string to hold an individual to-do
            filtertodos: 'all'
        }
    }


       inputChangeHandler = event => {
           this.setState({[event.target.name]: event.target.value})
       }

       addTask = async (event) => {
           event.preventDefault();
           let newTask = {
               task: this.state.todo,
               id: Date.now(),
               completed: false,
               editing: false
           };

           const data = await Axios.post('http://127.0.0.1:8000/todoes_create/', newTask)
               .then(() => {
                   this.setState({
                       todos: [...this.state.todos, newTask]}
                       );
               })
               .catch((error) => {
                   console.log(error.response.data);
                   alert('You MUST type something in the input field!');
               })
    }

           onDelete = async (id) =>  {
               const search = this.state.todos.findIndex((element) => {
                   return element.id == id
               });
               this.state.todos.splice(search, 1)
               this.setState({todos:this.state.todos})
           await Axios.delete(`http://127.0.0.1:8000/todoes_destroy/${id}/`)
           }


           toggleComplete = async (id) => {
               const currentTodo = {}
               const todos = this.state.todos.map(todo => {
                   if (todo.id === id) {
                       todo.completed = !todo.completed
                       currentTodo.task = todo.task
                       currentTodo.completed = todo.completed
                   }
                   return todo
               });
               this.setState({todos, todo: ''})
               const {data} = await Axios.put(`http://127.0.0.1:8000/todoes_update/${id}/`, currentTodo)
           }

           removeItems = async (event) => {
               event.preventDefault();
               const completed = this.state.todos.filter(todo => {
                   return todo.completed
               });

               const remove = completed.map( async (todo) => {
                      //  console.log(todo);
                       await Axios.delete(`http://127.0.0.1:8000/todoes_destroy/${todo.id}/`)
                   }
               )

               const undone = this.state.todos.filter(todo => {
                   return !todo.completed
               });
               this.setState({todos: undone})
    }

           updateFilter = st => {
               this.setState({filtertodos: st})
           }

           handleEditing = (id) => {
               let task = '';

               const todos = this.state.todos.map(todo => {
                   if (todo.id === id) {
                       todo.editing = !todo.editing
                       task = todo.task
                   }
                   return todo
               });
               this.setState({
                   todos : todos,
                    todo: {
                      changedText: task,
                    }
               })

           }

           handleEditingDone = async (event, id) => {
               const currentTodo = {}
               if(event.keyCode === 13) {
                   const todos = this.state.todos.map(todo => {
                       if (todo.id === id) {
                           todo.task = this.state.todo.changedText
                           todo.editing = false
                           currentTodo.task = todo.task
                           currentTodo.completed = todo.completed
                       }
                       return todo;
                   })
                   this.setState( {
                        todos
                   })
                   const {data} = await Axios.put(`http://127.0.0.1:8000/todoes_update/${id}/`, currentTodo)
               }
           }

           handleEditingChange = event => {
               let _changedText = event.target.value;
               this.setState({
                   todo: {changedText: _changedText}
               });
           }

           async componentDidMount() {
                const {data} = await Axios.get('http://127.0.0.1:8000/todoes_read/', {
                })
                this.setState({todos : data})
           }


    render() {

        let todos = [];
        if (this.state.filtertodos === 'all') {
            todos = this.state.todos;
        } else if (this.state.filtertodos === 'uncomplete') {
            todos = this.state.todos.filter(todo => !todo.completed);
        } else if (this.state.filtertodos === 'complete') {
            todos = this.state.todos.filter(todo => todo.completed);
        }

        return (
            <div className="App">
                <Header />
                <Form todos={this.state.todos} value={this.state.todo} inputChangeHandler={this.inputChangeHandler}
                      addTask={this.addTask} removeItems={this.removeItems} updateFilter={this.updateFilter} />
                <List todos={todos} toggleComplete={this.toggleComplete} onDelete={this.onDelete}
                      handleEditing={this.handleEditing} handleEditingDone={this.handleEditingDone}
                      handleEditingChange={this.handleEditingChange} changedText={this.state.todo.changedText} />

            </div>
        );
    }
}

export default App;