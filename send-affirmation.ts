import * as base64 from "https://denopkg.com/chiefbiiko/base64/mod.ts";

const getAffirmations = async (fileName: string): Promise<Array<string>> => {
 const decoder = new TextDecoder("utf-8");

 const text: string = decoder.decode(await Deno.readFile("affirmations.txt"));
 return text.split("\n");
};

const affirmations: Array<string> = await getAffirmations("affirmations.txt");

const affirmation: string =
 affirmations[Math.floor(Math.random() * affirmations.length)];
console.log(affirmation);

const accountSid: string | undefined = Deno.env.get("TWILIO_ACCOUNT_SID");
const authToken: string | undefined = Deno.env.get("TWILIO_API_KEY");
const fromNumber: string = "+19252593601";
const toNumber: string = "+14344010794";

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

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `Basic ${encodedCredentials}`,
    },
    body,
  });
  return response.json();
};

const response = await sendTextMessage(
  affirmation,
  accountSid,
  authToken,
  fromNumber,
  toNumber,
);

console.log(response);
