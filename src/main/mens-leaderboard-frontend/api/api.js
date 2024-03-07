'use strict'

const size = 20;

export function getSize() {
    return size;
}

export async function getAllMens(page = 0) {
    const link = `http://probably-eternal-skylark.ngrok-free.app/mens/all?page=${page}&size=${size}`;
    return await executeGet(link);
}

export async function getMenPosition(id) {
    const link = `http://probably-eternal-skylark.ngrok-free.app/mens/pos?id=${id}`;
    return await executeGet(link);
}

export async function getPagesAmount() {
    const link = `http://probably-eternal-skylark.ngrok-free.app/mens/pagesAmount?size=${size}`;
    return await executeGet(link);
}

export async function getAllIds() {
    const link = "http://probably-eternal-skylark.ngrok-free.app/mens/ids";

    const ids = await executeGet(link);
    return ids.map(id => ({params: {"id": id.toString()}})); // map ids to the correct format and return
}

export async function getMenData(id) {
    const link = `http://probably-eternal-skylark.ngrok-free.app/mens/get?id=${id}`
    await createMen(id); // updating men
    return await executeGet(link);
}

export async function createMen(id) { // also updates mens
    const link = `http://probably-eternal-skylark.ngrok-free.app/mens/new?id=${id}`
    await executePost(link);
}

async function executeGet(link) {
    const res = await fetch(link);

    if (!res.ok) {
        console.error("Response is not okay");
        return null;
    }

    try {
        return await res.json()
    } catch (error) {
        console.error("Error parsing JSON:", error.message);
        return null;
    }
}

async function executePost(link) {
    const res = await fetch(
        link,
        {
            method: "POST"
        });

    if (!res.ok) {
        console.error("Response is not okay");
        return null;
    }
}