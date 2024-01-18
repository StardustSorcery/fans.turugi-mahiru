import { google } from "googleapis";

export async function init() {
  const gYoutube = google
    .youtube({
      version: 'v3',
      auth: process.env.GOOGLE_API_KEY,
    });

  return gYoutube;
}
