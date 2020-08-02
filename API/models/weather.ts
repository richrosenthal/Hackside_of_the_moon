import * as log from "https://deno.land/std/log/mod.ts";
import * as base64 from "https://denopkg.com/chiefbiiko/base64/mod.ts";

let roverData = new Array();

async function downloadLaunchData(){
  log.info("Downloading Insight Rover data...");
  const response = await fetch("https://api.nasa.gov/insight_weather/?api_key=DEMO_KEY&feedtype=json&ver=1.0",{
    method: "GET",
  });

  if(!response.ok){
    log.warning("Problem downloading launch data");
    throw new Error("Launch data download failed.");
  }

  const launchData = await response.json();
  let yesterdayOnMars = launchData.sol_keys[5];
  let todayOnMars = launchData.sol_keys[6];
  // console.log(launchData.sol_keys);
    console.log(launchData[yesterdayOnMars].AT.mn);
    console.log(launchData[todayOnMars].AT.mx);
    console.log(launchData[todayOnMars].AT.mn);
    console.log(launchData[todayOnMars].Last_UTC);
    console.log(launchData.sol_keys[6]);

    let stringTodaySol = `${launchData.sol_keys[6]}`;
    let stringTodayMaxTemp = `${launchData[todayOnMars].AT.mx}`;
    let stringTodayMinTemp = `${launchData[todayOnMars].AT.mn}`;
    let stringTodayUpdate = `${launchData[todayOnMars].Last_UTC}`;

    let stringYesterdaySol = `${launchData.sol_keys[5]}`;
    let stringYesterdayMaxTemp = `${launchData[yesterdayOnMars].AT.mx}`;
    let stringYesterdayMinTemp = `${launchData[yesterdayOnMars].AT.mn}`;
    let stringYesterdayUpdate = `${launchData[yesterdayOnMars].Last_UTC}`;

    roverData.push(stringTodaySol);
    roverData.push(stringTodayMaxTemp);
    roverData.push(stringTodayMinTemp);
    roverData.push(stringTodayUpdate);

    roverData.push(stringYesterdaySol);
    roverData.push(stringYesterdayMaxTemp);
    roverData.push(stringYesterdayMinTemp);
    roverData.push(stringYesterdayUpdate);

    console.log(roverData);

    let todaysTemp = `It is currently ${launchData[todayOnMars].AT.mx} degrees on mars`


      const accountSid: string | undefined = Deno.env.get("TWILIO_ACCOUNT_SID");
      const authToken: string | undefined = Deno.env.get("TWILIO_API_KEY");
      const fromNumber: string = "insert twilio update";
      const toNumber: string = "insert your number";

      const sendTextMessage = async (
        messageBody: string,
        accountSid: string | undefined,
        authToken: string | undefined,
        fromNumber: string,
        toNumber: string,
      ): Promise<any> => {
        if (!accountSid || !authToken) {
          console.log(
            "Your Twilio account credentials are missing. Please add them.",
          );
          return;
        }
        const url: string =
          `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

        const encodedCredentials: string = base64.fromUint8Array(
          new TextEncoder().encode(`${accountSid}:${authToken}`),
        );
        const body: URLSearchParams = new URLSearchParams({
          To: toNumber,
          From: fromNumber,
          Body: messageBody,
        });

        const responseTwilio = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Basic ${encodedCredentials}`,
          },
          body,
        });
        return responseTwilio.json();
      };

      const responseTwilio = await sendTextMessage(
        todaysTemp,
        accountSid,
        authToken,
        fromNumber,
        toNumber,
      );


  }




await downloadLaunchData();

export function getRoverInformation() {

  return roverData;
}

export function getSendSMS() {
  //todo add code
  let message = "This should send a text";
  return message;

}
