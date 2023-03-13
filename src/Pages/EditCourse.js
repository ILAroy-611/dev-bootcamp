import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { resetUpdate } from "../Redux/Slices/CourseSlice";
import { getCourseDetail, updateCourse } from "../Redux/Thunks/CourseThunk";



function EditCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { courseDetails, isCourseUpdated } = useSelector(
    (state) => state.course
  );

    console.log(courseId)

  const [editedCourse, setEditedCourse] = useState({
    courseId: courseId,
    title: ""  ,
    description: ""  ,
    weeks: ""  ,
    tuition: ""  ,
    minimumSkill: ""  ,
    scholarshipsAvailable: "" ,
  });

  const handleChange = (e) => {
    setEditedCourse({ ...editedCourse, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (e) => {
    setEditedCourse({ ...editedCourse, [e.target.name]: e.target.checked });
  };

  const handleEditCourse = (e) => {
    e.preventDefault();
    dispatch(updateCourse(editedCourse));
    dispatch(resetUpdate());
  };

  useEffect(()=>{
    if(isCourseUpdated){
        navigate('/bootcamps')
    }
  },[isCourseUpdated])


  console.log(editedCourse)
  return (
        <form className="add-course-container">
          <fieldset>
            <legend>Edit Course</legend>
            <label htmlFor="course-title">Title of the course: </label>
            <input
              type="text"
              name="title"
              id="course-title"
              value={editedCourse.title}
              placeholder={courseDetails?.title}
              onChange={handleChange}
            />
            <br />
            <label htmlFor="course-description">
              Describe this course precisely:
            </label>
            <input
              type="text"
              name="description"
              id="course-description"
              value={editedCourse.description}
              placeholder={courseDetails?.description}
              onChange={handleChange}
            />
            <br />
            <label htmlFor="course-weeks">
              How many Weeks will it take to complete?
            </label>
            <input
              type="number"
              name="weeks"
              id="course-weeks"
              min="0"
              value={editedCourse.weeks}
              placeholder={courseDetails?.weeks}
              onChange={handleChange}
            />
            <br />
            <label htmlFor="course-tution">
              What is the fee for this course?
            </label>
            <input
              type="text"
              name="tuition"
              id="course-tution"
              value={editedCourse.tuition}
              placeholder={courseDetails?.tuition}
              onChange={handleChange}
            />
            <br />

            <label htmlFor="course-minimumSkill">
              This course is best suited for-
            </label>
            <select
              name="minimumSkill"
              id="course-minimumSkill"
              onChange={handleChange}
            >
              <option value="beginner">New Developers/Beginners</option>
              <option value="intermediate">
                Intermediate level Developers
              </option>
              <option value="advanced">Advanced level Developers</option>
            </select>
            <br />
            <div className="scholarship">
              <label htmlFor="course-scholarship">
                Is Scholarship available for this course?
              </label>
              <input
                type="checkbox"
                name="scholarshipsAvailable"
                id="course-scholarship"
                value={editedCourse.scholarshipsAvailable}
                placeholder={courseDetails?.scholarshipsAvailable}
                onChange={handleCheckbox}
              />
            </div>
          </fieldset>
          <button className="create-course-btn btn" onClick={handleEditCourse}>
            Update Course
          </button>
        </form>
  );
}

export default EditCourse;
