import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

// Membuat Context
const PageContext = createContext();

// Provider untuk context
export function PageContextProvider({ children }) {
    const [page, setPage] = useState(1);

    const nextPage = () => {
        setPage(page + 1); // Menggunakan fungsi untuk mendapatkan nilai sebelumnya
    };

    const prevPage = async () => {
        if(page > 1) {
            setPage(page - 1);
        } else {
            setPage(1);
        }
    };

    const dataSharing = {
        page,
        prevPage,
        nextPage,
    };

    return (
        <PageContext.Provider value={dataSharing}>
            {children}
        </PageContext.Provider>
    );
}

// Validasi prop children
PageContextProvider.propTypes = {
    children: PropTypes.node // Menandai children sebagai diperlukan
};

// Ekspor context dan provider
export { PageContext };
