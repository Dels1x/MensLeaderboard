"use strict"

import Layout from "@/layout/layout";
import styles from "../styles/Home.module.css";
import {getAllMens, getPagesAmount} from "@/api/api";
import {useRouter} from 'next/router';
import {Button} from "@mui/material";
import MensList from "@/components/MensList";

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
                <div className="pagination">
                    <Button>Prev</Button>
                    <div className={styles.currentPage}>1</div>&nbsp;
                    <Button onClick={nextPage}>Next</Button>
                </div>
            </div>
            <MensList allMens={allMens} startingIndex={1} />
            <div className="paginationBlock bottomPaginationBlock">
                <div className="pagination">
                    <Button>Prev</Button>&nbsp;
                    <div className={styles.currentPage}>1</div>&nbsp;
                    <Button onClick={nextPage}>Next</Button>
                </div>
            </div>
        </Layout>
    );
}

export async function getServerSideProps() {
    const allMens = await getAllMens();

    return {
        props: {
            allMens
        },
    }
}