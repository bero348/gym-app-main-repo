import React from "react";
import { CONTACT_INFO } from "../utils/index.js";

function Footer() {
  return (
    <>
      {/* تطبيق خلفية التدرج اللوني على كامل الفوتر */}
      <footer
        className="bg-gradient-to-r from-slate-800 to-slate-950 py-12"
        id="contact">
        {/* محتوى الفوتر داخل div لضبط أقصى عرض وتوسيطه */}
        <div className="max-w-7xl mx-auto my-20">
          <h2 className="text-xl lg:text-3xl tracking-tight text-center uppercase mb-12 text-blue-400">
            Contact Us
          </h2>
          <p className="max-w-2xl text-lg mb-12 text-center mx-auto text-gray-300">
            {CONTACT_INFO.text}
          </p>
          <div className="flex flex-col lg:flex-row justify-around mx-4">
            <div className="flex mb-8 lg:mb-0 items-center">
              <p className="text-3xl mr-4">☎️</p>
              <div>
                <p className="text-lg font-semibold text-blue-300">
                  {CONTACT_INFO.phone.label}
                </p>
                <p className="text-gray-400">{CONTACT_INFO.phone.value}</p>
              </div>
            </div>
            <div className="flex mb-8 lg:mb-0 items-center">
              <p className="text-3xl mr-4">📧</p>
              <div>
                <p className="text-lg font-semibold text-blue-300">
                  {CONTACT_INFO.email.label}
                </p>
                <p className="text-gray-400">{CONTACT_INFO.email.value}</p>
              </div>
            </div>
            <div className="flex items-center">
              <p className="text-3xl mr-4">🗺️</p>
              <div>
                <p className="text-lg font-semibold text-blue-300">
                  {CONTACT_INFO.address.label}
                </p>
                <p className="text-gray-400">{CONTACT_INFO.address.value}</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
