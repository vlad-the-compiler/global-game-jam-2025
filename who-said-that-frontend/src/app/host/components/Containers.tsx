export interface ContainerProps {
  justify?: "center" | "start" | "end";
  className?: string;
}

export interface HeadingProps {
  size?: "normal" | "medium" | "small";
}

export const HContainer = ({ children, className, justify = "center" }: React.PropsWithChildren<ContainerProps>) => {
  return <div className={`flex w-full h-full flex-1 flex-row justify-${justify} items-center ${className ?? ""}`}>{children}</div>;
};

export const VContainer = ({ children, className, justify = "center" }: React.PropsWithChildren<ContainerProps>) => {
  return <div className={`flex w-full h-full flex-1 flex-col justify-${justify} items-center ${className ?? ""}`}>{children}</div>;
};

export const HeadingContainer = ({ children, size = "normal" }: React.PropsWithChildren<HeadingProps>) => {
  if (size === "normal") {
    return <div className="font-[family-name:var(--font-archivo-black)] font-black text-[50px]">{children}</div>;
  } else if (size === "medium") {
    return <div className="font-[family-name:var(--font-archivo-black)] font-black text-[35px]">{children}</div>;
  } else if (size === "small") {
    return <div className="font-[family-name:var(--font-archivo-black)] font-black text-[25px]">{children}</div>;
  }
};
