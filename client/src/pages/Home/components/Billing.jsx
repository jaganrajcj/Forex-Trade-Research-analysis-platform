import { TypeAnimation } from "react-type-animation";
import { apple, bill, billingSideImage, google } from "../assets";
import styles, { layout } from "../style";

const Billing = () => (
  <section id="product" className={layout.sectionReverse}>
    <div className={layout.sectionImgReverse}>
      <img src={billingSideImage} alt="billing" className="w-[100%] h-[100%] relative z-[5]" />

      {/* gradient start */}
      <div className="absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient" />
      <div className="absolute z-[0] w-[50%] h-[50%] -left-1/2 bottom-0 rounded-full pink__gradient" />
      {/* gradient end */}
    </div>

    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        Make data-driven decisions  with our
        <span className="text-gradient font-semibold">

          <TypeAnimation
            // Same String at the start will only be typed once, initially
            sequence={[
              ' technical',
              1000,
              ' fundamental',
              1000,
            ]}
            speed={40} // Custom Speed from 1-99 - Default Speed: 40
            // style={{ fontSize: '2em' }}
            wrapper="span" // Animation will be rendered as a <span>
            repeat={Infinity} // Repeat this Animation Sequence infinitely
          />

        </span>
        analysis tools
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Information is the key in decision making, especially when your money is on the line.
        <br className="sm:block hidden" />
        The amount of analysis out platform provide can help you make better decisions.
      </p>


    </div>
  </section>
);

export default Billing;
