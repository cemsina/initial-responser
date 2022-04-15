import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

export default function IssueDataForm({ data, onChange }) {

  const [formData, setFormData] = React.useState(data);

  React.useEffect(() => {
    onChange(formData);
  }, [formData]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Issue Data
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Your Name"
            fullWidth
            variant="standard"
            value={formData.senderName}
            onChange={e => setFormData({ ...formData, senderName: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Issue From"
            fullWidth
            variant="standard"
            value={formData.from}
            onChange={e => setFormData({ ...formData, from: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            label="Issue Title"
            fullWidth
            variant="standard"
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            label="Issue Subject"
            fullWidth
            multiline={true}
            rows={4}
            variant="standard"
            value={formData.subject}
            onChange={e => setFormData({ ...formData, subject: e.target.value })}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}