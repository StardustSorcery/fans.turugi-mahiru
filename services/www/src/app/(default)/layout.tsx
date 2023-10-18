import Footer from "@/components/Footer/Footer";
import { DefaultContextProvider } from "./_components/DefaultContext";
import SideNavigation from "@/app/(default)/_components/SideNavigation/SideNavigation";

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DefaultContextProvider
      >
        {children}

        <Footer
          mt={4}
        />

        <SideNavigation
        />
      </DefaultContextProvider>
    </>
  )
}
