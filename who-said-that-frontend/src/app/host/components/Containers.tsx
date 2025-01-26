export interface ContainerProps {
  className?: string;
}

export interface HeadingProps {
  size?: "normal" | "medium" | "small";
}

export const HContainer = ({ children, className }: React.PropsWithChildren<ContainerProps>) => {
  return <div className={`flex w-full h-full flex-1 flex-row justify-center items-center ${className ?? ""}`}>{children}</div>;
};

export const VContainer = ({ children, className }: React.PropsWithChildren<ContainerProps>) => {
  return <div className={`flex w-full h-full flex-1 flex-col justify-center items-center ${className ?? ""}`}>{children}</div>;
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
