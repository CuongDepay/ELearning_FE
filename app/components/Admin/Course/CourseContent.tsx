import { styles } from "@/app/styles/style";
import React, { FC, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { BsLink45Deg, BsPencil } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseContentData: any;
  setCourseContentData: (courseContentData: any) => void;
  handleSubmit: any;
};

const CourseContent: FC<Props> = ({
  courseContentData,
  setCourseContentData,
  active,
  setActive,
  handleSubmit: handlleCourseSubmit,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  );

  const [activeSection, setActiveSection] = useState(1);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleCollapseToggle = (index: number) => {
    const updatedCollasped = [...isCollapsed];
    updatedCollasped[index] = !updatedCollasped[index];
    setIsCollapsed(updatedCollasped);
  };

  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.splice(linkIndex, 1);
    setCourseContentData(updatedData);
  };

  const handleChangeLinkTitle = (courseDataIndex: number, linkIndex: number, value: string) => {
    const updatedData = [...courseContentData];
    const updatedLinks = [...updatedData[courseDataIndex].links];
    updatedLinks[linkIndex] = {
      ...updatedLinks[linkIndex],
      title: value,
    };
    updatedData[courseDataIndex] = {
      ...updatedData[courseDataIndex],
      links: updatedLinks,
    };
    setCourseContentData(updatedData);
  };

  const handleChangeUrl = (courseDataIndex: number, linkIndex: number, value: string) => {
    const updatedData = [...courseContentData];
    const updatedLinks = [...updatedData[courseDataIndex].links];
    updatedLinks[linkIndex] = {
      ...updatedLinks[linkIndex],
      url: value,
    };
    updatedData[courseDataIndex] = {
      ...updatedData[courseDataIndex],
      links: updatedLinks,
    };
    setCourseContentData(updatedData);
  };

  
  
  const handleChangeTitle = (courseDataIndex: number, value: string) => {
    const updatedData = [...courseContentData];
    updatedData[courseDataIndex] = {
      ...updatedData[courseDataIndex],
      title: value,
    };
    setCourseContentData(updatedData);
  };
  
  const handleChangeDescription = (courseDataIndex: number, value: string) => {
    const updatedData = [...courseContentData];
    updatedData[courseDataIndex] = {
      ...updatedData[courseDataIndex],
      description: value,
    };
    setCourseContentData(updatedData);
  };
  
  const handleChangeVideoUrl = (courseDataIndex: number, value: string) => {
    const updatedData = [...courseContentData];
    updatedData[courseDataIndex] = {
      ...updatedData[courseDataIndex],
      videoUrl: value,
    };
    setCourseContentData(updatedData);
  };
  
  const handleChangeVideoLength = (courseDataIndex: number, value: number) => {
    const updatedData = [...courseContentData];
    updatedData[courseDataIndex] = {
      ...updatedData[courseDataIndex],
      videoLength: value,
    };
    setCourseContentData(updatedData);
  };
  
  const handleChangeVideoSection = (courseDataIndex: number, value: string) => {
    const updatedData = [...courseContentData];
    updatedData[courseDataIndex] = {
      ...updatedData[courseDataIndex],
      videoSection: value,
    };
    setCourseContentData(updatedData);
  };
  

  const handleAddLink = (index: number) => {
    const updatedData = [...courseContentData]; // Tạo bản sao của mảng courseContentData
    updatedData[index] = {
      ...updatedData[index],
      links: [...updatedData[index].links, { title: "", url: "" }], // Tạo bản sao của mảng links và thêm mới
    };
    setCourseContentData(updatedData); // Cập nhật state với mảng đã cập nhật
  };

  const newContentHandler = (item: any) => {
    if (
      item.title === "" ||
      item.description === "" ||
      item.videoUrl === "" ||
      item.links[0].title === "" ||
      item.links[0].url === "" ||
      item.videoLength === ""
    ) {
      toast.error("Please fill all the fields first!");
    } else {
      let newVideoSection = "";

      if (courseContentData.length > 0) {
        const lastVideoSection =
          courseContentData[courseContentData.length - 1].videoSection;

        // use the last videoSection if available, else use user input
        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: newVideoSection,
        videoLength: "",
        links: [{ title: "", url: "" }],
      };

      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const addNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all the fields first!");
    } else {
      setActiveSection(activeSection + 1);
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoLength: "",
        videoSection: `Untitled Section ${activeSection}`,
        links: [{ title: "", url: "" }],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("section can't be empty!");
    } else {
      setActive(active + 1);
      handlleCourseSubmit();
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24 p-3">
      <form onSubmit={handleSubmit}>
        {courseContentData?.map((item: any, index: number) => {
          const showSectionInput =
            index === 0 ||
            item.videoSection !== courseContentData[index - 1].videoSection;

          return (
            <div
              className={`w-full bg-[#cdc8c817] p-4 ${
                showSectionInput ? "mt-10" : "mb-0"
              }`}
              key={index}
            >
              {showSectionInput && (
                <>
                  <div className="flex w-full items-center">
                    <input
                      type="text"
                      className={`text-[20px] ${
                        item.videoSection === "Untitled Section"
                          ? "w-[170px]"
                          : "w-min"
                      } font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                      value={item.videoSection}
                      onChange={(e) => {
                        handleChangeVideoSection(index, e.target.value);
                      }}
                    />
                    <BsPencil className="cursor-pointer dark:text-white text-black" />
                  </div>
                  <br />
                </>
              )}

              <div className="flex w-full items-center justify-between my-0">
                {isCollapsed[index] ? (
                  <>
                    {item.title ? (
                      <p className="font-Poppins dark:text-white text-black">
                        {index + 1}. {item.title}
                      </p>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <div></div>
                )}

                {/* // arrow button for collasped video content */}
                <div className="flex items-center">
                  <AiOutlineDelete
                    className={`dark:text-white text-[20px] mr-2 text-black cursor-pointer`}
                    onClick={() => {
                        const updatedData = [...courseContentData];
                        updatedData.splice(index, 1);
                        setCourseContentData(updatedData);
                    }}
                  />
                  <MdOutlineKeyboardArrowDown
                    fontSize="large"
                    className="dark:text-white text-black"
                    style={{
                      transform: isCollapsed[index]
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                    onClick={() => handleCollapseToggle(index)}
                  />
                </div>
              </div>
              {!isCollapsed[index] && (
                <>
                  <div className="my-3">
                    <label className={styles.label}>Video Title</label>
                    <input
                      type="text"
                      placeholder="Project Plan..."
                      className={`${styles.input}`}
                      value={item.title}
                      onChange={(e) => {
                        handleChangeTitle(index, e.target.value);
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label className={styles.label}>Video Url</label>
                    <input
                      type="text"
                      placeholder="sdder"
                      className={`${styles.input}`}
                      value={item.videoUrl}
                      onChange={(e) => {
                        handleChangeVideoUrl(index, e.target.value);
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label className={styles.label}>
                      Video Length (in minutes)
                    </label>
                    <input
                      type="number"
                      placeholder="20"
                      className={`${styles.input}`}
                      value={item.videoLength}
                      onChange={(e) => {
                        handleChangeVideoLength(index, e.target.valueAsNumber);
                      }}
                    />
                  </div>

                  <div className="mb-3">
                    <label className={styles.label}>Video Description</label>
                    <textarea
                      rows={8}
                      cols={30}
                      placeholder="sdder"
                      className={`${styles.input} !h-min py-2`}
                      value={item.description}
                      onChange={(e) => {
                        handleChangeDescription(index, e.target.value);
                      }}
                    />
                    <br />
                  </div>
                  {item?.links.map((link: any, linkIndex: number) => (
                    <div className="mb-3 block" key={linkIndex}>
                      <div className="w-full flex items-center justify-between">
                        <label className={styles.label}>
                          Link {linkIndex + 1}
                        </label>
                        <AiOutlineDelete
                          className={`${"cursor-pointer"} text-black dark:text-white text-[20px]`}
                          onClick={() => handleRemoveLink(index, linkIndex)}
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="(Link title)"
                        className={`${styles.input}`}
                        value={link.title}
                        onChange={(e) => {
                          handleChangeLinkTitle(index, linkIndex, e.target.value);
                        }}
                      />
                      <input
                        type="url"
                        placeholder="(Link URL)"
                        className={`${styles.input} mt-6`}
                        value={link.url}
                        onChange={(e) => {
                          handleChangeUrl(index, linkIndex, e.target.value);
                        }}
                      />
                    </div>
                  ))}
                  <br />
                  {/* add link button */}
                  <div className="inline-block mb-4">
                    <p
                      className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                      onClick={() => handleAddLink(index)}
                    >
                      <BsLink45Deg className="mr-2" /> Add Link
                    </p>
                  </div>
                </>
              )}
              <br />
              {/* add new content */}
              {index === courseContentData.length - 1 && (
                <div>
                  <p
                    className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                    onClick={(e: any) => newContentHandler(item)}
                  >
                    <AiOutlinePlusCircle className="mr-2" /> Add New Content
                  </p>
                </div>
              )}
            </div>
          );
        })}
        <br />
        <div
          className="flex items-center text-[20px] dark:text-white text-black cursor-pointer"
          onClick={() => addNewSection()}
        >
          <AiOutlinePlusCircle className="mr-2" /> Add new Section
        </div>
      </form>
      <br />
      <div className="w-full flex items-center justify-between">
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => prevButton()}
        >
          Prev
        </div>
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => handleOptions()}
        >
          Next
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default CourseContent;
