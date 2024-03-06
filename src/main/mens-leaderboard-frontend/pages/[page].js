"use strict"

import Layout from "@/layout/layout";
import styles from "../styles/Home.module.css";
import {getAllMens, getPagesAmount} from "@/api/api";
import Link from "next/link";
import {Button} from "@mui/material";
import {useRouter} from "next/router";

export default function Home({allMens, currentPage, pagesAmount}) {
    const router = useRouter();

    const prevPage = async () => {
        if (currentPage > 0) {
            await router.replace(`/${parseInt(currentPage) - 1}`);
        }
    };
    const nextPage = async () => {
        if (currentPage < pagesAmount - 1) {
            await router.replace(`/${parseInt(currentPage) + 1}`);
        }
    };

    return (
        <Layout>
            <div id="paginationBlock">
                <div><h2>leaderboard of mens))</h2></div>
                <div>
                    <Button onClick={prevPage}>Prev</Button>
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

export async function getStaticPaths() {
    const pagesAmount = await getPagesAmount();
    let paths = [];

    for (let i = 0; i < pagesAmount; i++) {
        paths.push(
            {
                params: {
                    page: i.toString()
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
            allMens,
            currentPage: params.page.toString(),
            pagesAmount: await getPagesAmount()
        },
        revalidate: 60
    }
}