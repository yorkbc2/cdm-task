import React from "react";
import HouseList from "./../../components/HouseList/HouseList";
import Pagination from "./../../components/Pagination/Pagination";

class Home extends React.Component {
    render() {
        return(
            <div className="Home">
            	<HouseList />
            	<br />
            	<Pagination />
            	<br />
            </div>
        );
    }
}

export default Home;