import { useEffect, useState } from "react"
import "./App.css"
import ExpenseList from "./components/ExpenseList"
import ExpenseForm from "./components/ExpenseForm"

const App = () => {
	const defaultExpenses = [
		{ id: 1, charge: "콜라", amount: 2000 },
		{ id: 2, charge: "빵", amount: 1000 },
		{ id: 3, charge: "맥북", amount: 20000 },
	]

	const [expenses, setExpenses] = useState(() => {
		const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || []
		const combinedExpenses = [
			...defaultExpenses,
			...savedExpenses.filter((se) => !defaultExpenses.some((de) => de.id === se.id)),
		]
		return combinedExpenses
	})

	const [charge, setCharge] = useState("")
	const [amount, setAmount] = useState(0)
	const [edit, setEdit] = useState(false)
	const [id, setId] = useState("")
	const [alert, setAlert] = useState({ show: false, type: "", text: "" })

	useEffect(() => {
		localStorage.setItem("expenses", JSON.stringify(expenses))
	}, [expenses])

	const handleEdit = (id) => {
		const expense = expenses.find((item) => item.id === id)
		const { charge, amount } = expense
		setCharge(charge)
		setAmount(amount)
		setEdit(true)
		setId(id)
	}

	const handleCharge = (e) => {
		setCharge(e.target.value)
	}

	const handleAmount = (e) => {
		setAmount(e.target.valueAsNumber || 0)
	}

	const handleDelete = (id) => {
		const newExpenses = expenses.filter((expense) => expense.id !== id)
		setExpenses(newExpenses)
		handleAlert({ type: "danger", text: "item이 삭제되었습니다." })
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (charge !== "" && amount > 0) {
			let newExpenses
			if (edit) {
				newExpenses = expenses.map((item) => (item.id === id ? { ...item, charge, amount } : item))
				setEdit(false)
			} else {
				const newId = expenses.length > 0 ? Math.max(...expenses.map((e) => e.id)) + 1 : 1
				const newExpense = { id: newId, charge, amount }
				newExpenses = [...expenses, newExpense]
			}
			setExpenses(newExpenses)
			setCharge("")
			setAmount(0)
			handleAlert({
				type: "success",
				text: edit ? "아이템이 수정되었습니다." : "아이템이 생성되었습니다.",
			})
		} else {
			handleAlert({
				type: "danger",
				text: "charge는 빈값일 수 없으며 amount 값은 0보다 커야합니다.",
			})
		}
	}

	const handleAlert = ({ type, text }) => {
		setAlert({ show: true, type, text })
		setTimeout(() => {
			setAlert({ show: false, type: "", text: "" })
		}, 7000)
	}

	const clearItems = () => {
		setExpenses([])
		localStorage.removeItem("expenses")
	}

	return (
		<main className='main-container'>
			<div className='sub-container'>
				{alert.show && <div className={`alert alert-${alert.type}`}>{alert.text}</div>}
				<h1>장바구니</h1>

				<div style={{ width: `100%`, backgroundColor: "white", padding: "1rem" }}>
					<ExpenseForm
						charge={charge}
						handleCharge={handleCharge}
						handleSubmit={handleSubmit}
						amount={amount}
						handleAmount={handleAmount}
						edit={edit}
					/>
				</div>

				<div style={{ width: `100%`, backgroundColor: "white", padding: "1rem" }}>
					<ExpenseList
						handleEdit={handleEdit}
						expenses={expenses}
						handleDelete={handleDelete}
						clearItems={clearItems}
					/>
				</div>

				<div style={{ display: "flex", justifyContent: "start", marginTop: "1rem" }}>
					<p style={{ fontSize: "1.3rem" }}>총합계:</p>
				</div>
				<div>
					<p style={{ fontSize: "1.4rem", fontWeight: "700" }}>
						총지출:
						<span>
							{expenses.reduce((acc, curr) => {
								return (acc += curr.amount)
							}, 0)}
							원
						</span>
					</p>
				</div>
			</div>
		</main>
	)
}

export default App
