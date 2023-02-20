import { HashRouter as Router, Route, Switch } from "react-router-dom";

const AppRouter = () => {
    return (
        <Router>
            Switch 사용으로 여러 Route중 하나만 렌더링하게 해줌
            <Switch>
                <Route />
            </Switch>
        </Router>
    );
};
