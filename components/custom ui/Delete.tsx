"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
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
import toast from "react-hot-toast";

interface DeleteProps {
  id: string;
  item: string;
}

const Delete: React.FC<DeleteProps> = ({ id, item }) => {
  const [loading, setLoading] = useState(true);

  const onDelete = async () => {
    try {
      setLoading(true);
      const itemType = item === "product" ? "products" : "collections";
      const res = await fetch(`/api/${itemType}/${id}`, { method: "DELETE" });

      if (res.ok) {
        setLoading(false);
        window.location.href = `/${itemType}`;

        toast.success(`${item} deleted successfully`);
      }
    } catch (err) {
      console.log(err);
      toast.error(`Error deleting ${item}. Please try again `);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="bg-red-1 text-white">
          <Trash className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className=" bg-white text-grey-1">
        <AlertDialogHeader>
          <AlertDialogTitle className=" text-red-1">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            {item}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-1 text-white" onClick={onDelete}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete;
