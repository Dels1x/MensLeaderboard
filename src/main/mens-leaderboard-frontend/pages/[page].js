"use strict"

import Layout from "@/layout/layout";
import styles from "../styles/Home.module.css";
import {getAllMens, getPagesAmount, getSize} from "@/api/api";
import {Button} from "@mui/material";
import {useRouter} from "next/router";
import MensList from "@/components/MensList";

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
            <MensList allMens={allMens} startingIndex={startingIndex} />
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

    if (!/^[0-9]+$/.test(params.page)) {
        return {
            notFound: true,
        };
    }

    const allMens = await getAllMens(params.page);

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
