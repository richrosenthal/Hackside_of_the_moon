import * as log from "https://deno.land/std/log/mod.ts";




async function downloadLaunchData(){
  log.info("Downloading launch data...");
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
    console.log(launchData[yesterdayOnMars]);
    console.log(launchData[todayOnMars]);

  }




await downloadLaunchData();
