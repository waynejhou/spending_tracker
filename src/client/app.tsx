import ReactDOM from 'react-dom';
import React, { Component, FormHTMLAttributes, useEffect, useState } from 'react';
import { Link, Route, Router, Switch, useHistory } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { action } from '../server/actions';

export type AppProps = {

}
const history = createBrowserHistory()
export const App: React.FC<AppProps> = props => {
    const [fetched, setFetched] = useState("")
    const [antiforgeryToken, setAntiforgeryToken] = useState("")
    useEffect(() => {
        fetch(action.visit, { method: 'POST' })
            .then(async res => {
                if (res.status == 200) {
                    setAntiforgeryToken(document.cookie.split(';').map(x => x.split('=')).filter(x => x[0] == 'antiforgeryToken')[0][1])
                    return console.log("Welcome Guest")
                }
                console.log("Some problem happened")
            })
        fetch("/api/helloworld")
            .then(async res => {
                setFetched(await res.json())
            })
    }, [fetched, antiforgeryToken])
    return (
        <div>
            <Router history={history}>
                <div>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </ul>
                    <Switch>
                        <Route exact path="/">
                            <div>
                                Hello World! from readering client
                        </div>
                            <div>
                                {fetched} from fetched api
                        </div>
                        </Route>
                        <Route path="/login">
                            <div>
                                <h1>Login</h1>
                                <form
                                    onSubmit={(ev) => {
                                        ev.preventDefault();
                                        const form = ev.target as HTMLFormElement;
                                        const formdata = new FormData(form);
                                        const data = new URLSearchParams(formdata as unknown as any);
                                        fetch(action.login, {
                                            body: data,
                                            method: 'POST'
                                        })
                                            .then(async res => {
                                                console.log(res.status)
                                            })
                                        return false;
                                    }}>
                                    <input type="hidden" name="antiforgeryToken" value={antiforgeryToken}></input>
                                    <div>
                                        <label htmlFor="name-input">User Id: </label>
                                        <input id="name-input" type="text" name="name" required></input>
                                    </div>
                                    <div>
                                        <label htmlFor="password-input">User Password: </label>
                                        <input id="password-input" type="password" name="password" required ></input>
                                    </div>
                                    <div>
                                        <input type="submit"></input>
                                    </div>
                                </form>
                            </div>
                        </Route>
                        <Route path="/register">
                            <div>
                                <h1>Register</h1>
                                <form method="post" onSubmit={(ev) => {
                                    ev.preventDefault();
                                    const form = ev.target as HTMLFormElement;
                                    console.log(form)
                                    return false;
                                }}>
                                    <div>
                                        <label htmlFor="id-input">User Id: </label>
                                        <input id="id-input" type="text" name="id" required ></input>
                                    </div>
                                    <div>
                                        <label htmlFor="name-input">User Name: </label>
                                        <input id="name-input" type="text" name="name" required></input>
                                    </div>
                                    <div>
                                        <label htmlFor="password-input">User Password: </label>
                                        <input id="password-input" type="password" name="password" required ></input>
                                    </div>
                                    <div>
                                        <input type="submit"></input>
                                    </div>
                                </form>
                            </div>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    )
}