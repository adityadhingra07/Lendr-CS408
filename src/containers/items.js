import { connect } from 'react-redux'
import {actionCreator} from 'actionCreatorPath'

class SearchBar extends Component {
    constructor(props) {
        super(props);
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        prop: state.prop
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch1: () => {
            dispatch(actionCreator)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(items)