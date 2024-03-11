"use strict"
'use client'

import {getMenData, getMenPosition} from "@/api/api";
import Layout from "@/layout/layout";
import Image from "next/image";
import styles from "@/styles/Men.module.css";
import {hasFlag} from "country-flag-icons";

export default function Men({menData, position}) {
    const isFlag = hasFlag(menData.countryCode);

    return <Layout>
        <div className={styles.profileParent}>
            <section className={styles.profile}>
                <div className={styles.mainData}>
                    #{position}
                    {isFlag ? (
                        <div>
                            <Image
                                src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${menData.countryCode}.svg`}
                                alt={menData.countryCode}
                                width={70} height={35}
                            />
                        </div>
                    ) : (
                        <div>
                            {menData.countryCode}
                        </div>
                    )}

                    <div>
                        <a target="_blank" href={`https://www.hltv.org/profile/${menData.id}/${menData.name}`}>
                            {menData.name}
                        </a>
                    </div>
                    <div>
                        - {menData.commentsCount} comments
                    </div>
                </div>
                <div className={styles.secondaryData}>ID: {menData.id}, Signed up at: {menData.signedUp}</div>
            </section>
        </div>
    </Layout>
}

export async function getServerSideProps(context) {
    const { params } = context;
    const menData = await getMenData(params.id);
    const position = await getMenPosition(params.id)

    console.log(menData);

    if (!menData) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            menData,
            position
        },
    };
}