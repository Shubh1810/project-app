// components/Layout.js
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gray-50">
                {children}
            </main>
            <footer className="bg-gray-800 text-white text-center p-4">
                © 2024 MyApp. All rights reserved.
            </footer>
        </>
    );
};

export default Layout;