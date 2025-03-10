import { React, useState } from "react";

import EditBudgetButton from "@/components/jobPostEdit/EditBudgetButton";
import EditCategoryButton from "@/components/jobPostEdit/EditCategoryButton";
import EditDescriptionButton from "@/components/jobPostEdit/EditDescriptionButton";
import EditImageButton from "@/components/jobPostEdit/EditImageButton";
import EditLocationButton from "@/components/jobPostEdit/EditLocationButton";
import { Button } from "@/components/ui/button";
import ImagesCarousel from "@/components/jobPost/ImagesCarousel";
import Location from "@/components/common/Location";
import CollapsibleTextContainer from "@/components/common/CollapsibleTextContainer";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
export default function JobPost({
    className,
    jobInfo,
    notAvailable,
    updateJobInfo,
    edit = false,
    title = true,
}) {
    return (
        <div className={cn("flex flex-col space-y-4 ", className)}>
            <div className="flex items-center justify-start gap-6">
                {title && (
                    <h1 className="text-black font-header text-4xl font-semibold">
                        {jobInfo.title}
                    </h1>
                )}
                {(notAvailable && title) && (
                    <Badge variant="destructive">Not Available</Badge>
                )}
            </div>

            <div className="relative">
                <Location
                    wilaya={jobInfo.wilaya}
                    city={jobInfo.city}
                    size="md"
                />
                <div className="absolute top-0 right-1 ">
                    {edit && (
                        <EditLocationButton
                            wilaya={jobInfo.wilaya}
                            city={jobInfo.city}
                            onEdit={(newWilaya, newCity) => {
                                updateJobInfo({
                                    wilaya: newWilaya,
                                });
                                updateJobInfo({
                                    city: newCity,
                                });
                            }}
                        />
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
                <div
                    className="bg-cover bg-center rounded-3xl h-[450px] relative"
                    style={{ backgroundImage: `url(${jobInfo.images[0]})` }}
                >
                    <div className="absolute top-3 right-3">
                        {edit && (
                            <EditImageButton
                                images={jobInfo.images}
                                onEdit={(newImages) => {
                                    updateJobInfo({
                                        images: newImages,
                                    });
                                }}
                            />
                        )}
                    </div>
                    <div className="absolute bottom-3 right-3 ">
                        <ImagesCarousel images={jobInfo.images} />
                    </div>
                </div>
                <div>
                    <div className="relative">
                        <h3 className="font-bold">Description:</h3>
                        <CollapsibleTextContainer collapsedHeight="310px">
                            <p>{jobInfo.description}</p>
                        </CollapsibleTextContainer>
                        <div className="absolute top-0 right-1 ">
                            {edit && (
                                <EditDescriptionButton
                                    description={jobInfo.description}
                                    onEdit={(newDescription) => {
                                        updateJobInfo({
                                            description: newDescription,
                                        });
                                    }}
                                />
                            )}
                        </div>
                    </div>

                    <div className="flex justify-between mt-4 gap-4">
                        <div className="flex-1 relative">
                            <h4 className="font-bold">Category:</h4>
                            <p className="text-greyDark">
                                {jobInfo.category}, {jobInfo.subCategory}
                            </p>
                            <div className="absolute top-0 right-1 ">
                                {edit && (
                                    <EditCategoryButton
                                        category={jobInfo.category}
                                        subCategory={jobInfo.subCategory}
                                        onEdit={(
                                            newCategory,
                                            newSubCategory
                                        ) => {
                                            updateJobInfo({
                                                category: newCategory,
                                            });
                                            updateJobInfo({
                                                subCategory: newSubCategory,
                                            });
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="flex-1 relative">
                            <h4 className="font-bold">Budget:</h4>
                            <p className="text-greyDark">{jobInfo.budget}</p>
                            <div className="absolute top-0 right-1 ">
                                {edit && (
                                    <EditBudgetButton
                                        budget={jobInfo.budget}
                                        onEdit={(newBudget) => {
                                            updateJobInfo({
                                                budget: newBudget,
                                            });
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
