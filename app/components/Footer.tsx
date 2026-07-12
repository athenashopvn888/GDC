import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {/* Column 1 â€” Store Description */}
          <div className={styles.col}>
            <div className={styles.brand}>
              GREEN DEAL CANNABIS
            </div>
            <p className={styles.desc}>
              Your Local Cannabis Dispensary At 1820 Jane St, York. Visit
              Green Deal Cannabis For Premium Flower, Edibles, Vapes &amp; More.
              10AM - 2AM.
            </p>
            <div className={styles.buttons}>
              <a
                href="tel:+19422884633"
                className={styles.btnPrimary}
              >
                Call Now
              </a>
            </div>
          </div>

          {/* Column 2 â€” Contact Info */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>Contact Info</h3>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Address:</span>
              <span>1820 Jane St</span>
              <span>York, ON M9N 2T3</span>
              <span>Canada</span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Phone:</span>
              <span><a href="tel:+19422884633" style={{color: "inherit"}}>(942) 288-4633</a></span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Hours:</span>
              <span className={styles.highlight}>10AM - 2AM</span>
            </div>
          </div>

          {/* Column 3 â€” Quick Links */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>Quick Links</h3>
            <nav className={styles.links}>
              <Link href="/">Home</Link>
              <Link href="/exotic">Exotic Flower</Link>
              <Link href="/premium">Premium Flower</Link>
              <Link href="/aaa">AAA+ Flower</Link>
              <Link href="/aa">AA Flower</Link>
              <Link href="/budget">Budget Flower</Link>
              <Link href="/items/edibles">Edibles</Link>
              <Link href="/items/cigarettes">Cigarettes</Link>
              <Link href="/items/vapes">Vape Pens</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/delivery">Delivery (Coming Soon)</Link>
              <Link href="/info/york-weed-dispensary">York Dispensary</Link>
              <Link href="/info/cheap-weed-york">Cheap Weed York</Link>
              <Link href="/info/native-cigarettes-york">Native Cigarettes</Link>
              <Link href="/info/weed-delivery-york">Weed Delivery York</Link>
              <Link href="/info/dispensary-near-me-york">Dispensary Near Me</Link>
              <Link href="/weed-dispensary-york/">Green Deal Cannabis Weed Dispensary in York</Link>
              <Link href="/contact">Contact Us</Link>
            </nav>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            Â© {new Date().getFullYear()} Green Deal Cannabis. Must be 19+ to
            enter. Please consume responsibly.
          </p>
        </div>
      </div>
    </footer>
  );
}
