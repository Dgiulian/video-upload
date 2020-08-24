import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <section className="text-gray-700 body-font flex-1">
        <div className="container px-5 py-24 mx-auto">{children}</div>
      </section>
      <Footer />
    </div>
  );
}
