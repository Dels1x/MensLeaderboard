"use strict"

import Layout from "@/layout/layout";
import styles from "../styles/Home.module.css";
import {getAllMens} from "@/api/api";
import {useRouter} from 'next/router';
import Link from "next/link";
import {Button} from "@mui/material";

export default function Home({allMens}) {
    const router = useRouter();

    const nextPage = async () => {
        await router.replace("/1");
    };

    return (
        <Layout>
            <div id="paginationBlock">
                <div><h2>leaderboard of mens))</h2></div>
                <div>
                    <Button onClick={nextPage}>Next</Button>
                </div>
            </div>

            {allMens && allMens.length > 0 ? (
                <div>
                    {allMens.map((men) => (
                        <section key={men.id} className={styles.men}>
                            <h2>
                                <Link href={`/mens/${men.id}`}>{men.name}</Link> - {men.commentsCount}
                            </h2>
                        </section>
                    ))}
                </div>
            ) : (
                <p>No data available</p>
            )}
        </Layout>
    );
}

export async function getStaticProps() {
    const allMens = await getAllMens();

    return {
        props: {
            allMens
        },
        revalidate: 60
    }
}