import { Component } from "react"
import "./App.css"
import ExpenseList from "./components/ExpenseList"
import ExpenseForm from "./components/ExpenseForm"

export default class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			scep: [
				{
					id: 1,
					charge: "렌트비",
					amount: 1600,
				},
				{
					id: 2,
					charge: "교통비",
					amount: 400,
				},
				{
					id: 3,
					charge: "교통비",
					amount: 400,
				},
			],
		}
	}
	// initialExpenses = [
	// 	{ id: 1, charge: "콜라", amount: 2000 },
	// 	{ id: 2, charge: "빵", amount: 1000 },
	// 	{ id: 3, charge: "맥북", amount: 20000 },
	// ]

	handleDelete = (id) => {
		const newExpense = this.state.scep.filter((expense) => expense.id !== id)
		this.setState({ scep: newExpense })
	}

	render() {
		return (
			<main className='main-container'>
				<div className='sub-container'>
					<h1>장바구니</h1>

					<div style={{ width: `100%`, backgroundColor: "white", padding: "1rem" }}>
						{/* {Expense Form} */}
						<ExpenseForm />
					</div>
					<div style={{ width: `100%`, backgroundColor: "white", padding: "1rem" }}>
						{/* {Expense List} */}
						<ExpenseList scep={this.state.scep} handleDelete={this.handleDelete} />
					</div>
					<div style={{ display: "flex", justifyContent: "start", marginTop: "1rem" }}>
						<p style={{ fontSize: "2rem" }}>총합계:</p>
					</div>
				</div>
			</main>
		)
	}
}
