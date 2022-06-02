import { LocalizationProvider } from '@shopify/hydrogen';
import Header from './Header.client';
import Footer from './Footer.server';

export default function Layout({ children }) {
    return (
        <LocalizationProvider preload="*">
            <div className="absolute top-0 left-0">
                <a
                    href="#mainContent"
                    className="p-4 focus:block sr-only focus:not-sr-only"
                >
                    Skip to content
                </a>
            </div>
            <div className="min-h-screen max-w-screen text-gray-700 font-sans">
                <Header />
                <main role="main" id="mainContent" className="relative">
                    <div className="">
                        {children}
                    </div>
                </main>
                <Footer />
            </div>
        </LocalizationProvider>
    )
}