"use strict"

import Layout from "@/layout/layout";
import styles from "../styles/Home.module.css";
import {getAllMens, getPagesAmount, getSize} from "@/api/api";
import Link from "next/link";
import {Button} from "@mui/material";
import {useRouter} from "next/router";
import Image from "next/image";
import {hasFlag} from "country-flag-icons";

export default function Home({allMens, currentPage, pagesAmount, startingIndex}) {
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
            <div className="paginationBlock">
                <div><h2>leaderboard of mens))</h2></div>
                <div className="pagination">
                    <Button onClick={prevPage}>Prev</Button>&nbsp;
                    <div className={styles.currentPage}>{parseInt(currentPage) + 1}</div>&nbsp;
                    <Button onClick={nextPage}>Next</Button>
                </div>
            </div>
            {allMens && allMens.length > 0 ? (
                <div>
                    {allMens.map((men, index) => (
                        <section key={men.id} className={styles.men}>
                            <h2>
                                #{index + startingIndex}&nbsp;
                                {hasFlag(men.countryCode) ?
                                    <Image src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${men.countryCode}.svg`}
                                           alt={men.countryCode}
                                           width={52} height={26} />
                                    : ""
                                }
                                <Link href={`/mens/${men.id}`}>{men.name}</Link> - {men.commentsCount}
                            </h2>
                        </section>
                    ))}
                </div>
            ) : (
                <p>No data available</p>
            )}
            <div className="paginationBlock">
                <div className="pagination">
                    <Button onClick={prevPage}>Prev</Button>&nbsp;
                    <div className={styles.currentPage}>{parseInt(currentPage) + 1}</div>&nbsp;
                    <Button onClick={nextPage}>Next</Button>
                </div>
            </div>
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
        fallback: 'blocking'
    }
}

export async function getServerSideProps({params}) {
    const allMens = await getAllMens(params.page);

    return {
        props: {
            allMens,
            currentPage: params.page.toString(),
            pagesAmount: await getPagesAmount(),
            startingIndex: parseInt(params.page) * getSize() + 1
        },
        revalidate: 60
    }
}