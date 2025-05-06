import { ApiResponse } from "@/types/global";
import { useEffect, useState } from "react";

const useFeatureInput = () => {
  const [layers, setLayers] = useState<ApiResponse>();
  const [loading, setloading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/layer");
        const data: ApiResponse = await response.json();
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

export default useFeatureInput;
