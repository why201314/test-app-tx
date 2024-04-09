import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useEffect } from 'react';
import { HttpManager} from "../api";



export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [employeeId, setEmployeeId] = useState('');
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [code, setCode] = useState('');
  const [duty, setDuty] = useState('');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRegister = () => {
    const params = {
      id: employeeId,
      name: name,
      mail: mail,
      code: code,
      duty: duty,
    };
  
    // 调用 addEmployee API
    HttpManager.addEmployee(params)
      .then(response => {
        // 处理成功响应，可以根据需要进行页面跳转或其他操作
        console.log('Employee added successfully:', response);
      })
      .catch(error => {
        // 处理错误，例如显示错误消息
        console.error('Error adding employee:', error);
      });
    // 关闭对话框
    handleClose();
  };
  

  return (
    <React.Fragment>
        <Button name="regist" id="regist" variant="contained" sx={{ mt: 3, mb: 2 }} fullWidth　onClick={handleClickOpen}>
        登録
        </Button>
        <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>社員情報</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="id"
            name="id"
            label="id"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            type="int"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="名前"
            type="String"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="mail"
            name="mail"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            label="メール"
            type="mail"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="code"
            name="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            label="社員コード"
            type="string"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="duty"
            name="duty"
            value={duty}
            onChange={(e) => setDuty(e.target.value)}
            label="役職"
            type="string"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleRegister}>Subscribe</Button>
        </DialogActions>
     </Dialog>
    </React.Fragment>
  );
}