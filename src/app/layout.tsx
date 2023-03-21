import '../styles/global.css';

export const metadata = {
  title: 'AI小説ゲーム',
  description: 'AIと一緒におもしろい小説をつくろう！',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <header>あいうえお</header>
        <main>{children}</main>
      </body>
    </html>
  )
}
