"use client";

import { useState, useEffect } from "react";
import ContactFormModal from "@/components/ContactFormModal";

export default function TechContactOverlay() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (e.data?.type === "markition-contact-trigger") {
        setShow(true);
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  if (!show) return null;
  return <ContactFormModal onClose={() => setShow(false)} />;
}
