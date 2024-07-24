import React from "react"
import "./ExpenseList.css"
import ExpenseItem from "./ExpenseItem"
import { MdDelete } from "react-icons/md"

const ExpenseList = ({ expenses, handleDelete, handleEdit, clearItems }) => {
	if (!expenses || expenses.length === 0) {
		return <p className='list'>지출 항목이 없습니다.</p>
	}

	return (
		<>
			<ul className='list'>
				{expenses.map((expense) => (
					<ExpenseItem
						key={expense.id}
						expense={expense}
						handleDelete={handleDelete}
						handleEdit={handleEdit}
					/>
				))}
			</ul>
			{expenses.length > 0 && (
				<button className='btn' onClick={clearItems}>
					목록 지우기
					<MdDelete className='btn-icon' />
				</button>
			)}
		</>
	)
}

export default ExpenseList
