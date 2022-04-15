import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';


export default function Review({responseText}) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Review
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="filled"
            multiline={true}
            rows={10}
            value={responseText}
            disabled
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}