import { Link } from "react-router-dom";
import { card, journal } from "../assets";
import styles, { layout } from "../style";
import Button from "./Button";

const CardDeal = () => (
  <section className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        Journal your trades<br className="sm:block hidden" /> in few easy
        steps.
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Journaling your trades can make you a better trader, but doing it on excel is quite inconvenient. so journal your trades in a few steps with us, and get insights and expert advice on that.
      </p>

      <Link to="/login">
        <Button styles={`mt-10`} />
      </Link>
    </div>

    <div className={layout.sectionImg}>
      <img src={journal} alt="billing" className="w-[100%] h-[100%]" />
    </div>
  </section>
);

export default CardDeal;
