export type NowPlaying =
  | {
      playing: true;
      track: string;
      artist: string;
      album: string;
      albumArt: string | null;
      url: string;
    }
  | { playing: false };

const LASTFM_USERNAME = "LeeMulvey";
const LASTFM_API_URL = "https://ws.audioscrobbler.com/2.0/";

type LastfmImage = { size: string; "#text": string };

type LastfmTrack = {
  name: string;
  artist: { "#text": string };
  album: { "#text": string };
  image: LastfmImage[];
  url: string;
  "@attr"?: { nowplaying?: string };
};

function toAlbumArt(images: LastfmImage[]) {
  const large = images.find((image) => image.size === "extralarge");

  return large?.["#text"] || null;
}

export async function getNowPlaying(): Promise<NowPlaying> {
  const apiKey = process.env.LASTFM_API_KEY;

  if (!apiKey) {
    return { playing: false };
  }

  try {
    const params = new URLSearchParams({
      api_key: apiKey,
      format: "json",
      limit: "1",
      method: "user.getrecenttracks",
      user: LASTFM_USERNAME,
    });

    const response = await fetch(`${LASTFM_API_URL}?${params}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return { playing: false };
    }

    const data = (await response.json()) as {
      recenttracks?: { track?: LastfmTrack[] };
    };
    const track = data.recenttracks?.track?.[0];

    if (!track || track["@attr"]?.nowplaying !== "true") {
      return { playing: false };
    }

    return {
      album: track.album["#text"],
      albumArt: toAlbumArt(track.image),
      artist: track.artist["#text"],
      playing: true,
      track: track.name,
      url: track.url,
    };
  } catch {
    return { playing: false };
  }
}
