import styles from "./style/halftone.module.css";

const HalftoneContainer = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <div className={styles.halftoneBackground1} />
      <div className={styles.halftoneBackground2} />
      <div className="opacity-100 w-screen h-screen flex flex-col justify-center items-center">{children}</div>
    </>
  );
};

export default HalftoneContainer;
