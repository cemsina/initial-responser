import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IssueDataForm from './IssueDataForm';
import CreateResponseForm from './CreateResponseForm';
import Review from './Review';

const steps = ['Issue Data', 'Create Response', 'Review'];
const theme = createTheme();

export default function ResponserForm() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [issueData, setIssueData] = React.useState({});
  const [responseText, setResponseText] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  function createNew() {
    setLoading(true);
    fetch(`/api/initial`, {
      method: "POST",
      body: JSON.stringify(issueData),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(e => {
      e.json().then(data => {
        setResponseText(data.choices[0].text);
        setLoading(false);
      })
    }).catch(e => {
      setResponseText("Error: \n" + JSON.stringify(e));
      setLoading(false);
    })
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <IssueDataForm data={issueData} onChange={setIssueData} />;
      case 1:
        return <CreateResponseForm loading={loading} createNew={createNew} responseText={responseText} onChange={setResponseText} issueData={issueData} />;
      case 2:
        return <Review responseText={responseText} />;
      default:
        throw new Error('Unknown step');
    }
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  React.useEffect(() => {
    if(activeStep === 1){
      createNew();
    }
  }, [activeStep]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Alyo Initial Responser
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Send is not implemented yet :( <br />
                  Please send manually
                </Typography>
                <Review responseText={responseText} />
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }} disabled={loading}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                    disabled={loading}
                  >
                    {activeStep === steps.length - 1 ? 'Send' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}