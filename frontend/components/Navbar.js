// components/Navbar.js
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="navbar bg-gray-800"> {/* Tailwind bg color and global navbar class */}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-lg font-bold hover:text-gray-400">
          Shubh Sheth
        </Link>
        <div className="flex space-x-4">
          <Link href="/" className="nav-link hover:text-gray-400"> {/* Global nav-link class */}
            Home
          </Link>
          <Link href="/about" className="nav-link hover:text-gray-400"> {/* Global nav-link class */}
            About
          </Link>
          <Link href="/contact" className="nav-link hover:text-gray-400"> {/* Global nav-link class */}
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;