import logo from "@/assets/icons/logo.svg";
import Image from "next/image";

const navLinks = [
  { title: "HOME", url: "/" },
  { title: "COUNTRIES", url: "#" },
  { title: "ABOUT", url: "#" },
  { title: "CONTACT", url: "#" },
];

const Header = () => {
  return (
    <header className="flex justify-between items-center fixed h-20  w-full px-4 md:px-8 lg:px-12 xl:px-32 bg-blue-300 z-50">
      <div>
        <Image
          src={logo}
          alt="logo"
          className="hidden sm:block size-20 sm:size-12"
        />
      </div>

      <nav className="flex justify-center items-center gap-4 px-6 p-0.5 border h-14 rounded-full border-white-900/60 bg-white-600  backdrop-blur">
        {navLinks.map((link) => (
          <a
            key={link.title}
            href={link.url}
            className="nav-item gap-4 relative group"
          >
            <span className="text-slate-100 text-sm">{link.title}</span>
            <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
      </nav>
      <div className="flex justify-center items-center">
        <div
          className="hidden sm:block w-10 h-10 rounded-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://www.countryflags.com/wp-content/uploads/united-kingdom-flag-png-large.png')",
          }}
        />
      </div>
    </header>
  );
};

export default Header;
