import React, {useState} from "react"
import "./todoCard.css"
import {db} from "../firebase";
import {doc, updateDoc} from "firebase/firestore";

const EditTodoCard = ({setEdit, id, todo, actualDate}) => {
	const [input, setInput] = useState(todo.title);
	const [textArea, setTextArea] = useState(todo.description);
	const [completionDate, setCompletionDate] = useState(todo.data);

	const updateTodo = async (updatedDoc) => {
		await updateDoc(doc(db, "todos", updatedDoc.id), updatedDoc)
	};

	return (
		<>
			<input
				type="text"
				placeholder="title"
				value={input}
				onChange={(e) => setInput(e.target.value)}
			/>
			<textarea
				placeholder="description"
				value={textArea}
				onChange={(e) => setTextArea(e.target.value)}
			/>
			<input
				type="date"
				value={completionDate}
				onChange={(e) => setCompletionDate(e.target.value)}
			/>
			<button
				className="btn-update"
				onClick={() => {
				updateTodo({
					title: input,
					description: textArea,
					data: completionDate,
					completed: (actualDate > completionDate),
					id: id
				});
				setEdit(false);
			}}>Update</button>
		</>
	)
}

export default EditTodoCard;