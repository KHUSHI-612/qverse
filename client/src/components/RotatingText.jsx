import { useEffect, useState } from 'react';

const facts = [
  { text: 'Science', category: 'subject' },
  { text: 'Mathematics', category: 'subject' },
  { text: 'History', category: 'subject' },
  { text: 'Literature', category: 'subject' },
  { text: 'Physics', category: 'subject' },
  { text: 'Chemistry', category: 'subject' },
  { text: 'Biology', category: 'subject' },
  { text: 'Philosophy', category: 'subject' },
  { text: 'Albert Einstein', category: 'person' },
  { text: 'Marie Curie', category: 'person' },
  { text: 'Isaac Newton', category: 'person' },
  { text: 'Leonardo da Vinci', category: 'person' },
  { text: 'The Great Wall of China', category: 'place' },
  { text: 'Mount Everest', category: 'place' },
  { text: 'The Amazon Rainforest', category: 'place' },
  { text: 'The Pyramids of Giza', category: 'place' },
];

export default function RotatingText() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % facts.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rotating-text-container">
      <span className="rotating-text-static">Explore questions about </span>
      <span className="rotating-text-dynamic" key={currentIndex}>
        {facts[currentIndex].text}
      </span>
    </div>
  );
}

