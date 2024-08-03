// components/Layout.js
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gray-50">
                {children}
            </main>
        </>
    );
};

export default Layout;