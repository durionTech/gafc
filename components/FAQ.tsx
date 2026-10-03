"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
  {
    question: "What time are your Sunday services?",
    answer:
      "Our Sunday gatherings begin at 9:30 AM. We also have a Youth & Teens Fellowship at 12:00 PM.",
  }, 
  {
    question: "Do I need to register before attending?",
    answer:
      "No registration is required. Everyone is welcome to join us for worship.",
  }, 
  {
    question: "Who is the true God",
    answer:
      "He who sacrificed himself for us, rose again on the third day, and wants to dwell in our hearts, is Jesus Christ.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-[#f6f4ef] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        {/* Small Heading */}
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-[#c69b32]" />

          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9b751b]">
            Frequently Asked Questions
          </span>

          <span className="h-px w-8 bg-[#c69b32]" />
        </div>

        {/* Main Heading */}
        <h2 className="text-center font-serif text-3xl text-[#17130f] sm:text-4xl">
          Have Questions?
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-6 text-[#6d6259]">
          Find quick answers about our church, gatherings, and community.
        </p>

        {/* FAQ List */}
        <div className="mt-10 space-y-3">

          {faqs.map((faq, index) => {
            const isOpen = open === index;

            return (
              <div
                key={index}
                className="overflow-hidden rounded-lg border border-[#e5e0d6] bg-white"
              >

                {/* Question */}
                <button
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                >
                  <span className="pr-4 text-sm font-semibold text-[#211e1b]">
                    {faq.question}
                  </span>

                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition ${
                      isOpen
                        ? "bg-[#951b28] text-white"
                        : "bg-[#f7edcf] text-[#a17b21]"
                    }`}
                  >
                    <Plus
                      className={`h-4 w-4 transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    />
                  </span>
                </button>

                {/* Answer */}
                {isOpen && (
                  <div className="border-t border-[#eee9df] px-5 pb-5 pt-3">
                    <p className="max-w-3xl text-sm leading-6 text-[#6d6259]">
                      {faq.answer}
                    </p>
                  </div>
                )}

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}