import { ApiAllResponse } from "@/types/global";
import { useEffect, useState } from "react";

const useAllFeatures = () => {
  const [layers, setLayers] = useState<ApiAllResponse>();
  const [loading, setloading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/all_layers`);
        const data: ApiAllResponse = await response.json();
        // console.log(data.response!);
        setLayers(data);
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
