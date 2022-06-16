import Header from './Header.client';
import Footer from './Footer.client';
import { useEffect } from 'react';
import { useRouteParams } from '@shopify/hydrogen';

export default function Layout({ children, categories, breadcrumb }) {

    useEffect(() => {
        if(breadcrumb == '') return;
        const noDuplicates = breadcrumb?.filter((bd, i) => breadcrumb.lastIndexOf(bd) == i)
        console.log('no', noDuplicates)
        if (noDuplicates?.length == 0) localStorage.bdcb = JSON.stringify(breadcrumb);
        else {
            if (noDuplicates) {
                try {
                    let bdcb = JSON.parse(localStorage.bdcb);
                    // if (bdcb.findIndex(bc => bc.handle == noDuplicates.handle) == -1) bdcb = [...bdcb, noDuplicates[0]]
                    // localStorage.bdcb = JSON.stringify([...bdcb, noDuplicates[0]])
                    if (bdcb.findIndex(bc => bc.handle == noDuplicates[0].handle) == -1) localStorage.bdcb = JSON.stringify([...bdcb, noDuplicates[0]]);
                }
                catch {
                    localStorage.bdcb = JSON.stringify([])
                }
            }
        }
    })

    return (
        <>
            <div className="absolute top-0 left-0">
                <a
                    href="#mainContent"
                    className="p-4 focus:block sr-only focus:not-sr-only"
                >
                    Skip to content
                </a>
            </div>
            <div className="min-h-screen max-w-screen text-gray-700 font-sans">
                <Header categories={categories} />
                <main role="main" id="mainContent" className="relative">
                    <div className="">
                        {children}
                    </div>
                </main>
                <Footer />
            </div>
        </>
    )
}