import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types'

interface Column {
  id: 'name' | 'code' | 'population' | 'size' | 'density';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}
interface ITextFieldProps {
  label: string;
  required: boolean;
}

interface IMyProps {
  name: string,
  url:string,
}


class APIClient extends React.Component<IMyProps> { 
  constructor(props:IMyProps) {
    super(props);
    this.state = {
      count: 0
    };
  }


  render() { 
    return (
    <h1>test {this.props.name} :: {this.props.url}</h1>
  );
  } 
} 



export default APIClient;

