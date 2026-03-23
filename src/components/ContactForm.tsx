"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import type { Dictionary } from "@/lib/getDictionary";

interface ContactFormProps {
  dict: Dictionary;
}

export default function ContactForm({ dict }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [cooldown, setCooldown] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });
  // Honeypot field — should remain empty; if filled the submission is a bot
  const honeypotRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check — bots fill hidden fields, humans don't
    if (honeypotRef.current?.value) {
      // Silently reject bot submission
      return;
    }

    setStatus("sending");

    // TODO: Replace this simulated submission with a real API call, e.g.:
    // const res = await fetch("/api/contact", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formData),
    // });
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setStatus("success");

    // Rate limiting — disable submit button for 30 seconds after each submission
    setCooldown(true);
    setTimeout(() => setCooldown(false), 30000);
  };

  const inputClass =
    "w-full bg-[#12122a] border border-white/10 text-[#fafaf9] placeholder-[#c2c2c2]/30 px-5 py-4 text-sm focus:outline-none focus:border-[#e94560]/50 transition-all duration-300 hover:border-white/20";

  const isDisabled = status === "sending" || cooldown;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      {/* Honeypot field — visually hidden, must never be filled by a real user */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
        <label htmlFor="website">Website</label>
        <input
          ref={honeypotRef}
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="sr-only">
            {dict.contact.formName}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder={`${dict.contact.formName} *`}
            required
            minLength={2}
            maxLength={100}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={inputClass}
            style={{ fontFamily: "var(--font-body)" }}
          />
        </div>
        <div>
          <label htmlFor="email" className="sr-only">
            {dict.contact.formEmail}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder={`${dict.contact.formEmail} *`}
            required
            maxLength={254}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={inputClass}
            style={{ fontFamily: "var(--font-body)" }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="company" className="sr-only">
            {dict.contact.formCompany}
          </label>
          <input
            id="company"
            name="company"
            type="text"
            placeholder={dict.contact.formCompany}
            maxLength={200}
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className={inputClass}
            style={{ fontFamily: "var(--font-body)" }}
          />
        </div>
        <div>
          <label htmlFor="subject" className="sr-only">
            {dict.contact.formSubject}
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            placeholder={`${dict.contact.formSubject} *`}
            required
            minLength={2}
            maxLength={200}
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className={inputClass}
            style={{ fontFamily: "var(--font-body)" }}
          />
        </div>
      </div>

      <label htmlFor="message" className="sr-only">
        {dict.contact.formMessage}
      </label>
      <textarea
        id="message"
        name="message"
        placeholder={`${dict.contact.formMessage} *`}
        required
        minLength={10}
        maxLength={2000}
        rows={6}
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        className={`${inputClass} resize-none`}
        style={{ fontFamily: "var(--font-body)" }}
      />

      {status === "success" ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#e94560]/10 border border-[#e94560]/30 p-5 text-[#fafaf9] text-sm"
        >
          {dict.contact.formSuccess}
        </motion.div>
      ) : (
        <button
          type="submit"
          disabled={isDisabled}
          aria-disabled={isDisabled}
          className="relative overflow-hidden bg-[#e94560] text-[#fafaf9] px-8 py-4 font-semibold text-sm tracking-wider uppercase transition-all duration-300 hover:bg-[#c73651] disabled:opacity-60 self-start flex items-center gap-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {status === "sending" ? (
            <>
              <motion.div
                className="w-4 h-4 border-2 border-[#fafaf9]/30 border-t-[#fafaf9] rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              />
              {dict.contact.formSend}...
            </>
          ) : (
            <>
              {dict.contact.formSend}
              <span aria-hidden="true">→</span>
            </>
          )}
        </button>
      )}
    </form>
  );
}
