"use strict"
'use client'

import {getAllIds, getMenData} from "@/pages/api/api";
import Layout from "@/layout/layout";

export default function Men({menData}) {
    return <Layout>
        <div>{menData.name} - {menData.commentsCount}</div>
        <div>{menData.id}, {menData.signedUp}, {menData.country}</div>
    </Layout>
}

export async function getStaticPaths() {
    const paths = await getAllIds();

    return {
        paths,
        fallback: 'blocking'
    }
}

export async function getStaticProps({params}) {
    const menData = await getMenData(params.id);

    return {
        props: {
            menData
        }
    };
}