import React from "react";
import { connect } from "react-redux";
import { changeFilter } from "./../../store/actions/houseActions";
import HouseItem from "./../HouseItem/HouseItem";
import { Divider, Select } from "semantic-ui-react";


const HouseList = props => (
    <div>
    	<Select options={props.houses.filterByStatusValues} onChange={(e, data) => props.changeFilter(data.value)} />
    	<Divider />
    	<div className="house-list">
        {[...props.houses.filteredData].splice(props.houses.page * props.houses.dataPerPage - props.houses.dataPerPage, props.houses.dataPerPage)
        	.filter(house => props.houses.filterByStatus.value === "any"? true: (house.status === props.houses.filterByStatus.value))
        	.map((house, index) => {
            return <HouseItem {...house} 
            	status={{ label: props.houses.filterByStatusValues.filter(i => i.value === house.status)[0].text, type: house.status }} 
            	key={index} />
        })}
    	</div>
    </div>
);

const mapStateToProps = state => ({...state});

const mapDispatchToProps = dispatch => ({
    changeFilter: payload => {
    	dispatch(changeFilter(payload))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(HouseList);