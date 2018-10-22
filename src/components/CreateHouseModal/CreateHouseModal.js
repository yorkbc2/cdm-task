import React from "react";
import { Modal, Button, Header, Form } from "semantic-ui-react";
import { Input, Select as SelectInput, selectWithChecker } from "./../Form/Form";
import { connect } from "react-redux";
import { computeTotalPrice } from "./../../helpers/price";
import { CURRENCY } from "./../../constants";
import { addHouse } from "./../../store/actions/houseActions";
import { generateUID } from "./../../helpers/fns";
import store from "store";

const Select = selectWithChecker(<span></span>)(SelectInput);
const initialData = {
    address: "",
    owner: "",
    status: "",
    costs: [
        {price: 0, name: ""}
    ],
    totalPrice: 0
};
class CreateHouseModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: initialData,
            alert: { type: 0, message: "" }
        };
    }

    changeCost(event, index, propName) {
        let { value } = event.target;
        const updatedCosts = this.state.data.costs;

        if (propName === "price")
            value = parseInt(value);

        updatedCosts[index][propName] = value;

        const totalPrice = +computeTotalPrice(updatedCosts, 'price');

        this.setState(state => ({
            ...state,
            data: {
                ...state.data,
                costs: updatedCosts,
                totalPrice
            }
        }))
    } 

    onInputChange(event) {
        const { name, value } = event.target;
        this.setState(state => ({...state, data: {...state.data, [name]: value}}));
    }

    addCost() {
        this.setState(state => ({
            ...state,
            data: {
                ...state.data,
                costs: [
                    ...state.data.costs,
                    { price: 0, name: "" }
                ]
            }
        }))
    }

    submit(event) {
        event.preventDefault();
        const result = this.state.data;

        result.uid = generateUID();
        this.props.addHouse(this.state.data);
        store.set("houses", [...store.get("houses"), this.state.data]);
        this.setState(state => ({
            ...state,
            alert: {
                type: 1,
                message: "House has successfully added to WebStorage"
            },
            data: initialData
        }));
    }

    render() {
        return (
            <Modal trigger={<Button positive>Add +</Button>}>
                <Modal.Content>
                    <Header as="h4">Create new House</Header>
                    <Form onSubmit={this.submit.bind(this)}>
                        <Form.Field>
                            <label htmlFor="address">Enter address:</label>
                            <Input id="address" name="address" value={this.state.data.address} required={true} onChange={this.onInputChange.bind(this)} />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="owner">Enter owner name:</label>
                            <Input id="owner" name="owner" value={this.state.data.owner} required={true} onChange={this.onInputChange.bind(this)} />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="status">Select status:</label>
                            <Select name="status" id="status" onChange={(e, data) => this.setState(state => ({...state, data: {...state.data, status: data.value}}))} options={this.props.houses.filterByStatusValues} />
                        </Form.Field>
                        {this.state.data.costs.map((cost, index) => {
                            const inputIDName = `cost_name_field_${index}`;
                            const inputIDPrice = `cost_price_field_${index}`;
                            return (<Form.Field key={index}>
                                <label htmlFor={inputIDName}> Cost name: </label>
                                <Input type="text" name="cost_name[]" id={inputIDName}
                                    onChange={e => this.changeCost.call(this, e, index, 'name')}
                                    value={cost.name} />
                                <label htmlFor={inputIDPrice}> Cost price: </label>
                                <Input type="number" name="cost_price[]" id={inputIDPrice}
                                    onChange={e => this.changeCost.call(this, e, index, 'price')}
                                    value={cost.price} />
                            </Form.Field>);
                        })}
                        <Form.Field>
                            <Button type="button" onClick={this.addCost.bind(this)}>Add cost</Button>
                        </Form.Field>
                        <Form.Field>
                            <Header as="h3">Total price: {this.state.data.totalPrice} {CURRENCY}</Header>
                        </Form.Field>
                        <Button positive type={"submit"}>Submit</Button>
                    </Form>
                </Modal.Content>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({ houses: state.houses });

const mapDispatchToProps = dispatch => ({
    addHouse: data => dispatch(addHouse(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateHouseModal);