import React from 'react';
import Todo from './Todo';

const List = props => {
   // console.log(props)
    return (
        <div className="todo-div">
            {props.todos.map((todo, id) => (
            <Todo todo={todo} key={id} toggleComplete={props.toggleComplete} onDelete={props.onDelete}
                  handleEditing={props.handleEditing}
                  handleEditingDone={props.handleEditingDone} handleEditingChange={props.handleEditingChange}
                  changedText={props.changedText} editing={todo.editing} />
            )
            )}
        </div>
    )
}

export default List;