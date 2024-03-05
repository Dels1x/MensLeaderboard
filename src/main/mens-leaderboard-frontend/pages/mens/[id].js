"use strict"
'use client'

import {getAllIds, getMenData} from "@/api/api";
import Layout from "@/layout/layout";

export default function Men({menData}) {
    return <Layout>
        <section>
            <div>{menData.name} - {menData.commentsCount}</div>
            <div>{menData.id}, {menData.signedUp}, {menData.country}</div>
        </section>
    </Layout>
}

export async function getStaticPaths() {
    const paths = await getAllIds();
    console.log(paths);

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