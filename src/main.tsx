import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './css/style.css';
import './css/satoshi.css';
import 'jsvectormap/dist/css/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';
import { AuthContext } from './contexts/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';
import { EventsContext } from './contexts/EventContext';
import { TeacherContext } from './contexts/TeachersContext';
import { PostContext } from './contexts/PostContext';
import { MembersContext } from './contexts/MembersContext';
import { AllUsers } from './contexts/AllUsers';
import { CategoryProvider } from './contexts/CategoryContext';
import { SubscriptionProvider } from './contexts/SubscriptionContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <AuthContext>
        <EventsContext>
          <TeacherContext>
            <PostContext>
              <MembersContext>
              <CategoryProvider>
                <SubscriptionProvider>
                  <AllUsers>
                    <App />
                  </AllUsers>
                </SubscriptionProvider>
              </CategoryProvider>
              </MembersContext>
            </PostContext>
          </TeacherContext>
        </EventsContext>
      </AuthContext>
    </Router>
  </React.StrictMode>,
);
