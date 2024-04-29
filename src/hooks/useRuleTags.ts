import { useEffect, useState } from "react";
import axios from "axios";
import { Rule, RuleTag } from "../services/object-service";

const useRuleTags = (gjenstandid: number) => {
  const [regelverker, setRegelverker] = useState<Rule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Start funksjonen for å hente regelverk tags
    const fetchRegelverkTags = () => {
      axios.get<RuleTag[]>(`http://localhost:3001/regelverkTag?gjenstandid=${gjenstandid}`)
      .then(response => {
        const regelverkTags = response.data;
        // Anta at hver get-request returnerer en liste av regelverk, selv om det er bare ett element i listen.
        const regelverkPromises = regelverkTags.map(tag =>
          axios.get<Rule[]>(`http://localhost:3001/regelverker?regelverkid=${tag.regelverkid}`)
        );
      
        return Promise.all(regelverkPromises);
      })
      .then(regelverkResponses => {
        // Flatten ut svarene fordi hver respons er en liste av regler.
        const regelverkerData = regelverkResponses.flatMap(response => response.data);
        setRegelverker(regelverkerData);
      })
      
        .catch(err => {
          setError('En feil oppsto ved henting av regelverker.');
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    // Kaller funksjonen
    fetchRegelverkTags();
  }, [gjenstandid]);

  return { regelverker, isLoading, error };
};

export default useRuleTags;
