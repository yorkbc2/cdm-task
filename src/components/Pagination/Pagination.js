import React from "react";
import { connect } from "react-redux";
import { Pagination as SemanticPagination } from "semantic-ui-react";

class Pagination extends React.Component {
	render() {
		return (<div>
			<SemanticPagination activePage={this.props.page} 
				totalPages={Math.floor(this.props.dataLen / this.props.items)}
				onPageChange={(e, {activePage}) => this.props.changePage(activePage)} />
		</div>)
	}
}

export default connect(
	state => ({ page: state.houses.page, items: state.houses.dataPerPage, dataLen: state.houses.filteredData.length }),
	dispatch => ({
		changePage: page => dispatch({type: "CHANGE_PAGE", payload: page})
	})
)(Pagination);