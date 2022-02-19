import { Switch } from 'react-router-dom';


const Routes: React.FC = () => {
    return (
        <>
        <Switch>
            <PublicRoute layout={layout} exact path='/' component={route}/>
        </Switch>
        </>
    )
};

export default Routes;