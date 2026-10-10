"use client";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Download } from "./icons";
const TOPICS = [
  "General program enquiry",
  "Medical mission",
  "Tiltrotor research",
  "HSVTOL reference",
  "Hydrogen-electric systems",
  "Research collaboration",
  "Engineering research",
  "Student research",
  "Mission research",
  "Public safety",
  "Supplier research",
  "Technical collaboration",
];
type Brief = {
  name: string;
  email: string;
  organisation: string;
  topic: string;
  message: string;
  payload: string;
  distance: string;
};
export function EnquiryBuilder() {
  const params = useSearchParams();
  const [brief, setBrief] = useState<Brief>({
    name: "",
    email: "",
    organisation: "",
    topic: "General program enquiry",
    message: "",
    payload: "",
    distance: "",
  });
  const [prepared, setPrepared] = useState(false);
  const output = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const q = params.get("topic");
    if (q) setBrief((b) => ({ ...b, topic: q.slice(0, 100) }));
  }, [params]);
  const update = (key: keyof Brief, value: string) => {
    setBrief((b) => ({ ...b, [key]: value }));
    setPrepared(false);
  };
  const clean = (value: string) => value.replace(/\r/g, "").trim();
  const text = () =>
    `# Celestium research enquiry\n\nPrepared locally on ${new Date().toLocaleDateString("en-GB")}\n\n## Contact\n- Name: ${clean(brief.name)}\n- Email: ${clean(brief.email) || "Not provided"}\n- Organisation: ${clean(brief.organisation) || "Not provided"}\n\n## Research topic\n${clean(brief.topic)}\n\n## Mission context\n- Payload: ${clean(brief.payload) || "To be defined"}\n- Route or distance: ${clean(brief.distance) || "To be defined"}\n\n## Question or proposal\n${clean(brief.message)}\n\n---\nThis brief was created locally in the Celestium website. It has not been submitted or sent. Aircraft specifications are research targets and concept imagery is illustrative.\n`;
  const download = () => {
    const blob = new Blob([text()], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "celestium-research-enquiry.md";
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <div className="c-enquiry-builder">
      <form
        className="c-enquiry-form"
        onSubmit={(e) => {
          e.preventDefault();
          setPrepared(true);
          requestAnimationFrame(() => output.current?.focus());
        }}
      >
        <div className="c-form-grid">
          <label>
            Your name <span>*</span>
            <input
              required
              name="name"
              autoComplete="name"
              maxLength={120}
              value={brief.name}
              onChange={(e) => update("name", e.target.value)}
            />
          </label>
          <label>
            Email <small>Optional</small>
            <input
              name="email"
              type="email"
              autoComplete="email"
              maxLength={200}
              value={brief.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </label>
          <label>
            Organisation <small>Optional</small>
            <input
              name="organisation"
              autoComplete="organization"
              maxLength={200}
              value={brief.organisation}
              onChange={(e) => update("organisation", e.target.value)}
            />
          </label>
          <label>
            Research topic
            <select value={brief.topic} name="topic" onChange={(e) => update("topic", e.target.value)}>
              {!TOPICS.includes(brief.topic) && <option>{brief.topic}</option>}
              {TOPICS.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label>
            Mission payload <small>Optional</small>
            <input
              name="payload"
              placeholder="e.g. patient, clinical team and equipment"
              maxLength={250}
              value={brief.payload}
              onChange={(e) => update("payload", e.target.value)}
            />
          </label>
          <label>
            Route or distance <small>Optional</small>
            <input
              name="distance"
              placeholder="e.g. 180 km regional transfer"
              maxLength={250}
              value={brief.distance}
              onChange={(e) => update("distance", e.target.value)}
            />
          </label>
          <label className="c-form-full">
            Your question or proposal <span>*</span>
            <textarea
              required
              minLength={20}
              maxLength={5000}
              rows={6}
              name="message"
              placeholder="Describe the question, scenario or engineering challenge you would like to explore."
              value={brief.message}
              onChange={(e) => update("message", e.target.value)}
            />
            <small>At least 20 characters. Keep private technical material out of this public preview.</small>
          </label>
        </div>
        <div className="c-form-bottom">
          <p>
            Your information stays in this browser until you download the brief. This form does not send a
            message.
          </p>
          <button className="c-button" type="submit">
            Prepare my enquiry <span aria-hidden="true">↗</span>
          </button>
        </div>
      </form>
      {prepared && (
        <div ref={output} tabIndex={-1} className="c-enquiry-output" aria-label="Prepared research enquiry">
          <div role="status" className="c-enquiry-ready">
            <span aria-hidden="true">✓</span>
            <div>
              <h3>Your enquiry brief is ready.</h3>
              <p>
                Review it below, then download the file to share through your chosen channel. No message has
                been sent.
              </p>
            </div>
          </div>
          <dl>
            <div>
              <dt>Prepared by</dt>
              <dd>
                {brief.name}
                {brief.organisation && ` / ${brief.organisation}`}
              </dd>
            </div>
            <div>
              <dt>Topic</dt>
              <dd>{brief.topic}</dd>
            </div>
            {brief.payload && (
              <div>
                <dt>Payload</dt>
                <dd>{brief.payload}</dd>
              </div>
            )}
            {brief.distance && (
              <div>
                <dt>Route</dt>
                <dd>{brief.distance}</dd>
              </div>
            )}
          </dl>
          <p className="c-enquiry-message">{brief.message}</p>
          <button className="c-button" onClick={download}>
            Download the enquiry brief
            <Download size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
