'use strict'

const size = 50;
const mainHttp = "https://d584-195-93-212-239.ngrok-free.app";
const headers = new Headers({
    "ngrok-skip-browser-warning": "69420",
});

export function getSize() {
    return size;
}

export async function getAllMens(page = 0) {
    const link = `${mainHttp}/mens/all?page=${page}&size=${size}`;
    return await executeGet(link);
}

export async function getMenPosition(id) {
    const link = `${mainHttp}/mens/pos?id=${id}`;
    return await executeGet(link);
}

export async function getPagesAmount() {
    const link = `${mainHttp}/mens/pagesAmount?size=${size}`;
    return await executeGet(link);
}

export async function getAllIds() {
    const link = `${mainHttp}/mens/ids`;

    const ids = await executeGet(link);
    return ids.map(id => ({params: {"id": id.toString()}})); // map ids to the correct format and return
}

export async function getMenData(id) {
    const link = `${mainHttp}/mens/get?id=${id}`
    await createMen(id); // updating men
    return await executeGet(link);
}

export async function createMen(id) { // also updates mens
    const link = `${mainHttp}/mens/new?id=${id}`
    await executePost(link);
}

async function executeGet(link) {
    const res = await fetch(
        link,
        {
            headers
        }
    );

    if (!res.ok) {
        console.error("Response is not okay");
        return null;
    }

    try {
        return await res.json();
    } catch (error) {
        console.error("Error parsing JSON:", error.message);
    }
}

async function executePost(link) {
    const res = await fetch(
        link,
        {
            method: "POST",
            headers,
            next: {
                tags: ['collection']
            }
        });

    if (!res.ok) {
        console.error("Response is not okay");
        return null;
    }
}

export async function handler(req, res) {
    // Check for secret to confirm this is a valid request
    if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
        return res.status(401).json({ message: 'Invalid token' })
    }

    try {
        // this should be the actual path not a rewritten path
        // e.g. for "/blog/[slug]" this should be "/blog/post-1"
        await res.revalidate('/post-1')
        return res.json({ revalidated: true })
    } catch (err) {
        // If there was an error, Next.js will continue
        // to show the last successfully generated page
        return res.status(500).send('Error revalidating')
    }
}