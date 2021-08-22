import { Route, Switch, useRouteMatch } from "react-router-dom";

import List from "./List";
import Release from "./Release";
import Edit from "./Edit";
import NoMatch from "../NoMatch";

function Article() {
    let match = useRouteMatch();

    return (
        <Switch>
            <Route path={ `${ match.path }/edit/:id` }>
                <Edit/>
            </Route>
            <Route path={ `${ match.path }/release` }>
                <Release/>
            </Route>
            <Route path={ `${ match.path }/list` }>
                <List/>
            </Route>
            <Route path="*">
                <NoMatch/>
            </Route>
        </Switch>
    )
}

export default Article;