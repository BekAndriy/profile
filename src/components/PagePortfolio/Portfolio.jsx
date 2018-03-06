import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

// Components
import UserInfo from './UserInfo.jsx';
import BlocksInfo from './BlocksInfo.jsx';

class _Portfolio extends Component {

    constructor() {
        super();

        this.state = {
            data: {}
        }
    }

    componentDidMount() {

    }

    componentWillReceiveProps(newProps) {
        let profileId = this.props.match.params.id;
        let data = newProps.reduxProfile.length ? newProps.reduxProfile.find(el => el.url === profileId) : false;

        if (profileId) {
            this.setState({ data });
        }
    }

    render() {
        return (
            <Fragment>
                <UserInfo data={this.state.data} />

                <div className="portfolio-blocks row">
                    {
                        this.state.data
                        && this.state.data.blocks
                        && this.state.data.blocks.map((el, ind) =>
                            <BlocksInfo data={el} key={ind} />)
                    }
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        reduxProfile: state.profiles
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return { }
};

const Portfolio = connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    {pure: false}
)(_Portfolio);

export default Portfolio;