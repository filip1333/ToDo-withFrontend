import React from 'react';

const Todo = props => {
        return (
            <div className="todo">
                {props.todo.editing ? (
                    <input onKeyDown={event => props.handleEditingDone(event, props.todo.id)} onChange={event => props.handleEditingChange(event)}
                            type="text" value={props.changedText}/> )
                    :
                    (<p style={{textDecoration: props.todo.completed ? 'line-through' : 'none'}} key={props.todo.id}
                       onClick={event => {
                           props.toggleComplete(props.todo.id)
                       }} >{props.todo.task}{props.todo.completed && ' Completed'}</p>)
                }
                <div className="todo-buttons"><button onClick={event => props.handleEditing(props.todo.id)}>EDIT</button>
                <button onClick={event => {
                    props.onDelete(props.todo.id)
                }}>x
                </button></div>

            </div>
        )
    }

export default Todo;
