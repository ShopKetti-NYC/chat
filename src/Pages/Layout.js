import React from "react";
import { Switch, Route } from "react-router-dom";
import Friends_List from "./Friends_List";
import Content from "./Content";

export default function Layout() {
    return (
        <div>
            <main className="app__content">
                <Switch>
                    <Route path="/friends_list" component={Friends_List} />
                    <Route path="/content" component={Content} />
                </Switch>
            </main>
        </div>
    );
}