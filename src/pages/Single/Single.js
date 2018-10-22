import React from "react";
import store from "store";
import { Link } from "react-router-dom";
import { Header, Table, Form } from "semantic-ui-react";
import { Input } from "./../../components/Form/Form";
import { CURRENCY, STATUSES } from "./../../constants";
import { computeTotalPrice } from "./../../helpers/price";
import StatusCaption from "./../../components/StatusCaption/StatusCaption";
import { connect } from "react-redux";
import { changeHouseCosts } from "./../../store/actions/houseActions";
 
class Single extends React.Component {
	constructor(props) {
		super(props)

		this.state = {};
	}
	componentDidMount() {
		const { uid } = this.props.match.params;

		let house = store.get("houses").filter(i => i.uid === uid)[0];

		this.setState({...house, editCosts: { visible: false, index: -1, propType: '' }});
	}

	toggleEditMode(index, prop) {
		this.setState(state => ({...state, editCosts: { visible: true, index, propType: prop }}));
	} 

	disableEditModeFromSubmit(e) {
		e.preventDefault();

		this.setState(state => ({
			...state,
			editCosts: {
				visible: false,
				index: -1,
				propType: ""
			}
		}))
	}

	changeCostValue(e, i, p) {
		let val = e.target.value;

		if (p === "price")
			val = parseInt(val);

		let newCosts = this.state.costs.map((c, ci) => {
			if (ci === i)
				c[p] = val;
			return c;
		});

		this.setState(state => ({
			...state,
			costs: newCosts,
			totalPrice: computeTotalPrice(newCosts, 'price')
		}), () => this.props.saveCosts(this.state.uid, this.state.costs));
	}

	render() {
		return typeof this.state.uid !== 'undefined'?
			(
			<div>
				<div className="single-topheader">
					<Link to={"/"} className="ui primary button"> &laquo; Back</Link>
				</div>
				<div className="single-content">
					<br/>
					<Header as="h2">{this.state.address} &nbsp; <StatusCaption onChange={data => this.setState(state => ({...state, status: data.value}))} 
						uid={this.state.uid} 
						type={this.state.status} 
						label={STATUSES[this.state.status]} /></Header>
					<Header as="h4">Owner: {this.state.owner}</Header>
					<Header as="h3">
						Costs
					</Header>
					<Table>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell> Cost price </Table.HeaderCell>
								<Table.HeaderCell> Cost name </Table.HeaderCell>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{this.state.costs.map((cost, index) => {
								return (
									<Table.Row key={index}>
										{Object.keys(cost).map((costProp, propIndex) => {
											return this.state.editCosts.visible === true && this.state.editCosts.index === index &&
															this.state.editCosts.propType === costProp?
															(<Table.Cell key={propIndex}>
																<Form onSubmit={e => this.disableEditModeFromSubmit.call(this, e)}>
																	<Input value={cost[costProp]} name="_cost" placeholder="Cost value" id="_cost"
																					onChange={e => this.changeCostValue.call(this, e, index, costProp)} />
																</Form>
															</Table.Cell>):
															(<Table.Cell key={propIndex} onDoubleClick={e => this.toggleEditMode.call(this, index, costProp)}>
																{cost[costProp]} {costProp === "price"? CURRENCY: ""}
															</Table.Cell>)
										})}
									</Table.Row>
								)
							})}
						</Table.Body>
						<Table.Footer>
							<Table.Row>
								<Table.HeaderCell>
									<b>Total price: {this.state.totalPrice} {CURRENCY}</b>
								</Table.HeaderCell>
								<Table.HeaderCell />
							</Table.Row>
						</Table.Footer>
					</Table>	
					
				</div>
			</div>
			): null;
	}
}

export default connect(
	null,
	dispatch => ({
		saveCosts: (uid, costs) => dispatch(changeHouseCosts(uid, costs))
	})
)(Single);