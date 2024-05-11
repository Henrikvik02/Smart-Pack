import { useEffect, useState } from "react";
import { apiClient } from "../services/api-client"; // Use the apiClient you have set up
import { Rule } from "../services/object-service";

const useRuleTags = (gjenstandid: number) => {
  const [regelverker, setRegelverker] = useState<Rule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Function to fetch rules related to an item
    const fetchRegelverker = () => {
      apiClient.get<Rule[]>(`/regelverker/${gjenstandid}`)
        .then(response => {
          setRegelverker(response.data); // Set the rules directly from response
        })
        .catch(err => {
          setError('En feil oppsto ved henting av regelverker.'); // Set an error message on failure
        })
        .finally(() => {
          setIsLoading(false); // Ensure to set loading false after the operation
        });
    };

    // Call the function if gjenstandid is available
    if (gjenstandid) {
      fetchRegelverker();
    } else {
      setIsLoading(false); // If no gjenstandid is provided, do not perform fetch
    }
  }, [gjenstandid]);

  return { regelverker, isLoading, error };
};

export default useRuleTags;
