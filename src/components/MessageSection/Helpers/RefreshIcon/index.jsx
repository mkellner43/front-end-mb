import { motion } from "framer-motion";
import "../../style/style.scss";

const RefreshIcon = ({ classes = "" }) => (
  <motion.div layout key="animation" className={`loader ${classes}`}>
    <div className="dot-container">
      <span className="dot1" />
      <span className="dot2" />
      <span className="dot3" />
    </div>
  </motion.div>
);

export default RefreshIcon;
