'use strict'

export function getCommentsPerDay(commentsCount, signedUp) {
    const signedUpDate = new Date(signedUp); // cast signedUp from String to Date
    const today = new Date(); // Get today's date
    const timeDifference = today - signedUpDate; // count the difference in milliseconds
    const daysSinceSignedUp = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // count days since signed up date
    return (commentsCount / daysSinceSignedUp).toFixed(2) // return comments per day
}