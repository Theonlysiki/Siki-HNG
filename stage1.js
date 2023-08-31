const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const d = new Date();
let day = weekday[d.getDay()]

function getCurrentUTCTime() {
    const now = new Date();
    const currentUTCTime = now.toISOString();
    return currentUTCTime;
  }
  
  function validateTimeWithinRange(targetTime, allowedDeviationInSeconds) {
    const currentTime = new Date();
    const target = new Date(targetTime);
    const timeDifference = Math.abs(currentTime - target) / 1000; // Convert to seconds
  
    return timeDifference <= allowedDeviationInSeconds;
  }
  
  const allowedDeviationInSeconds = 2;
  
  const targetTime = getCurrentUTCTime();
  const isValid = validateTimeWithinRange(targetTime, allowedDeviationInSeconds);
  
  let utcTime = null;
  
  if (isValid) {
    utcTime = targetTime;
    console.log(`UTC Time within +/- ${allowedDeviationInSeconds} seconds range: ${utcTime}`);
  } else {
    console.log(`UTC Time is not within the valid range.`);
  }
  
 app.get('/info', async function(req, res) {
    try {
        const slackName = req.query.slack_name; // Extract Slack Name from query parameter
        const chosenTrack = req.query.track;     // Extract Chosen Track from query parameter
        
        const json = {
            slack_name: slackName,
            current_day_of_the_week: day,
            current_utc_time: utcTime,
            track: chosenTrack,
            Github_Url: "https://github.com/Tad-z",
            full_source_code: 'code'
        };

        res.status(200).json(json);
    } catch(err) {
        res.send(err.message);
    }  
});

  
app.listen(5000, () => {
    console.log("Server Started");
})