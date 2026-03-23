# Waste Reporting and Management System

## Current State
New project. No existing application files.

## Requested Changes (Diff)

### Add
- Home Page: eco-friendly landing page with hero, features section, large CTA buttons, navigation
- Login/Register Page: tabbed form switching between login and registration
- Report Waste Page: form with image upload+preview, location text input, waste type selection (wet/dry/mixed), description, submit
- User Dashboard: list of user's submitted complaints with status badges (Pending/Assigned/Cleaned)
- Admin Dashboard: table/card view of all complaints, assign worker input, update status, filter by status
- Global state via React Context: users, complaints, current session
- Seed data: 3-5 sample complaints for demo
- Status badges: Pending (yellow), Assigned (blue), Cleaned (green)
- Responsive layout for mobile and desktop
- Smooth animations: hover effects, page transitions, loading states

### Modify
N/A

### Remove
N/A

## Implementation Plan
1. Create AuthContext with user registration, login, logout, and current user state
2. Create ComplaintsContext with complaints list, add complaint, update status, assign worker, seed data
3. Build Router with pages: Home, Login, ReportWaste, UserDashboard, AdminDashboard
4. Build Home page with hero, features, navigation, eco icons
5. Build Login/Register page with tabs
6. Build Report Waste form with image upload preview, location, waste type, description
7. Build User Dashboard with complaint list and status badges
8. Build Admin Dashboard with full complaint table, filter, assign worker, status update
9. Apply design: green primary, white background, blue highlights, large readable fonts, smooth transitions
