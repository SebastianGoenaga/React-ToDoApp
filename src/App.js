import React, { Component } from 'react';
import './App.css';
import { Login } from './Component/Login';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PersistentDrawerLeft from "./Todo/Nav";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
    typography: {
        // In Chinese and Japanese the characters are usually larger,
        // so a smaller fontsize may be appropriate.
        fontSize: 17,
      },
    palette: {
        background: { paper: "rgba(136, 55, 55, 1)", default: "#ffff" },
        primary: {
            main: "rgba(136, 55, 55, 1)",
            dark: "rgba(255, 80, 0, 1)",
        },
        secondary: {
            main: "#FFA000",
            dark: "#D28503",

        }
    }
});

class App extends Component {

    constructor(props) {
        super(props);
        localStorage.setItem('emailDefault', "Sebastian");
        localStorage.setItem('passwordDefault', "ieti");
        this.state = {
            page: localStorage.getItem('page')
        };
        this.reloadPage = this.reloadPage.bind(this);
    }


    reloadPage() {
        this.setState({ page: localStorage.getItem('page') })
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                {this.state.page === 'Logged' ?
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/"
                                render={() => <PersistentDrawerLeft reloadPage={this.reloadPage} />} />
                        </Switch>
                    </BrowserRouter>
                    : <BrowserRouter>
                        <Switch>
                            <Route exact path="/"
                                render={() => <Login reloadPage={this.reloadPage} />} />
                            <Route />
                        </Switch>
                    </BrowserRouter>
                }
            </MuiThemeProvider>
        );
    }
}

export default App;
