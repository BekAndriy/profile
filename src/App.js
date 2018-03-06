// modules
import React, {Component} from 'react';
import { Route, Link, Switch } from "react-router-dom";
import { connect } from 'react-redux';

import { actionWindowProps } from './store/actions';

import './styles/App.scss';

import Hoc from './components/Hoc/index.jsx';
import Portfolio from './components/PagePortfolio/Portfolio.jsx';

class _App extends Component {

    render() {
        let mobile = typeof window.orientation !== 'undefined' ? ' is-mobile' : '';

        return (
            <div className={`App container${mobile}`}>
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={props => <Link to="/portfolio/john-smith">John Smith</Link>}
                    />
                    <Route
                        path="/portfolio/:id"
                        render={props =>
                            <Hoc url={`get-portfolio/${props.match.params.id}`} {...props}>
                                <Portfolio {...props} />
                            </Hoc>
                        }
                    />
                    <Route
                        path="/portfolio/:id"
                        render={props =>
                            <Hoc url={`get-portfolio/${props.match.params.id}`}>
                                <Portfolio {...props} />
                            </Hoc>
                        }
                    />
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        reduxState: state
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        windowProps: windowProps => dispatch( actionWindowProps(windowProps) ),
    }
};

const App = connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { pure: false }
)(_App);

export default App;
