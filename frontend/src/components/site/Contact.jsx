import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { ArrowRight, Loader2, Mail, Phone, MapPin, Instagram } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "https://sunwest-builds-website.onrender.com";
const API = `${BACKEND_URL}/api`;

const initial = { name: "", email: "", phone: "", project_details: "" };

export default function Contact() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Invalid email";
    if (!form.phone.trim() || form.phone.trim().length < 4) e.phone = "Required";
    if (!form.project_details.trim()) e.project_details = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Thanks — we'll be in touch within 24 hours.");
      setForm(initial);
    } catch (err) {
      const detail =
        err?.response?.data?.detail || "Couldn't send. Please try again.";
      toast.error(typeof detail === "string" ? detail : "Submission failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="bg-white py-28 md:py-40"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left: copy & info */}
          <div className="lg:col-span-5 reveal">
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-10 h-px bg-brand-accent" />
              <span className="text-xs tracking-[0.28em] uppercase text-brand-smoke font-medium">
                Start a Project
              </span>
            </div>
            <h2
              data-testid="contact-headline"
              className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-brand-ink tracking-tighter leading-[1.05]"
            >
              Let&apos;s build something
              <br />
              <span className="text-brand-smoke">that lasts.</span>
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-brand-smoke max-w-md">
              Share a few details about your project. We respond within one
              business day with a scoped conversation.
            </p>

            <ul className="mt-12 space-y-5 text-sm" data-testid="contact-info">
              <li className="flex items-center gap-3 text-brand-ink/80">
                <Mail size={16} strokeWidth={1.5} className="text-brand-accent shrink-0" />
                <a
                  href="mailto:info@sunwestbuilds.com"
                  className="hover:text-brand-accent transition-colors"
                >
                  info@sunwestbuilds.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-brand-ink/80">
                <Phone size={16} strokeWidth={1.5} className="text-brand-accent shrink-0" />
                <a
                  href="tel:+14167104718"
                  className="hover:text-brand-accent transition-colors"
                >
                  (416) 710-4718
                </a>
              </li>
              <li className="flex items-center gap-3 text-brand-ink/80">
                <MapPin size={16} strokeWidth={1.5} className="text-brand-accent shrink-0" />
                Greater Toronto Area &amp; Surroundings
              </li>
              <li className="flex items-center gap-3 text-brand-ink/80">
                <Instagram size={16} strokeWidth={1.5} className="text-brand-accent shrink-0" />
                <a
                  href="https://www.instagram.com/sunwestbuilds/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-accent transition-colors"
                >
                  @SunwestBuilds
                </a>
              </li>
            </ul>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-7 reveal">
            <form
              data-testid="contact-form"
              onSubmit={onSubmit}
              className="bg-brand-surface border border-brand-line p-8 md:p-12"
              noValidate
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
                <Field
                  label="Name"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  error={errors.name}
                  testid="contact-input-name"
                  autoComplete="name"
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  error={errors.email}
                  testid="contact-input-email"
                  autoComplete="email"
                />
                <Field
                  label="Phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={onChange}
                  error={errors.phone}
                  testid="contact-input-phone"
                  autoComplete="tel"
                />
                <div className="sm:col-span-2">
                  <Field
                    label="Project Details"
                    name="project_details"
                    value={form.project_details}
                    onChange={onChange}
                    error={errors.project_details}
                    testid="contact-input-project"
                    textarea
                  />
                </div>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <p className="text-xs tracking-wide text-brand-muted max-w-xs">
                  We&apos;ll never share your details. Used solely to scope &amp;
                  schedule.
                </p>
                <button
                  type="submit"
                  data-testid="contact-submit-button"
                  disabled={submitting}
                  className="cta-accent group inline-flex items-center justify-center gap-3 bg-brand-ink hover:bg-brand-accent disabled:bg-brand-muted disabled:cursor-not-allowed text-white px-8 py-4 text-sm font-medium tracking-wide transition-colors"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Inquiry
                      <ArrowRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  error,
  testid,
  type = "text",
  textarea = false,
  autoComplete,
}) {
  const base =
    "w-full bg-transparent text-brand-ink placeholder:text-brand-muted py-3 focus:outline-none transition-colors";
  const border = error
    ? "border-b border-red-500"
    : "border-b border-brand-line focus:border-brand-accent";
  return (
    <label className="block">
      <span className="block text-xs tracking-[0.22em] uppercase text-brand-muted font-medium mb-2">
        {label}
      </span>
      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={5}
          data-testid={testid}
          className={`${base} ${border} resize-none`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          data-testid={testid}
          className={`${base} ${border}`}
        />
      )}
      {error && (
        <span
          data-testid={`${testid}-error`}
          className="block mt-2 text-xs text-red-500"
        >
          {error}
        </span>
      )}
    </label>
  );
}