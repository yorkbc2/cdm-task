import "./HouseItem.css";
import React from "react";
import PropTypes from "prop-types";
import { Card, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import StatusCaption from "./../StatusCaption/StatusCaption";
import { CURRENCY } from "./../../constants";

const HouseItem = ({uid, address, totalPrice, status}) => (
    <Card fluid>
        <Card.Content>
            <Header as="h3">{address} &nbsp; <StatusCaption {...status} uid={uid} /></Header>     
            <h3 className="total-price">Total price: {totalPrice} {CURRENCY}</h3>
            <div>
                <Link to={`/house/${uid}`} className="ui purple basic button">Check out</Link>
            </div>
        </Card.Content>
    </Card>
);

HouseItem.propTypes = {
    uid: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    totalPrice: PropTypes.number.isRequired
};

export default HouseItem;