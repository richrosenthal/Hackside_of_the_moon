import * as log from "https://deno.land/std/log/mod.ts";




async function downloadLaunchData(){
  log.info("Downloading launch data...");
  const response = await fetch("https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=DEMO_KEY",{
    method: "GET",
  });

  if(!response.ok){
    log.warning("Problem downloading launch data");
    throw new Error("Launch data download failed.");
  }

  const launchData = await response.json();

    console.log(launchData)
  }




await downloadLaunchData();
