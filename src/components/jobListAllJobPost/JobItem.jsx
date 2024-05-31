import { React, useState, useEffect } from "react";
import Location from "@/components/common/Location";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Category from "@/components/common/Category";
import JobPostDrawer from "@/components/jobList/JobPostDrawer";
import Heart from "react-heart";
import { useNavigate } from "react-router-dom";
export default function JobItem({ job }) {
    const navigate = useNavigate();
    console.log("job.heart", job);
    const [isClick, setClick] = useState(false);
    const [isExpert, setIsExpert] = useState(job.isExpert ? true : false);
    useEffect(() => {
        setClick(job.heart);
    }, [job.heart]);
    const heartClick = async () => {
        let response;
        console.log(job);
        console.log(isClick);
        setClick(!isClick);
        if (!isClick) {
            response = await axios.patch("/api/jobs/addSavedJob", {
                id: job.id,
            });
            console.log(response.data);
        } else {
            response = await axios.patch("/api/jobs/suppSavedJob", {
                id: job.id,
            });
            console.log(response.data);
        }
    };
    const [idClient, setIdClient] = useState(null);
    console.log("jobPostDrawer", job);
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("/idClient");
            if (response.data.idClient) {
                setIdClient(response.data.idClient);
            }
        };
        fetchData();
    }, []);
    return (
        <div className="flex flex-col items-center w-full mb-2 rounded-lg">
            <div className="flex flex-col sm:flex-row items-center p-2 w-full">
                <div className="flex mr-auto">
                    <div className=" mr-4">
                        <div
                            className="bg-cover bg-center rounded-lg h-[100px] w-[120px]"
                            style={{ backgroundImage: `url(${job.images[0]})` }}
                        ></div>
                    </div>
                    <div className="flex-grow mb-2">
                        <Button
                            noScale
                            variant="title"
                            className="text-lg font-semibold mb-1 "
                            size="none"
                            onClick={() => {
                                if (
                                    job.closed ||
                                    job.closed ||
                                    job.idClient != idClient
                                )
                                    navigate(
                                        `/job/${job.id ? job.id : job._id}`
                                    );
                                else
                                    navigate(
                                        `/jobPostPage/${job.id ? job.id : job._id}`
                                    );
                            }}
                        >
                            {job.title}
                        </Button>

                        <div className="">
                            <Category
                                category={job.category}
                                subCategory={job.subCategory}
                                size="sm"
                            />
                        </div>
                        <p className="text-md text-primary font-semibold ">
                            {job.budget}
                        </p>
                        <Location
                            wilaya={job.wilaya}
                            city={job.city}
                            size="sm"
                        />
                    </div>
                </div>
                <div className="ml-auto sm:ml-0 sm:mb-auto flex gap-4 justify-center items-center">
                    {/* TODO: diir l button ydiik lel page ta3 l job */}
                    {/* <Button variant="outline" size="sm">
            Open Job Post
          </Button> */}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            if (
                                job.isExpert ||
                                job.closed ||
                                job.hired ||
                                job.idClient != idClient
                            )
                                navigate(`/job/${job.id ? job.id : job._id}`);
                            else
                                navigate(
                                    `/jobPostPage/${job.id ? job.id : job._id}`
                                );
                        }}
                    >
                        Open Job Post
                    </Button>
                    {isExpert && (
                        <div className="w-7 h-7">
                            <Heart
                                onClick={heartClick}
                                className="w-full h-full"
                                isActive={isClick}
                                animationScale={1.25}
                                inactiveColor="#ff5400"
                                activeColor="#ff5400"
                            />
                        </div>
                    )}
                </div>
            </div>
            <Separator />
        </div>
    );
}
