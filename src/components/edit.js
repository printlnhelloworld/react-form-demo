import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
// import classNames from 'classnames';
// import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { Actions } from '@youzan/shuai';
const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});
const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
  });
const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit,
  },
}))(MuiDialogActions);

class Edit extends React.Component {
  state = {
    open: false,
    title: '添加',
    user: {
      id: '',
      name: '',
      age: '',
      job: '',
      school: ''
    }
  };
  constructor(props) {
    super(props);
    this.props.onRef(this);
  };
  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };  
  addUserDialogOpen = () => {
      this.setState({
        title: '添加',
        user: {
          name: '',
          age: '',
          job: '',
          school: ''
        }
      })
      this.handleClickOpen();
  };
  editUserDialogOpen = (row) => {
      console.log(row)
      this.setState({
        title: '修改',
        user: row
      })
      this.handleClickOpen();
  };

  ensure = (user) => {
    // console.log(this.child)
    if (this.state.title === '添加') {
      console.log('添加')
      this.child.addUser();
    } else {
      this.child.editUser();
    }
  };
  onRef = (ref) => {
    this.child = ref
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        {/* <Button variant="outlined" color="secondary" onClick={this.handleClickOpen}>
          添加
        </Button> */}
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            {this.state.title}
          </DialogTitle>
          <DialogContent>
            <Fields user={this.state.user} onRef={this.onRef} refresh={this.props.refresh}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.ensure} color="primary">
              确认
            </Button>
            <Button onClick={this.handleClose} color="primary">
              取消
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
  
class TextFields extends React.Component {
    state = {
      id: '',
      name: '',
      age: '',
      job: '',
      school: ''
    };
    constructor(props) {
      super(props);
      this.props.onRef(this);
    };    
    handleChange = name => event => {
      this.setState({ [name]: event.target.value });
    };
    componentDidMount() {
      this.setState(this.props.user);
    };
    addUser = () => {
      Actions.formAddUser(this.state);
    };
    editUser = () => {
      Actions.formEditUser(this.state);
    }
    render() {
      const { classes } = this.props;
  
      return (
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="standard-name"
            label="姓名"
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChange('name')}
            margin="normal"
          />
          <TextField
          id="standard-number"
          label="年龄"
          value={this.state.age}
          onChange={this.handleChange('age')}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
          <TextField
            id="standard-required"
            label="职业"
            value={this.state.job}
            onChange={this.handleChange('job')}            
            className={classes.textField}
            margin="normal"
          />
          <TextField
            id="standard-required"
            label="毕业院校"
            value={this.state.school}           
            onChange={this.handleChange('school')}             
            className={classes.textField}
            margin="normal"
          />
        </form>
      );
    }
  }
  
  TextFields.propTypes = {
    classes: PropTypes.object.isRequired,
  };
let Fields = withStyles(styles)(TextFields)
export default Edit;