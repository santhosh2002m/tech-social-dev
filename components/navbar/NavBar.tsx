"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Message from "../common/Message";
import Notification from "../common/Notification";
import Setting from "../common/Setting";
import logo from "/public/images/logo.png";

const NavBar = ({ clss = "container" }: { clss: string }) => {
  const [windowHeight, setWindowHeight] = useState(0);
  const [active, setActive] = useState<string>("");
  const [activeSearchForm, setActiveSearchForm] = useState(false);

  const navBarTop = () => {
    if (window !== undefined) {
      let height = window.scrollY;
      setWindowHeight(height);
    }
  };

  const activeHandler = (opt: string) => {
    if (opt === active) {
      setActive("");
    } else {
      setActive(opt);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", navBarTop);
    return () => {
      window.removeEventListener("scroll", navBarTop);
    };
  }, []);

  return (
    <header
      className={`header-section header-menu ${
        windowHeight > 50 && "animated fadeInDown header-fixed"
      }`}
    >
      <nav className="navbar navbar-expand-lg p-0">
        <div className={clss}>
          <nav className="navbar w-100 navbar-expand-lg justify-content-between">
            <Link href="/" className="navbar-brand">
              <Image src={logo} className="logo" alt="logo" />
            </Link>
            <button
              className="button search-active d-block d-md-none"
              onClick={() => setActiveSearchForm(!activeSearchForm)}
            >
              <i className="d-center material-symbols-outlined fs-xxl mat-icon">
                search
              </i>
            </button>
            <div className={`search-form ${activeSearchForm ? "active" : ""}`}>
              <form action="#" className="input-area d-flex align-items-center">
                <input type="text" placeholder="search" autoComplete="off" />
                <button type="button" className="aiq-button">
                  AI Q
                </button>
                <i className="material-symbols-outlined mat-icon search-icon">
                  search
                </i>
              </form>
            </div>

            <div className="right-area position-relative d-flex gap-3 gap-xxl-6 align-items-center left-side">
              <div
                className={`single-item d-none d-lg-block messages-area ${
                  active === "message" ? "active" : ""
                }`}
              >
                <Message activeHandler={activeHandler} />
              </div>
              <div
                className={`single-item d-none d-lg-block messages-area notification-area ${
                  active === "notification" ? "active" : ""
                }`}
              >
                <Notification activeHandler={activeHandler} />
              </div>
              <div
                className={`single-item d-none d-lg-block profile-area position-relative ${
                  active === "settings" ? "active" : ""
                }`}
              >
                <Setting activeHandler={activeHandler} />
              </div>
            </div>
          </nav>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
