import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Edit from '@material-ui/icons/Edit';
import { Tarjeta } from "../Tarjeta/Tarjeta";
import FloatingActionButton from "../Button/Floating";
import AddIcon from '@material-ui/icons/Add';
import FilterIcon from '@material-ui/icons/FilterList';
import Modal from "@material-ui/core/Modal";
import NewTask from "../NuevaTarjeta/NuevaTarjeta";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MenuList from "@material-ui/core/MenuList";
import CircularProgress from "@material-ui/core/CircularProgress";
import TaskFilters from "../TaskFilters/TaskFilters.js";
import EditUser from "../EditUser/EditUser";

const drawerWidth = 256;

const styles = theme => ({
    root: {
        display: 'flex',
        minHeight: '100vh',
    },
    avatarBox: {
        width: '100%',

    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: theme.palette.background.default
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),

    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    grow: {
        flexGrow: 1,
    },
    sectionDesktop: {
        display: "none",
        padding: theme.spacing.unit,
        [theme.breakpoints.up("xs")]: {
            display: "flex",
        },
    }
});

class PersistentPrifileLeft extends React.Component {

    constructor(props) {
        super(props);
        this.state = { open: false, tasks: [], openModal: false, openModalNew: false, userInfo: { name: "", email: "" }, openModalUser: false, loading: false };
        this.changeState = this.changeState.bind(this);
        this.formNewTask = this.formNewTask.bind(this);
        this.updateUserInfo = this.updateUserInfo.bind(this);
        this.removeTask = this.removeTask.bind(this);
    }

    componentDidMount() {

    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    changeState = (element) => {
        this.setState(element)
    };

    handleLogout = () => {
        localStorage.setItem('page', "login");
        this.props.reloadPage()
    };

    handleModalNewOpen = () => {
        this.setState({ openModalNew: true });
    };

    handleModalNewClose = () => {
        this.setState({ openModalNew: false });
    };

    handleModalUserOpen = () => {
        this.setState({ openModalUser: true });
    };

    handleModalUserClose = () => {
        this.setState({ openModalUser: false });
    };

    handleModalOpen = () => {
        this.setState({ openModal: true });
    };

    handleModalClose = () => {
        this.setState({ openModal: false });
    };

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextProps.tasks !== this.props.tasks)
            this.setState({ tasks: nextProps.tasks })
    }


    formNewTask(newTask) {
        this.setState((state) => {
            const newTasks = [...state.tasks, newTask];
            localStorage.setItem('tasks', JSON.stringify(newTasks));
            return { tasks: newTasks }
        }
        );
        this.handleModalNewClose()
    }

    updateUserInfo(userInfo) {
        this.setState({ userInfo: userInfo });
    }

    removeTask(task) {
        let tasks = this.state.tasks.filter((t) => { return task.id !== t.id });
        this.setState({ tasks: tasks })
    }

    render() {
        const { classes, theme } = this.props;
        const { open } = this.state;

        return (
            <div className={classes.root}>

                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar disableGutters={!open}>
                        <IconButton
                            style={{ color: '#000' }}
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, open && classes.hide)}
                        >
                            <FilterIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap style={{ color: '#000' }}>
                            Todo APP
                        </Typography>
                        <div className={classes.grow} />
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="temporary"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List className={classes.avatarBox}>
                        <ListItem>
                            <ListItemAvatar style={{ left: -8, }}>
                                <Avatar style={{ color: '#000' }}>
                                {localStorage.getItem('namePrueba').charAt(0).toUpperCase()}</Avatar>
                            </ListItemAvatar>

                            <ListItemText style={{ color: '#000' }}

                                primary={localStorage.getItem('userName')}

                                secondary={
                                    <Typography style={{ color: '#000' }} noWrap>
                                        {localStorage.getItem('email')}
                                    </Typography>}
                            />
                            <ListItemSecondaryAction style={{
                                position: 'absolute',
                                left: 204,
                                top: '50%',
                                transform: 'translateY(-50%)',
                            }}>
                                <IconButton style={{ color: '#000' }} onClick={this.handleModalUserOpen}>
                                    <Edit />
                                </IconButton>
                                <Modal
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                    open={this.state.openModalUser}
                                    onClose={this.handleModalUserClose}
                                >
                                    <EditUser callback={this.updateUserInfo} close={this.handleModalUserClose}/>
                                </Modal>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                    <Divider />
                    <div className="bottom">
                        <MenuList>
                            <ListItem button key="sign-out" onClick={this.handleLogout}>
                                <ListItemIcon className={classes.item} style={{ color: '#000' }} >
                                    <ExitToApp />
                                </ListItemIcon>
                                <ListItemText primary="Logout" />
                            </ListItem>
                        </MenuList>
                    </div>
                </Drawer>
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader} />
                    {this.state.loading ?
                        <CircularProgress size={100} style={{ position: "relative", left: "50%", right: "50%", marginLeft: -50 }} />
                        :
                        <>
                            {this.state.tasks.map((task, id) => {
                                return (<Tarjeta info={task} key={id} callback={this.removeTask} />);
                            })}
                        </>
                    }
                    <div className="right">
                        <FloatingActionButton icon={<FilterIcon />} callback={this.handleModalOpen} />
                        <Modal
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                            open={this.state.openModal}
                            onClose={this.handleModalClose}
                        >
                            <TaskFilters tasks={this.state.tasks}/>
                        </Modal>
                    </div>
                    <div className="right">
                        <FloatingActionButton icon={<AddIcon />} callback={this.handleModalNewOpen} />
                        <Modal
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                            open={this.state.openModalNew}
                            onClose={this.handleModalNewClose}
                        >
                            <NewTask callback={this.formNewTask} close={this.handleModalNewClose} />
                        </Modal>
                    </div>

                </main>

            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(PersistentPrifileLeft);