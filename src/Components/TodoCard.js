import React from "react"
import "./todoCard.css"

const TodoCard = ({todo, toggleComplete, deleteTodo}) => {
	return (
		<div className={todo.completed ? "completed" : ""}>
			<div className="wrapper">
				<div className="info-wrapper">
					<input
						type="checkbox"
						checked={!!todo.completed}
						onChange={() => toggleComplete(todo)}
					/>
					<div className="info">
						<h3
							className={todo.completed ? "text-line-through" : ""}
							onClick={() => toggleComplete(todo)}
						>
							{todo.title}
						</h3>
						<p>{todo.description}</p>
						<p>{todo.data}</p>
					</div>
				</div>
				<button className="btn-remove" onClick={() => deleteTodo(todo.id)}>Remove todo</button>
			</div>
		</div>
	)
}

export default TodoCard;