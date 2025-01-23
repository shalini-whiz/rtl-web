import React from 'react';
import AuthService from "../service/AuthService";
import { Route,  Navigate} from 'react-router-dom';
import { withStyles } from '@mui/styles';
import appStyles from "../styles/appStyles";
import PropTypes from 'prop-types';

function renderComponent1(Component, defaultProps, customProps) {
    let props = { ...defaultProps, ...customProps };
    let StyledComponent = Component;
   // let StyledComponent = withStyles(appStyles)(Component);

    return <StyledComponent {...props} />;
}
function renderComponent(Component, defaultProps, customProps) {
    let props = { ...defaultProps, ...customProps };
    let StyledComponent = withStyles(appStyles)(Component);
    return <StyledComponent {...props} />;
}
class PrivateRoute extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isAuthenticated: false
        };
    }

    async componentDidMount() {
        let res = await AuthService.isTokenAlive();
        if (res) {
            this.setState(() => ({ isAuthenticated: true, isLoading: true }));
        }
        else {
            this.setState(() => ({ isAuthenticated: false, isLoading: true }));
        }

    }

    async componentDidUpdate(prevProps) {
        if (prevProps.path !== this.props.path) {
            let res = await AuthService.isTokenAlive();
            if (res) {
                this.setState(() => ({ isAuthenticated: true, isLoading: true }));
            }
            else {
                this.setState(() => ({ isAuthenticated: false, isLoading: true }));
            }
        }
    }

    render() {

        let { isAuthenticated, isLoading } = this.state;
        let customProps = { ...this.props.data }


        return isLoading ? (isAuthenticated ? (<Route path={this.props.path}
            exact={this.props.exact}
            data={this.props.data}
            render={(props) => renderComponent(this.props.component, props, customProps)}

        />) :
            <Navigate to={{ pathname: '/' }} />
        ) : false;

    }

}

PrivateRoute.propTypes = {
    classes: PropTypes.object,
    path: PropTypes.string,
    exact: PropTypes.bool,
    data: PropTypes.object,
    component: PropTypes.elementType
};
export default PrivateRoute;