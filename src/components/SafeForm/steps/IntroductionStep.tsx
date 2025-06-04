"use client";

import { useSafeForm } from "@/context/SafeFormContext";
import styles from "../SafeForm.module.css";

export default function IntroductionStep() {
  const { state, updateDisclaimer, updateStep } = useSafeForm();

  const handleContinue = () => {
    if (state.disclaimerAccepted) {
      updateStep(2);
    }
  };

  return (
    <>
      <div className={`${styles.stepHeader} ${styles.introduction}`}>
        <h2>YC SAFE Agreement Generator</h2>
        <p className={styles.stepDescription}>
        In just a few clicks, generate a YC SAFE note — the gold standard for
        startup fundraising – to help with your raise process.
        </p>
      </div>

      <div className={styles.disclaimer}>
        <h3>Disclaimer</h3>
        <ol style={{ marginLeft: "1rem" }}>
          <li>
            <strong>Generally</strong>
          </li>
        </ol>
        <p>
          In addition to the Terms of Service and Privacy Policy applicable to
          the Rho site generally (available at{" "}
          <a 
            href="https://rho.co/policies/terms-of-service"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            rho.co/policies/terms-of-service
          </a>{" "}
          and{" "}
          <a 
            href="https://rho.co/policies/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            rho.co/policies/privacy-policy
          </a>
          , respectively), which are incorporated by reference to these terms,
          the following terms apply to your use of this Rho SAFE document
          generation service (the &ldquo;Service&rdquo;) and your agreement to these terms
          is required before you are permitted to use the Service.
        </p>

        <p>
          These documents (the &ldquo;Rho SAFE Docs&rdquo;) by Under Technologies Inc., dba
          Rho Technologies, and together with its affiliates (collectively,
          &ldquo;Rho&rdquo;) are provided for your reference only. These terms and the
          operations or availability of this Service may be changed by Rho, with
          or without notice, at our sole discretion.
        </p>

        <p>
          Review all documents carefully for accuracy before using them.
          Depending on which documents you choose to generate, there may be
          blank or unfilled fields in the documents that require your attention.
        </p>

        <ol style={{ marginLeft: "1rem" }} start={2}>
          <li>
            <strong>Purposes of Rho SAFE Docs</strong>
          </li>
        </ol>

        <ul>
          <li>
            <strong>
              <span>a.{' '}</span>Legal
            </strong>
          </li>
        </ul>
        <p>
          You acknowledge that the Rho SAFE Docs are for general informational
          purposes only and should not be relied upon absent a review of your
          specific circumstances by a legal professional. Nothing contained on
          this page or made available via this Service shall constitute attorney
          work product or the practice of law. Therefore, you should seek advice
          from an attorney licensed in the relevant jurisdiction(s) before
          relying on the Rho SAFE Docs.
        </p>

        <ul>
          <li>
            <strong>
              <span>b.{' '}</span>Tax
            </strong>
          </li>
        </ul>
        <p>
          You acknowledge that the information provided in the Rho SAFE Docs and
          the questionnaire does not constitute tax advice. Any discussion of
          tax matters is not intended or written to be used, and cannot be used,
          for the purpose of avoiding penalties under the Internal Revenue Code
          (or equivalent in the relevant jurisdiction) or promoting, marketing
          or recommending to another party any transaction or matter.
        </p>

        <ul>
          <li>
            <strong>
              <span>c.{' '}</span>Investment
            </strong>
          </li>
        </ul>
        <p>
          You acknowledge that the information provided in the Rho SAFE Docs and
          the questionnaire does not constitute tax advice. The offering of this
          Service is not intended to constitute (i) an offer to sell or buy, or
          a solicitation of an offer to sell or buy securities from Rho; (ii)
          investment advice or an offer to provide such advice; or (iii) a basis
          for making any investment decision. Rho is not a registered
          broker-dealer and does not act as an agent for buyers or sellers of
          businesses.
        </p>

        <ul>
          <li>
            <strong>
              <span>d.{' '}</span>Other
            </strong>
          </li>
        </ul>
        <p>
          You further agree and acknowledge that the Rho SAFE Docs are templates
          and other than the data you provide, they have not been prepared with
          your specific circumstances in mind, may not be suitable for use in
          your business, and do not constitute any professional advice. By
          relying on these Rho SAFE Docs, you are responsible for reviewing the
          accuracy of the data you enter and assume all risk and liability that
          may result. You should not use Rho SAFE Docs and you should consult
          your professional advisors in the event the business you are
          considering organizing has material existing assets, liabilities or
          operations, or if any assets or contributions are being made by a
          founder that would cause the value of the company to be anything other
          than minimal.
        </p>

        <ol style={{ marginLeft: "1rem" }} start={3}>
          <li>
            <strong>No Professional or Special Relationships</strong>
          </li>
        </ol>
        <p>
          You acknowledge and agree that the making available of these Rho SAFE
          Docs to you by Rho shall not create any attorney-client or other
          confidential or special relationship between you and Rho and does not
          constitute the provision of legal advice or other professional advice
          by Rho.
        </p>

        <ol style={{ marginLeft: "1rem" }} start={4}>
          <li>
            <strong>Disclaimer of Warranties</strong>
          </li>
        </ol>
        <p>
          RHO PROVIDES THESE TERMS ON AN &ldquo;AS IS&rdquo; BASIS, AND SPECIFICALLY
          DISCLAIM ALL WARRANTIES, TERMS, REPRESENTATIONS AND CONDITIONS WHETHER
          EXPRESS, IMPLIED, OR STATUTORY, AND INCLUDING ANY WARRANTIES, TERMS,
          REPRESENTATIONS AND CONDITIONS OF MERCHANTABILITY, SATISFACTORY
          QUALITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, OR NONINFRINGEMENT.
          WHILE WE TAKE PRECAUTIONS TO PROTECT THE SECURITY OF YOUR INFORMATION,
          WE CANNOT GUARANTEE IT.
        </p>

        <ol style={{ marginLeft: "1rem" }} start={5}>
          <li>
            <strong>Authority</strong>
          </li>
        </ol>
        <p>
          You confirm that you have the authority to share any information that
          you provide about any entity or other individuals. In the ordinary
          course of the document generation software powering the Rho SAFE Docs,
          the software may temporarily store on our servers and locally cache
          data you enter (including copies of the resulting documents
          generated). You further confirm that any information you provide is
          non-confidential and not covered by the attorney-client or any other
          privileges. We cannot and do not guarantee the confidentiality or
          security of any data you provide.
        </p>

        <p style={{ textDecoration: "underline", paddingBlockStart: "1rem", paddingBlockEnd: "1rem" }}>
          <strong>SAFE-Specific Disclaimer</strong>
        </p>
        <p>
          This document is based on the set of financing documents (referred to
          as SAFE, or Simple Agreement for Future Equity) developed by Y
          Combinator (&ldquo;YC&rdquo;). YC includes the following disclaimer to accompany
          the documents: &ldquo;Needless to say, YC does not assume responsibility for
          the consequence of using any version of the safe or any other document
          found on our website.&rdquo;
        </p>

        <p>
          Under Technologies Inc., dba Rho Technologies, and together with its
          affiliates (collectively, &ldquo;Rho&rdquo;) also do not assume any responsibility
          for any consequence of your use of this document. Rho and this Service
          have no official relationship with YC. Rho does not endorse or
          recommend the use of these default values or the documents themselves.
          Deal terms should be negotiated based on your specific circumstances.
          You are responsible for ensuring that any and all necessary securities
          filings are prepared and filed. You should consult with an attorney
          and/or other professional advisors before relying on any legal
          documents, especially if you do not understand any of their terms.
          Review this document carefully and use it at your own risk.
        </p>
      </div>

      <div className={styles.checkboxContainer}>
        <div>
          <input
            type="checkbox"
            id="disclaimer"
            checked={state.disclaimerAccepted}
            onChange={(e) => updateDisclaimer(e.target.checked)}
            className={styles.checkbox}
          />
          <label htmlFor="disclaimer">
            I have read and acknowledge the disclaimer
          </label>
        </div>
        <button
          className={styles.button}
          onClick={handleContinue}
          disabled={!state.disclaimerAccepted}
        >
          Continue
        </button>
      </div>
    </>
  );
}
