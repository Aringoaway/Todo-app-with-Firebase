import React, {useState, useEffect} from "react";
import {db, storage} from "./firebase";
import {query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc} from "firebase/firestore"
import {ref, uploadBytes, listAll, getDownloadURL, getMetadata} from "firebase/storage"
import dayjs from "dayjs";
import {v4} from "uuid"

import './App.css';
import TodoCard from "./Components/TodoCard";

function App() {
	const [todos, setTodos] = useState([]);
	const [input, setInput] = useState("");
	const [textArea, setTextArea] = useState("");
	const [completionDate, setCompletionDate] = useState("");
	const [actualDate, setActualDate] = useState(dayjs().format("YYYY/MM/DD"));
	const [file, setFile] = useState();
	const [fileList, setFileList] = useState([]);
	// const [fileList, setFileList] = useState([{url: null, id: null}]);

	const fileListRef = ref(storage, "files/");

	useEffect(() => {
		const q = query(collection(db, "todos"));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			let todosArr = [];
			querySnapshot.forEach((doc) => {
				todosArr.push({...doc.data(), id: doc.id})
			})
			setTodos(todosArr);
		});
		listAll(fileListRef).then((res) => {
			res.items.forEach((item) => {
				// getDownloadURL(item).then((url) => {
				// 	setFileList((prev) => [...prev, url]);
				// })
				getMetadata(item)
					.then((metadata) => {
						setFileList((prev) => [...prev, metadata.name]);
					})
				// getMetadata(item)
				// 	.then((metadata) => {
				// 		setFileList((prev) => [...prev, metadata]);
				// 	})
				// getDownloadURL(item).then((url) => {
				// 	setFileList((prev) => ({...prev, url: url }));
				// }).then((snapshot) => {
				// 	getMetadata(item).then((metadata) => {
				// 		setFileList((prev) => ({...prev, id: metadata.name }));
				// 	})
				// })
			})
		});
		return () => unsubscribe();
	},[]);


	const createTodo = async (e) => {
		e.preventDefault(e);
		let fileId = v4()
		if (file !== null) {
			const fileRef = ref(storage, `files/${file.name + fileId}`);
			uploadBytes(fileRef, file).then((snapshot) => {
				getDownloadURL(snapshot.ref).then((url) => {
					setFileList((prev) => [...prev, url]);
				})

				// getDownloadURL(snapshot.ref).then((url) => {
				// 	setFileList((prev) => [...prev, {url: url, id: fileId}]);
				// })

			})
		}

		if (input === "") {
			alert("Please enter a valid todo");
			return;
		}

		await addDoc(collection(db, "todos"), {
			title: input,
			description: textArea,
			data: completionDate,
			fileId: fileId,
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
			<div className="todo-app">
				<h1>Todo</h1>
				<form className="todo-form" onSubmit={createTodo}>
					<div className="todo-title">
						<label htmlFor="title">Todo title</label>
						<input
							type="text"
							id="title"
							placeholder="todo"
							value={input}
							onChange={(e) => setInput(e.target.value)}
						/>
					</div>
					<div className="todo-description">
						<label htmlFor="description">Todo description</label>
						<textarea
							id="description"
							value={textArea}
							onChange={(e) => setTextArea(e.target.value)}
						/>
					</div>
					<div className="todo-date">
						<label htmlFor="start">Start date:</label>
						<input
							type="date"
							id="start"
							name="trip-start"
							min={actualDate}
							max="2025-12-31"
							value={completionDate}
							onChange={(e) => setCompletionDate(e.target.value)}
						/>
					</div>
					<div className="todo-file">
						<label htmlFor="file">Select a file:</label>
						<input type="file" id="file" multiple onChange={(e) => setFile(e.target.files[0])}/>
					</div>

					<button className="todo-btn-add">Add todo</button>
				</form>
				<div>
					{todos && todos.map((todo, idx) => (
						<TodoCard key={idx} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo} fileList={fileList}/>
					))}
				</div>
			</div>
		</div>
	);
}

export default App;
