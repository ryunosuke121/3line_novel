import Header from './Header'
import { ReactElement } from "react";
import Head from "next/head";

export const metadata = {
  title: 'AI小説ゲーム',
  description: 'AIと一緒におもしろい小説をつくろう！',
}

type LayoutProps = {
  readonly children: ReactElement
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Header />
        <main>
          <div className='container mx-auto'>
            {children}
          </div>
        </main>
    </>
  )
}

export default Layout;
