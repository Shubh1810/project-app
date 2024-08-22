// components/Layout.js
import Dashboard from './Dashboard';

const Layout = ({ children }) => {
    return (
        <>
            <Dashboard />
            <main className="min-h-screen bg-gray-50">
                {children}
            </main>
        </>
    );
};

export default Layout;