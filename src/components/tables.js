import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Edit from './edit'
import api from '../api/index.js'
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },  
});

class SimpleTable extends React.Component {
  state = {
    rows: []
  };
  onRef = (ref) => {
    this.modal = ref
  };
  getUsers = () => {
    api.getUsers().then((data) => {
      console.log(data);
      this.setState({rows: data});
    })
  };
  add = (data) => {
    this.modal.addUserDialogOpen(); 
  };
  edit = (user) => {
    this.modal.editUserDialogOpen(user);    
  };
  remove = (id) => {
    console.log(id)
    api.removeUser(id).then((data) => {
      console.log(data);
      this.getUsers();
    })
  };
  componentDidMount(){
    this.getUsers();
  };
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Button variant="contained" className={classes.button} onClick={this.add}>
          添加
        </Button>
        <Edit onRef={this.onRef} refresh={this.getUsers.bind(this)}/>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>姓名</TableCell>
              <TableCell align="right">年龄</TableCell>
              <TableCell align="right">工作</TableCell>
              <TableCell align="right">毕业院校</TableCell>
              <TableCell align="right">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.rows.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.age}</TableCell>
                <TableCell align="right">{row.job}</TableCell>
                <TableCell align="right">{row.school}</TableCell>
                <TableCell align="right">
                  <Button variant="contained" className={classes.button} onClick={this.edit.bind(this, row)}>
                    编辑
                  </Button>
                  <Button variant="contained" className={classes.button} onClick={this.remove.bind(this, row.id)}>
                    删除
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);