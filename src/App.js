import React, {useState, useEffect} from "react";
import {db} from "./firebase";
import {query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc} from "firebase/firestore"
import dayjs from "dayjs";

import TodoCard from "./TodoCard";

function App() {
	const [todos, setTodos] = useState([]);
	const [input, setInput] = useState("");
	const [textArea, setTextArea] = useState("");
	const [completionDate, setCompletionDate] = useState("");
	console.log(completionDate, "compl")

	useEffect(() => {
		const q = query(collection(db, "todos"));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			let todosArr = [];
			querySnapshot.forEach((doc) => {
				todosArr.push({...doc.data(), id: doc.id})
			})
			setTodos(todosArr);
		})
		return () => unsubscribe();
	},[]);


	const createTodo = async (e) => {
		e.preventDefault(e);
		if (input === "") {
			alert("Please enter a valid todo");
			return;
		}
		await addDoc(collection(db, "todos"), {
			title: input,
			description: textArea,
			completed: false
		});
		setInput("");
		setTextArea("");
	}

	const toggleComplete = async (todo) => {
		await updateDoc(doc(db, "todos", todo.id), {
			completed: !todo.completed
		})
	};

	const deleteTodo = async (id) => {
		await deleteDoc(doc(db, "todos", id));
	}

	return (
		<div className="App">
			<div>
				<h1>Todo</h1>
				<form onSubmit={createTodo}>
					<label htmlFor="title">Todo title</label>
					<input
						type="text"
						id="title"
						placeholder="todo"
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>
					<label htmlFor="description">Todo description</label>
					<textarea
						id="description"
						rows="4" cols="50"
						value={textArea}
						onChange={(e) => setTextArea(e.target.value)}
					/>
					<label htmlFor="start">Start date:</label>

					<input
						type="date"
						id="start"
						name="trip-start"
						// value="2022-11-19"
						min="2020-01-01"
						max="2025-12-31"
						value={completionDate}
						onChange={(e) => setCompletionDate(e.target.value)}
					/>
					<button>Add todo</button>
				</form>
				<div>
					{todos && todos.map((todo, idx) => (
						<TodoCard key={idx} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo}/>
					))}
				</div>
			</div>
		</div>
	);
}

export default App;
