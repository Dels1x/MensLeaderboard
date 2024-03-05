'use strict'

export async function getAllMens() {
    const link = "http://localhost:8080/mens/all";

    return await executeGet(link);
}

export async function getAllIds() {
    const link = "http://localhost:8080/mens/ids";

    const ids = await executeGet(link);
    return ids.map(id => ({params: {"id": id.toString()}})); // map ids to the correct format and return
}

export async function getMenData(id) {
    const link = `http://localhost:8080/mens/get?id=${id}`

    return await executeGet(link);
}

export async function createMen(id) {
    const link = `http://localhost:8080/mens/new?id=${id}`
    console.log("i'm here");
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
    await fetch(
        link,
        {
            method: "POST"
        });
}