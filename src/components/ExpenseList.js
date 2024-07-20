import React, { Component } from "react"
import "./ExpenseList.css"
import ExpenseItem from "./ExpenseItem"

export default class ExpenseList extends Component {
	render() {
		return (
			<>
				<ul className='list'></ul>
				<ExpenseItem />
				<ExpenseItem />
				<ExpenseItem />
				<ExpenseItem />
				<button className='btn'>목록지우기</button>
			</>
		)
	}
}
