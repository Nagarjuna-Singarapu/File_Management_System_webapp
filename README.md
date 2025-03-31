# Web Application with Django & ReactJS

## Project Overview
This project is a full-stack web application that allows users to upload, manage, and download files while providing authentication and user profile management functionalities. The application uses Django for the backend API and ReactJS for the frontend.

### Features:
- **Authentication**:
  - Login page with email/password authentication (including validation).
- **File Management**:
  - Users can upload files.
  - A table displays uploaded files with details (Filename, upload date, file type – PDF, Excel, TXT).
  - Users can download files by clicking on the filename.
- **Dashboard**:
  - Displays the total number of files uploaded.
  - Shows a breakdown of file types (e.g., PDF, Excel, Word).
  - Shows the number of files uploaded by each user.
- **User Profile**:
  - Users can edit their username.
  - Users can manage multiple addresses.
  - Users can add/edit phone numbers.

## Setup Instructions

### Prerequisites
Make sure you have the following installed:
- Python 3.x
- Node.js
- npm (Node package manager)
- Django
- ReactJS

### Backend Setup (Django)

1. Clone the repository:
   ``sh
   git clone https://github.com/Nagarjuna-Singarapu/File_Management_System_webapp.git


2. Navigate into the project directory:
``sh
    cd File_Management_System_webapp/
    ``
3. Set Up the Backend (Django)
    --Ensure you have Python installed (preferably 3.8 or later).

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`

# Install dependencies
pip install -r requirements.txt

# Navigate to the Backend directory
cd backend

# Run database migrations
python manage.py migrate

# Create a superuser (optional, for admin access)
python manage.py createsuperuser

# Start the Django development server
python manage.py runserver

4. Set Up the Frontend (React)
    --Ensure you have Node.js installed.

# Navigate to the frontend directory
cd ../frontend

# Install dependencies
yarn install  # or `npm install`

# Start the React development server
yarn start  # or `npm start`

5. Running the Application

Once both backend and frontend servers are running:

The backend will be available at http://127.0.0.1:8000/

The frontend will be available at http://localhost:3000/

## API Endpoints

Here are the available API endpoints for the application:

| Method | Endpoint                          | Description                                                        |
|--------|-----------------------------------|--------------------------------------------------------------------|
| POST   | `signup/`                         | Register a new user                                               |
| POST   | `login/`                          | Login with email and password                                      |
| GET    | `/api/users/profile/`             | Get user profile information                                       |
| PUT    | `/api/users/profile/`             | Update user profile information                                    |
| POST   | `/api/files/upload/`              | Upload a file to the server                                        |
| GET    | `/api/files/list/`                | List all uploaded files                                            |
| GET    | `/api/files/download/<int:file_id>/` | Download a specific file by ID                                  |
| GET    | `/api/dashboard/`                 | Get dashboard statistics (total files, file type breakdown, etc.)  |
| GET    | `/api/users/addresses/`           | Get all user addresses                                             |
| POST   | `/api/users/addresses/`           | Add a new address for the user                                     |
| DELETE | `/api/users/addresses/<int:pk>/`  | Delete a specific address by ID                                    |
-------------------------------------------------------------------------------------------------------------------

Requirements File
To generate a requirements.txt file for your backend dependencies, run:

``sh
    pip freeze > requirements.txt
    ``


This is the full README file with all necessary details, including the API table, setup instructions, and project overview.

