import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

const Home = () => {
  return (
    <div className="text-3xl font-bold underline">
      こんにちは
    </div>
  )
}

export default Home;
