'use client'

import Head from "next/head";
import React, {useState} from "react";
import {Button, TextField} from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from "next/link";
import {createMen} from "@/api/api";
import {useRouter} from "next/router";
import Image from "next/image";

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
            </div>
        </main>
    </div>
}