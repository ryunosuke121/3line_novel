import Link from 'next/link';
import Image from 'next/image';
const Header = () => {
    return (
        <header>
          <nav className="fixed top-0 bg-gradient-to-r from-blue-300 to-blue-500 border-gray-200 px-4 lg:px-6 py-2.5 shadow w-full">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
              <Link href="/" className="flex items-center">
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">ワクワク小説クリエイター</span>
              </Link>
              <div className="flex items-center lg:order-2">
                <Link href="/" className="text-white border border-white hover:text-gray-200 hover:border-gray-200 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 ">ログイン</Link>
                <Link href="/" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">始める</Link>
                <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                  <span className="sr-only">Open main menu</span>
                </button>
              </div>
              <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                  <li>
                    {/* <Link href="/" className="block py-2 pr-4 pl-3 text-white rounded bg-blue-700 lg:bg-transparent lg:text-blue-700 lg:p-0 dark:text-white" aria-current="page">Home</Link> */}
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
    );
}

export default Header;