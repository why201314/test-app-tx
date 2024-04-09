import React from 'react';
import logo from './logo.svg';
import './css/App.css';
import './css/timecard.css';
import dayjs, { Dayjs } from 'dayjs';
import MuiTest from './MuiTest';
import PrimarySearchAppBar from './component/MyMenu'
import AppRouter from './component/AppRouter';
import SignIn from './component/SignIn';
import StickyFooter from './component/StickyFooter';
import YearMonthSelect from './component/YearMonthSelect';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Input, Button} from '@mui/material';
import StickyHeadTable from './component/SearchResult';
import StaffInfoDialog from './component/StaffInfoDialog';

function TimeCard() {

  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));

  return (
    <div className="App">
      <PrimarySearchAppBar />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className='top-margin'></div>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={4} className='text_right'>
              対象年月
            </Grid>
            <Grid item xs={8}>
              <DatePicker
                label="Controlled picker"
                value={value}
                onChange={(newValue) => setValue(newValue)}
              />
            </Grid>

            <Grid item xs={4} className='text_right'>
              勤務表ファイル選択
            </Grid>
            <Grid item xs={8}>
              <Input type="file" name="timecard_file" id="timecard_file"  className='formControl'/>
            </Grid>

            <Grid item xs={4} ></Grid>
            <Grid item xs={2} >
             <StaffInfoDialog />
            </Grid>
            <Grid item xs={2}>
            <Button name="cancel" id="cancel" variant="contained" sx={{ mt: 3, mb: 2 }} fullWidth>キャンセル</Button>
            </Grid>
            <Grid item xs={4} ></Grid>

          </Grid>
        </Box>

        <Box sx={{ flexGrow: 1 }} className="table_result">
          <StickyHeadTable  />
        </Box>
      </LocalizationProvider>

      <StickyFooter />
    </div>
  );
}

export default TimeCard;
