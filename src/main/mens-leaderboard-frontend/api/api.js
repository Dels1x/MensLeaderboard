'use strict'

const size = 50;
const mainHttp = "https://b003-195-93-212-230.ngrok-free.app";
const headers = new Headers({
    "ngrok-skip-browser-warning": "69420",
});

export function getSize() {
    return size;
}

export async function getAllMens(page = 0) {
    const link = `${mainHttp}/mens/all?page=${page}&size=${size}`;
    const res = await executeGet(link);
    return res !== null ? await res.json() : null;
}

export async function getMenPosition(id) {
    const link = `${mainHttp}/mens/pos?id=${id}`;
    const res = await executeGet(link);
    return res !== null ? await res.json() : null;
}

export async function getPagesAmount() {
    const link = `${mainHttp}/mens/pagesAmount?size=${size}`;
    const res = await executeGet(link);
    return res !== null ? await res.json() : null;
}

export async function getMenData(id) {
    const link = `${mainHttp}/mens/get?id=${id}`
    await createMen(id); // updating men
    const res = await executeGet(link);

    return res !== null ? await res.json() : null;
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
        return res;
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