export type LetterboxdReview = {
  excerpt: string;
  filmTitle: string;
  filmYear: string;
  id: string;
  posterUrl: string;
  publishedAt: string;
  rating: number | null;
  ratingLabel: string;
  url: string;
};

const FEED_REVALIDATE_SECONDS = 60 * 60;

function decodeEntities(value: string) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function stripCdata(value: string) {
  return value
    .replace(/^<!\[CDATA\[/, "")
    .replace(/\]\]>$/, "")
    .trim();
}

function stripHtml(value: string) {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractTag(block: string, tag: string) {
  const escapedTag = tag.replace(":", "\\:");
  const regex = new RegExp(
    `<${escapedTag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escapedTag}>`,
    "i",
  );
  const result = block.match(regex)?.[1] ?? "";

  return result.trim();
}

function toStarLabel(rating: number | null) {
  if (rating === null || Number.isNaN(rating)) {
    return "No rating";
  }

  const whole = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;

  return `${"★".repeat(whole)}${hasHalf ? "½" : ""}`;
}

function toExcerpt(descriptionRaw: string) {
  const withoutImageParagraph = descriptionRaw.replace(
    /<p>\s*<img[^>]*>\s*<\/p>/i,
    "",
  );

  return decodeEntities(stripHtml(withoutImageParagraph));
}

function toPosterUrl(descriptionRaw: string) {
  const posterMatch =
    descriptionRaw.match(/<img[^>]+src="([^"]+)"/i)?.[1] ?? "";

  return decodeEntities(posterMatch);
}

export async function getLetterboxdReviews({
  limit = 4,
  username = "LeeMulvey",
}: {
  limit?: number;
  username?: string;
} = {}): Promise<LetterboxdReview[]> {
  const feedUrl = `https://letterboxd.com/${username.toLowerCase()}/rss/`;

  try {
    const response = await fetch(feedUrl, {
      headers: {
        accept: "application/rss+xml, application/xml;q=0.9,*/*;q=0.8",
      },
      next: { revalidate: FEED_REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      return [];
    }

    const xml = await response.text();
    const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
    const reviews: LetterboxdReview[] = [];

    let itemMatch = itemRegex.exec(xml);

    while (itemMatch !== null) {
      const block = itemMatch[1];
      const guid = decodeEntities(extractTag(block, "guid"));

      if (!guid.includes("letterboxd-review-")) {
        itemMatch = itemRegex.exec(xml);
        continue;
      }

      const filmTitle = decodeEntities(
        extractTag(block, "letterboxd:filmTitle"),
      );
      const filmYear = decodeEntities(extractTag(block, "letterboxd:filmYear"));
      const link = decodeEntities(extractTag(block, "link"));
      const publishedAt = decodeEntities(extractTag(block, "pubDate"));

      const descriptionRaw = stripCdata(extractTag(block, "description"));
      const excerpt = toExcerpt(descriptionRaw);
      const posterUrl = toPosterUrl(descriptionRaw);

      const ratingRaw = extractTag(block, "letterboxd:memberRating");
      const rating = ratingRaw ? Number.parseFloat(ratingRaw) : null;

      reviews.push({
        excerpt,
        filmTitle,
        filmYear,
        id: guid,
        posterUrl,
        publishedAt,
        rating,
        ratingLabel: toStarLabel(rating),
        url: link,
      });

      if (reviews.length >= limit) {
        break;
      }

      itemMatch = itemRegex.exec(xml);
    }

    return reviews;
  } catch {
    return [];
  }
}
