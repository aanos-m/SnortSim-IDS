import React, { useEffect, useState } from 'react';
import '../../firebase'
import { auth , db } from '../../firebase'
import { collection, query, where, getDocs } from "firebase/firestore";


const ModuleCard = () => {
  const [isManager, setIsManager] = useState(false);

  useEffect(() => {
    const fetchData = async () => {

      const q = query(collection(db, "userInfo"), where("owner_uid", "==", auth.currentUser.uid));
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          if (doc.data().role === "manager"){
            setIsManager(true)
          } else {
            setIsManager(false)
          }
        });
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    // Call the async function to fetch data
    if (auth.currentUser) {
      fetchData();
      console.log("from module card: ", auth.currentUser.uid)
    }
  }, []);

  const funcManager = () => {
    return (
      <div>
        <h1>Welcome Manager!</h1>
        <button onClick={() => alert('module added ')}>Add Module</button>
        <button onClick={() => alert('module delete ')}>Delete Module</button>
      </div>
    )
  }

  const funcLearner = () => {
    return (
      <div>
        {/* Content visible to other users */}
        <h1>Welcome User!</h1>
      </div>
    )
  }

  // Render logic based on the user's role
  return (
    <div>
      {isManager ? (
        funcManager()
      ) : (
        funcLearner()
      )}
    </div>
  );
};

export default ModuleCard;
