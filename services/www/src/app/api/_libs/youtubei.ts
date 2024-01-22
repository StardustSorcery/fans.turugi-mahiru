import { Innertube } from "youtubei.js";

export async function init() {
  return await Innertube.create({
    lang: 'ja',
    location: 'JP',
  });
}
