import React from "react";

export default function FooterAdmin() {
  return (
    <>
      <footer className="block py-4">
        <div className="container mx-auto px-4">
          <hr className="mb-4 border-b-1 border-blueGray-200" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full px-4">
              <div className="text-sm text-blueGray-500 font-semibold py-1 text-center">
                Copyright © {new Date().getFullYear()}{" "}
                <a
                  href="https://www.rembacninh.vn"
                  className="text-blueGray-500 hover:text-blueGray-700 text-sm font-semibold py-1"
                >
                  Rem VH
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
