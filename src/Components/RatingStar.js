import '../Styles/ratingstar.css'


function RatingStar({averageRating}) {
    let checked_star=[];
    let unchecked_star=[];
    let half_checked_star=[];


    for(let i=0; i<parseInt(averageRating); i++ ){
         checked_star.push(<i className="fa-solid fa-star checked-star"></i>)
    }
    if(averageRating>parseInt(averageRating)){
        half_checked_star=<i className="fa-solid fa-star-half-stroke half-checked-star"></i>
    }
    for(let i=0 ; i<10-parseInt(averageRating) ; i++){
        unchecked_star.push(<i className="fa-regular fa-star unchecked-star"></i>)
    }

    return(
        <div className='rating-star-container'>
        {checked_star}
        {half_checked_star}
        {unchecked_star}
        <div className='ratings'>{averageRating.toString().substring(0,3)}/10</div>
        </div>
    )
}


export default RatingStar