export default function CommonLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="shell py-12 md:py-16">{children}</div>;
}
