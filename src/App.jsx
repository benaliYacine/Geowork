import { useState, useEffect } from "react";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Messages from "./pages/Messages";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import WelcomePro from "./pages/WelcomePro";
import WelcomeCli from "./pages/WelcomeCli";
import InputWilayaCity from "./pages/InputWilayaCity";
import ProfileSlides from "./pages/ProfileSlides";
import JobSlides from "./pages/JobSlides";
import JobPost from "./pages/JobPostPage";
import SendEmailPage from "./pages/SendEmailPage";
import AllJobPosts from "./pages/AllJobPosts";
import JobsSearch from "./pages/JobsSearch";
import ExpertsSearch from "./pages/ExpertsSearch";
import Settings from "./pages/Settings";
import ProfilePage from "./pages/ProfilePage";
import JobPostPage from "./pages/JobPostPage";
import Dashboard from "./pages/Dashboard";
import FindWork from "./pages/FindWork";
import ProposalPage from "./pages/ProposalPage";
import SubmitProposal from "./pages/SubmitProposal";
import Job from "./pages/Job";
import SavedJobs from "./pages/SavedJobs";
import SavedExperts from "./pages/SavedExperts";
import ExpertProposalPage from "./pages/ExpertProposalPage";
import ClientProfilePage from "./pages/ClientProfilePage";
import io from "socket.io-client";
import axios from "axios";
import EmailVerified from "./pages/EmailVerified";

//--3 tari9a li ra7 nekhedmou biha fel pfe
//makach nav la 3ndk default page w fiha te9der tro7 l page khdoukhra b link kima hna dert home hiya default (path="/") w fel houme dert link yediik lel about page

function App() {
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        const newSocket = io("ws://localhost:3000");
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);
    useEffect(() => {
        if (socket === null) return;
        socket.emit("addNewUser");
        return () => {
            socket.off("getOnlineUsers");
        };
    }, [socket]);
    axios.defaults.baseURL = "http://localhost:3000";
    axios.defaults.withCredentials = true;
    return (
        <div className="bg-bg">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/inputWilayaCity"
                        element={<InputWilayaCity />}
                    />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/messages" element={<Messages />} />
                    <Route path="/messages/:id" element={<Messages />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/welcomePro" element={<WelcomePro />} />
                    <Route path="/welcomeCli" element={<WelcomeCli />} />
                    <Route path="/profileSlides" element={<ProfileSlides />} />
                    <Route path="/jobSlides" element={<JobSlides />} />
                    <Route path="/jobPostPage/:id" element={<JobPostPage />} />
                    <Route path="/verifyEmail" element={<SendEmailPage />} />
                    <Route path="/savedJobs" element={<SavedJobs />} />
                    <Route path="/savedExperts" element={<SavedExperts />} />
                    <Route
                        path="/expertProposalPage/:id"
                        element={<ExpertProposalPage />}
                    />
                    <Route
                        path="/expertProposalPage"
                        element={<ExpertProposalPage />}
                    />

                    <Route path="/jobsSearch" element={<JobsSearch />} />
                    <Route path="/proposal/:id" element={<ProposalPage />} />
                    <Route
                        path="/:type/:id/verify/:tokenId"
                        element={<EmailVerified />}
                    />
                    <Route path="/proposal/" element={<ProposalPage />} />
                    <Route path="/expertsSearch" element={<ExpertsSearch />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/Cprofile" element={<ClientProfilePage />} />
                    <Route
                        path="/submitProposal/:id"
                        element={<SubmitProposal />}
                    />

                    <Route path="/job/:id" element={<Job />} />
                    <Route path="/expert/:id" element={<ProfilePage />} />
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
