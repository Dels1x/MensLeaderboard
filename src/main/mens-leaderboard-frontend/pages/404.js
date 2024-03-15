import styles from "@/styles/404.module.css"
import Layout from "@/layout/layout";

export default function Custom404() {
    return (
        <Layout>
            <div className={styles.body404}>
            <span className={styles.text404}>
            404
            </span><br/>
                <span>
            Page not found
            </span><br/><br/>
                <span className={styles.desc}>
                    (if you tried to search the user and got 404, most likely id was either incorrect or the user was ip-banned)
                </span>
            </div>
        </Layout>)
}