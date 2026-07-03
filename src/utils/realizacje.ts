import type { ImageMetadata } from "astro";

const images = import.meta.glob<{ default: ImageMetadata }>(
    "/src/assets/realizacje/**/*.jpg",
    { eager: true },
);

export type PhotoPair = {
    key: string;
    przed: ImageMetadata;
    po: ImageMetadata;
};

export type Apartment = {
    slug: string;
    displayName: string;
    pairs: PhotoPair[];
};

// Kolejność = kolejność wyświetlania (od najbardziej spektakularnych).
// pairOrder: opcjonalna, ręczna kolejność par w mieszkaniu (klucze bez prefiksu przed-/po-).
const APARTMENT_META: Array<{
    slug: string;
    displayName: string;
    pairOrder?: string[];
}> = [
    { slug: "nad-sudolem-24-9", displayName: "Nad Sudołem 24/9" },
    {
        slug: "siemienskiego-1",
        displayName: "Siemieńskiego 1",
        // duży pokój (2 kąty) → średni → mały → łazienka → korytarz
        pairOrder: ["2-1", "2-2", "1", "4", "3", "5"],
    },
    { slug: "reja-9", displayName: "Reja 9" },
    { slug: "opolska-35-249", displayName: "Opolska 35/249" },
    { slug: "kluczborska-25", displayName: "Kluczborska 25" },
    { slug: "lipinskiego-8", displayName: "Lipińskiego 8" },
    { slug: "opolska-21", displayName: "Opolska 21" },
    { slug: "grzegorzecka-84-1", displayName: "Grzegórzecka 84/1" },
    { slug: "dukatow-1", displayName: "Dukatów 1" },
    { slug: "bobrzynskiego-45", displayName: "Bobrzyńskiego 45" },
];

function getImage(
    slug: string,
    prefix: "przed" | "po",
    key: string,
): ImageMetadata | undefined {
    const path = `/src/assets/realizacje/${slug}/${prefix}-${key}.jpg`;
    return images[path]?.default;
}

// Jeśli exact key nie znaleziony, fall back to main number (e.g. "2-1" -> "2").
function resolveImage(
    slug: string,
    prefix: "przed" | "po",
    key: string,
): ImageMetadata | undefined {
    const exact = getImage(slug, prefix, key);
    if (exact) return exact;
    const main = key.split("-")[0];
    if (main !== key) return getImage(slug, prefix, main);
    return undefined;
}

function collectKeys(slug: string): string[] {
    const prefix = `/src/assets/realizacje/${slug}/`;
    const keys = new Set<string>();
    for (const path of Object.keys(images)) {
        if (!path.startsWith(prefix)) continue;
        const file = path.slice(prefix.length).replace(/\.jpg$/, "");
        const match = file.match(/^(?:przed|po)-(.+)$/);
        if (match) keys.add(match[1]);
    }
    return Array.from(keys).sort((a, b) => {
        const [am, as = "0"] = a.split("-");
        const [bm, bs = "0"] = b.split("-");
        const an = Number(am);
        const bn = Number(bm);
        if (an !== bn) return an - bn;
        return Number(as) - Number(bs);
    });
}

export const apartments: Apartment[] = APARTMENT_META.map((meta) => {
    const keys = meta.pairOrder ?? collectKeys(meta.slug);
    const pairs = keys
        .map((key): PhotoPair | null => {
            const przed = resolveImage(meta.slug, "przed", key);
            const po = resolveImage(meta.slug, "po", key);
            if (!przed || !po) return null;
            return { key, przed, po };
        })
        .filter((p): p is PhotoPair => p !== null);
    return { slug: meta.slug, displayName: meta.displayName, pairs };
}).filter((a) => a.pairs.length > 0);
