import { ApiAllResponse } from "@/types/global";
import { useEffect, useState } from "react";

const useAllFeatures = () => {
  const [layers, setLayers] = useState<ApiAllResponse>();
  const [loading, setloading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`);
        const data = await response.json();
        setLayers(JSON.parse(data));
      } catch (e) {
        console.error("Error fetching feature maps:", e);
      } finally {
        setloading(false);
      }
    };
    fetchData();
  });

  return { loading, layers };
};

export default useAllFeatures;
