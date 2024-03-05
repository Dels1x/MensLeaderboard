"use strict"

import Layout from "@/layout/layout";
import styles from "../styles/Home.module.css";
import {getAllMens, getPagesAmount} from "@/api/api";
import Link from "next/link";

export default function Home({allMens}) {
    return (
        <Layout>
            <div id="paginationBlock">
                <div><h2>leaderboard of mens))</h2></div>
                <div></div>
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

export async function getStaticPaths() {
    const pagesAmount = getPagesAmount();
    let paths = [];

    for (let i = 0; i < pagesAmount; i++) {
        paths.push(
            {
                params: {
                    page: i
                }
            }
        )
    }

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params}) {
    const allMens = await getAllMens(params.page);

    return {
        props: {
            allMens
        },
        revalidate: 60
    }
}