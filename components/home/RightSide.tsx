"use client";

import { useState } from "react";
import Contact from "../common/Contact";

const RightSide = () => {
  const [activeProfile, setActiveProfile] = useState<boolean>(false);

  return (
    <div
      className={`cus-overflow cus-scrollbar sidebar-head ${
        activeProfile ? "active" : ""
      }`}
    >
      <div className="d-flex justify-content-end">
        <div className="d-block d-xl-none me-4">
          <button
            className="button toggler-btn mb-4 mb-lg-0 d-flex align-items-center gap-2"
            onClick={() => setActiveProfile(!activeProfile)}
          >
            <span>My List</span>
            <i className="material-symbols-outlined mat-icon"> tune </i>
          </button>
        </div>
      </div>
      <div className="cus-scrollbar side-wrapper">
        <div className="sidebar-wrapper d-flex flex-column gap-6">
          <div className="sidebar-area p-5">
            <div className="accordion" id="sidebarAccordion">
              {/* Followers Section */}
              <div
                className="accordion-item"
                style={{
                  backgroundColor: "var(--body-color)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "8px",
                }}
              >
                <h2 className="accordion-header" id="followersHeading">
                  <button
                    className="accordion-button collapsed" // Set to collapsed
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#followersCollapse"
                    aria-expanded="false" // Set to false
                    aria-controls="followersCollapse"
                    style={{
                      backgroundColor: "var(--body-color)",
                      color: "var(--heading-1st-color)",
                      border: "none",
                    }}
                  >
                    <h6 className="m-0">Followers</h6>
                  </button>
                </h2>
                <div
                  id="followersCollapse"
                  className="accordion-collapse collapse" // Remove show
                  aria-labelledby="followersHeading"
                  data-bs-parent="#sidebarAccordion"
                >
                  <div className="accordion-body">
                    <Contact>
                      <div className="mb-4"></div>
                    </Contact>
                  </div>
                </div>
              </div>

              {/* Followings Section */}
              <div
                className="accordion-item mt-4"
                style={{
                  backgroundColor: "var(--body-color)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "8px",
                }}
              >
                <h2 className="accordion-header" id="followingsHeading">
                  <button
                    className="accordion-button" // Not collapsed
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#followingsCollapse"
                    aria-expanded="true" // Set to true
                    aria-controls="followingsCollapse"
                    style={{
                      backgroundColor: "var(--body-color)",
                      color: "var(--heading-1st-color)",
                      border: "none",
                    }}
                  >
                    <h6 className="m-0">Followings</h6>
                  </button>
                </h2>
                <div
                  id="followingsCollapse"
                  className="accordion-collapse collapse show" // Add show
                  aria-labelledby="followingsHeading"
                  data-bs-parent="#sidebarAccordion"
                >
                  <div className="accordion-body">
                    <Contact>
                      <div className="mb-4"></div>
                    </Contact>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSide;
