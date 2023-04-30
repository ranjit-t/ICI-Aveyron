import { useState, useEffect } from "react";
import { db } from "../../Firebase/config";
import { collection, getDocs } from "firebase/firestore";

const useActivities = () => {
  const [allActivities, setAllActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const colRef = collection(db, "activities");
        const docsSnap = await getDocs(colRef);
        let activitiesArray = [];
        docsSnap.forEach((doc) => {
          activitiesArray.push(doc.data());
        });
        setAllActivities(activitiesArray);
      } catch (error) {
        console.error(error);
      }
    };
    fetchActivities();
  }, []);

  // localStorage.setItem("allActivities", JSON.stringify(allActivities));

  return allActivities;
};

export default useActivities;
