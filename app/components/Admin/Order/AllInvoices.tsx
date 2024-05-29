import React, { useEffect, useState } from "react";
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import { useGetAllOrdersQuery } from "@/redux/features/orders/ordersApi";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { AiOutlineMail } from "react-icons/ai";

type Props = {
  isDashboard?: boolean;
};

const AllInvoices = ({ isDashboard }: Props) => {
  const { isLoading, data } = useGetAllOrdersQuery({});
  const { data: usersData } = useGetAllUsersQuery({});
  const { data: coursesData } = useGetAllCoursesQuery({});

  const [orderData, setOrderData] = useState<any>([]);

  useEffect(() => {
    if (data) {
      const temp = data.orders.map((item: any) => {
        const user = usersData?.users.find(
          (user: any) => user._id === item.userId
        );
        const course = coursesData?.courses.find(
          (course: any) => course._id === item.courseId
        );
        return {
          ...item,
          userName: user?.name,
          userEmail: user?.email,
          title: course?.name,
          price: "VND" + course?.price,
        };
      });
      setOrderData(temp);
    }
  }, [data, usersData, coursesData]);

  return (
    <div className={!isDashboard ? "mt-[120px]" : "mt-[0px]"}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {orderData.map((item: any) => (
            <div
              key={item._id}
              className={`rounded-md shadow-md p-4 hover:bg-gray-100 dark:hover:bg-gray-800 ${
                isDashboard ? "bg-gray-100 dark:bg-gray-800" : ""
              }`}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">{item.id}</h3>
                {isDashboard ? null : (
                  <div className="flex items-center">
                    <span className="mr-2">{item.userName}</span>
                    <a href={`mailto:${item.userEmail}`}>
                      <AiOutlineMail className="text-blue-500 hover:text-blue-700" size={20} />
                    </a>
                  </div>
                )}
              </div>
              {!isDashboard && (
                <div className="mt-2">
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.title}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {format(item.createdAt)}
                  </p>
                </div>
              )}
              <div className="mt-4 flex justify-end">
                <p className="font-medium">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllInvoices;
