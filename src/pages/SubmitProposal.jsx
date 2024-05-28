import { React, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import PageContainer from "@/components/common/PageContainer";
import JobPost from "@/components/jobPost/JobPost";
import { Button } from "@/components/ui/button";
import CurrencyFormField from "@/components/formFields/CurrencyFormField";
import TextareaFormField from "@/components/formFields/TextareaFormField";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";
import SearchBar from "@/components/searchBar/SearchBar";
const proposalSchema = z.object({
    budget: z
        .string()
        .min(1, "budget is required")
        // Adjust regex as needed if your input format includes the "DZD" prefix.
        .regex(/^DZD  \d{1,3}(, \d{3})*$/, "budget is required"),
    coverLetter: z
        .string()
        .min(10, {
            message: "Your coverLetter must be at least 10 characters.",
        })
        .max(3000, {
            message:
                "Your coverLetter must not be longer than 3000 characters.",
        }),
});

export default function SubmitProposal({}) {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const form = useForm({
        resolver: zodResolver(proposalSchema),
        defaultValues: {},
    });

    const onSubmit = form.handleSubmit(async (values) => {
        console.log(values); // Handle the form values,
        const proposal = {
            id: null,
            message: {
                jobId: id,
                type: "proposal",
                budget: values.budget,
                coverLetter: values.coverLetter,
                content: "Proposal Message",
                state: "waiting",
            },
        };
        const response = await axios.post("addMessage", proposal);
        console.log("messaaaaage", response.data);
        navigate("/messages");
    });

    const [jobInfo, setJobInfo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`/SubmitProposal/${id}`);
            if (response.data.redirectUrl) {
                navigate(response.data.redirectUrl);
            }
            if (response.data) {
                setLoading(false);
                console.log("response.data", response.data);
                console.log(
                    "{...response.data,images:response.data.map((i)=>(i.url))}",
                    {
                        ...response.data,
                        images: response.data.images.map((i) => i.url),
                    }
                );
                setJobInfo({
                    ...response.data,
                    images: response.data.images.map((i) => i.url),
                });
            }
        };
        fetchData();
    }, []);
    if (loading)
        return (
            <div className="flex items-center justify-center w-full h-full min-h-screen min-w-screen">
                <PropagateLoader color="#FF5400" />
            </div>
        );
    if (jobInfo)
        return (
            <>
                <Header />
                <PageContainer>
                    <SearchBar />
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex items-center justify-between">
                                <h1 className="text-black font-header text-4xl font-semibold">
                                    Submit a proposal
                                </h1>
                            </div>
                            <div className="flex flex-col gap-4 mt-6">
                                <div className="w-full flex flex-col rounded-3xl p-6 bg-white">
                                    <h3 className="text-2xl font-header font-semibold mb-6">
                                        Job details
                                    </h3>
                                    <h4 className="text-black font-header text-xl font-semibold">
                                        {jobInfo.title}
                                    </h4>
                                    <JobPost
                                        jobInfo={jobInfo}
                                        edit={false}
                                        apply={false}
                                        title={false}
                                    />
                                    <Button
                                        variant="link"
                                        className="w-fit mt-2"
                                        type="button"
                                        onClick={() => {
                                            navigate(`/job/${id}`);
                                        }}
                                    >
                                        View job Posting
                                    </Button>
                                </div>

                                <div className="w-full flex flex-col gap-2 rounded-3xl p-6 bg-white">
                                    <h3 className="text-2xl font-header font-semibold mb-1">
                                        Budget
                                    </h3>
                                    <p className=" text-sm font-normal ">
                                        How much do you want to be paid for this
                                        job
                                    </p>
                                    <CurrencyFormField
                                        control={form.control}
                                        name="budget"
                                        label=""
                                        placeholder="Enter your budget"
                                        className="border border-border focus-visible:border-primary"
                                    />
                                </div>
                                <div className="w-full flex flex-col gap-2 rounded-3xl p-6 bg-white">
                                    <h3 className="text-2xl font-header font-semibold">
                                        Cover Letter
                                    </h3>
                                    <TextareaFormField
                                        className="border border-border focus-visible:border-primary"
                                        control={form.control}
                                        name="coverLetter"
                                        label=""
                                        placeholder=""
                                        height="180px"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4 p-4">
                                <Button type="submit" size="lg">
                                    Send
                                </Button>
                                <Button
                                    onClick={(e) => {
                                        navigate("/dashboard");
                                    }}
                                    variant="outline"
                                    size="lg"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </Form>
                </PageContainer>
                <Footer />
            </>
        );
}
//}
