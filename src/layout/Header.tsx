import React from 'react'

const Header: React.FC = () => {
    return (
        <>
            <button
                className="btn btn-primary"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasTop"
                aria-controls="offcanvasTop"
            >
                Toggle top offcanvas
            </button>
            <div
                className="offcanvas offcanvas-top"
                tabIndex={-1}
                id="offcanvasTop"
                aria-labelledby="offcanvasTopLabel"
            >
                <div className="offcanvas-header">
                    <h5 id="offcanvasTopLabel">Offcanvas top</h5>
                    <button
                        type="button"
                        className="btn-close text-reset"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    />
                </div>
                <div className="offcanvas-body">...</div>
            </div>
        </>

    )
}

export default Header