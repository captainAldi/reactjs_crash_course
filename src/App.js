import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Todos from './components/Todos'
import Header from './components/layout/Header'
import AddTodo from './components/AddTodo'
import Footer from './components/layout/Footer'
import About from './components/pages/About'
//import uuid from 'uuid'
import axios from 'axios'

class App extends Component {
	state = {
		todos: []
	}

	// *** UNTUK BACKEND ***
	componentDidMount() {
		axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
			.then(res => this.setState({ todos: res.data }))
	}

	//Add Todo
	addTodo = (title) => {
		axios.post('https://jsonplaceholder.typicode.com/todos', {
			title: title,
			completed: false
		})
			.then(res => this.setState({ todos: [...this.state.todos, res.data] }))
	}

//Delete Todo
delTodo = (id) => {
	axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
		.then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] }))
}


	// *** UNTUK UI ****

	// //Toggle Complete
	markComplete = (id) => {
		this.setState({ todos: this.state.todos.map(todo => {
			if(todo.id === id){
				todo.completed = !todo.completed
			}
			return todo
		}) })
	}

	//Toggle Delete
	// delTodo = (id) => {
	// 	this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] })
	// }

	// //Add Todo
	// addTodo = (title) => {
	// 	const newTodo = {
	// 		id: uuid.v4(),
	// 		title: title,
	// 		completed: false
	// 	}
	// 	this.setState({ todos: [...this.state.todos, newTodo] })
	// }

 render() {
		return (
    <Router>
					<div className="App">
						<Header />

						<Route 
							exact
							path="/"
							render={props => (
								<div>
									<AddTodo addTodo={this.addTodo}/>
									<Todos delTodo={this.delTodo} todos={this.state.todos} markComplete={this.markComplete}/>
								</div>
							)}
						/>

						<Route
							path="/about"
							component={About}
						/>

						<Footer/>
    </div>
				</Router>
  );
	}
}

export default App;
