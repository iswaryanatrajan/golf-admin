// http://18.216.79.130:5000
// http://localhost:5000
// https://backend.golf-encounters.com:5000
const API_BASE_URL = "https://backend.golf-encounters.com:5000"
const API_VERSION = "admin";
export const frontEnd:string = "https://golf-encounters.com/";
export const API_ENDPOINTS = {
  //auth
  REGISTER: `${API_BASE_URL}/${API_VERSION}/register`,
  LOGIN: `${API_BASE_URL}/${API_VERSION}/login`,
  
  //event
  CREATEEVENT: `${API_BASE_URL}/${API_VERSION}/createEvent`,
  GET_USER: `${API_BASE_URL}/${API_VERSION}/user/`,
  UPDATEUSER: `${API_BASE_URL}/${API_VERSION}/update-profile`,
  GETALLEVENT: `${API_BASE_URL}/${API_VERSION}/get-all-events`,
  PUBLICEVENTS: `${API_BASE_URL}/${API_VERSION}/get-public-events`,
  ADDCOMMENT: `${API_BASE_URL}/${API_VERSION}/add-comment`,
  ADDLIKE: `${API_BASE_URL}/${API_VERSION}/add-like`,
  MARKASFAVORITE: `${API_BASE_URL}/${API_VERSION}/is-favourite-event/`,
  GETFAVEVENTS: `${API_BASE_URL}/${API_VERSION}/get-favourite-events`,
  GETEVENTSBYID: `${API_BASE_URL}/${API_VERSION}/get-events-by-user-id`,
  GETJOINEDEVENTS: `${API_BASE_URL}/${API_VERSION}/get-joined-events`,
  JOINEDEVENTS: `${API_BASE_URL}/${API_VERSION}/join-event/`,
  GETEVENTBYID: `${API_BASE_URL}/${API_VERSION}/get-event-by-id/`,
  GETPUBLICEVENTBYID: `${API_BASE_URL}/${API_VERSION}/get-public-event-by-id/`,
  DELETE_EVENT: `${API_BASE_URL}/${API_VERSION}/delete-event-by-id/`,

 
  // teacher
  BECOMETEACHER: `${API_BASE_URL}/${API_VERSION}/become-teacher`,
  GETALLTEACHERS: `${API_BASE_URL}/${API_VERSION}/get-all-teachers`,
  GETALLTEACHERSPUBLIC: `${API_BASE_URL}/${API_VERSION}/get-all-teachers-public`,
  GETTEACHERBYID: `${API_BASE_URL}/${API_VERSION}/get-teacher-by-id/`,
  UPDATEPROFILE: `${API_BASE_URL}/${API_VERSION}/update-profile`,
  UPDATETEACHERPROFILE: `${API_BASE_URL}/${API_VERSION}/update-teacher-profile`,
  BOOKAPPOINTMENT: `${API_BASE_URL}/${API_VERSION}/book-appointment`,
  GETTEACHERBOOKEDAPPOINTMENTS: `${API_BASE_URL}/${API_VERSION}/get-teacher-booked-appointments`,
  GETUSERBOOKEDAPPOINTMENTS: `${API_BASE_URL}/${API_VERSION}/get-user-booked-appointments`,
  GETTEACHERAPPPOINTMENTCOUNT: `${API_BASE_URL}/${API_VERSION}/get-teacher-appointments-count`,
  GETTEACHERAPPPOINTMENTPUBLICCOUNT: `${API_BASE_URL}/${API_VERSION}/get-public-teacher-appointments-count`,
  UPDATEAPPOINTMENTSTATUS: `${API_BASE_URL}/${API_VERSION}/update-appointment-status`,  
  GETFAVORITETEACHER: `${API_BASE_URL}/${API_VERSION}/get-favorite-teachers`,
  ACCEPTAPPOINTMENT: `${API_BASE_URL}/${API_VERSION}/accept-appointment`, 
  DELETETEACHER: `${API_BASE_URL}/${API_VERSION}/delete-teacher/`,

  // teams
  GETALLTEAMS: `${API_BASE_URL}/${API_VERSION}/get-all-teams`, 
  GETTEAMSBYEVENT: `${API_BASE_URL}/${API_VERSION}/get-teams-by-event/`, 
  UPDATETEAMMEMBER: `${API_BASE_URL}/${API_VERSION}/update-team-member`, 
  GETALLUSERS: `${API_BASE_URL}/${API_VERSION}/total-users`,

  
  // student
  FAVORITETEACHER: `${API_BASE_URL}/${API_VERSION}/favorite-teacher`,

  //posts
  CREATEPOSTS: `${API_BASE_URL}/${API_VERSION}/create-post`, 
  GETPOSTS: `${API_BASE_URL}/${API_VERSION}/get-all-posts`, 
  GETPUBLICPOSTS: `${API_BASE_URL}/${API_VERSION}/get-public-posts`, 
  GETPOSTBYID: `${API_BASE_URL}/${API_VERSION}/get-post-by-id/`, 
  ADDPOSTCOMMENT: `${API_BASE_URL}/${API_VERSION}/add-post-comment`,
  ADDPOSTLIKE: `${API_BASE_URL}/${API_VERSION}/add-post-like`,
  GETTOTALPOSTS: `${API_BASE_URL}/${API_VERSION}/get-all-posts`,
  UPDATEPOST: `${API_BASE_URL}/${API_VERSION}/update-post`,
  UPDATEPOSTMEDIA: `${API_BASE_URL}/${API_VERSION}/update-post-media`,
  DELETEPOST: `${API_BASE_URL}/${API_VERSION}/delete-post/`,
  //location
  GETEVENTPLACE: `${API_BASE_URL}/${API_VERSION}/get-event-places`,
  GETEVENTPLACES: `${API_BASE_URL}/${API_VERSION}/get-public-event-places`,


  //categories admin
  POSTCATEGORY: `${API_BASE_URL}/${API_VERSION}/add-category`,
  GETCATEGORY: `${API_BASE_URL}/${API_VERSION}/get-admin-categories`,
  GETALLCATEGORIES: `${API_BASE_URL}/${API_VERSION}/get-all-categories`,
  PUTCATEGORY: `${API_BASE_URL}/${API_VERSION}/assign-categories-to-user/`,
  UNASSIGNCATEGORY: `${API_BASE_URL}/${API_VERSION}/unassign-categories-from-user/`,
  DELETECATEGORY: `${API_BASE_URL}/${API_VERSION}/delete-category`,
  UPDATECATEGORY: `${API_BASE_URL}/${API_VERSION}/update-category`,

  // event add payment price
  UPDATEEVENTPAYMENT: `${API_BASE_URL}/${API_VERSION}/update-event-payment`,
  GETEVENTPAYMENT: `${API_BASE_URL}/${API_VERSION}/get-event-payment`,
  SETUPEVENTPAYMENT: `${API_BASE_URL}/${API_VERSION}/set-up-event-payment`,

  // TEACHER ADD PAYEMNT
  SETUPTEACHERPAYMENT: `${API_BASE_URL}/${API_VERSION}/set-up-teacher-payment`,
  UPDATETEACHERPAYMENT: `${API_BASE_URL}/${API_VERSION}/update-teacher-payment`,
  GETTEACHERPAYMENT: `${API_BASE_URL}/${API_VERSION}/get-teacher-payment`,

  //members
  GETCOMMUNITYMEMBERS: `${API_BASE_URL}/${API_VERSION}/get-community-members`,
  UPLOADCOMMUNITYMEMBERS: `${API_BASE_URL}/${API_VERSION}/upload-community-members`,
  UPDATECOMMUNITYMEMBER: `${API_BASE_URL}/${API_VERSION}/update-community-member`,
  DELETECOMMUNITYMEMBER: `${API_BASE_URL}/${API_VERSION}/delete-community-member`,
  GETCOMMUNITYMEMBER_BY_ID: `${API_BASE_URL}/${API_VERSION}/get-community-member/`,

  //courseseetings - event templates
  GETTEMPLATEBYID: `${API_BASE_URL}/${API_VERSION}/get-course-event-by-id`,
  GETTEMPLATES: `${API_BASE_URL}/${API_VERSION}/get-course-events`,
  CREATETEMPLATE: `${API_BASE_URL}/${API_VERSION}/create-course-event`, 
  UPDATETEMPLATE: `${API_BASE_URL}/${API_VERSION}/update-course-event`, 
  DELETETEMPLATE: `${API_BASE_URL}/${API_VERSION}/delete-course-event`, 
  UPLOADTEMPLATE: `${API_BASE_URL}/${API_VERSION}/upload-course-event`,
};
