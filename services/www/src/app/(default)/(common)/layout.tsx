import TabNavigation from "@/components/TabNavigation/TabNavigation";

export default function CommonLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TabNavigation
      />

      {children}
    </>
  )
}
