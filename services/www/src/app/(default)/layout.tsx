import Footer from "@/components/Footer/Footer";
import { DefaultContextProvider } from "./_components/DefaultContext";
import SideNavigation from "@/app/(default)/_components/SideNavigation/SideNavigation";
import SignInPopup from "./_components/FirebaseAuth/SignInPopup";
import AccountSettingPopup from "./_components/FirebaseAuth/AccountSettingPopup";
import SnackbarRegistry from "@/components/SnackbarRegistry/SnackbarRegistry";

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

        <SignInPopup
        />

        <AccountSettingPopup
        />
      </DefaultContextProvider>
    </>
  )
}
