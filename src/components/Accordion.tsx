import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Item {
  question: string;
  answer: string;
}

const Accordion: React.FC<{ items: Item[] }> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((it, idx) => (
        <div key={idx} className="border rounded-lg overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="w-full text-left px-4 py-3 flex justify-between items-center"
          >
            <span className="font-medium">{it.question}</span>
            <span className="text-amber-600">{openIndex === idx ? '−' : '+'}</span>
          </button>
          <AnimatePresence initial={false}>
            {openIndex === idx && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="px-4 pb-4 text-gray-600"
              >
                <div>{it.answer}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
