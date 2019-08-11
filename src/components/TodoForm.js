import React from 'react';
import List from "./TodoList";

const Form = props => {
    return (
        <div className="form-div">
        <form>

            <input name="todo"
                   type="text"
                   placeholder="enter the task"
                   value={props.value}
                   onChange={props.inputChangeHandler} />
            <button className="form-task-button" onClick={props.addTask}>Add a task</button>
        </form>
            <button className="form-button" onClick={() => props.updateFilter("all")}>All</button>
            <button className="form-button" onClick={() => props.updateFilter("uncomplete")}>Uncomplete</button>
            <button className="form-button" onClick={() => props.updateFilter("complete")}>Complete</button>
            <button className="form-button" onClick={props.removeItems}>Remove completed</button>
        </div>
    )
}

export default Form;
