"use client";

import { useSafeForm } from "@/context/SafeFormContext";
import styles from "../SafeForm.module.css";
import React from "react";

const US_STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

export default function CompanyStep() {
  const { state, updateCompanyInfo, updateStep } = useSafeForm();

  // Initialize state values with defaults when component mounts
  React.useEffect(() => {
    if (!state.companyInfo.stateOfIncorporation) {
      updateCompanyInfo({ stateOfIncorporation: "Delaware" });
    }
    if (!state.companyInfo.stateOfGovernance) {
      updateCompanyInfo({ stateOfGovernance: "Delaware" });
    }
  }, [state.companyInfo.stateOfIncorporation, state.companyInfo.stateOfGovernance, updateCompanyInfo]);

  const handleContinue = () => {
    const {
      legalName,
      stateOfIncorporation,
      stateOfGovernance,
      companyAddress,
      authorizedSignatoryName,
      authorizedSignatoryTitle,
      authorizedSignatoryEmail,
    } = state.companyInfo;

    if (
      legalName &&
      stateOfIncorporation &&
      stateOfGovernance &&
      companyAddress &&
      authorizedSignatoryName &&
      authorizedSignatoryTitle &&
      authorizedSignatoryEmail
    ) {
      updateStep(4);
    }
  };

  return (
    <>
      <div className={styles.stepHeader}>
        <h2>Company Information</h2>
        <p className={styles.stepDescription}>
          Please provide the following company details.
        </p>
      </div>

      {/* Company Basic Information */}
      <div className={styles.formGroup}>
        <label htmlFor="legalName" className={styles.label}>
          Legal Name
        </label>
        <input
          type="text"
          id="legalName"
          className={styles.input}
          value={state.companyInfo.legalName || ""}
          onChange={(e) => updateCompanyInfo({ legalName: e.target.value })}
          placeholder="Enter company legal name"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="companyAddress" className={styles.label}>
          Company Address
        </label>
        <input
          type="text"
          id="companyAddress"
          className={styles.input}
          value={state.companyInfo.companyAddress || ""}
          onChange={(e) =>
            updateCompanyInfo({ companyAddress: e.target.value })
          }
          placeholder="Enter company address"
          required
        />
      </div>

      <div className={styles.formRow}>
        <div className={styles.formColumn}>
          <div className={styles.formGroup}>
            <label htmlFor="stateOfIncorporation" className={styles.label}>
              State of Incorporation
            </label>
            <select
              id="stateOfIncorporation"
              className={styles.select}
              value={state.companyInfo.stateOfIncorporation || "Delaware"}
              onChange={(e) =>
                updateCompanyInfo({ stateOfIncorporation: e.target.value })
              }
              required
            >
              {US_STATES.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.formColumn}>
          <div className={styles.formGroup}>
            <label htmlFor="stateOfGovernance" className={styles.label}>
              State of Governance
            </label>
            <select
              id="stateOfGovernance"
              className={styles.select}
              value={state.companyInfo.stateOfGovernance || "Delaware"}
              onChange={(e) =>
                updateCompanyInfo({ stateOfGovernance: e.target.value })
              }
              required
            >
              {US_STATES.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Authorized Signatory Information */}
      <div className={styles.formRow}>
        <div className={styles.formColumn}>
          <div className={styles.formGroup}>
            <label htmlFor="authorizedSignatoryName" className={styles.label}>
              Authorized Signatory Name
            </label>
            <input
              type="text"
              id="authorizedSignatoryName"
              className={styles.input}
              value={state.companyInfo.authorizedSignatoryName || ""}
              onChange={(e) =>
                updateCompanyInfo({
                  authorizedSignatoryName: e.target.value,
                })
              }
              placeholder="Enter authorized signatory name"
              required
            />
          </div>
        </div>
        <div className={styles.formColumn}>
          <div className={styles.formGroup}>
            <label htmlFor="authorizedSignatoryTitle" className={styles.label}>
              Authorized Signatory Title
            </label>
            <input
              type="text"
              id="authorizedSignatoryTitle"
              className={styles.input}
              value={state.companyInfo.authorizedSignatoryTitle || ""}
              onChange={(e) =>
                updateCompanyInfo({
                  authorizedSignatoryTitle: e.target.value,
                })
              }
              placeholder="Enter authorized signatory title"
              required
            />
          </div>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="authorizedSignatoryEmail" className={styles.label}>
          Authorized Signatory Email
        </label>
        <input
          type="email"
          id="authorizedSignatoryEmail"
          className={styles.input}
          value={state.companyInfo.authorizedSignatoryEmail || ""}
          onChange={(e) =>
            updateCompanyInfo({
              authorizedSignatoryEmail: e.target.value,
            })
          }
          placeholder="Enter authorized signatory email"
          required
        />
      </div>

      <div className={styles.buttonGroup}>
        <button
          className={`${styles.button} ${styles.secondaryButton}`}
          onClick={() => updateStep(2)}
        >
          Back
        </button>
        <button
          className={styles.button}
          onClick={handleContinue}
          disabled={
            !state.companyInfo.legalName ||
            !state.companyInfo.stateOfIncorporation ||
            !state.companyInfo.stateOfGovernance ||
            !state.companyInfo.companyAddress ||
            !state.companyInfo.authorizedSignatoryName ||
            !state.companyInfo.authorizedSignatoryTitle ||
            !state.companyInfo.authorizedSignatoryEmail
          }
        >
          Continue
        </button>
      </div>
    </>
  );
}
