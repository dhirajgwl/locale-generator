import Link from "next/link";
import "./globals.css";

const RootLayout = ({ children }: { children: React.ReactElement }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>GenAI POC</title>
      </head>
      <body>
        <header className="w-full bg-white shadow-md dark:bg-gray-800">
          <nav className="min-h-10 border-b border-gray-200 bg-gray-10 dark:bg-gray-800 dark:border-gray-700">
            <ul className="flex items-center justify-start space-x-3 rtl:space-x-reverse font-medium mt-4 p-4 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
              <li>
                <Link
                  href="/"
                  className="text-gray-900 hover:text-blue-500 dark:text-white"
                >
                  Generate Localization Json File
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <main className="container mx-auto p-4">{children}</main>
        <footer></footer>
      </body>
    </html>
  );
};

export default RootLayout;
