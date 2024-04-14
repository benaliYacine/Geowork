import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { React, useState } from "react";

import EditTitleButton from "@/components/jobPostEdit/EditTitleButton";
import EditBudgetButton from "@/components/jobPostEdit/EditBudgetButton";
import EditCategoryButton from "@/components/jobPostEdit/EditCategoryButton";
import EditDescriptionButton from "@/components/jobPostEdit/EditDescriptionButton";
import EditImageButton from "@/components/jobPostEdit/EditImageButton";
import EditLocationButton from "@/components/jobPostEdit/EditLocationButton";
import { Button } from "@/components/ui/button";
import { Pencil, Save, LayoutGrid } from "lucide-react";

import DeleteJobPost from "@/components/jobPost/DeleteJobPost";
import ImagesCarousel from "@/components/jobPost/ImagesCarousel";
import RatingDisplay from "@/components/expertList/RatingDisplay";
import Location from "@/components/common/Location";
import ExpertItem from "@/components/expertList/ExpertItem";
import ExpertList from "@/components/expertList/ExpertList";

export default function JobPost() {
  const [edit, setEdit] = useState(false); // State to control the visibility of edit components
  // TODO: rod jobInfo yjiib l data ta3ha mel server doka ani dayer ghi dummy data
  const [jobInfo, setJobInfo] = useState({
    title: "na7ihom memba3d ",
    category: "education_and_tutoring",
    subCategory: "math_tutor",
    wilaya: "alger",
    city: "sidi_moussa",
    budget: "DZD  5, 500",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
    images: [
      "https://placebear.com/g/200/200",
      "https://source.unsplash.com/user/c_v_r/1900×800",
      "https://via.placeholder.com/300.png/09f/fff",
    ],
  });
  const [oldJobInfo, setOldJobInfo] = useState(jobInfo);

  // Function to update job information
  const updateJobInfo = (newInfo) => {
    setJobInfo((prevInfo) => ({ ...prevInfo, ...newInfo }));
  };

  function SaveJobInfo() {
    //TODO: hna diir save lel job info fel server
    console.log(jobInfo);
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full">
        <div className="flex flex-col m-6 sm:mx-12 md:mx-18 lg:mx-40 xl:mx-52 max-w-[1440px] ">
          <div className="flex flex-col">
            <div className="flex items-center justify-between relative ">
              <h1 className="text-black font-header text-4xl font-bold">
                {jobInfo.title}
              </h1>
              <div className="absolute top-0 right-1 ">
                {edit && (
                  <EditTitleButton
                    title={jobInfo.title}
                    onEdit={(newTitle) => {
                      updateJobInfo({
                        title: newTitle,
                      });
                    }}
                  />
                )}
              </div>
            </div>
            <Tabs defaultValue="viewJobPost" className="mt-4">
              <TabsList className="">
                <TabsTrigger value="viewJobPost">View Job Post</TabsTrigger>
                <TabsTrigger value="inviteExperts">Invite Experts</TabsTrigger>
              </TabsList>
              <TabsContent value="viewJobPost">
                {/* Your existing JSX here, wrap it in a div if needed */}
                <div className="flex flex-col space-y-4 mt-6 ">
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
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
                        <p className="line-clamp-14">{jobInfo.description}</p>
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
                                onEdit={(newCategory, newSubCategory) => {
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
                  {!edit ? (
                    <div className="flex items-center justify-end gap-4">
                      {" "}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEdit(true);
                        }}
                      >
                        <Pencil className="h-4 w-4 mr-2" /> edit job post
                      </Button>
                      {/* TODO: on delete hot fiha fct li t supp l job post w tdiik lel home (all job posts) */}
                      <DeleteJobPost onDelete={() => {}} />
                    </div>
                  ) : (
                    <div className="flex items-center justify-end gap-4">
                      {" "}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEdit(false);
                          setJobInfo(oldJobInfo);
                        }}
                      >
                        Cancel
                      </Button>
                      {/* TODO: diir save lel job info fel base de donne fel onclick */}
                      <Button
                        size="sm"
                        onClick={() => {
                          SaveJobInfo();
                          setEdit(false);
                          setOldJobInfo(jobInfo);
                        }}
                      >
                        <Save className="h-4 w-4 mr-2" /> Save
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="inviteExperts">
                <div className=" flex flex-col items-center mt-6">
                  <ExpertList />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
