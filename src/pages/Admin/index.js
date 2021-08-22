import { Route, Switch, useRouteMatch } from 'react-router-dom';

import List from "./List";
import Edit from "./Edit";
import Setting from './Setting';

function Admin() {
    let match = useRouteMatch();
    return (
        <Switch>
            <Route path={ match.url + "/list" }>
                <List/>
            </Route>
            <Route path={ match.url + "/edit/:id" }>
                <Edit/>
            </Route>
            <Route path={ match.url + "/setting" }>
                <Setting/>
            </Route>
        </Switch>
    )
}

export default Admin;
