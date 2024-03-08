'use client'

import Head from "next/head";
import React, {useState} from "react";
import {Button, TextField} from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from "next/link";
import {createMen} from "@/api/api";
import {useRouter} from "next/router";
import Image from "next/image";
import {Analytics} from "@vercel/analytics/next";

const name = "mens)) leaderboard"

export default function Layout({children}) {
    const router = useRouter();
    const [textFieldContent, setTextFieldContent] = useState('');
    const prefersDarkTheme = useMediaQuery('(prefers-color-scheme: dark)');
    const textColor = prefersDarkTheme ? 'white' : 'black';

    const submitMen = async () => {
        if (/^\d+$/.test(textFieldContent)) {
            await createMen(textFieldContent);
            await router.push(`/mens/${textFieldContent}`);
        }
    };

    const handleUserInput = (e) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            setTextFieldContent(e.target.value);
        }
    };

    return <div>
        <Head>
            <title>{name}</title>
            <link rel="icon" href="/logo.ico"/>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap" rel="stylesheet"/>
            <meta
                name="description"
                content="The very bestest mens)) leaderboard"
            />
        </Head>
        <nav>
            <div id="leftSide">
                <div>
                    <Link href="/">
                        <Image
                            src="/logo.png"
                            width="50"
                            height="50"
                            alt="HLTV"/>
                    </Link>
                </div>
            </div>
            <div id="rightSide">
                <TextField
                    focused
                    id="standard-basic"
                    label="Enter mens' ID"
                    variant="standard"
                    value={textFieldContent}
                    onChange={(e) => handleUserInput(e)}
                    InputProps={{style: {color: textColor}}}/>
                <Button variant="outlined" onClick={submitMen}>Submit</Button>
            </div>
        </nav>
        <main id="mainContentParent">
            <div id="mainContent">
                {children}
                <Analytics />
            </div>
        </main>
        <footer>
            <div id="thanks">
                Made by <a href="https://www.hltv.org/profile/1707809/delsix">delsix</a><br />
                Huge thanks to <a target="_blank" href="https://www.hltv.org/profile/1315925/radnikey">RADNIKEY</a> for his original 20k comments club.<br />
                Here is the previous <a target="blank" href="https://web.archive.org/web/20220214181832/https://206mens.000webhostapp.com/">"mens)) leaderboard"</a> if anyone is curious.<br />
                Here is the <a href="https://github.com/Dels1x/MensLeaderboard">source code</a> if anyone is interested<br />
            </div>
            <div id="disclaimer">
                DISCLAIMER: never chase the bigger comments count and write comments just for the sake of incrementing it. It never ends well.
            </div>
        </footer>
    </div>
}