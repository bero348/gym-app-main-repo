import React from "react";
import Swal from "sweetalert2";

function Contact() {
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("access_key", "f2f1c6c7-99f4-4bfb-a8ee-a67ef587ef3e");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      event.target.reset();

      Swal.fire({
        title: "Success!",
        text: "Message Sent Successfully",
        icon: "success",
        confirmButtonColor: "#3b82f6",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-slate-800 to-slate-950 text-white text-sm sm:text-base">
      <section className="max-w-4xl mx-auto w-full my-20 p-4 sm:p-8 rounded-2xl bg-slate-900/40 shadow-xl">
        <h2 className="text-4xl lg:text-6xl font-bold uppercase text-center mb-12 tracking-tight">
          Contact Us
        </h2>
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block mb-2 font-semibold">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Your Name"
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold">Message</label>
            <textarea
              name="message"
              placeholder="Enter Your Message"
              required
              rows={6}
              className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300">
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
}

export default Contact;
