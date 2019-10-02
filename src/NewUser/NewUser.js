import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
//import user from "../user.svg";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
//import axios from "axios";
import CssBaseline from "@material-ui/core/CssBaseline";
import CircularProgress from "@material-ui/core/CircularProgress";



class NewUser extends Component {

    constructor(props) {
        super(props);
        this.state = { namePrueba: "", email: "", username: "", password: "", password2: "", doRedirect: false, errorMessage: "", loading: false };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameSubmit = this.handleNameSubmit.bind(this);
        this.handleEmailSubmit = this.handleEmailSubmit.bind(this);
        this.handleUserSubmit = this.handleUserSubmit.bind(this);
        this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this);
        this.handlepassword2Submit = this.handlepassword2Submit.bind(this);

    }

    handleSubmit(e) {
        e.preventDefault();
        if (localStorage.getItem("password2") === localStorage.getItem("password")) {
            this.createUser();
        } else {
            this.setState({ errorMessage: "The password and the confirmation do not make match" });
        }
    }
    handleUserSubmit(event) {

        this.setState({ username: event.target.value });
        localStorage.setItem('userName', event.target.value);
    }
    handleNameSubmit(event) {
        this.setState({ name: event.target.value });
        localStorage.setItem('namePrueba', event.target.value);
    }
    handlePasswordSubmit(event) {

        this.setState({ password: event.target.value });
        localStorage.setItem('password', event.target.value);
    }
    handlepassword2Submit(event) {

        this.setState({ password2: event.target.value });
        localStorage.setItem('password2', event.target.value);
    }
    handleEmailSubmit(event) {

        this.setState({ email: event.target.value });
        localStorage.setItem('email', event.target.value);
    }


    createUser() {
        const user = {
            "username": localStorage.getItem("userName"),
            "password": localStorage.getItem("password"),
            "name": localStorage.getItem("namePrueba"),
            "email": localStorage.getItem("email")
        };
        this.setState({ loading: true });
        if (user) {
            this.setState({ name: "", email: "", password: "", password2: "", doRedirect: true, loading: false });
        } else {
            console.log('error');
            this.setState({ errorMessage: "User with selected username already exists", loading: false });
        }
    }

    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <Paper elevation={5} className="paper">
                    <Typography variant="h4">Registration</Typography>
                    <Typography color="error" gutterBottom>{this.state.errorMessage}</Typography>
                    <form className="form" onSubmit={this.handleSubmit}>
                        <TextField required label="Full name" fullWidth value={this.state.name}
                            onChange={this.handleNameSubmit} />
                        <TextField required label="Email" fullWidth value={this.state.email}
                            onChange={this.handleEmailSubmit} />
                        <TextField required label="Username" fullWidth value={this.state.username}
                            onChange={this.handleUserSubmit} />
                        <TextField required label="Password" type="password" fullWidth value={this.state.password}
                            onChange={this.handlePasswordSubmit} />
                        <TextField required label="Confirm password" type="password" fullWidth value={this.state.password2}
                            onChange={this.handlepassword2Submit} />
                        <br /><br />
                        <Button type="submit" color="primary" variant="contained" fullWidth disabled={this.state.loading}>
                            Create account
                        </Button>
                        <br /><br />
                        <br /><br />
                        <Button type="button" href="/" color="primary" variant="contained" fullWidth disabled={this.state.loading}>
                            Back
                        </Button>
                        {this.state.doRedirect && <Redirect to={"/"} />}
                    </form>
                    {this.state.loading && <CircularProgress style={{ marginTop: "4%" }} />}
                </Paper>
            </React.Fragment>
        );
    }
}

export default NewUser;
