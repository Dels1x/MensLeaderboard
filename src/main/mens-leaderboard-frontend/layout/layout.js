'use client'

import Head from "next/head";
import React, {useState} from "react";
import {Button, TextField} from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from "next/link";
import {createMen} from "@/api/api";

const name = "mens)) leaderboard"

export default function Layout({children}) {
    const [textFieldContent, setTextFieldContent] = useState('');
    const prefersDarkTheme = useMediaQuery('(prefers-color-scheme: dark)');
    const textColor = prefersDarkTheme ? 'white' : 'black';

    const submitMen = async () => {
        if (/^\d+$/.test(textFieldContent)) {
            await createMen(textFieldContent);
            window.location.href = `/mens/${textFieldContent}`;
        }
    }

    return <div>
        <Head>
            <title>{name}</title>
            <meta
                name="description"
                content="The very bestest mens)) leaderboard"
            />
        </Head>
        <nav>
            <Link href="/"><Button variant="outlined">HLTV</Button></Link>
            <TextField
                variant="standard"
                value={textFieldContent}
                onChange={(e) => setTextFieldContent(e.target.value)}
                InputProps={{ style:  { color: textColor } }}/>
            <Button variant="outlined" onClick={submitMen}>Submit</Button>
        </nav>
        <main id="mainContentParent">
            <div id="mainContent">
                {children}
            </div>
        </main>
    </div>
}