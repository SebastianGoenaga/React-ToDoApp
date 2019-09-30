import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';


const styles = theme => ({
    fab: {
        right: theme.spacing.unit ,
        bottom: theme.spacing.unit ,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
});


function Floating(props) {
    const { classes } = props;
    return (
        <Fab style={{ color: '#004' }} aria-label="Add" className={classes.fab} onClick={props.callback}>
            {props.icon}
        </Fab>

    );
}

Floating.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Floating);