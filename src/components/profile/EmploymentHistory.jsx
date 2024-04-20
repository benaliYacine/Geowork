import { useState } from "react";
import EmploymentItem from "@/components/profile/EmploymentItem";
import AddEmploymentButton from "@/components/profile_slides/slideThree/AddEmploymentButton";
import { Separator } from "@/components/ui/separator";
import CollapsibleContainer from "@/components/common/CollapsibleContainer";
import { v4 as uuid } from "uuid";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function EmploymentHistory({ profileInfo, updateProfileInfo }) {
  const addEmployment = (newEmployment) => {
    updateProfileInfo({
      employments: [...profileInfo.employments, newEmployment],
    });
  };

  const deleteEmployment = (indexToDelete) => {
    const filteredEmployments = profileInfo.employments.filter(
      (_, index) => index !== indexToDelete
    );
    updateProfileInfo({
      employments: filteredEmployments,
    });
  };

  const editEmployment = (indexToEdit, updatedEmployment) => {
    const updatedEmployments = profileInfo.employments.map(
      (employment, index) =>
        index === indexToEdit ? updatedEmployment : employment
    );
    updateProfileInfo({
      employments: updatedEmployments,
    });
  };
  return (
    <>
      <div className="w-full flex flex-col gap-6 rounded-3xl p-6 bg-white">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <h3 className="text-4xl font-header font-semibold mb-1">
              Employment history
            </h3>
            <AddEmploymentButton addEmployment={addEmployment} />
          </div>
          <CollapsibleContainer>
            {profileInfo.employments.length == 0 ? (
              <div className=" text-lg w-full p-3 h-fit text-primary flex justify-center items-center">
                there is no items here
              </div>
            ) : (
              profileInfo.employments.map((employment, index) => (
                <div key={uuid()} className="mb-4">
                  <EmploymentItem
                    key={uuid()}
                    employment={employment}
                    title={employment.title}
                    currentlyIn={employment.currentlyIn}
                    company={employment.company}
                    location={employment.Location}
                    startDate={`${months[employment.date.start.month - 1]} ${
                      employment.date.start.year
                    }`}
                    endDate={
                      employment.currentlyIn
                        ? "Present"
                        : `${months[employment.date.end.month - 1]} ${
                            employment.date.end.year
                          }`
                    }
                    description={employment.description}
                    onEdit={(newEmp) => editEmployment(index, newEmp)}
                    onDelete={() => deleteEmployment(index)}
                    index={index}
                  />
                  <Separator />
                </div>
              ))
            )}
          </CollapsibleContainer>
        </div>
      </div>
    </>
  );
}
