import React, {useState} from "react"
import EditTodoCard from "./EditTodoCard";
import "./todoCard.css"

const TodoCard = ({todo, toggleComplete, deleteTodo, fileList, setImgUrl, actualDate}) => {
	const [edit, setEdit] = useState(false);
	return (
		<div>
			<div className={"wrapper" + (edit ? " edit-mode" : "")}>
				{edit ?
					<EditTodoCard setEdit={setEdit} id={todo.id} todo={todo} actualDate={actualDate}/>
				:
					<>
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
								{fileList.filter((val, i) => fileList.indexOf(val) === i).map((url, idx) => {
									if (url?.includes(todo.fileId)) {
										setImgUrl(url);
										return (
											<img key={idx} src={url}/>
										)
									}

								})}
							</div>
						</div>
						<div className="btn-group">
							<button className="btn-edit" onClick={() => setEdit(true)}>Edit</button>
							<button className="btn-remove" onClick={() => deleteTodo(todo.id)}>Remove todo</button>
						</div>
					</>
				}
			</div>
		</div>
	)
}

export default TodoCard;