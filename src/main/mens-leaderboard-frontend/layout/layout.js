'use client'

import Head from "next/head";
import React, {useState} from "react";
import {Button, TextField} from "@mui/material";
import Link from "next/link";
import {createMen} from "@/pages/api/api";

const name = "mens)) leaderboard"

export default function Layout({children}) {
    const [textFieldContent, setTextFieldContent] = useState('');

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
                InputProps={{ style: { color: 'white' } }}/>
            <Button variant="outlined" onClick={submitMen}>Submit</Button>
        </nav>
        <main>{children}</main>
    </div>
}