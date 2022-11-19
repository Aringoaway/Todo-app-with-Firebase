import React from "react";

const TodoCard = ({todo, toggleComplete, deleteTodo}) => {
	return (
		<div className={todo.completed ? "completed" : ""}>
			<div>
				<input
					type="checkbox"
					checked={!!todo.completed}
					onChange={() => toggleComplete(todo)}
				/>
				<h3
					className={todo.completed ? "text-line-through" : ""}
					onClick={() => toggleComplete(todo)}
				>
					{todo.title}
				</h3>
				<p>{todo.description}</p>
				<p>Data 26.11.2022</p>
			</div>
			<button onClick={() => deleteTodo(todo.id)}>Remove todo</button>
		</div>
	)
}

export default TodoCard;