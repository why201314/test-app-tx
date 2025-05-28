import * as React from 'react';
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import { HttpManager } from './api';
import { useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

interface Row {
  contactId: number;
  firstName: string;
  lastName: string;
  mail: string;
  phoneNumber: string;
  duties: number;
}

interface ResponseBody {
  code: string;
  success: boolean;
  message: string;
  type: string;
  data?: any;
}

const columns: GridColDef[] = [
  { field: 'contactId', headerName: 'ID',type: 'number', width: 70 },
  { field: 'firstName', headerName: 'first_name', width: 130 },
  { field: 'lasttName', headerName: 'last_name', width: 130 },
  { field: 'mail', headerName: 'Mail', width: 130 },
  { field: 'phoneNumber', headerName: 'Phone Number', width: 130 },
  { field: 'duties', headerName: 'Duties', width: 130 },
];

export default function DataTable() {
  const [rows, setRows] = useState<Row[]>([]);
  const [selectedRowIds, setSelectedRowIds] = useState<GridRowId[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [newContact, setNewContact] = useState<Partial<Row>>({ contactId: 0, firstName: '', lastName: '',mail: '', duties: 0, phoneNumber: '' });
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSelectionChange = (newSelection: GridRowId[]) => {
    setSelectedRowIds(newSelection);
  };

  useEffect(() => {
    fetchContacts();
    handleSearchChange({
      target: {
        value: searchQuery
      }
    } as React.ChangeEvent<HTMLInputElement>);
  }, []);
  
  const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
  
    setSearchQuery(searchValue);
  
    try {
      const result = await HttpManager.searchContact(searchValue) as ResponseBody;
      const filteredRowsWithIds = result.data.map((row: Row) => ({ ...row, id: row.contactId }));
      setRows(filteredRowsWithIds);
      console.log(filteredRowsWithIds)
    } catch (error) {
      console.error('Error fetching filtered contacts:', error);
    }
  };

  const fetchContacts = async () => {
    try {
      console.log("start fetch contacts");
      const result = await HttpManager.getAllContact() as ResponseBody;
      const rowsWithIds = result.data.map((row: Row) => ({ ...row, id: row.contactId }));
      setRows(rowsWithIds);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleDelete = async () => {
    if (selectedRowIds.length === 0) {
      console.log("No rows selected for deletion");
      return;
    }

    try {
      for (const id of selectedRowIds) {
        await HttpManager.deleteContact(id as number)
        console.log(`Contact with ID ${id} deleted successfully`);
      }

      fetchContacts();
      setSelectedRowIds([]);
    } catch (error) {
      console.error('Error deleting contacts:', error);
    }
  };

  const handleAddContact = async () => {
    const params = {
      contact_id: newContact.contactId,
      firstName: newContact.firstName,
      lastName: newContact.lastName,
      phone_number: newContact.phoneNumber,
      mail: newContact.mail,
      duties: newContact.duties
    }

    HttpManager.addContact(params)
      .then(response => {
        console.log('contact added successfully:', response);
        window.location.reload();
      })
      .catch(error => {
        console.error('Error adding contact:', error);
      });

    setOpenDialog(false);
  };

  // 新增生成PDF的功能
  const handleGeneratePdf = async () => {
    try {
      const pdfContent = await HttpManager.generateContactPdf();  // 获取PDF内容（二进制数据）
      
      // 类型断言：假设返回的是 ArrayBuffer
      const blob = new Blob([pdfContent as ArrayBuffer], { type: 'application/pdf' }); // 创建 Blob 对象
      const url = window.URL.createObjectURL(blob);  // 创建一个指向 Blob 对象的 URL
      const a = document.createElement('a');  // 创建一个下载链接
      a.href = url;  // 设置链接的 href 为 Blob URL
      a.download = 'contacts.pdf';  // 设置文件下载的名称
      a.click();  // 自动点击链接，触发下载
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };
  

  const filteredRows = rows.filter(row =>
    row.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.mail.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>Add Contact</Button>
        <TextField
          variant="outlined"
          label="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ marginLeft: '1rem' }}
        />
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={handleGeneratePdf}  // 添加生成 PDF 的按钮事件
          style={{ marginLeft: '1rem' }}
        >
          Generate PDF
        </Button>
      </div>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          rowSelectionModel={selectedRowIds}
          onRowSelectionModelChange={handleSelectionChange}
        />
      </div>
      <div style={{ marginTop: '1rem' }}>
        <Button variant="contained" color="secondary" onClick={handleDelete}>Delete Selected</Button>
      </div>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Contact</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="id"
            label="ID"
            type="text"
            fullWidth
            value={newContact.contactId}
            onChange={(e) => setNewContact({ ...newContact, contactId: Number(e.target.value) })}
          />
          <TextField
            autoFocus
            margin="dense"
            id="first_name"
            label="first_name"
            type="text"
            fullWidth
            value={newContact.firstName}
            onChange={(e) => setNewContact({ ...newContact, firstName: e.target.value })}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={newContact.lastName}
            onChange={(e) => setNewContact({ ...newContact, lastName: e.target.value })}
          />
          <TextField
            margin="dense"
            id="mail"
            label="Mail"
            type="email"
            fullWidth
            value={newContact.mail}
            onChange={(e) => setNewContact({ ...newContact, mail: e.target.value })}
          />
          <TextField
            margin="dense"
            id="phoneNumber"
            label="Phone Number"
            type="text"
            fullWidth
            value={newContact.phoneNumber}
            onChange={(e) => setNewContact({ ...newContact, phoneNumber: e.target.value })}
          />
          <TextField
            margin="dense"
            id="duties"
            label="Duties"
            type="number"
            fullWidth
            value={newContact.duties}
            onChange={(e) => setNewContact({ ...newContact, duties: Number(e.target.value) })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddContact} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
