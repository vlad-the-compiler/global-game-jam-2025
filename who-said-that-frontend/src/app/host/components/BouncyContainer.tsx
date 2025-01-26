import styles from "./style/animation.module.css";

const BouncyContainer = ({ children }: React.PropsWithChildren) => {
  return <div className={`${styles.elasticAnimation} flex justify-center items-center`}>{children}</div>;
};

export default BouncyContainer;
