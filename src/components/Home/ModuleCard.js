import React, { useEffect, useState } from 'react';
import '../../firebase'
import { auth , db } from '../../firebase'
import { collection, query, where, getDocs } from "firebase/firestore";
import ManagerModule from './ManagerModule';
import LearnerModule from './LearnerModule';

const ModuleCard = () => {

  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const q = query(collection(db, 'userInfo'), where('owner_uid', '==', auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          if (doc.data().role === 'manager') {
            setUserRole('manager');
          } else {
            setUserRole('learner');
          }
        });
      } catch (error) {
        console.error('Error fetching user role: ', error);
      }
    };

    // Listen for changes in authentication state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // If user is authenticated, fetch user role
        fetchUserRole();
      } else {
        // If user is not authenticated, reset user role
        setUserRole(null);
      }
    });

    // Clean up subscription
    return () => unsubscribe();
  }, []);

  const funcManager = () => {
    return (
      <div>
        <ManagerModule/>
      </div>
    )
  }

  const funcLearner = () => {
    return (
      <div>
        {/* Content visible to other users */}
        <LearnerModule/>
      </div>
    )
  }

  // Render logic based on the user's role
  return (
    <div>
      { 
        userRole === 'manager' ? funcManager() 
        : userRole === 'learner' ? funcLearner() 
        : null
      }
      </div>
  );
};

export default ModuleCard;
