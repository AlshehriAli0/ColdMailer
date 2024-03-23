"use client";

import React from "react";
import { SignIn } from "@clerk/nextjs";
import { motion } from "framer-motion";

export default function SignInPage() {
  return (
    <section className="mt-[7.5rem] flex h-screen w-screen scroll-mt-96 justify-center sm:mt-[5rem]">
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        <SignIn
          appearance={{
            elements: {
              "internal-1b63r8w": "!invert",
              dividerText: "text-violet-200",
              alternativeMethodsBlockButton:
                "border hover:scale-105 border-white/10 hover:bg-black/15 text-violet-400 font-bold  ",
              alternativeMethodsBlockButtonText: "text-violet-400 font-bold",
              formFieldInputShowPasswordIcon: "text-white",
              identityPreviewEditButtonIcon: "text-white",
              identityPreview: "border border-white/10",
              identityPreviewText: "text-violet-200 font-semibold",
              footer: "-mt-6 mb-0",
              socialButtonsBlockButton__apple: "-mt-3",
              socialButtonsBlockButton:
                "border hover:scale-105 border-white/10 hover:bg-black/15",
              dividerRow: "-mt-5 -mb-2",
              logoImage: "-mt-8",
              dividerLine: "bg-white/10",
              socialButtonsBlockButtonArrow: "text-violet-200",
              providerIcon__apple: "!white invert",

              formFieldAction__password:
                "text-violet-200 hover:text-violet-300 transition-all",

              footerActionText: "text-violet-700",
              footerActionLink:
                "text-violet-200 hover:text-violet-300 transition-all",
              headerBackLink:
                "-mt-8 mb-14 text-violet-200 hover:text-violet-300 transition-all",
              headerBackIcon:
                "-mt-8 mb-14 text-violet-200 hover:text-violet-300 transition-all",

              formButtonPrimary:
                "bg-violet-700 hover:bg-violet-900 hover:scale-105 active:scale-100 -mt-2",
              card: "bg-violet-200/10 h-[30rem] border border-white/5 sm:hover:!scale-[1.025] transition",
              headerTitle: "-mt-8 text-violet-400",
              headerSubtitle: "text-violet-800",
              formFieldRow: "-mt-4 mb-2",
              socialButtonsBlockButtonText: "text-violet-400 font-semibold",
              formFieldLabel: "text-violet-400",
              formFieldInput:
                "bg-slate-950/50 text-white ring-white/10 ring-1 focus:!outline-none !outline-none focus:border-violet-400/80 transition-colors ",
              formFieldInfoText: "text-violet-700",
            },
          }}
        />
      </motion.div>
    </section>
  );
}
