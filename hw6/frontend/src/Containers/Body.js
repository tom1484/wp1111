import { useState } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { useStyles } from '../hooks';
import axios from '../api';
import { useScoreCard } from '../hooks/useScoreCard';
import { Tabs, Tab } from '@material-ui/core';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1em;
`;

const StyledFormControl = styled(FormControl)`
  min-width: 120px;
`;

const ContentPaper = styled(Paper)`
  height: 300px;
  padding: 2em;
  overflow: auto;
`;

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      // id={`simple-tabpanel-${index}`}
      // aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (children)}
    </div>
  );
}

const Body = () => {
  const classes = useStyles();

  const { messages, addCardMessage, addRegularMessage, addErrorMessage } =
    useScoreCard();

  // const [tabKey, setTabKey] = useState(0);

  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [score, setScore] = useState(0);

  const [queryType, setQueryType] = useState('name');
  const [queryString, setQueryString] = useState('');

  const handleChange = (func) => (event) => {
    func(event.target.value);
  };

  const handleAdd = async () => {
    const {
      data: { message, card },
    } = await axios.post('/card', {
      name,
      subject,
      score,
    });

    if (!card) addErrorMessage(message);
    else addCardMessage(message);
  };

  const handleQuery = async () => {
    const {
      data: { messages, message },
    } = await axios.get('/cards', {
      params: {
        type: queryType,
        queryString,
      },
    });

    if (!messages) addErrorMessage(message);
    else addRegularMessage(...messages);
  };

  // const handleTabKeyChange = (event, newTabKey) => {
  //   setTabKey(newTabKey);
  // };

  return (
    <Wrapper>
      {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={ tabKey } onChange={ handleTabKeyChange }>
          <Tab label='ADD' />
          <Tab label='QUERY' />
        </Tabs>
      </Box>
      <TabPanel value={ tabKey } index={0}> */}
        <Row>
          {/* Could use a form & a library for handling form data here such as Formik, but I don't really see the point... */}
          <TextField
            className={classes.input}
            placeholder="Name"
            value={name}
            onChange={handleChange(setName)}
          />
          <TextField
            className={classes.input}
            placeholder="Subject"
            style={{ width: 240 }}
            value={subject}
            onChange={handleChange(setSubject)}
          />
          <TextField
            className={classes.input}
            placeholder="Score"
            value={score}
            onChange={handleChange(setScore)}
            type="number"
          />
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            disabled={!name || !subject}
            onClick={handleAdd}
          >
            Add
          </Button>
        </Row>
      {/* </TabPanel>
      
      <TabPanel value={ tabKey } index={1}> */}
        <Row>
          <StyledFormControl>
            <FormControl component="fieldset">
              <RadioGroup
                row
                value={queryType}
                onChange={handleChange(setQueryType)}
              >
                <FormControlLabel
                  value="name"
                  control={<Radio color="primary" />}
                  label="Name"
                />
                <FormControlLabel
                  value="subject"
                  control={<Radio color="primary" />}
                  label="Subject"
                />
              </RadioGroup>
            </FormControl>
          </StyledFormControl>
          <TextField
            placeholder="Query string..."
            value={queryString}
            onChange={handleChange(setQueryString)}
            style={{ flex: 1 }}
          />
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            disabled={!queryString}
            onClick={handleQuery}
          >
            Query
          </Button>
        </Row>
      {/* </TabPanel> */}
      <ContentPaper variant="outlined">
        {messages.map((m, i) => (
          <Typography variant="body2" key={m + i} style={{ color: m.color }}>
            {m.message}
          </Typography>
        ))}
      </ContentPaper>
    </Wrapper>
  );
};

export default Body;
