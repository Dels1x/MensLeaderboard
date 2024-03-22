'use client'

import Head from "next/head";
import React, {useState} from "react";
import {Button, TextField} from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from "next/link";
import {useRouter} from "next/router";
import Image from "next/image";
import {Roboto} from "next/font/google";

const name = "mens)) leaderboard";
const roboto = Roboto({
    weight: "500",
    style: "normal",
    subsets: ["latin", "latin-ext"],
});

export default function Layout({children}) {
    const [textFieldContent, setTextFieldContent] = useState('');
    const router = useRouter();
    const prefersDarkTheme = useMediaQuery('(prefers-color-scheme: dark)');
    const textColor = prefersDarkTheme ? 'white' : 'black';

    const submitMen = async () => {
        if (/^\d+$/.test(textFieldContent)) {
            await router.push(`/mens/${textFieldContent}`);
        }
    };

    const handleUserInput = (e) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            setTextFieldContent(e.target.value);
        }
    };

    return <div className={roboto.className}>
        <Head>
            <title>{name}</title>
            <link rel="icon" href="/logo.ico"/>
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
            </div>
        </main>
        <footer>
            <div id="thanks">
                Made by <a target="_blank" href="https://www.hltv.org/profile/1707809/delsix">delsix</a><br />
                Huge thanks to <a target="_blank" href="https://www.hltv.org/profile/1315925/radnikey">RADNIKEY</a> for his original 20k comments club.<br />
                Here is the previous <a target="blank" href="https://web.archive.org/web/20220214181832/https://206mens.000webhostapp.com/">"mens)) leaderboard"</a> if anyone is curious.<br />
                Here is the <a target="_blank" href="https://github.com/Dels1x/MensLeaderboard">source code</a> if anyone is interested<br />
            </div>
            <div id="disclaimer">
                DISCLAIMER: never chase the bigger comments count and write comments just for the sake of incrementing it.
                Needless to say, that this site is made only for the sake of fun and not actual competition <br /><br />
                Sometimes the site might not be up. The reason is because the API is deployed on my laptop locally in Ukraine, and I might not always have electricity
            </div>
        </footer>
    </div>
}