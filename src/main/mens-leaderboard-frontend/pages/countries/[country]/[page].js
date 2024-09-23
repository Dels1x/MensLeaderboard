'use strict'

import {getMensByCountry, getPagesAmount, getSize} from "@/api/api";
import {useRouter} from "next/router";
import Layout from "@/layout/layout";
import {Button} from "@mui/material";
import styles from "@/styles/Home.module.css";
import {hasFlag} from "country-flag-icons";
import Image from "next/image";
import Link from "next/link";

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
            <div className="paginationBlock bottomPaginationBlock">
                <div className="pagination">
                    <Button onClick={prevPage}>Prev</Button>&nbsp;
                    <div className={styles.currentPage}>{parseInt(currentPage) + 1}</div>&nbsp;
                    <Button onClick={nextPage}>Next</Button>
                </div>
            </div>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const { params } = context;
    console.log(params.country);
    console.log(params.page);

    if (!/^[0-9]+$/.test(params.page)) {
        return {
            notFound: true,
        };
    }

    const allMens = await getMensByCountry(params.page, params.country);

    if (!allMens) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            allMens,
            currentPage: params.page.toString(),
            pagesAmount: await getPagesAmount(),
            startingIndex: parseInt(params.page) * getSize() + 1
        },
    }
}
