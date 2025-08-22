import React from "react";
import { SERVICES_CONTENT } from "../utils/index.js";
import LandingPic from "../assets/1.jpg";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-slate-800 to-slate-950 text-white text-sm sm:text-base">
      <section className="max-w-7xl mx-auto border-b-2">
        <div className="flex flex-col items-center my-20">
          <h1 className="text-6xl lg:text-[10rem] p-2 uppercase font-bold">
            GymFit
          </h1>
          <p className="lg:mt-6 text-[1.2rem] mb-4 font-medium tracking-tighter ">
            Nothing comes without a huge effort 🏋️‍♂️
          </p>
          <img
            src={LandingPic}
            alt="landing page"
            className="w-full h-[65vh] object-cover rounded-2xl p-2"
          />
        </div>
      </section>
      <section className="max-w-7xl mx-auto border-b-2">
        <div className="my-20">
          <h2 className="text-xl lg:text-3xl tracking-tighter text-center uppercase mb-20">
            Hit The Gym Now
          </h2>
          {SERVICES_CONTENT.map((service, index) => (
            <div key={index} className="mb-12 mx-4 flex flex-col lg:flex-row">
              <div
                className={`lg:w-1/2 mb-4 lg:mb-0 ${
                  index % 2 === 0 ? "" : "lg:order-2"
                }`}>
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-auto object-cover rounded-lg "></img>
              </div>
              <div
                className={`lg:w-1/2 flex flex-col ${
                  index % 2 === 0 ? "lg:pl-12" : "lg:pr-12"
                }`}>
                <h3 className="text-xl lg:text-2xl font-medium mb-2">
                  {service.title}
                </h3>
                <p className="mb-4 lg:tracking-wide text-lg lg:text-xl lg:leading-9">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
