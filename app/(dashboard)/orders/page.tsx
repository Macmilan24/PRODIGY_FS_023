"use client";

import { DataTable } from "@/components/custom ui/DataTable";
import Loader from "@/components/custom ui/Loader";
import { columns } from "@/components/orders/OrderColumns";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

const Orders = () => {
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);

  const getOrders = async () => {
    try {
      const res = await fetch(`/api/orders`);
      const data = await res.json();
      setOrder(data);
      setLoading(false);
    } catch (err) {
      console.log("[Orders_GET]", err);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <p className=" text-heading2-bold">Orders</p>
      <Separator className="bg-gray-100 my-5" />

      <DataTable columns={columns} data={order} searchKey="_id" />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default Orders;
