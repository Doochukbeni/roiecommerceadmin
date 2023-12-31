import { format } from "date-fns";

import BillboardClient from "@/components/BillboardClient";
import { db } from "@/lib/db";
import React from "react";

import { BillboardColumn } from "./components/BillboardColumns";

const Billboard = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await db.billboard.findMany({
    where: {
      storeId: params.storeId,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className=" flex flex-col  dark:bg-slate-900 dark:text-slate-200">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default Billboard;
