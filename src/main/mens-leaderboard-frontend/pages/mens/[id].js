"use strict"
'use client'

import {getMenData, getMenPosition} from "@/api/api";
import Layout from "@/layout/layout";
import Image from "next/image";
import styles from "@/styles/Men.module.css";
import {hasFlag} from "country-flag-icons";
import {getCommentsPerDay} from "@/lib/logic";

export default function Men({menData, position, commentsPerDay}) {
    const isFlag = hasFlag(menData.countryCode);

    return <Layout>
        <div className={styles.profileParent}>
            <section className={styles.profile}>
                <div className={styles.mainData}>
                    #{position}
                    {isFlag ? (
                        <span>
                            <Image
                                src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${menData.countryCode}.svg`}
                                alt={menData.countryCode}
                                width={70} height={35}
                            />
                        </span>
                    ) : (
                        <span>
                            {menData.countryCode}
                        </span>
                    )}
                    <span>
                        <a target="_blank" href={`https://www.hltv.org/profile/${menData.id}/${menData.name}`}>
                            {menData.name}
                        </a>
                    </span>
                    <span>
                        &nbsp;-&nbsp;
                    </span>
                    <span>
                        {menData.commentsCount} comments
                    </span>
                </div>
                <div className={styles.secondaryData}>
                    ID: {menData.id}<br />
                    Signed up at {menData.signedUp}<br />
                    {commentsPerDay} comments per day
                </div>
            </section>
        </div>
    </Layout>
}

export async function getServerSideProps(context) {
    const { params } = context;
    const menData = await getMenData(params.id);

    if (!menData) {
        return {
            notFound: true,
        };
    }

    const position = await getMenPosition(params.id)
    const commentsPerDay = getCommentsPerDay(menData.commentsCount, menData.signedUp);

    return {
        props: {
            menData,
            position,
            commentsPerDay
        },
    };
}