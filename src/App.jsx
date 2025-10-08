import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedLayout from "./utils/ProtectedLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PageNotFound } from "./components";
import {
  Login,
  ForgotPassword,
  VerifyOTP,
  ResetPassword,
  Dashboard,
  CustomersList,
  CustomerDetail,
  EventsList,
  EventDetail,
  AddEvent,
  GroupsList,
  GroupDetail,
  AddGroup,
  RulesList,
  AddNewRules,
  AddNewPost,
  AddNewPoll,
  ChatsList,
  SupportList,
  SupportTicketDetail,
  Settings,
  Profile,
} from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Login />} />
        <Route path={"/forgot-password"} element={<ForgotPassword />} />
        <Route path={"/verify-otp"} element={<VerifyOTP />} />
        <Route path={"/reset-password"} element={<ResetPassword />} />

        <Route element={<ProtectedLayout />}>
          <Route path={"/dashboard"} element={<Dashboard />} />
          <Route path={"/customers"} element={<CustomersList />} />
          <Route
            path={"/customers/customer-detail/:id"}
            element={<CustomerDetail />}
          />
          <Route path={"/events"} element={<EventsList />} />
          <Route path={"/events/event-detail/:id"} element={<EventDetail />} />
          <Route path={"/events/add-event"} element={<AddEvent />} />
          <Route path={"/groups"} element={<GroupsList />} />
          <Route path={"/groups/group-detail"} element={<GroupDetail />} />
          <Route path={"/groups/add-group"} element={<AddGroup />} />
          <Route path={"/groups/rules"} element={<RulesList />} />
          <Route path={"/groups/add-rule"} element={<AddNewRules />} />
          <Route path={"/groups/add-new-post"} element={<AddNewPost />} />
          <Route path={"/groups/add-new-poll"} element={<AddNewPoll />} />

          <Route path={"/chats"} element={<ChatsList />} />
          <Route path={"/support"} element={<SupportList />} />
          <Route
            path={"/support/ticket-detail"}
            element={<SupportTicketDetail />}
          />
          <Route path={"/settings"} element={<Settings />} />
          <Route path={"/profile"} element={<Profile />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  );
}

export default App;
