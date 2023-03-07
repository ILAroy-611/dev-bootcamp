import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createCourse } from "../Redux/Thunks/CourseThunk";
import { useNavigate } from "react-router-dom";
import "../Styles/addcourseform.css";

function CreateCourses() {

  const[courseObj, setCourseObj]= useState({
    title: "",
    description: "",
    weeks: 0,
    tuition: "0",
    minimumSkill: "",
    scholarhipsAvailable: false
  });

  const dispatch= useDispatch();
  const navigate= useNavigate();
  const {id}= useParams();
  const {courseSuccess} = useSelector(state=>state.course);

  const handleChange=(e)=>{
    setCourseObj({...courseObj, [e.target.name]:e.target.value})
  }

  const handleCheckbox=(e)=>{
    setCourseObj({...courseObj, [e.target.name]:e.target.checked})
  }

  const handleCreateCourse=(e)=>{
    e.preventDefault();
    dispatch(createCourse({course:courseObj, bootcamp_id:id}))
    if(courseSuccess){
      navigate('/bootcamps');
    }
  }


  console.log(courseObj)
  return (
    <form className="add-course-container">
      <fieldset>
        <legend>Create Course</legend>
        <label htmlFor="course-title">Title of the course: </label>
        <input
          type="text"
          name="title"
          id="course-title"
          value={courseObj.title}
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
          value={courseObj.description}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="course-weeks">
          How many Weeks will it take to complete
        </label>
        <input
          type="number"
          name="weeks"
          id="course-weeks"
          min="0"
          value={courseObj.weeks}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="course-tution">What is the fee for this course?</label>
        <input
          type="text"
          name="tuition"
          id="course-tution"
          value={courseObj.tuition}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="course-minimumSkill">
          This course is best suited for-
        </label>
        <select name="minimumSkill" id="course-minimumSkill" onChange={handleChange}>
          <option value="beginner">New Developers/Beginners</option>
          <option value="intermediate">Intermediate level Developers</option>
          <option value="advanced">Advanced level Developers</option>
        </select>
        <br />
        <div className="scholarship">
          <label htmlFor="course-scholarship">
            Is Scholarship available for this course?
          </label>
          <input
            type="checkbox"
            name="scholarhipsAvailable"
            id="course-scholarship"
            value={courseObj.scholarhipsAvailable}
            onChange={handleCheckbox}
          />
        </div>
      </fieldset>
      <button className="create-course-btn btn" onClick={handleCreateCourse}>Create Course</button>
    </form>
  );
}

export default CreateCourses;
