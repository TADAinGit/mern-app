import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
        /*{...rest}
            render={(props) => (1 === 1 ? <Component {...props} /> : <Redirect to="/auth/login" />)}*/
        />
    );
};

export default PrivateRoute;
