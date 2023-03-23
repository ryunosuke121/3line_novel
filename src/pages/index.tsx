import Layout from '@/components/Layout'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

const Home = () => {
  return (
    <Layout>
      <div className="text-3xl font-bold underline">
        こんにちは
      </div>
    </Layout>
  )
}

export default Home;
