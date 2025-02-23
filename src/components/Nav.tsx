const Nav: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleThemeChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    handleThemeChange(mediaQuery);
    mediaQuery.addEventListener("change", handleThemeChange);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      mediaQuery.removeEventListener("change", handleThemeChange);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // **Fix: Add scrollToSection function**
  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Navbar
      className={`fixed w-full transition-all duration-300 ${
        isScrolled
          ? "z-50 py-1 bg-white dark:bg-black shadow-lg"
          : "z-50 py-4 bg-white dark:bg-black"
      }`}
      fluid
    >
      <Navbar.Brand href="/">
        <img
          src="./assets/images/avatar.png"
          className={`mr-3 transition-all duration-300 ${
            isScrolled ? "h-5 sm:h-7" : "h-6 sm:h-9"
          }`}
          alt="Logo"
        />
        <span
          className={`self-center whitespace-nowrap font-bold dark:text-white transition-all duration-300 ${
            isScrolled ? "text-lg" : "text-2xl"
          }`}
        >
          Pushpak Pawar
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2 items-center space-x-4">
        <DarkThemeToggle />

        {/* Social Icons */}
        <a href="https://github.com/pushpak-11" target="_blank" rel="noopener noreferrer">
          <FaGithub className="w-6 h-6 text-gray-800 dark:text-white hover:text-gray-500 transition" />
        </a>
        <a href="https://www.instagram.com/pushpak._patil/" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="w-6 h-6 text-pink-500 hover:text-pink-600 transition" />
        </a>
        <a href="https://x.com/PushpakPawar_11" target="_blank" rel="noopener noreferrer">
          <FaXTwitter className="w-6 h-6 text-blue-500 hover:text-blue-600 transition" />
        </a>
        <a href="https://linkedin.com/in/pushpak" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="w-6 h-6 text-blue-700 hover:text-blue-800 transition" />
        </a>
        <a href="https://medium.com/@pawarpushpak36" target="_blank" rel="noopener noreferrer">
          <FaMedium className="w-6 h-6 text-black dark:text-white hover:text-gray-700 transition" />
        </a>

        <button
          type="button"
          className={`text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-bold text-center mx-3 md:mr-0 z-10 transition-all duration-300 ${
            isScrolled ? "text-sm px-3 py-1.5" : "text-md px-4 py-2"
          }`}
        >
          Contact Me!
        </button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        {['home', 'services', 'about', 'contact'].map((section) => (
          <button 
            key={section}
            onClick={() => scrollToSection(section)}
            className={`block pr-4 pl-3 border-b border-gray-100 text-gray-700 hover:bg-gray-50 font-bold dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-green-700 md:dark:hover:bg-transparent md:dark:hover:text-white transition-all duration-300 ${
              isScrolled ? 'text-base text-3xl md:text-lg py-2' : 'text-3xl md:text-xl py-2.5'
            }`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Nav;
