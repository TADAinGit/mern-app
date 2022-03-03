import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                1 === 1 && restricted ? <Redirect to="/home" /> : <Component {...props} />
            }
        ></Route>
    );
};

export default PublicRoute;
