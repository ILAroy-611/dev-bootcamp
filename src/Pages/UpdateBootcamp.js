import { useDispatch, useSelector } from "react-redux";
import { createBootcamp } from "../Redux/Thunks/BootCampThunk";
import { useState } from "react";
import "../Styles/createbootcamp.css";

function UpdateBootcamp() {
  const {user}= useSelector((state)=>state.auth);
  const {bootcampDetails} = useSelector(state=>state.bootcamp);

  const dispatch= useDispatch();

  let options=["Web Development", "Mobile Development", "UI/UX", "Data Science", "Business", "Front-end Development", "Back-end Development", "Full-Stack Development", "Database Administration", "Other"] ;
  options=options.filter(opt=>!bootcampDetails.careers.includes(opt))
  

  const[bootcampObj, setBootcampObj] = useState({
    name:bootcampDetails.name,
		description: bootcampDetails.description,
		website: bootcampDetails.website,
		phone: bootcampDetails.phone,
		email: bootcampDetails.email,
		address: bootcampDetails.location.formattedAddress,
		careers: bootcampDetails.careers,
		housing: bootcampDetails.housing,
		jobAssistance: bootcampDetails.jobAssistance,
		jobGuarantee: bootcampDetails.jobGuarantee,
    averageCost:bootcampDetails.averageCost,
  })

  const handleChange=(e)=>{
    setBootcampObj({...bootcampObj, [e.target.name]:e.target.value})
  }

  const handleCheckbox=(e)=>{
    setBootcampObj({...bootcampObj, [e.target.name]:e.target.checked})
  }

  const handleMultiSelect=(e)=>{
    let opt= [...e.target.selectedOptions].map(opt=>opt.value)
    setBootcampObj({...bootcampObj, [e.target.name]:opt})
  }

  const handleCreateBootcamp=()=>{
    dispatch(createBootcamp(bootcampObj))
  }


  return (
    <div className="create-bootcamp-container">
      <h2 className="create-heading">Let's Get Started... </h2>
      <form>
        <div className="new-bootcamp-basic-info">
          <h3>Basic Information</h3>
          <label htmlFor="new-bootcamp-name">
            Let's start with the Bootcamp Title
          </label>
          <input
            type="text"
            name="name"
            id="new-bootcamp-name"
            placeholder="Title/Name of Bootcamp"
            value={bootcampObj.name}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="new-bootcamp-description">
            What's this bootcamp about?
          </label>
          <input
            type="text"
            name="description"
            id="new-bootcamp-description"
            placeholder="Description of Bootcamp"
            value={bootcampObj.description}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="new-bootcamp-website">
            Where can users find you on web?
          </label>
          <input
            type="text"
            name="website"
            id="new-bootcamp-website"
            placeholder="Website of Bootcamp"
            value={bootcampObj.website}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="new-bootcamp-website">
            What is the estimated cost?
          </label>
          <input
            type="text"
            name="averageCost"
            id="new-bootcamp-cost"
            value={bootcampObj.averageCost}
            placeholder="Average Cost of Bootcamp ex.$100"
            onChange={handleChange}
          />
          <br />
        </div>
        <div className="new-bootcamp-contact-info">
          <h3>How can we Contact you?</h3>
          <label htmlFor="new-bootcamp-phone">Provide your Phone Number</label>
          <input
            type="text"
            name="phone"
            id="new-bootcamp-phone"
            placeholder="BootCamp owner Contact Number"
            value={bootcampObj.phone}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="new-bootcamp-email">Provide your Email-id</label>
          <input
            type="text"
            name="email"
            id="new-bootcamp-email"
            placeholder="Email of Bootcamp"
            value={bootcampObj.email}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="new-bootcamp-address">Provide your Address</label>
          <input
            type="text"
            name="address"
            id="new-bootcamp-address"
            placeholder="Address of Bootcamp Owner"
            value={bootcampObj.address}
            onChange={handleChange}
          />
        </div>
        <div className="new-bootcamp-careers">
          <h3> Careers </h3>
          <label htmlFor="careers">
            What areas are focused in your Bootcamp?
          </label>
          <br />
          <select name="careers" id="careers" size="2" multiple onChange={handleMultiSelect}>
            {/* <option value="#" className="career-options"></option> */}
            {bootcampDetails.careers.map(opt=>{
                return(
                    <option value={opt} className="career-options" selected>{opt}</option>
                )
            } )}
            {options.map(opt=>{
                return(
                    <option value={opt} className="career-options" >{opt}</option>
                )
            } )}
            {/* <option value="Web Development" className="career-options"  >
              Web Development
            </option>
            <option value="Mobile Development" className="career-options" >
              Mobile Development
            </option>
            <option value="UI/UX" className="career-options" >
              UI/UX
            </option>
            <option value="Data Science" className="career-options" >
              Data Science
            </option>
            <option value="Business" className="career-options" >
              Business
            </option>
            <option value="Front-end Development" className="career-options" >
              Front-end Development
            </option>
            <option value="Back-end Development" className="career-options" >
              Back-end Development
            </option>
            <option value="Full-Stack Development" className="career-options" >
              Full-Stack Development
            </option>
            <option value="Database Administration" className="career-options" >
              Database Administration
            </option>
            <option value="Other" className="career-options" >
              Other
            </option> */}
          </select>
        </div>
        <div className="new-bootcamp-additional-info">
          <h3>Additional Information</h3>
          <div className="additonal-info flex">
            <label htmlFor="new-bootcamp-housing">Housing Available ?</label>
            <input
              type="checkbox"
              name="housing"
              id="new-bootcamp-housing"
              value={bootcampObj.housing}
              checked = {bootcampObj.housing}
              onChange={handleCheckbox}
            />
          </div>
          <div className="additonal-info flex">
            <label htmlFor="new-bootcamp-job-guide">
              Do you provide Job Assistance ?
            </label>
            <input
              type="checkbox"
              name="jobAssistance"
              id="new-bootcamp-job-guide"
              value={bootcampObj.jobAssistance}
              checked = {bootcampObj.jobAssistance}
              onChange={handleCheckbox}
            />
          </div>
          <div className="additonal-info flex">
            <label htmlFor="new-bootcamp-job-guarantee">
              Does bootcamp guarantee Job ?
            </label>
            <input
              type="checkbox"
              name="jobGuarantee"
              id="new-bootcamp-job-guarantee"
              value={bootcampObj.jobGuarantee}
              checked = {bootcampObj.jobGuarantee}
              onChange={handleCheckbox}
            />
          </div>
        </div>
      </form>
      <div className="create-bootcamp-btn flex">
        <button className="submit-bootcamp-btn btn" onClick={handleCreateBootcamp} >Create Bootcamp</button>
        <button className="cancel-btn btn">Cancel</button>
      </div>
    </div>
  );

}

export default UpdateBootcamp