import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { CircularProgress, IconButton, LinearProgress } from '@mui/material';
import RefreshIcon from "@mui/icons-material/Refresh";

export default function CreateResponseForm({ responseText, onChange, issueData, createNew, loading }) {

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Create Response
        <IconButton style={{ float: "right" }} onClick={createNew} disabled={loading}>
          <RefreshIcon />
        </IconButton>
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {loading && <LinearProgress />}
          <TextField
            fullWidth
            variant="filled"
            multiline={true}
            rows={15}
            value={responseText}
            onChange={e => onChange(e.target.value)}
            disabled={loading}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}