import React from "react";
import PropTypes from "prop-types";
import { Input as SemanticInput, Select as SemanticSelect } from "semantic-ui-react";

const Input = ({
    name,
    value,
    onChange,
    disabled,
    id,
    required
}) => (
    <SemanticInput name={name} value={value} onChange={onChange} disabled={disabled} required={required} id={id} />
);

Input.defaultProps = {
    disabled: false,
    id: "input_" + Date.now(),
    required: false
}

Input.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    required: PropTypes.bool.isRequired
};

const Select = (props) => (
    <SemanticSelect {...props} />
);

Select.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired
        })
    ).isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

function selectWithChecker (ConditionalComponent) {
    return function (WrappedComponent) {
        class SelectWithCheckerComponent extends React.Component {
            render() {
                return this.props.options.length > 0 ?
                    (<WrappedComponent {...this.props} />) : 
                    (<ConditionalComponent {...this.props} />)
            }
        }

        return SelectWithCheckerComponent;
    }
}


export {
    Input,
    Select,
    selectWithChecker
}