Project Overview
Theme Integration and API Creation
In this project, we aim to integrate a theme into our React application, ensuring a consistent look and feel across all pages. We'll seamlessly integrate the theme into our header, sidebar, and footer components, enhancing the user experience.

To handle user authentication, we'll create APIs for the Login and Signup pages. Upon signup, user data will be collected and securely stored in our MongoDB database. Subsequently, users will be redirected to the Login page to verify their credentials.

OTP Verification and Local Storage
Upon successful login, users will undergo an additional layer of security through OTP verification. A modal will prompt users to input their mobile OTP, ensuring secure access to the dashboard. Additionally, user information will be stored securely in the local storage, streamlining future logins.

Role-based Access Control
Our application will support role-based access control, distinguishing between administrators and regular users. Upon login, users will be directed to different dashboards tailored to their roles, providing a personalized experience.

User Management
Within the dashboard, administrators will have access to an "All Users" section, presenting a comprehensive table of all registered users. The interface will include an "Add User" button, enabling administrators to easily add new users via a user-friendly form. A "Back" button will allow for seamless navigation between pages.

User Profile Management
Users will have the ability to manage their profiles within the application. They can upload profile photos, edit basic information, and save changes securely on the backend. This feature enhances user engagement and customization.

MongoDB Integration
MongoDB will play a crucial role in managing student, teacher, class, and subject data. Through MongoDB's powerful pipeline capabilities, we'll establish associations between teachers, students, and classes. This integration will provide insights into which teacher is assigned to teach which class, enriching our application's functionality.
