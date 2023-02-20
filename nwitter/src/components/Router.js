import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";

const AppRouter = ({ isLoggedIn }) => {
    return (
        <Router>
            {isLoggedIn && <Navigation />}
            <Routes>
                {isLoggedIn ? (
                    <Route exact path="/" element={<Home />} />
                ) : (
                    <Route exact path="/" element={<Auth />} />
                )}
            </Routes>
        </Router>
    );
};

export default AppRouter;
