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
import SearchBar from "@/components/searchBar/SearchBar";
import { Pencil, Save } from "lucide-react";
import AlertDialog from "@/components/common/AlertDialog";

import PropagateLoader from "react-spinners/PropagateLoader";

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

export default function SubmitProposal() {
    const [budget, setbudget] = useState();
    const [state, setState] = useState("waiting");
    const [coverLetter, setCoverLetter] = useState();
    const { id } = useParams();
    const navigate = useNavigate();
    const form = useForm({
        resolver: zodResolver(proposalSchema),
        defaultValues: {
            budget: budget,
            coverLetter: coverLetter,
        },
    });

    const onSubmit = form.handleSubmit(async (values) => {
        setbudget(values.budget);
        setCoverLetter(values.coverLetter);
        const response = await axios.patch("/changeProposalBudget", {
            id,
            budget: values.budget,
            coverLetter: values.coverLetter,
        });
        console.log("response.data", response.data);
        setEdit(false);
        console.log(values); // Handle the form values,
    });
    const [loading, setLoading] = useState(true);
    const [jobInfo, setJobInfo] = useState(
        // {
        // title: "Residential Wiring Upgrade",
        // category: "home_improvement_and_maintenance",
        // subCategory: "electrician",
        // wilaya: "algiers",
        // city: "sidi_moussa",
        // budget: "DZD  5, 500",
        // description:
        //     "Upgraded the electrical wiring in a three-bedroom apartment in Algiers. Replaced old wiring with new, safe, and efficient wiring, installed new circuit breakers, and ensured all outlets and switches were up to code.",
        // images: [
        //     "https://blog.constructionmarketingassociation.org/wp-content/uploads/2019/08/electrical-works-construction-project.jpg",
        //     "https://source.unsplash.com/user/c_v_r/1900×800",
        //     "https://via.placeholder.com/300.png/09f/fff",
        // ],
        // }
        null
    );
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`/expertProposalPage/${id}`);
            if (response.data.redirectUrl) {
                navigate(response.data.redirectUrl);
            }
            console.log("hna nchofo state",response.data);
            if (response.data) {
                setJobInfo({
                    ...response.data,
                    images: response.data.images.map((i) => i.url),
                });
                form.reset({
                    budget: response.data.budgetProposal,
                    coverLetter: response.data.coverLetter,
                });
                setbudget(response.data.budgetProposal);
                setCoverLetter(response.data.coverLetter);
                setState(response.data.state);
            }
            setLoading(false);
        };
        fetchData();
    }, []);
    const withrawProposal = async () => {
        const response = await axios.patch("withrawProposal", { id });
        console.log("ProposalWithrawed", response.data);
    };

    const [edit, setEdit] = useState(false);
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
                    <div className="flex items-center justify-between">
                        <h1 className="text-black font-header text-4xl font-semibold">
                            Proposal details
                        </h1>
                    </div>
                    <div className="flex flex-col gap-4 mt-6 mb-6">
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
                                    navigate(`/job/${jobInfo._id}`);
                                }}
                            >
                                View job Posting
                            </Button>
                        </div>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="flex flex-col gap-4"
                            >
                                <div className="w-full flex flex-col gap-2 rounded-3xl p-6 bg-white">
                                    <h3 className="text-2xl font-header font-semibold mb-1">
                                        Budget
                                    </h3>

                                    {!edit ? (
                                        <>
                                            <p className="text-greyDark font-semibold text-xl p-2">
                                                {budget}
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <p className=" text-sm font-normal ">
                                                How much do you want to be paid
                                                for this job
                                            </p>
                                            <CurrencyFormField
                                                control={form.control}
                                                name="budget"
                                                label=""
                                                placeholder="Enter your budget"
                                                className="border border-border focus-visible:border-primary"
                                            />
                                        </>
                                    )}
                                </div>

                                <div className="w-full flex flex-col gap-2 rounded-3xl p-6 bg-white">
                                    <h3 className="text-2xl font-header font-semibold">
                                        Cover Letter
                                    </h3>
                                    {!edit ? (
                                        <>
                                            <p>{coverLetter}</p>
                                        </>
                                    ) : (
                                        <>
                                            <TextareaFormField
                                                className="border border-border focus-visible:border-primary"
                                                control={form.control}
                                                name="coverLetter"
                                                label=""
                                                placeholder=""
                                                height="180px"
                                            />
                                        </>
                                    )}
                                </div>
                                {!edit ? (
                                    <div className="flex items-center justify-end gap-4">
                                        {" "}
                                        {state == "waiting" && (
                                            <>
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    onClick={() => {
                                                        setEdit(true);
                                                    }}
                                                >
                                                    <Pencil className="h-4 w-4 mr-2" />{" "}
                                                    edit proposal
                                                </Button>

                                                {/* TODO: on delete hot fiha fct li t supp l job post w tdiik lel home (all job posts) */}

                                                <AlertDialog
                                                    title="Withdraw proposal"
                                                    description="Are you sure you want to withdraw this proposal"
                                                    action={withrawProposal}
                                                    actionButtonText="Withdraw"
                                                >
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        type="button"
                                                    >
                                                        Withdraw proposal
                                                    </Button>
                                                </AlertDialog>
                                            </>
                                        )}
                                        {/* <DeleteJobPost onDelete={() => {}} /> */}
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-end gap-4 mt-2">
                                        {" "}
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                setEdit(false);
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                        {/* TODO: diir save lel job info fel base de donne fel onclick */}
                                        <Button type="submit" size="sm">
                                            <Save className="h-4 w-4 mr-2" />{" "}
                                            Save
                                        </Button>
                                    </div>
                                )}
                            </form>
                        </Form>
                    </div>
                </PageContainer>
                <Footer />
            </>
        );
}
//}
