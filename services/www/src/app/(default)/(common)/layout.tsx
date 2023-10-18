import CommonHeader from "./_components/CommonHeader";

export default function CommonLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CommonHeader
      />

      {children}
    </>
  )
}
