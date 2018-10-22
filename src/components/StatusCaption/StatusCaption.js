import "./StatusCaption.css";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal } from "semantic-ui-react";
import { Select } from "./../Form/Form";
import { changeHouseStatus } from "./../../store/actions/houseActions";

const StatusCaption = ({label, type, uid, defaultValues, changeStatus, onChange}) => (
	<div style={{display: "inline-block"}}>
		<Modal trigger={
			<span className={`status-caption status-caption-${type}`}>
				{label}
			</span>
		}>
			<Modal.Content> 
				<h2>Change status (current: {label})</h2>
				<Select name="status" id="status-select" options={defaultValues} onChange={(e, data) => {
					changeStatus(uid, data.value)
					if (typeof onChange === "function") onChange(data);
				}} />
			</Modal.Content>
		</Modal>
	</div>
);

StatusCaption.propTypes = {
	label: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired
};

export default connect(
	state => ({defaultValues: state.houses.filterByStatusValues}),
	dispatch => ({
		changeStatus: (uid, value) => dispatch(changeHouseStatus(uid, value)) 
	})
)(StatusCaption);