# Mens)) Leaderboard

Mens Leaderboard is a full stack web application project, it was created with Java, Spring Boot and Next.js.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Usage of technologies](#usage-of-technologies)

## Introduction

This project is a leaderboard of HLTV users by their comments count. "mens))" is a huge lovely meme on how HLTV users
love to refer to themselves, thus the project is called "Mens)) Leaderboard" 

## Features

- Leaderboard
- User profiles
- Pagination

## Technologies
<h4>Backend</h4>
<ul>
    <li>Java 17</li>
    <li>Spring Boot 3</li>
    <li>Spring Web</li>
    <li>Spring Data JPA</li>
    <li>PostgreSQL</li>
    <li>Jsoup</li>
</ul>

<h4>Frontend</h4>
<ul>
    <li>JavaScript</li>
    <li>Next.js</li>
    <li>Material UI</li>
</ul>

## Usage Of Technologies
<h4>On the Backend Side, </h4>
Spring Boot was used for RESTful API. PostgreSQL for database.
JSoup scrapes user info from HLTV.org and puts it in a database. If existing user was asked to create, it updates his
data, but only if 4 hours has passed since the last update.

<h4>On the Frontend Side, </h4>
Frontend side was written using JavaScript and Next.js. Server side rendering process is used.
Frontend communicates with Backend and actively fetches and updates the leaderboard
