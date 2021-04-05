import React from "react";
import { Button, Container, makeStyles, TextField } from "@material-ui/core";
import axios from "axios";

const style = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        width: '70%',
    },
}));


const login = props => {
    const classes = style();
        return (
        <Container maxWidth="xs">
            <div className={classes.paper}>
                <TextField variant="outlined"
                    margin="normal"
                    required
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    fullWidth
                    onChange={props.loginChange}
                    value={props.login} />
                <TextField variant="outlined"
                    margin="normal"
                    required
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    fullWidth
                    onChange={props.passwordChange}
                    value={props.password} />
                <Button type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={props.tokenRequest}>
                    Войти
                </Button>
                <Button onClick={props.demoLogin}>Демо версия</Button>
            </div>
        </Container>
    );
};

export default login;
