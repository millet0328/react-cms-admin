import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import List from "./List";

function Auth() {
    let match = useRouteMatch();
    return (
        <Switch>
            <Route path={ `${ match.path }/list` }>
                <List/>
            </Route>
            <Route path={ match.path }>
                <List/>
            </Route>
        </Switch>
    )
}

export default Auth;