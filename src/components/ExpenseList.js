import React, { Component } from "react"
import "./ExpenseList.css"
import ExpenseItem from "./ExpenseItem"

export default class ExpenseList extends Component {
	render() {
		return (
			<>
				<ul className='list'>
					{this.props.scep.map((expense) => {
						return (
							<ExpenseItem
								key={expense.id}
								expense={expense}
								handleDelete={this.props.handleDelete}
							/>
						)
					})}
				</ul>
				<button className='btn'>목록지우기</button>
			</>
		)
	}
}
