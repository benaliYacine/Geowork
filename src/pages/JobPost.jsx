import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { React, useState } from "react";
import { MapPin } from "lucide-react";
import EditTitleButton from "@/components/jobPostEdit/EditTitleButton";
import EditBudgetButton from "@/components/jobPostEdit/EditBudgetButton";
import EditCategoryButton from "@/components/jobPostEdit/EditCategoryButton";
import EditDescriptionButton from "@/components/jobPostEdit/EditDescriptionButton";
import EditImageButton from "@/components/jobPostEdit/EditImageButton";
import EditLocationButton from "@/components/jobPostEdit/EditLocationButton";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Save, LayoutGrid } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function DeleteJobPost({ onDelete }) {
  const [isActionTaken, setIsActionTaken] = useState(false);

  const handleAction = () => {
    setIsActionTaken(true);
  };

  const handleClose = () => {
    if (isActionTaken) {
      onDelete();
      setIsActionTaken(false); // Reset the state for the next interaction
    }
  };

  return (
    <AlertDialog onOpenChange={handleClose}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Trash2 className="h-4 w-4 mr-2" />
          delete job post
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove Job Post</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to remove this Job Post?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="white">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleAction}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
function ImagesCarousel() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm" onClick={() => {}}>
          <LayoutGrid className="h-4 w-4 mr-2" /> show all photos
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm h-screen">
          {/* <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader> */}
          <Carousel className="w-full max-w-xs">
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-4xl font-semibold">
                          {index + 1}
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          {/* <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter> */}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

// TODO: rod el edit yemchi
export default function JobPost() {
  const [edit, setEdit] = useState(false); // State to control the visibility of edit components
  const [jobInfo, setJobInfo] = useState({
    title: "na7ihom memba3d ",
    category: "education_and_tutoring",
    subCategory: "math_tutor",
    wilaya: "alger",
    city: "sidi_moussa",
    budget: "DZD  5, 500",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
    images: ["blob:http://localhost:5173/fbddb264-653f-4d34-ba87-cb865e1d5464"],
  });
  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-col m-6 sm:mx-12 md:mx-18 lg:mx-40 xl:mx-52 max-w-[1440px] space-y-4">
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
        <Tabs defaultValue="viewJobPost" className="w-full">
          <TabsList className="mx-auto">
            <TabsTrigger value="viewJobPost">View Job Post</TabsTrigger>
            <TabsTrigger value="inviteExperts">Invite Experts</TabsTrigger>
          </TabsList>

          <TabsContent value="viewJobPost">
            {/* Your existing JSX here, wrap it in a div if needed */}

            <div className="flex flex-col space-y-4 mt-6 ">
              <div className="relative">
                <p className="text-greyDark">
                  <MapPin className="inline-block" /> {jobInfo.wilaya},{" "}
                  {jobInfo.city}
                </p>
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
                  <div className="absolute top-3 right-3 ">
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
                    <ImagesCarousel />
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
                  {/* TODO: on delete hot fiha fct li s supp l job post w tiik lel home (all job posts) */}
                  <DeleteJobPost onDelete={() => {}} />
                </div>
              ) : (
                <div className="flex items-center justify-end gap-4">
                  {" "}
                  {/* TODO: diir save fct fel onclick */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEdit(false);
                    }}
                  >
                    Cencel
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      setEdit(false);
                    }}
                  >
                    <Save className="h-4 w-4 mr-2" /> Save
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="inviteExperts">
            <div className="w-full flex flex-col items-center ">
              <p className="text-lg ">
                Content for inviting experts will be implemented here. Content
                for inviting experts will be implemented here.Content for
                inviting experts will be implemented here.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
