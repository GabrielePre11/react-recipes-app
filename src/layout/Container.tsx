type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({
  children,
  className = "",
}: ContainerProps) {
  return (
    <div className={`max-w-6xl mx-auto px-5 ${className}`}>{children}</div>
  );
}
