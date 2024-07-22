import React from "react"
import "./ExpenseList.css"
import ExpenseItem from "./ExpenseItem"

const ExpenseList = ({ expenses, handleDelete }) => {
	if (!expenses || expenses.length === 0) {
		return <p className='list'>지출 항목이 없습니다.</p>
	}

	return (
		<>
			<ul className='list'>
				{expenses.map((expense) => (
					<ExpenseItem key={expense.id} expense={expense} handleDelete={handleDelete} />
				))}
			</ul>
			<button className='btn'>목록 지우기</button>
		</>
	)
}

export default ExpenseList
