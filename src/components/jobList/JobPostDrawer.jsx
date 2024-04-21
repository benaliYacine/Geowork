import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer-right";
import { Button } from "@/components/ui/button";
import { React, useState } from "react";

export default function JobPostDrawer({ onDelete }) {
  return (
    <Drawer>
      <DrawerTrigger>
        {" "}
        <Button variant="outline" size="sm">
          Open Job Post
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-full w-3/5" data-vaul-no-drag>
        <DrawerHeader data-vaul-no-drag>
          <DrawerTitle data-vaul-no-drag>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription data-vaul-no-drag>
            This action cannot be undone.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter data-vaul-no-drag>
          <div>
            <Button>Submit</Button>
          </div>
          <DrawerClose data-vaul-no-drag>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
