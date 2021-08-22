import { Route, Switch, useRouteMatch } from "react-router-dom";

import List from "./List";
import Edit from "./Edit";

function Article() {
    let match = useRouteMatch();

    return (
        <Switch>
            <Route path={ `${ match.path }/edit/:id` }>
                <Edit/>
            </Route>
            <Route path={ `${ match.path }/list` }>
                <List/>
            </Route>
            <Route path={ match.path }>
                <List/>
            </Route>
        </Switch>
    )
}

export default Article;