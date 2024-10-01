import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
// import ThemeToggler from "./ThemeToggler";
import "../../styles/index.css";
const Header = () => {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsHeaderSticky(true);
      } else {
        setIsHeaderSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <>
      <header
        className={`header left-0 top-0 z-40 flex w-full items-center bg-transparent ${
          isHeaderSticky
            ? "!transitio !fixed !z-[9999] !bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm dark:!bg-primary dark:!bg-opacity-20"
            : "absolute"
        }`}
      >
        <div className="container">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="max-w-half mb-26 relative w-24 px-2 ">
              <Link href="/" className="header-logo">
                <Image
                  src="/images/ROBO.png"
                  alt="logo"
                  width={200}
                  height={200}
                  className="bg-cover"
                />
              </Link>
            </div>
            <div className="container2 flex w-full items-center justify-between px-4">
              <div>
                <button
                  id="navbarToggler"
                  onClick={toggleNavbar}
                  className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
                >
                  <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
                  <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
                  <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
                </button>
                <nav
                  id="navbarCollapse"
                  className={`absolute right-4 top-full ${isNavbarOpen ? "block" : "hidden"} font-EGER w-full max-w-[250px] rounded-lg bg-white px-6 py-5 shadow dark:bg-dark lg:static lg:block lg:w-full lg:max-w-full lg:bg-transparent lg:shadow-none lg:dark:bg-transparent`}
                >
                  <ul className="blcok lg:flex">
                    <li className="group relative">
                      <Link
                        href="/about"
                        className={`mx-8 flex py-2 text-lg text-dark group-hover:opacity-70 dark:text-white lg:inline-flex lg:py-6 ${
                          pathname === "/about" && "text-primary"
                        }`}
                      >
                        About
                      </Link>
                    </li>
                    <li className="group relative">
                      <Link
                        href="/contact"
                        className={`mx-8 flex py-2 text-lg text-dark group-hover:opacity-70 dark:text-white lg:inline-flex lg:py-6 ${
                          pathname === "/contact" && "text-primary"
                        }`}
                      >
                        Contact
                      </Link>
                    </li>
                    {isLoggedIn ? (
                      <>
                        <li className="group relative">
                          <Link
                            href="/profile"
                            className={`mx-8 flex py-2 text-lg text-dark group-hover:opacity-70 dark:text-white lg:inline-flex lg:py-6 ${
                              pathname === "/profile" && "text-primary"
                            }`}
                          >
                            Profile
                          </Link>
                        </li>
                        <li className="group relative">
                          <button
                            onClick={handleLogout}
                            className="mx-8 flex py-2 text-lg text-dark group-hover:opacity-70 dark:text-white lg:inline-flex lg:py-6"
                          >
                            Logout
                          </button>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="group relative">
                          <Link
                            href="/signin"
                            className={`mx-8 flex py-2 text-lg text-dark group-hover:opacity-70 dark:text-white lg:inline-flex lg:py-6 ${
                              pathname === "/signin" && "text-primary"
                            }`}
                          >
                            Sign In
                          </Link>
                        </li>
                        <li className="group relative">
                          <Link
                            href="/signup"
                            className={`mx-8 flex py-2 text-lg text-dark group-hover:opacity-70 dark:text-white lg:inline-flex lg:py-6 ${
                              pathname === "/signup" && "text-primary"
                            }`}
                          >
                            Create an account
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </nav>
              </div>
              {/* <div className="flex items-center justify-end pr-16 lg:pr-0">
                <ThemeToggler />
              </div> */}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
