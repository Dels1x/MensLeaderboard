"use strict"

import Layout from "@/layout/layout";
import styles from "../styles/Home.module.css";
import {getAllMens, getPagesAmount} from "@/api/api";
import {useRouter} from 'next/router';
import Link from "next/link";
import {Button} from "@mui/material";
import {hasFlag} from "country-flag-icons";
import Image from "next/image";

export default function Home({allMens}) {
    const router = useRouter();

    const nextPage = async () => {
        const pagesAmount = await getPagesAmount();

        if (pagesAmount > 1) {
            await router.replace("/1");
        }
    };

    return (
        <Layout>
            <div className="paginationBlock">
                <div><h2>leaderboard of mens))</h2></div>
                <div>
                    <Button>Prev</Button>
                    <Button onClick={nextPage}>Next</Button>
                </div>
            </div>

            {allMens && allMens.length > 0 ? (
                <div>
                    {allMens.map((men, index) => (
                        <section key={men.id} className={styles.men}>
                            <h2>
                                #{index + 1}&nbsp;
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
                <div>
                    <Button>Prev</Button>
                    <Button onClick={nextPage}>Next</Button>
                </div>
            </div>
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