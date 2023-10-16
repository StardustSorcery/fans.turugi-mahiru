import Footer from "@/components/Footer/Footer";

export default function TopLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}

      <Footer
        mt={4}
      />
    </>
  )
}
