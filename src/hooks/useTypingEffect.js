import { useEffect, useRef, useState } from "react";

export function useTypingEffect(
  phrases,
  {
    typeSpeed = 80,
    deleteSpeed = 40,
    pauseAfter = 1800,
    pauseBefore = 400,
  } = {}
) {
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!phrases?.length) return;

    const currentPhrase = phrases[phraseIndex % phrases.length];

    const step = () => {
      setDisplayText((prev) => {
        // typing forward
        if (!isDeleting) {
          const next = currentPhrase.slice(0, prev.length + 1);

          // reached full phrase -> pause, then start deleting
          if (next.length === currentPhrase.length) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
              setIsDeleting(true);
            }, pauseAfter);
          } else {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(step, typeSpeed);
          }

          return next;
        }

        // deleting
        const next = currentPhrase.slice(0, prev.length - 1);

        // finished deleting -> pause, then move to next phrase and start typing
        if (next.length === 0) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
            setIsDeleting(false);
            setPhraseIndex((i) => (i + 1) % phrases.length);
          }, pauseBefore);
        } else {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(step, deleteSpeed);
        }

        return next;
      });
    };

    // start the loop
    timeoutRef.current = setTimeout(step, isDeleting ? deleteSpeed : typeSpeed);

    return () => clearTimeout(timeoutRef.current);
  }, [
    phrases,
    phraseIndex,
    isDeleting,
    typeSpeed,
    deleteSpeed,
    pauseAfter,
    pauseBefore,
  ]);

  return { displayText };
}
