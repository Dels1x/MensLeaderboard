"use strict"

import Layout from "@/layout/layout";
import styles from "../styles/Home.module.css";
import {getAllMens} from "@/pages/api/api";
import Link from "next/link";

export default function Home({allMens}) {
    return (
        <Layout>
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