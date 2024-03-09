'use strict'

const size = 50;
const mainHttp = "https://good-squids-dig.loca.lt";
const headers = new Headers();
headers.append("bypass-tunnel-reminder", process.env.TUNNEL_PASSWORD);

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
        });

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
            headers
        });

    if (!res.ok) {
        console.error("Response is not okay");
        return null;
    }
}