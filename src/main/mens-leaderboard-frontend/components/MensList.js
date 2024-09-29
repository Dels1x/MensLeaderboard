import React from "react";
import styles from "@/styles/Home.module.css";
import {hasFlag} from "country-flag-icons";
import Image from "next/image";
import Link from "next/link";

export default function MensList({allMens, startingIndex}) {
    return (
        <>{allMens && allMens.length > 0 ? (
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
    )}</>)
}